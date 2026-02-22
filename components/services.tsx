"use client";

import { motion } from "framer-motion";
import { Video, Smartphone, GraduationCap, TrendingUp } from "lucide-react";

const services = [
  {
    icon: Video,
    title: "Mobilografiya xizmati",
    description:
      "Biznes va shaxsiy brendlar uchun professional video suratga olish, reels va promo kontent yaratish xizmati.",
  },
  {
    icon: Smartphone,
    title: "Reels & SMM kontent",
    description:
      "Instagram va TikTok uchun sotuvga yo‘naltirilgan kreativ video kontent ishlab chiqish va montaj qilish.",
  },
  {
    icon: GraduationCap,
    title: "Mobilografiya kursi",
    description:
      "Noldan professional darajagacha mobilografiya o‘rgatamiz. Telefon orqali sifatli video olish va montaj qilishni amaliy tarzda o‘rganasiz.",
  },
  {
    icon: TrendingUp,
    title: "Daromad strategiyasi",
    description:
      "Mobilografiya orqali mijoz topish, shaxsiy brend yaratish va barqaror daromad qilish bo‘yicha aniq strategiyalar.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-black py-24 px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
            Men <span className="text-red-500">nima taklif qilaman</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Professional mobilografiya xizmati va daromadli kasb o‘rgatuvchi
            kurs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{
                  y: -5,
                  backgroundColor: "rgba(239, 68, 68, 0.05)",
                }}
                className="p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-red-500/30 transition-all group"
              >
                <div className="mb-6 w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                  <Icon className="text-red-500" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
