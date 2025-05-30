import React from 'react'
import { createContext, useContext, useEffect, useState } from "react";
import AxiosInstance from '../api/axiosInstance'

//create context
export const AuthContext = createContext();

//context provider
export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userData, setUserData] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [userList, setUserList] = useState([]);
    const [assignTask, setAssignTask] = useState([]);
    const [emailVerified, setEmailVerified]  = useState({
      email:"",
      bool:false
    });
    console.log(emailVerified)

    

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await AxiosInstance.get("/auth/checkToken");
        setIsAuthenticated(response.data.success);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };
    verifyAuth();
  }, []);
  
  return(
        <AuthContext.Provider value={{  isAuthenticated, setIsAuthenticated, userData, setUserData, tasks, setTasks, userList, setUserList, assignTask, setAssignTask,emailVerified,setEmailVerified }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook for using context
export const useAuth = () => {
    return useContext(AuthContext);
};