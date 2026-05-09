import express from "express";

import User from "../models/User.js";

import {
  verifyAdmin,
} from "../middleware/verifyToken.js";

const router =
  express.Router();

// ================= SEARCH USERS =================
router.get(
  "/search",
  verifyAdmin,
  async (req, res) => {

    try {

      // ================= QUERY =================
      const query =
        req.query.q?.trim();

      // ================= EMPTY QUERY =================
      if (
        !query
      ) {

        return res.status(200).json({

          success: true,

          total: 0,

          users: [],

        });

      }

      // ================= SEARCH USERS =================
      const users =
        await User.find({

          role: "Member",

          $or: [

            {

              name: {

                $regex: query,

                $options: "i",

              },

            },

            {

              email: {

                $regex: query,

                $options: "i",

              },

            },

          ],

        })

          .select(
            "_id name email role"
          )

          .sort({

            createdAt: -1,

          })

          .limit(5);

      // ================= RESPONSE =================
      res.status(200).json({

        success: true,

        total: users.length,

        users,

      });

    } catch (err) {

      console.log(
        "User Search Error:",
        err
      );

      res.status(500).json({

        success: false,

        message:
          "Failed to search users",

      });

    }

  }
);

export default router;