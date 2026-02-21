'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Modern e-commerce platform with real-time inventory management',
    image: 'bg-gradient-to-br from-red-500/20 to-transparent',
  },
  {
    id: 2,
    title: 'Mobile App',
    category: 'UI/UX Design',
    description: 'iOS and Android application with intuitive user interface',
    image: 'bg-gradient-to-br from-blue-500/20 to-transparent',
  },
  {
    id: 3,
    title: 'Brand Identity',
    category: 'Brand Design',
    description: 'Complete branding package including logo and guidelines',
    image: 'bg-gradient-to-br from-purple-500/20 to-transparent',
  },
  {
    id: 4,
    title: 'SaaS Dashboard',
    category: 'Web Development',
    description: 'Comprehensive analytics dashboard for business intelligence',
    image: 'bg-gradient-to-br from-green-500/20 to-transparent',
  },
  {
    id: 5,
    title: 'Design System',
    category: 'UI/UX Design',
    description: 'Reusable component library and design tokens',
    image: 'bg-gradient-to-br from-orange-500/20 to-transparent',
  },
  {
    id: 6,
    title: 'Website Redesign',
    category: 'Web Design',
    description: 'Complete website overhaul with modern design practices',
    image: 'bg-gradient-to-br from-indigo-500/20 to-transparent',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="bg-black py-24 px-6 relative overflow-hidden">
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
            Latest <span className="text-red-500">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Showcasing my recent work and accomplishments
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.a
              key={project.id}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl mb-6 h-64 bg-gray-900">
                <div className={`absolute inset-0 ${project.image} transition-transform duration-500 group-hover:scale-110`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="text-white" size={24} />
                </div>
              </div>
              <div>
                <p className="text-red-500 text-sm font-semibold uppercase tracking-wide mb-2">
                  {project.category}
                </p>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400">{project.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
