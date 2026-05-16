import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import {
  Search, ShoppingCart, User, Heart, Menu,
  ShieldCheck, CreditCard, RefreshCcw, BookOpen,
  GraduationCap, Microscope, Calculator, Award, ArrowRight,
  Star, Flame, Headphones, Truck,
  TrendingUp, BookMarked, Phone, Mail,
  Facebook, Twitter, Instagram, Youtube, Zap, Moon, Sun, Globe,
  Smartphone, Play, Download, Clock, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TypeAnimation } from 'react-type-animation';
import toast, { Toaster } from 'react-hot-toast';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Data & helpers
import {
  ALL_BOOKS, MAGAZINES, CATEGORIES, NAV_LINKS, TESTIMONIALS,
  BOOK_IMAGES, formatPrice, SHOP_BY_CATEGORY, OFFER_BANNERS, NEW_RELEASES, FOOTER_SECTIONS, discount,
} from './data';

// Components
import ScrollProgress from './components/ScrollProgress';
import Ticker from './components/Ticker';
import Counter from './components/Counter';
import CartToast from './components/CartToast';
import BookCard from './components/BookCard';
import ProductSlider from './components/ProductSlider';
import SectionHead from './components/SectionHead';
import Reveal from './components/Reveal';
import TestimonialSlider from './components/TestimonialSlider';

import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import HeroBento from './components/HeroBento';

gsap.registerPlugin(ScrollTrigger);

// Newsletter success tick
const SuccessTick = () => (
  <motion.svg viewBox="0 0 52 52" className="w-5 h-5 stroke-current" initial="i" animate="a">
    <motion.circle cx="26" cy="26" r="25" fill="none" strokeWidth="4"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
    <motion.path fill="none" strokeWidth="4" strokeLinecap="round" d="M14.1 27.2l7.1 7.2 16.7-16.8"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.5 }} />
  </motion.svg>
);

// MAIN APP
export default function App() {
  const [scrolled, setScrolled]       = useState(false);
  const [darkMode, setDarkMode]       = useState(false);
  const [cartItems, setCartItems]     = useState<(typeof ALL_BOOKS[0] & { qty: number })[]>([]);
  const [cartOpen, setCartOpen]       = useState(false);
  const [cartAnim, setCartAnim]       = useState(false);
  const [activeCat, setActiveCat]     = useState('All');
  const [searchVal, setSearchVal]     = useState('');
  const [searchFocus, setSearchFocus] = useState(false);
  const [mobileMenu, setMobileMenu]   = useState(false);
  const [authOpen, setAuthOpen]       = useState(false);
  const [authView, setAuthView]       = useState<'login' | 'signup' | 'otp'>('login');
  const [nlStatus, setNlStatus]       = useState<'idle' | 'loading' | 'success'>('idle');
  const [wishCount, setWishCount]     = useState(0);

  const cartCount = cartItems.reduce((acc, it) => acc + it.qty, 0);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);



  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleAdd = useCallback((book: typeof ALL_BOOKS[number]) => {
    setCartItems(prev => {
      const ex = prev.find(p => p.id === book.id);
      if (ex) return prev.map(p => p.id === book.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...book, qty: 1 }];
    });
    setCartAnim(true);
    setCartOpen(true);
    setTimeout(() => setCartAnim(false), 700);
    toast.custom(t => <CartToast title={book.title} t={t} />, { duration: 2500 });
  }, []);

  const filteredBooks = ALL_BOOKS.filter(b => {
    const matchCat = activeCat === 'All' || b.category === activeCat;
    const matchQ   = !searchVal || b.title.toLowerCase().includes(searchVal.toLowerCase());
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
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} setItems={setCartItems} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} view={authView} setView={setAuthView} />

      {/* TICKER */}
      <Ticker />

      {/* HEADER */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { y: -80, opacity: 0 },
          visible: {
            y: 0, opacity: 1,
            transition: { staggerChildren: 0.1, duration: 0.5, ease: "easeOut" }
          }
        }}
        className={`sticky top-0 z-50 transition-all duration-500 border-b ${scrolled ? 'shadow-[0_8px_32px_rgba(0,0,0,0.08)] bg-white/85 backdrop-blur-xl border-transparent' : 'border-divider bg-white'}`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-6">
          
          {/* Logo */}
          <motion.div variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-3">
            <button className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-500" onClick={() => setMobileMenu(m => !m)}>
              <Menu size={20} />
            </button>
            <a href="#" className="flex items-center gap-2 group">
              <span className="font-display font-black text-2xl text-primary tracking-tight">MTG</span>
              <span className="hidden sm:block text-[10px] font-bold text-on-surface-faint uppercase tracking-[0.15em] mt-1">Learning Media</span>
            </a>
          </motion.div>

          {/* Center Nav Links */}
          <motion.nav variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }} className="hidden lg:flex items-center gap-8">
            {['Classes', 'NEET', 'JEE', 'Olympiad', 'CBSE', 'Magazines', 'Online Classes'].map(link => (
              <div key={link} className="relative group cursor-pointer">
                <a href="#" className="text-[13px] font-bold text-slate-700 hover:text-primary transition-colors py-2 flex items-center gap-1 group-hover:text-primary">
                  {link}
                </a>
                <div className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                {/* Mega Menu Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 p-4">
                  <div className="text-[9px] font-extrabold text-slate-400 mb-3 uppercase tracking-[0.15em]">Explore {link}</div>
                  <div className="flex flex-col gap-2">
                    <a href="#" className="text-[13px] font-semibold text-slate-600 hover:text-primary transition-colors py-1">New Releases</a>
                    <a href="#" className="text-[13px] font-semibold text-slate-600 hover:text-primary transition-colors py-1">Bestsellers</a>
                    <a href="#" className="text-[13px] font-semibold text-slate-600 hover:text-primary transition-colors py-1">Previous Year Papers</a>
                  </div>
                </div>
              </div>
            ))}
          </motion.nav>

          {/* Right Actions */}
          <motion.div variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-3 xl:gap-5">
            {/* Search Pill */}
            <div className="hidden md:flex relative group">
              <input 
                type="text" 
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Search..." 
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30 w-48 transition-all focus:w-64 placeholder:text-slate-400" 
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary" />
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button className="relative p-2 text-slate-500 hover:text-primary transition-colors rounded-xl hover:bg-primary/5">
                <Heart size={20} />
                {wishCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {wishCount}
                  </span>
                )}
              </button>
              <button onClick={() => { setAuthView('login'); setAuthOpen(true); }} className="relative p-2 text-slate-500 hover:text-primary transition-colors rounded-xl hover:bg-primary/5">
                <User size={20} />
              </button>
              <motion.button 
                onClick={() => setCartOpen(true)} 
                animate={cartAnim ? { scale: [1, 1.25, 1], rotate: [0, -8, 8, 0] } : {}}
                className="relative p-2 text-slate-500 hover:text-primary transition-colors rounded-xl hover:bg-primary/5"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-badge">
                    {cartCount}
                  </span>
                )}
              </motion.button>
            </div>

          </motion.div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-[108px] z-40 bg-white border-b border-divider shadow-lg md:hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1 max-h-[65vh] overflow-y-auto">
              <div className="relative mb-3">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-faint" />
                <input type="text" placeholder="Search..." className="input-field pl-10!" />
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

      <main className="grow">

        {/* HERO */}
        <section className="relative bg-white border-b border-divider overflow-hidden pt-10 pb-20 lg:pt-20 lg:pb-28">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px] animate-blob" />
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-blue/5 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '-4s' }} />
            <div className="absolute inset-0 grid-dots opacity-20" />
          </div>
          
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">

            {/* Left */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <span className="inline-flex items-center gap-2 bg-dark text-white text-xs font-bold px-4 py-2 rounded-full mb-6 shadow-lg">
                  <Star size={12} className="fill-amber text-amber" /> India's Most Trusted Educational Store
                </span>
              </motion.div>

              <motion.h1 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="font-display font-bold text-[44px] md:text-[52px] leading-[1.08] text-dark tracking-tight mb-5"
              >
                Crack NEET, JEE &amp; Olympiads<br />with <span className="text-gradient">Confidence</span>
              </motion.h1>

              <motion.p 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="text-on-surface-dim text-[16px] leading-relaxed mb-8 max-w-lg"
              >
                50L+ books sold · Expert authors · 40+ years of excellence
              </motion.p>

              <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <button className="btn-primary px-7 py-4 text-[15px]">
                  <BookOpen size={18} /> Explore Books
                </button>
                <button className="btn-outline px-7 py-3.5 text-[15px]">
                  Free Magazines <ArrowRight size={18} />
                </button>
              </motion.div>

              {/* Stats Row */}
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex flex-wrap gap-x-10 gap-y-4 pt-8 border-t border-slate-100"
              >
                {[
                  { end: 50, suffix: 'L+', label: 'Books' },
                  { end: 200, suffix: '+', label: 'Authors' },
                  { end: 40, suffix: '+', label: 'Years' },
                  { end: 5000, suffix: '+', label: 'Products' },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="font-display font-black text-2xl text-dark">
                      <Counter end={s.end} suffix={s.suffix} />
                    </div>
                    <div className="text-[11px] font-bold text-on-surface-faint uppercase tracking-[0.12em]">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right */}
            <div className="hidden lg:block relative w-full h-full">
              <HeroBento />
            </div>
          </div>
        </section>
        {/* TRUST BAR */}
        <section className="bg-surface-low py-12 border-b border-divider">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { icon: Truck,       title: 'Free Delivery',   desc: 'On orders above ₹1,100' },
                { icon: ShieldCheck, title: 'Secure Payment',  desc: '100% secure checkout' },
                { icon: RefreshCcw,  title: 'Easy Returns',    desc: '15-day hassle-free' },
                { icon: Headphones,  title: '24/7 Support',    desc: 'Dedicated helpdesk' },
                { icon: Award,       title: '40+ Years',       desc: 'Of educational excellence' },
              ].map((t, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center p-2"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                    <t.icon size={22} className="text-primary" />
                  </div>
                  <div className="font-bold text-[13px] text-dark mb-1">{t.title}</div>
                  <div className="text-[11px] text-on-surface-dim">{t.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CATEGORIES + PRODUCT GRID */}
        <section className="py-16 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="font-display font-bold text-3xl text-dark tracking-tight">Explore by Category</h2>
              </div>
              <a href="#" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-hover transition-colors">
                View All <ArrowRight size={16} />
              </a>
            </div>

            <div className="flex flex-wrap gap-2.5 mb-10">
              {['All', 'NEET', 'JEE', 'Olympiad', 'CBSE', 'NCERT', 'Class 6–10', 'Class 11–12'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeCat === cat ? 'bg-primary text-white shadow-red' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeCat + searchVal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
              >
                {filteredBooks.length > 0 ? filteredBooks.slice(0, 12).map((book, i) => (
                  <motion.div key={book.id} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                    <BookCard book={book} onAdd={handleAdd} />
                  </motion.div>
                )) : (
                  <div className="col-span-full py-20 text-center">
                    <BookMarked size={48} className="text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 text-sm font-medium">No books found. Try a different category.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* SHOP BY CATEGORY — Real MTG Images */}
        <section className="py-16 bg-surface-low border-t border-slate-100">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="font-display font-bold text-3xl text-dark tracking-tight mb-2">Shop by Category</h2>
              <p className="text-on-surface-dim">Browse India's largest collection of competitive exam books</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {SHOP_BY_CATEGORY.map((cat, i) => (
                <motion.a
                  key={cat.label}
                  href={cat.link}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileHover={{ y: -6 }}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="w-full aspect-square rounded-3xl overflow-hidden mb-3 border-2 border-transparent group-hover:border-primary/30 transition-all shadow-sm group-hover:shadow-xl">
                    <img src={cat.img} alt={cat.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  </div>
                  <span className="text-[13px] font-bold text-dark group-hover:text-primary transition-colors">{cat.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* NEW RELEASES — Real MTG Products */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 text-primary text-xs font-bold tracking-widest uppercase mb-2"><Flame size={14} /> Just Launched</span>
                <h2 className="font-display font-bold text-3xl text-dark tracking-tight">New Releases</h2>
              </div>
              <a href="https://mtg.in/new-releases" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-hover transition-colors">
                See All <ArrowRight size={16} />
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {NEW_RELEASES.map((p, i) => (
                <motion.a
                  key={p.id}
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col"
                >
                  <div className="relative bg-slate-50 p-3 flex items-center justify-center aspect-[3/4]">
                    <span className="absolute top-2 left-2 text-[8px] font-extrabold uppercase tracking-wider bg-dark text-white px-2 py-1 rounded-md z-10">{p.badge}</span>
                    <img src={p.image} alt={p.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-3 flex-1 flex flex-col">
                    <p className="text-[11px] font-bold text-slate-700 line-clamp-2 mb-2 leading-snug group-hover:text-primary transition-colors">{p.title}</p>
                    <div className="mt-auto flex items-baseline gap-1.5">
                      <span className="font-display font-black text-sm text-dark">₹{p.price.toLocaleString('en-IN')}</span>
                      {p.oldPrice > 0 && <span className="text-[10px] text-slate-400 line-through">₹{p.oldPrice.toLocaleString('en-IN')}</span>}
                    </div>
                    {p.oldPrice > 0 && <span className="text-[9px] font-bold text-green-600 mt-1">{discount(p.price, p.oldPrice)}% OFF</span>}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* SPECIAL OFFERS — Real MTG Banners */}
        <section className="py-16 bg-surface-low border-t border-slate-100">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 text-primary text-xs font-bold tracking-widest uppercase mb-2"><TrendingUp size={14} /> Limited Time</span>
                <h2 className="font-display font-bold text-3xl text-dark tracking-tight">Special Offers & Deals</h2>
              </div>
              <a href="https://mtg.in/deals" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-hover transition-colors">
                View All Deals <ArrowRight size={16} />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {OFFER_BANNERS.map((b, i) => (
                <motion.a
                  key={i}
                  href={b.link}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-primary/20"
                >
                  <img src={b.img} alt={b.label} className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-xs font-bold text-dark">{b.label}</span>
                    <ArrowRight size={12} className="inline ml-2 text-primary" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* PROMO BANNERS */}
        <section className="py-16 bg-surface-low overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Banner 1: Red */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="relative overflow-hidden rounded-4xl bg-primary p-8 md:p-12 flex flex-col justify-center min-h-[280px] group cursor-pointer"
              >
                <div className="absolute -right-8 -top-12 text-[180px] font-black text-white/10 leading-none select-none pointer-events-none group-hover:scale-110 transition-transform duration-700">
                  50%
                </div>
                <div className="relative z-10">
                  <h3 className="font-display font-black text-3xl md:text-4xl text-white leading-tight mb-4 max-w-sm">
                    Flat 50% OFF on All Master Workbooks
                  </h3>
                  <button className="bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-slate-50 hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 w-max">
                    Shop the Sale <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>

              {/* Banner 2: Dark */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="relative overflow-hidden rounded-4xl bg-[#1a1a2e] p-8 md:p-12 flex flex-col justify-center min-h-[280px] group cursor-pointer"
              >
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />
                <Award size={120} className="absolute -right-6 -bottom-6 text-white/5 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
                
                <div className="relative z-10">
                  <span className="inline-block bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    Olympiads 2026
                  </span>
                  <h3 className="font-display font-black text-3xl md:text-4xl text-white leading-tight mb-6 max-w-sm">
                    IMO / NSO / IEO Prep Kits Now Live
                  </h3>
                  <button className="bg-transparent border-2 border-white text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 active:scale-95 w-max">
                    Explore Combos <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* SHOP BY CLASS — Large Grid */}
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <span className="inline-flex items-center gap-1.5 text-primary text-xs font-bold tracking-widest uppercase mb-2"><GraduationCap size={14} /> Browse by Class</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-dark tracking-tight mb-2">Find Books for Your Class</h2>
              <p className="text-on-surface-dim max-w-lg mx-auto">Olympiad, CBSE, NCERT, Foundation Course, School Textbooks — everything organized by class.</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
              {Array.from({ length: 12 }, (_, i) => i + 1).map(cls => (
                <motion.a
                  key={cls}
                  href={`https://mtg.in/`}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: cls * 0.03, duration: 0.3 }}
                  whileHover={{ y: -6, scale: 1.05 }}
                  className="group relative bg-surface-low rounded-2xl p-5 flex flex-col items-center justify-center text-center border-2 border-transparent hover:border-primary/30 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-colors">
                    <span className="font-display font-black text-xl text-primary">{cls}</span>
                  </div>
                  <span className="text-sm font-bold text-dark">Class {cls}</span>
                  <span className="text-[10px] text-on-surface-dim mt-1">{cls <= 5 ? 'Olympiad · Textbooks' : cls <= 10 ? 'Foundation · CBSE' : 'NEET · JEE · CBSE'}</span>
                </motion.a>
              ))}
            </div>
            <div className="flex justify-center mt-8 gap-3">
              <motion.a href="https://mtg.in/early-learning/" target="_blank" rel="noreferrer" whileHover={{ scale: 1.04 }} className="bg-amber-50 border border-amber-200 text-amber-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-amber-100 transition-colors flex items-center gap-2">
                <BookOpen size={16} /> Pre-Nursery / Early Learning
              </motion.a>
              <motion.a href="https://mtg.in/school-library-set/" target="_blank" rel="noreferrer" whileHover={{ scale: 1.04 }} className="bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-indigo-100 transition-colors flex items-center gap-2">
                <BookMarked size={16} /> School Library Sets
              </motion.a>
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS — More Books */}
        <section className="py-16 bg-surface-low border-t border-slate-100">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 text-primary text-xs font-bold tracking-widest uppercase mb-2"><Star size={14} /> Handpicked</span>
                <h2 className="font-display font-bold text-3xl text-dark tracking-tight">Featured Products</h2>
              </div>
              <a href="https://mtg.in/featured" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-hover transition-colors">
                See All <ArrowRight size={16} />
              </a>
            </div>
            <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 snap-x snap-mandatory scrollbar-hide">
              {ALL_BOOKS.slice(6, 12).map((book, i) => (
                <motion.div 
                  key={book.id} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="min-w-[240px] sm:min-w-0 snap-center"
                >
                  <BookCard book={{...book, badge: book.badge || 'Featured'}} onAdd={handleAdd} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* NEET / JEE SUCCESS STATS — Infographic Section */}
        <section className="py-20 bg-dark text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="grid-dots w-full h-full" />
          </div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-1.5 text-primary text-xs font-bold tracking-widest uppercase mb-3"><TrendingUp size={14} /> Proven Results</span>
              <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight mb-3">Numbers That Speak</h2>
              <p className="text-white/60 max-w-lg mx-auto">Four decades of making India's students exam-ready.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { num: '50L+', label: 'Books Sold', sub: 'Across India' },
                { num: '200+', label: 'Expert Authors', sub: 'IITians & Doctors' },
                { num: '40+', label: 'Years of Trust', sub: 'Since 1982' },
                { num: '19K+', label: 'Pin Codes', sub: 'Pan-India Delivery' },
                { num: '#1', label: 'Olympiad Publisher', sub: 'In India' },
                { num: '5K+', label: 'Schools Trust Us', sub: 'Library Partners' },
                { num: '12', label: 'Monthly Magazines', sub: 'PCM & Biology' },
                { num: '100%', label: 'NCERT Aligned', sub: 'Updated Syllabus' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors group"
                >
                  <div className="font-display font-black text-3xl md:text-4xl text-primary mb-1 group-hover:scale-110 transition-transform inline-block">{stat.num}</div>
                  <div className="font-bold text-white text-sm">{stat.label}</div>
                  <div className="text-white/40 text-xs mt-1">{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* EXAM CALENDAR — Upcoming Exams */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="inline-flex items-center gap-1.5 text-primary text-xs font-bold tracking-widest uppercase mb-2"><Calendar size={14} /> Stay Updated</span>
                <h2 className="font-display font-bold text-3xl text-dark tracking-tight">Upcoming Exams 2026</h2>
              </div>
              <a href="https://mtg.in/exam-calendar/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-hover transition-colors">
                View Full Calendar <ArrowRight size={16} />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { exam: 'NEET UG 2026', date: 'May 4, 2026', status: 'Ongoing', color: 'bg-blue-500', icon: Microscope },
                { exam: 'JEE Main Session 2', date: 'Apr 1-15, 2026', status: 'Completed', color: 'bg-indigo-500', icon: Calculator },
                { exam: 'JEE Advanced 2026', date: 'May 18, 2026', status: 'Upcoming', color: 'bg-purple-500', icon: Zap },
                { exam: 'SOF IMO Level 2', date: 'Feb 9, 2026', status: 'Completed', color: 'bg-amber-500', icon: Award },
                { exam: 'CBSE Class 12 Boards', date: 'Feb 15 - Apr 4, 2026', status: 'Completed', color: 'bg-emerald-500', icon: GraduationCap },
                { exam: 'CBSE Class 10 Boards', date: 'Feb 15 - Mar 29, 2026', status: 'Completed', color: 'bg-teal-500', icon: BookOpen },
                { exam: 'CUET UG 2026', date: 'May 14-30, 2026', status: 'Upcoming', color: 'bg-rose-500', icon: GraduationCap },
                { exam: 'SOF NSO', date: 'Nov-Dec 2026', status: 'Upcoming', color: 'bg-orange-500', icon: Award },
                { exam: 'KCET 2026', date: 'Apr 17-18, 2026', status: 'Completed', color: 'bg-sky-500', icon: Calculator },
              ].map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                  className="flex items-center gap-4 bg-surface-low rounded-2xl p-4 border border-slate-100 hover:border-primary/20 hover:shadow-lg transition-all group cursor-pointer"
                >
                  <div className={`w-12 h-12 ${e.color} rounded-xl flex items-center justify-center shrink-0`}>
                    <e.icon size={22} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-dark truncate group-hover:text-primary transition-colors">{e.exam}</h4>
                    <p className="text-xs text-on-surface-dim flex items-center gap-1 mt-0.5"><Clock size={11} /> {e.date}</p>
                  </div>
                  <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg shrink-0 ${
                    e.status === 'Upcoming' ? 'bg-green-100 text-green-700' : 
                    e.status === 'Ongoing' ? 'bg-amber-100 text-amber-700' : 
                    'bg-slate-100 text-slate-500'
                  }`}>{e.status}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        <section className="py-16 bg-white border-y border-divider">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="font-display font-bold text-3xl text-dark tracking-tight">Bestselling Books</h2>
              </div>
              <a href="#" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-hover transition-colors">
                See All <ArrowRight size={16} />
              </a>
            </div>

            <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 snap-x snap-mandatory scrollbar-hide">
              {ALL_BOOKS.slice(0, 6).map((book, i) => (
                <motion.div 
                  key={book.id} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="min-w-[240px] sm:min-w-0 snap-center"
                >
                  <BookCard book={{...book, badge: 'Bestseller'}} onAdd={handleAdd} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MTG MAGAZINES */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="font-display font-bold text-3xl text-dark tracking-tight mb-2">MTG Magazines — Stay Ahead Every Month</h2>
              <p className="text-slate-500">Subscribe to India's leading monthly magazines for competitive exams.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MAGAZINES.map((mag, i) => (
                <motion.div 
                  key={mag.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-4xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  <div className="h-40 flex items-center justify-center p-6 relative overflow-hidden" style={{ backgroundColor: mag.color }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-black transition-opacity" />
                    <h3 className="font-display font-black text-2xl text-center leading-tight relative z-10" style={{ color: mag.accent }}>
                      {mag.name.replace(' Subscription', '')}
                    </h3>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">Monthly</span>
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">12 Issues/Year</span>
                    </div>
                    
                    <div className="mt-auto flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-display font-black text-2xl text-dark">₹500<span className="text-sm text-slate-400 font-medium">/yr</span></div>
                          <div className="text-xs font-semibold text-slate-500 mt-0.5">₹50/issue</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => toast.custom(t => <CartToast title={mag.name} t={t} />, { duration: 3000 })}
                        className="w-full bg-dark text-white font-bold py-3 rounded-xl hover:bg-primary transition-colors flex items-center justify-center gap-2"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: WHY CHOOSE MTG */}
        <section className="py-16 bg-white border-y border-divider">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="font-display font-bold text-3xl text-dark tracking-tight mb-2">Why Choose MTG?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: User, title: 'Expert Authors', desc: 'Books by IITians, doctors & top educators' },
                { icon: BookOpen, title: 'NCERT-Aligned', desc: 'Perfectly aligned with latest NCERT syllabus' },
                { icon: RefreshCcw, title: 'PYQ Coverage', desc: '20+ years of previous year questions included' },
                { icon: ShieldCheck, title: 'Digital Support', desc: 'Free ebook with every physical book' },
                { icon: Award, title: 'Olympiad Leader', desc: 'India\'s #1 Olympiad book publisher since 1982' },
                { icon: Globe, title: 'All India Reach', desc: 'Delivered to 19,000+ pin codes across India' }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[#F9F9F9] p-6 rounded-2xl flex items-start gap-4 border border-slate-100"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center shrink-0">
                    <feature.icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg mb-1">{feature.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10: TESTIMONIALS */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="font-display font-bold text-3xl text-dark tracking-tight mb-2">Hear from Our Achievers</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Arjun Mehta', exam: 'JEE AIR 89 · 2024', quote: 'The Chapterwise Solutions gave me exact insights into the NTA pattern. Practicing 35 years of PYQs built my confidence immensely. A must-buy for aspirants.', initials: 'AM', color: 'bg-blue-100 text-blue-700' },
                { name: 'Sneha Patel', exam: 'NEET AIR 142 · 2024', quote: 'Objective NCERT at your Fingertips was my daily companion. The assertion-reason questions closely matched the actual NEET paper. Highly recommended!', initials: 'SP', color: 'bg-emerald-100 text-emerald-700' },
                { name: 'Rohan Kumar', exam: 'NSO Gold Medal · 2023', quote: 'I started preparing with MTG Olympiad workbooks in Class 6. The conceptual clarity and question variety are unmatched and built my foundation.', initials: 'RK', color: 'bg-amber-100 text-amber-700' }
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col"
                >
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 italic mb-6 grow">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${t.color}`}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.exam}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* APP DOWNLOAD */}
        <section className="py-16 bg-white border-y border-slate-100">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-linear-to-r from-red-50 to-orange-50 rounded-4xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/40 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="flex-1 relative z-10">
                <div className="inline-flex items-center gap-2 bg-white text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-6 shadow-sm">
                  <Smartphone size={14} /> Available on iOS & Android
                </div>
                <h2 className="font-display font-black text-3xl md:text-4xl text-dark leading-tight mb-4">
                  Learning Now in Your Pocket
                </h2>
                <p className="text-slate-600 mb-8 max-w-md">
                  Download the official MTG app for instant access to free PDFs, mock tests, daily quizzes, and exclusive app-only discounts.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-black hover:bg-slate-800 text-white px-6 py-3 rounded-xl transition-all flex items-center gap-3">
                    <Play size={20} />
                    <div className="text-left">
                      <div className="text-[10px] text-white/70 leading-none">GET IT ON</div>
                      <div className="text-sm font-bold leading-none mt-1">Google Play</div>
                    </div>
                  </button>
                  <button className="bg-black hover:bg-slate-800 text-white px-6 py-3 rounded-xl transition-all flex items-center gap-3">
                    <Download size={20} />
                    <div className="text-left">
                      <div className="text-[10px] text-white/70 leading-none">Download on the</div>
                      <div className="text-sm font-bold leading-none mt-1">App Store</div>
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="w-full md:w-auto relative z-10 flex justify-center md:justify-end">
                <div className="w-[280px] h-[340px] bg-slate-800 rounded-t-4xl border-8 border-black border-b-0 overflow-hidden shadow-2xl relative">
                  <div className="absolute top-0 inset-x-0 h-6 bg-black flex justify-center rounded-b-xl px-4 z-20">
                     <div className="w-1/3 h-4 bg-black rounded-b-xl" />
                  </div>
                  <div className="w-full h-full bg-primary flex flex-col items-center justify-center p-6 text-center text-white relative">
                    <div className="absolute inset-0 bg-black/10" />
                    <h3 className="font-black text-2xl mb-2 relative z-10">MTG App</h3>
                    <p className="text-xs text-white/80 relative z-10">Your study companion</p>
                    <div className="mt-6 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg relative z-10">
                      <span className="font-black text-xl text-primary">M</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* BLOG SECTION */}
        <section className="py-20 bg-surface-low border-y border-slate-100">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <div className="inline-flex items-center gap-1.5 text-primary text-sm font-bold tracking-widest uppercase mb-3">
                  <span className="w-8 h-0.5 bg-primary rounded-full" /> Preparation Insights
                </div>
                <h2 className="font-display font-black text-3xl md:text-4xl text-dark tracking-tight">
                  Latest from the Blog
                </h2>
              </div>
              <button className="hidden md:flex bg-transparent border-2 border-slate-200 text-slate-700 hover:border-primary hover:text-primary font-bold px-6 py-2.5 rounded-xl transition-colors items-center gap-2">
                View All Articles <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: "How to Score 360 in NEET Biology: A Complete Strategy", 
                  category: "NEET Prep", 
                  date: "May 12, 2026", 
                  read: "5 min read",
                  img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
                  excerpt: "Mastering NCERT is key. Here is a step-by-step breakdown of how top rankers study Biology to maximize their score."
                },
                { 
                  title: "JEE Advanced 2026: Most Important Topics to Cover", 
                  category: "JEE Advanced", 
                  date: "May 10, 2026", 
                  read: "8 min read",
                  img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
                  excerpt: "With the changing pattern, focusing on high-weightage topics is crucial. Let's analyze the past 5 years' papers."
                },
                { 
                  title: "Why Olympiads are Crucial for Building a Strong Foundation", 
                  category: "Foundation", 
                  date: "May 08, 2026", 
                  read: "6 min read",
                  img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
                  excerpt: "Starting early gives students an edge in competitive exams later. Here's why you should register for NSO and IMO."
                }
              ].map((blog, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(204,0,0,0.08)] transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <img 
                      src={blog.img} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                    />
                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider">
                      {blog.category}
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col grow">
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-4">
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> {blog.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {blog.read}</span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-slate-900 leading-snug mb-3 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 grow">
                      {blog.excerpt}
                    </p>
                    <a href="#" className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all mt-auto w-max">
                      Read Full Article <ArrowRight size={16} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button className="w-full mt-8 md:hidden bg-transparent border-2 border-slate-200 text-slate-700 font-bold px-6 py-3.5 rounded-xl transition-colors flex justify-center items-center gap-2">
              View All Articles <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* SECTION 11: ONLINE CLASSES BANNER */}
        <section className="py-20 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-[#0f0f1a] rounded-4xl overflow-hidden relative"
            >
              <div className="absolute inset-0 border-4 border-primary/20 rounded-4xl m-2 pointer-events-none" />
              <div className="grid lg:grid-cols-2 gap-8 items-center p-8 md:p-12 lg:p-16 relative z-10">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                  <h3 className="font-display font-black text-3xl md:text-4xl text-white leading-tight mb-4">
                    Build a Strong Foundation<br />
                    <span className="text-primary">Class 6 to Class 10</span>
                  </h3>
                  <p className="text-white/70 mb-8 max-w-md">
                    MTG Foundation classes for Physics, Chemistry, Maths &amp; Biology. Start your journey towards excellence today.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-xl transition-colors">
                      Explore Foundation Classes
                    </button>
                    <button className="bg-transparent border border-white/30 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">
                      Download Catalogue
                    </button>
                  </div>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'Physics', icon: Zap },
                      { name: 'Chemistry', icon: Microscope },
                      { name: 'Maths', icon: Calculator },
                      { name: 'Biology', icon: BookOpen }
                    ].map((sub, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                          <sub.icon size={24} className="text-primary" />
                        </div>
                        <span className="text-white font-semibold text-sm">{sub.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 12: NEWSLETTER CTA */}
        <section className="py-16 bg-[#fff5f5]">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="font-display font-black text-3xl text-dark mb-3">Get Free Study Material Every Week</h2>
              <p className="text-slate-600 mb-8">Join 5L+ students getting free PDFs, sample papers &amp; exam tips</p>
              
              <form onSubmit={handleNL} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  required 
                  placeholder="Enter your email address" 
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                />
                <button 
                  disabled={nlStatus !== 'idle'} 
                  className={`bg-dark text-white font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap min-w-[120px] flex items-center justify-center ${nlStatus === 'success' ? 'bg-emerald-600!' : 'hover:bg-slate-800'}`}
                >
                  {nlStatus === 'idle'    && 'Subscribe'}
                  {nlStatus === 'loading' && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" />}
                  {nlStatus === 'success' && <><SuccessTick /> Done!</>}
                </button>
              </form>
              <p className="text-xs text-slate-400 mt-4">No spam. Unsubscribe anytime.</p>
            </motion.div>
          </div>
        </section>

        {/* TOPPERS WALL OF FAME */}
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 text-primary text-xs font-bold tracking-widest uppercase mb-2"><Award size={14} /> Success Stories</span>
              <h2 className="font-display font-black text-3xl md:text-4xl text-dark tracking-tight mb-3">Toppers Who Studied with MTG</h2>
              <p className="text-on-surface-dim max-w-lg mx-auto">Real students, real results. See how MTG books helped them crack India's toughest exams.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { name: 'Aarav Patel', rank: 'NEET AIR 12', year: '2025', exam: 'NEET', color: 'from-blue-500 to-blue-700' },
                { name: 'Sneha Reddy', rank: 'JEE Adv AIR 45', year: '2025', exam: 'JEE', color: 'from-indigo-500 to-indigo-700' },
                { name: 'Rishi Kumar', rank: 'NEET AIR 3', year: '2024', exam: 'NEET', color: 'from-emerald-500 to-emerald-700' },
                { name: 'Priya Sharma', rank: 'IMO Gold Medal', year: '2025', exam: 'Olympiad', color: 'from-amber-500 to-amber-700' },
                { name: 'Karan Singh', rank: 'JEE Main 99.9%ile', year: '2025', exam: 'JEE', color: 'from-purple-500 to-purple-700' },
                { name: 'Ananya Verma', rank: 'CBSE 99.2%', year: '2025', exam: 'CBSE', color: 'from-rose-500 to-rose-700' },
                { name: 'Rohan Joshi', rank: 'NSO Gold Medal', year: '2024', exam: 'Olympiad', color: 'from-teal-500 to-teal-700' },
                { name: 'Ishita Gupta', rank: 'NEET AIR 28', year: '2024', exam: 'NEET', color: 'from-cyan-500 to-cyan-700' },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-linear-to-br ${t.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />
                  <div className="relative p-5 sm:p-6 flex flex-col items-center text-center min-h-[180px] justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-3 text-white font-black text-lg">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h4 className="font-bold text-white text-sm">{t.name}</h4>
                    <div className="font-display font-black text-xl text-white mt-1">{t.rank}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-white/20 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{t.exam}</span>
                      <span className="bg-white/20 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{t.year}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <a href="https://mtg.in/toppers-interviews/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all">
                Read All Topper Interviews <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* SHOP BY SUBJECT — Large Subject Grid */}
        <section className="py-16 bg-surface-low border-t border-slate-100">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <span className="inline-flex items-center gap-1.5 text-primary text-xs font-bold tracking-widest uppercase mb-2"><BookOpen size={14} /> By Subject</span>
              <h2 className="font-display font-bold text-3xl text-dark tracking-tight mb-2">Shop by Subject</h2>
              <p className="text-on-surface-dim">Explore our complete range across every subject and competitive exam.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[
                { name: 'Physics', emoji: '⚛️', bg: 'bg-blue-50 hover:bg-blue-100', border: 'border-blue-200', text: 'text-blue-700', books: '120+' },
                { name: 'Chemistry', emoji: '🧪', bg: 'bg-green-50 hover:bg-green-100', border: 'border-green-200', text: 'text-green-700', books: '95+' },
                { name: 'Biology', emoji: '🧬', bg: 'bg-emerald-50 hover:bg-emerald-100', border: 'border-emerald-200', text: 'text-emerald-700', books: '85+' },
                { name: 'Mathematics', emoji: '📐', bg: 'bg-indigo-50 hover:bg-indigo-100', border: 'border-indigo-200', text: 'text-indigo-700', books: '110+' },
                { name: 'English', emoji: '📝', bg: 'bg-purple-50 hover:bg-purple-100', border: 'border-purple-200', text: 'text-purple-700', books: '60+' },
                { name: 'Science', emoji: '🔬', bg: 'bg-cyan-50 hover:bg-cyan-100', border: 'border-cyan-200', text: 'text-cyan-700', books: '75+' },
                { name: 'Social Studies', emoji: '🌍', bg: 'bg-amber-50 hover:bg-amber-100', border: 'border-amber-200', text: 'text-amber-700', books: '40+' },
                { name: 'GK & Reasoning', emoji: '🧠', bg: 'bg-rose-50 hover:bg-rose-100', border: 'border-rose-200', text: 'text-rose-700', books: '50+' },
                { name: 'Computer Science', emoji: '💻', bg: 'bg-slate-50 hover:bg-slate-100', border: 'border-slate-200', text: 'text-slate-700', books: '30+' },
                { name: 'Hindi', emoji: '📖', bg: 'bg-orange-50 hover:bg-orange-100', border: 'border-orange-200', text: 'text-orange-700', books: '35+' },
              ].map((sub, i) => (
                <motion.a
                  key={sub.name}
                  href="#"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`${sub.bg} ${sub.border} border rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-300 group cursor-pointer`}
                >
                  <span className="text-3xl mb-2">{sub.emoji}</span>
                  <span className={`font-bold text-sm ${sub.text}`}>{sub.name}</span>
                  <span className="text-[10px] text-on-surface-dim mt-1">{sub.books} Books</span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* DOWNLOAD CATALOGUE + BULK ORDERS CTA */}
        <section className="py-0 bg-white border-t border-slate-100">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-0 md:gap-8 py-16">
              
              {/* Download Catalogue */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-surface-low rounded-3xl p-8 md:p-10 flex flex-col justify-center border border-slate-100 mb-6 md:mb-0"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
                  <Download size={28} className="text-primary" />
                </div>
                <h3 className="font-display font-black text-2xl text-dark mb-3">Download Our Catalogue</h3>
                <p className="text-on-surface-dim text-sm leading-relaxed mb-6">
                  Browse our complete range of 1000+ books across all competitive exams, school boards, and Olympiads. Updated for the 2026-27 academic session.
                </p>
                <a href="https://mtg.in/download-catalogue/" target="_blank" rel="noreferrer" className="btn-primary w-max flex items-center gap-2 text-sm">
                  <Download size={16} /> Download Free Catalogue
                </a>
              </motion.div>

              {/* Institutional / Bulk */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-dark rounded-3xl p-8 md:p-10 flex flex-col justify-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-[60px] pointer-events-none" />
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-5 relative z-10">
                  <Globe size={28} className="text-white" />
                </div>
                <h3 className="font-display font-black text-2xl text-white mb-3 relative z-10">Institutional & Bulk Orders</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6 relative z-10">
                  Special pricing for schools, coaching institutes, and libraries. Get up to 40% off on bulk orders with dedicated support.
                </p>
                <a href="https://mtg.in/bulk-inquiries/" target="_blank" rel="noreferrer" className="bg-white text-dark font-bold px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors w-max flex items-center gap-2 text-sm relative z-10">
                  <Phone size={16} /> Contact for Bulk Orders
                </a>
              </motion.div>

            </div>
          </div>
        </section>

        {/* PARTNER WITH US — Opportunities */}
        <section className="py-16 bg-surface-low border-t border-slate-100">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 text-primary text-xs font-bold tracking-widest uppercase mb-2"><Headphones size={14} /> Opportunities</span>
              <h2 className="font-display font-bold text-3xl text-dark tracking-tight mb-2">Partner with MTG</h2>
              <p className="text-on-surface-dim">Join India's largest educational publishing ecosystem.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { title: 'Become an Author', desc: 'Share your expertise. Write for India\'s top exam-prep publisher.', icon: BookOpen, link: 'https://mtg.in/author-and-editor/', cta: 'Apply Now' },
                { title: 'Online Class Teacher', desc: 'Teach thousands of students through our live classes platform.', icon: Play, link: 'https://mtg.in/online-class-teacher/', cta: 'Start Teaching' },
                { title: 'Influencer Program', desc: 'Collaborate with us. Reach millions of students & parents.', icon: Star, link: 'https://mtg.in/influencer-collaboration-form/', cta: 'Join Program' },
                { title: 'Distributor Network', desc: 'Expand our reach. Become an authorized MTG distributor.', icon: Truck, link: 'https://mtg.in/distributors-2/', cta: 'Get Started' },
              ].map((p, i) => (
                <motion.a
                  key={i}
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <p.icon size={22} className="text-primary" />
                  </div>
                  <h4 className="font-bold text-dark mb-2 group-hover:text-primary transition-colors">{p.title}</h4>
                  <p className="text-sm text-on-surface-dim mb-4 flex-1">{p.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-primary font-bold text-sm group-hover:gap-2.5 transition-all">
                    {p.cta} <ArrowRight size={14} />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* SECTION 13: FOOTER */}
      <footer className="bg-dark text-white pt-16 pb-8 border-t-4 border-primary">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
            
            {/* Brand Col */}
            <div className="col-span-2 md:col-span-1 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-display font-black text-3xl text-primary tracking-tight">MTG</span>
                <span className="text-xs font-semibold text-white/50 uppercase tracking-widest mt-2">Learning Media</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-xs">
                India's most trusted educational book publisher for NEET, JEE, Olympiad, CBSE, and school books. Making learning simplified since 40+ years.
              </p>
              <p className="text-white/40 text-xs mb-6">
                Plot No 99, Sector 44, Gurugram - 122003, Haryana, India
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-white/5 hover:bg-primary rounded-xl flex items-center justify-center transition-colors">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">Explore</h4>
              <ul className="space-y-2">
                {FOOTER_SECTIONS.explore.map(link => (
                  <li key={link}><a href="#" className="text-xs text-white/55 hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">Company</h4>
              <ul className="space-y-2">
                {FOOTER_SECTIONS.company.map(link => (
                  <li key={link}><a href="#" className="text-xs text-white/55 hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
              <h4 className="font-bold text-white mb-3 mt-6 text-sm">Partner with Us</h4>
              <ul className="space-y-2">
                {FOOTER_SECTIONS.partner.map(link => (
                  <li key={link}><a href="#" className="text-xs text-white/55 hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">Support</h4>
              <ul className="space-y-2">
                {FOOTER_SECTIONS.support.map(link => (
                  <li key={link}><a href="#" className="text-xs text-white/55 hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Policy + Contact */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">Policy</h4>
              <ul className="space-y-2">
                {FOOTER_SECTIONS.policy.map(link => (
                  <li key={link}><a href="#" className="text-xs text-white/55 hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
              <div className="mt-6 space-y-2">
                <a href="tel:18001030673" className="flex items-center gap-2 text-xs text-white/55 hover:text-white transition-colors">
                  <Phone size={12} /> 1800-1030-673
                </a>
                <a href="tel:01246601200" className="flex items-center gap-2 text-xs text-white/55 hover:text-white transition-colors">
                  <Phone size={12} /> 0124-6601200
                </a>
                <a href="mailto:info@mtg.in" className="flex items-center gap-2 text-xs text-white/55 hover:text-white transition-colors">
                  <Mail size={12} /> info@mtg.in
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-white/40">
              © 2026 MTG Learning Media Pvt. Ltd. | <a href="#" className="hover:text-white">Privacy Policy</a> · <a href="#" className="hover:text-white">User Terms</a> · <a href="#" className="hover:text-white">Return Policy</a> · <a href="#" className="hover:text-white">Sitemap</a>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center"><CreditCard size={14} className="text-white/40" /></div>
              <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center"><span className="text-[10px] font-bold text-white/40">UPI</span></div>
              <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center"><span className="text-[8px] font-bold text-white/40">Paytm</span></div>
              <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center"><span className="text-[8px] font-bold text-white/40">PhonePe</span></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
