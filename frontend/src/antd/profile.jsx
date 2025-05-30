import React, { useState, useRef ,useEffect } from "react";
import { useForm } from "react-hook-form";
import AxiosInstance from "../api/axiosInstance";
import camera from "../assets/camera.svg";
import image from '../assets/image.jpg'
import { useAuth } from "../context/AuthContext";
// import ReportModal from "./reportModal";
import {message } from "antd"

const ProfileComponent = ({ closeModal, videoRef }) => {
  // console.log("hi",closeModal)
  // console.log("hi")
  const { userData,setUserData } = useAuth();
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null)
  // const videoRef = useRef(null);

  useEffect(() => {
      setCapturedImage(null); 
      // closeCamera();
      setShowCamera(false);


    },[closeModal]);



  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //  Open Camera
  const openCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();

    // Scroll to camera modal when it opens
    setTimeout(() => {
      document.getElementById("camera-modal").scrollIntoView({ behavior: "smooth" });
    },0);
    } catch (error) {
      console.error("Error accessing the camera:", error);
      alert("Unable to access the camera.");
    }
  };
  //close camera

const closeCamera = () => {
  const stream = videoRef.current?.srcObject;
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop()); // Stop the camera stream
  }
  setShowCamera(false);
};


  //  Capture Image and Crop to Square
    const captureImage = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    // Determine the smallest side (to crop a square)
    const size = Math.min(videoWidth, videoHeight);
    const xOffset = (videoWidth - size) / 2;
    const yOffset = (videoHeight - size) / 2;

    canvas.width = 500; // Fixed size for consistent profile pic
    canvas.height = 500;

    // Crop and resize the image properly
    ctx.drawImage(video, xOffset, yOffset, size, size, 0, 0, 500, 500);

    canvas.toBlob((blob) => {
      const file = new File([blob], "profile-picture.jpg", { type: "image/jpeg" });
      setCapturedImage(URL.createObjectURL(blob)); //  Properly cropped image
      setSelectedFile(file);
      setValue("image", file);
    }, "image/jpeg");

    closeCamera();
  };

  //  Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCapturedImage(URL.createObjectURL(file));
      setSelectedFile(file);
      setValue("image", file);
    }
  };

  //  Form Submission
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("image", selectedFile); //  Send actual image file
      
      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ", " + pair[1]); // Debugging FormData
      // }

      const response = await AxiosInstance.post("/updateProfile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // console.log("Response profile:", response.data);
      if(response.data.success){
        message.success(response.data.message);
        setUserData((prevUserData) => ({
          ...prevUserData, // Keep existing user data
          profileImage: response.data.userData.profileImage, // Update profile image
          username: response.data.userData.username,        //update username
        }));
        closeModal(); 
      }
      else{
        message.warning(response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Profile</h1>
      </div>

      {/* Profile Picture */}
      <div className="text-center">
        <div className="relative inline-block">
          <img
            src={capturedImage || `http://localhost:7000${userData.profileImage}` || image}
            alt={userData.username}
            className="w-[180px] h-[180px] rounded-full mx-auto object-cover border-2 shadow-lg"
            style={{ objectFit: "cover" }} //  Ensures proper fit
          />
          <button
            className="absolute bottom-0 right-0 bg-gray-800 text-white p-1 rounded-full hover:cursor-pointer" 
            onClick={openCamera}>
            <img
              src={camera}
              alt="camera"
              style={{
                filter: "invert(1) brightness(.8)",
              }}
            />
            
          </button>
        </div>
        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            defaultValue={userData.username} //  Use defaultValue instead of value
            {...register("username", {
              required: "Username is required",
              minLength: { value: 3, message: "At least 3 characters" },
            })}
            className="border border-gray-300 rounded p-2 w-full text-black"
          />

          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 block w-full bg-slate-600 text-white py-2 rounded hover:bg-slate-500">
          Save Profile
        </button>
      </form>

      {/* <ReportModal /> */}
{/* Camera Modal */}
{showCamera && (

  <div className="text-center"  id="camera-modal">
    <video
      ref={videoRef}
      className="mx-auto border border-gray-300 rounded w-[300px] h-[300px] object-cover"
    />
    <div className="space-x-4 mt-2">
      <button
        onClick={captureImage}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Capture
      </button>
      <button
        onClick={closeCamera}  // Fixed function call
        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-500">
        Cancel
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default ProfileComponent;
