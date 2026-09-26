"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout, priority = false }) {
  return (
    <Link href={`/workout/${workout.id}`}>
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden hover:border-[#ccff00] transition cursor-pointer group h-full">
        {/* Image */}
        <div className="relative w-full h-40 sm:h-44 md:h-48 bg-[#222] overflow-hidden">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            quality={75}
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* Body */}
        <div className="p-3 sm:p-4">
          {/* Tag pills */}
          <div className="flex gap-1.5 sm:gap-2 flex-wrap mb-2 sm:mb-3">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="bg-[#ccff00] text-black text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Name */}
          <h3 className="font-display font-bold text-base sm:text-lg tracking-wide uppercase">
            {workout.name}
          </h3>

          {/* Equipment */}
          <p className="text-gray-500 text-[11px] sm:text-xs mt-1">
            {workout.equipment}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-3 text-[11px] sm:text-xs text-gray-400 flex-wrap">
            <div className="flex items-center gap-1">
              <Clock size={12} className="text-[#ccff00]" />
              {workout.duration} min
            </div>

            <div className="flex items-center gap-1">
              <Flame size={12} className="text-[#ccff00]" />
              {workout.caloriesBurned} kcal
            </div>

            <div className="flex items-center gap-1">
              <Star size={12} className="text-[#ccff00]" />
              {workout.rating}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
