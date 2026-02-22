"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { useState } from "react";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg bg-zinc-900/90 border-t sm:border border-white/10 p-8 rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl backdrop-blur-md"
          >
            {!isSuccess ? (
              <>
                <div className="w-12 h-1.5 bg-zinc-700 rounded-full mx-auto mb-8 sm:hidden" />
                <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">
                  Kursga yozilish
                </h2>
                <p className="text-zinc-400 mb-8">
                  Ma'lumotlaringizni qoldiring, adminlarimiz tez orada
                  bog'lanishadi.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <input
                      required
                      type="text"
                      placeholder="Ism Familiya"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 outline-none transition-all placeholder:text-zinc-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <input
                      required
                      type="tel"
                      placeholder="+998"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 outline-none transition-all placeholder:text-zinc-600"
                    />
                  </div>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-2xl text-lg transition-all active:scale-[0.98] shadow-lg shadow-red-600/20">
                    Ro'yxatdan o'tish
                  </button>
                </form>
              </>
            ) : (
              <div className="py-12 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-red-600/40"
                >
                  <CheckCircle2 size={50} className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white text-center">
                  Muvaffaqiyatli!
                </h3>
                <p className="text-zinc-400 text-center mt-2">
                  Tez orada sizga aloqaga chiqamiz.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
