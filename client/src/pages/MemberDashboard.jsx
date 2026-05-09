import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  Loader2,
  LogOut,
  UserCircle2,
  BriefcaseBusiness,
} from "lucide-react";

const MemberDashboard = () => {

  const [tasks, setTasks] = useState([]);
  const [userName, setUserName] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  // ================= FETCH TASKS =================
  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (user) {
      setUserName(user.name);
    }

    fetchMyTasks();

  }, []);

  const fetchMyTasks = async () => {

    try {

      setLoading(true);

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await axios.get(
        "http://localhost:8080/api/tasks/my-tasks",
        {
          headers: {
            token: `Bearer ${user.token}`,
          },
        }
      );

      setTasks(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  // ================= UPDATE TASK STATUS =================
  const updateStatus = async (
    taskId,
    newStatus
  ) => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.put(
        `http://localhost:8080/api/tasks/${taskId}`,
        {
          status: newStatus,
        },
        {
          headers: {
            token: `Bearer ${user.token}`,
          },
        }
      );

      fetchMyTasks();

    } catch (err) {

      console.log(err);

      alert("Failed to update status");

    }
  };

  // ================= LOGOUT =================
  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.href = "/";

  };

  // ================= TASK STATUS COLORS =================
  const getStatusStyle = (status) => {

    switch (status) {

      case "Done":
        return "bg-green-500/10 text-green-400 border border-green-500/20";

      case "In Progress":
        return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";

      default:
        return "bg-slate-500/10 text-slate-300 border border-slate-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">

      {/* ================= SIDEBAR ================= */}
      <aside className="hidden lg:flex w-[260px] bg-[#0f172a] border-r border-slate-800 flex-col justify-between p-6">

        <div>

          {/* LOGO */}
          <div className="mb-12">

            <h1 className="text-4xl font-black tracking-tight">
              ETHARA
              <span className="text-cyan-400">
                .AI
              </span>
            </h1>

            <p className="text-slate-400 mt-2">
              Member Workspace
            </p>

          </div>

          {/* NAVIGATION */}
          <div className="space-y-4">

            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4 flex items-center gap-3">

              <ClipboardList
                className="text-cyan-400"
                size={20}
              />

              <span className="font-semibold">
                My Tasks
              </span>

            </div>

            <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3 hover:bg-white/10 transition-all cursor-pointer">

              <UserCircle2 size={20} />

              <span>Profile</span>

            </div>

          </div>

        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-4 flex items-center gap-3 hover:bg-red-500/20 transition-all"
        >

          <LogOut size={20} />

          Logout

        </button>

      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-8 overflow-auto">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>

            <h2 className="text-5xl font-black mb-3">
              Welcome Back,
              <br />
              {userName}
            </h2>

            <p className="text-slate-400 text-lg">
              Track and manage your assigned
              tasks efficiently.
            </p>

          </div>

          {/* TASK SUMMARY */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-5 min-w-[140px]">

              <p className="text-slate-400 text-sm mb-2">
                Total Tasks
              </p>

              <h3 className="text-4xl font-black">
                {tasks.length}
              </h3>

            </div>

            <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-5 min-w-[140px]">

              <p className="text-slate-400 text-sm mb-2">
                Completed
              </p>

              <h3 className="text-4xl font-black text-green-400">
                {
                  tasks.filter(
                    (t) => t.status === "Done"
                  ).length
                }
              </h3>

            </div>

            <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-5 min-w-[140px]">

              <p className="text-slate-400 text-sm mb-2">
                In Progress
              </p>

              <h3 className="text-4xl font-black text-yellow-400">
                {
                  tasks.filter(
                    (t) =>
                      t.status ===
                      "In Progress"
                  ).length
                }
              </h3>

            </div>

          </div>

        </div>

        {/* ================= TASKS ================= */}
        {loading ? (

          <div className="flex items-center justify-center h-[400px]">

            <div className="flex flex-col items-center">

              <Loader2
                className="animate-spin text-cyan-400 mb-4"
                size={40}
              />

              <p className="text-slate-400">
                Loading tasks...
              </p>

            </div>

          </div>

        ) : tasks.length > 0 ? (

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            {tasks.map((task) => (

              <div
                key={task._id}
                className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 hover:border-cyan-500/30 transition-all"
              >

                {/* TOP */}
                <div className="flex items-start justify-between gap-4 mb-6">

                  <div>

                    <h3 className="text-2xl font-black mb-3 leading-tight">
                      {task.title}
                    </h3>

                    <p className="text-slate-400 leading-relaxed">
                      {task.description ||
                        "No description available"}
                    </p>

                  </div>

                  <div
                    className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap ${getStatusStyle(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </div>

                </div>

                {/* PROJECT */}
                <div className="flex items-center gap-3 mb-6">

                  <div className="bg-cyan-500/10 p-3 rounded-xl">

                    <BriefcaseBusiness
                      className="text-cyan-400"
                      size={20}
                    />

                  </div>

                  <div>

                    <p className="text-slate-500 text-xs uppercase">
                      Project
                    </p>

                    <h4 className="font-semibold">
                      {task.project?.name ||
                        "General"}
                    </h4>

                  </div>

                </div>

                {/* STATUS UPDATE */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div className="flex items-center gap-2 text-slate-400">

                    <Clock3 size={18} />

                    <span className="text-sm">
                      Update task status
                    </span>

                  </div>

                  <select
                    value={task.status}
                    onChange={(e) =>
                      updateStatus(
                        task._id,
                        e.target.value
                      )
                    }
                    className="bg-[#020617] border border-slate-700 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400"
                  >

                    <option value="Todo">
                      Todo
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Done">
                      Done
                    </option>

                  </select>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="flex items-center justify-center h-[400px]">

            <div className="text-center">

              <div className="bg-white/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">

                <CheckCircle2
                  className="text-slate-500"
                  size={40}
                />

              </div>

              <h3 className="text-3xl font-black mb-3">
                No Tasks Yet
              </h3>

              <p className="text-slate-400">
                You currently have no assigned
                tasks.
              </p>

            </div>

          </div>

        )}

      </main>

    </div>
  );
};

export default MemberDashboard;