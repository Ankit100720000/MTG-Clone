import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ALL_BOOKS } from '../data';
import BookCard from './BookCard';

interface ProductSliderProps {
  items: typeof ALL_BOOKS;
  onAdd: (b: typeof ALL_BOOKS[number]) => void;
}

const ProductSlider = ({ items, onAdd }: ProductSliderProps) => {
  const [idx, setIdx] = useState(0);
  const [perView, setPerView] = useState(4);
  const [itemWidth, setItemWidth] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const GAP = 16;

  const recalc = React.useCallback(() => {
    if (!wrapRef.current) return;
    const containerW = wrapRef.current.offsetWidth;
    const pv = window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 4 : window.innerWidth < 1280 ? 5 : 6;
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
    <div className="relative">
      {/* Nav */}
      <div className="absolute -top-14 right-0 flex gap-2">
        {[{ fn: prev, disable: idx === 0, icon: ChevronLeft }, { fn: next, disable: idx >= max, icon: ChevronRight }].map((b, i) => (
          <button
            key={i}
            onClick={b.fn}
            disabled={b.disable}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all
              ${b.disable ? 'border-slate-200 text-slate-300 cursor-not-allowed' : 'border-slate-200 text-slate-500 hover:border-indigo-500 hover:text-red-600 hover:bg-indigo-50'}`}
          >
            <b.icon size={16} />
          </button>
        ))}
      </div>

      {/* Track */}
      <div ref={wrapRef} className="overflow-hidden py-3">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => { if (info.offset.x < -40) next(); if (info.offset.x > 40) prev(); }}
          animate={{ x: translateX }}
          transition={{ type: 'spring', stiffness: 320, damping: 35 }}
          className="flex cursor-grab active:cursor-grabbing"
          style={{ gap: GAP }}
        >
          {items.map(book => (
            <div key={book.id} style={{ width: itemWidth, minWidth: itemWidth, flexShrink: 0 }}>
              <BookCard book={book} onAdd={onAdd} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {Array.from({ length: max + 1 }).map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? 'w-8 bg-red-600' : 'w-2 bg-slate-200 hover:bg-slate-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
