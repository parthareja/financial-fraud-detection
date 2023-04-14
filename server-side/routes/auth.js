import express from "express";
import { register, login, logout } from "./../controllers/auth.js";
import { verifyToken } from "./../middleware/auth.js"

const router = express.Router();
// ROUTES
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/test", verifyToken)
// router.get("/authTemp", verifyToken, authTemp)


export default router;
