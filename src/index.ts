const express = require("express") as typeof import("express");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const { authenticate } = require("./middleware/auth.middleware");
const http = require("http");
const { Server } = require("socket.io");
const { logger } = require("./middleware/logger.middleware");
console.log("LOGGER IMPORT:", logger);
require("dotenv").config();


const app = express();
const PORT = 3000;

app.use(express.json()); // VERY IMPORTANT
app.use(logger);
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/protected", authenticate, (req: any, res: any) => {
  res.json({
    message: "You accessed protected route",
    user: req.user
  });
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.set("io", io);

io.on("connection", (socket:any) => {
    console.log("Client connected:", socket.id);
});

const { errorHandler } = require("./middleware/error.middleware");
app.use(errorHandler);

server.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}`)
});

