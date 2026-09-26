"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { Dumbbell, Menu, X } from "lucide-react";
import { useState } from "react";
import { useFitLog } from "@/context/FitLogContext";

const emptySubscribe = () => () => {};

export default function Navbar() {
  const pathname = usePathname();
  const { todaysPlan, savedWorkouts } = useFitLog();
  const [menuOpen, setMenuOpen] = useState(false);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const planCount = mounted ? todaysPlan.length : 0;
  const savedCount = mounted ? savedWorkouts.length : 0;

  const linkClass = (path) =>
    `px-4 py-2 rounded-full text-sm font-medium transition ${
      pathname === path
        ? "bg-[#ccff00] text-black"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav className="border-b border-[#2a2a2a] bg-[#0f0f0f] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Dumbbell className="text-[#ccff00]" size={22} />
          <span className="font-display font-bold text-lg sm:text-xl tracking-wider">
            FITLOG
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/" className={linkClass("/")}>
            Workouts
          </Link>
          <Link href="/my-plan" className={linkClass("/my-plan")}>
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/my-plan" className="flex items-center gap-1.5 sm:gap-2">
            <span className="bg-[#ccff00] text-black text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap">
              Plan {planCount}
            </span>
            <span className="border border-[#ccff00] text-[#ccff00] text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap">
              Saved {savedCount}
            </span>
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-1.5"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[#2a2a2a] px-4 py-3 flex flex-col gap-2">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={linkClass("/") + " text-center"}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setMenuOpen(false)}
            className={linkClass("/my-plan") + " text-center"}
          >
            My Plan
          </Link>
        </div>
      )}
    </nav>
  );
}
