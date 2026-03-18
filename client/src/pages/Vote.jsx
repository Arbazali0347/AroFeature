import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, ChevronUp, MessageSquare, Flame, CheckCircle2, CircleDashed, LayoutPanelLeft, X, Send, Building2, Mail } from "lucide-react";
import toast from "react-hot-toast";
import api from "../configs/Axios"; 
import { useApp } from "../context/AppContextProvider"; // Context Import Kiya

const filterTabs = ["Most Voted", "Newest", "Trending", "Planned"];

const StatusBadge = ({ status }) => {
  const styles = {
    "Under Review": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "Planned": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "In Progress": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Completed": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };
  const icons = {
    "Under Review": <CircleDashed size={14} />,
    "Planned": <LayoutPanelLeft size={14} />,
    "In Progress": <Flame size={14} />,
    "Completed": <CheckCircle2 size={14} />,
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles["Under Review"]}`}>
      {icons[status] || icons["Under Review"]}
      {status || "Under Review"}
    </span>
  );
};

const VotePage = () => {
  // Global State (Context) se token aur userData nikaala
  const { token, userData } = useApp(); 

  const [features, setFeatures] = useState([]);
  const [activeTab, setActiveTab] = useState("Most Voted");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  
  // Forms
  const [newFeature, setNewFeature] = useState({ title: "", description: "", tags: "" });
  const [newComment, setNewComment] = useState("");

  // Fetch Features (Ye wahi purana function hai public features lane ke liye)
  const fetchFeatures = async () => {
    try {
      const { data } = await api.get("/features");
      if (data.success) {
        const liveFeatures = data.features.map(f => ({ ...f, isVoted: false }));
        setFeatures(liveFeatures);
      }
    } catch (error) {
      toast.error("Failed to load features");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  // Add Feature
  const handleAddFeature = async (e) => {
    e.preventDefault();
    if (!newFeature.title || !newFeature.description) return;

    try {
      const tagsArray = newFeature.tags.split(",").map(tag => tag.trim()).filter(t => t !== "");
      const { data } = await api.post("/features/add", {
        title: newFeature.title,
        description: newFeature.description,
        tags: tagsArray
      });

      if (data.success) {
        toast.success("Feature suggested successfully!");
        setFeatures([{ ...data.feature, isVoted: false }, ...features]);
        setIsAddModalOpen(false);
        setNewFeature({ title: "", description: "", tags: "" });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error adding feature");
    }
  };

  // Live Vote
  const handleVote = async (e, id, isVoted) => {
    e.stopPropagation();
    
    setFeatures(features.map(f => {
      if (f._id === id) {
        return { ...f, votes: isVoted ? f.votes - 1 : f.votes + 1, isVoted: !isVoted };
      }
      return f;
    }));

    try {
      const action = isVoted ? "downvote" : "upvote";
      await api.put(`/features/vote/${id}`, { action });
    } catch (error) {
      toast.error("Vote failed, please try again");
      fetchFeatures(); 
    }
  };

  // Live Comment (Ab userData se naam ja raha hai)
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Asali user ka naam Context se get kiya
    const commenterName = userData?.name || "Anonymous";

    try {
      const { data } = await api.post(`/features/comment/${selectedFeature._id}`, {
        text: newComment,
        user: commenterName 
      });

      if (data.success) {
        const updatedFeature = data.feature;
        setSelectedFeature({ ...updatedFeature, isVoted: selectedFeature.isVoted });
        
        setFeatures(features.map(f => f._id === updatedFeature._id ? { ...updatedFeature, isVoted: f.isVoted } : f));
        setNewComment("");
        toast.success("Comment added!");
      }
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  const filteredFeatures = features.filter(f => f.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // Security Check: Agar token nahi hai toh page show na karein (Context usko khud hi login par bhej dega)
  if (!token) return null;

  return (
    <div className="min-h-screen bg-[#000000] text-white pt-10 pb-20 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ================= WORKSPACE PROFILE BANNER (Data coming from Context) ================= */}
        {userData && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
              <span className="text-2xl font-bold text-white">{userData.name?.charAt(0)}</span>
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                Welcome, {userData.name}
              </h2>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-sm text-gray-400">
                <span className="flex items-center gap-1.5"><Mail size={16} className="text-blue-400"/> {userData.email}</span>
                {userData.companyName && (
                  <span className="flex items-center gap-1.5"><Building2 size={16} className="text-purple-400"/> {userData.companyName}</span>
                )}
              </div>
              
              {userData.companyDescription && (
                <p className="mt-3 text-sm text-gray-500 line-clamp-2 max-w-2xl border-l-2 border-white/10 pl-3">
                  "{userData.companyDescription}"
                </p>
              )}
            </div>
          </motion.div>
        )}
        {/* ========================================================================================= */}

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Feature Requests</h1>
            <p className="text-[#a1a1aa] text-sm md:text-base">Help us shape the future by voting and commenting.</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-[#3b82f6] hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          >
            <Plus size={18} strokeWidth={2.5} />
            Suggest Feature
          </button>
        </div>

        {/* Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#3b82f6] transition-colors" />
            <input 
              type="text" 
              placeholder="Search features..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6]/50 focus:bg-[#3b82f6]/5 transition-all"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading live features...</div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredFeatures.map((feature) => (
                <motion.div
                  key={feature._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setSelectedFeature(feature)}
                  className="group flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-6 bg-[#0a0a0a]/80 border border-white/10 rounded-2xl backdrop-blur-xl hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer"
                >
                  <div className="shrink-0 flex sm:flex-col items-center gap-2 sm:gap-1">
                    <button 
                      onClick={(e) => handleVote(e, feature._id, feature.isVoted)}
                      className={`flex flex-row sm:flex-col items-center justify-center gap-1 sm:gap-0 w-auto sm:w-16 px-4 py-2 sm:px-0 sm:py-3 rounded-xl border transition-all ${feature.isVoted ? "bg-[#3b82f6]/20 border-[#3b82f6]/50 text-[#3b82f6]" : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"}`}
                    >
                      <ChevronUp size={24} strokeWidth={feature.isVoted ? 3 : 2} />
                      <span className={`font-bold text-sm sm:text-lg ${feature.isVoted ? "text-[#3b82f6]" : "text-white"}`}>{feature.votes}</span>
                    </button>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                      <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-blue-100 transition-colors">{feature.title}</h3>
                      <div className="shrink-0"><StatusBadge status={feature.status} /></div>
                    </div>
                    <p className="text-[#a1a1aa] text-sm md:text-base leading-relaxed mb-4 line-clamp-2">{feature.description}</p>
                    
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                      <div className="flex items-center gap-2 flex-wrap">
                        {feature.tags && feature.tags.map((tag, idx) => (
                          <span key={idx} className="px-2.5 py-1 text-xs font-medium text-gray-400 bg-black/40 border border-white/5 rounded-md">{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-[#3b82f6] transition-colors">
                        <MessageSquare size={16} /> {feature.comments?.length || 0} Comments
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredFeatures.length === 0 && (
               <div className="text-center py-20 text-[#a1a1aa]">No features found. Be the first to suggest!</div>
            )}
          </div>
        )}
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-8 relative shadow-2xl">
              <button onClick={() => setIsAddModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white"><X size={24} /></button>
              <h2 className="text-2xl font-bold text-white mb-6">Suggest a Feature</h2>
              <form onSubmit={handleAddFeature} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Title</label>
                  <input type="text" value={newFeature.title} onChange={(e) => setNewFeature({...newFeature, title: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500/50 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Details</label>
                  <textarea value={newFeature.description} onChange={(e) => setNewFeature({...newFeature, description: e.target.value})} required rows="4" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500/50 outline-none resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Tags (comma separated)</label>
                  <input type="text" value={newFeature.tags} onChange={(e) => setNewFeature({...newFeature, tags: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500/50 outline-none" />
                </div>
                <button type="submit" className="w-full py-3.5 mt-2 rounded-xl bg-[#3b82f6] text-white font-bold hover:bg-blue-600 transition-colors">Submit Request</button>
              </form>
            </motion.div>
          </div>
        )}

        {selectedFeature && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              <div className="p-6 md:p-8 border-b border-white/10 relative shrink-0">
                <button onClick={() => setSelectedFeature(null)} className="absolute top-6 right-6 text-gray-400 hover:text-white"><X size={24} /></button>
                <div className="mb-4"><StatusBadge status={selectedFeature.status} /></div>
                <h2 className="text-2xl font-bold text-white mb-3 pr-8">{selectedFeature.title}</h2>
                <p className="text-gray-400 leading-relaxed">{selectedFeature.description}</p>
              </div>

              <div className="p-6 md:p-8 flex-1 overflow-y-auto bg-black/20">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">Discussion</h3>
                <div className="space-y-6">
                  {(!selectedFeature.comments || selectedFeature.comments.length === 0) ? (
                    <p className="text-gray-500 text-center">No comments yet. Start the discussion!</p>
                  ) : (
                    selectedFeature.comments.map((comment, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold shrink-0">{comment.user?.charAt(0) || "U"}</div>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-semibold text-white">{comment.user}</span>
                            <span className="text-xs text-gray-500">{comment.date}</span>
                          </div>
                          <p className="text-gray-300 text-sm bg-white/5 border border-white/5 p-3 rounded-xl rounded-tl-none">{comment.text}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="p-4 border-t border-white/10 bg-[#0a0a0a] shrink-0">
                <form onSubmit={handleAddComment} className="flex gap-3">
                  <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50" />
                  <button type="submit" disabled={!newComment.trim()} className="px-5 py-3 rounded-xl bg-[#3b82f6] text-white font-bold hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2">
                    <Send size={18} />
                    <span className="hidden sm:inline">Post</span>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VotePage;