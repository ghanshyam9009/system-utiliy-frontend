// import axios from "axios";

// // const API_BASE = "http://localhost:5000/api";
// const API_BASE = "https://system-utility-backend.onrender.com/api";

// export const fetchAllMachines = async () => {
//   const res = await axios.get(`${API_BASE}/all-machines`);
//   return res.data;
// };

// export const fetchFilteredMachines = async (filters) => {
//   // filters = { sleepMin, sleepMax, avActive, diskEncrypted, osLatest, hostname, platform }
//   const res = await axios.get(`${API_BASE}/machines/filter`, { params: filters });
//   return res.data;
// };




import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import systemRoutes from "./routes/systemRoutes.js";
import machineRoutes from "./routes/machineRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import { connectDB } from "./config/db.js";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import MainSystemData from "./models/MainSystemData.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP server and attach Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  },
});

// Middleware
app.use(cors()); // Allow all origins
app.use(bodyParser.json());

// Routes
app.use("/api", systemRoutes);
app.use("/api", machineRoutes);
app.use("/api", historyRoutes);

// Test route
app.get("/", (req, res) => res.send("System Utility API is running"));

// Connect to DB
connectDB().then(() => {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  // ------------------------------
  // MongoDB Change Stream
  // ------------------------------
  const collection = mongoose.connection.collection("mainsystemdatas");
  const changeStream = collection.watch();

  changeStream.on("change", (change) => {
    console.log("Change detected:", change.operationType);

    if (change.operationType === "insert") {
      const newMachine = change.fullDocument;
      io.emit("newMachine", newMachine);
    }

    if (change.operationType === "update") {
      const updatedId = change.documentKey._id;
      const updatedFields = change.updateDescription.updatedFields;
      io.emit("updateMachine", { updatedId, updatedFields });
    }

    if (change.operationType === "delete") {
      const deletedId = change.documentKey._id;
      io.emit("deleteMachine", deletedId);
    }
  });
});

// Export io for other modules if needed
export { io };
