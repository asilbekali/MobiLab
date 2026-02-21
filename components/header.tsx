'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

const navItems = [
  "Bosh sahifa",
  "Biz haqimizda",
  "Xizmatlar",
  "Loyihalar",
  "Mijozlar fikri",
  "Bog'lanish"
]
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-gray-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-white font-bold text-xl"
        >
          <Link href={"/"} className="text-red-500 cursor-pointer font-[500] text-2xl md:text-3xl">Shoxruh Ahmedov</Link>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-wide"
            >
              {item}
            </motion.a>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Contact Button - Hidden on Mobile */}
          <motion.button

            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden md:block   hover:scale-110 active:scale-100 transition-all duration-200 cursor-pointer bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100  text-sm"
          >
            Aloqa
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-black/95 border-t border-gray-800"
      >
        <nav className="flex flex-col gap-0 px-6 py-4">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0, x: -10 }}
              animate={
                isMobileMenuOpen
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -10 }
              }
              transition={{ delay: isMobileMenuOpen ? i * 0.05 : 0 }}
              className="text-gray-300 hover:text-white transition-colors py-3 text-sm uppercase tracking-wide border-b border-gray-800 last:border-b-0"
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            onClick={() => setIsMobileMenuOpen(false)}
            initial={{ opacity: 0, x: -10 }}
            animate={
              isMobileMenuOpen
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -10 }
            }
            transition={{ delay: isMobileMenuOpen ? navItems.length * 0.05 : 0 }}
            className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors text-sm mt-2 w-full"
          >
            Aloqa
          </motion.button>
        </nav>
      </motion.div>
    </motion.header>
  )
}
