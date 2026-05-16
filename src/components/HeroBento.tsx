import { motion } from 'motion/react';
import { ALL_BOOKS } from '../data';
import { Star, TrendingUp } from 'lucide-react';

export default function HeroBento() {
  const books = ALL_BOOKS.slice(0, 3);

  return (
    <div className="relative w-full h-full min-h-[480px] flex items-center justify-center lg:pl-8">
      {/* Animated background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary rounded-full blur-[140px] opacity-[0.12] animate-blob" />
      <div className="absolute top-1/4 left-1/3 w-60 h-60 bg-blue rounded-full blur-[120px] opacity-[0.08] animate-blob" style={{ animationDelay: '-3s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-44 h-44 bg-amber rounded-full blur-[100px] opacity-[0.06] animate-blob" style={{ animationDelay: '-5s' }} />
      
      {/* Grid dots background */}
      <div className="absolute inset-0 grid-dots opacity-30 pointer-events-none" />

      {/* Orbit ring decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] border border-slate-200/40 rounded-full animate-orbit opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] border border-dashed border-slate-200/30 rounded-full animate-orbit opacity-20" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />

      <div className="relative w-full max-w-[520px] aspect-square flex items-center justify-center">
        {books.map((book, i) => {
          const isCenter = i === 1;
          const xOffset = i === 0 ? '-38%' : i === 2 ? '38%' : '0%';
          const yOffset = isCenter ? -16 : 24;
          const zIndex = isCenter ? 30 : 10 + i;
          const rotateY = i === 0 ? -12 : i === 2 ? 12 : 0;
          const rotateZ = i === 0 ? -3 : i === 2 ? 3 : 0;
          const scale = isCenter ? 1.12 : 0.82;

          return (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              animate={{ opacity: 1, y: yOffset, x: xOffset, scale: 1 }}
              transition={{ 
                duration: 1.4, 
                delay: 0.3 + i * 0.18,
                type: 'spring',
                stiffness: 70,
                damping: 18
              }}
              style={{ zIndex }}
              className="absolute group cursor-pointer"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.08, 
                  y: -14, 
                  rotateY: 0, 
                  rotateZ: 0,
                  transition: { duration: 0.35, ease: 'easeOut' }
                }}
                className={`relative rounded-2xl overflow-hidden transition-all ${
                  isCenter 
                    ? 'w-52 sm:w-64 shadow-[0_30px_80px_-20px_rgba(229,45,39,0.35)]' 
                    : 'w-40 sm:w-52 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] opacity-90 group-hover:opacity-100'
                }`}
                style={{ 
                  transform: `rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                }}
              >
                {/* Premium border glow */}
                <div className={`absolute inset-0 rounded-2xl z-30 pointer-events-none ${
                  isCenter 
                    ? 'ring-2 ring-white/60 shadow-inner' 
                    : 'ring-1 ring-white/30'
                }`} />
                
                {/* Glass reflection overlay */}
                <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600 z-20 pointer-events-none" />
                
                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-black/30 to-transparent z-15 pointer-events-none" />
                
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="w-full h-auto object-cover relative z-10 bg-white" 
                  draggable={false} 
                />

                {isCenter && (
                  <>
                    <div className="absolute top-3 right-3 z-30 bg-primary text-white text-[9px] font-black px-3 py-1.5 rounded-full shadow-lg tracking-wider flex items-center gap-1">
                      <TrendingUp size={10} />
                      BESTSELLER
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 z-30 bg-white/90 backdrop-blur-md rounded-xl p-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <p className="text-[10px] font-bold text-slate-800 line-clamp-1">{book.title}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[11px] font-black text-primary">₹{book.price}</span>
                        <div className="flex items-center gap-0.5">
                          <Star size={9} className="fill-amber text-amber" />
                          <span className="text-[9px] font-bold text-slate-500">{book.rating}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
