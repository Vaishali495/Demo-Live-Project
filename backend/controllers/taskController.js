const assignModel = require("../models/assignedTaskSchema");
const taskModel = require("../models/taskSchema");
const userModel = require("../models/userSchema");
const { getUser } = require("./token");

const verifydate = (aDate, dDate) => {
  const assignDate = new Date(aDate);
  const dueDate = new Date(dDate);
  if (assignDate > dueDate) {
    return true;
  }
  return false;
};
// Add new task

const addTask = async (req, res) => {
  const user = getUser(req.cookies.mycookie);
  const userId = user.id;
  const {
    tasktitle,
    taskDescription,
    section,
    currentProgress,
    priority,
    assignDate,
    dueDate,
  } = req.body;
  if (!verifydate(assignDate, dueDate)) {
    try {
      const newTask = new taskModel({
        tasktitle,
        taskDescription,
        section,
        progress: { currProgress: currentProgress },
        priority,
        userId,
        assignDate,
        dueDate,
      });
      const savedTask = await newTask.save();
      if (savedTask) {
        try {
          await userModel.findByIdAndUpdate(
            { _id: user.id },
            {
              $push: { mytasks: savedTask._id },
            }
          );
          res.status(201).json({ savedTask, success: true });
        } catch (err) {
          console.log("Error in id pushing in sectionModel", err);
          res.json({ message: "Error in id pushing !", success: false });
        }
      }
      // res.status(201).json(savedTask);
    } catch (err) {
      console.log(err);
      res.json({ error: "Failed to add task", success: false });
    }
  } else {
    res.json({
      message: "assignDate should be less than or equal to Due date",
      success: false,
    });
  }
};

// update existing task
const updateTask = async (req, res) => {
  console.log("am here");
  console.log(req.body);
  const {
    taskId,
    tasktitle,
    taskDescription,
    section,
    currentProgress,
    priority,
  } = req.body;
  if (currentProgress === '10') {
    return res.json({
      success: false,
      message: "Move it to the completed section",
    });
  }
  try {
    const newTask = await taskModel.findByIdAndUpdate(
      taskId,
      {
        tasktitle,
        taskDescription,
        section,
        progress:{currProgress:currentProgress},
        priority,
      },
      { new: true }
    );
    if (newTask) {
      res
        .status(200)
        .json({
          updatedTask: newTask,
          message: "Task updated successfully",
          success: true,
        });
    } else {
      res.json({ message: "Task updation failed!!", success: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: "Failed to update task", success: false });
  }
};

// disable the task
const disableTask = async (req, res) => {
  const { taskId } = req.body;
  const user = getUser(req.cookies.mycookie);
  // console.log(req.body);
  if (user && taskId) {
    try {
      const newTask = await taskModel.findByIdAndUpdate(taskId, {
        isDisable: true,
      });
      const updateUser = await userModel.findByIdAndUpdate(
        { _id: user.id },
        {
          $pull: { mytasks: taskId },
        }
      );
      const assignedTasks = await assignModel.findOneAndUpdate(
        { assignerId: user.id },
        {
          $pull: { tasks: taskId },
        }
      );
      if (newTask && updateUser)
        res
          .status(200)
          .json({ message: "Task deleted successfully", success: true });
      else res.json({ message: "Task deleted unsuccessfull", success: false });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to delete task", success: false });
    }
  }
  if (!user) {
    res.json({ message: "Please Login first", success: false });
  }
  if (!taskId) {
    res.json({ message: "Please send a valid taskId", success: false });
  }
};

// add a new section to existing sections
const addNewSection = async (req, res) => {
  const user = getUser(req.cookies.mycookie);
  const { section } = req.body;
  try {
    const newSection = await userModel.findByIdAndUpdate(
      { _id: user.id },
      {
        $addToSet: { sections: section },
      },
      { new: false }
    );
    if (!newSection.sections.includes(section)) {
      res
        .status(200)
        .json({ message: `${section} added successfully!!`, success: true });
    } else {
      res
        .status(200)
        .json({ message: `${section} already exists!!`, success: false });
    }
  } catch (err) {
    console.log("Error adding new section: ", err);
    res.status(500).json({ error: "Failed to add section" });
  }
};

// update section of a task (for drag and drop)
const updateSection = async (req, res) => {
  const { taskId, section } = req.body;
  let updatedTask=null;
  try {
    if (section == "completed") {
      updatedTask = await taskModel.findByIdAndUpdate(
        { _id: taskId },
        {
          section: section,
          progress:{currProgress:10}

        },
        { new: true }
      );
    }else{
      updatedTask = await taskModel.findByIdAndUpdate(
        { _id: taskId },
        {
          section: section,
        },
        { new: true }
      );
    }
    if (updatedTask) {
        res.json({
          updatedTask,
          success: true,
          message: "Section updated successfully!!",
        });
      } else {
        res.json({ message: "Send valid data for updation", success: false });
      }
  } catch (err) {
    console.log("Error Updating Section: ", err);
    res.status(500).json({ message: "Error Updating Section", success: false });
  }
};
module.exports = {
  addTask,
  addNewSection,
  updateTask,
  disableTask,
  updateSection
};
