import React from 'react';
import "../app.css";
import exit from '../assets/exit.svg';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AxiosInstance from '../api/axiosInstance';

const logOutPopUp = () => {
    const { setIsAuthenticated } = useAuth();
    const Navigate = useNavigate();

    const handleConfirm = async () => {

      try {
          const response = await AxiosInstance.post("/logout", {});
          
          if (response.data.success) {
              message.success(response.data.message);
              setIsAuthenticated(false);
              Navigate("/login");
          } else {
              message.error("Please Try Again");
          }
  
      } catch (error) {
          console.error("Logout failed:", error.response?.data || error.message);
          // message.error("Logout failed! Please try again.");
          message.error(error.message || "An error occurred");
      }
  };



  return (
    <Popconfirm
    title={<span style={{ fontSize: "1rem" }}>Sign Off</span>}
    placement="top"
      description="Are you sure you want to log out?"
      onConfirm={handleConfirm}  
      onCancel={()=>{}}    
      icon={<QuestionCircleOutlined style={{ color: 'red', fontSize: "1rem"}} />}
    >
      <Button className="custom-button">
        <img src={exit} alt="Logout" />
      </Button>
    </Popconfirm>
  );
};

export default logOutPopUp;
