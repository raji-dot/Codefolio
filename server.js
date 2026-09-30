require("dotenv").config(); // Run this at the absolute top first line
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dns = require("dns");

// Set stable DNS servers to prevent Mongoose timeout errors on certain networks
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

// Global App Interceptors
app.use(cors());
app.use(express.json());

// Base Health Check Route
app.get("/", (req, res) => res.send("CodeFolio API Running"));

// Core Modular API Router Bindings
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));

// Database Connection & Server Initialization Pipeline
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1); // Stop execution immediately if database fails
  });
