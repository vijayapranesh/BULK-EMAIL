const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BlacklistedToken = require("../models/BlacklistedToken");
const sendEmail = require("../utils/nodemailer");
const crypto = require("crypto");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(req.body);
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// login route

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // const user = await User.findOne({ email });
    // if (!user || !(await bcrypt.compare(password, user.password))) {
    //   return res.status(401).send("Invalid credentials");
    // }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// logout route

router.post("/logout", async (req, res) => {
  const { token } = req.body; // Expect the token to be sent in the request body

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const expirationDate = new Date(decoded.exp * 1000); // Convert exp to milliseconds

    const blacklistedToken = new BlacklistedToken({
      token: token,
      expireAt: expirationDate,
    });

    await blacklistedToken.save();
    res.status(200).send("Logout successful, token blacklisted.");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing your request", error: error.message });
  }
});

module.exports = router;
