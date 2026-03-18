import { motion } from "framer-motion";
import { ChevronUp, MessageSquare } from "lucide-react";

const ProductPreview = () => {
  const features = [
    { 
      title: "Dark Mode Support", 
      desc: "Add a toggle for system, light, and dark themes.",
      votes: 128, 
      status: "Planned",
      comments: 24,
      statusStyle: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    },
    { 
      title: "Mobile App Version", 
      desc: "Native iOS and Android applications for on-the-go access.",
      votes: 94, 
      status: "In Progress",
      comments: 15,
      statusStyle: "bg-purple-500/10 text-purple-400 border-purple-500/20"
    },
    { 
      title: "Slack Integration", 
      desc: "Push notifications directly to our team's Slack channels.",
      votes: 67, 
      status: "Under Review",
      comments: 8,
      statusStyle: "bg-amber-500/10 text-amber-400 border-amber-500/20"
    }
  ];

  return (
    <section className="relative pt-8 md:pt-12 pb-24 md:pb-32 px-6 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1 text-xs font-semibold tracking-widest uppercase border border-white/5 rounded-full bg-white/5 text-gray-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            Sneak Peek
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            See AroFeature <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              In Action.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            A clean, organized feature board where users vote and your team prioritizes what matters most. No more messy spreadsheets.
          </motion.p>
        </div>

        {/* Dashboard Preview Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-20 rounded-2xl md:rounded-[2rem] bg-[#0a0a0a]/90 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/50 overflow-hidden"
        >
          {/* Mac-style Window Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-white/[0.02] border-b border-white/5">
            {/* Window Controls (Red, Yellow, Green dots) */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            
            <h3 className="text-gray-300 font-medium text-sm">
              Public Feature Board
            </h3>
            
            <div className="w-12"></div> {/* Spacer for centering */}
          </div>

          {/* Feature Items List */}
          <div className="p-6 md:p-8 space-y-4">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                viewport={{ once: true }}
                className="group flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center p-4 md:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300"
              >
                
                {/* Upvote Button */}
                <div className="flex flex-row sm:flex-col items-center gap-1 sm:gap-0 px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-colors cursor-pointer shrink-0">
                  <ChevronUp className="text-gray-400 group-hover:text-blue-400 w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                  <span className="text-white font-bold text-sm sm:text-base mt-0 sm:mt-1">{item.votes}</span>
                </div>

                {/* Content */}
                <div className="flex-1 text-left">
                  <h4 className="text-white text-base md:text-lg font-semibold tracking-tight">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-gray-400 text-sm">
                    {item.desc}
                  </p>
                  
                  {/* Comments Info (Mobile only viewable inline, desktop has its own place or combined) */}
                  <div className="flex items-center gap-1.5 mt-3 text-gray-500 text-xs font-medium sm:hidden">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {item.comments} comments
                  </div>
                </div>

                {/* Status Badge & Comments (Desktop) */}
                <div className="flex items-center gap-4 sm:gap-6 mt-2 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end shrink-0">
                  <div className="hidden sm:flex items-center gap-1.5 text-gray-500 text-sm font-medium hover:text-gray-300 transition-colors cursor-pointer">
                    <MessageSquare className="w-4 h-4" />
                    {item.comments}
                  </div>
                  
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide border ${item.statusStyle}`}>
                    {item.status}
                  </span>
                </div>

              </motion.div>
            ))}
          </div>
          
          {/* Fade out bottom effect to suggest more items */}
          <div className="h-16 w-full bg-gradient-to-t from-[#0a0a0a] to-transparent mt-[-64px] relative z-20 rounded-b-2xl md:rounded-[2rem]"></div>

        </motion.div>

      </div>
    </section>
  );
};

export default ProductPreview;