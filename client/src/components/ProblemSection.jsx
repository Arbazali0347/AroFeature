import { motion } from "framer-motion";
import { MessagesSquare, SearchX, UserX } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      title: "Feedback Everywhere",
      desc: "Requests are scattered across emails, chats, and DMs. Nothing is organized in one place.",
      icon: MessagesSquare,
      glowColor: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]", // Rose/Red glow
      iconBg: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      numberColor: "text-rose-500/20"
    },
    {
      title: "No Clear Priority",
      desc: "Teams guess what matters most without real user voting or clear feature demand insights.",
      icon: SearchX,
      glowColor: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]", // Amber/Orange glow
      iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      numberColor: "text-amber-500/20"
    },
    {
      title: "Users Feel Ignored",
      desc: "When feedback isn’t visible or acknowledged, users lose trust in your product decisions.",
      icon: UserX,
      glowColor: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]", // Purple glow
      iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      numberColor: "text-purple-500/20"
    }
  ];

  return (
    <section className="relative pt-16 md:pt-20 pb-20 md:pb-24 px-6 overflow-hidden">
      
      {/* Background Ambient Gradient (Matches Solution Section style) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-rose-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1 text-xs font-semibold tracking-widest uppercase border border-white/5 rounded-full bg-white/5 text-gray-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            The Challenge
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Stop Guessing What To <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">
              Build Next.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Product teams often struggle with scattered feedback, unclear priorities, and endless feature requests. It slows down growth and confuses your roadmap.
          </motion.p>
        </div>

        {/* Cards Grid Container (Same as Solution Section) */}
        <div className="mt-20 relative">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-rose-500/0 via-white/10 to-purple-500/0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {problems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={`group relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/[0.05] hover:bg-[#0f0f0f] hover:border-white/10 transition-all duration-500 overflow-hidden ${item.glowColor}`}
                >
                  {/* Giant Background Number */}
                  <div className={`absolute -right-4 -bottom-6 text-9xl font-black ${item.numberColor} opacity-50 select-none group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-700`}>
                    {index + 1}
                  </div>

                  {/* Header: Icon & Small Number Badge */}
                  <div className="relative flex items-center justify-between mb-8">
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${item.iconBg}`}>
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm font-bold font-mono">
                      0{index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-white mb-3 tracking-tight group-hover:text-gray-200 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                      {item.desc}
                    </p>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProblemSection;