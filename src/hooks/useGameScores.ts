const STORAGE_KEY = "game-high-scores";

export interface GameScore {
  gameId: string;
  score: number;
  total: number;
  percentage: number;
  date?: string;
  // Speed typing specific
  commands?: number;
  bestStreak?: number;
}

export const getHighScores = (): Record<string, GameScore> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const getHighScore = (gameId: string): GameScore | null => {
  return getHighScores()[gameId] || null;
};

export const saveHighScore = (score: GameScore): { isNewBest: boolean } => {
  const scores = getHighScores();
  const existing = scores[score.gameId];
  const isNewBest = !existing || score.percentage > existing.percentage;
  if (isNewBest) {
    scores[score.gameId] = { ...score, date: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  }
  return { isNewBest };
};
