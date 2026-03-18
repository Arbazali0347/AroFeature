import { motion } from "framer-motion";
import { Sparkles, Target, Heart } from "lucide-react";

const About = () => {
  return (
    <section className="relative min-h-screen px-6 py-28 md:pt-20 pb-20 overflow-hidden">
      
      {/* Subtle Background Mesh/Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Top Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase border border-white/10 rounded-full bg-white/5 text-gray-300 backdrop-blur-sm"
          >
            <Sparkles size={14} className="text-blue-400" />
            Our Story
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6"
          >
            Building the bridge between <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              product and users.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl leading-relaxed"
          >
            AroFeature was born out of frustration. We were tired of guessing what to build next and watching user feedback get lost in endless Slack threads.
          </motion.p>
        </div>

        {/* Bento Grid Layout for Vision/Mission/Values */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Large Left Card: Vision */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="md:col-span-7 p-8 md:p-12 rounded-[2rem] bg-[#0a0a0a] border border-white/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-700"></div>
            
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-8">
              <Sparkles className="text-blue-400 w-6 h-6" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              To empower product teams of all sizes to make data-driven decisions. We believe that when companies build what users truly love, everyone wins. The future of product development is collaborative.
            </p>
          </motion.div>

          {/* Right Side Stack: Mission & Values */}
          <div className="md:col-span-5 flex flex-col gap-6">
            
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex-1 p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/10 group hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Target size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm">
                To simplify feature feedback collection, prioritize requests efficiently, and help teams build smarter products faster without the noise.
              </p>
            </motion.div>

            {/* Values Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex-1 p-8 rounded-[2rem] bg-gradient-to-br from-[#0a0a0a] to-[#111] border border-white/10 group hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                  <Heart size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">Core Values</h3>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm">
                Transparency, simplicity, and user-centered design are at the absolute heart of every single feature we build.
              </p>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;