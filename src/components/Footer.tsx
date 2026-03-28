"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

function DigitalSignature() {
  return (
    <motion.svg
      width="200"
      height="60"
      viewBox="0 0 200 60"
      className="text-blue-400/60"
      fill="none"
    >
      <motion.path
        d="M10 40 Q 30 10, 50 35 Q 70 60, 90 30 Q 110 5, 130 30 Q 145 45, 160 25 Q 170 15, 190 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 },
          opacity: { duration: 0.5 },
        }}
      />
      <motion.circle
        cx="190"
        cy="20"
        r="2"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 1] }}
        transition={{ delay: 2.5, duration: 0.4 }}
      />
    </motion.svg>
  );
}

function SystemStatus() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Jakarta",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-green-500/5 border border-green-500/20 text-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      <span className="text-green-400 font-medium">System Status: Optimal</span>
      {time && (
        <span className="text-gray-600 font-mono text-xs">
          WIB {time}
        </span>
      )}
    </div>
  );
}

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#expertise", label: "Expertise" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-blue-500/10 bg-[#0a0a0f] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_center,rgba(59,130,246,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-amber-500 flex items-center justify-center text-white font-bold font-playfair">
                IN
              </div>
              <div>
                <div className="font-playfair font-bold text-white">Imam Nurokhi</div>
                <div className="text-gray-500 text-xs">Senior Programmer & IT Architect</div>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Building scalable digital solutions with clean architecture and exceptional user experience.
            </p>
            <DigitalSignature />
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-gray-300 font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-blue-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-blue-400 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-gray-300 font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-400 text-sm transition-colors group"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {personalInfo.email}
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-400 text-sm transition-colors"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {personalInfo.phone}
              </a>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {personalInfo.location}
              </div>

              <div className="pt-2">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#0a66c2]/30 hover:border-[#0a66c2]/60 bg-[#0a66c2]/5 hover:bg-[#0a66c2]/15 text-[#0a66c2] text-sm font-medium transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {currentYear} Muhammad Imam Nurokhi. All rights reserved.
          </p>
          <SystemStatus />
          <p className="text-gray-700 text-xs">
            Built with Next.js 15 & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
