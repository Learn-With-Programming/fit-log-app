const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getAllWorkouts() {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch workouts");
  return res.json();
}

export async function getWorkoutById(id) {
  const allWorkouts = await getAllWorkouts();
  const workout = allWorkouts.find((w) => w.id === Number(id));
  if (!workout) throw new Error("Workout not found");
  return workout;
}
