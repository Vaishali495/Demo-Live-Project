//React
import React from 'react'
import { Empty } from 'antd';


//components
import {useAuth} from '../context/AuthContext';
import AssignTaskSection from "../component/assignTaskSection"

const assignTasks = ({mode}) => {
  const {assignTask} = useAuth();
    if (assignTask.length == 0) {
      return (
        <div className='p-50 h-[100%]'
        style={{
          background: mode ? "#ffffff" : "#2a2b2f",
        }}>
          <Empty 
           description={
            <span style={{ color: mode ? "#000000" : "#ffffff" }}>
              No Tasks Assigned
            </span>
          } />
        </div>
      );
    }

  return (
    <div
    className="h-[90%] overflow-x-auto flex items-center justify-start gap-3 flex-nowrap w-full scrollbar-hide p-3"
    style={{
      background: mode ? "#ffffff" : "#2a2b2f",
    }}>

    {assignTask.map((elem, index) => (
      <AssignTaskSection key={index} sectionName={elem} mode={mode} />
    ))}

  </div>
  )
}

export default assignTasks
