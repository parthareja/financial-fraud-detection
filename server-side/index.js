// import express from "express";
// import mongoose from "mongoose";
// import * as dotenv from 'dotenv';
// const dotenv = require("dotenv").config();
// const express = require("express");
// const register = require("./controllers/auth.js");
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
const app = express();
dotenv.config();

app.use(cors({origin:"http://localhost:3000"}))
app.use(express.json());
app.use("/auth", authRoutes);

app.get("/api", (req, res) => { res.send({ response: "Hell nah"})})
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
