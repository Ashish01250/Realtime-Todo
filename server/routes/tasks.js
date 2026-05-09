import express from "express";

import {
  assignTask,
  getAllTasks,
  getMyTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import {
  verifyToken,
  verifyAdmin,
} from "../middleware/verifyToken.js";

const router =
  express.Router();

// ================= ASSIGN TASK =================
router.post(
  "/",
  verifyAdmin,
  assignTask
);

// ================= GET ALL TASKS =================
router.get(
  "/",
  verifyToken,
  getAllTasks
);

// ================= GET MY TASKS =================
router.get(
  "/my-tasks",
  verifyToken,
  getMyTasks
);

// ================= UPDATE TASK =================
router.put(
  "/:id",
  verifyToken,
  updateTask
);

// ================= DELETE TASK =================
router.delete(
  "/:id",
  verifyAdmin,
  deleteTask
);

export default router;