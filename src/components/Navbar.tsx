"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#expertise", label: "Expertise" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["home", "expertise", "experience", "projects", "contact"];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActive(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-blue-500/10 shadow-lg shadow-blue-500/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="group flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm font-playfair">
            IN
          </div>
          <span className="font-playfair font-semibold text-white text-lg hidden sm:block">
            Imam<span className="text-blue-400"> Nurokhi</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                active === link.href.slice(1)
                  ? "text-blue-400"
                  : "text-gray-400 hover:text-gray-100"
              }`}
            >
              {active === link.href.slice(1) && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
          <a
            href="mailto:mimamnuro@gmail.com"
            className="ml-4 px-4 py-2 text-sm font-medium bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg transition-all duration-200 hover:border-blue-500/60"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-gray-300 block transition-all"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-gray-300 block"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-gray-300 block transition-all"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-blue-500/10"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active === link.href.slice(1)
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="mailto:mimamnuro@gmail.com"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-4 py-3 text-sm font-medium bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg text-center"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
