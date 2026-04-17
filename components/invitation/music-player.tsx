"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Music, Volume2, VolumeX } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio()
    // Add your music URL here
    // audioRef.current.src = "/path-to-music.mp3"
    audioRef.current.loop = true

    // Hide tooltip after 5 seconds
    const timer = setTimeout(() => setShowTooltip(false), 5000)

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      clearTimeout(timer)
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(() => {
          // Handle autoplay restrictions
        })
      }
      setIsPlaying(!isPlaying)
      setShowTooltip(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, type: "spring", stiffness: 150, damping: 15 }}
      className="fixed bottom-6 right-6 z-50"
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
          >
            <div 
              className="px-4 py-2 rounded-2xl text-sm font-medium"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,251,255,0.9))",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                color: "#4a6b8a"
              }}
            >
              Bat nhac nen
              <div 
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 rotate-45"
                style={{ background: "rgba(255,255,255,0.95)" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={togglePlay}
        className="relative w-16 h-16 rounded-full flex items-center justify-center"
        style={{
          background: isPlaying 
            ? "linear-gradient(135deg, #87CEEB 0%, #FFB6C1 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,251,255,0.8))",
          boxShadow: isPlaying
            ? "0 12px 40px rgba(135, 206, 235, 0.5), 0 0 60px rgba(255, 182, 193, 0.3)"
            : "0 8px 32px rgba(0,0,0,0.1)"
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulse rings when playing */}
        <AnimatePresence>
          {isPlaying && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeOut"
                  }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #87CEEB, #FFB6C1)",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Icon */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={isPlaying ? { duration: 3, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
          className="relative z-10"
        >
          {isPlaying ? (
            <div className="relative">
              {/* Vinyl record */}
              <motion.div
                className="w-10 h-10 rounded-full relative"
                style={{
                  background: "conic-gradient(from 0deg, #1f1f1f, #3a3a3a, #1f1f1f, #3a3a3a, #1f1f1f)",
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)"
                }}
              >
                {/* Center label */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #87CEEB, #FFB6C1)",
                    boxShadow: "0 0 8px rgba(135, 206, 235, 0.5)"
                  }}
                />
                {/* Grooves */}
                <div className="absolute inset-1 rounded-full border border-gray-600/30" />
                <div className="absolute inset-2 rounded-full border border-gray-600/20" />
                <div className="absolute inset-3 rounded-full border border-gray-600/10" />
              </motion.div>
            </div>
          ) : (
            <Music className="w-7 h-7" style={{ color: "#4a6b8a" }} />
          )}
        </motion.div>

        {/* Sound waves when playing */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #10b981, #34d399)",
                boxShadow: "0 2px 8px rgba(16, 185, 129, 0.4)"
              }}
            >
              <Volume2 className="w-3 h-3 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Sound wave animation when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -left-8 top-1/2 -translate-y-1/2 flex items-center gap-0.5"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full"
                style={{ background: "#87CEEB" }}
                animate={{
                  height: ["8px", "20px", "8px"],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
