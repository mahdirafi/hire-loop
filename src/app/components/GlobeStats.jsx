"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, ChartColumn, Magnifier, Star } from "@gravity-ui/icons";

const STATS = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: ChartColumn, value: "12K", label: "Companies" },
  { icon: Magnifier, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
];

// স্ট্যাগার অ্যানিমেশন ভ্যারিয়েন্ট
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function GlobeStats() {
  return (
    <section className="relative w-full overflow-hidden !bg-black py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Scattered stars */}
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(1px_1px_at_15%_20%,white,transparent),radial-gradient(1px_1px_at_80%_15%,white,transparent),radial-gradient(1px_1px_at_92%_45%,white,transparent),radial-gradient(1px_1px_at_10%_60%,white,transparent),radial-gradient(1px_1px_at_65%_30%,white,transparent),radial-gradient(1px_1px_at_35%_50%,white,transparent),radial-gradient(1px_1px_at_50%_10%,white,transparent),radial-gradient(1px_1px_at_88%_70%,white,transparent)] [background-size:100%_100%]" />

      {/* Subtle purple-blue glow behind the globe's top edge */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/2 top-[40px] h-[140px] w-[70%] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/30 blur-[50px] sm:top-[55px] sm:h-[190px] sm:blur-[65px] md:top-[70px] md:h-[230px] md:blur-[75px] lg:top-[85px] lg:h-[270px] lg:blur-[85px]"
      />

      {/* Globe image - full viewport width */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 0.9, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="pointer-events-none absolute -bottom-[280px] left-0 w-screen opacity-90 sm:-bottom-[380px] md:-bottom-[480px] lg:-bottom-[420px]"
      >
        <Image
          src="/world.PNG"
          alt="world"
          width={1920}
          height={700}
          className="h-[420px] w-screen object-cover sm:h-[560px] md:h-[700px] lg:h-[900px]"
          priority
        />
      </motion.div>

      {/* Modern Heading Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 mx-auto max-w-2xl px-4 text-center"
      >
        {/* Modern Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur-xl sm:text-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
          </span>
          <span>Global Community</span>
        </motion.div>

        {/* Main Heading */}
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl leading-tight sm:leading-tight md:leading-tight">
          Assisting over{" "}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(99,102,241,0.4)]">
            15,000+
          </span>{" "}
          job seekers find their dream positions.
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-xs font-normal text-white/60 sm:text-sm md:text-base">
          Connecting top talent with industry-leading companies worldwide.
        </p>
      </motion.div>

      {/* Stat cards grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-20 mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 px-4 sm:mt-10 sm:gap-4 sm:px-6 md:mt-12 md:grid-cols-4 md:gap-5"
      >
        {STATS.map(({ icon: Icon, value, label }) => (
          <motion.div
            key={label}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/10 sm:rounded-2xl sm:p-5 md:p-6"
          >
            <Icon
              width={18}
              height={18}
              className="text-white/60 transition-colors group-hover:text-white sm:h-5 sm:w-5 md:h-6 md:w-6"
            />
            <div className="mt-3 text-2xl font-bold text-white sm:mt-4 sm:text-3xl md:text-4xl">
              {value}
            </div>
            <div className="mt-1 text-xs text-white/60 sm:text-sm">
              {label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}