"use client";

import { motion } from "framer-motion";
import { Instagram, X, Linkedin, Github } from "lucide-react";

const socialIcons = [
  { id: "instagram", Icon: Instagram, href: "#", label: "Instagram" },
  { id: "x", Icon: X, href: "#", label: "X" },
  { id: "linkedin", Icon: Linkedin, href: "#", label: "LinkedIn" },
  { id: "github", Icon: Github, href: "#", label: "GitHub" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className=" min-h-screen bg-black pt-32 pb-20 px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 bg-white text-black px-4 py-2 rounded-full"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold">Men tayyorman</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight text-balance"
            >
              <span className="text-red-500"></span>
              <span className="text-red-500">Shoxruh Ahmedov</span>
              <br />
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-gray-400 text-lg mb-8 leading-relaxed max-w-md"
            >
              Mobilografiya xizmati va daromadli mobilograf kursi. Kreativ video
              kontent yaratish va mobilografiya orqali pul ishlashni o‘rganing.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
            >
             Biz bilan bog'laning
            </motion.button>
          </motion.div>

          {/* Right Content - Image & Social Icons */}
          <div className="relative h-full rounded-xl hero overflow-hidden">
            {/* Placeholder Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className=" relative h-96 lg:h-full min-h-96 bg-gradient-to-br from-red-500/10 to-black rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-red-500/20 rounded-full blur-3xl" />
              </div>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-6"
            >
              <h3 className="text-white text-sm font-semibold -rotate-90 origin-right whitespace-nowrap ml-8">
                Social
              </h3>
              {socialIcons.map(({ id, Icon, href }, i) => (
                <motion.a
                  key={id}
                  href={href}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.2, backgroundColor: "#fff" }}
                  className="w-12 h-12 cursor-pointer bg-white rounded-full flex items-center justify-center text-black hover:text-red-700 transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
