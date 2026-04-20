import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingCart } from 'lucide-react';
import gsap from 'gsap';
import { ALL_BOOKS, discount, formatPrice, badgeClass } from '../data';
import Stars from './Stars';

interface BookCardProps {
  book: typeof ALL_BOOKS[number];
  onAdd: (b: typeof ALL_BOOKS[number]) => void;
}

const BookCard = ({ book, onAdd }: BookCardProps) => {
  const [wished, setWished] = useState(false);
  const disc = book.oldPrice ? discount(book.price, book.oldPrice) : null;
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      className="card flex flex-col h-full group cursor-pointer"
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
          <Heart size={14} className={wished ? 'fill-indigo-500 text-indigo-500' : 'text-slate-400'} />
        </button>

        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover hover-zoom group-hover:scale-110"
          loading="lazy"
        />

        {/* Quick add overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent
                        translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={e => { e.stopPropagation(); onAdd(book); }}
            className="w-full bg-white text-red-600 font-bold text-[11px] py-2 rounded-xl flex items-center justify-center gap-1.5 hover:bg-red-600 hover:text-white transition-colors"
          >
            <ShoppingCart size={12} /> Add to Cart
          </motion.button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[9px] font-bold text-primary uppercase tracking-wider mb-0.5">{book.subtitle}</p>
        <h4 className="text-[13px] font-semibold text-on-surface line-clamp-2 mb-1.5 leading-snug group-hover:text-primary transition-colors">
          {book.title}
        </h4>
        <div className="flex items-center gap-1 mb-2">
          <Stars rating={book.rating} />
          <span className="text-[9px] text-on-surface-dim">({book.reviews.toLocaleString('en-IN')})</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-bold text-base text-on-surface">{formatPrice(book.price)}</span>
            {book.oldPrice && <span className="text-[11px] text-on-surface-faint line-through">{formatPrice(book.oldPrice)}</span>}
          </div>
          <button
            onClick={e => { e.stopPropagation(); onAdd(book); }}
            className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-600 border border-red-100 hover:border-red-600
                       flex items-center justify-center transition-all duration-200 group/btn"
            aria-label="Add to cart"
          >
            <ShoppingCart size={13} className="text-red-600 group-hover/btn:text-white transition-colors" />
          </button>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {book.tags.map(tag => (
            <span key={tag} className="text-[8px] font-medium bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
