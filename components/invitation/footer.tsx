"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

interface FooterProps {
  babyName: string
}

export function Footer({ babyName }: FooterProps) {
  const emojis = ["🎈", "🎂", "🎉", "🎁", "🎈"]

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="py-16 px-4 text-center relative overflow-hidden"
    >
      {/* Decorative gradient background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at center bottom, rgba(255, 182, 193, 0.4) 0%, transparent 60%)"
        }}
      />

      <div className="max-w-md mx-auto relative z-10">
        {/* Decorative line with heart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <motion.div 
            className="h-px w-16"
            style={{ background: "linear-gradient(90deg, transparent, rgba(135, 206, 235, 0.6))" }}
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          />
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart 
              className="w-6 h-6" 
              style={{ 
                color: "#FFB6C1",
                fill: "#FFB6C1",
                filter: "drop-shadow(0 2px 8px rgba(255, 182, 193, 0.5))"
              }} 
            />
          </motion.div>
          <motion.div 
            className="h-px w-16"
            style={{ background: "linear-gradient(90deg, rgba(255, 182, 193, 0.6), transparent)" }}
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Thank you message */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-sm mb-4"
          style={{ color: "#6b8cae" }}
        >
          Cảm ơn quý khách đã dành thời gian
        </motion.p>
        
        {/* Family name */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-semibold gradient-text mb-10"
          style={{ fontFamily: "var(--font-cursive)" }}
        >
          {babyName}&apos;s Family
        </motion.p>

        {/* Animated emojis */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4"
        >
          {emojis.map((emoji, i) => (
            <motion.span
              key={i}
              className="text-3xl"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
              style={{
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        {/* Made with love */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-xs mt-12 flex items-center justify-center gap-1"
          style={{ color: "#9ca3af" }}
        >
          Made with 
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ❤️
          </motion.span>
          for our little one
        </motion.p>
      </div>
    </motion.footer>
  )
}
