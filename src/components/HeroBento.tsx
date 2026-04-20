import { motion } from 'motion/react';
import { BOOK_IMAGES } from '../data';
import { Globe, ArrowRight, Star, GraduationCap } from 'lucide-react';

export default function HeroBento() {
  return (
    <div className="w-full max-w-md xl:max-w-lg mx-auto h-[360px] grid grid-cols-2 grid-rows-5 gap-3 xl:gap-4 select-none pr-2 lg:pr-0">
      
      {/* Main Tall Box (Left Column, spans 5 rows) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="row-span-5 relative rounded-[2rem] overflow-hidden bg-[#F8FAFC] border border-slate-200 shadow-sm flex flex-col justify-end p-4 xl:p-5 group cursor-pointer"
        style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)' }}
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-red-400/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex-grow flex items-center justify-center w-full pb-4">
          <img 
            src={BOOK_IMAGES.neet_physics} 
            alt="NEET Guide" 
            className="w-[85%] object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 origin-bottom" 
            draggable={false}
          />
        </div>

        <div className="relative z-10 bg-white/90 backdrop-blur-md border border-white shadow-sm p-3.5 rounded-2xl flex-shrink-0">
           <div className="flex justify-between items-center mb-1">
             <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-600">Bestseller</span>
             <div className="flex gap-0.5">
               {[1,2,3,4,5].map(i => <Star key={i} className="fill-amber-400 text-amber-400" size={10} />)}
             </div>
           </div>
           <div className="text-sm font-bold text-slate-800 leading-tight mb-2">Complete NEET Guide Physics</div>
           <button className="w-full py-2 bg-slate-900 text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 group-hover:bg-red-600 group-hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
             Explore Book <ArrowRight size={13} />
           </button>
        </div>
      </motion.div>

      {/* Top Right Box (Spans 3 rows) */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="row-span-3 relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 p-4 xl:p-5 flex flex-col justify-center group cursor-pointer"
      >
        <div className="absolute right-[-10%] bottom-[-10%] w-24 h-24 bg-indigo-500 rounded-full opacity-10 blur-xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
        <Globe size={90} className="absolute -right-4 -bottom-4 text-indigo-600/5 group-hover:-rotate-12 transition-transform duration-700 pointer-events-none" />
        
        <div className="text-3xl xl:text-4xl font-black text-indigo-900 mb-1 tracking-tight drop-shadow-sm">50L+</div>
        <div className="text-[10px] xl:text-xs font-bold text-indigo-700/80 uppercase tracking-widest leading-snug">Students<br/>Empowered</div>
        
        <div className="mt-4 flex flex-col gap-2 relative z-10">
          <div className="bg-white/80 backdrop-blur-sm px-3 py-2 rounded-xl flex items-center gap-2.5 border border-white shadow-sm">
             <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center"><Star size={10} className="text-emerald-600 fill-emerald-600"/></div>
             <span className="text-[10px] font-bold text-slate-700">Top Rated Books</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm px-3 py-2 rounded-xl flex items-center gap-2.5 border border-white shadow-sm">
             <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center"><GraduationCap size={12} className="text-amber-600"/></div>
             <span className="text-[10px] font-bold text-slate-700">40+ Yrs Legacy</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom Right Box (Spans 2 rows) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="row-span-2 relative rounded-[1.5rem] xl:rounded-[2rem] overflow-hidden bg-gradient-to-r from-[#FFFBEB] to-[#FEF3C7] border border-amber-200/60 p-4 xl:p-5 flex flex-row items-center gap-3 xl:gap-4 group cursor-pointer"
      >
        <div className="absolute right-0 top-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl group-hover:bg-amber-400/30 transition-colors pointer-events-none" />
        
        <div className="w-[45%] h-full flex items-center justify-center relative z-10">
          <img 
            src={BOOK_IMAGES.olympiad_maths} 
            alt="Olympiad Prep" 
            className="max-h-full max-w-full object-contain drop-shadow-xl group-hover:-translate-y-1 group-hover:rotate-[-2deg] transition-transform duration-300"
            draggable={false}
          />
        </div>

        <div className="relative z-10 flex-col flex justify-center flex-1">
           <div className="text-[9px] font-black uppercase tracking-wider text-amber-700 bg-amber-200/60 px-1.5 py-0.5 rounded inline-block mb-1.5 w-max">Olympiad</div>
           <div className="text-xs font-bold text-slate-800 leading-tight mb-1.5">IMO Prep<br/>Packs 1-12</div>
           <div className="text-[10px] font-bold text-amber-700 flex items-center gap-1 group-hover:gap-1.5 transition-all">Explore <ArrowRight size={10}/></div>
        </div>
      </motion.div>

    </div>
  );
}
