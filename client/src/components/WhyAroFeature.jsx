import { motion } from "framer-motion";
import { CheckCircle, Shield, Cpu } from "lucide-react";

const WhyAroFeature = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "Easy Setup",
      desc: "Get started in minutes, no complicated onboarding or technical skills required.",
      color: "text-emerald-400",
      bgHover: "bg-emerald-500/10",
      borderHover: "group-hover:border-emerald-500/30",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      desc: "Your data is safe with enterprise-grade encryption and privacy-focused design.",
      color: "text-blue-400",
      bgHover: "bg-blue-500/10",
      borderHover: "group-hover:border-blue-500/30",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
    },
    {
      icon: Cpu,
      title: "Smart Insights",
      desc: "Analyze feedback and voting patterns to make better, data-driven product decisions.",
      color: "text-purple-400",
      bgHover: "bg-purple-500/10",
      borderHover: "group-hover:border-purple-500/30",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
    }
  ];

  return (
    <section className="relative pt-16 md:pt-24 pb-24 md:pb-32 px-6 overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1 text-xs font-semibold tracking-widest uppercase border border-white/5 rounded-full bg-white/5 text-gray-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Benefits
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Why Choose <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              AroFeature?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            AroFeature is built to make feature feedback simple, transparent,
            and actionable — so you can grow your product with confidence.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`group relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/[0.05] hover:bg-[#0f0f0f] transition-all duration-500 overflow-hidden ${item.borderHover} ${item.glowColor}`}
              >
                {/* Subtle top gradient line on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 ${item.bgHover}`}>
                  <Icon className={`w-7 h-7 ${item.color}`} strokeWidth={1.5} />
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight group-hover:text-gray-200 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyAroFeature;