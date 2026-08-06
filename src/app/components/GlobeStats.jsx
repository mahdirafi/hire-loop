import Image from "next/image";
import { Briefcase, ChartColumn, Magnifier, Star } from "@gravity-ui/icons";

const STATS = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: ChartColumn, value: "12K", label: "Companies" },
  { icon: Magnifier, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
];

export default function GlobeStats() {
  return (
    <section className="relative w-full overflow-hidden !bg-black py-10 sm:py-12 md:py-14 lg:py-16">
      {/* Scattered stars */}
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(1px_1px_at_15%_20%,white,transparent),radial-gradient(1px_1px_at_80%_15%,white,transparent),radial-gradient(1px_1px_at_92%_45%,white,transparent),radial-gradient(1px_1px_at_10%_60%,white,transparent),radial-gradient(1px_1px_at_65%_30%,white,transparent),radial-gradient(1px_1px_at_35%_50%,white,transparent),radial-gradient(1px_1px_at_50%_10%,white,transparent),radial-gradient(1px_1px_at_88%_70%,white,transparent)] [background-size:100%_100%]" />

      {/* Subtle purple-blue glow behind the globe's top edge */}
      <div className="pointer-events-none absolute left-1/2 top-[40px] h-[140px] w-[70%] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/30 blur-[50px] sm:top-[55px] sm:h-[190px] sm:blur-[65px] md:top-[70px] md:h-[230px] md:blur-[75px] lg:top-[85px] lg:h-[270px] lg:blur-[85px]" />

      {/* Globe image - full viewport width */}
      <div className="pointer-events-none absolute -bottom-[280px] left-0 w-screen opacity-90 sm:-bottom-[380px] md:-bottom-[480px] lg:-bottom-[420px]">
        <Image
          src="/world.PNG"
          alt="world"
          width={1920}
          height={700}
          className="h-[420px] w-screen object-cover sm:h-[560px] md:h-[700px] lg:h-[900px]"
          priority
        />
      </div>

      {/* Heading */}
      <div className="relative z-20 mx-auto max-w-xs px-4 pt-1 text-center sm:max-w-md sm:pt-2 md:max-w-xl">
        <p className="text-sm font-medium leading-relaxed text-white sm:text-lg md:text-xl">
          Assisting over <span className="font-bold">15,000</span> job seekers
          find their dream positions.
        </p>
      </div>

      {/* Stat cards */}
      <div className="relative z-20 mx-auto mt-5 grid max-w-4xl grid-cols-2 gap-2.5 px-4 sm:mt-7 sm:gap-3 sm:px-6 md:mt-8 md:grid-cols-4 md:gap-4">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md sm:rounded-2xl sm:p-4 md:p-5"
          >
            <Icon
              width={16}
              height={16}
              className="text-white/60 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5"
            />
            <div className="mt-3 text-xl font-bold text-white sm:mt-4 sm:text-2xl md:text-3xl lg:text-4xl">
              {value}
            </div>
            <div className="mt-1 text-[11px] text-white/60 sm:text-xs md:text-sm">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}