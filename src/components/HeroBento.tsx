import { motion } from 'motion/react';
import { ALL_BOOKS, formatPrice, discount } from '../data';
import { ShoppingCart } from 'lucide-react';

export default function HeroBento() {
  const books = ALL_BOOKS.slice(0, 3);

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center lg:pl-12 perspective-[1000px]">
      {/* Decorative blurred background blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#CC0000] rounded-full blur-[100px] opacity-20 mix-blend-multiply" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/4 w-48 h-48 bg-blue-600 rounded-full blur-[100px] opacity-15 mix-blend-multiply" />

      <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
        {books.map((book, i) => {
          // Calculate positions for a staggered, floating composition
          const isCenter = i === 1;
          const xOffset = i === 0 ? '-35%' : i === 2 ? '35%' : '0%';
          const zIndex = isCenter ? 30 : 10 + i;
          const rotateY = i === 0 ? -15 : i === 2 ? 15 : 0;
          const rotateZ = i === 0 ? -4 : i === 2 ? 4 : 0;
          const scale = isCenter ? 1.15 : 0.85;

          return (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 50, x: 0 }}
              animate={{ opacity: 1, y: isCenter ? -10 : 20, x: xOffset }}
              transition={{ 
                duration: 1.2, 
                delay: i * 0.15,
                type: 'spring',
                stiffness: 80,
                damping: 20
              }}
              style={{ zIndex }}
              className="absolute group perspective-[1000px] cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -10, rotateY: 0, rotateZ: 0 }}
                transition={{ duration: 0.4 }}
                className={`relative rounded-xl overflow-hidden shadow-2xl transition-all ${
                  isCenter 
                    ? 'w-48 sm:w-64 border-[3px] border-white shadow-[0_30px_60px_-15px_rgba(204,0,0,0.3)]' 
                    : 'w-40 sm:w-52 border-2 border-white/80 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] blur-[1px] group-hover:blur-none'
                }`}
                style={{ transform: `rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})` }}
              >
                {/* Premium Glass reflection */}
                <div className="absolute inset-0 bg-linear-to-tr from-white/10 via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
                
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="w-full h-auto object-cover relative z-10 bg-white" 
                  draggable={false} 
                />

                {isCenter && (
                  <div className="absolute top-2 right-2 z-30 bg-[#CC0000] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg tracking-wider">
                    BESTSELLER
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
