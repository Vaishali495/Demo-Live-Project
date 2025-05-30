//pending task
if user is not present then show message no user for assign task


const handleClick = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:7000/getUserList", {
        withCredentials: true,
      });
      console.log("userList", response.data);
      setUserList(response.data.users); // Save the user list
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching user list:", error);
    } finally {
      setLoading(false);
    }
  };  
  
  
  code from App.js
  
  // const [isAuthenticated, setIsAuthenticated] = useState(null); 

  // useEffect(() => {
  //   const verifyAuth = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:7000/auth/checkToken", {
  //         withCredentials: true, 
  //       });
  //       console.log("Authentication response:", response.data.success);
  //       setIsAuthenticated(response.data.success);
  //     } catch (error) {
  //       console.error("Error checking authentication:", error);
  //       setIsAuthenticated(false);
  //     }
  //   };
  
  //   verifyAuth();
  // }, []);


  {
    "_id": "67a2e503dc4975eb32488ccf",
    "userId": "67a232352b3642bc8f50f3ea",
    "tasktitle": "jb",
    "taskDescription": "jb",
    "section": "inProgress",
    "progress": {
        "currProgress": 1,
        "_id": "67a2e503dc4975eb32488cd0",
        "updatedAt": "2025-02-05T04:11:47.968Z"
    },
    "isDisable": false,
    "priority": 5,
    "assignDate": "2025-02-05T04:11:47.967Z",
    "dueDate": "2025-02-05T04:11:47.967Z",
    "comments": [],
    "createdAt": "2025-02-05T04:11:47.968Z",
    "updatedAt": "2025-02-05T04:11:47.968Z",
    "__v": 0
}

task box color: background: #292B31;
task section color: background: #24262C;
.


const deleteTask = async (taskId) => {
    try {
        const response = await axios.post(`http://localhost:7000/deleteTask`,{ taskId });
        
        if (response.data.success) {
            message.success(response.data.message);
            setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId)); 
        } else {
            message.error("Failed to delete task!");
        }
    } catch (error) {
        console.error("Delete failed:", error);
        message.error("Error deleting task. Try again!");
    }
};

const updateTask = async (taskId, updatedData) => {
  try {
    const response = await axios.post(
      "http://localhost:7000/updateTask",
      {
        taskId,
        ...updatedData, // Spread updated task data
      },
      { withCredentials: true } // Include credentials if needed
    );

    if (response.data.success) {
      message.success(response.data.message);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === taskId ? { ...task, ...updatedData } : task
        )
      );
    } else {
      message.error("Failed to update task!");
    }
  } catch (error) {
    console.error("Update failed:", error);
    message.error("Error updating task. Try again!");
  }
};

        task?.progress?.currProgress === 10
        ? "#78d700" // Green for 100% progress
        : task?.progress?.currProgress <= 3
        ? "#ff7979" // Light red for progress <= 3
        : "#ffa048", // Orange for progress > 3




<!-- <Droppable droppableId="sections" type="section" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="h-[84%] overflow-x-auto flex items-center gap-3 flex-nowrap w-full p-5">
                {userData.sections.map((elem, index) => (
                  <Draggable key={elem} draggableId={elem} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <TaskSection sectionName={elem} mode={mode} reTrigger={setReTrigger} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable> -->

<!-- import React, { useState, useRef } from "react";
import axios from "axios";

const ProfileComponent = () => {
  const [username, setUsername] = useState("");
  const [editing, setEditing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const openCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.error("Error accessing the camera:", error);
      alert("Unable to access the camera.");
    }
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg");
    setCapturedImage(imageData);
    closeCamera();
  };

  const closeCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setShowCamera(false);
  };

  const handleSave = async () => {
    try {
      // Send the updated username and captured image to the backend
      await axios.post("/api/update-username", { username, image: capturedImage });
      alert("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Profile</h2>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => alert("Close button clicked")}
        >
          &times;
        </button>
      </div>
      <div className="text-center">
        <div className="relative inline-block">
          {capturedImage ? (
            <img
              src={capturedImage}
              alt="Profile"
              className="w-20 h-20 rounded-full mx-auto"
            />
          ) : (
            <img
              src="/default-avatar.png"
              alt="Profile"
              className="w-20 h-20 rounded-full mx-auto"
            />
          )}
          <button
            className="absolute bottom-0 right-0 bg-gray-800 text-white p-1 rounded-full"
            onClick={openCamera}
          >
            📷
          </button>
        </div>
      </div>
      <div>
        <label className="block text-gray-700">Username:</label>
        {editing ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
            />
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span>{username || "Set your username"}</span>
            <button
              onClick={() => setEditing(true)}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
          </div>
        )}
      </div>
      <button
        className="block w-full bg-green-500 text-white py-2 rounded hover:bg-green-700"
        onClick={() => alert("My Reports clicked")}
      >
        My Reports
      </button>

      {showCamera && (
        <div className="text-center">
          <video ref={videoRef} className="mx-auto border border-gray-300 rounded" />
          <div className="space-x-4 mt-2">
            <button
              onClick={captureImage}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Capture
            </button>
            <button
              onClick={closeCamera}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent; -->


import React, { useState, useRef } from "react";
import axios from "axios";

const ProfileComponent = () => {
  const [username, setUsername] = useState("");
  const [editing, setEditing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showDialog, setShowDialog] = useState(true);

  const openCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.error("Error accessing the camera:", error);
      alert("Unable to access the camera.");
    }
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg");
    setCapturedImage(imageData);
    closeCamera();
  };

  const closeCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setShowCamera(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCapturedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // Send the updated username and captured image to the backend
      await axios.post("/api/update-username", { username, image: capturedImage });
      alert("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    showDialog && (
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Profile</h2>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={closeDialog}
          >
            &times;
          </button>
        </div>
        <div className="text-center">
          <div className="relative inline-block">
            {capturedImage ? (
              <img
                src={capturedImage}
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto"
              />
            ) : (
              <img
                src="/default-avatar.png"
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto"
              />
            )}
            <button
              className="absolute bottom-0 right-0 bg-gray-800 text-white p-1 rounded-full"
              onClick={openCamera}
            >
              📷
            </button>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div>
          <label className="block text-gray-700">Username:</label>
          {editing ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
              />
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span>{username || "Set your username"}</span>
              <button
                onClick={() => setEditing(true)}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <button
          className="block w-full bg-green-500 text-white py-2 rounded hover:bg-green-700"
          onClick={() => alert("My Reports clicked")}
        >
          My Reports
        </button>

        {showCamera && (
          <div className="text-center">
            <video ref={videoRef} className="mx-auto border border-gray-300 rounded" />
            <div className="space-x-4 mt-2">
              <button
                onClick={captureImage}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Capture
              </button>
              <button
                onClick={closeCamera}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default ProfileComponent;










<!-- import React from 'react';
import { Tooltip } from 'antd';
const App = () => (
  <Tooltip title="prompt text">
    <span>Tooltip will show on mouse enter.</span>
  </Tooltip>
);
export default App; -->








import React from 'react';
import { Button, message, Popconfirm } from 'antd';
const confirm = (e) => {
  console.log(e);
  message.success('Click on Yes');
};
const cancel = (e) => {
  console.log(e);
  message.error('Click on No');
};
const App = () => (
  <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    onConfirm={confirm}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    <Button danger>Delete</Button>
  </Popconfirm>
);
export default App;