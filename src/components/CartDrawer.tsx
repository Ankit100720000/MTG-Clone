import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ShoppingCart, X, Package } from 'lucide-react';
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

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200]">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-divider bg-surface-low">
              <h2 className="font-display font-bold text-xl flex items-center gap-2 text-slate-800"><ShoppingCart size={20}/> Your Cart</h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 pb-20 bg-slate-50">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <Package size={64} className="mb-4 text-slate-300" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map(it => (
                    <div key={it.id} className="flex gap-4 p-3 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
                      <img src={it.image} className="w-16 h-20 object-cover rounded-xl border border-slate-100" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between gap-2 pr-6">
                          <p className="text-sm font-semibold text-slate-800 leading-tight line-clamp-2">{it.title}</p>
                          <button
                            onClick={() => setItems(prev => prev.filter(p => p.id !== it.id))}
                            className="absolute top-3 right-3 text-slate-400 hover:text-indigo-500"
                          >
                            <X size={16}/>
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="font-bold text-slate-800">{formatPrice(it.price)}</p>
                          <div className="flex items-center gap-3 bg-slate-100 rounded-lg px-2 py-1">
                            <button
                              onClick={() => setItems(prev => prev.map(p => p.id === it.id ? { ...p, qty: Math.max(1, p.qty - 1) } : p))}
                              className="text-slate-500 hover:text-red-600"
                            >-</button>
                            <span className="text-xs font-bold w-3 text-center text-slate-700">{it.qty}</span>
                            <button
                              onClick={() => setItems(prev => prev.map(p => p.id === it.id ? { ...p, qty: p.qty + 1 } : p))}
                              className="text-slate-500 hover:text-green-600"
                            >+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-5 border-t border-slate-200 bg-white">
                <div className="flex justify-between font-bold text-lg mb-4 text-slate-800">
                  <span>Total Amount</span>
                  <span>{formatPrice(tot)}</span>
                </div>
                <button className="btn-primary w-full py-3 text-sm">Proceed to Checkout</button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
