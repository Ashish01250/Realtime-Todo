import Project from "../models/Project.js";
import Task from "../models/Task.js";

// ================= CREATE PROJECT =================
export const createProject = async (
  req,
  res
) => {

  try {

    const {
      name,
      description,
    } = req.body;

    if (!name) {

      return res.status(400).json({

        success: false,

        message:
          "Project name is required",

      });

    }

    const newProject =
      new Project({

        name,

        description,

        owner: req.user.id,

      });

    const savedProject =
      await newProject.save();

    res.status(201).json({

      success: true,

      project: savedProject,

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message:
        "Failed to create project",

    });

  }

};

// ================= GET PROJECTS =================
export const getProjects = async (
  req,
  res
) => {

  try {

    const projects =
      await Project.find()

        .populate(
          "owner",
          "name email"
        )

        .sort({
          createdAt: -1,
        });

    const projectsWithStats =
      await Promise.all(

        projects.map(
          async (project) => {

            const tasks =
              await Task.find({
                project:
                  project._id,
              });

            const totalTasks =
              tasks.length;

            const completedTasks =
              tasks.filter(
                (task) =>
                  task.status ===
                  "Done"
              ).length;

            const progress =
              totalTasks > 0
                ? Math.round(
                    (completedTasks /
                      totalTasks) *
                      100
                  )
                : 0;

            return {

              ...project._doc,

              totalTasks,

              completedTasks,

              progress,

            };

          }
        )

      );

    res.status(200).json({

      success: true,

      projects:
        projectsWithStats,

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message:
        "Failed to fetch projects",

    });

  }

};

// ================= UPDATE PROJECT =================
export const updateProject = async (
  req,
  res
) => {

  try {

    const updatedProject =
      await Project.findByIdAndUpdate(

        req.params.id,

        {
          $set: req.body,
        },

        {
          new: true,
        }

      );

    res.status(200).json({

      success: true,

      project:
        updatedProject,

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message:
        "Failed to update project",

    });

  }

};

// ================= DELETE PROJECT =================
export const deleteProject = async (
  req,
  res
) => {

  try {

    await Task.deleteMany({
      project:
        req.params.id,
    });

    await Project.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      success: true,

      message:
        "Project deleted successfully",

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message:
        "Failed to delete project",

    });

  }

};