// import express from "express";
// import mongoose from "mongoose";
// import * as dotenv from 'dotenv';
// const dotenv = require("dotenv").config();
// const express = require("express");
// const register = require("./controllers/auth.js");
import { createClient } from "redis";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import { verifyToken } from "./middleware/auth.js";

import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);

app.use(cookieParser(process.env.JWT_SECRET));
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

app.get("/api", (req, res) => {
  console.log("ap/i ok");
});
// MONGOOSE SET UP
// const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server port: ${PORT}`));
  })
  .catch((error) => console.log(`${error}, did not connect`));

export const redisClient = createClient({
  password: "pNEAZmplzuzGowEfenauaExS05fTuHO7",
  socket: {
    host: "redis-17085.c264.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 17085,
  },
});
redisClient.on("error", (error) => {
  console.log(error);
});
redisClient.on("connect", () => {
  console.log("Redis connected!");
});

redisClient.connect();

// module.exports = redisClient;
