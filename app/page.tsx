"use client"

import { useState } from "react"
import { LoadingScreen } from "@/components/invitation/loading-screen"
import { FloatingElements } from "@/components/invitation/floating-elements"
import { HeroSection } from "@/components/invitation/hero-section"
import { InvitationLetter } from "@/components/invitation/invitation-letter"
import { EventDetails } from "@/components/invitation/event-details"
import { PhotoGallery } from "@/components/invitation/photo-gallery"
import { RSVPSection } from "@/components/invitation/rsvp-section"
import { GiftingSection } from "@/components/invitation/gifting-section"
import { MusicPlayer } from "@/components/invitation/music-player"
import { Footer } from "@/components/invitation/footer"
import { motion, AnimatePresence } from "framer-motion"

// Customize these details for your invitation
const INVITATION_DATA = {
  babyName: "Bé Bột",
  parentNames: "Gia đình Tống Triệu Long - Lê Phương Anh",
  eventDate: "Chủ Nhật, 04 Thang 2, 2026",
  eventTime: "18:00 - 21:00 Tối",
  venue: "Nha Hang ABC",
  address: "123 Duong XYZ, quan abc, tp hn",
  mapsUrl: "https://maps.google.com/?q=10.7769,106.7009",
}

export default function BirthdayInvitation() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="min-h-screen relative overflow-x-hidden"
        style={{
          background: "linear-gradient(180deg, #e0f2fe 0%, #f0f9ff 20%, #fdf2f8 50%, #fef9c3 80%, #f0f9ff 100%)"
        }}
      >
        {/* Floating background elements */}
        <FloatingElements />

        {/* Content */}
        <div className="relative z-10">
          <HeroSection
            babyName={INVITATION_DATA.babyName}
            eventDate={INVITATION_DATA.eventDate}
          />

          <InvitationLetter
            babyName={INVITATION_DATA.babyName}
            parentNames={INVITATION_DATA.parentNames}
          />

          <EventDetails
            date={INVITATION_DATA.eventDate}
            time={INVITATION_DATA.eventTime}
            venue={INVITATION_DATA.venue}
            address={INVITATION_DATA.address}
            mapsUrl={INVITATION_DATA.mapsUrl}
          />

          <PhotoGallery />

          <RSVPSection />

          <GiftingSection />

          <Footer babyName={INVITATION_DATA.babyName} />
        </div>

        {/* Floating Music Player */}
        {!isLoading && <MusicPlayer />}
      </motion.main>
    </>
  )
}
