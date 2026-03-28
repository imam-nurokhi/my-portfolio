"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolio";

const categoryColors: Record<string, string> = {
  ERP: "bg-red-500/20 text-red-300 border-red-500/30",
  Automation: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Mobile: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "Internal Tools": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Branding: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "Company Profile": "bg-green-500/20 text-green-300 border-green-500/30",
};

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative glass-card rounded-2xl p-8 max-w-lg w-full border border-blue-500/20 shadow-xl shadow-blue-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Category badge */}
        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs border font-medium mb-4 ${
            categoryColors[project.category] || "bg-gray-500/20 text-gray-300 border-gray-500/30"
          }`}
        >
          {project.category}
        </span>

        <h3 className="font-playfair text-2xl font-bold text-white mb-3">{project.title}</h3>
        <p className="text-gray-400 leading-relaxed mb-6">{project.description}</p>

        {/* Architecture note */}
        <div className="glass-card rounded-xl p-4 border border-blue-500/10 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
            </svg>
            <span className="text-blue-400 text-sm font-medium">System Architecture</span>
          </div>
          <p className="text-gray-500 text-sm">
            Built with scalable, maintainable architecture following best practices for performance, security, and code quality.
          </p>
        </div>

        {/* Tech stack */}
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Technologies Used</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  onClick,
}: {
  project: (typeof projects)[0];
  onClick: () => void;
}) {
  const isLarge = project.size === "large";
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`group relative glass-card rounded-2xl p-6 border cursor-pointer overflow-hidden ${
        project.color === "blue"
          ? "border-blue-500/10 hover:border-blue-500/30"
          : "border-amber-500/10 hover:border-amber-500/30"
      } ${isLarge ? "col-span-1 md:col-span-2" : "col-span-1"}`}
    >
      {/* Hover glow */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          project.color === "blue"
            ? "bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.05)_0%,transparent_60%)]"
            : "bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.05)_0%,transparent_60%)]"
        }`}
      />

      {/* Parallax overlay effect */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 ${
          project.color === "blue" ? "bg-blue-500" : "bg-amber-500"
        }`}
      />

      <div className="relative z-10">
        {/* Category */}
        <div className="flex items-start justify-between mb-4">
          <span
            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs border font-medium ${
              categoryColors[project.category] || "bg-gray-500/20 text-gray-300 border-gray-500/30"
            }`}
          >
            {project.category}
          </span>
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ rotate: 45 }}
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.div>
        </div>

        <h3 className={`font-playfair font-bold text-white mb-3 ${isLarge ? "text-xl" : "text-base"}`}>
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-5">{project.description}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, isLarge ? 4 : 3).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-400 text-xs"
            >
              {t}
            </span>
          ))}
          {project.tech.length > (isLarge ? 4 : 3) && (
            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-500 text-xs">
              +{project.tech.length - (isLarge ? 4 : 3)} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl ${
          project.color === "blue"
            ? "bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            : "bg-gradient-to-r from-transparent via-amber-500 to-transparent"
        }`}
      />
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d1a] to-[#0a0a0f] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Project Showcase
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-400">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A selection of systems and applications I&apos;ve architected and built. Click any card for details.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={itemVariants}>
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
