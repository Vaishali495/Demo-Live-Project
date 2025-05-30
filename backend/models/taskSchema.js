// Schema for task
const mongoose = require("mongoose"); //firstly require the module moongose its third party which we had installed
// Defining a separate schema for progress to track updatedAt
const progressSchema = new mongoose.Schema({
  currProgress: { type: Number, min: 0, max: 10, default: 0 }
}, { timestamps: { createdAt: false, updatedAt: true } }); // Only updatedAt will be tracked

const tasks = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    tasktitle: {
      type: String,
      required: true,
    },
    taskDescription: {
      type: String,
    },
    section: {
      type: String,
      default: "todo",
    },
    progress:progressSchema,
    assignDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      default: Date.now,
    },
    comments: [
      {
        username: {
          type: String,
        },
        comment: {
          type: String,
        },
        timestamp: {
          type: String,
        },
      },
    ],
    isDisable: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: Number,
      min: 1,
      max: 10,
      default: 1,
    },
  },
  { timestamps: true }
);
const taskModel = mongoose.model("tasks", tasks);
module.exports = taskModel;
