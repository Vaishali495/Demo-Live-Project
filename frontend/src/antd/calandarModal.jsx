import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Tooltip } from "antd";
import calender from "../assets/calender.svg";
import Calandar from "../materialUI/calendar";

const calandarModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Tooltip title="Calandar">
        <button
          className="w-8 h-8 rounded-full p-1 hover:bg-slate-800"
          onClick={showModal}
        >
          <img src={calender} />
        </button>
      </Tooltip>
      <Modal
  title="Calendar"
  open={isModalOpen}
  onOk={handleOk}
  onCancel={handleCancel} 
  footer={[
    <button
      key="ok"
      onClick={handleOk}
      style={{
        backgroundColor: '#1890ff', // Blue background (Ant Design primary color)
        color: 'white', // White text
        border: 'none', // Remove border
        padding: '10px 20px', // Increase padding
        fontSize: '16px', // Slightly larger text
        borderRadius: '5px', // Rounded corners
        cursor: 'pointer', // Show pointer on hover
        transition: 'background 0.3s ease', // Smooth effect
        width: '120px', // Increase button width
        display: 'inline-block', // Keeps button inline
        textAlign: 'center', // Centers text
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = '#40a9ff')} // Hover effect
      onMouseOut={(e) => (e.target.style.backgroundColor = '#1890ff')} // Reset hover effect
    >
      Close
    </button>,
  ]}
>
  <Calandar />
</Modal>


    </>
  );
};
export default calandarModal;
