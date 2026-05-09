import React, { useState } from "react";
import axios from "axios";
import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  ShieldCheck,
  LockKeyhole,
  Mail,
  ArrowRight,
} from "lucide-react";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  // ================= LOGIN =================
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      // Redirect Based On Role
      if (res.data.role === "Admin") {

        navigate("/admin");

      } else {

        navigate("/dashboard");

      }

    } catch (err) {

      console.log(err);

      alert(
        "Invalid credentials. Please try again."
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

            <div className="flex items-center gap-3 mb-10">
              <div className="bg-cyan-500/20 p-3 rounded-2xl">
                <ShieldCheck className="text-cyan-400" size={28} />
              </div>

              <h1 className="text-4xl font-black tracking-tight">
                ETHARA
                <span className="text-cyan-400">
                  .AI
                </span>
              </h1>
            </div>

            <h2 className="text-5xl font-black leading-tight mb-6">
              AI Project
              <br />
              Management
              <br />
              Platform
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Manage projects, assign tasks,
              monitor workflows and optimize
              AI operations through a modern
              enterprise dashboard.
            </p>

          </div>

          {/* FEATURES */}
          <div className="space-y-5">

            <div className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl p-5">
              <div className="bg-cyan-500/20 p-3 rounded-xl">
                <ShieldCheck className="text-cyan-400" />
              </div>

              <div>
                <h3 className="font-bold">
                  Secure Authentication
                </h3>

                <p className="text-sm text-slate-400">
                  JWT based secure access
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl p-5">
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <LockKeyhole className="text-blue-400" />
              </div>

              <div>
                <h3 className="font-bold">
                  Role Based Access
                </h3>

                <p className="text-sm text-slate-400">
                  Admin and Member workflow
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
                <ShieldCheck className="text-cyan-400" size={24} />
              </div>

              <h1 className="text-3xl font-black tracking-tight">
                ETHARA
                <span className="text-cyan-400">
                  .AI
                </span>
              </h1>
            </div>

          </div>

          {/* LOGIN HEADER */}
          <div className="mb-10">

            <h2 className="text-4xl font-black mb-3">
              Welcome Back
            </h2>

            <p className="text-slate-400 text-lg">
              Login to continue to your
              dashboard.
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleLogin}
            className="space-y-6"
          >

            {/* EMAIL */}
            <div>

              <label className="text-sm text-slate-300 block mb-3 font-medium">
                Terminal Email
              </label>

              <div className="relative">

                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={20}
                />

                <input
                  type="email"
                  placeholder="user@ethara.ai"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  className="w-full bg-[#020617] border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-400 transition-all"
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div>

              <label className="text-sm text-slate-300 block mb-3 font-medium">
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
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  required
                  className="w-full bg-[#020617] border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-400 transition-all"
                />

              </div>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              {loading
                ? "Initializing..."
                : "Initialize Session"}

              <ArrowRight size={18} />
            </button>

          </form>

          {/* REGISTER */}
          <div className="mt-8 text-center">

            <p className="text-slate-400">

              New Personnel?{" "}

              <Link
                to="/register"
                className="text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                Create Account
              </Link>

            </p>

          </div>

          {/* FOOTER */}
          <div className="mt-12 pt-6 border-t border-slate-800">

            <p className="text-xs text-slate-500 text-center tracking-[0.2em] uppercase">
              Secure AI Operations Platform
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;