import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import {
  Search, ShoppingCart, User, Heart, Menu,
  ShieldCheck, CreditCard, RefreshCcw, BookOpen,
  GraduationCap, Microscope, Calculator, Award, ArrowRight,
  Star, Flame, Headphones, Truck,
  TrendingUp, BookMarked, Phone, Mail,
  Facebook, Twitter, Instagram, Youtube, Zap, Moon, Sun
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

  // Navbar slide-in on mount
  useLayoutEffect(() => {
    if (!headerRef.current) return;
    gsap.from(headerRef.current, { y: -80, opacity: 0, duration: 0.7, ease: 'power3.out', clearProps: 'all' });
  }, []);

  // Hero GSAP timeline
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

  // Trust bar stagger
  useEffect(() => {
    if (!trustRef.current) return;
    gsap.from(trustRef.current.querySelectorAll('.trust-card'), {
      scrollTrigger: { trigger: trustRef.current, start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.55, stagger: 0.12, ease: 'power3.out', clearProps: 'all',
    });
  }, []);

  // Stats stagger
  useEffect(() => {
    if (!statsRef.current) return;
    gsap.from(statsRef.current.querySelectorAll('.stat-item'), {
      scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
      y: 50, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(1.4)', clearProps: 'all',
    });
  }, []);

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
      <header ref={headerRef} className={`sticky top-0 z-50 transition-all duration-300
        ${scrolled ? 'shadow-[0_10px_30px_rgba(0,0,0,0.05)] bg-white/70 backdrop-blur-2xl' : 'border-b border-divider bg-white/95 backdrop-blur-lg'}`}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-4 py-3.5 flex items-center gap-4 md:gap-6">

          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="md:hidden p-1.5 rounded-lg hover:bg-surface-low text-on-surface-dim"
              onClick={() => setMobileMenu(m => !m)}>
              <Menu size={20} />
            </button>
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <img src="https://mtgpublicwp.mtg.in/wp-content/uploads/2021/02/mtg-logo1.png" alt="Logo" />
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="font-display font-bold text-lg text-on-surface tracking-tight leading-none">MTG Learning</div>
                <div className="text-[9px] text-on-surface-dim font-medium tracking-wider uppercase">mtg.in</div>
              </div>
            </a>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl hidden md:flex items-center relative z-50">
            <div className="relative w-full">
              <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-faint" />
              <input
                type="text"
                value={searchVal}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setTimeout(() => setSearchFocus(false), 200)}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Search books, magazines, exams..."
                className="input-field pl-26 pr-28"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 btn-primary !px-4 !py-2 !text-xs !rounded-lg !shadow-none">
                Search
              </button>

              <AnimatePresence>
                {searchFocus && searchVal.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                    className="absolute top-12 left-0 right-0 bg-white border border-divider shadow-2xl rounded-2xl overflow-hidden z-[100]"
                  >
                    {filteredBooks.slice(0, 5).map(b => (
                      <div key={b.id} className="flex flex-row items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-b border-divider last:border-0"
                           onClick={() => { setSearchVal(b.title); setSearchFocus(false); }}>
                        <img src={b.image} className="w-10 h-14 object-cover rounded-md border border-slate-100" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800 truncate">{b.title}</p>
                          <p className="text-xs text-slate-500 font-medium">{b.category}</p>
                        </div>
                      </div>
                    ))}
                    {filteredBooks.length === 0 && <div className="p-4 text-center text-sm text-slate-500">No results found for "{searchVal}"</div>}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-auto">
            <button className="hidden md:flex flex-col items-center p-2 text-on-surface-dim hover:text-primary transition-colors rounded-xl hover:bg-surface-low text-xs gap-0.5">
              <Phone size={18} />
            </button>
            <button className="relative p-2 text-on-surface-dim hover:text-primary transition-colors rounded-xl hover:bg-surface-low">
              <Heart size={20} />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setDarkMode(d => !d)}
              className="p-2 text-on-surface-dim hover:text-primary transition-colors rounded-xl hover:bg-surface-low"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => { setAuthView('login'); setAuthOpen(true); }}
              className="flex items-center gap-1.5 p-2 text-on-surface-dim hover:text-primary transition-colors rounded-xl hover:bg-surface-low"
            >
              <User size={20} />
              <span className="hidden lg:flex flex-col items-start text-xs leading-tight">
                <span className="font-semibold text-on-surface text-xs">Sign In</span>
              </span>
            </button>
            <motion.button
              onClick={() => setCartOpen(true)}
              animate={cartAnim ? { scale: [1, 1.25, 1], rotate: [0, -8, 8, 0] } : {}}
              className="relative flex items-center gap-2 bg-red-600 hover:bg-indigo-700 text-white pl-3 pr-4 py-2.5 rounded-xl transition-colors shadow-md ml-1"
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
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-4 flex items-center gap-1 py-1.5 overflow-x-auto scrollbar-hide">
            {NAV_LINKS.map(link => (
              <a key={link} href="#"
                className="text-sm text-slate-700 font-bold px-3 py-2 rounded-lg whitespace-nowrap hover:text-red-600 hover:bg-white/60 transition-all">
                {link}
              </a>
            ))}
            <a href="#" className="ml-auto flex items-center gap-1.5 text-sm font-bold text-red-600 px-4 py-2 rounded-xl bg-indigo-100/50 hover:bg-indigo-200/60 transition-colors whitespace-nowrap">
              <Flame size={14} /> Deals &amp; Offers
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

        {/* HERO */}
        <section ref={heroRef} className="relative bg-white border-b border-divider overflow-hidden">
          {/* Subtle premium mesh background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-red-100/30 rounded-full blur-[100px]" />
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3 }} />
          </div>
          
          <div className="relative z-10  mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left */}
            <div>
              <div>
                <span ref={heroBadge} className="inline-flex items-center gap-2 bg-red-50 text-indigo-700 border border-indigo-200 text-[11px] font-bold uppercase tracking-widest px-2 py-1 rounded-full mb-6">
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
                Study materials for NEET, JEE, CBSE &amp; Olympiads. 5000+ titles, 50 lakh+ students served, 40+ years of excellence.
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
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-white flex items-center justify-center text-white text-[11px] font-bold">
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

            {/* Right — Modern Bento Grid Showcase */}
            <div ref={heroImgWrap} className="hidden lg:flex items-center justify-center relative w-full pt-4 md:pt-0 pb-6 md:pb-0">
              <HeroBento />
            </div>
          </div>
        </section>



        {/* STATS */}
        <section className="bg-surface-low border-b border-divider py-4">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-4">
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { end: 50,   suffix: 'L+', label: 'Students Served' },
                { end: 200,  suffix: '+',  label: 'Expert Authors' },
                { end: 40,   suffix: '+',  label: 'Years of Legacy' },
                { end: 5000, suffix: '+',  label: 'Books Published' },
              ].map((s, i) => (
                <div key={i} className="stat-item relative">
                  {i < 3 && <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-divider" />}
                  <Counter {...s} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="bg-white border-b border-divider py-8">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-4">
            <div ref={trustRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Truck,       title: 'Free Delivery',   desc: 'On orders above ₹499',     color: 'text-blue-600 bg-blue-50 border-blue-100' },
                { icon: ShieldCheck, title: 'Secure Payments', desc: 'UPI, Cards, Net Banking',  color: 'text-green-600 bg-green-50 border-green-100' },
                { icon: RefreshCcw,  title: 'Easy Returns',    desc: '15-day hassle-free policy', color: 'text-amber-600 bg-amber-50 border-amber-100' },
                { icon: Headphones,  title: '24/7 Support',    desc: 'Always here to help you',  color: 'text-purple-600 bg-purple-50 border-purple-100' },
              ].map((t, i) => (
                <motion.div key={i} whileHover={{ y: -3 }}
                  className="trust-card flex items-center gap-4 p-4 rounded-2xl border border-divider hover:border-indigo-200 hover:shadow-md transition-all"
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

        {/* CATEGORIES + PRODUCT GRID */}
        <section className="py-14 bg-surface-low">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-4">
            <SectionHead
              eyebrow="Browse Collection"
              title="Explore by Category"
              sub="Find the perfect study material for every exam and class."
              cta={
                <a href="#" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 border border-red-600 rounded-full px-3 py-1 hover:bg-red-600 hover:text-white transition-all">
                  All Products <ArrowRight size={15} />
                </a>
              }
            />

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

            <AnimatePresence mode="wait">
              <motion.div key={activeCat + searchVal}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4"
              >
                {filteredBooks.length > 0 ? filteredBooks.slice(0, 14).map((book, i) => (
                  <motion.div key={book.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
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

        {/* PROMO BENTO */}
        <section className="py-16 bg-white overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              
              {/* BIG DEAL card */}
              <motion.div whileHover={{ scale: 1.015 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="md:col-span-2 relative overflow-hidden rounded-[2.5rem] cursor-pointer group"
                style={{ background: 'linear-gradient(135deg, #fff5f5 0%, #fee2e2 60%, #fecaca 100%)' }}
              >
                {/* Animated blobs */}
                <div className="absolute -right-12 -top-12 w-56 h-56 bg-red-300/40 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
                <div className="absolute -left-6 -bottom-6 w-40 h-40 bg-orange-200/50 rounded-full blur-2xl pointer-events-none" />
                
                <div className="relative z-10 p-8 md:p-10 lg:p-12 flex flex-col h-full justify-between">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 shadow-sm">
                        <Flame size={12} /> Limited Time Sale
                      </span>
                      <div className="font-display font-black text-slate-900 leading-tight">
                        <div className="text-4xl md:text-5xl lg:text-6xl tracking-tight">Flat <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-500">50%</span> OFF</div>
                        <div className="text-xl lg:text-2xl text-slate-700 font-bold mt-2">on All Master Workbooks</div>
                      </div>
                    </div>
                    <div className="relative flex-shrink-0 hidden sm:block">
                      <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-rose-600 rounded-[1.5rem] flex flex-col items-center justify-center text-white shadow-[0_12px_32px_rgba(224,32,32,0.4)] rotate-6 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500">
                        <span className="font-display font-black text-3xl leading-none">50%</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-90 mt-0.5">Sale</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-8 max-w-sm font-medium">
                      Practice makes perfect. Grab comprehensive workbooks at unbeatable prices — valid this week only!
                    </p>
                    <button className="bg-slate-900 text-white font-bold text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 hover:shadow-lg transition-all hover:scale-105 active:scale-95 w-max">
                      Shop the Sale <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Right column small cards */}
              <div className="flex flex-col gap-5 lg:gap-6">
                {/* NEET card */}
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex-1 relative overflow-hidden rounded-[2.5rem] cursor-pointer group p-6 lg:p-8 flex flex-col justify-center"
                  style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)' }}
                >
                  <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl group-hover:bg-blue-400/30 transition-colors pointer-events-none" />
                  <Microscope size={56} className="text-blue-500/15 absolute right-6 bottom-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
                  
                  <div className="relative z-10">
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 tracking-widest bg-blue-100/80 px-2.5 py-1 rounded-md">NEET 2026</span>
                    <h3 className="font-display text-xl font-bold text-slate-800 mt-4 mb-2 leading-tight group-hover:text-blue-700 transition-colors tracking-tight">
                      Complete PCB<br/>Combo Packs
                    </h3>
                    <p className="text-slate-500 text-xs mb-5 font-medium">Physics + Chemistry + Biology. Save 25% today!</p>
                    <button className="inline-flex items-center gap-1.5 text-blue-600 font-bold text-xs hover:gap-2.5 transition-all">
                      View Combos <ArrowRight size={13} />
                    </button>
                  </div>
                </motion.div>

                {/* Olympiad card */}
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex-1 relative overflow-hidden rounded-[2.5rem] cursor-pointer group p-6 lg:p-8 flex flex-col justify-center"
                  style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' }}
                >
                  <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl group-hover:bg-amber-400/30 transition-colors pointer-events-none" />
                  <Award size={56} className="text-amber-500/15 absolute right-6 bottom-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
                  
                  <div className="relative z-10">
                    <span className="text-[10px] font-extrabold uppercase text-amber-700 tracking-widest bg-amber-200/50 px-2.5 py-1 rounded-md">Olympiads</span>
                    <h3 className="font-display text-xl font-bold text-slate-800 mt-4 mb-2 leading-tight group-hover:text-amber-700 transition-colors tracking-tight">
                      IMO / NSO / IEO<br/>Prep Kits
                    </h3>
                    <p className="text-slate-500 text-xs mb-5 font-medium">Class 1–12. Start your Olympiad journey.</p>
                    <button className="inline-flex items-center gap-1.5 text-amber-600 font-bold text-xs hover:gap-2.5 transition-all">
                      Explore Kits <ArrowRight size={13} />
                    </button>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* NEW RELEASES */}
        <section className="py-16 bg-surface-low border-y border-divider">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-4">
            <SectionHead eyebrow="Just Arrived" title="New Releases" sub="Latest editions updated for the 2026 examination syllabus." />
            <ProductSlider items={ALL_BOOKS.slice(0, 8)} onAdd={handleAdd} />
          </div>
        </section>

        {/* BESTSELLERS */}
        <section className="py-16 bg-white">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-4">
            <SectionHead
              eyebrow="Top Charts"
              title="Bestselling Books"
              sub="Most-loved study materials by students across India."
              cta={
                <a href="#" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-indigo-700">
                  View All <ArrowRight size={15} />
                </a>
              }
            />
            <ProductSlider items={[...ALL_BOOKS].sort((a, b) => b.reviews - a.reviews)} onAdd={handleAdd} />
          </div>
        </section>

        {/* MAGAZINES */}
        <section className="py-16 bg-surface-low border-t border-divider">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-4">
            <SectionHead
              eyebrow="Monthly"
              title="MTG Magazines"
              sub="Stay ahead with exam updates, practice problems, and expert tips every month."
              cta={
                <button className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-indigo-700">
                  Subscribe Now <ArrowRight size={15} />
                </button>
              }
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {MAGAZINES.map((mag, i) => (
                <div key={mag.id}>
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOUNDATION COURSES BANNER */}
        <Reveal>
          <section className="py-16 bg-white">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-4">
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
                      <span className="text-indigo-400">Class 6 to Class 10</span>
                    </h3>
                    <p className="text-white/60 mb-6 leading-relaxed">
                      MTG Foundation Course books for Physics, Chemistry, Mathematics &amp; Biology — designed to build strong concepts from the ground up for future JEE &amp; NEET aspirants.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="btn-primary !bg-red-600 hover:!bg-indigo-700">
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

        {/* ONLINE CLASSES */}
        <Reveal>
          <section className="py-12 bg-surface-low border-y border-divider">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-divider rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-red-50 rounded-2xl border border-indigo-100 flex items-center justify-center flex-shrink-0">
                    <TrendingUp size={28} className="text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xl text-on-surface">Olympiad Online Classes</h4>
                    <p className="text-on-surface-dim text-sm mt-1">Live &amp; Recorded classes by expert faculty for IMO, NSO, IEO &amp; ICSO.</p>
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

        {/* TESTIMONIALS */}
        <section className="py-16 bg-white border-b border-divider">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-4">
            <SectionHead
              eyebrow="Student Success"
              title="Hear from Achievers"
              sub="Join thousands of top scorers who trust MTG for their preparation."
            />
            <Reveal>
              <TestimonialSlider items={TESTIMONIALS} />
            </Reveal>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-4">

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
                <p className="text-white/50 text-sm mb-4">Subscribe for new releases, exam tips &amp; exclusive offers.</p>
                <form onSubmit={handleNL} className="flex gap-2">
                  <input type="email" required placeholder="Enter your email" className="input-field !bg-white/10 !border-white/20 !text-white placeholder:!text-white/30 focus:!border-indigo-500" />
                  <motion.button disabled={nlStatus !== 'idle'} whileTap={{ scale: 0.96 }}
                    className={`btn-primary !whitespace-nowrap flex-shrink-0 !shadow-none ${nlStatus === 'success' ? '!bg-green-500' : ''}`}
                  >
                    {nlStatus === 'idle'    && 'Subscribe'}
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
              { title: 'Explore',   links: ['NEET Books', 'JEE Books', 'Olympiad Books', 'CBSE Books', 'Foundation Courses', 'NCERT Solutions'] },
              { title: 'Magazines', links: ['Physics For You', 'Chemistry Today', 'Mathematics Today', 'Biology Today', 'Subscribe', 'Back Issues'] },
              { title: 'Company',   links: ['About MTG', 'Our Seminars', 'Careers (Hiring!)', 'Press & Media', 'Bulk Inquiries', 'Dealer Network'] },
              { title: 'Policy',    links: ['Terms of Use', 'Privacy Policy', 'Return Policy', 'Shipping Policy', 'Cookie Policy'] },
              { title: 'Help',      links: ['Track Order', 'FAQs', 'Contact Us', 'Call Us', 'Email Support', 'Download App'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-bold text-sm text-white mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm text-white/40 hover:text-indigo-400 transition-colors">{link}</a>
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
