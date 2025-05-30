//React
import React,{useEffect} from "react";
import {createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

//styles and components
import "./App.css";
import LoginScreen from "./authComponent/loginScreen";
import SignupScreen from "./authComponent/signupScreen";
import Dashboard from "./Dashboard/dashboard";
import NewChanges from './Dashboard/newChanges';
import { ToastContainer } from "react-toastify";
import VerifyOtpScreen from "./authComponent/verifyOtpScreen";
import ForgotPassword from "./authComponent/forgotPassword";
import ChangePassword from './authComponent/changePassword';
import { useAuth, AuthProvider } from "./context/AuthContext";
import Error404 from "./antd/error404";

function AppContent() {


  const { isAuthenticated, emailVerified } = useAuth();



  console.log(emailVerified);
  if (isAuthenticated === null) {
    return <></>;     
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <LoginScreen />,
    },
    {
      path: "/verifyOtp",
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <VerifyOtpScreen/>,
    },
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <LoginScreen />,
    },
    {
      path: "/signup",
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <SignupScreen />,
    },
    {
      path: "/dashboard",
      element: isAuthenticated ? <Dashboard /> : <Navigate to="/login" />,
    },
    {
      path :"forgotPassword",
      element : isAuthenticated ? <Navigate to="/dashboard" /> : <ForgotPassword />,
    },
    // {
    //   path: "/dashboard",
    //   element: isAuthenticated ? <NewChanges /> : <Navigate to="/login" />,
    // },
    {
      path: "/forgotPassword",
      element: <ForgotPassword />
    },
    {
      path: "/changePassword",
      element: emailVerified.bool ? <ChangePassword /> : <Navigate to="/login" />
    },
    {
      path: "*",
      element: <Error404 />,
    },
  ]);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <AuthProvider>
    {/* <ToastContainer position="top-right" autoClose={5000} /> */}

      <AppContent />
    </AuthProvider>
  );
}

export default App;
