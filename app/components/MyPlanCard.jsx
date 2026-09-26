"use client";

import Link from "next/link";
import { Clock, Flame, Star, Check, X } from "lucide-react";
import Image from "next/image";

export default function MyPlanCard({
  workout,
  onRemove,
  onToggleDone,
  showDone = true,
  priority = false,
}) {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
      {/* Image */}
      <div className="relative w-full sm:w-24 md:w-28 h-32 sm:h-24 md:h-28 shrink-0 overflow-hidden rounded-xl bg-[#222]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 639px) 100vw, 112px"
          priority={priority}
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-bold text-base sm:text-lg uppercase truncate">
          {workout.name}
        </h3>

        <p className="text-gray-500 text-[11px] sm:text-xs mt-1 truncate">
          {workout.equipment}
        </p>

        <div className="flex items-center gap-3 sm:gap-4 mt-2 text-[11px] sm:text-xs text-gray-400 flex-wrap">
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-[#ccff00]" />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <Flame size={12} className="text-[#ccff00]" />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <Star size={12} className="text-[#ccff00]" />
            {workout.rating}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
        <Link
          href={`/workout/${workout.id}`}
          className="flex-1 sm:flex-none text-center border border-[#2a2a2a] text-gray-300 text-[11px] sm:text-xs font-medium px-3 sm:px-4 py-2 rounded-full hover:border-[#ccff00] hover:text-[#ccff00] transition whitespace-nowrap"
        >
          View Details
        </Link>

        {showDone && (
          <button
            type="button"
            onClick={() => onToggleDone(workout.id)}
            className={`flex-1 sm:flex-none text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-2 rounded-full flex items-center justify-center gap-1 transition whitespace-nowrap ${
              workout.done
                ? "bg-green-500 text-black"
                : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
            }`}
          >
            <Check size={12} />

            {workout.done ? "Done" : "Mark as Done"}
          </button>
        )}

        <button
          type="button"
          onClick={() => onRemove(workout.id)}
          className="text-gray-500 hover:text-red-400 p-2 transition shrink-0"
          aria-label="Remove"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
