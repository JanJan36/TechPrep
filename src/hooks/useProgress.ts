import { useState, useEffect, useCallback } from "react";
import type { UserProgress } from "@/data/competencies";

const PROGRESS_KEY = "techprep-progress";
const COMPLETED_LESSONS_KEY = "techprep-completed-lessons";
const STREAK_KEY = "techprep-streak";
const PROGRESS_EVENT = "progress-updated";

const LEVEL_TITLES: Record<number, string> = {
  1: "Newbie Technician",
  2: "Apprentice Technician",
  3: "Junior Technician",
  5: "Technician",
  7: "Senior Technician",
  10: "Expert Technician",
  15: "Master Technician",
  20: "Supreme Technician",
};

function getTitleForLevel(level: number): string {
  let title = "Newbie Technician";
  for (const [lvl, t] of Object.entries(LEVEL_TITLES)) {
    if (level >= Number(lvl)) title = t;
  }
  return title;
}

function calculateLevel(xp: number): { level: number; xpToNext: number } {
  // Each level requires level * 100 XP (1→100, 2→200, 3→300...)
  let level = 1;
  let xpUsed = 0;
  while (xpUsed + level * 100 <= xp) {
    xpUsed += level * 100;
    level++;
  }
  const xpToNext = level * 100 - (xp - xpUsed);
  return { level, xpToNext };
}

export function getProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    level: 1,
    xp: 0,
    xpToNext: 100,
    title: "Newbie Technician",
    lessonsCompleted: 0,
    practicesDone: 0,
    gamesPlayed: 0,
    topicsExplored: 0,
  };
}

function saveProgress(p: UserProgress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

export function getCompletedLessons(): string[] {
  try {
    const raw = localStorage.getItem(COMPLETED_LESSONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function completeLesson(topicId: string, xpReward: number) {
  const completed = getCompletedLessons();
  if (completed.includes(topicId)) return; // already completed

  completed.push(topicId);
  localStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(completed));

  const progress = getProgress();
  const newXp = progress.xp + xpReward;
  const { level, xpToNext } = calculateLevel(newXp);

  const updated: UserProgress = {
    ...progress,
    xp: newXp,
    level,
    xpToNext,
    title: getTitleForLevel(level),
    lessonsCompleted: completed.length,
    topicsExplored: completed.length,
  };
  saveProgress(updated);
}

export function addGamePlayed() {
  const progress = getProgress();
  saveProgress({ ...progress, gamesPlayed: progress.gamesPlayed + 1 });
}

export function addPracticeDone() {
  const progress = getProgress();
  saveProgress({ ...progress, practicesDone: progress.practicesDone + 1 });
}

export interface StreakData {
  currentStreak: number;
  lastLoginDate: string; // YYYY-MM-DD
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getStreak(): StreakData {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { currentStreak: 0, lastLoginDate: "" };
}

export function recordLogin(): StreakData {
  const today = getToday();
  const streak = getStreak();

  if (streak.lastLoginDate === today) return streak; // already recorded

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  const updated: StreakData = {
    currentStreak: streak.lastLoginDate === yesterdayStr ? streak.currentStreak + 1 : 1,
    lastLoginDate: today,
  };

  localStorage.setItem(STREAK_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event(PROGRESS_EVENT));
  return updated;
}

export function useStreak(): StreakData {
  const [streak, setStreak] = useState<StreakData>(() => {
    recordLogin(); // record on mount
    return getStreak();
  });

  useEffect(() => {
    const handler = () => setStreak(getStreak());
    window.addEventListener(PROGRESS_EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return streak;
}

export function useProgress(): UserProgress {
  const [progress, setProgress] = useState<UserProgress>(getProgress);

  useEffect(() => {
    const handler = () => setProgress(getProgress());
    window.addEventListener(PROGRESS_EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return progress;
}

export function useCompletedLessons(): string[] {
  const [completed, setCompleted] = useState<string[]>(getCompletedLessons);

  useEffect(() => {
    const handler = () => setCompleted(getCompletedLessons());
    window.addEventListener(PROGRESS_EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return completed;
}
