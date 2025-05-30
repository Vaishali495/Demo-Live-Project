const taskModel = require("../models/taskSchema");
const assignModel = require("../models/assignedTaskSchema");
const userModel = require("../models/userSchema");
const { getUser } = require("./token");
const moment = require("moment");

const generateReport = async (req, res) => {
  console.log("----generate Report Called.");
  try {
    let extractedEmail = (await getUser(req.cookies.mycookie)).email;
    console.log(`Report for ${extractedEmail} being generated, please wait...`);

    // Find the user
    const user = await userModel.findOne({ email: extractedEmail });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Fetch all tasks associated with the user
    const tasks = await taskModel.find({ userId: user._id });
    const assignedTasks = await assignModel.find({ assignTo: extractedEmail }).populate("tasks.taskId");

    let report = {
      completed: 0,
      notStarted: 0,
      inProgress: 0,
      deadlinesPending: 0,
      deadlinesMissed: 0,
      // categoryCount: {},
      // mostCompletedCategory: "",
      assignedTotal: 0,
      assignedCompleted: 0,
    };

    let categoryCompletion = {};
    tasks.forEach((task) => {
      // Count tasks by section dynamically
      // if (report.categoryCount[task.section]) {
      //   report.categoryCount[task.section]++;
      // } else {
      //   report.categoryCount[task.section] = 1;
      // }

      // Categorize tasks based on section
      if (task.progress.currProgress == 10) report.completed++;
      if (task.progress.currProgress == 0) report.notStarted++;
      if (task.progress.currProgress >0 && task.progress.currProgress<10) report.inProgress++;

      // Count deadlinesPending and deadlinesMissed
      // if (task.progress.currProgress === 10) {
        if (new Date(task.progress.updatedAt) > new Date(task.dueDate)) {
          report.deadlinesMissed++;
        // }
      } else if (new Date(task.dueDate) > new Date() && task.progress.currProgress<10) {
        report.deadlinesPending++;
        console.log(report.deadlinesPending);
      }

      // Track category completion
      if (!categoryCompletion[task.section]) {
        categoryCompletion[task.section] = 0;
      }
      if (task.section === "completed") {
        categoryCompletion[task.section]++;
      }
    });

    // Count assigned tasks
    assignedTasks.forEach((assignedTask) => {
      report.assignedTotal += assignedTask.tasks.length;
      assignedTask.tasks.forEach((task) => {
        if (task.currProgress === 10) {
          report.assignedCompleted++;
        }
      });
    });

    // Determine most completed category
    // report.mostCompletedCategory = Object.keys(categoryCompletion).reduce((a, b) =>
    //   categoryCompletion[a] > categoryCompletion[b] ? a : b, "");

    res.json(report);
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { generateReport };
