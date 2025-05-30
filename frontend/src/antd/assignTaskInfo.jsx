import React from "react";
import Info from "../assets/info.svg";
import { Button, Modal, Space } from "antd";
import { useAuth } from "../context/AuthContext";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return date.toLocaleDateString("en-US", options).replace(",", "");
};

const info = (id, data) => {
  let target = null;
  let assignedBy = null;
  let assignTo = null;

  // Iterate over the data array to find the matching taskId
  data.forEach((item) => {
    const foundTask = item.tasks.find((task) => task.taskId === id);
    if (foundTask) {
      target = foundTask;
      assignedBy = item.assignedBy;
      assignTo = item.assignTo;
    }
  });

  if (!target) {
    Modal.error({
      title: "Error",
      content: "Task not found!",
    });
    return;
  }

  Modal.info({
    title: "Task Details",
    width: 800,
    content: (
      <div className="overflow-x-auto mr-8">
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr className="border-b">
              <td className="p-2 font-bold bg-gray-100 w-3/10">Task Title</td>
              <td className="p-2 w-7/10">{target.tasktitle || "N/A"}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold bg-gray-100 w-3/10">Description</td>
              <td className="p-2 w-7/10">{target.taskDescription || "N/A"}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold bg-gray-100 w-3/10">Progress</td>
              <td className="p-2 w-7/10">{`${target.currProgress || 0}/10`}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold bg-gray-100 w-3/10">Assigned By</td>
              <td className="p-2 w-7/10">{assignedBy || "N/A"}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold bg-gray-100 w-3/10">Assigned To</td>
              <td className="p-2 w-7/10">{assignTo || "N/A"}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold bg-gray-100 w-3/10">Due Date</td>
              <td className="p-2 w-7/10">{formatDate(target.dueDate) || "N/A"}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold bg-gray-100 w-3/10">Assigned Date</td>
              <td className="p-2 w-7/10">{formatDate(target.assignDate) || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    onOk() {},
  });
};


const assignTaskInfo = ({ mode, id }) => {
  const { assignTask:data } = useAuth();

  return (
    <Space wrap>
      <button
        className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 p-1"
        onClick={() => info(id, data)}
      >
        <img
          src={Info}
          alt="info"
          className="w-5 h-5"
          style={{ filter: mode ? "none" : "invert(1)" }}
        />
      </button>
    </Space>
  );
};

export default assignTaskInfo;
