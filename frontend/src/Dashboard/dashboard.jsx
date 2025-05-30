//React and Hooks
import React, { useState, useEffect } from "react";
import AxiosInstance from "../api/axiosInstance";


//compopnents
import Header from "../component/header";
import TabBar from "../materialUI/tabBar";
import Navbar from "../component/Navbar";
import Drawer from "../component/Drawer";
import Shimmer from "../shimmer/shimmer";
import { useAuth } from "../context/AuthContext";
import { message } from "antd";
import MyTasks from './myTasks';
import AssignedTasks from './assignTasks';

//for drag and drop
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Dashboard = () => {
  const { userData, setUserData, tasks, setTasks, setAssignTask } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const [w, setWidth] = useState("20%");
  const [mode, setMode] = useState(false);
  const [isMyTaskOpen, setIsMyTaskOpen] = useState(true);
  const [isAssignedTaskOpen, setIsAssignedTaskOpen] = useState(false);


  //send request to get data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get("/getUserData");
        const assignedTaskResponse = await AxiosInstance.get("/assignedtask");
        // console.log("response from backend:", response.data);
        // console.log("assignedTaskResponse: ",assignedTaskResponse.data);
        if (response.data.success) {
          setUserData(response.data.userdata);
          setTasks(response.data.userdata.mytasks);
          
          if(assignedTaskResponse.data.success){
            setAssignTask(assignedTaskResponse.data.assignedTaskscurrent);
          }else{
            setAssignTask([]);
          }
          
        } else {
          message.error(response.data.message);
        }
        
      } catch (error) {
        // console.error("Error fetching data:", err);
        message.error(error.message || "An error occurred");
        // setError("Failed to load tasks! Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  //useEffect for shimmer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Shimmer />;
  }

  const handleMyTaskOpen = () => {
    setIsMyTaskOpen(true);
    setIsAssignedTaskOpen(false);
  };

  const handleAssingedTaskOpen = () => {
    setIsAssignedTaskOpen(true);
    setIsMyTaskOpen(false);
  };

  //function for handle dragEnd
  const onDragEnd = async (result) => {
    //"If it is not dropped anywhere, do nothing."
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const currentTask = tasks.filter((task) => {
      if (task?._id == draggableId) {
        return task;
      }
    });
    

    try {
      const obj = {
        taskId: draggableId,
        section: destination.droppableId,
      };

      if (destination.droppableId == currentTask[0].section) {
        return message.warning("Cannot update in same section");
      }

      if (currentTask[0].section == "completed") {
        return message.warning("Cannot change section of completed task");
      }

      const response = await AxiosInstance.patch("/updateSection", obj);
      console.log("drag response", response?.data);
      if (response.data.success) {
        message.success("Task " + response?.data?.message);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === draggableId
              ? { ...task, ...response?.data?.updatedTask } // Update all fields
              : task
          )
        );
      } else {
        message.warning(response?.data?.message);
      }
    } catch (error) {
      console.error("Error updating task section:", error);
      message.error(error.message || "An error occurred");
    }
  };
console.log("theme color",mode)
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-screen w-full">
        <div>
          <Drawer setWidth={setWidth} mode={mode} setMode={setMode} />
        </div>
        {/* main section */}
        <div
          className="h-full overflow-y-none scrollbar-hide"
          style={{
            marginLeft: w,
            width: `calc(100% - ${w})`,
            background: mode? "#ffffff":"#2a2b2f",//2a2b2f
            color: "#ffffff",
          }}>
          
          {/* Header */}
          <Header mode={mode} name={userData?.username} />

          {/* Navbar */}
          {/* <Navbar
            mode={mode}
            handleMyTaskOpen={handleMyTaskOpen}
            handleAssingedTaskOpen={handleAssingedTaskOpen}
          /> */}
          <TabBar mode={mode} data={userData?.sections}/>
          {/* <hr
            className={`${
              mode ? "border-gray-300 border-2" : "border-[#3f4044] border-2"
            }`}
          /> */}

          {/* component for myTasks */}
          {/* {isMyTaskOpen &&  <MyTasks mode={mode} data={userData?.sections} />} */}

          {/* component for assigned task */}
          {/* {isAssignedTaskOpen && <AssignedTasks mode={mode} />} */}
          
        </div>
      </div>
    </DragDropContext>
  );
};

export default Dashboard;
