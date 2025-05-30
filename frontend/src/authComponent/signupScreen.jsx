import React, { useState } from "react";
import cycle from "../assets/cycle.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../api/axiosInstance";
import { message } from "antd";

const SignupScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await AxiosInstance.post("/verifyEmail", data);

      if (response.data.success) {
        message.success("Verification otp sent! Please check you mail");
        navigate("/verifyOtp", { state: { signupData: data ,
          email: data.email,
          from: location.pathname 
        }});
      } else {
        message.warning(response.data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      message.error("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="min-h-screen min-w-full flex items-center justify-center overflow-hidden p-4">
      <div className="flex w-full h-full shadow-lg m-2">
        {/* Left Section */}
        <div className="w-full flex flex-col justify-center items-center">
          <div className="m-3 p-5 text-center">
            <h3 className="m-3 font-bold text-xl mb-[10%]">Digital</h3>
            <h1 className="m-3 font-bold text-4xl">Todo - Get It Done</h1>
          </div>

          <div className="w-[60%] rounded-lg m-10">
            <h1 className="text-xl font-semibold text-gray-800 mb-4">
              Sign up for an account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Username */}
              <div className="mb-4">
                <label
                  className="block text-gray-600 font-medium mb-2"
                  htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className={`w-[90%] border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="Enter your username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  className="block text-gray-600 font-medium mb-2"
                  htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className={`w-[90%] border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="paras@gmail.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label
                  className="block text-gray-600 font-medium mb-2"
                  htmlFor="password">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`w-[90%] border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
                <div className="flex items-center mt-2 mb-4">
                  <input
                    type="checkbox"
                    id="showPassword"
                    className="mr-2 cursor-pointer"
                    onChange={(e) => setShowPassword(e.target.checked)}
                  />
                  <label
                    htmlFor="showPassword"
                    className="text-sm text-gray-600 cursor-pointer">
                    Show password
                  </label>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Sign Up
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/login")} // ✅ Navigate to login
                  className="text-blue-500 font-medium px-4 py-2 border border-blue-500 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full flex flex-col bg-slate-100">
          <div className="w-full flex flex-col items-center bg-slate-100 py-10">
            <div className="flex gap-10">
              <a href="#" className="text-2xl">
                Home
              </a>
              <a href="#" className="text-2xl">
                About us
              </a>
              <a href="#" className="text-2xl">
                Contact us
              </a>
              <a href="#" className="text-2xl">
                Blog
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="mt-10 flex justify-center">
            <img src={cycle} alt="cycle" className="s-screen" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
