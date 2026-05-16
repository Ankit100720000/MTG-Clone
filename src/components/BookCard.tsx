import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
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
      className="group relative bg-white border border-slate-100 rounded-3xl overflow-hidden 
                 hover:border-primary/20 hover:shadow-[0_20px_40px_-12px_rgba(229,45,39,0.12)] 
                 transition-all duration-500 flex flex-col cursor-pointer"
    >
      {/* Image container */}
      <div className="relative aspect-4/5 overflow-hidden bg-linear-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-5 border-b border-slate-50">
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="text-[8px] font-extrabold uppercase tracking-[0.15em] bg-dark text-white px-2.5 py-1.5 rounded-lg shadow-sm">
            {book.category}
          </span>
          {disc && (
            <span className="text-[9px] font-bold px-2 py-1 rounded-lg bg-green-50 text-green-700 w-max border border-green-100">
              {disc}% OFF
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={e => { e.stopPropagation(); setWished(w => !w); }}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-red-50 border border-white/50"
          aria-label="Wishlist"
        >
          <Heart size={14} className={wished ? 'fill-primary text-primary' : 'text-slate-400'} />
        </button>

        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Quick actions overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/70 via-black/40 to-transparent
                        translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={e => { e.stopPropagation(); onAdd(book); }}
              className="flex-1 bg-white text-primary font-bold text-[11px] py-2.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-primary hover:text-white transition-colors shadow-lg"
            >
              <ShoppingCart size={12} /> Add to Cart
            </motion.button>
            <button className="w-10 bg-white/20 backdrop-blur-sm text-white rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors border border-white/10">
              <Eye size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 bg-white">
        <h4 className="text-[13px] font-bold text-slate-800 line-clamp-2 mb-2.5 leading-snug group-hover:text-primary transition-colors">
          {book.title}
        </h4>
        <div className="flex items-center gap-1.5 mb-3">
          <Stars rating={book.rating} />
          <span className="text-[10px] font-semibold text-slate-400">({book.reviews.toLocaleString('en-IN')})</span>
        </div>
        <div className="mt-auto flex items-end justify-between">
          <div>
            <span className="font-display font-black text-lg text-dark">{formatPrice(book.price)}</span>
            {book.oldPrice && <span className="text-xs font-medium text-slate-400 line-through ml-2">{formatPrice(book.oldPrice)}</span>}
          </div>
          {disc && (
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
              Save ₹{(book.oldPrice! - book.price).toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
