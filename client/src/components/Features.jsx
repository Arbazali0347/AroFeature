import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  ThumbsUp, 
  Map, 
  Settings, 
  ShieldCheck, 
  Zap 
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: LayoutDashboard,
      title: "Public Feedback Boards",
      desc: "Create dedicated boards where users can submit and explore feature requests in one organized space.",
      color: "text-blue-400",
      bgHover: "group-hover:bg-blue-500/10",
      borderHover: "group-hover:border-blue-500/30",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
    },
    {
      icon: ThumbsUp,
      title: "Upvoting System",
      desc: "Let users vote on features they care about so you always know exactly what matters most.",
      color: "text-purple-400",
      bgHover: "group-hover:bg-purple-500/10",
      borderHover: "group-hover:border-purple-500/30",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
    },
    {
      icon: Map,
      title: "Roadmap Visibility",
      desc: "Show what’s planned, in progress, and completed to build absolute transparency and trust.",
      color: "text-emerald-400",
      bgHover: "group-hover:bg-emerald-500/10",
      borderHover: "group-hover:border-emerald-500/30",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
    },
    {
      icon: Settings,
      title: "Admin Dashboard",
      desc: "Manage, prioritize, and update feature statuses with a clean and powerful control panel.",
      color: "text-amber-400",
      bgHover: "group-hover:bg-amber-500/10",
      borderHover: "group-hover:border-amber-500/30",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]"
    },
    {
      icon: ShieldCheck,
      title: "User Authentication",
      desc: "Secure login and registration system to easily manage your users and prevent spam.",
      color: "text-rose-400",
      bgHover: "group-hover:bg-rose-500/10",
      borderHover: "group-hover:border-rose-500/30",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.1)]"
    },
    {
      icon: Zap,
      title: "Real-Time Updates",
      desc: "Instant feedback and voting updates without refreshing the page for a seamless experience.",
      color: "text-cyan-400",
      bgHover: "group-hover:bg-cyan-500/10",
      borderHover: "group-hover:border-cyan-500/30",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]"
    }
  ];

  return (
    <section className="relative min-h-screen pt-10 pb-24 md:pt-20 md:pb-32 px-6 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase border border-white/10 rounded-full bg-white/5 text-gray-300 backdrop-blur-sm shadow-sm"
          >
            <Zap size={14} className="text-blue-400" />
            Core Capabilities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
          >
            Everything you need to <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">
              build better products.
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            A complete toolkit to collect feedback, prioritize features, and keep your users in the loop. No messy spreadsheets, just pure productivity.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`group relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/[0.05] hover:bg-[#0f0f0f] transition-all duration-500 overflow-hidden ${feature.borderHover} ${feature.glowColor}`}
              >
                {/* Subtle top gradient line on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 ${feature.bgHover}`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight group-hover:text-gray-200 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Features;