import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";

// Establish WebSocket Connection
const socket = io("http://localhost:7000", {
  withCredentials: true,
  reconnectionAttempts: 5,
  transports: ["websocket"],
});

const Notification = ({ userId }) => {
  useEffect(() => {
    if (!userId) return;

    socket.emit("LogginUser", userId); // Register user with backend

    socket.on("taskAssigned", (data) => {
      console.log("New Task Assigned:", data);
      showNotification(data);
    });

    return () => {
      socket.off("taskAssigned");
    };
  }, [userId]);

  const showNotification = (data) => {
    toast.info(
      <div>
        <strong>New Task Assigned</strong>
        <p><b>Task:</b> {data.taskTitle}</p>
        <p><b>Assigned By:</b> {data.assignerEmail}</p>
      </div>,
      { position: "top-right", autoClose: 5000 }
    );
  };

  return null; // No UI, just handling notifications
};

export default Notification;
