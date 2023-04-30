import express from "express";
import { register, login, logout, jwtGetUser } from "./../controllers/auth.js";
import { verifyToken } from "./../middleware/auth.js";

const router = express.Router();
// ROUTES
router.post("/register", register);
// router.post("/login", verifyToken, login);  // //ONLY FOR TESTING
router.post("/login", login);
router.get("/logout", verifyToken, logout);
router.get("/test", verifyToken, verifyToken);
router.get("/jwtGetUser", verifyToken, jwtGetUser);
// router.get("/authTemp", verifyToken, authTemp)

export default router;
