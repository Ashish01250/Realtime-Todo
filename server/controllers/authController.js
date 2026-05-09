import User from "../models/User.js";

import jwt from "jsonwebtoken";

// ================= REGISTER =================
export const register =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
        role,
      } = req.body;

      // ================= VALIDATION =================
      if (
        !name ||
        !email ||
        !password
      ) {

        return res.status(400).json({

          success: false,

          message:
            "All fields are required",

        });

      }

      // ================= CHECK USER =================
      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {

        return res.status(400).json({

          success: false,

          message:
            "Email already exists",

        });

      }

      // ================= CREATE USER =================
      const newUser =
        new User({

          name,

          email,

          password,

          role,

        });

      // ================= SAVE =================
      const savedUser =
        await newUser.save();

      // ================= REMOVE PASSWORD =================
      const {
        password: _,
        ...userData
      } = savedUser._doc;

      // ================= RESPONSE =================
      res.status(201).json({

        success: true,

        message:
          "Registration successful",

        user: userData,

      });

    } catch (err) {

      console.log(
        "Signup Error:",
        err
      );

      res.status(500).json({

        success: false,

        message:
          "Signup failed",

        error: err.message,

      });

    }

  };

// ================= LOGIN =================
export const login =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      // ================= VALIDATION =================
      if (
        !email ||
        !password
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Email and password required",

        });

      }

      // ================= FIND USER =================
      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid credentials",

        });

      }

      // ================= CHECK PASSWORD =================
      const isMatch =
        await user.comparePassword(
          password
        );

      if (!isMatch) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid credentials",

        });

      }

      // ================= JWT TOKEN =================
      const token =
        jwt.sign(

          {
            id: user._id,
            role: user.role,
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "3d",
          }

        );

      // ================= REMOVE PASSWORD =================
      const {
        password: _,
        ...userData
      } = user._doc;

      // ================= RESPONSE =================
      res.status(200).json({

        success: true,

        message:
          "Login successful",

        token,

        ...userData,

      });

    } catch (err) {

      console.log(
        "Login Error:",
        err
      );

      res.status(500).json({

        success: false,

        message:
          "Login failed",

        error: err.message,

      });

    }

  };