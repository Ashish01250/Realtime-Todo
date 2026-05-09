import express from "express";

import Task from "../models/Task.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

import { verifyAdmin }
  from "../middleware/verifyToken.js";

const router = express.Router();

router.get(
  "/stats",
  verifyAdmin,
  async (req, res) => {

    try {

      // TOTALS
      const totalProjects =
        await Project.countDocuments();

      const totalUsers =
        await User.countDocuments({
          role: "Member",
        });

      const totalTasks =
        await Task.countDocuments();

      // TASK STATUS
      const todoTasks =
        await Task.countDocuments({
          status: "Todo",
        });

      const progressTasks =
        await Task.countDocuments({
          status: "In Progress",
        });

      const completedTasks =
        await Task.countDocuments({
          status: "Done",
        });

      res.status(200).json({

        totalProjects,
        totalUsers,
        totalTasks,

        todoTasks,
        progressTasks,
        completedTasks,

      });

    } catch (err) {

      res.status(500).json({
        message:
          "Failed to fetch stats",
      });

    }

  }
);

export default router;