import React, { useState } from "react";
import sideBarLogo from "../assets/sideBarLogo.svg";
import square from "../assets/square.svg";
import person from "../assets/person.svg";
import calender from "../assets/calender.svg";
import analytics from "../assets/analytics.svg";
import upload from "../assets/upload.svg";
import filter from "../assets/filter.svg";
import chart from "../assets/chart.svg";
import DropDown from '../antd/dropdown';
import add_view from '../assets/add_view.svg';
import light from "../assets/light.svg";
import dark from "../assets/dark.svg";
import exit from "../assets/exit.svg";
import ReportModal from "../antd/reportModal";
import CalandarModal from "../antd/calandarModal";
import LogOut from "../antd/logOutPopUp";
import { Tooltip } from "antd";

function Drawer({ setWidth, mode, setMode  }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setWidth(!isOpen ? "20%" : "0%"); 
  };
  
 
  const toggleLightMode = () => {
    setMode(true);
  };

  const toggleDarkMode = () => {
    setMode(false);
  };

  return (
    <div className="flex h-screen">
      <div className="w-[65px] bg-[#1c1d22] text-white flex flex-col justify-between items-center relative ">
        <div className="flex flex-col items-center justify-center">
        <div>
       <button
          className="rounded-full  text-xl focus:outline-none p-5 hover:bg-slate-800"
          onClick={toggleDrawer}
        >
          <img src={sideBarLogo} alt="siderBar" />
        </button>
       </div>
        <div className="mt-5 gap-5  flex flex-col items-center">
          <button className="w-8 h-8 rounded-full p-1 hover:bg-slate-800">
            <img src={square} />
          </button>
          <button className="w-8 h-8 rounded-full p-1 hover:bg-slate-800">
            <img src={person} />
          </button>
          <CalandarModal/>
          <ReportModal/>
          <button className="w-8 h-8 rounded-full p-1 hover:bg-slate-800">
            <img src={upload} />
          </button>
          <button className="w-8 h-8 rounded-full p-1 hover:bg-slate-800">
            <img src={chart} />
          </button>
          <button className="w-8 h-8 rounded-full p-1 hover:bg-slate-800">
            <img src={filter} />
          </button>
        </div>
        </div>
        <div className="flex flex-col items-center mb-4 ">
          <Tooltip title ="Log Out" >
        <div className="w-8 h-8 rounded-full p-1 hover:bg-slate-800">
  <LogOut />
</div>
  </Tooltip>

        </div>
      </div>

      {isOpen && (
        <div
          className="absolute top-0 h-screen w-[20%]  overflow-hidden "
          style={{
            left: "4rem",
            background: mode ? "#ffffff" : "#222327",
            color: mode ? "#000000" : "#ffffff",
          }}
        >
          <div className="flex justify-between p-4">
            <h1 className="text-2xl font-bold p-2">Project</h1>
            <div className="mt-4 w-8">
              <div className="w-10 h-5">
                <img src={add_view} alt="Add"         
                style={{
          filter: mode ? "none" : "invert(1) brightness(0.8)",
        }} />
              </div>
            </div>
          </div>
          <div className="h-[calc(95vh-80px)] overflow-y-auto">
            <DropDown mode={mode} />
          </div>
          <div className="flex justify-around items-center ml-[15%] w-[70%]">
            <button
              onClick={toggleLightMode}
              className="p-1 flex justify-evenly items-center rounded-full bg-slate-300 w-[40%] hover:bg-slate-500 text-black"
            >
              <img src={light} />
              Light
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-1 flex justify-evenly items-center rounded-full bg-slate-300 w-[40%] hover:bg-slate-500 text-black"
            >
              <img src={dark} />
              Dark
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Drawer;
