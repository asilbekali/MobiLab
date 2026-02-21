'use client'

import { motion } from 'framer-motion'
import { Pen, Code, Palette, Zap } from 'lucide-react'

const services = [
  {
    icon: Pen,
    title: 'UI/UX Design',
    description: 'Creating intuitive and beautiful user interfaces that solve real problems and delight users.',
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'Building fast, scalable, and accessible web applications with modern technologies.',
  },
  {
    icon: Palette,
    title: 'Brand Design',
    description: 'Developing cohesive brand identities that resonate with your target audience.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimizing websites for speed, accessibility, and search engine visibility.',
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-black py-24 px-6 relative overflow-hidden">
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
            What I <span className="text-red-500">Offer</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive services to bring your vision to life
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                whileHover={{ y: -5, backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
                className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-red-500/30 transition-all group cursor-pointer"
              >
                <div className="mb-6 w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                  <Icon className="text-red-500" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
