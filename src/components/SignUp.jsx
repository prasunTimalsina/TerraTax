import { useState } from "react";
import authService from "../appwrite/auth";
import appwriteService from "../appwrite/config";
import { Link, useNavigate } from "react-router";
import { login, persistOnLocalStorage } from "../store/authSlice";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function SignUp() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          appwriteService.addUserData({
            ...data,
            userId: userData.$id,
          });

          dispatch(login(userData));
          dispatch(persistOnLocalStorage());
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center p-9">
      <form
        onSubmit={handleSubmit(create)}
        className="max-w-sm mx-auto bg-gray-100 rounded-xl p-10 border border-black/10"
      >
        <h2 className="text-center text-2xl font-bold leading-tight mb-4">
          Sign up to create an account
        </h2>
        <p className="text-center text-base text-black/60 mb-5">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-blue-700 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {/* Optionally display a form-level error message */}
        {error && <p className="text-red-600 text-center mb-5">{error}</p>}

        <div className="mb-5">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name", { required: "Full name is required" })}
          />
        </div>

        <div className="mb-5">
          <Input
            label="Your Email"
            type="email"
            placeholder="name@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,3}$/,
                message: "Enter a valid email address",
              },
            })}
          />
        </div>

        <div className="mb-5">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
          />
        </div>

        <div className="mb-5">
          <Input
            label="PAN Number"
            placeholder="Enter your PAN number"
            {...register("PANNumber", { required: "PAN number is required" })}
          />
        </div>

        <div className="mb-5">
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
          />
        </div>

        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              id="remember"
              {...register("remember")}
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900"
          >
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignUp;
