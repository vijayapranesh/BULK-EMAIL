import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import pic1 from "../assets/taday1.jpg";
import Loading from "./Loading";
import Error from "./Error";
import "./mix.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passShow, setPassShow] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading("true");

    try {
      const response = await axios.post(
        "https://bulk-email-3dtj.onrender.com/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      setMessage("Login successful");
      navigate("/email-sender");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to login");
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
          backgroundColor: "#49C8A1",
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
            Significance of <span style={{ color: "#FFFFFF" }}>Bulk Email</span>{" "}
            Sender
          </h2>
          <p
            style={{ marginTop: "1em", color: "#FFFFFF" }}
            class="font-sans ..."
          >
            A new bulk email sender tool that tracks and delivers transactional
            emails.
          </p>
          <div style={{ marginTop: "2em" }}>
            <img style={{ paddingLeft: "8em" }} src={pic1} alt="img" />
          </div>
        </div>

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Log in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleLogin}
              className="space-y-6"
              action="#"
              method="POST"
            >
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
                <div className="flex items-center justify-between ">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      onClick={() => navigate("/forgot-password")}
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2 two">
                  <input
                    type={!passShow ? "password" : "text"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
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
            <div style={{ textAlign: "center", paddingTop: "1em" }}>
              {message && (
                <b>
                  <p style={{ color: "green" }}>{message}</p>
                </b>
              )}
              {error && (
                <b>
                  <p style={{ color: "red" }}>{error}</p>
                </b>
              )}
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <a
                href="#"
                onClick={() => navigate("/signup")}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                signup
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
