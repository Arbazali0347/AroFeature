import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle } from "lucide-react"; // Icons add kiye hain behtar look ke liye

const Hero = () => {
  return (
    // 'min-h-screen' aur 'items-center' hata kar padding 'pt-36' di hai taake top se thoda upar ho jaye
    <section className="relative pt-15 pb-20 px-6 text-center overflow-hidden">
      
      {/* Background Ambient Glow (Modern SaaS Vibe) */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Small Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 text-xs font-medium tracking-wide border border-white/10 rounded-full bg-white/5 backdrop-blur-sm text-gray-300 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Feature Feedback Simplified
        </motion.div>

        {/* Title with Gradient Text */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
        >
          Build What Users <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            Actually Want.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          AroFeature helps you collect, manage and prioritize feature requests
          with voting. Understand your users, ship smarter updates,
          and grow your product faster.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/login"
            className="group flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105"
          >
            Get Started Free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/demo"
            className="group flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all duration-300"
          >
            <PlayCircle size={20} className="text-gray-400 group-hover:text-white transition-colors" />
            View Demo
          </Link>
        </motion.div>

        {/* SaaS Dashboard Image Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 md:mt-24 relative mx-auto max-w-4xl"
        >
          {/* Glassmorphism Frame around the image */}
          <div className="rounded-2xl md:rounded-[2rem] border border-white/10 bg-white/5 p-2 md:p-4 backdrop-blur-sm shadow-2xl shadow-blue-900/20">
            {/* Dashboard Image - Replace 'src' with your actual app screenshot */}
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
              alt="AroFeature Dashboard Interface"
              className="rounded-xl md:rounded-2xl border border-white/10 w-full object-cover shadow-lg opacity-90 hover:opacity-100 transition-opacity duration-500"
            />
          </div>
          
          {/* Side Glowing Orbs for extra tech feel */}
          <div className="absolute -left-10 top-1/4 w-32 h-32 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="absolute -right-10 bottom-1/4 w-32 h-32 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"></div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;