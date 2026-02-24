"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { useState } from "react";
import { PatternFormat } from "react-number-format";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState(""); // Maskasiz raqamlar saqlanadi

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Faqat raqamlarni ajratib olish (masalan: 901234567)
    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length < 9) {
      alert("Iltimos, telefon raqamingizni to'liq kiriting");
      return;
    }

    setIsLoading(true);

    // Ism va familiyani ajratish
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "-";

    try {
      // Sizning API route-ingizga so'rov yuboramiz
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          // Telegramda chiroyli ko'rinishi uchun formatlangan raqam
          phone: `+998${cleanPhone.substring(0, 2)}${cleanPhone.substring(2, 5)}${cleanPhone.substring(5, 7)}${cleanPhone.substring(7, 9)}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setFullName("");
        setPhone("");
        // 3 soniyadan keyin modalni yopish
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
      } else {
        alert("Xatolik: " + (data.error || "Ma'lumot yuborilmadi"));
      }
    } catch (error) {
      console.error("Yuborishda xatolik:", error);
      alert("Server bilan bog'lanishda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Orqa fon (Overlay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          />

          {/* Modal oynasi */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="relative w-full max-w-lg bg-zinc-900/90 border-t sm:border border-white/10 p-8 rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl backdrop-blur-md"
          >
            {!isSuccess ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-black text-white uppercase tracking-tight italic">
                    Kursga yozilish
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <p className="text-zinc-400 mb-8">
                  Ma'lumotlaringizni qoldiring, bizning adminlarimiz tez orada
                  siz bilan bog'lanishadi.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-500 uppercase font-bold ml-2">
                      Ism va Familiya
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Masalan: Ahmetov Ahmed"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 outline-none transition-all placeholder:text-zinc-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-zinc-500 uppercase font-bold ml-2">
                      Telefon raqamingiz
                    </label>
                    <PatternFormat
                      required
                      format="+998 (##) ###-##-##"
                      mask="_"
                      value={phone}
                      onValueChange={(values) => setPhone(values.value)}
                      placeholder="+998 (__) ___-__-__"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 outline-none transition-all placeholder:text-zinc-700"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 text-white font-black py-5 rounded-2xl text-lg transition-all active:scale-[0.98] shadow-lg shadow-red-600/20 flex justify-center items-center uppercase tracking-widest mt-4"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        Yuborilmoqda...
                      </>
                    ) : (
                      "Tasdiqlash"
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* Muvaffaqiyatli yuborilgandagi holat */
              <div className="py-12 flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-red-600/40"
                >
                  <CheckCircle2 size={50} className="text-white" />
                </motion.div>
                <h3 className="text-3xl font-black text-white uppercase italic">
                  Muvaffaqiyatli!
                </h3>
                <p className="text-zinc-400 mt-4 text-lg">
                  Sizning so'rovingiz qabul qilindi. <br />
                  Adminlarimiz tez orada aloqaga chiqishadi.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
