import React, { useState } from "react";
import more from "../assets/More.svg";
import hamburger from "../assets/hamburger.svg";
import { Button, Modal } from "antd";
import { Popconfirm, message } from "antd";
import edit from "../assets/edit.svg";
import { useAuth } from "../context/AuthContext";
import EditDialogue from "../antd/editDialogue";
import AssignTaskInfo from "../antd/assignTaskInfo";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Tooltip } from "antd";
import AxiosInstance from "../api/axiosInstance";
import { useForm } from "react-hook-form";

const assignTaskBox = ({ task, mode, type, index }) => {
  const { assignTask, setAssignTask } = useAuth();

  const [deleteVisible, setDeleteVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  //   const handleOk = () => {
  //     setIsModalOpen(false);
  //   };
  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };
  const onSubmit = async (data) => {
    try {
      let target = null;
      let assignedBy = null;
      let assignTo = null;

      assignTask.forEach((item) => {
        const foundTask = item.tasks.find((t) => t.taskId === task.taskId);
        if (foundTask) {
          target = foundTask;
          assignedBy = item.assignedBy;
          assignTo = item.assignTo;
        }
      });

      const obj = {
        currProgress: data.progress, // from form data
        assignTo: assignTo, // from extractedData
        assignedBy: assignedBy, // from extractedData
        taskId: task.taskId, // taskId from task object
      };

      console.log("obj: ", obj);

      const response = await AxiosInstance.patch("/updateProgress", obj);
      if (response.data.success) {
        message.success(response.data.message);

        setAssignTask((prevTasks) =>
          prevTasks.map((item) => ({
            ...item,
            tasks: item.tasks.map((t) =>
              t.taskId === task.taskId ? { ...t, currProgress: data.progress } : t
            ),
          }))
        );
        
      } else {
        message.warning(response.data.message);
      }
      setIsModalOpen(false);
      reset();
    } catch (error) {
      console.error("Error updating task section:", error);
      message.error(error.message || "An error occurred");
    }
  };

  formatAssignDate(task);

  function formatAssignDate(task) {
    const date = new Date(task.assignDate); // Convert to Date object
    const options = { month: "short", day: "2-digit", year: "numeric" }; // Formatting options
    task.assignDate = date
      .toLocaleDateString("en-US", options)
      .replace(",", ""); // Format and remove the comma
    return task;
  }

  return (
    <div
      className={`gap-y-4 space-y-4 p-3 rounded-lg mb-3 transition  ${
        mode
          ? "bg-white text-black border-solid border-2 border-slate-200"
          : "bg-[#292b31] text-white"
      } `}>
      {/* Task Header */}
      <div className="flex items-center justify-between ">
        <div className="w-[90%]">
          {/* Task Title */}
          <div className="text-sm font-medium">
            {task?.tasktitle || "Untitled Task"}
          </div>
          {/* Task Description */}
          <div
            className={`text-opacity-60 ${
              mode ? "text-gray-600 text-sm" : "text-gray-300 text-sm"
            }`}>
            {task?.taskDescription || "No Description"}
          </div>
        </div>

        <div className="flex justify-between">
          {/* Edit Button */}
          <div className="mt-1">
            {/* <EditDialogue id={task?._id} task={task} /> */}
            <button
              className="rounded-full hover:bg-slate-50 hover:cursor-pointer"
              style={{
                filter: mode ? "none" : "invert(1) brightness(0.8)",
              }}
              onClick={showModal}>
              <img src={edit} alt="edit" />
            </button>
            <Modal
              title="Basic Modal"
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className="block text-sm font-medium text-gray-700">
                  Progress (1-10)
                </label>
                <input
                  type="number"
                  {...register("progress", {
                    required: "Progress is required",
                    min: {
                      value: task?.currProgress,
                      message: `Minimum value is ${task?.currProgress}`,
                    },
                    max: { value: 10, message: "Maximum value is 10" },
                    valueAsNumber: true,
                  })}
                  className="mt-1 p-2 border rounded w-full"
                />
                {errors.progress && (
                  <p className="text-red-500 text-sm">
                    {errors.progress.message}
                  </p>
                )}
                <button
                  type="submit"
                  className="mt-3 w-full bg-blue-500 text-white py-2 rounded">
                  Submit
                </button>
              </form>
            </Modal>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center text-sm font-bold">
            <button className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
              <img
                src={hamburger}
                alt="hamburger"
                className="w-5 h-5"
                style={{ filter: mode ? "none" : "invert(1)" }}
              />
            </button>
            <span
              className={`ml-2 ${mode ? "text-gray-700" : "text-gray-300"}`}>
              Progress
            </span>
          </div>
          <div className="text-sm font-bold">{task?.currProgress || 0}/10</div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center w-full">
          <div
            className="progress-bar-wrapper"
            style={{
              width: "90%",
              height: "7px",
              borderRadius: "10px",
              backgroundColor: mode ? "#e0e0e0" : "#444",
              overflow: "hidden",
              position: "relative",
            }}>
            <div
              className="progress-bar"
              style={{
                width: `${task?.currProgress * 10 || 0}%`,
                height: "100%",
                borderRadius: "10px",
                backgroundColor:
                  task?.currProgress === 10
                    ? "#78D700" // Green for 100% progress
                    : task?.currProgress <= 3
                    ? "#ff7979" // Light red for progress <= 3
                    : "#ffa048", // Orange for progress > 3
              }}></div>
          </div>
        </div>
      </div>

      {/* Priority & Actions */}
      <div className="flex items-center justify-between">
        {/* asign date */}
        <div
          className={` border-none text-sm rounded-full font-medium text-center p-1 ${
            type !== "completed" &&
            (new Date(task.dueDate).toLocaleDateString() ===
              new Date().toLocaleDateString() ||
              new Date(task.dueDate) < new Date())
              ? "bg-[#fff2f2] text-[#ff7079]"
              : mode
              ? "bg-gray-200 text-gray-700"
              : "bg-[#f4f4f7] text-[#888da7]"
          }`}>
          {task?.assignDate}
        </div>

        <div className="flex items-center gap-x-4">
          {/* info */}
          <div className="flex items-center ">
            <AssignTaskInfo mode={mode} id={task?.taskId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default assignTaskBox;
