import React, { useState, useContext } from "react";
import { Button, Modal, message } from "antd";
import { useForm } from "react-hook-form";
import AxiosInstance from "../api/axiosInstance";
import {useAuth} from '../context/AuthContext'

const templateDialogue = ({ mode}) => {
  const {userData,setUserData} = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (data) => {
    // console.log(data);
    try {
        // console.log("data =",data);
        const response = await AxiosInstance.post("/addSection", data,{
            withCredentials:true,
        });
        // console.log(response.data)
        if(response.data.success){
          message.success(response.data.message);
          setUserData((prevUserData) => ({
            ...prevUserData, 
            sections: [...prevUserData.sections, data.section],
          }));
        }
        else{
          message.warning(response.data.message);
        }
        setIsModalOpen(false);
        reset(); // Reset form after successful submission
  
      } catch (error) {
        console.error("Error adding template:", error);
        message.error("Failed to add template. Please try again.");
      }
  };
  

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  return (
    <>
      <Button
        className="border-none font-bold text-[1rem]"
        onClick={showModal}
        style={{
          color: mode ? "#000000" : "#ffffff",
          background: mode ? "#ffffff" : "#2A2B2F",
          borderRadius: "20px"
        }}
      >
        New Template
      </Button>
      <Modal
        title="New Template"
        open={isModalOpen}
        onOk={handleSubmit(handleOk)}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
        className={mode ? "light-modal" : "dark-modal"}
      >
        <div className="p-4">
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit(handleOk)}>
            {/* section  */}
            <div className="flex flex-col">
  <label className="text-sm font-medium">Section</label>
  <input
    {...register("section", {
      required: "Section title is required.",
      minLength: { value: 3, message: "Section title must be at least 3 characters long." },
      maxLength: { value: 50, message: "Section title must not exceed 50 characters." },
      pattern: { value: /^[A-Za-z0-9 ]+$/, message: "Only alphanumeric characters are allowed." },
      validate: (value) => value.trim() !== "" || "Section title must be at least 3 characters long."
    })}
    type="text"
    placeholder="Enter section title"
    className={`border rounded p-2 ${errors.section ? "border-red-500" : ""}`}
  />
  {errors.section && <span className="text-red-500 text-xs">{errors.section.message}</span>}
</div>


          </form>
        </div>
      </Modal>
    </>
  );
};

export default templateDialogue;
