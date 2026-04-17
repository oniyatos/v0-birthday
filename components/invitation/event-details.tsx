"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Navigation, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EventDetailsProps {
  date: string
  time: string
  venue: string
  address: string
  mapsUrl: string
}

export function EventDetails({ date, time, venue, address, mapsUrl }: EventDetailsProps) {
  return (
    <section className="py-20 px-4">
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
            Chi Tiet Su Kien
          </h3>
          <Sparkles className="w-5 h-5" style={{ color: "#FFB6C1" }} />
        </motion.div>
        <motion.div
          className="w-24 h-1 mx-auto rounded-full"
          style={{ background: "linear-gradient(90deg, #87CEEB, #FFB6C1, #FFF9C4)" }}
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* Date & Time Card */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotateY: -15 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          className="glass-card rounded-[2rem] p-7 relative overflow-hidden group"
        >
          {/* Decorative gradient blob */}
          <div 
            className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-50 group-hover:opacity-70 transition-opacity"
            style={{ background: "radial-gradient(circle, rgba(135, 206, 235, 0.4) 0%, transparent 70%)" }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <motion.div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)"
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Calendar className="w-7 h-7" style={{ color: "#0284c7" }} />
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                  style={{ opacity: 0.3 }}
                />
              </motion.div>
              <h4 className="text-xl font-semibold" style={{ color: "#4a6b8a" }}>Thoi Gian</h4>
            </div>

            <div className="space-y-4">
              {/* Date display */}
              <motion.div 
                className="rounded-2xl p-5 text-center relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,251,255,0.8))",
                  boxShadow: "inset 0 2px 0 rgba(255,255,255,1), 0 4px 12px rgba(135, 206, 235, 0.1)"
                }}
              >
                <p className="text-3xl font-bold mb-1" style={{ color: "#3b82f6" }}>
                  {date.split(",")[0]}
                </p>
                <p style={{ color: "#6b8cae" }}>
                  {date.split(",")[1]?.trim()}
                </p>
              </motion.div>

              {/* Time display */}
              <motion.div 
                className="flex items-center gap-4 rounded-2xl p-4"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(248,251,255,0.7))",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,1)"
                }}
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #e0f2fe, #bae6fd)" }}
                >
                  <Clock className="w-5 h-5" style={{ color: "#0284c7" }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: "#6b8cae" }}>Bat dau luc</p>
                  <p className="font-semibold text-lg" style={{ color: "#3b82f6" }}>{time}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Location Card */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotateY: 15 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          className="glass-card rounded-[2rem] p-7 relative overflow-hidden group"
        >
          {/* Decorative gradient blob */}
          <div 
            className="absolute -top-10 -left-10 w-32 h-32 rounded-full opacity-50 group-hover:opacity-70 transition-opacity"
            style={{ background: "radial-gradient(circle, rgba(255, 182, 193, 0.4) 0%, transparent 70%)" }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <motion.div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)"
                }}
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <MapPin className="w-7 h-7" style={{ color: "#db2777" }} />
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                  style={{ opacity: 0.3 }}
                />
              </motion.div>
              <h4 className="text-xl font-semibold" style={{ color: "#4a6b8a" }}>Dia Diem</h4>
            </div>

            <div className="space-y-4">
              {/* Venue display */}
              <motion.div 
                className="rounded-2xl p-5"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,251,255,0.8))",
                  boxShadow: "inset 0 2px 0 rgba(255,255,255,1), 0 4px 12px rgba(255, 182, 193, 0.1)"
                }}
              >
                <p className="font-semibold text-lg mb-2" style={{ color: "#db2777" }}>{venue}</p>
                <p className="text-sm" style={{ color: "#6b8cae" }}>{address}</p>
              </motion.div>

              {/* Maps button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  asChild
                  className="w-full h-14 rounded-2xl text-base font-semibold text-white border-0 relative overflow-hidden group/btn"
                  style={{
                    background: "linear-gradient(135deg, #87CEEB 0%, #7EC8E3 50%, #6BB9D9 100%)",
                    boxShadow: "0 8px 32px rgba(135, 206, 235, 0.3)"
                  }}
                >
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="relative z-10">
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity"
                    />
                    <Navigation className="w-5 h-5 mr-2" />
                    Xem tren Google Maps
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
