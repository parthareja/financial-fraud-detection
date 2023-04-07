// import express from "express";
// import mongoose from "mongoose";
// import * as dotenv from 'dotenv';
// const dotenv = require("dotenv").config();
// const express = require("express");
// const register = require("./controllers/auth.js");
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv" 
import authRoutes from "./routes/auth.js"

const app = express();
app.use(express.json());
dotenv.config()
app.use("/auth", authRoutes)


// MONGOOSE SET UP
// const mongoose = require("mongoose");


const PORT = process.env.PORT || 8081;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: false
}).then(() => {
    app.listen(PORT, () => console.log(`server port: ${PORT}`));
}).catch((error) => console.log(`${error}, did not connect`))

