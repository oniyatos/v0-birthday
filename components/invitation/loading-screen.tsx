"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsExiting(true), 300)
          setTimeout(() => onComplete(), 1000)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 100)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)"
          }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #e0f2fe 0%, #fce7f3 50%, #fef3c7 100%)"
          }}
        >
          {/* Animated background orbs */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${150 + i * 50}px`,
                  height: `${150 + i * 50}px`,
                  background: i % 2 === 0 
                    ? "radial-gradient(circle, rgba(135, 206, 235, 0.3) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(255, 182, 193, 0.3) 0%, transparent 70%)",
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  x: [0, 30, -20, 0],
                  y: [0, -40, 20, 0],
                  scale: [1, 1.2, 0.9, 1],
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Baby icon with glow */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                delay: 0.2 
              }}
              className="relative mb-8"
            >
              <motion.div
                className="w-32 h-32 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))",
                  boxShadow: "0 20px 60px rgba(135, 206, 235, 0.3), inset 0 2px 0 rgba(255,255,255,1)"
                }}
                animate={{
                  boxShadow: [
                    "0 20px 60px rgba(135, 206, 235, 0.3), inset 0 2px 0 rgba(255,255,255,1)",
                    "0 25px 80px rgba(255, 182, 193, 0.4), inset 0 2px 0 rgba(255,255,255,1)",
                    "0 20px 60px rgba(135, 206, 235, 0.3), inset 0 2px 0 rgba(255,255,255,1)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span
                  className="text-6xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  👶
                </motion.span>
              </motion.div>
              
              {/* Orbiting stars */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-6 h-6 text-yellow-400"
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3,
                  }}
                >
                  <motion.span
                    className="absolute text-lg"
                    style={{
                      transform: `translateX(${60 + i * 15}px) translateY(-50%)`,
                    }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  >
                    ✨
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>

            {/* Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg font-medium mb-6"
              style={{ 
                fontFamily: "var(--font-cursive)",
                color: "#5a7d9a"
              }}
            >
              Preparing something special...
            </motion.p>

            {/* Progress bar */}
            <div className="w-64 h-2 rounded-full overflow-hidden bg-white/50 backdrop-blur-sm">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #87CEEB, #FFB6C1, #FFF9C4)",
                  backgroundSize: "200% 100%",
                }}
                initial={{ width: 0 }}
                animate={{ 
                  width: `${Math.min(progress, 100)}%`,
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  width: { duration: 0.3 },
                  backgroundPosition: { duration: 2, repeat: Infinity }
                }}
              />
            </div>

            {/* Progress percentage */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-3 text-sm font-medium"
              style={{ color: "#7a9bb8" }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
