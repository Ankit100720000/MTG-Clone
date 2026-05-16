import React from 'react';
import { Truck, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const Ticker = () => {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative bg-dark text-white py-2.5 px-4 overflow-hidden"
    >
      {/* Animated gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary to-transparent opacity-40" />
      
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[12px] font-medium gap-2 sm:gap-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
              <Truck size={11} className="text-primary" />
            </div>
            <span className="text-white/80">Free delivery on orders above ₹1,100</span>
          </div>
          <span className="hidden md:inline text-white/20">|</span>
          <div className="hidden md:flex items-center gap-1.5">
            <Sparkles size={11} className="text-amber" />
            <span className="text-white/80">New 2026 editions now available</span>
          </div>
        </div>
        <div className="flex items-center gap-4 opacity-80">
          <a href="#" className="hover:text-primary transition-colors text-white/70">Bulk Inquiries</a>
          <span className="hidden sm:inline text-white/20">|</span>
          <a href="tel:18001030673" className="hover:text-primary transition-colors font-semibold text-white/90 flex items-center gap-1">
            <Zap size={11} className="text-amber" />
            Call: 1800-1030-673
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Ticker;
