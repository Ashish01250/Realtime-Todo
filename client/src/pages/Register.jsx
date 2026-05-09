import React, { useState } from "react";
import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  ShieldCheck,
  UserCircle2,
  Mail,
  LockKeyhole,
  BriefcaseBusiness,
  ArrowRight,
} from "lucide-react";

const Register = () => {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "Member",
    });

  // ================= HANDLE REGISTER =================
  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData
      );

      alert(
        "Registration successful. Please login."
      );

      navigate("/login");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
          "Registration failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center overflow-hidden relative px-6">

      {/* ================= BACKGROUND GLOW ================= */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full" />

      {/* ================= MAIN CARD ================= */}
      <div className="relative z-10 w-full max-w-6xl bg-[#0f172a]/90 border border-slate-800 rounded-[40px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">

        {/* ================= LEFT SIDE ================= */}
        <div className="hidden lg:flex flex-col justify-between p-14 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border-r border-slate-800">

          <div>

            {/* LOGO */}
            <div className="flex items-center gap-3 mb-10">

              <div className="bg-cyan-500/20 p-3 rounded-2xl">
                <ShieldCheck
                  className="text-cyan-400"
                  size={28}
                />
              </div>

              <h1 className="text-4xl font-black tracking-tight">
                ETHARA
                <span className="text-cyan-400">
                  .AI
                </span>
              </h1>

            </div>

            {/* HERO TEXT */}
            <h2 className="text-5xl font-black leading-tight mb-6">
              Build Smart
              <br />
              AI Workforce
              <br />
              Collaboration
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Register new personnel, manage
              projects, assign tasks and
              optimize enterprise AI workflow
              operations.
            </p>

          </div>

          {/* FEATURES */}
          <div className="space-y-5">

            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center gap-4">

              <div className="bg-cyan-500/20 p-3 rounded-xl">

                <ShieldCheck
                  className="text-cyan-400"
                  size={22}
                />

              </div>

              <div>

                <h3 className="font-bold">
                  Enterprise Security
                </h3>

                <p className="text-sm text-slate-400">
                  Protected JWT authentication
                </p>

              </div>

            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center gap-4">

              <div className="bg-blue-500/20 p-3 rounded-xl">

                <BriefcaseBusiness
                  className="text-blue-400"
                  size={22}
                />

              </div>

              <div>

                <h3 className="font-bold">
                  Role Based Workflow
                </h3>

                <p className="text-sm text-slate-400">
                  Admin & Member management
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">

          {/* MOBILE LOGO */}
          <div className="lg:hidden mb-10">

            <div className="flex items-center gap-3 mb-6">

              <div className="bg-cyan-500/20 p-3 rounded-2xl">

                <ShieldCheck
                  className="text-cyan-400"
                  size={24}
                />

              </div>

              <h1 className="text-3xl font-black tracking-tight">
                ETHARA
                <span className="text-cyan-400">
                  .AI
                </span>
              </h1>

            </div>

          </div>

          {/* HEADER */}
          <div className="mb-10">

            <h2 className="text-4xl font-black mb-3">
              Create Account
            </h2>

            <p className="text-slate-400 text-lg">
              Register new personnel access
              for the AI management system.
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleRegister}
            className="space-y-6"
          >

            {/* FULL NAME */}
            <div>

              <label className="block text-sm text-slate-300 mb-3 font-medium">
                Full Name
              </label>

              <div className="relative">

                <UserCircle2
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full bg-[#020617] border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-400 transition-all"
                />

              </div>

            </div>

            {/* EMAIL */}
            <div>

              <label className="block text-sm text-slate-300 mb-3 font-medium">
                Work Email
              </label>

              <div className="relative">

                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={20}
                />

                <input
                  type="email"
                  placeholder="user@ethara.ai"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full bg-[#020617] border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-400 transition-all"
                />

              </div>

            </div>

            {/* ROLE + PASSWORD */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* ROLE */}
              <div>

                <label className="block text-sm text-slate-300 mb-3 font-medium">
                  Role Assignment
                </label>

                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value,
                    })
                  }
                  className="w-full bg-[#020617] border border-slate-700 rounded-2xl py-4 px-4 text-white outline-none focus:border-cyan-400 transition-all"
                >

                  <option value="Member">
                    Member
                  </option>

                  <option value="Admin">
                    Admin
                  </option>

                </select>

              </div>

              {/* PASSWORD */}
              <div>

                <label className="block text-sm text-slate-300 mb-3 font-medium">
                  Security Key
                </label>

                <div className="relative">

                  <LockKeyhole
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={20}
                  />

                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password:
                          e.target.value,
                      })
                    }
                    className="w-full bg-[#020617] border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-400 transition-all"
                  />

                </div>

              </div>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01]"
            >

              {loading
                ? "Creating Account..."
                : "Create Account"}

              <ArrowRight size={18} />

            </button>

          </form>

          {/* LOGIN LINK */}
          <div className="mt-8 text-center">

            <p className="text-slate-400">

              Already registered?{" "}

              <Link
                to="/login"
                className="text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                Login Here
              </Link>

            </p>

          </div>

          {/* FOOTER */}
          <div className="mt-12 pt-6 border-t border-slate-800">

            <p className="text-xs text-slate-500 text-center tracking-[0.2em] uppercase">
              Enterprise AI Workforce Platform
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;