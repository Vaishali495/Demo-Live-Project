import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { useForm } from 'react-hook-form';
import edit from '../assets/edit.svg';
import {useAuth } from '../context/AuthContext';
import AxiosInstance from '../api/axiosInstance';

const EditDialogue = ({ mode, id, task,type }) => {
  const { setTasks } = useAuth();

  // Initialize form state with task data
  const [formData, setFormData] = useState({
    taskId:id || "",
    tasktitle: task?.tasktitle || '',
    taskDescription: task?.taskDescription || '',
    section: task?.section || '',
    currentProgress: task?.progress?.currProgress || '',
    priority: task?.priority || '',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      // console.log("formData: ",formData)
      const response = await AxiosInstance.post("/updateTask",formData);
      // console.log("from backend response",response.data)
      if (response.data.success) {
        message.success(response.data.message);
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task._id === formData.taskId ? { ...task, ...response.data.updatedTask } : task
          )
        );
        setIsModalOpen(false);
      } else {
        message.warning(response.data.message);
      }
    } catch (error) {
      console.error("Update failed:", error);
      // message.error(error);
      message.error(error.message || "An error occurred");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <button
        className="rounded-full hover:bg-slate-50"
        style={{
          filter: mode ? 'none' : 'invert(1) brightness(0.8)',
        }}
        onClick={showModal}
      >
        <img src={edit} alt="edit" />
      </button>
      <Modal
        title="Edit Task"
        open={isModalOpen}
        onOk={handleSubmit(handleOk)}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <div className="p-4">
          <form className="flex flex-col space-y-4">
            {/* Task Title */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Task Title</label>
              <input
                {...register('tasktitle', {
                  required: 'Task Title is required.',
                  validate: (value) => value.trim() !== '' || 'Task Title cannot be blank.',
                })}
                type="text"
                name="tasktitle"
                value={formData.tasktitle}
                onChange={handleChange}
                placeholder="Enter task title"
                className={`border rounded p-2 ${errors.tasktitle ? 'border-red-500' : ''}`}
              />
              {errors.tasktitle && <span className="text-red-500 text-xs">{errors.tasktitle.message}</span>}
            </div>

            {/* Task Description */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Task Description</label>
              <textarea
                {...register('taskDescription', {
                  required: 'Task Description is required.',
                  validate: (value) => value.trim() !== '' || 'Description cannot be blank.',
                })}
                name="taskDescription"
                value={formData.taskDescription}
                onChange={handleChange}
                placeholder="Enter task description"
                className={`border rounded p-2 ${errors.taskDescription ? 'border-red-500' : ''}`}
              />
              {errors.taskDescription && <span className="text-red-500 text-xs">{errors.taskDescription.message}</span>}
            </div>

            {/* Section */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Section</label>
              <input
                {...register('section', {
                  required: 'Section is required.',
                  validate: (value) => value.trim() !== '' || 'Section cannot be blank.',
                })}
                type="text"
                name="section"
                value={formData.section}
                disabled
                placeholder="Enter section"
                className={`border rounded p-2 hover:cursor-not-allowed ${errors.section ? 'border-red-500' : '' }`}
              />
              {errors.section && <span className="text-red-500 text-xs">{errors.section.message}</span>}
            </div>

            {/* Current Progress (1-10) */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Current Progress (0-9)</label>
              <input
                {...register('currentProgress', {
                  required: 'Progress is required.',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Progress must be at least 1.' },
                  max: { value: 9, message: 'Progress must be at most 9.' },
                })}
                type="number"
                name="currentProgress"
                value={type=="completed"?10:formData.currentProgress}
                disabled={type=="completed"}
                onChange={handleChange}
                placeholder="Enter progress"
                className={`border rounded p-2 ${errors.currentProgress ? 'border-red-500' : ''} ${type=="completed" ? "cursor-not-allowed":""}`}
              />
              {errors.currentProgress && <span className="text-red-500 text-xs">{errors.currentProgress.message}</span>}
            </div>

            {/* Priority (1-10) */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Priority (1-10)</label>
              <input
                {...register('priority', {
                  required: 'Priority is required.',
                  valueAsNumber: true,
                  min: { value: 1, message: 'Priority must be at least 1.' },
                  max: { value: 10, message: 'Priority must be at most 10.' },
                })}
                type="number"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                placeholder="Enter priority level"
                className={`border rounded p-2 ${errors.priority ? 'border-red-500' : ''}`}
              />
              {errors.priority && <span className="text-red-500 text-xs">{errors.priority.message}</span>}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default EditDialogue;