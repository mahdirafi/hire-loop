"use client";

import { Button } from "@heroui/react";
import { Magnifier, MapPin } from "@gravity-ui/icons";
import { motion } from "framer-motion";

export default function Hero() {
  // সাধারণ এবং প্রফেশনাল অ্যানিমেশন ভ্যারিয়েন্ট
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom smooth cubic-bezier
      },
    }),
  };

  return (
    <section className="relative w-full overflow-hidden !bg-black">
      {/* Decorative background glow + stars */}
      <div className="pointer-events-none absolute inset-0">
        {/* Center top glow - subtle animation */}
        <motion.div
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[100px]"
        />

        {/* Scattered stars */}
        <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(1px_1px_at_20%_30%,white,transparent),radial-gradient(1px_1px_at_75%_15%,white,transparent),radial-gradient(1px_1px_at_90%_60%,white,transparent),radial-gradient(1px_1px_at_10%_80%,white,transparent),radial-gradient(1px_1px_at_60%_85%,white,transparent),radial-gradient(1px_1px_at_35%_55%,white,transparent),radial-gradient(1px_1px_at_50%_20%,white,transparent),radial-gradient(1px_1px_at_85%_90%,white,transparent)] [background-size:100%_100%]" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:py-32">
        {/* Badge pill with side lines */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-8 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-white/20 sm:w-16" />
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/80 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-sm">🎉</span>
            <span className="text-sm font-semibold text-white">50,000+</span>
            <span className="text-sm font-medium tracking-wide text-white/50">
              NEW JOBS THIS MONTH
            </span>
          </div>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-white/20 sm:w-16" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          custom={0.1}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Find Your Dream Job Today
        </motion.h1>

        {/* Subtext */}
        <motion.p
          custom={0.2}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-5 max-w-xl text-base text-white/50 sm:text-lg"
        >
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </motion.p>

        {/* Search bar */}
        <motion.div
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-10 flex w-full max-w-2xl flex-col items-stretch gap-2 rounded-2xl border border-white/10 bg-black/80 p-2 backdrop-blur-sm sm:flex-row sm:items-center"
        >
          <div className="flex flex-1 items-center gap-2 px-3 py-2.5">
            <Magnifier
              width={18}
              height={18}
              className="shrink-0 text-white/40"
            />
            <input
              type="text"
              placeholder="Job title, skill or company"
              className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>

          <span className="hidden h-6 w-px bg-white/10 sm:block" />

          <div className="flex flex-1 items-center gap-2 px-3 py-2.5">
            <MapPin
              width={18}
              height={18}
              className="shrink-0 text-white/40"
            />
            <input
              type="text"
              placeholder="Location or Remote"
              className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>

          <Button
            isIconOnly
            radius="full"
            className="!bg-blue-600 !text-white shrink-0 hover:!bg-blue-700 sm:h-11 sm:w-11"
          >
            <Magnifier width={18} height={18} />
          </Button>
        </motion.div>

        {/* Trending positions */}
        <motion.div
          custom={0.4}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="text-sm text-white/40">Trending Position</span>
          {["Product Designer", "AI Engineering", "Dev-ops Engineer"].map(
            (tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer rounded-full border border-white/10 bg-black/60 px-4 py-1.5 text-sm text-white/70 transition-colors hover:border-blue-600 hover:text-white"
              >
                {tag}
              </motion.span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}