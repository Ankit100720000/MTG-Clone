import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ShoppingCart, X, Package, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { formatPrice } from '../data';

interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  qty: number;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartDrawer = ({ open, onClose, items, setItems }: CartDrawerProps) => {
  const tot = items.reduce((a, b) => a + b.price * b.qty, 0);
  const itemCount = items.reduce((a, b) => a + b.qty, 0);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-200">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark/60 backdrop-blur-md"
          />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="font-display font-bold text-xl flex items-center gap-2.5 text-dark">
                  <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                    <ShoppingCart size={16} className="text-primary" />
                  </div>
                  Your Cart
                </h2>
                {itemCount > 0 && (
                  <p className="text-[11px] font-semibold text-slate-400 mt-1 ml-[42px]">{itemCount} item{itemCount > 1 ? 's' : ''}</p>
                )}
              </div>
              <button onClick={onClose} className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto p-5 pb-20">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                    <Package size={40} className="text-slate-300" />
                  </div>
                  <p className="font-display font-bold text-lg text-slate-600 mb-1">Your cart is empty</p>
                  <p className="text-sm text-slate-400">Add some books to get started!</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {items.map(it => (
                    <motion.div 
                      key={it.id} 
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 60 }}
                      className="flex gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 relative group hover:border-slate-200 transition-colors"
                    >
                      <div className="w-16 h-20 rounded-xl overflow-hidden border border-slate-100 bg-white flex items-center justify-center p-1 shrink-0">
                        <img src={it.image} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div className="flex justify-between gap-2">
                          <p className="text-sm font-semibold text-slate-800 leading-tight line-clamp-2">{it.title}</p>
                          <button
                            onClick={() => setItems(prev => prev.filter(p => p.id !== it.id))}
                            className="shrink-0 text-slate-300 hover:text-primary transition-colors p-1"
                          >
                            <Trash2 size={14}/>
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2.5">
                          <p className="font-display font-black text-dark">{formatPrice(it.price)}</p>
                          <div className="flex items-center gap-0 bg-white border border-slate-200 rounded-xl overflow-hidden">
                            <button
                              onClick={() => setItems(prev => prev.map(p => p.id === it.id ? { ...p, qty: Math.max(1, p.qty - 1) } : p))}
                              className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-primary hover:bg-red-50 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-bold w-6 text-center text-slate-800">{it.qty}</span>
                            <button
                              onClick={() => setItems(prev => prev.map(p => p.id === it.id ? { ...p, qty: p.qty + 1 } : p))}
                              className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-green-600 hover:bg-green-50 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-slate-100 bg-white">
                <div className="flex justify-between font-display font-bold text-lg mb-1.5 text-dark">
                  <span>Total</span>
                  <span>{formatPrice(tot)}</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-4">Shipping calculated at checkout</p>
                <button className="btn-primary w-full py-3.5 text-sm justify-center">
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
