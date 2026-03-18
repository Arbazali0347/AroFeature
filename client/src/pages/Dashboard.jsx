import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Yahan add kiya
import api from "../configs/Axios"; 
import { 
  LayoutDashboard, ListTodo, MessageSquare, Map, BarChart2, 
  Settings, LogOut, Bell, Search, Trash2, Menu, X 
} from "lucide-react";

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate(); // Security ke liye add kiya

  // Live Data States
  const [stats, setStats] = useState({ totalFeatures: 0, totalVotes: 0, underReview: 0, completed: 0 });
  const [recentFeatures, setRecentFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  // SECURITY CHECK: Token nahi toh Login par wapas
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to access the dashboard");
      navigate("/login");
    }
  }, [navigate]);

  // Fetch Live Data
  const fetchDashboardData = async () => {
    try {
      const { data } = await api.get("/dashboard/stats");
      if (data.success) {
        setStats(data.stats);
        setRecentFeatures(data.recentFeatures);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 10000); 
    return () => clearInterval(interval);
  }, []);

  // Handle Live Status Change
  const handleStatusChange = async (id, newStatus) => {
    setRecentFeatures(recentFeatures.map(f => f._id === id ? { ...f, status: newStatus } : f));
    
    try {
      const { data } = await api.put(`/dashboard/feature/status/${id}`, { status: newStatus });
      if (data.success) {
        toast.success("Status updated live!");
        fetchDashboardData(); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update status");
      fetchDashboardData(); 
    }
  };

  // Handle Live Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feature?")) return;
    
    try {
      const { data } = await api.delete(`/dashboard/feature/${id}`);
      if (data.success) {
        toast.success("Feature deleted!");
        fetchDashboardData();
      }
    } catch (error) {
      toast.error("Failed to delete feature");
    }
  };

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Roadmap", icon: Map },
    { name: "Settings", icon: Settings },
  ];

  const statsCards = [
    { title: "Total Features", value: stats.totalFeatures, color: "text-blue-400", bg: "bg-blue-500/10" },
    { title: "Total Votes", value: stats.totalVotes, color: "text-purple-400", bg: "bg-purple-500/10" },
    { title: "Under Review", value: stats.underReview, color: "text-amber-400", bg: "bg-amber-500/10" },
    { title: "Completed", value: stats.completed, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  ];

  // Avoid rendering if not authenticated (optional safety)
  if (!localStorage.getItem("token")) return null;

  return (
    <div className="min-h-screen bg-[#000000] text-white flex overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0a0a0a] border-r border-white/5 h-screen sticky top-0 z-20 shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <span className="text-blue-400 font-bold text-xs">AF</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Aro<span className="text-gray-500">Admin</span></h1>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveMenu(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"}`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span className="font-medium text-sm">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative z-10 h-screen overflow-y-auto">
        
        {/* Topbar */}
        <header className="h-20 flex items-center justify-between px-6 lg:px-10 border-b border-white/5 bg-[#000000]/50 backdrop-blur-xl sticky top-0 z-30 shrink-0">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">{activeMenu}</h2>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="text" placeholder="Search dashboard..." className="w-64 pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm focus:border-blue-500/50 outline-none transition-all" />
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-xs cursor-pointer">A</div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 lg:p-10">
          {activeMenu === "Overview" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statsCards.map((stat, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#0a0a0a]/80 border border-white/5 backdrop-blur-sm hover:border-white/10 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                        <BarChart2 size={16} />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-white tracking-tight">{loading ? "..." : stat.value}</h3>
                  </div>
                ))}
              </div>

              {/* Live Feature Management Table */}
              <div className="rounded-2xl bg-[#0a0a0a]/80 border border-white/5 backdrop-blur-sm overflow-hidden">
                <div className="p-6 border-b border-white/5">
                  <h3 className="text-lg font-bold text-white">Manage Community Features</h3>
                  <p className="text-sm text-gray-500 mt-1">Change status directly to update public roadmap.</p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                      <tr className="bg-white/[0.02] text-gray-400 text-xs uppercase tracking-wider">
                        <th className="px-6 py-4 font-medium">Feature Title</th>
                        <th className="px-6 py-4 font-medium">Votes</th>
                        <th className="px-6 py-4 font-medium">Live Status</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {loading ? (
                        <tr><td colSpan="4" className="text-center py-10 text-gray-500">Loading live data...</td></tr>
                      ) : recentFeatures.length === 0 ? (
                        <tr><td colSpan="4" className="text-center py-10 text-gray-500">No features found.</td></tr>
                      ) : (
                        recentFeatures.map((feature) => (
                          <tr key={feature._id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-6 py-4 text-sm font-medium text-white max-w-xs truncate">{feature.title}</td>
                            <td className="px-6 py-4 text-sm text-blue-400 font-bold">{feature.votes}</td>
                            
                            <td className="px-6 py-4">
                              <select
                                value={feature.status}
                                onChange={(e) => handleStatusChange(feature._id, e.target.value)}
                                className={`text-xs font-bold px-3 py-1.5 rounded-full border outline-none cursor-pointer appearance-none text-center
                                  ${feature.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                                    feature.status === 'In Progress' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                                    feature.status === 'Planned' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                                    'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}
                              >
                                <option value="Under Review" className="bg-[#0a0a0a] text-amber-400">Under Review</option>
                                <option value="Planned" className="bg-[#0a0a0a] text-blue-400">Planned</option>
                                <option value="In Progress" className="bg-[#0a0a0a] text-purple-400">In Progress</option>
                                <option value="Completed" className="bg-[#0a0a0a] text-emerald-400">Completed</option>
                              </select>
                            </td>

                            <td className="px-6 py-4 text-right">
                              <button 
                                onClick={() => handleDelete(feature._id)}
                                className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                title="Delete Feature"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;