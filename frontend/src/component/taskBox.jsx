import React, { useState } from "react";
import more from "../assets/More.svg";
import hamburger from "../assets/hamburger.svg";
import { Popconfirm, message } from "antd";
import { useAuth } from "../context/AuthContext";
import EditDialogue from "../antd/editDialogue";
import TaskInfo from "../antd/taskInfo";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Tooltip } from 'antd';
import UserList from '../antd/userList';
import AxiosInstance from '../api/axiosInstance';

const TaskBox = ({ task, mode, type, index }) => {
  // console.log("from taskbox:",task)
  // console.log(type)
  const { setTasks } = useAuth();
  const [deleteVisible, setDeleteVisible] = useState(false);

  formatAssignDate(task);

  function formatAssignDate(task) {
    const date = new Date(task.createdAt); 
    const options = { month: "short", day: "2-digit", year: "numeric" };
    task.createdAt = date.toLocaleDateString("en-US", options).replace(",", "");
    return task;
  }
  const deleteTask = async (taskId) => {
    try {
      // console.log("in deleteTask, taskID:", taskId);
      const response = await AxiosInstance.post('/deleteTask',{ taskId });
  
      if (response.data.success) {
        message.loading("Deleting task...", 1.5); // Show loading message for 2.5 sec
  
        setTimeout(() => {
          setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
          message.success("Task deleted successfully!");
        }, 2000); // Delay task deletion by 3 sec
      } else {
        message.error("Failed to delete task!");
      }
    } catch (error) {
      //console.error("Delete failed:", error);
      message.error("Error deleting task. Try again!");
    }
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
  ref={provided.innerRef}
  {...provided.draggableProps}
  {...provided.dragHandleProps}
  className={`gap-y-4 space-y-4 p-3 rounded-lg mb-3 transition ${
    snapshot.isDragging 
      ? "bg-opacity-50"  
      : mode 
        ? "bg-white bg-opacity-80 text-black border-solid border-2 border-slate-200" 
        : "bg-[#292b31] bg-opacity-70 text-white" 
  }`}
>
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

        <div className="flex justify-between w-[20%] gap-x-2">
          {/* Edit Button */}
            <Tooltip title="Edit Task">
          <div className="mt-1">
            <EditDialogue id={task?._id} task={task} type={type} />
          </div>
            </Tooltip>

          {/* Delete Button */}
          <Tooltip title="Delete Task">
          <div className="flex items-center">
            <Popconfirm
              title="Are you sure you want to delete this task?"
              open={deleteVisible}
              onConfirm={() => deleteTask(task?._id)}
              onCancel={() => setDeleteVisible(false)}
              okText="Yes"
              cancelText="No"
              onOpenChange={(visible) => setDeleteVisible(visible)}>
              <button className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                <img
                  src={more}
                  alt="more"
                  style={{ filter: mode ? "none" : "invert(1)" }}
                />
              </button>
            </Popconfirm>
          </div>
          </Tooltip>
        </div>
      </div>

      {/* Progress Section */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <Tooltip title="Progress">
          <div className="flex items-center text-sm font-bold">
            <button>
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
          </Tooltip>
          <div className="text-sm font-bold">
            {task?.progress?.currProgress || 0}/10
          </div>
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
                width: `${task?.progress?.currProgress * 10 || 0}%`,
                height: "100%",
                borderRadius: "10px",
                backgroundColor:
                  task?.progress?.currProgress === 10
                    ? "#78D700" // Green for 100% progress
                    : task?.progress?.currProgress <= 3
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
          {task?.createdAt}
        </div>

        <div className="flex items-center gap-x-4">
        {/* users List */}
        <Tooltip title="Assigned User">
          <div className="flex items-center">
            <UserList mode={mode} id={task?._id}/>
          </div>
        </Tooltip>
          {/* info */}
          <Tooltip title="Task info">
          <div className="flex items-center ">
            <TaskInfo mode={mode} id={task?._id} />
          </div>
          </Tooltip>
        </div>
      </div>
      </div>
      )}
    </Draggable>
  );
};

export default TaskBox;
