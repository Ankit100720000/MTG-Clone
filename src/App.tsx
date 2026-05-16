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
  BOOK_IMAGES, formatPrice,
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
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${scrolled ? 'shadow-[0_10px_30px_rgba(0,0,0,0.05)] bg-white/80 backdrop-blur-md border-transparent' : 'border-divider bg-white'}`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-6">
          
          {/* Logo */}
          <motion.div variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-3">
            <button className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-500" onClick={() => setMobileMenu(m => !m)}>
              <Menu size={20} />
            </button>
            <a href="#" className="flex items-center gap-2 group">
              <span className="font-display font-black text-2xl text-[#CC0000] tracking-tight">MTG</span>
              <span className="hidden sm:block text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1">Learning Media</span>
            </a>
          </motion.div>

          {/* Center Nav Links */}
          <motion.nav variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }} className="hidden lg:flex items-center gap-8">
            {['Classes', 'NEET', 'JEE', 'Olympiad', 'CBSE', 'Magazines', 'Online Classes'].map(link => (
              <div key={link} className="relative group cursor-pointer">
                <a href="#" className="text-sm font-bold text-slate-800 hover:text-[#CC0000] transition-colors py-2 flex items-center gap-1 group-hover:text-[#CC0000]">
                  {link}
                </a>
                <div className="absolute left-0 bottom-0 w-full h-[2px] bg-[#CC0000] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                {/* Mega Menu Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-white shadow-xl rounded-xl border border-divider opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 p-4">
                  <div className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-wider">Explore {link}</div>
                  <div className="flex flex-col gap-2.5">
                    <a href="#" className="text-sm font-semibold text-slate-700 hover:text-[#CC0000] transition-colors">New Releases</a>
                    <a href="#" className="text-sm font-semibold text-slate-700 hover:text-[#CC0000] transition-colors">Bestsellers</a>
                    <a href="#" className="text-sm font-semibold text-slate-700 hover:text-[#CC0000] transition-colors">Previous Year Papers</a>
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
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 w-48 transition-all focus:w-64" 
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#CC0000]" />
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button className="relative p-2 text-slate-600 hover:text-[#CC0000] transition-colors rounded-full hover:bg-slate-100">
                <Heart size={20} />
                {wishCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#CC0000] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {wishCount}
                  </span>
                )}
              </button>
              <button onClick={() => { setAuthView('login'); setAuthOpen(true); }} className="relative p-2 text-slate-600 hover:text-[#CC0000] transition-colors rounded-full hover:bg-slate-100">
                <User size={20} />
              </button>
              <motion.button 
                onClick={() => setCartOpen(true)} 
                animate={cartAnim ? { scale: [1, 1.25, 1], rotate: [0, -8, 8, 0] } : {}}
                className="relative p-2 text-slate-600 hover:text-[#CC0000] transition-colors rounded-full hover:bg-slate-100"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#CC0000] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
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
        <section className="relative bg-white border-b border-divider overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-red-50/50 rounded-full blur-[120px]" />
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-slate-50/80 rounded-full blur-[80px]" />
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
                <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full mb-6 border border-slate-200">
                  <Star size={12} className="fill-amber-400 text-amber-400" /> India's Most Trusted Educational Store
                </span>
              </motion.div>

              <motion.h1 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="font-display font-bold text-[48px] leading-[1.1] text-[#111111] tracking-tight mb-4"
              >
                Crack NEET, JEE &amp; Olympiads<br />with <span className="text-[#CC0000]">Confidence</span>
              </motion.h1>

              <motion.p 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="text-slate-500 text-[16px] mb-8"
              >
                50L+ books sold · Expert authors · 40+ years of excellence
              </motion.p>

              <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <button className="bg-[#CC0000] hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-[0_8px_20px_rgba(204,0,0,0.25)] hover:shadow-[0_12px_24px_rgba(204,0,0,0.35)] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2">
                  <BookOpen size={18} /> Explore Books
                </button>
                <button className="bg-transparent border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 font-bold px-6 py-3.5 rounded-xl transition-all flex items-center gap-2">
                  Free Magazines <ArrowRight size={18} />
                </button>
              </motion.div>

              {/* Stats Row */}
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex flex-wrap gap-x-8 gap-y-4 pt-8 border-t border-slate-100"
              >
                {[
                  { end: 50, suffix: 'L+', label: 'Books' },
                  { end: 200, suffix: '+', label: 'Authors' },
                  { end: 40, suffix: '+', label: 'Years' },
                  { end: 5000, suffix: '+', label: 'Products' },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="font-display font-black text-2xl text-[#111111]">
                      <Counter end={s.end} suffix={s.suffix} />
                    </div>
                    <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{s.label}</div>
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
        <section className="bg-[#F9F9F9] py-10 border-b border-divider">
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
                  <div className="w-12 h-12 rounded-full bg-red-100/50 flex items-center justify-center mb-3">
                    <t.icon size={24} className="text-[#CC0000]" />
                  </div>
                  <div className="font-bold text-sm text-[#111111] mb-1">{t.title}</div>
                  <div className="text-xs text-slate-500">{t.desc}</div>
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
                <h2 className="font-display font-bold text-3xl text-[#111111] tracking-tight">Explore by Category</h2>
              </div>
              <a href="#" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#CC0000] hover:text-red-700 transition-colors">
                View All <ArrowRight size={16} />
              </a>
            </div>

            <div className="flex flex-wrap gap-2.5 mb-10">
              {['All', 'NEET', 'JEE', 'Olympiad', 'CBSE', 'NCERT', 'Class 6–10', 'Class 11–12'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-colors ${activeCat === cat ? 'bg-[#CC0000] text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
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

        {/* SHOP BY EXAM */}
        <section className="py-16 bg-[#F9F9F9] border-t border-slate-100">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="font-display font-bold text-3xl text-[#111111] tracking-tight mb-2">Shop by Exam</h2>
              <p className="text-slate-500">Find exactly what you need for your target exam</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { name: 'NEET', color: 'from-blue-500 to-blue-700', icon: Microscope },
                { name: 'JEE', color: 'from-indigo-500 to-indigo-700', icon: Zap },
                { name: 'Olympiad', color: 'from-amber-500 to-amber-600', icon: Award },
                { name: 'CBSE', color: 'from-emerald-500 to-emerald-700', icon: GraduationCap }
              ].map((exam, i) => (
                <motion.div
                  key={exam.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-2xl shadow-md cursor-pointer group"
                >
                  <div className={`absolute inset-0 bg-linear-to-br ${exam.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                  <div className="relative p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                      <exam.icon size={32} className="text-white" />
                    </div>
                    <h3 className="font-bold text-xl text-white mb-1">{exam.name}</h3>
                    <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">Explore</span>
                  </div>
                </motion.div>
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
                className="relative overflow-hidden rounded-4xl bg-[#CC0000] p-8 md:p-12 flex flex-col justify-center min-h-[280px] group cursor-pointer"
              >
                <div className="absolute -right-8 -top-12 text-[180px] font-black text-white/10 leading-none select-none pointer-events-none group-hover:scale-110 transition-transform duration-700">
                  50%
                </div>
                <div className="relative z-10">
                  <h3 className="font-display font-black text-3xl md:text-4xl text-white leading-tight mb-4 max-w-sm">
                    Flat 50% OFF on All Master Workbooks
                  </h3>
                  <button className="bg-white text-[#CC0000] font-bold px-6 py-3 rounded-xl hover:bg-slate-50 hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 w-max">
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

        {/* BESTSELLING BOOKS */}
        <section className="py-16 bg-white border-y border-divider">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="font-display font-bold text-3xl text-[#111111] tracking-tight">Bestselling Books</h2>
              </div>
              <a href="#" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#CC0000] hover:text-red-700 transition-colors">
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
              <h2 className="font-display font-bold text-3xl text-[#111111] tracking-tight mb-2">MTG Magazines — Stay Ahead Every Month</h2>
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
                          <div className="font-display font-black text-2xl text-[#111111]">₹500<span className="text-sm text-slate-400 font-medium">/yr</span></div>
                          <div className="text-xs font-semibold text-slate-500 mt-0.5">₹50/issue</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => toast.custom(t => <CartToast title={mag.name} t={t} />, { duration: 3000 })}
                        className="w-full bg-[#111111] text-white font-bold py-3 rounded-xl hover:bg-[#CC0000] transition-colors flex items-center justify-center gap-2"
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
              <h2 className="font-display font-bold text-3xl text-[#111111] tracking-tight mb-2">Why Choose MTG?</h2>
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
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                    <feature.icon size={24} className="text-[#CC0000]" />
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
              <h2 className="font-display font-bold text-3xl text-[#111111] tracking-tight mb-2">Hear from Our Achievers</h2>
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
                <div className="inline-flex items-center gap-2 bg-white text-[#CC0000] text-xs font-bold px-3 py-1.5 rounded-full mb-6 shadow-sm">
                  <Smartphone size={14} /> Available on iOS & Android
                </div>
                <h2 className="font-display font-black text-3xl md:text-4xl text-[#111111] leading-tight mb-4">
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
                  <div className="w-full h-full bg-[#CC0000] flex flex-col items-center justify-center p-6 text-center text-white relative">
                    <div className="absolute inset-0 bg-black/10" />
                    <h3 className="font-black text-2xl mb-2 relative z-10">MTG App</h3>
                    <p className="text-xs text-white/80 relative z-10">Your study companion</p>
                    <div className="mt-6 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg relative z-10">
                      <span className="font-black text-xl text-[#CC0000]">M</span>
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
                <div className="inline-flex items-center gap-1.5 text-[#CC0000] text-sm font-bold tracking-widest uppercase mb-3">
                  <span className="w-8 h-0.5 bg-[#CC0000] rounded-full" /> Preparation Insights
                </div>
                <h2 className="font-display font-black text-3xl md:text-4xl text-[#111111] tracking-tight">
                  Latest from the Blog
                </h2>
              </div>
              <button className="hidden md:flex bg-transparent border-2 border-slate-200 text-slate-700 hover:border-[#CC0000] hover:text-[#CC0000] font-bold px-6 py-2.5 rounded-xl transition-colors items-center gap-2">
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
                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur text-[#CC0000] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider">
                      {blog.category}
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col grow">
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-4">
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> {blog.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {blog.read}</span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-slate-900 leading-snug mb-3 group-hover:text-[#CC0000] transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 grow">
                      {blog.excerpt}
                    </p>
                    <a href="#" className="inline-flex items-center gap-2 text-[#CC0000] font-bold text-sm hover:gap-3 transition-all mt-auto w-max">
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
              <div className="absolute inset-0 border-4 border-[#CC0000]/20 rounded-4xl m-2 pointer-events-none" />
              <div className="grid lg:grid-cols-2 gap-8 items-center p-8 md:p-12 lg:p-16 relative z-10">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                  <h3 className="font-display font-black text-3xl md:text-4xl text-white leading-tight mb-4">
                    Build a Strong Foundation<br />
                    <span className="text-[#CC0000]">Class 6 to Class 10</span>
                  </h3>
                  <p className="text-white/70 mb-8 max-w-md">
                    MTG Foundation classes for Physics, Chemistry, Maths &amp; Biology. Start your journey towards excellence today.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-[#CC0000] hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">
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
                        <div className="w-12 h-12 rounded-full bg-[#CC0000]/20 flex items-center justify-center">
                          <sub.icon size={24} className="text-[#CC0000]" />
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
              <h2 className="font-display font-black text-3xl text-[#111111] mb-3">Get Free Study Material Every Week</h2>
              <p className="text-slate-600 mb-8">Join 5L+ students getting free PDFs, sample papers &amp; exam tips</p>
              
              <form onSubmit={handleNL} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  required 
                  placeholder="Enter your email address" 
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#CC0000] focus:ring-1 focus:ring-[#CC0000]" 
                />
                <button 
                  disabled={nlStatus !== 'idle'} 
                  className={`bg-[#111111] text-white font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap min-w-[120px] flex items-center justify-center ${nlStatus === 'success' ? 'bg-emerald-600!' : 'hover:bg-slate-800'}`}
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

      </main>

      {/* SECTION 13: FOOTER */}
      <footer className="bg-[#111111] text-white pt-16 pb-8 border-t-4 border-[#CC0000]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            {/* Col 1 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-display font-black text-3xl text-[#CC0000] tracking-tight">MTG</span>
                <span className="text-xs font-semibold text-white/50 uppercase tracking-widest mt-2">Learning Media</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                India's most trusted educational book publisher for NEET, JEE, Olympiad, CBSE, and school books.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-white/5 hover:bg-[#CC0000] rounded-full flex items-center justify-center transition-colors">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="font-bold text-white mb-4">Explore</h4>
              <ul className="space-y-2">
                {['NEET', 'JEE', 'Olympiad', 'CBSE', 'Magazines', 'Online Classes'].map(link => (
                  <li key={link}><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                {['About', 'Careers', 'Press', 'Blog', 'Store Locator'].map(link => (
                  <li key={link}><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="font-bold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                {['Help Center', 'Shipping', 'Returns', 'Bulk Orders', 'Contact'].map(link => (
                  <li key={link}><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-white/40">
              © 2026 MTG Learning Media Pvt. Ltd. | <a href="#" className="hover:text-white">Privacy Policy</a> · <a href="#" className="hover:text-white">Terms</a> · <a href="#" className="hover:text-white">Sitemap</a>
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
