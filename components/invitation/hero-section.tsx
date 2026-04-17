"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Sparkles, ChevronDown } from "lucide-react"
import { useRef } from "react"

interface HeroSectionProps {
  babyName: string
  eventDate: string
}

export function HeroSection({ babyName, eventDate }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      <motion.div style={{ y, opacity, scale }} className="w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="glass-card rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-24 h-24 opacity-30">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M0,50 Q0,0 50,0" stroke="url(#cornerGrad)" strokeWidth="2" fill="none" />
              <path d="M0,70 Q0,20 50,20" stroke="url(#cornerGrad)" strokeWidth="1" fill="none" opacity="0.5" />
              <defs>
                <linearGradient id="cornerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#87CEEB" />
                  <stop offset="100%" stopColor="#FFB6C1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 opacity-30 rotate-180">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M0,50 Q0,0 50,0" stroke="url(#cornerGrad2)" strokeWidth="2" fill="none" />
              <path d="M0,70 Q0,20 50,20" stroke="url(#cornerGrad2)" strokeWidth="1" fill="none" opacity="0.5" />
              <defs>
                <linearGradient id="cornerGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFB6C1" />
                  <stop offset="100%" stopColor="#FFF9C4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Welcome text with shimmer */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-5 h-5 text-yellow-400 drop-shadow-lg" style={{ filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))" }} />
            </motion.div>
            <p className="text-sm tracking-[0.3em] uppercase font-medium" style={{ color: "#6b8cae" }}>
              Welcome to my
            </p>
            <motion.div
              animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <Sparkles className="w-5 h-5 text-yellow-400 drop-shadow-lg" style={{ filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))" }} />
            </motion.div>
          </motion.div>

          {/* 1st Birthday - Large display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 }}
            className="mb-10"
          >
            <h1 
              className="text-5xl md:text-6xl font-bold gradient-text"
              style={{ lineHeight: 1.2 }}
            >
              1st Birthday
            </h1>
            <motion.div
              className="h-1 w-24 mx-auto mt-4 rounded-full"
              style={{ background: "linear-gradient(90deg, #87CEEB, #FFB6C1, #FFF9C4)" }}
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />
          </motion.div>

          {/* Baby Avatar with premium effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 100 }}
            className="relative mx-auto mb-10 w-44 h-44 md:w-52 md:h-52"
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, #87CEEB, #FFB6C1, #FFF9C4, #87CEEB)",
                padding: "3px"
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full rounded-full bg-white/90" />
            </motion.div>

            {/* Main avatar container */}
            <div className="absolute inset-2 rounded-full animate-pulse-glow overflow-hidden">
              <div 
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,251,255,0.9))"
                }}
              >
                <motion.span
                  className="text-7xl md:text-8xl"
                  animate={{ 
                    scale: [1, 1.08, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  👶
                </motion.span>
              </div>
            </div>

            {/* Decorative dashed ring */}
            <motion.div 
              className="absolute -inset-4 rounded-full border-2 border-dashed opacity-40"
              style={{ borderColor: "#87CEEB" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />

            {/* Floating mini elements around avatar */}
            {[0, 72, 144, 216, 288].map((deg, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3"
                style={{
                  top: "50%",
                  left: "50%",
                  transformOrigin: "center center",
                }}
                animate={{
                  rotate: [deg, deg + 360],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.span
                  className="absolute text-sm"
                  style={{
                    transform: `translateX(${70 + i * 5}px) translateY(-50%)`,
                  }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {["✨", "🌟", "💫", "⭐", "✨"][i]}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>

          {/* Baby Name - Cursive with shine effect */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-5xl md:text-6xl gradient-text mb-4"
            style={{ fontFamily: "var(--font-cursive)" }}
          >
            {babyName}
          </motion.h2>

          {/* Vietnamese subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-xl mb-8 font-medium"
            style={{ color: "#7a9bb8" }}
          >
            Tiec Thoi Noi
          </motion.p>

          {/* Date badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="inline-flex items-center gap-3 rounded-full px-6 py-3.5 font-medium"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,251,255,0.8))",
              boxShadow: "0 8px 32px rgba(135, 206, 235, 0.2), inset 0 1px 0 rgba(255,255,255,1)",
              color: "#5a7d9a"
            }}
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xl"
            >
              📅
            </motion.span>
            <span>{eventDate}</span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-10 text-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-sm font-medium" style={{ color: "#7a9bb8" }}>Scroll to explore</p>
            <motion.div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ 
                background: "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(248,251,255,0.6))",
                boxShadow: "0 4px 16px rgba(135, 206, 235, 0.2)"
              }}
            >
              <ChevronDown className="w-5 h-5" style={{ color: "#87CEEB" }} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
