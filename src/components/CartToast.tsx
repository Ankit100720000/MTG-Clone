import { Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface CartToastProps {
  title: string;
  t: any;
}

const CartToast = ({ title, t }: CartToastProps) => (
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

export default CartToast;
