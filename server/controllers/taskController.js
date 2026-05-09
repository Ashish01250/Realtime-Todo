import Task from "../models/Task.js";

// ================= ASSIGN TASK =================
export const assignTask = async (
  req,
  res
) => {

  try {

    const {
      title,
      description,
      project,
      assignedTo,
      status,
    } = req.body;

    // ================= VALIDATION =================
    if (
      !title ||
      !description ||
      !project ||
      !assignedTo
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Please complete all fields",

      });

    }

    // ================= CREATE TASK =================
    const newTask =
      new Task({

        title,

        description,

        project,

        assignedTo,

        assignedBy:
          req.user.id,

        status:
          status || "Todo",

      });

    const savedTask =
      await newTask.save();

    // ================= RESPONSE =================
    res.status(201).json({

      success: true,

      message:
        "Task assigned successfully",

      task: savedTask,

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message:
        "Failed to assign task",

      error:
        err.message,

    });

  }

};

// ================= GET ALL TASKS =================
export const getAllTasks =
  async (req, res) => {

    try {

      const tasks =
        await Task.find()

          .populate(
            "project",
            "name"
          )

          .populate(
            "assignedTo",
            "name email"
          )

          .populate(
            "assignedBy",
            "name"
          )

          .sort({
            createdAt: -1,
          });

      res.status(200).json({

        success: true,

        total:
          tasks.length,

        tasks,

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch tasks",

        error:
          err.message,

      });

    }

  };

// ================= GET MY TASKS =================
export const getMyTasks = async (
  req,
  res
) => {

  try {

    const tasks =
      await Task.find({

        assignedTo:
          req.user.id,

      })

        .populate(
          "project",
          "name"
        )

        .populate(
          "assignedBy",
          "name"
        )

        .sort({
          createdAt: -1,
        });

    res.status(200).json({

      success: true,

      total:
        tasks.length,

      tasks,

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message:
        "Failed to fetch tasks",

      error:
        err.message,

    });

  }

};

// ================= UPDATE TASK =================
export const updateTask = async (
  req,
  res
) => {

  try {

    const updatedTask =
      await Task.findByIdAndUpdate(

        req.params.id,

        {
          $set: req.body,
        },

        {
          new: true,
        }

      )

        .populate(
          "project",
          "name"
        )

        .populate(
          "assignedTo",
          "name email"
        );

    if (!updatedTask) {

      return res.status(404).json({

        success: false,

        message:
          "Task not found",

      });

    }

    res.status(200).json({

      success: true,

      message:
        "Task updated successfully",

      task:
        updatedTask,

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message:
        "Failed to update task",

      error:
        err.message,

    });

  }

};

// ================= DELETE TASK =================
export const deleteTask = async (
  req,
  res
) => {

  try {

    const deletedTask =
      await Task.findByIdAndDelete(
        req.params.id
      );

    if (!deletedTask) {

      return res.status(404).json({

        success: false,

        message:
          "Task not found",

      });

    }

    res.status(200).json({

      success: true,

      message:
        "Task deleted successfully",

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message:
        "Failed to delete task",

      error:
        err.message,

    });

  }

};