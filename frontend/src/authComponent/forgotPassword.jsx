// src/ForgotPassword.js
import React from 'react';
import { useForm } from 'react-hook-form';
import {Link,useNavigate} from "react-router-dom"
import AxiosInstance from "../api/axiosInstance"
import {message} from "antd"

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const Navigate = useNavigate()
  

  const onSubmit = async (data) => { 
    // console.log(`Password reset link sent to ${data.email}`);
    const response = await AxiosInstance.post('/verifyExistingEmail',data)
    // console.log(response.data)
    if(response.data.success)
    {
      message.success(response.data.message);

      setTimeout(()=>{
        Navigate("/verifyOtp", { state: { from: window.location.pathname ,email : data.email } });
      },2000)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="example@gmail.com" 
              id="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Please enter a valid email address"
                }
              })}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Send For Reset
          </button>
        </form>
        <br />
        <div className="text-center text-blue-500 hover:text-blue-800">
          <Link to="/signup">Go to signup?</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
