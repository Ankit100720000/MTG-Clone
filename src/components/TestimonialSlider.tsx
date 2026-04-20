import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data';

interface TestimonialSliderProps {
  items: typeof TESTIMONIALS;
}

const TestimonialSlider = ({ items }: TestimonialSliderProps) => {
  const [idx, setIdx] = useState(0);
  const [perView, setPerView] = useState(3);
  const [itemWidth, setItemWidth] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const GAP = 24;

  const recalc = useCallback(() => {
    if (!wrapRef.current) return;
    const containerW = wrapRef.current.offsetWidth;
    const pv = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    setPerView(pv);
    setItemWidth((containerW - GAP * (pv - 1)) / pv);
  }, []);

  useEffect(() => {
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, [recalc]);

  const max = Math.max(0, items.length - perView);
  const next = () => idx < max && setIdx(i => i + 1);
  const prev = () => idx > 0 && setIdx(i => i - 1);
  const translateX = -(idx * (itemWidth + GAP));

  return (
    <div className="relative mt-4">
      <div className="absolute -top-[70px] right-0 flex gap-2">
        {[{ fn: prev, disable: idx === 0, icon: ChevronLeft }, { fn: next, disable: idx >= max, icon: ChevronRight }].map((b, i) => (
          <button key={i} onClick={b.fn} disabled={b.disable}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${b.disable ? 'border-slate-200 text-slate-300 cursor-not-allowed' : 'border-slate-200 text-slate-500 hover:border-indigo-500 hover:text-red-600 hover:bg-indigo-50'}`}
          >
            <b.icon size={16} />
          </button>
        ))}
      </div>

      <div ref={wrapRef} className="overflow-hidden py-4 -my-4">
        <motion.div
          drag="x" dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => { if (info.offset.x < -40) next(); if (info.offset.x > 40) prev(); }}
          animate={{ x: translateX }}
          transition={{ type: 'spring', stiffness: 320, damping: 35 }}
          className="flex cursor-grab active:cursor-grabbing pb-8"
          style={{ gap: GAP }}
        >
          {items.map(test => (
            <div key={test.id} style={{ width: itemWidth, minWidth: itemWidth, flexShrink: 0 }}>
              <div 
                className="rounded-3xl p-6 md:p-8 border border-slate-100 flex flex-col h-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl select-none group relative overflow-hidden"
                style={{ background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}
              >
                {/* Subtle soft glowing border effect on top */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="flex gap-1 mb-5 bg-amber-50/80 w-max px-2.5 py-1.5 rounded-lg border border-amber-100 shadow-sm">
                  {[1,2,3,4,5].map(s => <Star key={s} size={13} className="fill-amber-400 text-amber-400 drop-shadow-sm" />)}
                </div>
                <p className="text-slate-600 font-medium text-[15px] italic leading-relaxed mb-8 flex-grow tracking-wide">"{test.text}"</p>
                <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-50 shadow-sm">
                  <img src={test.image} alt={test.name} className="w-12 h-12 rounded-full bg-slate-200 border-2 border-slate-100 drop-shadow-sm" draggable={false} />
                  <div>
                    <div className="font-extrabold text-sm text-slate-800 group-hover:text-red-600 transition-colors">{test.name}</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{test.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
