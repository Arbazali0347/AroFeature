import { motion } from "framer-motion";
import { Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-[#050505] pt-16 md:pt-20 pb-8 border-t border-white/5 overflow-hidden">
      
      {/* Subtle Top Glow & Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Top Section: Brand & Links */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
          
          {/* Brand & Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <a href="#" className="text-2xl font-bold tracking-tight text-white mb-3">
              Aro<span className="text-gray-500 font-normal transition-colors duration-300 hover:text-gray-300">Feature</span>
              <span className="text-blue-500">.</span>
            </a>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Build what your users actually want. The ultimate feature feedback and prioritization tool for modern teams.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8 md:gap-12 text-sm font-medium text-gray-400"
          >
            <a href="#home" className="hover:text-white transition-colors duration-300">Home</a>
            <a href="#features" className="hover:text-white transition-colors duration-300">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors duration-300">Pricing</a>
            <a href="#contact" className="hover:text-white transition-colors duration-300">Contact</a>
          </motion.div>

        </div>

        {/* Bottom Section: Copyright, Creator & Socials */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          
          {/* Copyright */}
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} AroFeature. All rights reserved.
          </p>

          {/* Creator Credit (ArbazAli) */}
          <a
            href="https://arbaz-aro.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors duration-300"
          >
            Crafted with <span className="text-red-500 group-hover:animate-pulse">❤️</span> by
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 border-b border-transparent group-hover:border-purple-400 transition-all duration-300">
              ArbazAli
            </span>
          </a>

          {/* Social Icons */}
          <div className="flex items-center gap-5 text-gray-500">
            <a href="#" aria-label="Twitter" className="hover:text-white hover:scale-110 transition-all duration-300">
              <Twitter size={18} strokeWidth={2} />
            </a>
            <a href="#" aria-label="Github" className="hover:text-white hover:scale-110 transition-all duration-300">
              <Github size={18} strokeWidth={2} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white hover:scale-110 transition-all duration-300">
              <Linkedin size={18} strokeWidth={2} />
            </a>
          </div>

        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;