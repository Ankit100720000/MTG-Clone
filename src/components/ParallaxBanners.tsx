import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROMO_BANNERS } from '../data';

gsap.registerPlugin(ScrollTrigger);

const ParallaxBanners = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.promo-card-wrapper');
      cards.forEach((card, i) => {
        gsap.to(card, {
          scale: 0.9 - (cards.length - i) * 0.015,
          opacity: 0.3,
          scrollTrigger: {
            trigger: card,
            start: 'top top+=25%',
            endTrigger: '.promo-container',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-zinc-50 py-12 relative z-10 promo-container">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-100 via-zinc-50 to-white pointer-events-none z-0" />
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 mb-12 sticky top-[130px] z-30 pointer-events-none">
        <h2 className="font-display text-4xl md:text-5xl lg:text-4xl font-black text-slate-900 text-center drop-shadow-md">
          Upcoming Features <span className="text-red-600">&amp; </span>Promos
        </h2>
      </div>

      <div className="max-w-[95%] mx-auto px-1 sm:px-6 relative z-10 flex flex-col pb-32" style={{ gap: '25vh' }}>
        {PROMO_BANNERS.slice(0, 4).map((banner, i) => (
          <div
            key={i}
            className="promo-card-wrapper sticky w-full h-[65vh] min-h-[400px]"
            style={{ top: `calc(28vh + ${i * 12}px)`, zIndex: i }}
          >
            <a href={banner.link} target="_blank" rel="noreferrer"
               className="block w-full h-full rounded-[32px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] relative border border-black/5 hover:border-indigo-500/50 transition-all duration-300 group bg-white"
               style={{ transformOrigin: 'top center' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
              <img src={banner.img} alt="Promo Banner" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ParallaxBanners;
