import express from "express";

import { testRoute } from "../controllers/dashboard.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/test", verifyToken, testRoute);

export default router;
