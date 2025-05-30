const mongoose = require("mongoose");
const assignTasks = new mongoose.Schema({
  assignerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  assignTo:{
    type:String,
  },
  tasks: [
    {
      taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tasks",
      },
      assignDate: {
        type: Date,
        default: Date.now,
      },
      dueDate: {
        type: Date,
        default: Date.now,
      },
      currProgress:{
        type:Number,
        min:0,
        max:10,
        default:0
      },
      status:{
        type:String,
        default:"pending"
      }
    },
  ],
});
const assignModel = mongoose.model("assignTasks", assignTasks);
module.exports = assignModel;
