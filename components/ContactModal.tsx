"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
// 1. Kutubxonani import qilamiz
import { PatternFormat } from "react-number-format";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState(""); // Bu yerda toza raqamlar saqlanadi

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Raqam to'liq kiritilganini tekshirish (9 ta raqam: 90 123 45 67)
    // +998 qismi maskada bo'ladi, bizga faqat ichki qismi kerak
    const cleanPhone = phone.replace(/\D/g, ""); // Faqat raqamlarni qoldirish

    if (cleanPhone.length < 9) {
      alert("Iltimos, telefon raqamingizni to'liq kiriting");
      return;
    }

    setIsLoading(true);

    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "-";

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          phone: `+998 ${phone}`, // Telegramga chiroyli formatda boradi
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setFullName("");
        setPhone("");
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
      } else {
        alert("Xatolik: " + (data.error || "So'rov yuborilmadi"));
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          />

          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
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
                  <input
                    required
                    type="text"
                    placeholder="Ism Familiya"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 outline-none transition-all placeholder:text-zinc-600"
                  />

                  {/* O'zbekiston formati uchun Input Maska */}
                  <PatternFormat
                    required
                    format="+998 (##) ###-##-##"
                    mask="_"
                    value={phone}
                    onValueChange={(values) => setPhone(values.value)}
                    placeholder="+998 (__) ___-__-__"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 outline-none transition-all placeholder:text-zinc-600"
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 text-white font-bold py-5 rounded-2xl text-lg transition-all active:scale-[0.98] shadow-lg shadow-red-600/20 flex justify-center items-center"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />{" "}
                        Yuborilmoqda...
                      </>
                    ) : (
                      "Ro'yxatdan o'tish"
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="py-12 flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-red-600/40"
                >
                  <CheckCircle2 size={50} className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white">
                  Muvaffaqiyatli!
                </h3>
                <p className="text-zinc-400 mt-2">
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
