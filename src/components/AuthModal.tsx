import { AnimatePresence, motion } from 'motion/react';
import { User, X } from 'lucide-react';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  view: 'login' | 'signup' | 'otp';
  setView: (v: 'login' | 'signup' | 'otp') => void;
}

const AuthModal = ({ open, onClose, view, setView }: AuthModalProps) => (
  <AnimatePresence>
    {open && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden border border-white/50"
        >
          <div className="h-2 bg-gradient-to-r from-indigo-500 to-amber-500" />
          <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:bg-slate-100 p-1.5 rounded-full"><X size={18}/></button>

          <div className="p-8">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 border border-indigo-100">
              <User size={24} />
            </div>

            <h2 className="text-2xl font-display font-bold text-slate-900 mb-1">
              {view === 'login' ? 'Welcome Back' : view === 'signup' ? 'Create Account' : 'Enter OTP'}
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              {view === 'login' ? 'Sign in to access your library and orders.' : view === 'signup' ? 'Join MTG to get the best study material.' : 'We sent a 4-digit code to your phone/email.'}
            </p>

            {view === 'login' && (
              <div className="flex flex-col gap-4">
                <input type="text" placeholder="Email or Mobile Number" className="input-field bg-slate-50 border-slate-200 focus:bg-white text-slate-900" />
                <button onClick={() => setView('otp')} className="btn-primary w-full py-2.5">Send OTP</button>
                <div className="text-center mt-2">
                  <span className="text-xs text-slate-500">New here? </span>
                  <button onClick={() => setView('signup')} className="text-xs font-bold text-red-600 hover:underline">Sign up</button>
                </div>
              </div>
            )}

            {view === 'signup' && (
              <div className="flex flex-col gap-3">
                <input type="text" placeholder="Full Name" className="input-field bg-slate-50 border-slate-200 focus:bg-white text-slate-900" />
                <input type="text" placeholder="Email or Mobile" className="input-field bg-slate-50 border-slate-200 focus:bg-white text-slate-900" />
                <button onClick={() => setView('otp')} className="btn-primary w-full py-2.5 mt-2">Get OTP</button>
                <div className="text-center mt-3">
                  <span className="text-xs text-slate-500">Already a member? </span>
                  <button onClick={() => setView('login')} className="text-xs font-bold text-red-600 hover:underline">Sign in</button>
                </div>
              </div>
            )}

            {view === 'otp' && (
              <div className="flex flex-col gap-4">
                <div className="flex justify-center gap-3">
                  {[1,2,3,4].map(i => (
                    <input key={i} type="text" maxLength={1}
                      className="w-12 h-14 text-center text-xl font-bold text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all bg-slate-50 focus:bg-white"
                    />
                  ))}
                </div>
                <button onClick={onClose} className="btn-primary w-full py-2.5 mt-2">Verify &amp; Login</button>
                <button onClick={() => setView('login')} className="text-xs text-slate-500 hover:text-red-600 text-center">Resend OTP</button>
              </div>
            )}

            {view !== 'otp' && (
              <>
                <div className="flex items-center gap-3 my-6">
                  <div className="h-px bg-slate-200 flex-1"/>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">OR</span>
                  <div className="h-px bg-slate-200 flex-1"/>
                </div>
                <button className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-4 h-4" />
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
