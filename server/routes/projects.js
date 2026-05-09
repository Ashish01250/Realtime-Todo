import express from "express";

import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import {
  verifyToken,
  verifyAdmin,
} from "../middleware/verifyToken.js";

const router =
  express.Router();

// ================= CREATE PROJECT =================
router.post(
  "/",
  verifyAdmin,
  createProject
);

// ================= GET PROJECTS =================
router.get(
  "/",
  verifyToken,
  getProjects
);

// ================= UPDATE PROJECT =================
router.put(
  "/:id",
  verifyAdmin,
  updateProject
);

// ================= DELETE PROJECT =================
router.delete(
  "/:id",
  verifyAdmin,
  deleteProject
);

export default router;