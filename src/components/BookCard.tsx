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
      className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#CC0000] hover:shadow-[0_12px_24px_rgba(204,0,0,0.1)] transition-all duration-300 flex flex-col cursor-pointer hover:scale-[1.02]"
    >
      {/* Image container */}
      <div className="relative aspect-4/5 overflow-hidden bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6 border-b border-slate-100">
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="text-[9px] font-extrabold uppercase tracking-widest bg-[#CC0000] text-white px-2.5 py-1 rounded-full shadow-sm">
            {book.category}
          </span>
          {disc && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 w-max mt-1">
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
          className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quick add overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-linear-to-t from-black/60 to-transparent
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
      <div className="p-4 flex flex-col flex-1 bg-white">
        <h4 className="text-sm font-bold text-slate-800 line-clamp-2 mb-2 leading-snug group-hover:text-[#CC0000] transition-colors">
          {book.title}
        </h4>
        <div className="flex items-center gap-1.5 mb-3">
          <Stars rating={book.rating} />
          <span className="text-[10px] font-semibold text-slate-500">({book.reviews.toLocaleString('en-IN')} reviews)</span>
        </div>
        <div className="mt-auto flex items-end justify-between">
          <div>
            <span className="font-display font-black text-lg text-[#111111]">{formatPrice(book.price)}</span>
            {book.oldPrice && <span className="text-xs font-semibold text-slate-400 line-through ml-2">{formatPrice(book.oldPrice)}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
