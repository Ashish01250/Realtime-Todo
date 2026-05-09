import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

// Path: /api/auth/register
router.post("/register", authController.register);

// Path: /api/auth/login
router.post("/login", authController.login);

export default router;