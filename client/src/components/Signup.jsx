import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import pic1 from "../assets/taday2.jpg";
import Loading from "./Loading";
import Error from "./Error";
import "./mix.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passShow, setPassShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(
        "https://bulk-email-3dtj.onrender.com/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to signup");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          backgroundColor: "#F4EDFD",
          height: "100vh",
        }}
      >
        <div
          style={{ paddingLeft: "1em", textAlign: "center" }}
          className="min-w-0 flex-1"
        >
          <h2
            style={{ color: "#2F326A" }}
            className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
          >
            <span style={{ color: "#06A3DD" }}>Bulk Email</span> transactional
          </h2>
          <p
            style={{ marginTop: "1em", color: "blueviolet" }}
            class="font-sans ..."
          >
            Using a bulk email sender can be a highly effective method for
            expanding your Email Lead Generation endeavors. By leveraging this
            technique, you can reach a substantial, focused audience of
            potential customers in bulk. However, it requires proper handling
            and management.
          </p>
          <div style={{ marginTop: "2em" }}>
            <img src={pic1} alt="img" />
          </div>
        </div>

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleSignup}
              className="space-y-6"
              action="#"
              method="POST"
            >
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="form_input">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm"></div>
                </div>
                <div className="mt-2 two">
                  <input
                    type={!passShow ? "password" : "text"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div
                    className="showpass"
                    onClick={() => setPassShow(!passShow)}
                  >
                    {!passShow ? "Show" : "Hide"}
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a
                href="#"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={() => navigate("/login")}
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Signup;
