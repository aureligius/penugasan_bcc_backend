const { io } = require("socket.io-client");

console.log("Starting socket client...");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

socket.on("taskCreated", (data) => {
  console.log("Task Created:", data);
});

socket.on("taskUpdated", (data) => {
  console.log("Task Updated:", data);
});

socket.on("taskDeleted", (data) => {
  console.log("Task Deleted:", data);
});

socket.on("connect_error", (err) => {
  console.log("Connection error:", err.message);
});