"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Calendar, Users, ArrowRight, AlertCircle } from "lucide-react";
import MagneticContainer from "./MagneticContainer";

interface BookingData {
  destination: string;
  startDate: string;
  endDate: string;
  explorers: number;
}

interface BookingPanelProps {
  onSearchSubmit: (data: BookingData) => void;
}

const LUXURY_DESTINATIONS = [
  "Jai Valley Meadow, Bhadarwah",
  "Guldanda High Pass, Bhadarwah",
  "Padri Pass Alpine Meadow, Bhadarwah",
  "Chatgala Pass Mountain Road, Bhadarwah",
  "Seoj Meadow Grasslands, Bhadarwah",
];

export default function BookingPanel({ onSearchSubmit }: BookingPanelProps) {
  const [destination, setDestination] = useState("");
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [explorers, setExplorers] = useState(1);
  const [showExplorerDropdown, setShowExplorerDropdown] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const destDropdownRef = useRef<HTMLDivElement | null>(null);
  const explorerDropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdowns on outside clicks
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (destDropdownRef.current && !destDropdownRef.current.contains(target)) {
        setShowDestDropdown(false);
      }
      if (explorerDropdownRef.current && !explorerDropdownRef.current.contains(target)) {
        setShowExplorerDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!destination.trim()) {
      setError("Please choose your celestial destination.");
      return;
    }
    if (!startDate) {
      setError("Please choose an arrival date.");
      return;
    }
    if (!endDate) {
      setError("Please choose a departure date.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setError("Arrival date must precede departure date.");
      return;
    }

    onSearchSubmit({
      destination,
      startDate,
      endDate,
      explorers,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 relative z-20">
      <div className="glass-panel rounded-[24px] p-6 md:p-8 backdrop-blur-xl relative overflow-visible">
        {/* Glow border overlay */}
        <div className="absolute inset-0 border border-white/10 rounded-[24px] pointer-events-none" />
        
        {/* Ambient background glow inside panel */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />

        <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          
          {/* Destination Field */}
          <div ref={destDropdownRef} className="lg:col-span-4 relative">
            <label className="block text-xs font-bold tracking-[0.15em] text-accent-cyan uppercase mb-3">
              Destination
            </label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-accent-cyan transition-colors" />
              <input
                type="text"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setShowDestDropdown(true);
                }}
                onFocus={() => setShowDestDropdown(true)}
                placeholder="Where would you go?"
                className="w-full pl-12 pr-4 py-4 bg-white/5 rounded-xl border border-white/15 focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan text-sm placeholder-gray-500 transition-all font-medium text-white"
                data-hover="true"
                data-cursor-text="WRITE"
              />
              {showDestDropdown && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-bg-elevated border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 backdrop-blur-2xl">
                  {LUXURY_DESTINATIONS.filter((dest) =>
                    dest.toLowerCase().includes(destination.toLowerCase())
                  ).map((dest) => (
                    <button
                      key={dest}
                      type="button"
                      onClick={() => {
                        setDestination(dest);
                        setShowDestDropdown(false);
                      }}
                      className="w-full text-left px-5 py-3.5 text-xs font-semibold text-gray-300 hover:bg-white/5 hover:text-accent-cyan border-b border-white/5 last:border-b-0 transition-colors"
                    >
                      {dest}
                    </button>
                  ))}
                  {LUXURY_DESTINATIONS.filter((dest) =>
                    dest.toLowerCase().includes(destination.toLowerCase())
                  ).length === 0 && (
                    <div className="px-5 py-3.5 text-xs text-gray-500 font-medium italic">
                      No matching portals found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Dates Fields */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold tracking-[0.15em] text-accent-cyan uppercase mb-3">
                Timeline In
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-4 bg-white/5 rounded-xl border border-white/15 focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan text-xs font-medium text-white transition-all appearance-none"
                  data-hover="true"
                  data-cursor-text="DATE"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold tracking-[0.15em] text-accent-cyan uppercase mb-3">
                Timeline Out
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-4 bg-white/5 rounded-xl border border-white/15 focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan text-xs font-medium text-white transition-all appearance-none"
                  data-hover="true"
                  data-cursor-text="DATE"
                />
              </div>
            </div>
          </div>

          {/* Explorers Field */}
          <div ref={explorerDropdownRef} className="lg:col-span-3 relative">
            <label className="block text-xs font-bold tracking-[0.15em] text-accent-cyan uppercase mb-3">
              Explorers
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowExplorerDropdown(!showExplorerDropdown)}
                className="w-full flex items-center justify-between px-4 py-4 bg-white/5 rounded-xl border border-white/15 hover:border-white/25 focus:border-accent-cyan focus:outline-none text-sm font-medium text-white transition-all text-left"
                data-hover="true"
                data-cursor-text="PEOPLE"
              >
                <span className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  {explorers} {explorers === 1 ? "Explorer" : "Explorers"}
                </span>
                <span className="text-[10px] text-accent-cyan font-bold tracking-widest">
                  {showExplorerDropdown ? "CLOSE" : "EDIT"}
                </span>
              </button>

              {showExplorerDropdown && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-bg-elevated border border-white/10 rounded-xl p-4 shadow-2xl z-50 backdrop-blur-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-bold text-white">Guests Count</span>
                      <span className="text-[10px] text-gray-400">Total travelers</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setExplorers(Math.max(1, explorers - 1))}
                        className="w-8 h-8 rounded-full border border-white/10 hover:border-accent-cyan flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                        data-hover="true"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold text-white w-6 text-center">
                        {explorers}
                      </span>
                      <button
                        type="button"
                        onClick={() => setExplorers(Math.min(10, explorers + 1))}
                        className="w-8 h-8 rounded-full border border-white/10 hover:border-accent-cyan flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                        data-hover="true"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </form>

        {/* Validation Error Message */}
        {error && (
          <div className="mt-5 flex items-center gap-2 text-rose-500 text-xs font-semibold px-2 animate-fade-in">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Floating Search Action */}
        <div className="mt-8 flex justify-end">
          <MagneticContainer>
            <button
              onClick={handleSubmit}
              className="shimmer-btn px-8 py-4.5 bg-gradient-to-r from-accent-indigo via-accent-purple to-accent-cyan text-white text-xs font-bold tracking-[0.2em] rounded-xl flex items-center gap-3 transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(255,51,68,0.4)] shadow-md"
              data-hover="true"
              data-cursor-text="LAUNCH"
            >
              INITIATE SEARCH
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </MagneticContainer>
        </div>
      </div>
    </div>
  );
}
