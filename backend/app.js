const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const todoRouter = require("./routes/todoRouter");
require('dotenv').config();
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const users = {}; // { userId: socketId }

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("LogginUser", (userId) => {
    users[userId] = socket.id;
    console.log(`User ${userId} registered with socket ${socket.id}`);
  });

  socket.on("disconnect", () => {
    const userId = Object.keys(users).find((key) => users[key] === socket.id);
    if (userId) {
      delete users[userId];
      console.log(`User ${userId} disconnected`);
    }
  });
});

// Middleware to attach io and users object to req
app.use((req, res, next) => {
  req.io = io;
  req.users = users;
  next();
});

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(todoRouter);

server.listen(7000, (err) => {
  if (err) console.log("Server failed to start.");
  else console.log("Server running on port 7000.");
});
