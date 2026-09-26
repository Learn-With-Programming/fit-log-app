"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

const FitLogContext = createContext(null);

const EMPTY_ARRAY = [];

function createStorageStore(key) {
  let value = EMPTY_ARRAY;
  let initialized = false;
  const listeners = new Set();

  const getSnapshot = () => value;

  const getServerSnapshot = () => EMPTY_ARRAY;

  const initialize = () => {
    if (initialized || typeof window === "undefined") {
      return;
    }

    initialized = true;

    try {
      const stored = window.localStorage.getItem(key);

      if (!stored) {
        value = [];
        return;
      }

      const parsed = JSON.parse(stored);

      value = Array.isArray(parsed) ? parsed : [];
    } catch {
      value = [];
    }
  };

  const subscribe = (listener) => {
    listeners.add(listener);

    // Load localStorage after the first client render.
    initialize();

    // Notify React that the external store has changed.
    listener();

    return () => {
      listeners.delete(listener);
    };
  };

  const setValue = (nextValue) => {
    value = typeof nextValue === "function" ? nextValue(value) : nextValue;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore localStorage errors.
    }

    listeners.forEach((listener) => {
      listener();
    });
  };

  const handleStorage = (event) => {
    if (event.key !== key) {
      return;
    }

    try {
      const parsed = event.newValue ? JSON.parse(event.newValue) : [];

      value = Array.isArray(parsed) ? parsed : [];
    } catch {
      value = [];
    }

    listeners.forEach((listener) => {
      listener();
    });
  };

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }

  return {
    subscribe,
    getSnapshot,
    getServerSnapshot,
    setValue,
  };
}

const planStore = createStorageStore("fitlog_plan");
const savedStore = createStorageStore("fitlog_saved");

let hydratedValue = false;
const hydrationListeners = new Set();

const hydrationSubscribe = (listener) => {
  hydrationListeners.add(listener);

  if (typeof window !== "undefined") {
    queueMicrotask(() => {
      if (!hydratedValue) {
        hydratedValue = true;

        hydrationListeners.forEach((callback) => callback());
      }
    });
  }

  return () => {
    hydrationListeners.delete(listener);
  };
};

const getHydratedSnapshot = () => hydratedValue;

const getHydratedServerSnapshot = () => false;

export function FitLogProvider({ children }) {
  const todaysPlan = useSyncExternalStore(
    planStore.subscribe,
    planStore.getSnapshot,
    planStore.getServerSnapshot,
  );

  const savedWorkouts = useSyncExternalStore(
    savedStore.subscribe,
    savedStore.getSnapshot,
    savedStore.getServerSnapshot,
  );

  const hydrated = useSyncExternalStore(
    hydrationSubscribe,
    getHydratedSnapshot,
    getHydratedServerSnapshot,
  );

  const MAX_PLAN_SIZE = 7;

  const addToPlan = (workout) => {
    if (todaysPlan.length >= MAX_PLAN_SIZE) {
      return false;
    }

    if (todaysPlan.some((item) => item.id === workout.id)) {
      return false;
    }

    planStore.setValue((prev) => [
      ...prev,
      {
        ...workout,
        done: false,
      },
    ]);

    return true;
  };

  const removeFromPlan = (id) => {
    planStore.setValue((prev) => prev.filter((workout) => workout.id !== id));
  };

  const toggleDone = (id) => {
    planStore.setValue((prev) =>
      prev.map((workout) =>
        workout.id === id
          ? {
              ...workout,
              done: !workout.done,
            }
          : workout,
      ),
    );
  };

  const addToSaved = (workout) => {
    if (savedWorkouts.some((item) => item.id === workout.id)) {
      return false;
    }

    savedStore.setValue((prev) => [...prev, workout]);

    return true;
  };

  const removeFromSaved = (id) => {
    savedStore.setValue((prev) => prev.filter((workout) => workout.id !== id));
  };

  return (
    <FitLogContext.Provider
      value={{
        todaysPlan,
        savedWorkouts,
        hydrated,
        addToPlan,
        removeFromPlan,
        toggleDone,
        addToSaved,
        removeFromSaved,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error("useFitLog must be used inside FitLogProvider");
  }

  return context;
}
