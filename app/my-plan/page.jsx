"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useFitLog } from "@/context/FitLogContext";
import MyPlanCard from "@/components/MyPlanCard";

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-3 sm:p-5"
        >
          <div className="h-3 w-16 bg-[#2a2a2a] rounded animate-pulse" />

          <div className="h-8 sm:h-9 w-12 bg-[#2a2a2a] rounded mt-2 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

function WorkoutListSkeleton() {
  return (
    <div className="mt-6 space-y-3 sm:space-y-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-5 sm:p-6 animate-pulse"
        >
          <div className="flex justify-between gap-4">
            <div className="flex-1">
              <div className="h-5 bg-[#2a2a2a] rounded w-1/3" />

              <div className="h-3 bg-[#2a2a2a] rounded w-2/3 mt-4" />

              <div className="h-3 bg-[#2a2a2a] rounded w-1/2 mt-2" />
            </div>

            <div className="h-8 w-8 bg-[#2a2a2a] rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MyPlanPage() {
  const {
    todaysPlan,
    savedWorkouts,
    hydrated,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState("today");
  const [sortBy, setSortBy] = useState("duration");

  const currentList = activeTab === "today" ? todaysPlan : savedWorkouts;

  const totalExercises = todaysPlan.length;

  const totalMinutes = todaysPlan.reduce(
    (sum, workout) => sum + (Number(workout.duration) || 0),
    0,
  );

  const totalCalories = todaysPlan.reduce(
    (sum, workout) => sum + (Number(workout.caloriesBurned) || 0),
    0,
  );

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") {
      return (Number(a.duration) || 0) - (Number(b.duration) || 0);
    }

    if (sortBy === "calories") {
      return (Number(a.caloriesBurned) || 0) - (Number(b.caloriesBurned) || 0);
    }

    if (sortBy === "rating") {
      return (Number(b.rating) || 0) - (Number(a.rating) || 0);
    }

    return 0;
  });

  const handleRemove = (id) => {
    if (activeTab === "today") {
      removeFromPlan(id);
      toast.info("Removed from plan");
    } else {
      removeFromSaved(id);
      toast.info("Removed from saved");
    }
  };

  const handleToggleDone = (id) => {
    toggleDone(id);
    toast.success("Progress updated");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header */}
      <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase">
        My Plan
      </h1>

      <p className="text-gray-500 mt-2 text-sm sm:text-base">
        Cap of seven lifts for today. Finish them, then load more.
      </p>

      {/* Stats */}
      {!hydrated ? (
        <StatsSkeleton />
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8">
          {[
            ["Exercises", totalExercises],
            ["Minutes", totalMinutes],
            ["Calories", totalCalories],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-3 sm:p-5"
            >
              <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider">
                {label}
              </p>

              <p className="font-display font-bold text-2xl sm:text-3xl text-[#ccff00] mt-1 sm:mt-2">
                {value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tabs + Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
        {/* Tabs */}
        <div className="flex gap-2 bg-[#1a1a1a] p-1 rounded-full w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab("today")}
            className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition ${
              activeTab === "today"
                ? "bg-[#ccff00] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Today Plan
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 text-sm justify-between sm:justify-end">
          <span className="text-gray-500 text-xs sm:text-sm">Sort By</span>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-3 sm:px-4 py-2 text-white text-xs sm:text-sm focus:outline-none focus:border-[#ccff00]"
          >
            <option value="duration">Duration</option>

            <option value="calories">Calories</option>

            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Workout List */}
      {!hydrated ? (
        <WorkoutListSkeleton />
      ) : (
        <div className="mt-6 space-y-3 sm:space-y-4">
          {sortedList.length === 0 ? (
            /* Empty State */
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl py-16 sm:py-20 text-center px-4">
              <h3 className="font-display font-bold text-xl sm:text-2xl uppercase">
                Nothing Here Yet
              </h3>

              <p className="text-gray-500 mt-2 text-xs sm:text-sm">
                Browse the library and add a lift to get today moving.
              </p>

              <Link
                href="/"
                className="inline-block bg-[#ccff00] text-black font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full mt-5 sm:mt-6 hover:bg-[#b8e600] transition text-sm sm:text-base"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            /* Workout List */
            sortedList.map((workout) => (
              <MyPlanCard
                key={workout.id}
                workout={workout}
                onRemove={handleRemove}
                onToggleDone={handleToggleDone}
                showDone={activeTab === "today"}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
