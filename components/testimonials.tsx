'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, Tech Startup',
    content: 'Working with MR was transformative. The design solutions were innovative and the development was flawless. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager, Agency',
    content: 'Professional, creative, and delivered beyond expectations. The attention to detail and user experience is unmatched.',
    rating: 5,
  },
  {
    name: 'Emma Davis',
    role: 'Marketing Director',
    content: 'Exceptional work on our brand redesign. MR understood our vision and brought it to life beautifully.',
    rating: 5,
  },
  {
    name: 'Alex Thompson',
    role: 'Founder, Digital Agency',
    content: 'A true professional who combines design excellence with technical expertise. Best decision we made.',
    rating: 5,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section id="testimonials" className="bg-black py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Client <span className="text-red-500">Testimonials</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            What my clients have to say about working with me
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 lg:p-12 min-h-64 flex flex-col justify-between">
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array(testimonials[currentIndex].rating)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                ))}
            </div>

            {/* Content */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl text-gray-300 mb-6 leading-relaxed italic">
                "{testimonials[currentIndex].content}"
              </p>
            </motion.div>

            {/* Author */}
            <div>
              <h4 className="text-lg font-bold text-white">{testimonials[currentIndex].name}</h4>
              <p className="text-gray-400">{testimonials[currentIndex].role}</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8 justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prev}
              className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Indicators */}
          <div className="flex gap-2 justify-center mt-6">
            {testimonials.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === currentIndex ? 32 : 8,
                  backgroundColor: i === currentIndex ? '#ef4444' : '#666',
                }}
                className="h-2 rounded-full transition-all"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
