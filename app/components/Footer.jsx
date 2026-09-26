import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Dumbbell className="text-[#ccff00]" size={18} />
          <span className="font-display font-bold tracking-wider text-sm sm:text-base">
            FITLOG
          </span>
        </div>
        <p className="text-gray-500 text-[11px] sm:text-xs md:text-sm">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
