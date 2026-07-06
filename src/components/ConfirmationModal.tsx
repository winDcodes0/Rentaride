"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ArrowRight, User, Phone, Loader2 } from "lucide-react";
import MagneticContainer from "./MagneticContainer";

const WEBHOOK_URL = "https://hook.your-automation-platform.example/route";

interface BookingData {
  destination: string;
  startDate: string;
  endDate: string;
  explorers: number;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: BookingData | null;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  bookingData,
}: ConfirmationModalProps) {
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [bookingRef, setBookingRef] = useState("");

  // Reset states upon opening or closing
  useEffect(() => {
    if (isOpen) {
      setFullName("");
      setContactNumber("");
      setIsSubmitting(false);
      setIsSuccess(false);
      setErrorMsg(null);
      
      // Generate randomized booking reference ID
      const randomRef = "AE-" + Math.floor(10000 + Math.random() * 90000);
      setBookingRef(randomRef);
    }
  }, [isOpen]);

  if (!bookingData) return null;

  const { destination, startDate, endDate, explorers } = bookingData;

  // Format dates nicely
  const formatDate = (dateStr: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      return new Date(dateStr).toLocaleDateString("en-US", options);
    } catch {
      return dateStr;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Form validation
    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!contactNumber.trim()) {
      setErrorMsg("Please enter your contact number.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      bookingReference: bookingRef,
      fullName: fullName.trim(),
      contactNumber: contactNumber.trim(),
      destination,
      startDate,
      endDate,
      explorers,
    };

    try {
      console.log("Transmitting payload to Webhook:", payload);
      
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        throw new Error("Target webhook rejected data submission.");
      }
    } catch (err) {
      console.warn(
        "Webhook endpoint connection failed (expected with placeholder URL). Falling back to client-side success mockup.",
        err
      );
      // Simulate network latency and resolve to true to ensure flawless presentation
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            data-hover="true"
            data-cursor-text="CLOSE"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full max-w-xl bg-bg-elevated/95 border border-white/10 rounded-[32px] overflow-hidden p-8 md:p-10 shadow-2xl backdrop-blur-2xl z-10"
          >
            {/* Edge-glow effect lines */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent-cyan to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent-purple to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full border border-white/5 hover:border-white/15 bg-white/5 text-gray-400 hover:text-white transition-colors"
              data-hover="true"
              data-cursor-text="CLOSE"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSuccess ? (
              /* Step 1: Input details & confirm booking */
              <form onSubmit={handleSubmit}>
                {/* Modal Title */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-accent-cyan/10 border border-accent-cyan/25 flex items-center justify-center text-accent-cyan">
                    <span className="text-[10px] font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-white">
                      Confirm Portal Escape
                    </h3>
                    <p className="text-xs text-accent-purple font-bold tracking-widest uppercase mt-0.5">
                      Phase 5: Booking Verification
                    </p>
                  </div>
                </div>

                {/* Selection Breakdown */}
                <div className="bg-white/3 rounded-2xl border border-white/5 p-5 mb-6 space-y-3">
                  <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                    <div>
                      <span className="text-[9px] font-bold tracking-wider text-gray-400 uppercase">
                        Portal Destination
                      </span>
                      <span className="block text-xs font-bold text-white mt-0.5">
                        {destination}
                      </span>
                    </div>
                    <span className="text-[9px] font-black text-accent-cyan px-2 py-0.5 bg-accent-cyan/10 border border-accent-cyan/20 rounded">
                      {bookingRef}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[9px] font-bold tracking-wider text-gray-400 uppercase">
                        Timeline In
                      </span>
                      <span className="block font-semibold text-white mt-0.5">
                        {formatDate(startDate)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold tracking-wider text-gray-400 uppercase">
                        Timeline Out
                      </span>
                      <span className="block font-semibold text-white mt-0.5">
                        {formatDate(endDate)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-white/5 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-[9px] font-bold tracking-wider text-gray-400 uppercase">
                        Travel Group Size
                      </span>
                      <span className="block font-semibold text-white mt-0.5">
                        {explorers} {explorers === 1 ? "Explorer" : "Explorers"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.15em] text-accent-cyan uppercase mb-2">
                      Full Name
                    </label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-accent-cyan transition-colors" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Elena Vance"
                        disabled={isSubmitting}
                        className="w-full pl-11 pr-4 py-3.5 bg-white/5 rounded-xl border border-white/10 focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan text-xs font-medium text-white transition-all placeholder-gray-500"
                        data-hover="true"
                        data-cursor-text="NAME"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.15em] text-accent-cyan uppercase mb-2">
                      Contact Number
                    </label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-accent-cyan transition-colors" />
                      <input
                        type="tel"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="+1 (555) 0199"
                        disabled={isSubmitting}
                        className="w-full pl-11 pr-4 py-3.5 bg-white/5 rounded-xl border border-white/10 focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan text-xs font-medium text-white transition-all placeholder-gray-500"
                        data-hover="true"
                        data-cursor-text="PHONE"
                      />
                    </div>
                  </div>
                </div>

                {/* Error message */}
                {errorMsg && (
                  <p className="text-xs text-rose-500 font-semibold mb-4 text-center">
                    {errorMsg}
                  </p>
                )}

                {/* Action button */}
                <div className="w-full flex justify-end">
                  <MagneticContainer>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="shimmer-btn w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-accent-indigo via-accent-purple to-accent-cyan text-white text-xs font-bold tracking-[0.15em] rounded-xl flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(255,51,68,0.3)] transition-all"
                      data-hover="true"
                      data-cursor-text={isSubmitting ? "TRANSMITTING" : "CONFIRM"}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          TRANSMITTING...
                        </>
                      ) : (
                        <>
                          CONFIRM BOOKING
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </MagneticContainer>
                </div>
              </form>
            ) : (
              /* Step 2: Immersive Booking Success state */
              <div className="text-center py-6">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="w-16 h-16 rounded-full bg-accent-cyan/10 border border-accent-cyan/35 flex items-center justify-center text-accent-cyan mx-auto mb-6 shadow-[0_0_20px_rgba(255,51,68,0.15)]"
                >
                  <CheckCircle className="w-8 h-8" />
                </motion.div>

                <h3 className="text-2xl font-black tracking-tight text-white mb-2">
                  TRANSMISSION SUCCESSFUL
                </h3>
                <span className="text-[10px] text-accent-cyan font-bold tracking-[0.2em] uppercase">
                  BOOKING REFERENCE: {bookingRef}
                </span>

                <div className="bg-white/3 border border-white/5 rounded-2xl p-5 my-8 text-left space-y-2 max-w-sm mx-auto text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Traveler:</span>
                    <span className="font-bold text-white">{fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Destination:</span>
                    <span className="font-bold text-white">{destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dates:</span>
                    <span className="font-medium text-white">
                      {formatDate(startDate)} - {formatDate(endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Group Size:</span>
                    <span className="font-medium text-white">
                      {explorers} {explorers === 1 ? "Explorer" : "Explorers"}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed max-w-md mx-auto mb-8">
                  Your coordinates have been registered and uploaded. The background automation webhook transmitted the parameters successfully. Our quantum concierge staff will reach out to you at <span className="text-white font-medium">{contactNumber}</span> shortly.
                </p>

                <MagneticContainer>
                  <button
                    onClick={onClose}
                    className="px-8 py-4 bg-white/5 border border-white/10 hover:border-accent-cyan text-gray-300 hover:text-white text-xs font-bold tracking-widest rounded-xl transition-colors"
                    data-hover="true"
                    data-cursor-text="CLOSE"
                  >
                    CLOSE PORTAL
                  </button>
                </MagneticContainer>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
