"use client"

import { motion } from "framer-motion"
import { Star, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

export function FloatingElements() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; duration: number; color: string }>>([])

  useEffect(() => {
    // Generate particles on client side only
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 10,
      color: ['#87CEEB', '#FFB6C1', '#FFF9C4', '#E6E6FA'][Math.floor(Math.random() * 4)]
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient orbs in background */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(135, 206, 235, 0.6) 0%, transparent 70%)"
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 w-80 h-80 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(255, 182, 193, 0.6) 0%, transparent 70%)"
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(255, 249, 196, 0.6) 0%, transparent 70%)"
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Premium Clouds with depth */}
      {[
        { top: "5%", delay: 0, duration: 45, opacity: 0.7, scale: 1.2 },
        { top: "15%", delay: -15, duration: 55, opacity: 0.5, scale: 0.9, reverse: true },
        { top: "35%", delay: -8, duration: 50, opacity: 0.4, scale: 1 },
        { top: "55%", delay: -25, duration: 60, opacity: 0.3, scale: 0.8, reverse: true },
        { top: "75%", delay: -20, duration: 65, opacity: 0.35, scale: 1.1 },
      ].map((cloud, i) => (
        <motion.div
          key={`cloud-${i}`}
          className={cloud.reverse ? "animate-cloud-reverse" : "animate-cloud"}
          style={{
            position: "absolute",
            top: cloud.top,
            animationDelay: `${cloud.delay}s`,
            animationDuration: `${cloud.duration}s`,
            opacity: cloud.opacity,
            transform: `scale(${cloud.scale})`,
          }}
        >
          <Cloud />
        </motion.div>
      ))}

      {/* Floating Stars with glow */}
      {[
        { top: "12%", left: "8%", delay: 0, size: 28 },
        { top: "25%", left: "85%", delay: 1, size: 24 },
        { top: "45%", left: "12%", delay: 2, size: 20 },
        { top: "35%", left: "75%", delay: 0.5, size: 26 },
        { top: "65%", left: "90%", delay: 1.5, size: 22 },
        { top: "80%", left: "15%", delay: 2.5, size: 18 },
        { top: "55%", left: "5%", delay: 3, size: 16 },
        { top: "20%", left: "45%", delay: 1.8, size: 14 },
      ].map((star, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute"
          style={{
            top: star.top,
            left: star.left,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, -5, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        >
          <Star
            className="text-yellow-300 fill-yellow-200 animate-twinkle drop-shadow-lg"
            style={{
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              filter: "drop-shadow(0 0 8px rgba(255, 223, 0, 0.6))",
            }}
          />
        </motion.div>
      ))}

      {/* Sparkles */}
      {[
        { top: "18%", left: "25%", delay: 0.3 },
        { top: "42%", left: "70%", delay: 1.2 },
        { top: "68%", left: "30%", delay: 2.1 },
        { top: "88%", left: "65%", delay: 0.8 },
      ].map((sparkle, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{ top: sparkle.top, left: sparkle.left }}
          animate={{
            scale: [0.8, 1.3, 0.8],
            opacity: [0.5, 1, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: sparkle.delay,
          }}
        >
          <Sparkles 
            className="w-5 h-5 text-pink-300"
            style={{ filter: "drop-shadow(0 0 6px rgba(255, 182, 193, 0.8))" }}
          />
        </motion.div>
      ))}

      {/* Premium Balloons */}
      {[
        { top: "10%", left: "88%", color: "#FFB6C1", delay: 0 },
        { top: "30%", left: "6%", color: "#87CEEB", delay: 1.5 },
        { top: "55%", left: "92%", color: "#FFF9C4", delay: 0.8 },
        { top: "20%", left: "20%", color: "#E6E6FA", delay: 2, size: "sm" },
        { top: "70%", left: "8%", color: "#98FB98", delay: 1.2 },
        { top: "85%", left: "80%", color: "#FFD700", delay: 2.5, size: "sm" },
      ].map((balloon, i) => (
        <motion.div
          key={`balloon-${i}`}
          className="absolute"
          style={{ top: balloon.top, left: balloon.left }}
          animate={{
            y: [0, -25, 0],
            x: [0, 8, -8, 0],
            rotate: [-3, 3, -3],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: balloon.delay,
          }}
        >
          <Balloon color={balloon.color} size={balloon.size as "sm" | "md"} />
        </motion.div>
      ))}

      {/* Rising particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
            width: '12px',
            height: '12px',
          }}
        />
      ))}
    </div>
  )
}

function Cloud() {
  return (
    <svg viewBox="0 0 120 70" className="w-40 h-24" style={{ filter: "drop-shadow(0 4px 20px rgba(255,255,255,0.5))" }}>
      <defs>
        <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="#f0f9ff" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <ellipse cx="35" cy="45" rx="30" ry="22" fill="url(#cloudGrad)" />
      <ellipse cx="65" cy="40" rx="35" ry="28" fill="url(#cloudGrad)" />
      <ellipse cx="90" cy="48" rx="25" ry="20" fill="url(#cloudGrad)" />
      <ellipse cx="50" cy="28" rx="22" ry="18" fill="url(#cloudGrad)" />
      <ellipse cx="75" cy="25" rx="18" ry="15" fill="url(#cloudGrad)" />
    </svg>
  )
}

function Balloon({ color, size = "md" }: { color: string; size?: "sm" | "md" }) {
  const dimensions = size === "sm" ? "w-10 h-14" : "w-14 h-20"
  const gradientId = `balloon-grad-${color.replace('#', '')}`
  
  return (
    <div className={`${dimensions} relative`}>
      <svg viewBox="0 0 50 75" className="w-full h-full" style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))" }}>
        <defs>
          <radialGradient id={gradientId} cx="30%" cy="25%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="40%" stopColor={color} stopOpacity="0.95" />
            <stop offset="100%" stopColor={color} />
          </radialGradient>
          <filter id="balloonGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* Balloon body */}
        <ellipse cx="25" cy="28" rx="20" ry="26" fill={`url(#${gradientId})`} filter="url(#balloonGlow)" />
        {/* Highlight */}
        <ellipse cx="18" cy="18" rx="6" ry="8" fill="white" fillOpacity="0.4" />
        {/* Knot */}
        <path d="M25,54 L22,58 L28,58 Z" fill={color} />
        {/* String with curve */}
        <path d="M25,58 Q28,65 23,72 Q20,78 25,82" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
      </svg>
    </div>
  )
}
