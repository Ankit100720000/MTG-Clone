import { AnimatePresence, motion } from 'motion/react';
import { User, X, Mail, Phone, ArrowRight, Shield } from 'lucide-react';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  view: 'login' | 'signup' | 'otp';
  setView: (v: 'login' | 'signup' | 'otp') => void;
}

const AuthModal = ({ open, onClose, view, setView }: AuthModalProps) => (
  <AnimatePresence>
    {open && (
      <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="absolute inset-0 bg-dark/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] w-full max-w-md relative z-10 overflow-hidden"
        >
          {/* Top gradient accent */}
          <div className="h-1.5 bg-linear-to-r from-primary via-rose to-[#FF6B6B]" />
          
          <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:bg-slate-100 p-2 rounded-xl transition-colors">
            <X size={18}/>
          </button>

          <div className="p-8 pt-7">
            {/* Icon */}
            <div className="w-14 h-14 bg-linear-to-br from-primary/10 to-rose/10 text-primary rounded-2xl flex items-center justify-center mb-6 border border-primary/10">
              <User size={26} />
            </div>

            <h2 className="text-2xl font-display font-bold text-dark mb-1">
              {view === 'login' ? 'Welcome Back' : view === 'signup' ? 'Create Account' : 'Verify OTP'}
            </h2>
            <p className="text-sm text-slate-500 mb-7">
              {view === 'login' ? 'Sign in to access your library and orders.' : view === 'signup' ? 'Join MTG to get the best study material.' : 'We sent a 4-digit code to your phone/email.'}
            </p>

            {view === 'login' && (
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Email or Mobile Number" className="input-field pl-11 bg-slate-50 border-slate-200 focus:bg-white text-slate-900" />
                </div>
                <button onClick={() => setView('otp')} className="btn-primary w-full py-3 justify-center">
                  Send OTP <ArrowRight size={16} />
                </button>
                <div className="text-center mt-1">
                  <span className="text-xs text-slate-500">New here? </span>
                  <button onClick={() => setView('signup')} className="text-xs font-bold text-primary hover:underline">Sign up</button>
                </div>
              </div>
            )}

            {view === 'signup' && (
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Full Name" className="input-field pl-11 bg-slate-50 border-slate-200 focus:bg-white text-slate-900" />
                </div>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Email or Mobile" className="input-field pl-11 bg-slate-50 border-slate-200 focus:bg-white text-slate-900" />
                </div>
                <button onClick={() => setView('otp')} className="btn-primary w-full py-3 mt-1 justify-center">
                  Get OTP <ArrowRight size={16} />
                </button>
                <div className="text-center mt-2">
                  <span className="text-xs text-slate-500">Already a member? </span>
                  <button onClick={() => setView('login')} className="text-xs font-bold text-primary hover:underline">Sign in</button>
                </div>
              </div>
            )}

            {view === 'otp' && (
              <div className="flex flex-col gap-5">
                <div className="flex justify-center gap-3">
                  {[1,2,3,4].map(i => (
                    <input key={i} type="text" maxLength={1}
                      className="w-14 h-16 text-center text-2xl font-bold text-dark rounded-2xl border-2 border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-slate-50 focus:bg-white"
                    />
                  ))}
                </div>
                <button onClick={onClose} className="btn-primary w-full py-3 justify-center">
                  <Shield size={16} />
                  Verify & Login
                </button>
                <button onClick={() => setView('login')} className="text-xs text-slate-500 hover:text-primary text-center transition-colors">
                  Didn't receive? Resend OTP
                </button>
              </div>
            )}

            {view !== 'otp' && (
              <>
                <div className="flex items-center gap-3 my-7">
                  <div className="h-px bg-slate-200 flex-1"/>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">OR</span>
                  <div className="h-px bg-slate-200 flex-1"/>
                </div>
                <button className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-4.5 h-4.5" />
                  Continue with Google
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default AuthModal;
