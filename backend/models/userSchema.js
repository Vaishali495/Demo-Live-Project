const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/TodoDashboard")
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB is not connected:", err);
  });

const User = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: "/images/profile.jpg",
  },
  googleId: {
    type: String,
  },
  mytasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tasks",
    },
  ],
  sections: {
    type: [String],
    default: ["todo", "inProgress", "completed"],
  },
});

// Commonly used for validations , checking documents before saving
User.pre("save", function (next) {
  //this refres to mongoose document
  // here we check if both are empty
  if (!this.password && !this.googleId) {
    return next(new Error("Either password or googleId must be provided."));
  }
  //next works if any of both  field is present
  next();
});

const userModel = mongoose.model("users", User);

module.exports = userModel;
