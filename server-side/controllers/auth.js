import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { isJwtExpired } from "jwt-check-expiration";

import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import Cookies from "js-cookie";
import QueryData from "../models/QueryData.js";

import User from "../models/User.js";
import { redisClient } from "../index.js";
// import * as dotenv from "dotenv";

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User.js");

const maxAge = 60 * 60;

//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { firstName: "", lastName: "", email: "", password: "" };

  //duplicate error code
  if (err.code === 11000) {
    errors.email = "The email you entered is already registered";
    return errors;
  }

  //validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// REGISTER USER
export const register = async (req, res) => {
  console.log("login attempted");
  try {
    console.log(req.body);
    const { firstName, lastName, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    console.log(salt);
    console.log(password);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: maxAge,
    });
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(201).json(savedUser);
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);

    res.status(500).json({ errors });
  }
};

export const login = async (req, res) => {
  console.log("login attempted");
  const jwt = req.body.jwt;

  if (isJwtExpired(jwt)) {
    res.send(false);
    console.log("JWT expired:", userjwt);
  } else {
    const decodedJWT = jwt_decode(jwt);
    console.log("goodauth:", decodedJWT);
    var user = {
      _id: decodedJWT.sub,
      name: decodedJWT.name,
      email: decodedJWT.email,
      picture: decodedJWT.picture,
    };
    res.cookie("jwt", jwt, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json(user);
  }
  // try {
  //   const jwt = req.body.jwt;

  //   if (isJwtExpired(userjwt)) {
  //     res.send(false);
  //     console.log("JWT expired:", userjwt);
  //   } else {
  //     console.log("goodauth:", decodedToken);
  //     decoded_jwt = jwt_decode(jwt);
  //     var user = {
  //       _id: decoded_jwt.aud,
  //       name: decoded_jwt.name,
  //       email: decoded_jwt.email,
  //       picture: decoded_jwt.picture,
  //     };
  //     res.cookie("jwt", jwt, { httpOnly: false, maxAge: maxAge * 1000 });
  //     res.status(200).json(user);
  //   }
  // } catch (err) {
  //   // const errors = handleErrors(err);
  //   console.log(err);
  //   res.status(500).json({ errors });
  // }
};
// export const login = async (req, res) => {
//   console.log("login attempted");
//   try {
//     const { email, password } = req.body;
//     console.log(email, password);
//     const user = await User.findOne({ email: email });
//     if (!user) return res.status(400).json({ msg: "User does not exist." });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid password." });
//     const maxAge = 60 * 30;
//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: maxAge,
//     });
//     delete user.password;
//     res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
//     res.status(200).json(user);
//   } catch (err) {
//     const errors = handleErrors(err);
//     console.log(errors);
//     res.status(500).json({ errors });
//   }
// };

export const logout = async (req, res) => {
  var userjwt = 0;
  let cookies = {};
  const cookiesArray = req.headers.cookie.split(";");
  cookiesArray.forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    cookies[key] = value;
  });
  userjwt = cookies["jwt"];
  const token_key = `bl_${userjwt}`;
  await redisClient.set(token_key, userjwt);
  redisClient.expire(token_key, maxAge);
  // res.cookie("jwt", "", { maxAge: 1 }); //////////////////////////////////// BAD WAY TO DO
  res.clearCookie("jwt");
  res.send(false);
  console.log("logged out and token invalidated");
};

// export const authTemp = async (req, res) => {
//   console.log("ok")}

// JWT PAYLOAD DECRYPT

function getPayloadFromToken(token) {
  const decodedToken = jwt.decode(token, {
    complete: true,
  });
  if (!decodedToken) {
    throw new Parse.Error(
      Parse.Error.OBJECT_NOT_FOUND,
      `provided token does not decode as JWT`
    );
  }
  return decodedToken.payload;
}

//JWT TO USER_INFO
export const defaultLoginJWTGetUser = async (req, res, next) => {
  try {
    // console.log("fetching user data from jwt");
    let cookies = {};
    const cookiesArray = req.headers.cookie.split(";");
    cookiesArray.forEach((cookie) => {
      const [key, value] = cookie.trim().split("=");
      cookies[key] = value;
    });
    // res.json(cookies);

    const userjwt = cookies["jwt"];
    // console.log("JWT: ", userjwt);
    const decodedJWT = jwt_decode(userjwt);
    var user = {
      _id: decodedJWT.sub,
      name: decodedJWT.name,
      email: decodedJWT.email,
      picture: decodedJWT.picture,
    };

    const inDenyList = await redisClient.get(`bl_${userjwt}`);
    // console.log(inDenyList);
    if (inDenyList) {
      res.send(false);
      console.log("blacklisted");
    } else {
      if (isJwtExpired(userjwt)) {
        res.send(false);
        console.log("JWT expired:", decodedJWT);
      } else {
        console.log("goodauth defaultLogin:", decodedJWT);
        res.json(user);
      }
    }
    // console.log("User by userId", userJson);
  } catch (err) {
    console.log(err);
    res.send(false);
  }
};

export const saveQuery = async (req, res) => {
  try {
    const query = new QueryData(req.body);
    await query.save();
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.send("Qery data stored successfully");
    // console.log
  } catch (err) {
    console.log(err.message);
    res.send({ msg: err });
  }
};

export const userTransactions = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await QueryData.find({ user_id: user_id });
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.json(data);
  } catch (err) {
    res.send({ msg: err });
  }
};

// const handleQueryErrors = (err)=>{
//   console.log(err.message,err.code);
//   let errors = {user_id : "", alias: "",step:"",amount:"",oldbalanceOrg:"",oldbalanceDest:"",origBalance_inacc:"",destBalance_inacc:"",type_CASH_OUT:"",type_TRANSFER:""}

// }

// app.delete("/delete/:id",async(req,res)=>{
//   const {id} = req.params
//   await users.deleteOne({_id:id})
//   res.send("delt successfully")
// })

export const deleteUserTransaction = async (req, res) => {
  try {
    const { transac_id } = req.params;
    await QueryData.deleteOne({ _id: transac_id });
    res.send("Successfully deleted user transaction");
  } catch (err) {
    res.send({ msg: err });
  }
};
