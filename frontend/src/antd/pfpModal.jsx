import React, { useState, useRef } from "react";
import Profile from "./profile";
import { Modal } from "antd";
import image from '../assets/image.jpg'

import {useAuth} from '../context/AuthContext'

const pfpModal = ({ mode }) => {
  const {userData} = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop()); 
    }
  };
  // console.log(userData.profileImage)
  return (
    <>
      <button
        className=" hover:cursor-pointer rounded-full w-8 h-8 border-2 border-slate-400"
        onClick={showModal}
        //   onClick={handlePfp}
        style={{
          filter: mode ? "none" : "invert(1) brightness(1)",
        }}
        >
        <img src={`http://localhost:7000${userData.profileImage}`|| image} alt={userData.username} className="w-full h-full object-cover rounded-full" />
      </button>

      <Modal
        title="My Profile"
        open={isModalOpen}
        footer={null}
        closable={true}
        onCancel={handleCloseModal}
        style={{ top: 20 }}
        className="custom-modal">
        <Profile closeModal={handleCloseModal} videoRef={videoRef}/>
      </Modal>
    </>
  );
};
export default pfpModal;
