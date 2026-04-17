"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Send, User, Users, MessageCircleHeart, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

export function RSVPSection() {
  const [formData, setFormData] = useState({
    name: "",
    guests: "",
    wishes: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setShowConfetti(true)
    
    // Generate confetti pieces
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ["#87CEEB", "#FFB6C1", "#FFF9C4", "#E6E6FA", "#98FB98"][Math.floor(Math.random() * 5)],
      delay: Math.random() * 0.5
    }))
    setConfettiPieces(pieces)
    
    setTimeout(() => setShowConfetti(false), 4000)
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {confettiPieces.map((piece) => (
              <motion.div
                key={piece.id}
                initial={{ 
                  y: -20, 
                  x: `${piece.x}vw`,
                  opacity: 1,
                  rotate: 0,
                  scale: 1
                }}
                animate={{ 
                  y: "100vh",
                  rotate: Math.random() * 720 - 360,
                  scale: [1, 0.8, 1, 0.6]
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  delay: piece.delay,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="absolute w-3 h-3 rounded-sm"
                style={{ 
                  background: piece.color,
                  boxShadow: `0 2px 8px ${piece.color}50`
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 mb-4"
        >
          <Sparkles className="w-5 h-5" style={{ color: "#87CEEB" }} />
          <h3 
            className="text-3xl font-semibold"
            style={{ color: "#4a6b8a" }}
          >
            Xac Nhan Tham Du
          </h3>
          <Sparkles className="w-5 h-5" style={{ color: "#FFB6C1" }} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="glass-card rounded-[2rem] p-8 md:p-10 max-w-md mx-auto relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div 
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, rgba(135, 206, 235, 0.5) 0%, transparent 70%)" }}
        />
        <div 
          className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, rgba(255, 182, 193, 0.5) 0%, transparent 70%)" }}
        />

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form 
              key="form"
              onSubmit={handleSubmit} 
              className="space-y-6 relative z-10"
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <p className="text-center mb-6" style={{ color: "#6b8cae" }}>
                Vui long xac nhan de chung toi chuan bi chu dao nhat
              </p>

              {/* Name input */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="text-sm font-medium flex items-center gap-2" style={{ color: "#4a6b8a" }}>
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #e0f2fe, #bae6fd)" }}
                  >
                    <User className="w-4 h-4" style={{ color: "#0284c7" }} />
                  </div>
                  Ho va ten
                </label>
                <Input
                  type="text"
                  placeholder="Nhap ho ten cua ban"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="rounded-2xl h-14 border-0 text-base"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,251,255,0.8))",
                    boxShadow: "inset 0 2px 0 rgba(255,255,255,1), 0 2px 8px rgba(135, 206, 235, 0.1)"
                  }}
                />
              </motion.div>

              {/* Guests input */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="text-sm font-medium flex items-center gap-2" style={{ color: "#4a6b8a" }}>
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #fce7f3, #fbcfe8)" }}
                  >
                    <Users className="w-4 h-4" style={{ color: "#db2777" }} />
                  </div>
                  So nguoi tham du
                </label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  placeholder="So luong khach"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  required
                  className="rounded-2xl h-14 border-0 text-base"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,251,255,0.8))",
                    boxShadow: "inset 0 2px 0 rgba(255,255,255,1), 0 2px 8px rgba(135, 206, 235, 0.1)"
                  }}
                />
              </motion.div>

              {/* Wishes input */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="text-sm font-medium flex items-center gap-2" style={{ color: "#4a6b8a" }}>
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #fef3c7, #fde68a)" }}
                  >
                    <MessageCircleHeart className="w-4 h-4" style={{ color: "#d97706" }} />
                  </div>
                  Loi chuc cho be
                </label>
                <textarea
                  placeholder="Gui loi chuc tot dep nhat..."
                  value={formData.wishes}
                  onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                  rows={4}
                  className="w-full rounded-2xl p-4 resize-none text-base border-0 focus:outline-none focus:ring-2"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,251,255,0.8))",
                    boxShadow: "inset 0 2px 0 rgba(255,255,255,1), 0 2px 8px rgba(135, 206, 235, 0.1)",
                    color: "#4a6b8a"
                  }}
                />
              </motion.div>

              {/* Submit button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  type="submit"
                  className="w-full h-16 rounded-2xl text-lg font-semibold text-white border-0 relative overflow-hidden group"
                  style={{
                    background: "linear-gradient(135deg, #87CEEB 0%, #7EC8E3 30%, #FFB6C1 70%, #FFF9C4 100%)",
                    backgroundSize: "200% 200%",
                    boxShadow: "0 12px 40px rgba(135, 206, 235, 0.35)"
                  }}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{
                      background: "linear-gradient(135deg, #87CEEB 0%, #7EC8E3 30%, #FFB6C1 70%, #FFF9C4 100%)",
                      backgroundSize: "200% 200%"
                    }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Gui Xac Nhan
                  </span>
                </Button>
              </motion.div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="text-center py-10 relative z-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center relative"
                style={{
                  background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
                  boxShadow: "0 12px 40px rgba(16, 185, 129, 0.3)"
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(16, 185, 129, 0.4)",
                      "0 0 0 20px rgba(16, 185, 129, 0)",
                      "0 0 0 0 rgba(16, 185, 129, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full"
                />
                <Check className="w-12 h-12" style={{ color: "#059669" }} />
              </motion.div>
              
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-semibold mb-3"
                style={{ color: "#059669" }}
              >
                Cam on ban!
              </motion.h4>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ color: "#6b8cae" }}
              >
                Chung toi rat vui duoc don tiep ban!
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
