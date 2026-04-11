import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import {
  Search, ShoppingCart, User, Heart, Menu, ChevronRight, ChevronLeft,
  Globe, ShieldCheck, CreditCard, RefreshCcw, BookOpen,
  GraduationCap, Microscope, Calculator, Award, ArrowRight,
  Star, Check, X, Flame, Package, Headphones, Truck,
  Bell, TrendingUp, BookMarked, ChevronDown, Phone, Mail,
  Facebook, Twitter, Instagram, Youtube, Tag, Zap, Clock
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { TypeAnimation } from 'react-type-animation';
import toast, { Toaster } from 'react-hot-toast';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger);

// ─── BOOK IMAGE STORE ────────────────────────────────────────
// Using local generated images + pollinations for others
const BOOK_IMAGES: Record<string, string> = {
  neet_physics:    '/book_neet_physics.png',
  ncert_biology:   '/book_ncert_biology.png',
  jee_chemistry:   '/book_jee_chemistry.png',
  olympiad_maths:  '/book_olympiad_maths.png',
  // Remaining from pollinations (lighter theme prompts)
  cbse_science:    'https://placehold.co/400x540/FFF5F5/DC1E1E?text=100%25+NCERT%0AScience+10&font=poppins',
  neet_guide_bio:  'https://placehold.co/400x540/F0FDF4/16A34A?text=NEET+Guide%0ABiology&font=poppins',
  jee_maths:       'https://placehold.co/400x540/EFF6FF/2563EB?text=JEE+Maths%0AChapterwise&font=poppins',
  cbse_english:    'https://placehold.co/400x540/F5F3FF/7C3AED?text=CBSE+100%25%0AEnglish+12&font=poppins',
  ncert_exemplar:  'https://placehold.co/400x540/FFFBEB/B45309?text=NCERT%0AExemplar+9&font=poppins',
  neet_36yr:       'https://placehold.co/400x540/FEF2F2/DC1E1E?text=36+Years+NEET%0AChapterwise&font=poppins',
  jee_adv_physics: 'https://placehold.co/400x540/EFF6FF/1D4ED8?text=JEE+Adv%0APhysics&font=poppins',
  olympiad_nso:    'https://placehold.co/400x540/F0FDF4/15803D?text=NSO+Science%0AOlympiad+8&font=poppins',
  magazine_phy:    'https://placehold.co/300x400/FEF2F2/DC1E1E?text=Physics%0AFor+You&font=poppins',
  magazine_chem:   'https://placehold.co/300x400/F0FDF4/15803D?text=Chemistry%0AToday&font=poppins',
  magazine_math:   'https://placehold.co/300x400/EFF6FF/1D4ED8?text=Mathematics%0AToday&font=poppins',
  magazine_bio:    'https://placehold.co/300x400/F5F3FF/7C3AED?text=Biology%0AToday&font=poppins',
};

// ─── DATA ────────────────────────────────────────────────────
const PROMO_BANNERS = [
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/02/b2b_website_banner_1.jpg', link: 'https://mtg.in/bulk-inquiries/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/online_class_banner.webp', link: 'https://mtg.in/online-classes/live-classes/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/04/olympiad_50_per_off_workbook.webp', link: 'https://mtg.in/combo-packs-on-discount/olympiad-books/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/04/olympiad_50_per_off.webp', link: 'https://mtg.in/olympiad-books-ntse/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/free-masterclass.webp', link: 'https://us06web.zoom.us/meeting/register/OoGm0cmtTHyYg7rO4YQFZQ' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/foundation_course_2026.webp', link: 'https://mtg.in/school-books-boards/foundation-courses/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/Regional-entrance_1.webp', link: 'https://mtg.in/engineering-entrance-exams/regional-engineering-entrance/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/100-percent-banner-scaled.webp', link: 'https://mtg.in/products-search/?product-cats=all&search=100+Percent' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2025/08/neet_banner_new-2.webp', link: 'https://mtg.in/medical-entrance-exams/neet-exam-books/neet-previous-years-paper/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2025/08/MTG-website-banner-KCET.webp', link: 'https://mtg.in/engineering-entrance-exams/regional-engineering-entrance/karnataka-cet-kcet/' },
];

const ALL_BOOKS = [
  {
    id: 1, title: 'Physics Chemistry Mathematics Biology (PCMB) Combo', subtitle: 'Class 11 & 12',
    price: 695, oldPrice: 895, badge: 'Bestseller', category: 'NEET',
    rating: 4.8, reviews: 2341, image: BOOK_IMAGES.neet_physics,
    tags: ['NEET 2026', 'Theory + MCQ'],
  },
  {
    id: 2, title: 'Physics, Chemistry and Biology Today (PCB) Series', subtitle: 'For NEET / AIIMS',
    price: 850, oldPrice: 999, badge: 'New', category: 'NEET',
    rating: 4.9, reviews: 3892, image: BOOK_IMAGES.ncert_biology,
    tags: ['NEET 2026', 'Chapterwise MCQ'],
  },
  {
    id: 3, title: 'Physics, Chemistry and Mathematics(PCM) Today', subtitle: '27 Years (1998–2025)',
    price: 499, oldPrice: 625, badge: 'Sale', category: 'JEE',
    rating: 4.7, reviews: 1204, image: BOOK_IMAGES.jee_chemistry,
    tags: ['JEE 2026', 'Previous Year'],
  },
  {
    id: 4, title: 'International Mathematical Olympiad Workbook', subtitle: 'Class 8 — IMO',
    price: 275, oldPrice: 350, badge: '', category: 'Olympiad',
    rating: 4.6, reviews: 876, image: BOOK_IMAGES.olympiad_maths,
    tags: ['IMO', 'Class 8'],
  },
  {
    id: 5, title: '100 Percent NCERT and CBSE Science, Mathematics', subtitle: 'CBSE Board Exam',
    price: 425, oldPrice: 525, badge: 'Hot', category: 'CBSE',
    rating: 4.7, reviews: 1573, image: BOOK_IMAGES.cbse_science,
    tags: ['CBSE 2026', 'Class 10'],
  },
  {
    id: 6, title: '100 Percent NCERT and CBSE Biology Class 12', subtitle: 'Class 11 & 12',
    price: 745, oldPrice: 895, badge: '', category: 'NEET',
    rating: 4.8, reviews: 2108, image: BOOK_IMAGES.neet_guide_bio,
    tags: ['NEET 2026', 'Theory + MCQ'],
  },
  {
    id: 7, title: '100 Percent NCERT and CBSE Mathematics Class 12', subtitle: 'Chapterwise 33 Years',
    price: 545, oldPrice: 699, badge: 'Bestseller', category: 'JEE',
    rating: 4.9, reviews: 3101, image: BOOK_IMAGES.jee_maths,
    tags: ['JEE 2026', 'Chapterwise'],
  },
  {
    id: 8, title: '100 Percent NCERT and CBSE English Class 12', subtitle: 'CBSE Board Exam',
    price: 395, oldPrice: 475, badge: '', category: 'CBSE',
    rating: 4.5, reviews: 687, image: BOOK_IMAGES.cbse_english,
    tags: ['CBSE 2026', 'Class 12'],
  },
  {
    id: 9, title: '100 Percent NCERT and CBSE Chemistry Class 12', subtitle: 'Maths & Science',
    price: 325, oldPrice: 399, badge: 'New', category: 'CBSE',
    rating: 4.6, reviews: 945, image: BOOK_IMAGES.ncert_exemplar,
    tags: ['CBSE', 'Class 9'],
  },
  {
    id: 10, title: '100 Percent NCERT and CBSE Physics Class 12', subtitle: 'PYQs with Solutions',
    price: 725, oldPrice: 895, badge: 'Top Seller', category: 'NEET',
    rating: 4.9, reviews: 4521, image: BOOK_IMAGES.neet_36yr,
    tags: ['NEET 2026', 'PYQ 36 Years'],
  },
  {
    id: 11, title: 'JEE Advanced Chapterwise Physics', subtitle: '19 Years Solutions',
    price: 595, oldPrice: 749, badge: '', category: 'JEE',
    rating: 4.7, reviews: 1389, image: BOOK_IMAGES.jee_adv_physics,
    tags: ['JEE Adv', 'Physics'],
  },
  {
    id: 12, title: 'NSO Science Olympiad Workbook Class 8', subtitle: 'National Science Olympiad',
    price: 185, oldPrice: 240, badge: '', category: 'Olympiad',
    rating: 4.5, reviews: 612, image: BOOK_IMAGES.olympiad_nso,
    tags: ['NSO', 'Class 8'],
  },
];

const MAGAZINES = [
  { id: 'm1', name: 'Physics For You Subscription', desc: '1 Year Full Access', price: 50, image: BOOK_IMAGES.magazine_phy, color: '#FEF2F2', accent: '#DC1E1E' },
  { id: 'm2', name: 'Chemistry Today Subscription', desc: '1 Year Full Access', price: 50, image: BOOK_IMAGES.magazine_chem, color: '#F0FDF4', accent: '#16A34A' },
  { id: 'm3', name: 'Mathematics Today Subscription', desc: '1 Year Full Access', price: 50, image: BOOK_IMAGES.magazine_math, color: '#EFF6FF', accent: '#2563EB' },
  { id: 'm4', name: 'Biology Today Subscription', desc: '1 Year Full Access', price: 50, image: BOOK_IMAGES.magazine_bio, color: '#F5F3FF', accent: '#7C3AED' },
];

const CATEGORIES = [
  { label: 'All', icon: BookOpen },
  { label: 'NEET', icon: Microscope },
  { label: 'JEE', icon: Calculator },
  { label: 'Olympiad', icon: Award },
  { label: 'CBSE', icon: GraduationCap },
];

const NAV_LINKS = ['Classes', 'Olympiad', 'Medical / NEET', 'Engineering / JEE', 'Magazines', 'Online Classes', 'CBSE Boards', 'CUET'];

const TICKER_ITEMS = [
  { icon: Truck, text: 'Free Delivery across India on orders above ₹499' },
  { icon: Zap, text: 'New 2026 editions now available — updated syllabus' },
  { icon: Award, text: '#1 Educational Publisher trusted by 50L+ students' },
  { icon: ShieldCheck, text: '100% Secure Payments — UPI, Cards, Net Banking' },
  { icon: RefreshCcw, text: 'Hassle-free 15-day return policy' },
  { icon: Globe, text: 'International shipping available worldwide' },
  { icon: Headphones, text: '24/7 Customer support — Call 0124-4951200' },
  { icon: Clock, text: 'Same-day dispatch on orders before 2 PM' },
];

const TESTIMONIALS = [
  { id: 1, name: 'Ananya Sharma', role: 'NEET AIR 85', text: 'Objective NCERT at your Fingertips was my daily companion. The assertion-reason questions closely matched the actual NEET paper. Highly recommended!', image: 'https://api.dicebear.com/7.x/notionists/svg?seed=Ananya' },
  { id: 2, name: 'Rahul Desai', role: 'JEE Main 99.8%ile', text: 'The Chapterwise Solutions gave me exact insights into the NTA pattern. Practicing 35 years of PYQs built my confidence immensely. A must-buy for aspirants.', image: 'https://api.dicebear.com/7.x/notionists/svg?seed=Rahul' },
  { id: 3, name: 'Priya Verma', role: 'NSO Gold Medalist', text: 'I started preparing with MTG Olympiad workbooks in Class 6. The conceptual clarity and question variety are unmatched and built my foundation.', image: 'https://api.dicebear.com/7.x/notionists/svg?seed=Priya' }
];

// ─── HELPERS ─────────────────────────────────────────────────
const discount = (price: number, old: number) => Math.round(((old - price) / old) * 100);
const formatPrice = (p: number) => `₹${p.toLocaleString('en-IN')}`;

const badgeClass: Record<string, string> = {
  Bestseller: 'badge-best',
  'Top Seller': 'badge-best',
  New: 'badge-new',
  Sale: 'badge-sale',
  Hot: 'badge-hot',
};

// ─── COMPONENTS ──────────────────────────────────────────────

// Progress bar
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[100]"
      style={{ scaleX, background: 'linear-gradient(90deg, #DC1E1E, #F87171)' }}
    />
  );
};

// Marquee ticker
const Ticker = () => {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker-wrap bg-[#1E1E2E] text-white py-2">
      <div className="ticker-content animate-ticker">
        {doubled.map((item, i) => {
          const Icon = item.icon;
          return (
            <span key={i} className="inline-flex items-center gap-2 px-8 text-xs font-medium text-white/80">
              <Icon size={12} className="text-red-400 flex-shrink-0" />
              {item.text}
              <span className="ml-6 text-white/20">•</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

// Animated counter
const Counter = ({ end, suffix = '', label }: { end: number; suffix?: string; label: string }) => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1800, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end]);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display font-bold text-3xl md:text-4xl text-primary mb-1">
        {count.toLocaleString('en-IN')}{suffix}
      </div>
      <div className="text-sm text-on-surface-dim font-medium">{label}</div>
    </div>
  );
};

// Stars
const Stars = ({ rating }: { rating: number }) => (
  <span className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map(s => (
      <Star key={s} size={11} className={s <= Math.round(rating) ? 'star-filled fill-amber-400' : 'star-empty fill-slate-200'} />
    ))}
  </span>
);

// Cart toast
const CartToast = ({ title, t }: { title: string; t: any }) => (
  <div className="toast">
    <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 border border-green-200">
      <Check size={16} className="text-green-600" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-sm font-semibold text-slate-800">Added to Cart!</p>
      <p className="text-xs text-slate-500 truncate mt-0.5">{title}</p>
    </div>
    <button onClick={() => toast.dismiss(t.id)} className="text-slate-400 hover:text-slate-600 flex-shrink-0">
      <X size={15} />
    </button>
  </div>
);

// Book Card
const BookCard = ({ book, onAdd }: { book: typeof ALL_BOOKS[number]; onAdd: (b: typeof ALL_BOOKS[number]) => void }) => {
  const [wished, setWished] = useState(false);
  const disc = book.oldPrice ? discount(book.price, book.oldPrice) : null;
  const cardRef = useRef<HTMLDivElement>(null);

  // GSAP magnetic hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.08;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.08;
    gsap.to(el, { x, y, rotateX: -y * 0.4, rotateY: x * 0.4, duration: 0.35, ease: 'power2.out', transformPerspective: 900 });
  };
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card flex flex-col h-full group cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-2xl bg-slate-50">
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {book.badge && (
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${badgeClass[book.badge] || 'badge-new'} animate-badge`}>
              {book.badge}
            </span>
          )}
          {disc && (
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-red-600 text-white">
              {disc}% OFF
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={e => { e.stopPropagation(); setWished(w => !w); }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center 
                     opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
          aria-label="Wishlist"
        >
          <Heart size={14} className={wished ? 'fill-red-500 text-red-500' : 'text-slate-400'} />
        </button>

        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover hover-zoom group-hover:scale-110"
          loading="lazy"
        />

        {/* Quick add overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent 
                        translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={e => { e.stopPropagation(); onAdd(book); }}
            className="w-full bg-white text-red-600 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-colors"
          >
            <ShoppingCart size={13} /> Add to Cart
          </motion.button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">{book.subtitle}</p>
        <h4 className="text-sm font-semibold text-on-surface line-clamp-2 mb-2 leading-snug group-hover:text-primary transition-colors">
          {book.title}
        </h4>
        <div className="flex items-center gap-1.5 mb-3">
          <Stars rating={book.rating} />
          <span className="text-[10px] text-on-surface-dim">({book.reviews.toLocaleString('en-IN')})</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-lg text-on-surface">{formatPrice(book.price)}</span>
            {book.oldPrice && <span className="text-xs text-on-surface-faint line-through">{formatPrice(book.oldPrice)}</span>}
          </div>
          <button
            onClick={e => { e.stopPropagation(); onAdd(book); }}
            className="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-600 border border-red-100 hover:border-red-600 
                       flex items-center justify-center transition-all duration-200 group/btn"
            aria-label="Add to cart"
          >
            <ShoppingCart size={14} className="text-red-600 group-hover/btn:text-white transition-colors" />
          </button>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {book.tags.map(tag => (
            <span key={tag} className="text-[9px] font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Product Slider
const ProductSlider = ({ items, onAdd }: { items: typeof ALL_BOOKS; onAdd: (b: typeof ALL_BOOKS[number]) => void }) => {
  const [idx, setIdx] = useState(0);
  const [perView, setPerView] = useState(4);
  const [itemWidth, setItemWidth] = useState(0);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const GAP = 16; // matches gap-4 = 1rem = 16px

  // Recalculate itemWidth whenever perView or container size changes
  const recalc = React.useCallback(() => {
    if (!wrapRef.current) return;
    const containerW = wrapRef.current.offsetWidth;
    // card width = (container - total gaps) / perView
    const pv = window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 4;
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

  // Pixel-accurate translation: move by one card + one gap per step
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
              ${b.disable ? 'border-slate-200 text-slate-300 cursor-not-allowed' : 'border-slate-200 text-slate-500 hover:border-red-500 hover:text-red-600 hover:bg-red-50'}`}
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
            <div
              key={book.id}
              style={{ width: itemWidth, minWidth: itemWidth, flexShrink: 0 }}
            >
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

// Section Header
const SectionHead = ({ eyebrow, title, sub, cta }: { eyebrow: string; title: string; sub?: string; cta?: React.ReactNode }) => {
  const [ref, inView] = useInView({ triggerOnce: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: .55, ease: [.23, 1, .32, 1] }}
      className="flex items-end justify-between mb-8 flex-wrap gap-4"
    >
      <div>
        <div className="section-label">{eyebrow}</div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-on-surface tracking-tight">{title}</h2>
        {sub && <p className="text-on-surface-dim text-sm mt-1.5 max-w-lg">{sub}</p>}
      </div>
      {cta}
    </motion.div>
  );
};

// Reveal wrapper
const Reveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: .6, delay, ease: [.23, 1, .32, 1] }} className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── PARALLAX BANNERS COMPONENT ────────────────────────────────
const ParallaxBanners = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !trackRef.current) return;
    const ctx = gsap.context(() => {
      // Calculate how far to move left: track scrollWidth minus window viewport
      const trackWidth = trackRef.current?.scrollWidth || 0;
      const getScrollAmount = () => -(trackWidth - window.innerWidth + 80); // 80px buffer
      
      gsap.to(trackRef.current, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "45% center",
          end: () => `+=${trackWidth * 0.5}`,
          scrub: 0.5,
          pin: true,
          invalidateOnRefresh: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-slate-900 border-y border-slate-800 overflow-hidden select-none py-0 h-svh flex flex-col justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 pointer-events-none z-0" />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 w-full mb-10 relative z-10">
        <h2 className="font-display text-3xl md:text-5xl font-black text-white">Upcoming Features <span className="text-red-500">& </span> Promos</h2>
      </div>
      <div ref={trackRef} className="flex gap-8 px-4 sm:px-6 w-fit h-[50vh] min-h-[300px] items-center relative z-10 transition-transform">
        {PROMO_BANNERS.map((banner, i) => (
          <a key={i} href={banner.link} target="_blank" rel="noreferrer" 
             className="block w-[75vw] max-w-[800px] h-full flex-shrink-0 group rounded-[32px] overflow-hidden shadow-2xl relative border border-white/10 hover:border-red-500/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 to-purple-600/30 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
            <img src={banner.img} alt="Promo Banner" className="w-full h-full object-cover hover-zoom mix-blend-lighten" loading="lazy" />
          </a>
        ))}
      </div>
    </section>
  );
};

// Newsletter success
const SuccessTick = () => (
  <motion.svg viewBox="0 0 52 52" className="w-5 h-5 stroke-current" initial="i" animate="a">
    <motion.circle cx="26" cy="26" r="25" fill="none" strokeWidth="4"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
    <motion.path fill="none" strokeWidth="4" strokeLinecap="round" d="M14.1 27.2l7.1 7.2 16.7-16.8"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.5 }} />
  </motion.svg>
);

// ─── MAIN APP ─────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled]     = useState(false);
  const [cartCount, setCartCount]   = useState(0);
  const [cartAnim, setCartAnim]     = useState(false);
  const [activeCat, setActiveCat]   = useState('All');
  const [searchVal, setSearchVal]   = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [nlStatus, setNlStatus]     = useState<'idle'|'loading'|'success'>('idle');
  const [wishCount, setWishCount]   = useState(0);

  // GSAP refs
  const headerRef   = useRef<HTMLElement>(null);
  const heroRef     = useRef<HTMLDivElement>(null);
  const heroBadge   = useRef<HTMLSpanElement>(null);
  const heroH1      = useRef<HTMLHeadingElement>(null);
  const heroP       = useRef<HTMLParagraphElement>(null);
  const heroBtns    = useRef<HTMLDivElement>(null);
  const heroProof   = useRef<HTMLDivElement>(null);
  const heroImgWrap = useRef<HTMLDivElement>(null);
  const trustRef    = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);

  // ── Navbar slide-in on mount
  useLayoutEffect(() => {
    if (!headerRef.current) return;
    gsap.from(headerRef.current, {
      y: -80, opacity: 0, duration: 0.7, ease: 'power3.out', clearProps: 'all'
    });
  }, []);

  // ── Hero GSAP timeline
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(heroBadge.current,   { y: 20, opacity: 0, duration: 0.5 })
        .from(heroH1.current,      { y: 40, opacity: 0, duration: 0.65 }, '-=0.2')
        .from(heroP.current,       { y: 24, opacity: 0, duration: 0.5  }, '-=0.35')
        .from(heroBtns.current,    { y: 20, opacity: 0, duration: 0.45 }, '-=0.25')
        .from(heroProof.current,   { y: 16, opacity: 0, duration: 0.4  }, '-=0.2')
        .from(heroImgWrap.current, { x: 60, opacity: 0, duration: 0.75, ease: 'power4.out', clearProps: 'all' }, 0.15)
        .add(() => gsap.set([heroBadge.current, heroH1.current, heroP.current, heroBtns.current, heroProof.current], { clearProps: 'all' }));
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // ── Trust bar stagger on scroll
  useEffect(() => {
    if (!trustRef.current) return;
    const cards = trustRef.current.querySelectorAll('.trust-card');
    gsap.from(cards, {
      scrollTrigger: { trigger: trustRef.current, start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.55, stagger: 0.12, ease: 'power3.out', clearProps: 'all'
    });
  }, []);

  // ── Stats counter stagger on scroll
  useEffect(() => {
    if (!statsRef.current) return;
    const items = statsRef.current.querySelectorAll('.stat-item');
    gsap.from(items, {
      scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
      y: 50, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(1.4)', clearProps: 'all'
    });
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleAdd = useCallback((book: typeof ALL_BOOKS[number]) => {
    setCartCount(c => c + 1);
    setCartAnim(true);
    setTimeout(() => setCartAnim(false), 700);
    toast.custom(t => <CartToast title={book.title} t={t} />, { duration: 3500 });
  }, []);

  const filteredBooks = ALL_BOOKS.filter(b => {
    const matchCat = activeCat === 'All' || b.category === activeCat;
    const matchQ = !searchVal || b.title.toLowerCase().includes(searchVal.toLowerCase());
    return matchCat && matchQ;
  });

  const handleNL = (e: React.FormEvent) => {
    e.preventDefault();
    setNlStatus('loading');
    setTimeout(() => setNlStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Toaster position="top-right" containerStyle={{ top: 76 }} gutter={8} />
      <ScrollProgress />

      {/* ═══ TICKER ═══ */}
      <Ticker />

      {/* ═══ HEADER ═══ */}
      <header ref={headerRef} className={`sticky top-0 z-50 transition-all duration-300
        ${scrolled ? 'shadow-[0_10px_30px_rgba(0,0,0,0.05)] bg-white/70 backdrop-blur-2xl' : 'border-b border-divider bg-white/95 backdrop-blur-lg'}`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-4 md:gap-6">

          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="md:hidden p-1.5 rounded-lg hover:bg-surface-low text-on-surface-dim"
              onClick={() => setMobileMenu(m => !m)}>
              <Menu size={20} />
            </button>
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <span className="text-white font-display font-bold text-xl leading-none">M</span>
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="font-display font-bold text-lg text-on-surface tracking-tight leading-none">MTG Learning</div>
                <div className="text-[9px] text-on-surface-dim font-medium tracking-wider uppercase">mtg.in</div>
              </div>
            </a>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl hidden md:flex items-center">
            <div className="relative w-full">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-faint" />
              <input
                type="text"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Search books, magazines, exams..."
                className="input-field pl-11 pr-28"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 btn-primary !px-4 !py-2 !text-xs !rounded-lg !shadow-none">
                Search
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-auto">
            <button className="hidden md:flex flex-col items-center p-2 text-on-surface-dim hover:text-primary transition-colors rounded-xl hover:bg-surface-low text-xs gap-0.5">
              <Phone size={18} />
              <span className="hidden lg:block">Call Us</span>
            </button>
            <button className="relative p-2 text-on-surface-dim hover:text-primary transition-colors rounded-xl hover:bg-surface-low">
              <Heart size={20} />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishCount}
                </span>
              )}
            </button>
            <button className="flex items-center gap-1.5 p-2 text-on-surface-dim hover:text-primary transition-colors rounded-xl hover:bg-surface-low">
              <User size={20} />
              <span className="hidden lg:flex flex-col items-start text-xs leading-tight">
                <span className="text-[10px] text-on-surface-faint">Hello, Guest</span>
                <span className="font-semibold text-on-surface text-xs">Sign In</span>
              </span>
            </button>
            <motion.button
              animate={cartAnim ? { scale: [1, 1.25, 1], rotate: [0, -8, 8, 0] } : {}}
              className="relative flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white pl-3 pr-4 py-2.5 rounded-xl transition-colors shadow-md ml-1"
            >
              <ShoppingCart size={18} />
              <AnimatePresence mode="popLayout">
                {cartCount > 0 && (
                  <motion.span key={cartCount}
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-amber-400 text-slate-900 text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="font-semibold text-sm hidden lg:block">Cart</span>
            </motion.button>
          </div>
        </div>

        {/* Nav bar */}
        <nav className="hidden md:block border-t border-divider bg-white/40 backdrop-blur-2xl flex-shrink-0 relative z-40">
          <div className="max-w-[1400px] mx-auto px-6 flex items-center gap-1 py-1.5 overflow-x-auto scrollbar-hide">
            {NAV_LINKS.map(link => (
              <a key={link} href="#"
                className="text-sm text-slate-700 font-bold px-3 py-2 rounded-lg whitespace-nowrap hover:text-red-600 hover:bg-white/60 transition-all">
                {link}
              </a>
            ))}
            <a href="#" className="ml-auto flex items-center gap-1.5 text-sm font-bold text-red-600 px-4 py-2 rounded-xl bg-red-100/50 hover:bg-red-200/60 transition-colors whitespace-nowrap">
              <Flame size={14} /> Deals & Offers
            </a>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-[108px] z-40 bg-white border-b border-divider shadow-lg md:hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1 max-h-[65vh] overflow-y-auto">
              <div className="relative mb-3">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-faint" />
                <input type="text" placeholder="Search..." className="input-field !pl-10" />
              </div>
              {NAV_LINKS.map(link => (
                <a key={link} href="#" onClick={() => setMobileMenu(false)}
                  className="px-3 py-2.5 rounded-xl text-sm text-on-surface-dim hover:text-primary hover:bg-surface-low transition-all font-medium">
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">

        {/* ═══ HERO ═══ */}
        <section ref={heroRef} className="bg-white border-b border-divider overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 md:py-20 grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              <div>
                <span ref={heroBadge} className="inline-flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                  <Zap size={11} /> Updated for 2026 Exam Session
                </span>
              </div>

              <h1 ref={heroH1}
                className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-on-surface leading-[1.08] tracking-tight mb-5"
              >
                India's Most{' '}
                <span className="text-red-600">Trusted</span>{' '}
                <br />Educational{' '}
                <TypeAnimation
                  sequence={['Publisher.', 2500, 'Store.', 2500, 'Partner.', 2500]}
                  wrapper="span" speed={55} repeat={Infinity}
                  className="text-transparent bg-clip-text whitespace-nowrap"
                  style={{ backgroundImage: 'linear-gradient(90deg, #DC1E1E, #F87171)' }}
                />
              </h1>

              <p ref={heroP} className="text-on-surface-dim text-lg mb-8 max-w-md leading-relaxed">
                Study materials for NEET, JEE, CBSE & Olympiads. 5000+ titles, 50 lakh+ students served, 40+ years of excellence.
              </p>

              <div ref={heroBtns} className="flex flex-wrap gap-3 mb-10">
                <button className="btn-primary">
                  <BookOpen size={16} /> Explore Books
                </button>
                <button className="btn-outline">
                  View Magazines <ArrowRight size={15} />
                </button>
              </div>

              {/* Social proof */}
              <div ref={heroProof} className="flex items-center gap-5 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {['A','S','R','M'].map((l, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 border-2 border-white flex items-center justify-center text-white text-[11px] font-bold">
                        {l}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => <Star key={s} size={12} className="fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-xs text-on-surface-dim">50L+ students trust us</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-divider" />
                <div className="flex items-center gap-2 text-on-surface-dim text-xs">
                  <ShieldCheck size={16} className="text-green-600" />
                  <span>ISO Certified Publisher</span>
                </div>
              </div>
            </div>

            {/* Right — Book Showcase */}
            <div ref={heroImgWrap} className="hidden lg:flex items-center justify-center relative min-h-[480px]">
              {/* Decorative blobs */}
              <div className="absolute top-8 right-8 w-72 h-72 bg-red-50 rounded-full blur-3xl" />
              <div className="absolute bottom-8 left-8 w-56 h-56 bg-blue-50 rounded-full blur-3xl" />

              {/* Central feature book */}
              <motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: .7, delay: .2 }}
                className="relative z-10 animate-float"
              >
                <div className="w-64 shadow-2xl rounded-2xl overflow-hidden border border-white">
                  <img src={BOOK_IMAGES.neet_physics} alt="NEET Guide Physics" className="w-full h-auto" />
                </div>
                {/* Badge on main book */}
                <div className="absolute -top-3 -right-3 bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  ⭐ Bestseller
                </div>
              </motion.div>

              {/* Side books */}
              {[
                { img: BOOK_IMAGES.ncert_biology, top: '5%', left: '-12%', w: '140px', delay: .35, rotate: -8 },
                { img: BOOK_IMAGES.jee_chemistry, top: '5%', right: '-12%', w: '130px', delay: .45, rotate: 6 },
                { img: BOOK_IMAGES.olympiad_maths, bottom: '5%', left: '-8%', w: '120px', delay: .55, rotate: 5 },
              ].map(({ img, delay, w, rotate, ...pos }, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: .6, delay }}
                  className="absolute z-20"
                  style={{ ...pos as any }}
                >
                  <div className="shadow-xl rounded-xl overflow-hidden border border-white" style={{ width: w, transform: `rotate(${rotate}deg)` }}>
                    <img src={img} alt="" className="w-full h-auto" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PROMO BANNERS PARALLAX ═══ */}
        <ParallaxBanners />

        {/* ═══ STATS ═══ */}
        <section className="bg-surface-low border-b border-divider py-12">
            <div className="max-w-[1400px] mx-auto px-6">
              <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {[
                  { end: 50, suffix: 'L+', label: 'Students Served' },
                  { end: 200, suffix: '+', label: 'Expert Authors' },
                  { end: 40, suffix: '+', label: 'Years of Legacy' },
                  { end: 5000, suffix: '+', label: 'Books Published' },
                ].map((s, i) => (
                  <div key={i} className="stat-item relative">
                    {i < 3 && <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-divider" />}
                    <Counter {...s} />
                  </div>
                ))}
              </div>
            </div>
          </section>

        {/* ═══ TRUST BAR ═══ */}
        <section className="bg-white border-b border-divider py-8">
            <div className="max-w-[1400px] mx-auto px-6">
              <div ref={trustRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: Truck,        title: 'Free Delivery',       desc: 'On orders above ₹499', color: 'text-blue-600 bg-blue-50 border-blue-100' },
                  { icon: ShieldCheck,  title: 'Secure Payments',     desc: 'UPI, Cards, Net Banking', color: 'text-green-600 bg-green-50 border-green-100' },
                  { icon: RefreshCcw,   title: 'Easy Returns',        desc: '15-day hassle-free policy', color: 'text-amber-600 bg-amber-50 border-amber-100' },
                  { icon: Headphones,   title: '24/7  Support',       desc: 'Always here to help you', color: 'text-purple-600 bg-purple-50 border-purple-100' },
                ].map((t, i) => (
                  <motion.div key={i} whileHover={{ y: -3 }}
                    className="trust-card flex items-center gap-4 p-4 rounded-2xl border border-divider hover:border-red-200 hover:shadow-md transition-all"
                  >
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 ${t.color}`}>
                      <t.icon size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-on-surface">{t.title}</div>
                      <div className="text-xs text-on-surface-dim mt-0.5">{t.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

        {/* ═══ CATEGORIES + PRODUCT GRID ═══ */}
        <section className="py-16 bg-surface-low">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <SectionHead
              eyebrow="Browse Collection"
              title="Explore by Category"
              sub="Find the perfect study material for every exam and class."
              cta={
                <a href="#" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700">
                  All Products <ArrowRight size={15} />
                </a>
              }
            />

            {/* Category chips */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {CATEGORIES.map(cat => (
                <button key={cat.label}
                  onClick={() => setActiveCat(cat.label)}
                  className={`cat-chip ${activeCat === cat.label ? 'active' : ''}`}
                >
                  <cat.icon size={14} />
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Grid */}
            <AnimatePresence mode="wait">
              <motion.div key={activeCat + searchVal}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: .3 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5"
              >
                {filteredBooks.length > 0 ? filteredBooks.slice(0, 10).map((book, i) => (
                  <motion.div key={book.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .04 }}>
                    <BookCard book={book} onAdd={handleAdd} />
                  </motion.div>
                )) : (
                  <div className="col-span-full py-20 text-center">
                    <BookMarked size={48} className="text-slate-300 mx-auto mb-4" />
                    <p className="text-on-surface-dim text-sm">No books found. Try a different category.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ═══ PROMO BENTO ═══ */}
        <section className="py-16 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Big card */}
              <motion.div whileHover={{ scale: 1.01 }}
                className="md:col-span-2 promo-red border border-red-100 rounded-3xl p-8 md:p-12 relative overflow-hidden cursor-pointer group"
              >
                <div className="absolute right-0 top-0 w-48 h-48 bg-red-200/60 rounded-full -translate-y-1/4 translate-x-1/4 blur-2xl" />
                <div className="absolute right-8 bottom-8 opacity-10">
                  <BookOpen size={120} strokeWidth={1} className="text-red-500" />
                </div>
                <div className="relative z-10 max-w-sm">
                  <span className="text-xs font-bold uppercase tracking-widest text-red-600 flex items-center gap-1.5 mb-3">
                    <Flame size={13} /> Limited Time Offer
                  </span>
                  <div className="font-display font-extrabold text-slate-800 group-hover:text-red-700 transition-colors mb-3">
                    <div className="text-3xl md:text-4xl mb-1">Flat <span className="text-red-600">50% OFF</span></div>
                    <div className="text-xl md:text-2xl text-slate-700 font-bold">on All Workbooks</div>
                  </div>
                  <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                    Practice makes perfect. Grab our comprehensive workbooks at unbeatable prices. Valid this week only!
                  </p>
                  <button className="btn-primary">
                    Shop the Sale <ArrowRight size={16} />
                  </button>
                </div>
                <div className="absolute top-6 right-6">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex flex-col items-center justify-center text-white shadow-lg">
                    <span className="font-display font-extrabold text-2xl leading-none">50%</span>
                    <span className="text-[9px] font-bold uppercase tracking-wide">OFF</span>
                  </div>
                  <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-20" />
                </div>
              </motion.div>

              <div className="flex flex-col gap-5">
                {/* NEET combo */}
                <motion.div whileHover={{ scale: 1.02 }}
                  className="flex-1 promo-blue border border-blue-100 rounded-3xl p-6 relative overflow-hidden cursor-pointer group"
                >
                  <Microscope size={48} className="text-blue-200 absolute right-4 bottom-4" />
                  <div className="relative z-10">
                    <span className="text-xs font-bold uppercase text-blue-600 tracking-wider">NEET 2026</span>
                    <h3 className="font-display text-xl font-bold text-slate-800 mt-2 mb-2 leading-tight group-hover:text-blue-700 transition-colors">
                      Complete NEET<br/>Combo Pack
                    </h3>
                    <p className="text-slate-500 text-xs mb-4">Physics + Chemistry + Biology. Save 25%!</p>
                    <button className="btn-outline !border-blue-500 !text-blue-600 hover:!bg-blue-50 !py-2 !px-4 !text-xs">
                      View Combos <ArrowRight size={13} />
                    </button>
                  </div>
                </motion.div>

                {/* Olympiad */}
                <motion.div whileHover={{ scale: 1.02 }}
                  className="flex-1 promo-amber border border-amber-100 rounded-3xl p-6 relative overflow-hidden cursor-pointer group"
                >
                  <Award size={48} className="text-amber-200 absolute right-4 bottom-4" />
                  <div className="relative z-10">
                    <span className="text-xs font-bold uppercase text-amber-600 tracking-wider">Olympiads</span>
                    <h3 className="font-display text-xl font-bold text-slate-800 mt-2 mb-2 leading-tight group-hover:text-amber-700 transition-colors">
                      IMO / NSO / IEO<br/>Prep Kits
                    </h3>
                    <p className="text-slate-500 text-xs mb-4">Class 1–12. Start your Olympiad journey.</p>
                    <button className="btn-outline !border-amber-500 !text-amber-600 hover:!bg-amber-50 !py-2 !px-4 !text-xs">
                      Explore Kits <ArrowRight size={13} />
                    </button>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ NEW RELEASES ═══ */}
        <section className="py-16 bg-surface-low border-y border-divider">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <SectionHead
              eyebrow="Just Arrived"
              title="New Releases"
              sub="Latest editions updated for the 2026 examination syllabus."
            />
            <ProductSlider items={ALL_BOOKS.slice(0, 8)} onAdd={handleAdd} />
          </div>
        </section>

        {/* ═══ BESTSELLERS ═══ */}
        <section className="py-16 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <SectionHead
              eyebrow="Top Charts"
              title="Bestselling Books"
              sub="Most-loved study materials by students across India."
              cta={
                <a href="#" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700">
                  View All <ArrowRight size={15} />
                </a>
              }
            />
            <ProductSlider items={[...ALL_BOOKS].sort((a, b) => b.reviews - a.reviews)} onAdd={handleAdd} />
          </div>
        </section>

        {/* ═══ MAGAZINES ═══ */}
        <section className="py-16 bg-surface-low border-t border-divider">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <SectionHead
              eyebrow="Monthly"
              title="MTG Magazines"
              sub="Stay ahead with exam updates, practice problems, and expert tips every month."
              cta={
                <button className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700">
                  Subscribe Now <ArrowRight size={15} />
                </button>
              }
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {MAGAZINES.map((mag, i) => (
                <React.Fragment key={mag.id}>
                  <Reveal delay={i * 0.06}>
                    <motion.div whileHover={{ y: -5 }} className="card cursor-pointer group flex flex-col h-full overflow-hidden">
                      <div className="flex-1 min-h-[220px] relative overflow-hidden" style={{ background: mag.color }}>
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10 w-full h-full text-center">
                          <div className="font-display font-bold text-xl md:text-2xl leading-tight" style={{ color: mag.accent }}>{mag.name}</div>
                          <div className="text-xs md:text-sm mt-2 font-semibold flex-1" style={{ color: mag.accent, opacity: 0.85 }}>{mag.desc}</div>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between mt-auto flex-shrink-0">
                        <div>
                          <div className="font-bold text-base text-on-surface">{formatPrice(mag.price)}</div>
                          <div className="text-[10px] text-on-surface-faint">per issue</div>
                        </div>
                        <button
                          className="btn-primary !px-3 !py-2 !text-xs !shadow-none"
                          onClick={() => toast.custom(t => <CartToast title={mag.name} t={t} />, { duration: 3000 })}
                        >
                          <ShoppingCart size={13} /> Add
                        </button>
                      </div>
                    </motion.div>
                  </Reveal>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FOUNDATION COURSES BANNER ═══ */}
        <Reveal>
          <section className="py-16 bg-white">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl overflow-hidden relative">
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #DC1E1E 0%, transparent 50%), radial-gradient(circle at 80% 50%, #2563EB 0%, transparent 50%)' }} />
                <div className="absolute right-0 top-0 w-96 h-full opacity-5">
                  <BookOpen size={400} strokeWidth={0.5} />
                </div>
                <div className="grid md:grid-cols-2 items-center gap-8 p-8 md:p-14 relative z-10">
                  <div>
                    <span className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5">
                      <GraduationCap size={12} /> Foundation Courses
                    </span>
                    <h3 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight mb-4">
                      Build a Strong Foundation<br/>
                      <span className="text-red-400">Class 6 to Class 10</span>
                    </h3>
                    <p className="text-white/60 mb-6 leading-relaxed">
                      MTG Foundation Course books for Physics, Chemistry, Mathematics & Biology — designed to build strong concepts from the ground up for future JEE & NEET aspirants.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="btn-primary !bg-red-600 hover:!bg-red-700">
                        Explore Foundation <ArrowRight size={15} />
                      </button>
                      <button className="btn-outline !border-white/30 !text-white hover:!bg-white/10">
                        Download Catalogue
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {(['Physics', 'Chemistry', 'Mathematics', 'Biology'] as const).map((sub, i) => {
                      const Icons = [Zap, Microscope, Calculator, BookOpen];
                      const Icon = Icons[i];
                      return (
                        <div key={sub} className="bg-white/10 border border-white/10 rounded-2xl p-4 hover:bg-white/15 transition-colors cursor-pointer">
                          <div className="w-8 h-8 rounded-xl bg-red-600/80 flex items-center justify-center mb-2">
                            <Icon size={16} className="text-white" />
                          </div>
                          <div className="font-semibold text-white text-sm">{sub}</div>
                          <div className="text-white/40 text-xs mt-0.5">Class 6–10</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ═══ ONLINE CLASSES ═══ */}
        <Reveal>
          <section className="py-12 bg-surface-low border-y border-divider">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-divider rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-red-50 rounded-2xl border border-red-100 flex items-center justify-center flex-shrink-0">
                    <TrendingUp size={28} className="text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xl text-on-surface">Olympiad Online Classes</h4>
                    <p className="text-on-surface-dim text-sm mt-1">Live & Recorded classes by expert faculty for IMO, NSO, IEO & ICSO.</p>
                  </div>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <button className="btn-primary">Join Live Classes</button>
                  <button className="btn-outline">Watch Recorded</button>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ═══ TESTIMONIALS ═══ */}
        <section className="py-16 bg-white border-b border-divider">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <SectionHead 
              eyebrow="Student Success"
              title="Hear from Achievers"
              sub="Join thousands of top scorers who trust MTG for their preparation."
            />
            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((test, i) => (
                <React.Fragment key={test.id}>
                  <Reveal delay={i * 0.1}>
                    <motion.div whileHover={{ y: -5 }} className="bg-surface-low rounded-2xl p-6 border border-divider h-full flex flex-col cursor-pointer transition-shadow hover:shadow-md">
                      <div className="flex gap-1 mb-4">
                        {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-amber-400 text-amber-400" />)}
                      </div>
                      <p className="text-on-surface-dim text-sm italic leading-relaxed mb-6 flex-grow">"{test.text}"</p>
                      <div className="flex items-center gap-3">
                        <img src={test.image} alt={test.name} className="w-10 h-10 rounded-full bg-slate-200" />
                        <div>
                          <div className="font-bold text-sm text-on-surface">{test.name}</div>
                          <div className="text-[10px] text-red-600 font-bold uppercase tracking-wide">{test.role}</div>
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

          {/* Top: brand + newsletter */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-12 mb-14 pb-14 border-b border-white/10">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-display font-bold text-xl">M</span>
                  </div>
                  <div>
                    <div className="font-display font-bold text-xl text-white">MTG Learning Media</div>
                    <div className="text-xs text-white/40">Publisher since 1982 · mtg.in</div>
                  </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-6">
                  India's pioneering educational publisher dedicated to quality, authentic, and error-free study materials for NEET, JEE, Olympiads, and CBSE boards.
                </p>
                <div className="flex gap-3">
                  {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="w-9 h-9 bg-white/10 hover:bg-red-600 rounded-xl flex items-center justify-center transition-colors">
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Stay Updated</h4>
                <p className="text-white/50 text-sm mb-4">Subscribe for new releases, exam tips & exclusive offers.</p>
                <form onSubmit={handleNL} className="flex gap-2">
                  <input type="email" required placeholder="Enter your email" className="input-field !bg-white/10 !border-white/20 !text-white placeholder:!text-white/30 focus:!border-red-500" />
                  <motion.button disabled={nlStatus !== 'idle'} whileTap={{ scale: .96 }}
                    className={`btn-primary !whitespace-nowrap flex-shrink-0 !shadow-none
                      ${nlStatus === 'success' ? '!bg-green-500' : ''}`}
                  >
                    {nlStatus === 'idle' && 'Subscribe'}
                    {nlStatus === 'loading' && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" />}
                    {nlStatus === 'success' && <><SuccessTick /> Done!</>}
                  </motion.button>
                </form>
                <div className="flex items-center gap-4 mt-4 text-white/40 text-xs">
                  <a href="tel:01244951200" className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Phone size={12} /> 0124-4951200
                  </a>
                  <a href="mailto:helpdesk@mtg.in" className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Mail size={12} /> helpdesk@mtg.in
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {[
              { title: 'Explore', links: ['NEET Books', 'JEE Books', 'Olympiad Books', 'CBSE Books', 'Foundation Courses', 'NCERT Solutions'] },
              { title: 'Magazines', links: ['Physics For You', 'Chemistry Today', 'Mathematics Today', 'Biology Today', 'Subscribe', 'Back Issues'] },
              { title: 'Company', links: ['About MTG', 'Our Seminars', 'Careers  (Hiring!)', 'Press & Media', 'Bulk Inquiries', 'Dealer Network'] },
              { title: 'Policy', links: ['Terms of Use', 'Privacy Policy', 'Return Policy', 'Shipping Policy', 'Cookie Policy'] },
              { title: 'Help', links: ['Track Order', 'FAQs', 'Contact Us', 'Call Us', 'Email Support', 'Download App'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-bold text-sm text-white mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm text-white/40 hover:text-red-400 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">© 2026 MTG Learning Media Pvt. Ltd. All rights reserved. | CIN: U22110DL1988PTC030922</p>
            <div className="flex items-center gap-4 text-white/30">
              <div className="flex items-center gap-2">
                <CreditCard size={16} />
                <ShieldCheck size={16} />
                <span className="text-xs">Secure Checkout</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <span className="text-xs">Made with ❤️ in India</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
