import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BOOK_IMAGES, ALL_BOOKS, formatPrice, discount, badgeClass } from '../data';
import { ShoppingCart, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    img:     BOOK_IMAGES.neet_physics,
    title:   'NEET Guide Physics',
    sub:     'Class 11 & 12',
    price:   695,
    old:     895,
    badge:   'Bestseller',
    rating:  4.8,
    reviews: 2341,
    accent:  '#DC1E1E',
    bg:      'linear-gradient(135deg, #FFF5F5 0%, #FEE2E2 100%)',
  },
  {
    img:     BOOK_IMAGES.ncert_biology,
    title:   'PCB Series for NEET',
    sub:     'For NEET / AIIMS',
    price:   850,
    old:     999,
    badge:   'New',
    rating:  4.9,
    reviews: 3892,
    accent:  '#16A34A',
    bg:      'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
  },
  {
    img:     BOOK_IMAGES.jee_chemistry,
    title:   'PCM Today',
    sub:     '27 Years (1998–2025)',
    price:   499,
    old:     625,
    badge:   'Sale',
    rating:  4.7,
    reviews: 1204,
    accent:  '#2563EB',
    bg:      'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
  },
  {
    img:     BOOK_IMAGES.olympiad_maths,
    title:   'IMO Workbook',
    sub:     'Class 8 – IMO',
    price:   275,
    old:     350,
    badge:   'Hot',
    rating:  4.6,
    reviews: 876,
    accent:  '#7C3AED',
    bg:      'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
  },
];

const INTERVAL = 3200;

export default function HeroCardSlider({ onAdd }: { onAdd?: (book: typeof ALL_BOOKS[0]) => void }) {
  const [active, setActive]     = useState(0);
  const [dir, setDir]           = useState<1 | -1>(1);
  const [paused, setPaused]     = useState(false);
  const timerRef                = useRef<ReturnType<typeof setTimeout>>();

  const go = (next: number, d: 1 | -1) => {
    setDir(d);
    setActive((next + SLIDES.length) % SLIDES.length);
  };

  const prev = () => go(active - 1, -1);
  const next = () => go(active + 1, 1);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => go(active + 1, 1), INTERVAL);
    return () => clearTimeout(timerRef.current);
  }, [active, paused]);

  const slide = SLIDES[active];
  const disc = Math.round(((slide.old - slide.price) / slide.old) * 100);

  // Prev / next cards for the stack effect
  const prevIdx = (active - 1 + SLIDES.length) % SLIDES.length;
  const nextIdx = (active + 1) % SLIDES.length;

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ minHeight: 480 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Glow blobs */}
      <div className="absolute top-8 right-8 w-64 h-64 rounded-full blur-3xl opacity-60 pointer-events-none"
        style={{ background: slide.accent + '22' }} />
      <div className="absolute bottom-8 left-8 w-48 h-48 rounded-full blur-3xl opacity-40 pointer-events-none bg-blue-100" />

      {/* Stack: back cards */}
      {[nextIdx, prevIdx].map((idx, i) => (
        <div
          key={idx}
          className="absolute rounded-3xl border border-white/80"
          style={{
            width: 280,
            height: 380,
            background: SLIDES[idx].bg,
            transform: i === 0
              ? 'translateX(22px) translateY(-14px) rotate(5deg) scale(0.92)'
              : 'translateX(-22px) translateY(-10px) rotate(-4deg) scale(0.90)',
            zIndex: 1,
            opacity: 0.6,
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Active card */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={active}
          custom={dir}
          initial={{ opacity: 0, x: dir * 80, rotateY: dir * 15, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
          exit={{ opacity: 0, x: -dir * 60, rotateY: -dir * 10, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          style={{ perspective: 1000, zIndex: 10, width: 288 }}
          whileHover={{ y: -6, boxShadow: `0 32px 64px -12px ${slide.accent}40` }}
          className="relative rounded-3xl overflow-hidden border border-white cursor-pointer"
        >
          {/* Card BG */}
          <div className="absolute inset-0" style={{ background: slide.bg }} />

          {/* Badge */}
          {slide.badge && (
            <div className={`absolute top-3 left-3 z-10 text-[10px] font-bold px-2.5 py-1 rounded-full ${badgeClass[slide.badge] ?? 'badge-new'}`}>
              {slide.badge}
            </div>
          )}

          {/* Discount pill */}
          <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded-full shadow-sm"
            style={{ color: slide.accent }}>
            -{disc}%
          </div>

          {/* Book image */}
          <div className="relative flex items-center justify-center pt-6 pb-2 px-6">
            <img
              src={slide.img}
              alt={slide.title}
              className="h-52 object-contain drop-shadow-2xl"
              draggable={false}
            />
          </div>

          {/* Info */}
          <div className="px-5 pb-5 relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5 opacity-60" style={{ color: slide.accent }}>
              {slide.sub}
            </p>
            <h3 className="font-display font-bold text-slate-800 text-[15px] leading-snug mb-2">
              {slide.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={10}
                    className={s <= Math.round(slide.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-200'} />
                ))}
              </div>
              <span className="text-[10px] text-slate-500">({slide.reviews.toLocaleString('en-IN')})</span>
            </div>

            {/* Price + CTA */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-display font-bold text-lg text-slate-900">
                  {formatPrice(slide.price)}
                </span>
                <span className="text-xs text-slate-400 line-through ml-1.5">
                  {formatPrice(slide.old)}
                </span>
              </div>
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={() => onAdd && onAdd(ALL_BOOKS.find(b => b.price === slide.price) ?? ALL_BOOKS[0])}
                className="flex items-center gap-1.5 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md transition-all"
                style={{ background: `linear-gradient(135deg, ${slide.accent}, ${slide.accent}cc)` }}
              >
                <ShoppingCart size={13} /> Add
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav arrows */}
      <button onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-divider shadow-md flex items-center justify-center hover:border-primary hover:text-primary transition-all"
      >
        <ChevronLeft size={16} />
      </button>
      <button onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-divider shadow-md flex items-center justify-center hover:border-primary hover:text-primary transition-all"
      >
        <ChevronRight size={16} />
      </button>

      {/* Dots */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {SLIDES.map((s, i) => (
          <button key={i} onClick={() => go(i, i > active ? 1 : -1)}
            className="transition-all duration-300 rounded-full"
            style={{
              width:      i === active ? 20 : 6,
              height:     6,
              background: i === active ? slide.accent : '#CBD5E1',
            }}
          />
        ))}
      </div>
    </div>
  );
}
