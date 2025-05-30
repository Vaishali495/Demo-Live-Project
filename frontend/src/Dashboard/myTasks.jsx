//React
import React from 'react'

//components
import TaskSection from "../component/taskSection";

const myTasks = ({mode,data}) => {
  return (
    <div
    className="h-[90%] overflow-x-auto flex items-center justify-start gap-3 flex-nowrap w-full scrollbar-hide p-4 "
    style={{
      background: mode ? "#ffffff" : "#2a2b2f",
    }}>
    {data.map((elem, index) => (
      <TaskSection key={index} sectionName={elem} mode={mode} />
    ))}
  </div>
  )
}

export default myTasks