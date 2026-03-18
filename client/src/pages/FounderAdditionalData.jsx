import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Building2,
  Globe,
  Users,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { useApp } from "../context/AppContextProvider";
import api from "../configs/Axios";


const FounderDetails = () => {

  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    role: "",
    teamSize: "",
  });

  const { userData } = useApp();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ FIX 1: handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not logged in!");
        navigate("/login");
        return;
      }

      // ✅ FIX 2: companyDescription remove kiya
      const { data } = await api.post(
        "/founder/add-founder-data",
        {
          companyName: formData.companyName,
          website: formData.website,
          role: formData.role,
          teamSize: formData.teamSize
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/vote");
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.error("API Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(userData);
  }, [])


  return (
    <section className="relative min-h-screen flex items-center justify-center p-4 md:p-6 overflow-hidden bg-[#050505]">

      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row rounded-[2rem] md:rounded-[3rem] bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/50 overflow-hidden"
      >

        <div className="w-full md:w-5/12 bg-gradient-to-br from-white/[0.05] to-transparent p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-8 shadow-inner shadow-blue-500/20">
              <span className="text-blue-400 font-bold tracking-wider">AF</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
              Let's set up your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                workspace.
              </span>
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Tell us a bit about your product and team. This helps us customize your feedback boards and dashboard experience.
            </p>

            <div className="space-y-4">
              {[
                "Create your account",
                "Set up your workspace",
                "Create your first board",
              ].map((step, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <CheckCircle2
                    className={`w-5 h-5 ${index === 0 ? "text-green-500" : index === 1 ? "text-blue-500 animate-pulse" : "text-gray-600"}`}
                  />
                  <span className={index === 0 ? "text-gray-500 line-through" : index === 1 ? "text-white font-medium" : "text-gray-600"}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block mt-12">
            <p className="text-xs text-gray-500">
              Need help? <a href="#" className="text-blue-400 hover:underline">Contact support</a>
            </p>
          </div>
        </div>

        <div className="w-full md:w-7/12 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center space-y-6">

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300 ml-1">Product / Company Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type="text"
                  name="companyName"
                  placeholder="e.g. AroFeature Inc."
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300 ml-1">Website URL</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type="url"
                  name="website"
                  placeholder="https://yourwebsite.com"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300 ml-1">Your Role</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                  </div>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all duration-300 appearance-none"
                  >
                    <option value="" className="bg-[#0a0a0a] text-gray-500">Select role...</option>
                    <option value="Founder" className="bg-[#0a0a0a]">Founder / CEO</option>
                    <option value="Product Manager" className="bg-[#0a0a0a]">Product Manager</option>
                    <option value="Developer" className="bg-[#0a0a0a]">Developer</option>
                    <option value="Other" className="bg-[#0a0a0a]">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300 ml-1">Team Size</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                  </div>
                  <select
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all duration-300 appearance-none"
                  >
                    <option value="" className="bg-[#0a0a0a] text-gray-500">Select size...</option>
                    <option value="1" className="bg-[#0a0a0a]">Just me</option>
                    <option value="2-10" className="bg-[#0a0a0a]">2 - 10</option>
                    <option value="11-50" className="bg-[#0a0a0a]">11 - 50</option>
                    <option value="51+" className="bg-[#0a0a0a]">51+</option>
                  </select>
                </div>
              </div>

            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center items-center gap-2 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  <>
                    Complete Setup
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </motion.div>
    </section>
  );
};

export default FounderDetails;