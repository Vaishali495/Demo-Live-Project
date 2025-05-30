const assignModel = require("../models/assignedTaskSchema");
const userModel = require("../models/userSchema");
const { getUser } = require("./token");
const mongoose = require("mongoose");
const verifydate = (aDate, dDate) => {
  const assignDate = new Date(aDate);
  const dueDate = new Date(dDate);
  if (assignDate > dueDate) {
    return true;
  }
  return false;
};

// Fetches all the tasks that are assigned to the current loggedin users.
const getAssigned = async (req, res) => {
  console.log("getAssigned!!");
  try {
    let extractedEmail = (await getUser(req.cookies.mycookie)).email;
    let assignedTo = await userModel.findOne({ email: extractedEmail });
  console.log(assignedTo);
    const assignedTasks = await assignModel
      .find({ assignTo: extractedEmail })
      .populate([
        {
          path: "tasks.taskId",
          select: "tasktitle taskDescription _id",
        },
        {
          path: "assignerId",
          select: "username",
        },
      ]);
    if (assignedTasks.length === 0) {
      return res.json({
        message: "No assigned tasks found for this user.",
        success: false,
      });
    }
    let assignedTaskscurrent = assignedTasks.map((assignment) => {
      return {
        assignedBy: assignment.assignerId.username,
        assignTo: assignedTo.username,
        tasks: assignment.tasks.map((task) => {
          return {
            taskId: task.taskId._id, // Getting the _id from populated taskId
            tasktitle: task.taskId.tasktitle, // Task title from populated data
            taskDescription: task.taskId.taskDescription, // Task description from populated data
            assignDate: task.assignDate,
            dueDate: task.dueDate,
            currProgress: task.currProgress,
            status: task.status,
          };
        }),
      };
    });

    console.log("AssignTaskscurr: ", assignedTaskscurrent);
    res.json({ assignedTaskscurrent, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching assigned tasks.",
      error: error.message,
      success: false,
    });
  }
};

// get users you can assign task and also the tasks that can be assigned
const getUserList = async (req, res) => {
  const user = await getUser(req.cookies.mycookie);
  try {
    const otherUsers = await userModel.find({ _id: { $ne: user.id } });
    // const tasksCanBeAssigned = await taskModel.find({ userId: user.id });
    res.json({ users: otherUsers, success: true });
  } catch (err) {
    console.log("Error fetching data for assign Tasks: ", err);
    res.json({
      success: false,
      message: "Error fetching data for assign Tasks",
    });
  }
};

// assignTask to user
const assignTask = async (req, res) => {
  const { email, taskId, assignDate, dueDate } = req.body;
  const { currProgress } = req.body || 0;
  const { io } = req.io;
  console.log(req.body);

  if (!verifydate(assignDate, dueDate)) {
    const user = await getUser(req.cookies.mycookie);
    console.log("user", user);

    if (user) {
      try {
        // Find the existing assignment for the given assignerId and assignTo
        const dataExists = await assignModel.findOne({
          assignerId: user.id,
          assignTo: email,
        });

        if (dataExists) {
          // Check if the task with the same taskId already exists in the tasks array
          const taskExists = dataExists.tasks.some(
            (task) => task.taskId.toString() === taskId.toString()
          );

          if (taskExists) {
            // If the taskId already exists in the tasks array, deny adding the new task
            res.json({
              message: "Task with this ID already assigned to this user!",
              success: false,
            });
          } else {
            // If the taskId doesn't exist, add the new task to the tasks array
            const updateData = await assignModel
              .findByIdAndUpdate(
                { _id: dataExists._id },
                {
                  $push: {
                    tasks: { taskId, assignDate, dueDate, currProgress },
                  },
                },
                { new: true } // Ensure that the updated document is returned
              )
              .populate("tasks.taskId");
            // const assignedUser = await userModel.findOne({ email: email });
            // console.log("data",assignedUser);
            // const assignedToSocketId = req.users?.[assignedUser._id];
            // console.log("Socket ID for assigned user:", assignedToSocketId);

            // if (assignedToSocketId && io.sockets.sockets.get(assignedToSocketId)) {
            //   io.to(assignedToSocketId).emit("taskAssigned", {
            //     taskTitle: updateData.tasks[updateData.tasks.length - 1].taskId.tasktitle,
            //     assignerEmail: user.email,
            //   });
            //   console.log("Task notification sent to:", assignedUser.email);
            // } else {
            //   console.log("User not online, skipping notification.");
            // }

            res.json({ message: "Task Assigned Successfully!", success: true });
          }
        } else {
          // If no existing data, create a new assignment for the user
          const newAssignTask = new assignModel({
            assignerId: user.id,
            assignTo: email,
            tasks: [{ taskId, assignDate, dueDate, currProgress }],
          });
          await newAssignTask.save();
          res.json({ message: "Task Assigned Successfully!", success: true });
        }
      } catch (error) {
        console.log("Error Assigning Tasks", error);
        res.json({ message: "Error Assigning Tasks", success: false });
      }
    } else {
      res.json({ message: "Please Login First", success: false });
    }
  }
};
const updateAssignedTaskProgress = async (req, res) => {
  const { assignedBy, assignTo, currProgress, taskId } = req.body;
  console.log(req.body);
  try {
    let assignerId = await userModel.findOne({ username: assignedBy });
    assignerId = assignerId._id;
    let assignToId = await userModel.findOne({ username: assignTo });
    assignToId = assignToId.email;
    // console.log(assignerId,assignToId);
    const updatedTask = await assignModel.findOneAndUpdate(
      {
        assignerId,
        assignTo: assignToId,
        "tasks.taskId": new mongoose.Types.ObjectId(taskId), // Ensure taskId is an ObjectId
      },
      {
        $set: { "tasks.$.currProgress": currProgress }, // Update currProgress
      },
      {
        new: true, // Return the updated document
      }
    );
    // console.log("UpdatedTask ",updatedTask);
    if(updatedTask){
      res.json({message:"Progress Updated!!",success:true})
    }else{
      res.json({message:"Progress Updation failed!!",success:false})
    }
  } catch (err) {
    console.log("Error updating assigned task: ", err);
    res.json({ message: "Error updating Progress of Assigned Task", success: false });
  }
};
module.exports = {
  getAssigned,
  getUserList,
  assignTask,
  updateAssignedTaskProgress,
};
