import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { login as authLogin, persistOnLocalStorage } from "../store/authSlice";

import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        // Wait 500ms (adjust as needed) for the session to be fully set
        setTimeout(async () => {
          const userData = await authService.getCurrentUser();
          if (userData) {
            dispatch(authLogin(userData));
            dispatch(persistOnLocalStorage());
            navigate("/dashboard");
          }
        }, 500);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full p-9">
      <form
        onSubmit={handleSubmit(login)}
        className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10"
      >
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-700 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 text-center mt-5">{error}</p>}

        <div className="mt-5 space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Your Email
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,3}$/,
                  message: "Enter a valid email address",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default LogIn;
