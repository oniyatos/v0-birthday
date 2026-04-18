"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const[progress, setProgress] = useState(0)
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
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease:[0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #e0f2fe 0%, #fce7f3 50%, #fef3c7 100%)" }}
        >
          {/* Bong bóng nền mờ */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
                animate={{ x: [0, 30, -20, 0], y:[0, -40, 20, 0], scale:[1, 1.2, 0.9, 1] }}
                transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Khung chứa Avatar và Ngôi sao */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="relative mb-12 w-40 h-40 flex items-center justify-center"
            >
              {/* KHỐI SAO XOAY - Đã bọc div để giữ khoảng cách */}
              <div className="absolute inset-0 pointer-events-none z-0">
                {[0, 72, 144, 216, 288].map((startDegree, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4 flex items-center justify-center"
                    animate={{ rotate:[startDegree, startDegree + 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <div style={{ transform: "translateY(-90px)" }}>
                      <motion.span
                        className="block text-3xl drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]"
                        animate={{ scale: [0.6, 0.8, 0.6], opacity:[0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      >
                        ✨
                      </motion.span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* KHỐI ẢNH CỦA BÉ */}
              <motion.div
                className="w-32 h-32 rounded-full flex items-center justify-center relative z-20"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))",
                }}
                animate={{
                  boxShadow:[
                    "0 20px 60px rgba(135, 206, 235, 0.3), inset 0 2px 0 rgba(255,255,255,1)",
                    "0 25px 80px rgba(255, 182, 193, 0.4), inset 0 2px 0 rgba(255,255,255,1)",
                    "0 20px 60px rgba(135, 206, 235, 0.3), inset 0 2px 0 rgba(255,255,255,1)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                 <motion.img
                    src="/avatar.jpg" 
                    alt="Baby"
                    className="w-[112px] h-[112px] rounded-full object-cover shadow-inner relative z-30 bg-white"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-medium mb-6 drop-shadow-sm"
              style={{ fontFamily: "var(--font-cursive)", color: "#5a7d9a" }}
            >
              Preparing something special...
            </motion.p>

            <div className="w-64 h-3 rounded-full overflow-hidden bg-white/50 backdrop-blur-sm shadow-inner">
              <motion.div
                className="h-full rounded-full shadow-md"
                style={{ background: "linear-gradient(90deg, #87CEEB, #FFB6C1, #FFF9C4)", backgroundSize: "200% 100%" }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%`, backgroundPosition:["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ width: { duration: 0.3 }, backgroundPosition: { duration: 2, repeat: Infinity } }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-3 text-sm font-bold tracking-wider text-slate-400"
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}