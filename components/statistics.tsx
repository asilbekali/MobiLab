"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const AnimatedCounter = ({
  value,
  suffix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(value * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const stats = [
  { label: "Mijozlar", value: 50, suffix: "+" },
  { label: "Loyihalar", value: 120, suffix: "+" },
  { label: "Tajriba yili", value: 5, suffix: "+" },
  { label: "Mukofotlar", value: 15, suffix: "" },
];

export default function Statistics() {
  return (
    <section className="bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          /* ASOSIY O'ZGARISH: 
             grid-cols-2 (mobileda 2 ta ustun)
             lg:grid-cols-4 (katta ekranda 4 ta ustun)
          */
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-4 md:gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center group"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-4 group-hover:text-red-600 transition-colors duration-500">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-zinc-500 text-[10px] sm:text-xs lg:text-sm font-black uppercase tracking-[0.2em]">
                {stat.label}
              </p>
              {/* Bezak uchun chiziqcha */}
              <div className="w-8 h-[2px] bg-red-600 mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
