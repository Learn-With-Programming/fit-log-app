"use client";

import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import WorkoutCard from "./components/WorkoutCard";
import Loader from "./components/Loader";
import { getAllWorkouts } from "../lib/api";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch (err) {
        setError("Failed to load workouts");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      <Hero />

      <section
        id="library"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
      >
        <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase">
          The Library
        </h2>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Twelve lifts covering every major muscle group.
        </p>

        {loading && <Loader />}
        {error && <p className="text-red-400 py-10">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
            {workouts.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
