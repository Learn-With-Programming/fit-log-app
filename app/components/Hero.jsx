import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
        <div className="text-center md:text-left">
          <p className="text-[#ccff00] text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">
            Workout Library
          </p>
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight uppercase">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="text-gray-400 mt-4 sm:mt-6 max-w-lg mx-auto md:mx-0 text-sm sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today plan, and watch the week work add up.
          </p>

          <a
            href="#library"
            className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full mt-6 sm:mt-8 hover:bg-[#b8e600] transition text-sm sm:text-base"
          >
            <ArrowDown size={16} />
            BROWSE WORKOUTS
          </a>
        </div>

        <div className="flex justify-center md:justify-end order-first md:order-last">
          <Image
            src="/banner.png"
            alt="Hero"
            width={400}
            height={300}
            priority
            className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
