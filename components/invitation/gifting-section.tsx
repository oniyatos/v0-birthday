"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Gift, ChevronDown, QrCode, Copy, Check, Sparkles } from "lucide-react"
import { useState } from "react"

export function GiftingSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const bankInfo = {
    bank: "Ngan hang ABC",
    accountNumber: "1234 5678 9012",
    accountName: "NGUYEN VAN A"
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bankInfo.accountNumber.replace(/\s/g, ''))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-20 px-4">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 mb-4"
        >
          <Sparkles className="w-5 h-5" style={{ color: "#FCD34D" }} />
          <h3 
            className="text-3xl font-semibold"
            style={{ color: "#4a6b8a" }}
          >
            Gui Qua Cho Be
          </h3>
          <Sparkles className="w-5 h-5" style={{ color: "#FFB6C1" }} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="glass-card rounded-[2rem] max-w-md mx-auto overflow-hidden"
      >
        {/* Header button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-7 flex items-center justify-between transition-all duration-300"
          style={{
            background: isOpen 
              ? "linear-gradient(135deg, rgba(254, 243, 199, 0.3), rgba(253, 230, 138, 0.2))"
              : "transparent"
          }}
          whileHover={{ backgroundColor: "rgba(254, 243, 199, 0.2)" }}
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                boxShadow: "0 8px 24px rgba(251, 191, 36, 0.25)"
              }}
              animate={isOpen ? { rotate: [0, -10, 10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Gift className="w-7 h-7" style={{ color: "#d97706" }} />
            </motion.div>
            <div className="text-left">
              <h4 className="font-semibold text-lg" style={{ color: "#4a6b8a" }}>
                Mung Phat Loc
              </h4>
              <p className="text-sm" style={{ color: "#6b8cae" }}>
                Nhan de xem thong tin
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(248,251,255,0.6))"
            }}
          >
            <ChevronDown className="w-5 h-5" style={{ color: "#6b8cae" }} />
          </motion.div>
        </motion.button>

        {/* Expandable content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-7 pb-7 space-y-5">
                {/* Message */}
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                  style={{ color: "#6b8cae" }}
                >
                  Su hien dien cua quy khach la mon qua quy gia nhat. Neu muon gui tang be, xin vui long quet ma QR ben duoi:
                </motion.p>
                
                {/* QR Code */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl p-6 text-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,251,255,0.9))",
                    boxShadow: "0 8px 32px rgba(251, 191, 36, 0.15), inset 0 2px 0 rgba(255,255,255,1)"
                  }}
                >
                  <div 
                    className="w-44 h-44 mx-auto rounded-2xl flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: "white",
                      boxShadow: "inset 0 2px 8px rgba(0,0,0,0.05)"
                    }}
                  >
                    <div className="text-center">
                      <QrCode className="w-20 h-20 mx-auto mb-2" style={{ color: "#d1d5db" }} />
                      <p className="text-xs" style={{ color: "#9ca3af" }}>QR Code</p>
                    </div>
                    {/* Decorative corners */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 rounded-tl-md" style={{ borderColor: "#87CEEB" }} />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 rounded-tr-md" style={{ borderColor: "#FFB6C1" }} />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 rounded-bl-md" style={{ borderColor: "#FFF9C4" }} />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 rounded-br-md" style={{ borderColor: "#87CEEB" }} />
                  </div>
                </motion.div>

                {/* Bank info */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-2xl p-5 space-y-3"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,251,255,0.8))",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,1)"
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: "#6b8cae" }}>Ngan hang</span>
                    <span className="font-semibold" style={{ color: "#4a6b8a" }}>{bankInfo.bank}</span>
                  </div>
                  <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(135, 206, 235, 0.3), transparent)" }} />
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: "#6b8cae" }}>So tai khoan</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold font-mono" style={{ color: "#4a6b8a" }}>{bankInfo.accountNumber}</span>
                      <motion.button
                        onClick={copyToClipboard}
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          background: copied 
                            ? "linear-gradient(135deg, #d1fae5, #a7f3d0)"
                            : "linear-gradient(135deg, #e0f2fe, #bae6fd)"
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {copied ? (
                          <Check className="w-4 h-4" style={{ color: "#059669" }} />
                        ) : (
                          <Copy className="w-4 h-4" style={{ color: "#0284c7" }} />
                        )}
                      </motion.button>
                    </div>
                  </div>
                  <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(135, 206, 235, 0.3), transparent)" }} />
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: "#6b8cae" }}>Chu tai khoan</span>
                    <span className="font-semibold" style={{ color: "#4a6b8a" }}>{bankInfo.accountName}</span>
                  </div>
                </motion.div>

                {/* Thank you message */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-sm flex items-center justify-center gap-2"
                  style={{ color: "#FFB6C1" }}
                >
                  <span>Chan thanh cam on quy khach</span>
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
