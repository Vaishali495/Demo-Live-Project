import React from "react";
import {
  Dropdown,
  Space,
  Spin,
  message,
  Popconfirm,
  DatePicker,
  InputNumber,
  Button,
} from "antd";
import { useForm, Controller } from "react-hook-form"; // ✅ React Hook Form
import { useAuth } from "../context/AuthContext";
import users from "../assets/users.svg";
import AxiosInstance from "../api/axiosInstance";

const UserList = ({ mode, id }) => {
  const { userList, setUserList } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      assignDate: null,
      dueDate: null,
      progress: 0,
    },
  });
  

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get("/getUserList");
      // console.log("hiii:",response.data);
      if (response.data.success) {
        setUserList(response.data.users || []);
        setOpen((prev) => !prev);
      } else {
        message.warning(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignTask = async (data, user) => {
    const { assignDate, dueDate, progress } = data;

    if (!assignDate || !dueDate || progress === undefined) {
      message.warning("Please fill all fields (Assign Date, Due Date, and Progress).");
      return;
    }

    if (assignDate.isAfter(dueDate)) {
      message.error("Due Date cannot be earlier than Assign Date.");
      return;
    }

    const obj = {
      email: user.email,
      taskId: id,
      assignDate: assignDate.format("YYYY-MM-DD"),
      dueDate: dueDate.format("YYYY-MM-DD"),
      currProgress: progress,
    };

    // console.log("obj: ",obj);

    const response = await AxiosInstance.post("/assignTask", obj);
    // console.log("assign Response: ",response.data);

    if(response.data.success){
      message.success(`Task assigned to ${user.username}`);
      reset();
    }
    else{
      message.warning(response.data.message);
    }
    reset();
    setIsConfirmVisible(false); // Close PopConfirm
    closeModal();
  };

  const items = userList.map((user, index) => ({
    key: index,
    label: (
      <Popconfirm
      arrow={false}
        title={`Assign task to ${user.username}?`}
        description={
          <form onSubmit={handleSubmit((data) => handleAssignTask(data, user))}>
            {/* Assign Date */}
            <div className="mb-4">
              <p className="text-sm font-medium">Select Assign Date:</p>
              <Controller
                name="assignDate"
                control={control}
                rules={{ required: "Assign Date is required!" }}
                render={({ field, fieldState }) => (
                  <>
                    <DatePicker className="w-full" {...field} />
                    {fieldState.error && <p className="text-red-500 text-xs">{fieldState.error.message}</p>}
                  </>
                )}
              />
            </div>

            {/* Due Date */}
            <div className="mb-4">
              <p className="text-sm font-medium">Select Due Date:</p>
              <Controller
                name="dueDate"
                control={control}
                rules={{ required: "Due Date is required!" }}
                render={({ field, fieldState }) => (
                  <>
                    <DatePicker className="w-full" {...field} />
                    {fieldState.error && <p className="text-red-500 text-xs">{fieldState.error.message}</p>}
                  </>
                )}
              />
            </div>

            {/* Progress */}
            <div className="mb-4">
              <p className="text-sm font-medium">Enter Progress (0-9):</p>
              <Controller
                name="progress"
                control={control}
                rules={{
                  required: "Progress is required!",
                  min: { value: 0, message: "Minimum value is 0" },
                  max: { value: 9, message: "Maximum value is 9" },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <InputNumber className="w-full" min={0} max={9} {...field} />
                    {fieldState.error && <p className="text-red-500 text-xs">{fieldState.error.message}</p>}
                  </>
                )}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              {/* <Button type="default" onClick={() => setOpen(false)} className="bg-gray-400 hover:bg-gray-500 text-white">
                Cancel
              </Button> */}
              <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                OK
              </Button>
            </div>
          </form>
        }
        onConfirm={() => {}}
        // okText="Yes"
        // cancelText="No"
        showCancel={false}
        okButtonProps={{ style: { display: "none" } }} 
        placement="bottomLeft"
      >
        <span>{user.username}</span>
      </Popconfirm>
    ),
  }));

  return (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown
          menu={{ items }}
          placement="bottomLeft"
          arrow={{ pointAtCenter: true }}
          trigger={["click"]}
        >
          <button className="rounded-full hover: cursor-pointer" onClick={handleClick}>
            {loading ? (
              <Spin />
            ) : (
              <img
                src={users}
                alt="users"
                className="w-5 h-5"
                style={{ filter: mode ? "none" : "invert(1)" }}
              />
            )}
          </button>
        </Dropdown>
      </Space>
    </Space>
  );
};

export default UserList;
