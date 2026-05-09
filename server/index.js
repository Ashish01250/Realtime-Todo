import express from "express";

import dotenv from "dotenv";

import cors from "cors";

// ================= ROUTES =================
import authRoutes from "./routes/auth.js";

import projectRoutes from "./routes/projects.js";

import taskRoutes from "./routes/tasks.js";

import userRoutes from "./routes/users.js";

import dashboardRoutes from "./routes/dashboard.js";

// ================= DATABASE =================
import connectDB from "./config/db.js";

// ================= CONFIG =================
dotenv.config();

// ================= APP =================
const app = express();

// ================= DATABASE CONNECTION =================
connectDB();

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://upbeat-abundance-production-027b.up.railway.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ================= API HEALTH CHECK =================
app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message:
      "Ethara AI API Running Successfully",

  });

});

// ================= API ROUTES =================

// AUTH ROUTES
app.use(
  "/api/auth",
  authRoutes
);

// PROJECT ROUTES
app.use(
  "/api/projects",
  projectRoutes
);

// TASK ROUTES
app.use(
  "/api/tasks",
  taskRoutes
);

// USER ROUTES
app.use(
  "/api/users",
  userRoutes
);

// DASHBOARD ROUTES
app.use(
  "/api/dashboard",
  dashboardRoutes
);

// ================= 404 ROUTE HANDLER =================
app.use((req, res) => {

  res.status(404).json({

    success: false,

    message:
      "API Route Not Found",

  });

});

// ================= GLOBAL ERROR HANDLER =================
app.use(
  (
    err,
    req,
    res,
    next
  ) => {

    console.error(
      "Global Error:",
      err
    );

    res.status(
      err.status || 500
    ).json({

      success: false,

      message:
        err.message ||
        "Internal Server Error",

    });

  }
);

// ================= SERVER =================
const PORT =
  process.env.PORT || 8080;

app.listen(PORT, () => {

  console.log(
    `🚀 Server Running on Port ${PORT}`
  );

});