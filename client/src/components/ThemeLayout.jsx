import React from 'react'

const ThemeLayout = ({ children }) => {
    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden">

            {/* Glow Blobs */}
            <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-white/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px]"></div>

            {/* Animated Moving Grid */}
            <div className="absolute inset-0 animated-grid opacity-50"></div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}

export default ThemeLayout