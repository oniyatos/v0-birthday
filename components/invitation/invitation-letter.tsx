"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Heart, Quote } from "lucide-react"
import { useRef } from "react"

interface InvitationLetterProps {
  babyName: string
  parentNames: string
}

export function InvitationLetter({ babyName, parentNames }: InvitationLetterProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.5], [15, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1])

  return (
    <section ref={ref} className="py-20 px-4 relative">
      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-3 mb-3">
          <motion.div
            className="w-12 h-[2px] rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, #FFB6C1)" }}
          />
          <Quote className="w-5 h-5 rotate-180" style={{ color: "#FFB6C1" }} />
          <motion.div
            className="w-12 h-[2px] rounded-full"
            style={{ background: "linear-gradient(90deg, #FFB6C1, transparent)" }}
          />
        </div>
      </motion.div>

      <motion.div
        style={{ rotateX, opacity, perspective: 1000 }}
        className="max-w-md mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="glass-card rounded-[2rem] p-8 md:p-10 text-center relative overflow-hidden"
        >
          {/* Decorative paper texture overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Heart icon with pulse */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 15 }}
            viewport={{ once: true }}
            className="relative w-20 h-20 mx-auto mb-8"
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg, #fce7f3 0%, #fecdd3 100%)"
              }}
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 0 0 rgba(255, 182, 193, 0.4)",
                  "0 0 0 20px rgba(255, 182, 193, 0)",
                  "0 0 0 0 rgba(255, 182, 193, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="absolute inset-0 rounded-full flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-10 h-10 text-pink-400 fill-pink-300" style={{ filter: "drop-shadow(0 4px 8px rgba(255, 182, 193, 0.5))" }} />
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-8"
            style={{ color: "#4a6b8a" }}
          >
            Thu Moi
          </motion.h3>

          {/* Letter content */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-5 leading-relaxed"
            style={{ color: "#5a7d9a" }}
          >
            <p className="text-lg">Kinh gui quy khach,</p>
            
            <p>
              Chung toi vo cung hanh phuc duoc thong bao rang con yeu cua chung toi,{" "}
              <span 
                className="font-semibold gradient-text-static text-lg"
                style={{ fontFamily: "var(--font-cursive)" }}
              >
                {babyName}
              </span>
              , sap tron mot tuoi!
            </p>
            
            <p>
              Nhan dip nay, chung toi xin tran trong kinh moi quy khach den du bua tiec{" "}
              <span className="font-semibold" style={{ color: "#FFB6C1" }}>Thoi Noi</span>{" "}
              de cung chia se niem vui va chuc phuc cho be.
            </p>
            
            <p>Su hien dien cua quy khach la niem vinh hanh lon lao cho gia dinh chung toi.</p>
          </motion.div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-10 pt-8 relative"
          >
            {/* Decorative line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(135, 206, 235, 0.5), transparent)" }} />
            
            <p className="font-medium mb-3" style={{ color: "#4a6b8a" }}>
              Tran trong kinh moi,
            </p>
            <p 
              className="text-2xl gradient-text-static"
              style={{ fontFamily: "var(--font-cursive)" }}
            >
              {parentNames}
            </p>
          </motion.div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg opacity-30" style={{ borderColor: "#87CEEB" }} />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg opacity-30" style={{ borderColor: "#FFB6C1" }} />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg opacity-30" style={{ borderColor: "#FFF9C4" }} />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 rounded-br-lg opacity-30" style={{ borderColor: "#87CEEB" }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
