const mongoose = require("mongoose");

const otp = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
  },
  createdAt: { type: Date, default: Date.now, expires: 120 },
});
const otpModel = mongoose.model("otps",otp);
module.exports=otpModel;