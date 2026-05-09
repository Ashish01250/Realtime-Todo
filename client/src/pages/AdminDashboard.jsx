import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  FolderKanban,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  X,
} from "lucide-react";

const AdminDashboard = () => {

  // ================= STATES =================
  const [projects, setProjects] =
    useState([]);

  const [tasks, setTasks] =
    useState([]);

  const [activeSection,
    setActiveSection] =
    useState("dashboard");

  const [showProjectModal,
    setShowProjectModal] =
    useState(false);

  const [selectedProject,
    setSelectedProject] =
    useState(null);

  const [showProjectDetails,
    setShowProjectDetails] =
    useState(false);

  const [loading,
    setLoading] =
    useState(false);

  const [projectName,
    setProjectName] =
    useState("");

  const [projectDescription,
    setProjectDescription] =
    useState("");

  // ================= LOAD DATA =================
  useEffect(() => {

    fetchProjects();

    fetchTasks();

  }, []);

  // ================= FETCH PROJECTS =================
  const fetchProjects = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        {
          headers: {
            token: `Bearer ${user.token}`,
          },
        }
      );

      setProjects(
        res.data.projects || []
      );

    } catch (err) {

      console.log(err);

    }

  };

  // ================= FETCH TASKS =================
  const fetchTasks = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tasks`,
        {
          headers: {
            token: `Bearer ${user.token}`,
          },
        }
      );

      setTasks(
        res.data.tasks || []
      );

    } catch (err) {

      console.log(err);

    }

  };

  // ================= CREATE PROJECT =================
  const handleCreateProject =
    async () => {

      try {

        if (!projectName) {

          alert(
            "Project name required"
          );

          return;

        }

        setLoading(true);

        const user = JSON.parse(
          localStorage.getItem("user")
        );

        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/projects`,
          {
            name: projectName,
            description:
              projectDescription,
          },
          {
            headers: {
              token: `Bearer ${user.token}`,
            },
          }
        );

        setProjectName("");
        setProjectDescription("");

        setShowProjectModal(false);

        fetchProjects();

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

  // ================= ANALYTICS =================
  const todoTasks =
    Array.isArray(tasks)
      ? tasks.filter(
          (task) =>
            task.status ===
            "Todo"
        ).length
      : 0;

  const inProgressTasks =
    Array.isArray(tasks)
      ? tasks.filter(
          (task) =>
            task.status ===
            "In Progress"
        ).length
      : 0;

  const completedTasks =
    Array.isArray(tasks)
      ? tasks.filter(
          (task) =>
            task.status ===
            "Done"
        ).length
      : 0;

  // ================= PROJECT DETAILS =================
  const openProjectDetails =
    (project) => {

      setSelectedProject(project);

      setShowProjectDetails(true);

    };

  const projectTasks =
    selectedProject
      ? tasks.filter(
          (task) =>
            task.project?._id ===
            selectedProject._id
        )
      : [];

  const completedProjectTasks =
    projectTasks.filter(
      (task) =>
        task.status === "Done"
    ).length;

  const progress =
    projectTasks.length > 0
      ? Math.round(
          (completedProjectTasks /
            projectTasks.length) *
            100
        )
      : 0;

  // ================= LOGOUT =================
  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.href = "/";

  };

  return (

    <div className="min-h-screen flex bg-[#020617] text-white">

      {/* SIDEBAR */}
      <aside className="w-[260px] bg-[#0f172a] border-r border-slate-800 p-6 hidden lg:flex flex-col justify-between">

        <div>

          <h1 className="text-4xl font-black mb-12">
            ETHARA
            <span className="text-cyan-400">
              .AI
            </span>
          </h1>

          <div className="space-y-4">

            <button
              onClick={() =>
                setActiveSection(
                  "dashboard"
                )
              }
              className={`w-full p-4 rounded-2xl flex items-center gap-3 ${
                activeSection ===
                "dashboard"
                  ? "bg-cyan-500/10 border border-cyan-500/20"
                  : "bg-white/5"
              }`}
            >
              <LayoutDashboard />
              Dashboard
            </button>

            <button
              onClick={() =>
                setActiveSection(
                  "projects"
                )
              }
              className={`w-full p-4 rounded-2xl flex items-center gap-3 ${
                activeSection ===
                "projects"
                  ? "bg-cyan-500/10 border border-cyan-500/20"
                  : "bg-white/5"
              }`}
            >
              <FolderKanban />
              Projects
            </button>

            <button
              onClick={() =>
                setActiveSection(
                  "tasks"
                )
              }
              className={`w-full p-4 rounded-2xl flex items-center gap-3 ${
                activeSection ===
                "tasks"
                  ? "bg-cyan-500/10 border border-cyan-500/20"
                  : "bg-white/5"
              }`}
            >
              <ClipboardList />
              Tasks
            </button>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500/10 text-red-400 p-4 rounded-2xl"
        >
          <div className="flex items-center gap-3">
            <LogOut />
            Logout
          </div>
        </button>

      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8 overflow-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-6xl font-black mb-3">
              Admin Dashboard
            </h1>

            <p className="text-slate-400 text-lg">
              Manage projects and track real progress.
            </p>

          </div>

          <button
            onClick={() =>
              setShowProjectModal(true)
            }
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-4 rounded-2xl"
          >
            + New Project
          </button>

        </div>

        {/* DASHBOARD */}
        {activeSection ===
          "dashboard" && (

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div className="bg-[#0f172a] p-6 rounded-3xl">
              <p className="text-slate-400">
                Projects
              </p>
              <h3 className="text-5xl font-black mt-4">
                {projects.length}
              </h3>
            </div>

            <div className="bg-[#0f172a] p-6 rounded-3xl">
              <p className="text-slate-400">
                Todo
              </p>
              <h3 className="text-5xl font-black mt-4">
                {todoTasks}
              </h3>
            </div>

            <div className="bg-[#0f172a] p-6 rounded-3xl">
              <p className="text-slate-400">
                In Progress
              </p>
              <h3 className="text-5xl font-black text-yellow-400 mt-4">
                {inProgressTasks}
              </h3>
            </div>

            <div className="bg-[#0f172a] p-6 rounded-3xl">
              <p className="text-slate-400">
                Completed
              </p>
              <h3 className="text-5xl font-black text-green-400 mt-4">
                {completedTasks}
              </h3>
            </div>

          </div>

        )}

        {/* PROJECTS */}
        {activeSection ===
          "projects" && (

          <div>

            <h2 className="text-4xl font-black mb-8">
              Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {projects.map(
                (project) => (

                  <div
                    key={project._id}
                    onClick={() =>
                      openProjectDetails(
                        project
                      )
                    }
                    className="bg-[#0f172a] rounded-3xl p-6 border border-slate-800 cursor-pointer hover:border-cyan-500 transition-all"
                  >

                    <h3 className="text-2xl font-black mb-4">
                      {project.name}
                    </h3>

                    <p className="text-slate-400 mb-5">
                      {project.description}
                    </p>

                    <div className="text-sm text-cyan-400">
                      Click to view details →
                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        )}

        {/* TASKS */}
        {activeSection ===
          "tasks" && (

          <div>

            <h2 className="text-4xl font-black mb-8">
              Tasks
            </h2>

            <div className="space-y-5">

              {tasks.map((task) => (

                <div
                  key={task._id}
                  className="bg-[#0f172a] rounded-3xl p-6 border border-slate-800"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="text-2xl font-black mb-2">
                        {task.title}
                      </h3>

                      <p className="text-slate-400">
                        {task.description}
                      </p>

                      <div className="mt-3 text-sm text-slate-500">

                        Project:
                        {" "}
                        {task.project?.name}

                      </div>

                      <div className="text-sm text-slate-500">

                        Assigned To:
                        {" "}
                        {task.assignedTo?.name}

                      </div>

                    </div>

                    <span
                      className={`px-4 py-2 rounded-2xl font-bold ${
                        task.status ===
                        "Done"
                          ? "bg-green-500/10 text-green-400"
                          : task.status ===
                            "In Progress"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-slate-500/10 text-slate-300"
                      }`}
                    >
                      {task.status}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

      </main>

      {/* PROJECT DETAILS MODAL */}
      {showProjectDetails &&
        selectedProject && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-5">

          <div className="bg-[#0f172a] w-full max-w-3xl rounded-3xl p-8 border border-slate-800 max-h-[90vh] overflow-auto">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-4xl font-black">
                {selectedProject.name}
              </h2>

              <button
                onClick={() =>
                  setShowProjectDetails(
                    false
                  )
                }
              >
                <X />
              </button>

            </div>

            <p className="text-slate-400 mb-8">
              {selectedProject.description}
            </p>

            {/* PROGRESS */}
            <div className="mb-8">

              <div className="flex justify-between mb-2">

                <span>
                  Project Progress
                </span>

                <span>
                  {progress}%
                </span>

              </div>

              <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">

                <div
                  style={{
                    width: `${progress}%`,
                  }}
                  className="h-full bg-cyan-500"
                />

              </div>

            </div>

            {/* TASKS */}
            <div className="space-y-4">

              {projectTasks.map(
                (task) => (

                  <div
                    key={task._id}
                    className="bg-[#020617] p-5 rounded-2xl border border-slate-800"
                  >

                    <div className="flex justify-between items-center">

                      <div>

                        <h3 className="text-xl font-bold">
                          {task.title}
                        </h3>

                        <p className="text-slate-400 mt-1">
                          {task.description}
                        </p>

                        <div className="mt-3 text-sm text-slate-500">

                          Assigned To:
                          {" "}
                          {task.assignedTo?.name}

                        </div>

                      </div>

                      <span className="text-cyan-400 font-bold">
                        {task.status}
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      )}

      {/* CREATE PROJECT MODAL */}
      {showProjectModal && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-5">

          <div className="bg-[#0f172a] w-full max-w-xl rounded-3xl p-8 border border-slate-800">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-black">
                Create Project
              </h2>

              <button
                onClick={() =>
                  setShowProjectModal(
                    false
                  )
                }
              >
                <X />
              </button>

            </div>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) =>
                  setProjectName(
                    e.target.value
                  )
                }
                className="w-full bg-[#020617] border border-slate-700 rounded-2xl px-5 py-4 outline-none"
              />

              <textarea
                rows={5}
                placeholder="Project Description"
                value={projectDescription}
                onChange={(e) =>
                  setProjectDescription(
                    e.target.value
                  )
                }
                className="w-full bg-[#020617] border border-slate-700 rounded-2xl px-5 py-4 outline-none resize-none"
              />

              <button
                onClick={
                  handleCreateProject
                }
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-2xl"
              >
                {loading
                  ? "Creating..."
                  : "Create Project"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default AdminDashboard;