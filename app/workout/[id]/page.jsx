"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Calendar, Bookmark } from "lucide-react";
import { toast } from "react-toastify";
import Loader from "@/app/components/Loader";
import { getWorkoutById } from "@/lib/api";
import { useFitLog } from "@/context/FitLogContext";
import Image from "next/image";

export default function WorkoutDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToPlan, addToSaved, todaysPlan, savedWorkouts } = useFitLog();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getWorkoutById(params.id);
        if (data.error) {
          setNotFound(true);
        } else {
          setWorkout(data);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  if (loading) return <Loader text="Loading workout..." />;

  if (notFound || !workout) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-bold uppercase">
          Workout Not Found
        </h1>
        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-[#ccff00] text-black font-bold px-6 py-3 rounded-full"
        >
          Back to Library
        </button>
      </div>
    );
  }

  const MAX_PLAN_SIZE = 7;
  const isInPlan = todaysPlan.some((w) => w.id === workout.id);
  const isSaved = savedWorkouts.some((w) => w.id === workout.id);
  const planFull = todaysPlan.length >= MAX_PLAN_SIZE;

  const handleAddToPlan = () => {
    if (isInPlan) return toast.error("Already in your plan");
    if (planFull) return toast.error("Plan is full (max 7 lifts)");
    addToPlan(workout);
    toast.success("Added to today's plan", {
      id: `add-plan-${workout.id}`,
      duration: 2000,
    });
  };

  const handleSave = () => {
    if (isSaved) return toast.error("Already saved");
    addToSaved(workout);
    toast.success("Saved for later", {
      id: `save-${workout.id}`,
      duration: 2000,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
        {/* Left - Image */}
        <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#2a2a2a]">
          <Image
            width={400}
            height={300}
            src={workout.image}
            alt={workout.name}
            priority
            className="w-full h-auto max-h-100 sm:max-h-125 object-cover"
          />
        </div>

        {/* Right - Details */}
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl uppercase">
            {workout.name}
          </h1>
          <p className="text-gray-400 mt-3 text-sm sm:text-base">
            {workout.description}
          </p>

          {/* Tags */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {workout.muscleGroups.map((m) => (
              <span
                key={m}
                className="bg-[#ccff00] text-black text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full uppercase"
              >
                {m}
              </span>
            ))}
            <span className="border border-[#ccff00] text-[#ccff00] text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full uppercase">
              {workout.difficulty}
            </span>
          </div>

          {/* Specs */}
          <div className="mt-5 sm:mt-6 border border-[#2a2a2a] rounded-xl overflow-hidden">
            {[
              ["Equipment", workout.equipment],
              ["Difficulty", workout.difficulty],
              ["Sets", workout.sets],
              ["Reps", workout.reps],
              ["Duration", `${workout.duration} min`],
              ["Calories", `${workout.caloriesBurned} kcal`],
              ["Rating", workout.rating],
            ].map(([label, value], i) => (
              <div
                key={label}
                className={`flex justify-between items-center px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm ${
                  i % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#151515]"
                }`}
              >
                <span className="text-gray-500 uppercase text-[10px] sm:text-xs font-semibold tracking-wider">
                  {label}
                </span>
                <span className="font-medium text-right">{value}</span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-5 sm:mt-6">
            <h2 className="font-display font-bold text-lg sm:text-xl uppercase mb-3">
              Instructions
            </h2>
            <ol className="space-y-2">
              {workout.instructions.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-2 sm:gap-3 text-gray-300 text-xs sm:text-sm"
                >
                  <span className="text-[#ccff00] font-bold shrink-0">
                    {i + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6 sm:mt-8">
            <button
              onClick={handleAddToPlan}
              disabled={isInPlan}
              className="inline-flex items-center justify-center gap-2 bg-[#ccff00] text-black font-bold px-4 sm:px-5 py-2.5 sm:py-3 rounded-full hover:bg-[#b8e600] disabled:opacity-50 transition text-sm sm:text-base"
            >
              <Calendar size={16} />
              {isInPlan ? "In Your Plan" : "Add to today's plan"}
            </button>
            <button
              onClick={handleSave}
              disabled={isSaved}
              className="inline-flex items-center justify-center gap-2 border border-[#ccff00] text-[#ccff00] font-bold px-4 sm:px-5 py-2.5 sm:py-3 rounded-full hover:bg-[#ccff00]/10 disabled:opacity-50 transition text-sm sm:text-base"
            >
              <Bookmark size={16} />
              {isSaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
