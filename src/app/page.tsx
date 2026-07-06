"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Mail,
  Send,
  Menu,
  Volume2,
  VolumeX,
  User,
} from "lucide-react";

import CustomCursor from "@/components/CustomCursor";
import CrystalCanvas from "@/components/CrystalCanvas";
import BookingPanel from "@/components/BookingPanel";
import ConfirmationModal from "@/components/ConfirmationModal";
import MagneticContainer from "@/components/MagneticContainer";

interface BookingData {
  destination: string;
  startDate: string;
  endDate: string;
  explorers: number;
}

export default function Home() {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const handleSearchSubmit = (data: BookingData) => {
    setBookingData(data);
    setIsModalOpen(true);
  };

  // Easing curves & animation presets
  const expoTransition = { duration: 1.0, ease: [0.16, 1, 0.3, 1] }; // Expo.out
  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: expoTransition,
  };

  const blurReveal = {
    initial: { opacity: 0, filter: "blur(12px)", y: 30 },
    whileInView: { opacity: 1, filter: "blur(0px)", y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  };

  // Luxury Testimonials
  const testimonials = [
    {
      quote: "Rentaride redefined our mountain trip. Renting a premium scooter to explore Jai Valley and Guldanda was the best decision. The ride was exceptionally smooth, safe, and absolute fun!",
      author: "Elena Vance",
      role: "Mumbai Voyager & Creator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
      video: "/videos/testimonial-1.mp4",
    },
    {
      quote: "Breathtaking trails, winding roads, and the absolute freedom of riding a bike through Mini Kashmir's passes. Flawless service and top-notch bikes. Highly recommended for adventure seekers!",
      author: "Marcus Drake",
      role: "Jhansi Adventurer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      video: "/videos/testimonial-2.mp4",
    },
    {
      quote: "The best way to experience Bhadarwah is on two wheels. Rentaride gave us reliable machines that conquered Guldanda and Padri Pass effortlessly. The customer support was top-tier.",
      author: "Sir Julian Cross",
      role: "Lalitpur Rider & Explorer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
      video: "/videos/testimonial-3.mp4",
    },
  ];

  // Pricing packages removed

  // FAQ List
  const faqs = [
    {
      question: "How do I access my private chalet portal?",
      answer: "Once your booking is verified in Phase 5, your private concierge sends a secure cryptographic lock directly to your device via WhatsApp/Email. This key syncs with our localized orbital transport grids for seamless access.",
    },
    {
      question: "What safety locks and encryption protocols are used?",
      answer: "All coordinates and booking profiles are encoded using zero-knowledge quantum proofs. This guarantees that your travel vectors remain completely confidential and unreachable by unauthorized entities.",
    },
    {
      question: "Is there private helicopter transit included?",
      answer: "Yes, our Elite and Ultimate tiers (Alpine Lodge and Celestial Chalet) include custom rotor transit vectors from designated coordinates directly into the mountains, skipping standard checks.",
    },
    {
      question: "Can I change my schedule lock post-booking?",
      answer: "Schedule modifications can be made through your dedicated concierge up to 48 hours prior to transit lock. Re-routing or changing destinations initiates a new Phase 4 validation.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-bg-base text-white selection:bg-accent-cyan selection:text-black radial-mesh-1">
      {/* Visual Depth Overlay Layers */}
      <CustomCursor />
      
      {/* Background Mesh Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-accent-indigo/10 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 radial-mesh-2 pointer-events-none z-0" />

      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-bg-base/30 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-1.5 select-none" data-hover="true" data-cursor-text="RENT A RIDE">
            <span className="text-sm font-black tracking-[0.05em] text-white font-sans">
              RENT
            </span>
            <svg className="w-8 h-8 text-accent-cyan fill-current" viewBox="0 0 100 100">
              <path d="M15 45 C30 35, 45 35, 52 42 C45 44, 32 40, 15 45 Z" fill="#FF3344" />
              <path d="M10 58 C25 48, 40 48, 48 55 C40 57, 25 53, 10 58 Z" fill="#FF3344" />
              <circle cx="64" cy="52" r="14" stroke="#FF3344" strokeWidth="5" fill="none" />
              <circle cx="64" cy="52" r="6" fill="#FF3344" />
              <line x1="56" y1="38" x2="51" y2="23" stroke="#FF3344" strokeWidth="5" strokeLinecap="round" />
              <line x1="66" y1="36" x2="61" y2="21" stroke="#FF3344" strokeWidth="5" strokeLinecap="round" />
            </svg>
            <span className="text-sm font-black tracking-[0.05em] text-accent-cyan font-sans">
              A
            </span>
            <span className="text-sm font-black tracking-[0.05em] text-white font-sans">
              RIDE
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {["Discover", "Explore", "Trust", "Book", "Confirm"].map((phase, idx) => (
              <a
                key={phase}
                href={`#phase-${idx + 1}`}
                className="text-xs font-bold tracking-[0.15em] text-gray-400 hover:text-accent-cyan uppercase transition-colors"
                data-hover="true"
                data-cursor-text={phase.toUpperCase()}
              >
                {phase}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <MagneticContainer>
              <a
                href="#phase-4"
                className="hidden sm:inline-flex px-5 py-2.5 rounded-lg border border-white/10 hover:border-accent-cyan bg-white/5 text-[10px] font-bold tracking-[0.15em] hover:text-accent-cyan uppercase transition-all duration-300"
                data-hover="true"
                data-cursor-text="GO"
              >
                ACCESS ESCAPE
              </a>
            </MagneticContainer>
            <button className="md:hidden p-2 text-gray-400 hover:text-white" data-hover="true">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Layout */}
      <main className="relative z-10">
        
        {/* SECTION 1: HERO (100vh) */}
        <section
          id="phase-1"
          className="relative min-h-screen flex items-center pt-20 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column (Text & Intros) */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="lg:col-span-6 z-10 flex flex-col justify-center"
            >
              <motion.span
                variants={blurReveal}
                className="text-xs font-bold tracking-[0.3em] text-accent-cyan uppercase mb-6 block"
              >
                PHASE 1: DISCOVER THE FUTURE
              </motion.span>
              <motion.h1
                variants={blurReveal}
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.04em] leading-[1.05] mb-6 text-white"
              >
                Immersive luxury <br />
                escapes for the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-indigo to-accent-purple">
                  elite explorer.
                </span>
              </motion.h1>
              <motion.p
                variants={blurReveal}
                className="text-sm md:text-base text-gray-400 font-medium leading-relaxed max-w-lg mb-10"
              >
                Step beyond conventional boundaries. Rentaride orchestrates high-refraction travel coordinates, connecting you to isolated, private alpine chalet systems and twilight auroras.
              </motion.p>
              <motion.div variants={blurReveal} className="flex flex-wrap gap-4">
                <MagneticContainer>
                  <a
                    href="#phase-4"
                    className="shimmer-btn px-7 py-4 bg-gradient-to-r from-accent-indigo via-accent-purple to-accent-cyan text-white text-xs font-bold tracking-[0.15em] rounded-xl hover:shadow-[0_0_20px_rgba(255,51,68,0.35)] transition-shadow"
                    data-hover="true"
                    data-cursor-text="BOOK"
                  >
                    BOOK ESCAPE NOW
                  </a>
                </MagneticContainer>
                <MagneticContainer>
                  <a
                    href="#phase-2"
                    className="px-7 py-4 border border-white/10 hover:border-white/20 bg-white/5 rounded-xl text-xs font-bold tracking-[0.15em] text-gray-300 hover:text-white transition-all flex items-center gap-2"
                    data-hover="true"
                    data-cursor-text="EXPLORE"
                  >
                    EXPLORE PORTALS
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </MagneticContainer>
              </motion.div>
            </motion.div>

            {/* Right Column (3D Interactive Canvas) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex items-center justify-center relative min-h-[400px]"
            >
              <CrystalCanvas />
            </motion.div>

          </div>

          {/* Bottom Fade gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-mid to-transparent pointer-events-none" />
        </section>

        {/* SECTION 2: FEATURED DESTINATIONS */}
        <section
          id="phase-2"
          className="py-32 bg-bg-mid relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6">
            
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="max-w-3xl mb-20"
            >
              <span className="text-xs font-bold tracking-[0.3em] text-accent-purple uppercase mb-4 block">
                PHASE 2: EXPLORE NEW REALMS
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em] leading-tight mb-4">
                Cinematic Portals to Pristine Isolation
              </h2>
              <p className="text-sm text-gray-400 max-w-xl">
                Experience high-altitude sanctuary systems tucked away from the digital grid. Select your coordinates and step into breathtaking, untouched visual layers.
              </p>
            </motion.div>

            {/* Horizontal Split Portals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Destination Card 1 */}
              <motion.div
                id="portal-jai-valley"
                variants={fadeUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="group relative h-[480px] rounded-[24px] overflow-hidden border border-white/15 glass-panel-hoverable flex flex-col justify-end p-8"
                data-hover="true"
                data-cursor-text="VALLEY"
              >
                {/* Image Background */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
                  style={{
                    backgroundImage: `url('/images/jaivalleysceneryview.jpg')`,
                  }}
                />
                
                {/* Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
                <div className="absolute inset-0 bg-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

                {/* Content */}
                <div className="relative z-20">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest text-accent-cyan uppercase">
                        JAI VALLEY, BHADARWAH
                      </span>
                      <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
                        Lush Green Meadow Portal
                      </h3>
                    </div>
                    <span className="text-sm font-bold text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 px-3 py-1 rounded-full uppercase tracking-widest text-[9px]">
                      VALLEY SEC
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed max-w-sm mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                    An alpine meadow bisected by the crystal-clear waters of the Jai Nallah stream, surrounded by ancient deodar and pine forests.
                  </p>
                  <a href="#phase-4" className="inline-flex items-center gap-2 text-xs font-bold text-accent-cyan tracking-wider hover:text-white transition-colors">
                    ACQUIRE ESCAPE KEY
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>

              {/* Destination Card 2 */}
              <motion.div
                id="portal-guldanda"
                variants={fadeUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="group relative h-[480px] rounded-[24px] overflow-hidden border border-white/15 glass-panel-hoverable flex flex-col justify-end p-8"
                data-hover="true"
                data-cursor-text="MEADOW"
              >
                {/* Image Background */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
                  style={{
                    backgroundImage: `url('/images/guldanda.jpg')`,
                  }}
                />
                
                {/* Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
                <div className="absolute inset-0 bg-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

                {/* Content */}
                <div className="relative z-20">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest text-accent-purple uppercase">
                        GULDANDA, BHADARWAH
                      </span>
                      <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
                        High-Altitude Meadow Pass
                      </h3>
                    </div>
                    <span className="text-sm font-bold text-accent-purple bg-accent-purple/10 border border-accent-purple/20 px-3 py-1 rounded-full uppercase tracking-widest text-[9px]">
                      HIGH PASS
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed max-w-sm mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                    Perched at nearly 10,000 feet, this high-altitude meadow transforms from a lush emerald pasture in summer into a snow-covered wonderland.
                  </p>
                  <a href="#phase-4" className="inline-flex items-center gap-2 text-xs font-bold text-accent-purple tracking-wider hover:text-white transition-colors">
                    ACQUIRE ESCAPE KEY
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* SECTION 3: THE BOOKING PANEL (THE CENTERPIECE) */}
        <section
          id="phase-4"
          className="py-32 bg-bg-elevated relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-bg-mid to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <span className="text-xs font-bold tracking-[0.3em] text-accent-cyan uppercase mb-4 block">
                PHASE 4: BOOK YOUR ESCAPE
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em] leading-tight mb-4">
                Initiate Portal Connection
              </h2>
              <p className="text-sm text-gray-400">
                Provide your travel details to calculate coordinates, lock dates, and verify security protocols.
              </p>
            </motion.div>

            {/* The Booking Centerpiece Panel */}
            <BookingPanel onSearchSubmit={handleSearchSubmit} />

          </div>
        </section>

        {/* SECTION 4: POPULAR EXPERIENCES */}
        <section
          id="popular-experiences"
          className="py-32 bg-bg-mid relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6">
            
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="max-w-3xl mb-20"
            >
              <span className="text-xs font-bold tracking-[0.3em] text-accent-purple uppercase mb-4 block">
                EXPERIENCES
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em] leading-tight mb-4">
                Unique Travel Architectures
              </h2>
              <p className="text-sm text-gray-400 max-w-xl">
                Discover bespoke modes of luxury vacationing that challenge conventional boundaries, featuring aurora-facing glass walls and high-end retreats.
              </p>
            </motion.div>

            {/* Experiences Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Card 1 */}
              <motion.div
                id="portal-padri-pass"
                variants={fadeUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="group glass-panel rounded-3xl p-6 border border-white/5 hover:border-accent-cyan/30 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between h-[450px]"
                data-hover="true"
                data-cursor-text="AURORA"
              >
                <div>
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('/images/padri-valley.jpg')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <span className="text-[10px] font-bold text-accent-cyan tracking-widest uppercase">
                    PADRI PASS, BHADARWAH
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1.5 mb-3 group-hover:text-accent-cyan transition-colors">
                    Padri Alpine Meadow
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Vast rolling green pastures situated at an elevation of 9,900 feet, offering spectacular views and paragliding escape options.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-white">CONCIERGE ACCESS</span>
                  <span className="text-[10px] font-bold text-accent-cyan tracking-widest uppercase">
                    VIEW DETAILS →
                  </span>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                id="portal-seoj-meadow"
                variants={fadeUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="group glass-panel rounded-3xl p-6 border border-white/5 hover:border-accent-purple/30 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between h-[450px]"
                data-hover="true"
                data-cursor-text="GLACIER"
              >
                <div>
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('https://cvsqtgaxsa.cloudimg.io/https://images.prismic.io/indiahike/6ed54cec-2f3a-4fa0-a65a-06b9dfd36552_Seoj+Dhar+meadows+-+Indiahikes+-+Dhaval+Jajal.jpg?w=828&h=466&q=50&org_if_sml=1')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <span className="text-[10px] font-bold text-accent-purple tracking-widest uppercase">
                    SEOJ MEADOW, BHADARWAH
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1.5 mb-3 group-hover:text-accent-purple transition-colors">
                    Seoj Highland Grasslands
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Sprawling flat pastures that resemble a diamond crown, surrounded by snow-clad peaks and winding glacial creeks.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-white">ELITE SECTOR LOCK</span>
                  <span className="text-[10px] font-bold text-accent-purple tracking-widest uppercase">
                    VIEW DETAILS →
                  </span>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                variants={fadeUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="group glass-panel rounded-3xl p-6 border border-white/5 hover:border-accent-indigo/30 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between h-[450px]"
                data-hover="true"
                data-cursor-text="GEOTHERM"
              >
                <div>
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('/images/jaivalleysceneryview.jpg')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <span className="text-[10px] font-bold text-accent-indigo tracking-widest uppercase">
                    JAI VALLEY, BHADARWAH
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1.5 mb-3 group-hover:text-accent-indigo transition-colors">
                    Jai Valley Meadow
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Lush green meadows flanking the Jai Nallah stream, with pine forest trails offering absolute peace and majestic vistas.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-white">PRIVATE SECURE GRID</span>
                  <span className="text-[10px] font-bold text-accent-indigo tracking-widest uppercase">
                    VIEW DETAILS →
                  </span>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* SECTION 5: WHY CHOOSE US */}
        <section
          id="phase-3"
          className="py-32 bg-bg-base relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left text */}
              <motion.div
                variants={fadeUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="lg:col-span-5"
              >
                <span className="text-xs font-bold tracking-[0.3em] text-accent-cyan uppercase mb-4 block">
                  PHASE 3: ESTABLISH TRUST
                </span>
                <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em] leading-tight mb-6">
                  Technological Security & Elite Comfort
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed mb-8">
                  We build architectural locks that blend deep wilderness with future infrastructure. Every step is highly encrypted, ensuring complete solitude and absolute tranquility.
                </p>

                {/* Small indicator stats */}
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                  <div>
                    <span className="block text-2xl font-black text-white">0%</span>
                    <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      SIGNAL PENETRATION
                    </span>
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-white">100%</span>
                    <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      SOLITUDE ASSURANCE
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right Checklist */}
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="lg:col-span-7 space-y-6"
              >
                {/* Item 1 */}
                <motion.div
                  variants={fadeUp}
                  className="group flex gap-6 p-6 glass-panel rounded-2xl border border-white/5 hover:border-accent-cyan/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan transition-transform duration-500 group-hover:rotate-[360deg]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-2">
                      Zero-Knowledge Quantum Lock
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Your coordinates are generated client-side, encrypted, and parsed dynamically. Zero risk of digital data leaks.
                    </p>
                  </div>
                </motion.div>

                {/* Item 2 */}
                <motion.div
                  variants={fadeUp}
                  className="group flex gap-6 p-6 glass-panel rounded-2xl border border-white/5 hover:border-accent-purple/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple transition-transform duration-500 group-hover:rotate-[360deg]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-2">
                      Supersonic Transit Routing
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Custom jet and helicopter locks from major terminals straight into mountain helipads, skipping standard logistics lines.
                    </p>
                  </div>
                </motion.div>

                {/* Item 3 */}
                <motion.div
                  variants={fadeUp}
                  className="group flex gap-6 p-6 glass-panel rounded-2xl border border-white/5 hover:border-accent-indigo/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-indigo/10 border border-accent-indigo/20 flex items-center justify-center text-accent-indigo transition-transform duration-500 group-hover:rotate-[360deg]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-2">
                      Smart Refractive Architecture
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Chalet structures built with dynamic liquid-crystal smart panels that blend into the snowy topography or mist.
                    </p>
                  </div>
                </motion.div>

              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 6: TESTIMONIALS */}
        <section
          id="testimonials"
          className="py-32 bg-bg-mid relative overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Testimonial details & navigation */}
              <div className="lg:col-span-7 flex flex-col justify-center text-left">
                <span className="text-xs font-bold tracking-[0.3em] text-accent-purple uppercase mb-6 block">
                  LUXURY TESTIMONIALS
                </span>

                {/* Testimonial Quote slider */}
                <div className="min-h-[220px] md:min-h-[160px] flex items-center">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.6 }}
                    className="w-full"
                  >
                    <blockquote className="text-lg md:text-xl font-medium tracking-tight text-white leading-relaxed italic mb-8">
                      "{testimonials[activeTestimonial].quote}"
                    </blockquote>
                    
                    <h4 className="text-xs font-bold tracking-[0.2em] text-accent-cyan uppercase mb-1">
                      {testimonials[activeTestimonial].author}
                    </h4>
                    <p className="text-[10px] text-gray-400 tracking-wider">
                      {testimonials[activeTestimonial].role}
                    </p>
                  </motion.div>
                </div>

                {/* Minimalist Avatar Icon Controls with Numbering */}
                <div className="flex items-center gap-6 mt-10">
                  {testimonials.map((t, idx) => (
                    <button
                      key={t.author}
                      onClick={() => setActiveTestimonial(idx)}
                      className={`w-12 h-12 rounded-full relative flex items-center justify-center border transition-all duration-300 ${
                        activeTestimonial === idx
                          ? "bg-accent-cyan/10 border-accent-cyan text-accent-cyan scale-110 shadow-[0_0_15px_rgba(255,51,68,0.25)]"
                          : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                      }`}
                      data-hover="true"
                      data-cursor-text={t.author.split(" ")[0].toUpperCase()}
                    >
                      {/* Minimalist User Silhouette Icon */}
                      <User className="w-5 h-5" />
                      
                      {/* Floating Number Badge */}
                      <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black border border-bg-mid shadow-lg z-10 transition-colors duration-300 ${
                        activeTestimonial === idx
                          ? "bg-accent-cyan text-black"
                          : "bg-white/15 text-white"
                      }`}>
                        {idx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Premium Video Player */}
              <div className="lg:col-span-5 flex justify-center">
                <div 
                  className="w-full max-w-[280px] sm:max-w-[300px] aspect-[9/16] relative rounded-[28px] overflow-hidden border border-white/10 glass-panel shadow-[0_24px_50px_rgba(0,0,0,0.5)] group"
                  data-hover="true"
                  data-cursor-text={isMuted ? "UNMUTE" : "MUTE"}
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {/* Subtle video background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 z-10 pointer-events-none" />

                  {/* Video Element */}
                  <video
                    key={activeTestimonial}
                    src={testimonials[activeTestimonial].video}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover select-none pointer-events-none relative z-0"
                  />

                  {/* Mute Overlay Button */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all group-hover:scale-110">
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-gray-300" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-accent-cyan animate-pulse" />
                      )}
                    </div>
                  </div>

                  {/* Live Indicator Badge */}
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
                    <span className="text-[8px] font-black tracking-widest text-white uppercase leading-none pl-[0.1em]">
                      REEL LOG
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 7: PRICING PACKAGES REMOVED */}

        {/* SECTION 8: FAQ ACCORDION */}
        <section
          id="faq"
          className="py-32 bg-bg-mid relative overflow-hidden"
        >
          <div className="max-w-3xl mx-auto px-6">
            
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="text-xs font-bold tracking-[0.3em] text-accent-purple uppercase mb-4 block">
                FAQ PORTALS
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em] leading-tight mb-4">
                Frequently Answered Inquiries
              </h2>
              <p className="text-sm text-gray-400">
                Unlock common details regarding transit clearance, coordinate generation, and security protocols.
              </p>
            </motion.div>

            {/* Accordion List */}
            <div className="space-y-4 border-t border-white/10">
              {faqs.map((faq, idx) => (
                <div
                  key={faq.question}
                  className="border-b border-white/10"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between py-6 text-left hover:text-accent-cyan transition-colors"
                    data-hover="true"
                    data-cursor-text={activeFaq === idx ? "CLOSE" : "OPEN"}
                  >
                    <span className="text-xs sm:text-sm font-bold text-white hover:text-accent-cyan transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-500 ${
                        activeFaq === idx ? "rotate-180 text-accent-cyan" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      activeFaq === idx ? "max-h-[200px] pb-6" : "max-h-0"
                    }`}
                  >
                    <p className="text-xs text-gray-400 leading-relaxed max-w-2xl">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SECTION 9: FOOTER */}
        <footer
          id="phase-5"
          className="bg-bg-base border-t border-white/5 py-24 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
              
              {/* Column 1: Brand */}
              <div className="md:col-span-5 space-y-6">
                <div className="flex items-center gap-1.5 select-none" data-hover="true" data-cursor-text="RENT A RIDE">
                  <span className="text-xs font-black tracking-[0.05em] text-white font-sans">
                    RENT
                  </span>
                  <svg className="w-6 h-6 text-accent-cyan fill-current" viewBox="0 0 100 100">
                    <path d="M15 45 C30 35, 45 35, 52 42 C45 44, 32 40, 15 45 Z" fill="#FF3344" />
                    <path d="M10 58 C25 48, 40 48, 48 55 C40 57, 25 53, 10 58 Z" fill="#FF3344" />
                    <circle cx="64" cy="52" r="14" stroke="#FF3344" strokeWidth="5" fill="none" />
                    <circle cx="64" cy="52" r="6" fill="#FF3344" />
                    <line x1="56" y1="38" x2="51" y2="23" stroke="#FF3344" strokeWidth="5" strokeLinecap="round" />
                    <line x1="66" y1="36" x2="61" y2="21" stroke="#FF3344" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                  <span className="text-xs font-black tracking-[0.05em] text-accent-cyan font-sans">
                    A
                  </span>
                  <span className="text-xs font-black tracking-[0.05em] text-white font-sans">
                    RIDE
                  </span>
                </div>
                
                <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                  Connecting luxury travelers with pristine physical coordinates via secure zero-knowledge booking engines. Designed for ultimate solitude.
                </p>

                <div className="flex items-center gap-4">
                  <a href="#" className="w-8 h-8 rounded-lg border border-white/5 bg-white/5 flex items-center justify-center text-gray-400 hover:text-accent-cyan transition-colors" data-hover="true">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-lg border border-white/5 bg-white/5 flex items-center justify-center text-gray-400 hover:text-accent-cyan transition-colors" data-hover="true">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-lg border border-white/5 bg-white/5 flex items-center justify-center text-gray-400 hover:text-accent-cyan transition-colors" data-hover="true">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Column 2: Navigation Links */}
              <div className="md:col-span-3 grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest text-accent-cyan uppercase mb-4">
                    PHASES
                  </h4>
                  <ul className="space-y-3">
                    {["Discover", "Explore", "Trust", "Book", "Confirm"].map((phase, idx) => (
                      <li key={phase}>
                        <a href={`#phase-${idx + 1}`} className="text-xs text-gray-400 hover:text-white transition-colors" data-hover="true">
                          {phase}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest text-accent-purple uppercase mb-4">
                    PORTALS
                  </h4>
                  <ul className="space-y-3">
                    {[
                      { name: "Jai Valley", target: "#portal-jai-valley" },
                      { name: "Guldanda", target: "#portal-guldanda" },
                      { name: "Padri Pass", target: "#portal-padri-pass" },
                      { name: "Chatgala Pass", target: "#phase-4" },
                      { name: "Seoj Meadow", target: "#portal-seoj-meadow" }
                    ].map((port) => (
                      <li key={port.name}>
                        <a href={port.target} className="text-xs text-gray-400 hover:text-white transition-colors" data-hover="true">
                          {port.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Column 3: Newsletter Sign-up */}
              <div className="md:col-span-4 space-y-4">
                <h4 className="text-[10px] font-bold tracking-widest text-white uppercase">
                  SUBSCRIBE TO CONCIERGE LOGS
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Receive secret coordinate updates and scheduling openings directly to your inbox.
                </p>

                <div className="relative flex items-center group">
                  <Mail className="absolute left-4 w-4 h-4 text-gray-500 group-focus-within:text-accent-cyan transition-colors" />
                  <input
                    type="email"
                    placeholder="Enter secure email"
                    className="w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent-cyan text-xs transition-all text-white placeholder-gray-500"
                    data-hover="true"
                    data-cursor-text="EMAIL"
                  />
                  <button
                    className="absolute right-2 p-2 bg-gradient-to-tr from-accent-indigo to-accent-purple hover:shadow-[0_0_10px_rgba(220,38,36,0.4)] text-white rounded-lg transition-all"
                    data-hover="true"
                    data-cursor-text="SUBMIT"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Legal text */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[10px] text-gray-500 gap-4">
              <span>
                © 2026 RENTARIDE ESCAPES INC. ALL PHYSICAL AND DIGITAL CODES PROTECTED.
              </span>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-white transition-colors" data-hover="true">
                  PRIVACY PROTOCOLS
                </a>
                <a href="#" className="hover:text-white transition-colors" data-hover="true">
                  COORDINATE LICENSE
                </a>
              </div>
            </div>
          </div>
        </footer>

      </main>

      {/* Confirmation Modal overlay */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingData={bookingData}
      />
    </div>
  );
}
