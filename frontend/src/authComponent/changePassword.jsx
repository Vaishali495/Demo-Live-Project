import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AxiosInstance from '../api/axiosInstance';
import {message} from 'antd'

const ChangePassword = ({email}) => {
    const location = useLocation();
    const Navigate = useNavigate();
    const userEmail = location.state?.email;
    const [error, setError] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const newPassword = watch("newPassword");

    const onSubmit = async (data) => {
        try {
            const response = await AxiosInstance.patch('/forgetPassword', {
                email: userEmail,
                password: data.newPassword
            });
            console.log(response);
            console.log(response.data);
            console.log("this",response.data.success)
            if (response.data.success) {
                console.log("hiii")
                message.success(response.data.message);
                    Navigate('/login');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-center text-3xl font-bold text-gray-900">
                    Change Password
                </h2>
                {error && (
                    <div className="text-red-500 text-center text-sm">
                        {error}
                    </div>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <input
                                id="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                {...register("newPassword", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#155dfc] focus:border-[#155dfc]"
                                placeholder="Enter new password"
                            />
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="showNewPassword"
                                    onChange={() => setShowNewPassword(!showNewPassword)}
                                />
                                <label htmlFor="showNewPassword" className="ml-2 text-sm text-gray-700">Show Password</label>
                            </div>
                            {errors.newPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: value => value === newPassword || "Passwords do not match"
                                })}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#155dfc] focus:border-[#155dfc]"
                                placeholder="Confirm new password"
                            />
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="showConfirmPassword"
                                    onChange={() => setShowConfirmPassword(!showConfirmPassword)}
                                />
                                <label htmlFor="showConfirmPassword" className="ml-2 text-sm text-gray-700">Show Password</label>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full hover:cursor-pointer flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#155dfc] hover:bg-[#155efdde] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
