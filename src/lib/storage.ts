// lib/storage.ts

export type GameProgress = {
    openedCard: number[];
    visibleCards: boolean[];
    movesLeft: number;
};

export function loadProgress(key: string): GameProgress | null {
    const saved = localStorage.getItem(key);
    if (!saved) return null;

    try {
        return JSON.parse(saved);
    } catch {
        return null;
    }
}

export function saveProgress(key: string, progress: GameProgress): void {
    localStorage.setItem(key, JSON.stringify(progress));
}

export function clearProgress(key: string): void {
    localStorage.removeItem(key);
}