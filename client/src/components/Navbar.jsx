import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContextProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { token, setToken, userData } = useApp();

  const closeMenu = () => setIsOpen(false);

  // Scroll effect for dynamic styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Wrapper to hold space at the top of the page so content doesn't hide behind */}
      <div className="h-24 w-full"></div>

      {/* Actual Navbar - Fixed at top */}
      <div className={`fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
        
        {/* Floating Container */}
        <nav className={`max-w-6xl mx-auto backdrop-blur-2xl border border-white/[0.08] shadow-2xl transition-all duration-300 ${scrolled ? 'bg-[#050505]/90 rounded-full py-3 px-6 shadow-black/60' : 'bg-[#050505]/60 rounded-2xl py-4 px-6 shadow-black/30'}`}>
          <div className="flex items-center justify-between">

            {/* Minimalist Text Logo */}
            <div className="flex items-center cursor-pointer group" onClick={() => navigate("/")}>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center">
                Aro<span className="text-gray-500 font-normal transition-colors duration-300 group-hover:text-gray-300">Feature</span>
                <span className="ml-1 text-blue-500 font-black">.</span>
              </h1>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-7 text-sm font-medium text-gray-400">
              <Link to="/" className="hover:text-white transition-colors duration-300">Home</Link>
              <Link to="/about" className="hover:text-white transition-colors duration-300">About</Link>
              <Link to="/features" className="hover:text-white transition-colors duration-300">Features</Link>
              
              {/* Logged in links */}
              {token && (
                <div className="flex items-center space-x-6 pl-6 border-l border-white/10">
                  <Link to="/dashboard" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">Dashboard</Link>
                  <Link to="/vote" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">Vote Board</Link>
                </div>
              )}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center">
              {token ? (
                <div className="flex items-center space-x-5 pl-8 border-l border-white/10 ml-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white cursor-pointer shadow-sm">
                  {userData? userData.name?.charAt(0): "AA"}
                  </div>
                  <button 
                    onClick={() => {
                      localStorage.removeItem("token");
                      setToken(null);
                      navigate("/login");
                    }} 
                    className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center pl-8 border-l border-white/10 ml-2">
                  {/* Single Auth Button */}
                  <Link
                    to="/login"
                    className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                  >
                    Login / Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Toggle Button */}
            <div className="md:hidden flex items-center text-gray-400">
              <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu" className="hover:text-white transition-colors">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-3 max-w-5xl mx-auto bg-[#050505]/95 backdrop-blur-3xl border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col px-6 py-6 space-y-5 text-sm font-medium text-gray-400">
              
              <Link to="/" onClick={closeMenu} className="hover:text-white transition-colors">Home</Link>
              <Link to="/about" onClick={closeMenu} className="hover:text-white transition-colors">About</Link>
              <Link to="/features" onClick={closeMenu} className="hover:text-white transition-colors">Features</Link>
              
              {token && (
                <div className="flex flex-col space-y-5 pt-5 border-t border-white/10">
                  <Link to="/dashboard" onClick={closeMenu} className="text-blue-400 hover:text-blue-300 transition-colors">Dashboard</Link>
                  <Link to="/vote" onClick={closeMenu} className="text-purple-400 hover:text-purple-300 transition-colors">Vote Board</Link>
                </div>
              )}

              {/* Mobile Auth Buttons */}
              <div className="pt-5 mt-2 border-t border-white/10 flex flex-col space-y-4">
                {token ? (
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      setToken(null);
                      closeMenu();
                      navigate("/login");
                    }}
                    className="text-left w-full py-3 rounded-xl bg-red-500/10 text-red-400 font-semibold hover:bg-red-500/20 transition-colors px-4"
                  >
                    Logout
                  </button>
                ) : (
                  // Single Mobile Auth Button
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="w-full py-3 rounded-full bg-white text-black text-center font-semibold hover:bg-gray-200 transition-colors shadow-lg"
                  >
                    Login / Sign Up
                  </Link>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;