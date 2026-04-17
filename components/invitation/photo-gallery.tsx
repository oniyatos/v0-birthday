"use client"

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Camera, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useRef } from "react"

const placeholderPhotos = [
  { id: 1, emoji: "🍼", label: "First Feed", gradient: "from-pink-100 via-pink-50 to-rose-100" },
  { id: 2, emoji: "🎂", label: "Birthday Prep", gradient: "from-sky-100 via-blue-50 to-cyan-100" },
  { id: 3, emoji: "🎈", label: "Party Time", gradient: "from-yellow-100 via-amber-50 to-orange-100" },
  { id: 4, emoji: "🧸", label: "Best Friend", gradient: "from-purple-100 via-violet-50 to-indigo-100" },
  { id: 5, emoji: "👶", label: "Sweet Dreams", gradient: "from-emerald-100 via-green-50 to-teal-100" },
]

export function PhotoGallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      setTimeout(checkScroll, 300)
    }
  }

  return (
    <section className="py-20 px-4 relative">
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
          className="inline-flex items-center gap-4 mb-4"
        >
          <motion.div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #e0f2fe, #bae6fd)",
              boxShadow: "0 8px 24px rgba(135, 206, 235, 0.3)"
            }}
            whileHover={{ rotate: 15, scale: 1.1 }}
          >
            <Camera className="w-6 h-6" style={{ color: "#0284c7" }} />
          </motion.div>
          <h3 
            className="text-3xl font-semibold"
            style={{ color: "#4a6b8a" }}
          >
            Khoanh Khac Dang Yeu
          </h3>
        </motion.div>
        <p style={{ color: "#6b8cae" }}>Nhung hinh anh dang yeu cua be</p>
      </motion.div>

      {/* Gallery Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Navigation Arrows */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: canScrollLeft ? 1 : 0.3 }}
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center -ml-4 md:-ml-6"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,251,255,0.9))",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-6 h-6" style={{ color: "#4a6b8a" }} />
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: canScrollRight ? 1 : 0.3 }}
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center -mr-4 md:-mr-6"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,251,255,0.9))",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-6 h-6" style={{ color: "#4a6b8a" }} />
        </motion.button>

        {/* Photos Container */}
        <div 
          ref={containerRef}
          onScroll={checkScroll}
          className="overflow-x-auto pb-6 scrollbar-hide px-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div className="flex gap-5 w-max py-4">
            {placeholderPhotos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={index}
                isHovered={hoveredId === photo.id}
                onHover={() => setHoveredId(photo.id)}
                onLeave={() => setHoveredId(null)}
              />
            ))}
          </div>
        </div>

        {/* Scroll hint for mobile */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm mt-2 md:hidden"
          style={{ color: "#6b8cae" }}
        >
          ← Vuot de xem them →
        </motion.p>
      </div>
    </section>
  )
}

interface PhotoCardProps {
  photo: typeof placeholderPhotos[0]
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

function PhotoCard({ photo, index, isHovered, onHover, onLeave }: PhotoCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useTransform(y, [-50, 50], [10, -10])
  const rotateY = useTransform(x, [-50, 50], [-10, 10])
  
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    onLeave()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={onHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1000,
        scrollSnapAlign: "center"
      }}
      className="flex-shrink-0"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
          y: isHovered ? -10 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`w-44 h-56 md:w-52 md:h-68 rounded-3xl bg-gradient-to-br ${photo.gradient} overflow-hidden relative group`}
        style={{
          boxShadow: isHovered 
            ? "0 25px 50px -12px rgba(0,0,0,0.2), 0 0 30px rgba(135, 206, 235, 0.3)"
            : "0 10px 30px -10px rgba(0,0,0,0.1)"
        }}
      >
        {/* Glass overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 100%)"
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
          <motion.span
            className="text-6xl md:text-7xl mb-3"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              rotate: isHovered ? [0, 10, -10, 0] : 0
            }}
            transition={{ duration: 0.5 }}
            style={{
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
            }}
          >
            {photo.emoji}
          </motion.span>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10
            }}
            className="text-sm font-medium mt-2 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(8px)",
              color: "#4a6b8a"
            }}
          >
            {photo.label}
          </motion.p>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)",
            backgroundSize: "200% 200%"
          }}
          animate={{
            backgroundPosition: isHovered ? ["200% 200%", "-200% -200%"] : "200% 200%"
          }}
          transition={{ duration: 1, ease: "linear" }}
        />
      </motion.div>
    </motion.div>
  )
}
