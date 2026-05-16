import React from 'react';
import { Truck } from 'lucide-react';
import { motion } from 'motion/react';

const Ticker = () => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-[#CC0000] text-white py-1.5 px-4"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[12px] font-medium">
        <div className="flex items-center gap-1.5">
          <Truck size={14} />
          <span>Free delivery on orders above ₹1,100</span>
        </div>
        <div className="flex items-center gap-4 mt-1 sm:mt-0 opacity-90">

          <a href="#" className="hover:underline">Bulk Inquiries</a>
          <span className="hidden sm:inline">|</span>
          <a href="tel:18001030673" className="hover:underline font-semibold">Call: 1800-1030-673</a>
        </div>
      </div>
    </motion.div>
  );
};

export default Ticker;
