import express from "express";
import { register, login, logout, jwtGetUser, saveQuery, userTransactions } from "./../controllers/auth.js";
import { verifyToken } from "./../middleware/auth.js"

const router = express.Router();
// ROUTES
router.post("/register", register);
// router.post("/login", verifyToken, login);  // //ONLY FOR TESTING
router.post("/login", login);
router.get("/logout", verifyToken, logout);
router.get("/test", verifyToken)
router.get("/jwtGetUser", jwtGetUser)
router.post("/saveQuery", saveQuery)
router.get("/userTransactions/:user_id", userTransactions)

// router.get("/authTemp", verifyToken, authTemp)


export default router;
