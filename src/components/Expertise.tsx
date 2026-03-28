"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { expertise, techStack } from "@/data/portfolio";

const expertiseIcons: Record<string, React.ReactNode> = {
  architecture: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  code: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  erp: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
    </svg>
  ),
  qa: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
};

const categoryColors: Record<string, string> = {
  Frontend: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Backend: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Language: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Mobile: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Database: "bg-green-500/20 text-green-300 border-green-500/30",
  DevOps: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Cloud: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  ERP: "bg-red-500/20 text-red-300 border-red-500/30",
  CMS: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Architecture: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function TechCard({ tech }: { tech: (typeof techStack)[0] }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative glass-card rounded-xl p-4 cursor-default flex flex-col items-center gap-2 text-center border border-transparent hover:border-blue-500/20 transition-colors"
    >
      <div
        className={`px-2 py-0.5 rounded-full text-xs border ${categoryColors[tech.category] || "bg-gray-500/20 text-gray-300 border-gray-500/30"}`}
      >
        {tech.category}
      </div>
      <div className="font-semibold text-white text-sm">{tech.name}</div>
      <div className="text-gray-500 text-xs">{tech.years}y exp.</div>

      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 bg-gray-900 border border-blue-500/30 text-blue-300 text-xs px-2 py-1 rounded-md whitespace-nowrap">
        {tech.years} years experience
      </div>
    </motion.div>
  );
}

export default function Expertise() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="expertise" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d1a] to-[#0a0a0f] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Expertise & Tech Stack
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-400">Expertise</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From system architecture to clean code delivery—combining strategic thinking with hands-on technical execution.
          </p>
        </motion.div>

        {/* Core Expertise Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {expertise.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`relative glass-card rounded-2xl p-6 border transition-all duration-300 ${
                item.color === "blue"
                  ? "border-blue-500/10 hover:border-blue-500/30"
                  : "border-amber-500/10 hover:border-amber-500/30"
              }`}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                  item.color === "blue"
                    ? "bg-blue-500/15 text-blue-400"
                    : "bg-amber-500/15 text-amber-400"
                }`}
              >
                {expertiseIcons[item.icon]}
              </div>

              <h3 className="font-semibold text-white text-lg mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>

              {/* Accent */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl ${
                  item.color === "blue"
                    ? "bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
                    : "bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
                }`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-center font-playfair text-2xl font-bold text-white mb-10">
            Technology <span className="text-blue-400">Arsenal</span>
          </h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3"
          >
            {techStack.map((tech) => (
              <TechCard key={tech.name} tech={tech} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
