import React, { useState } from "react";
import { Tooltip } from "antd";
import AxiosInstance from '../api/axiosInstance';
import analytics from "../assets/analytics.svg";


import ReportChart from './reportChart'
import { Button, Modal } from "antd";

const reportModal = ({ mode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportData , setReportData] = useState(null);

  const showModal = async () => {
    setIsModalOpen(true);
     const response = await AxiosInstance.get("/report");
    setReportData(response.data);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <>
              <Tooltip title="Report">
    
              <button className="w-8 h-8 rounded-full p-1 hover:bg-slate-800" onClick={showModal} >
            <img src={analytics} />
          </button>
          </Tooltip>
      <Modal
  title="Profile Report"
  open={isModalOpen}
  closable={true}
  width={700}
  onOk={handleOk}
  onCancel={() => setIsModalOpen(false)}
  style={{ top: 20 }}
   className="custom-modal"

  footer={[
    <Button key="ok" type="primary" onClick={handleOk}>
      Close
    </Button>,
  ]}
>
  <ReportChart data={reportData} />
</Modal>

    </>
  );
};

export default reportModal;
