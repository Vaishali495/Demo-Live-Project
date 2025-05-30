import React from "react";
import TodoDialogue from "../antd/todoDialogue";
import "../index.css";
import TaskBox from "./taskBox";
import AssignTaskBox from "./assignTaskBox";

const assignTaskSection = ({ mode ,sectionName}) => {
// console.log(sectionName)
// console.log(sectionName.tasks)
  return (
  
        <div className={`flex flex-col h-full w-1/3 min-w-[31.5%] mx-2 rounded-2xl overflow-hidden scrollbar-hide ${
            mode
              ? "bg-[white] text-black border-3 border-dashed border-slate-300"
              : "bg-[#24262c] text-white"
          }`}
        >

      <div className="flex flex-col sm:flex-row justify-around items-center text-sm  rounded-lg m-2 [@media(max-width:1300px)]:flex-col">
        <div className="text-slate-500 font-bold text-[1rem]">
       Tasks By {sectionName?.assignedBy} ({sectionName?.tasks.length})
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-1 scrollbar-hide m-3 ">
        {sectionName.tasks.map((task,index) => (
          <AssignTaskBox
            key={task.taskId}
            task={task}
            mode={mode}
            type={sectionName}
            index={index}
          />
        ))}
      </div>
    </div>
     )};

export default assignTaskSection;
