import { motion } from "framer-motion";
import { Inbox, ThumbsUp, Rocket } from "lucide-react";

const SolutionSection = () => {
  const steps = [
    {
      title: "Collect Feedback",
      desc: "Gather feature requests from users in one centralized board instead of scattered messages.",
      icon: Inbox,
      glowColor: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
      iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      numberColor: "text-blue-500/20"
    },
    {
      title: "Let Users Vote",
      desc: "Users upvote features they care about most, giving you clear priority signals for your roadmap.",
      icon: ThumbsUp,
      glowColor: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
      iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      numberColor: "text-purple-500/20"
    },
    {
      title: "Build With Confidence",
      desc: "Ship features backed by real demand and keep your users informed with automated status updates.",
      icon: Rocket,
      glowColor: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
      iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      numberColor: "text-emerald-500/20"
    }
  ];

  return (
    // Yahan py-24 ko hata kar pt-8 aur pb-24 alag alag set kiya hai
    <section className="relative pt-8 md:pt-16 pb-24 md:pb-32 px-6 overflow-hidden">
      
      {/* Background Ambient Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

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
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            How It Works
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            A Simple Way To <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Build Better Products.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            AroFeature turns messy feedback into clear priorities so your team knows exactly what to build next, without the guesswork.
          </motion.p>
        </div>

        {/* Steps Grid Container */}
        <div className="mt-20 relative">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-blue-500/0 via-white/10 to-emerald-500/0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={`group relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/[0.05] hover:bg-[#0f0f0f] hover:border-white/10 transition-all duration-500 overflow-hidden ${step.glowColor}`}
                >
                  {/* Giant Background Number */}
                  <div className={`absolute -right-4 -bottom-6 text-9xl font-black ${step.numberColor} opacity-50 select-none group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-700`}>
                    {index + 1}
                  </div>

                  {/* Header: Icon & Small Number Badge */}
                  <div className="relative flex items-center justify-between mb-8">
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${step.iconBg}`}>
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm font-bold font-mono">
                      0{index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-white mb-3 tracking-tight group-hover:text-gray-200 transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                      {step.desc}
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

export default SolutionSection;