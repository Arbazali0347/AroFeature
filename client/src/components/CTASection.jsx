import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle } from "lucide-react"; // Icons add kiye hain hero section ki tarah

const CTASection = () => {
  return (
    <section className="relative py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Massive CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] md:rounded-[3rem] bg-[#0a0a0a] border border-white/10 p-10 md:p-20 text-center overflow-hidden shadow-2xl"
        >
          {/* Background Ambient Glow inside the card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-[100px] rounded-full pointer-events-none"></div>
          
          {/* Subtle Grid pattern for extra tech feel inside the CTA */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

          <div className="relative z-10">
            {/* Heading */}
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Ready to Build <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Smarter Products?
              </span>
            </h2>

            {/* Subtext */}
            <p className="mt-6 text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Start collecting feedback, prioritize features, and ship updates
              that your users actually want. Join today and transform your roadmap.
            </p>

            {/* Buttons (Matched with Hero Section) */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/login"
                className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105"
              >
                Get Started Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/demo"
                className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all duration-300"
              >
                <PlayCircle size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                View Demo
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CTASection;