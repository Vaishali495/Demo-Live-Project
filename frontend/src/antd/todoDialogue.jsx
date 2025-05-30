import React, { useState, useContext } from "react";
import { Button, Modal, message } from "antd";
import { useForm } from "react-hook-form";
import AxiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

import add_todo from '../assets/add_view.svg';

const TodoDialogue = ({ mode, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks, setTasks } = useAuth();

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
    // console.log("Sending data to backend:", data);

    try {
      const response = await AxiosInstance.post("/addTask", data);
      // console.log("Response from backend:", response.data);

      if(response.data.success) {
      setTasks((prevTasks) => [...prevTasks, response.data.savedTask]);   // Update the tasks in the context
      message.success("Task added");
      setIsModalOpen(false);
      reset();
      }else{
        // message.error("Try Again");
        message.error(response.data.message);
      }

    } catch (error) {
      console.error("Error sending data:", error);
      // message.error(error);
      message.error(error.message || "An error occurred");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  const currentType = type;

  return (
    <>
      <Button
        onClick={showModal}
        style={{
          color: mode ? "#000000" : "#ffffff",
          background: mode ? "#ffffff" : "#24262C",
          border : mode ? "none" : "none",
          fontWeight: mode ? "bold" : "bold",
        }}>
           <img 
        src={add_todo} 
        alt="add_todo" 
        className="w-7 h-7 object-contain"
        style={{ filter: mode ? "none" : "invert(1) brightness(0.8)" }} 
      />
        Add New Task
      </Button>
      <Modal
        title="Add New Task"
        open={isModalOpen}
        onOk={handleSubmit(handleOk)}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
        // width={"40%"}
        // style={{
        //   height:"100vh",
        //   overflow: "hidden"
        // }}
        style={{ top: 20 }} 
        className="custom-modal"

        >
        <div className="p-4  ">
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(handleOk)}>
            {/* Task Title */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Task Title</label>
              <input
                {...register("tasktitle", {
                  required: "Task Title is required.",
                })}
                type="text"
                placeholder="Enter task title"
                className={`border rounded p-2 ${
                  errors.taskTitle ? "border-red-500" : ""
                }`}
              />
              {errors.taskTitle && (
                <span className="text-red-500 text-xs">
                  {errors.taskTitle.message}
                </span>
              )}
            </div>

            {/* Task Description */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Task Description</label>
              <textarea
                {...register("taskDescription", {
                  required: "Task Description is required.",
                })}
                placeholder="Enter task description"
                className={`border rounded p-2 ${
                  errors.taskDescription ? "border-red-500" : ""
                }`}
              />
              {errors.taskDescription && (
                <span className="text-red-500 text-xs">
                  {errors.taskDescription.message}
                </span>
              )}
            </div>

            {/* Section */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Section</label>
              <input
                {...register("section", { required: "Section is required." })}
                type="text"
                value={type}
                disabled
                placeholder="Enter section"
                className={`border rounded p-2 hover:cursor-not-allowed ${
                  errors.section ? "border-red-500" : ""
                }`}
              />
              {errors.section && (
                <span className="text-red-500 text-xs">
                  {errors.section.message}
                </span>
              )}
            </div>

            {/* Progress (1-10) */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Progress</label>
              <input
                {...register("currentProgress", {
                  required: "Progress is required.",
                  valueAsNumber: true, 
                  min: { value: 0, message: "Progress must be at least 0." }, 
                  max: { value: currentType=="completed"?10:9, message: currentType=="completed"?"Progress less than 10." : "Progress is not less than 10"},
                })}
                type="number"
                placeholder="Enter progress"
                className={`border rounded p-2 ${
                  errors.currentProgress ? "border-red-500" : "" , currentType == "completed" ? "hover:cursor-not-allowed": ""
                } `}
                value={currentType === "completed" ? 10 : undefined} // Progress 10 for completed
                disabled={currentType === "completed"} // Disable input if type is completed
              />
              {errors.currentProgress && (
                <span className="text-red-500 text-xs">
                  {errors.currentProgress.message}
                </span> // error message show karega
              )}
            </div>

            {/* Assign Date */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Assign Date</label>
              <input
                {...register("assignDate", {
                  required: "Assign Date is required.",
                })}
                type="date"
                className={`border rounded p-2 ${
                  errors.assignDate ? "border-red-500" : ""
                }`}
              />
              {errors.assignDate && (
                <span className="text-red-500 text-xs">
                  {errors.assignDate.message}
                </span>
              )}
            </div>

            {/* Due Date */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Due Date</label>
              <input
                {...register("dueDate", { required: "Due Date is required." })}
                type="date"
                className={`border rounded p-2 ${
                  errors.dueDate ? "border-red-500" : ""
                }`}
              />
              {errors.dueDate && (
                <span className="text-red-500 text-xs">
                  {errors.dueDate.message}
                </span>
              )}
            </div>

            {/* Priority (1-10) */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Priority (1-10)</label>
              <input
                {...register("priority", {
                  required: "Priority is required.",
                  valueAsNumber: true,
                  validate: (value) =>
                    (value >= 1 && value <= 10) ||
                    "Priority must be between 1 and 10.",
                })}
                type="number"
                placeholder="Enter priority"
                className={`border rounded p-2 ${
                  errors.priority ? "border-red-500" : ""
                }`}
              />
              {errors.priority && (
                <span className="text-red-500 text-xs">
                  {errors.priority.message}
                </span>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default TodoDialogue;
