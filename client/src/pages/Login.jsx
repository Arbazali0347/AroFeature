import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../configs/Axios";
import { useApp } from "../context/AppContextProvider";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react"; // Icons add kiye hain

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setToken, setUserData } = useApp();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // LOGIN
        const { data } = await api.post("/founder/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setUserData(data.founder)
          toast.success("Login successful");
          setEmail("");
          setPassword("");
          setName("");
          setTimeout(() => {
            navigate("/");
          }, 100);
        } else {
          toast.error(data.message);
        }
      } else {
        // REGISTER
        const { data } = await api.post("/founder/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setUserData(data.founder)
          toast.success("Account created successfully");
          setIsLogin(true);
          setEmail("");
          setPassword("");
          setName("");
          setTimeout(() => {
            navigate("/founder-additional-details");
          }, 100);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
    setLoading(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-[#050505]">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-[2.5rem] bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/50"
      >
        {/* Logo / Badge */}
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl tracking-wider">AF</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-white text-center tracking-tight">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <p className="text-gray-400 text-sm text-center mt-3 mb-8">
          {isLogin
            ? "Login to manage your product feedback."
            : "Start collecting feature requests today."}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all duration-300"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all duration-300"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3.5 mt-6 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                {isLogin ? "Sign In" : "Register"}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </button>
        </form>

        {/* Toggle between Login/Register */}
        <div className="mt-8 text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              // Clear fields when switching
              setName("");
              setEmail("");
              setPassword("");
            }}
            className="ml-2 font-medium text-white hover:text-blue-400 transition-colors duration-300"
          >
            {isLogin ? "Create one" : "Sign in here"}
          </button>
        </div>

      </motion.div>
    </section>
  );
};

export default Auth;