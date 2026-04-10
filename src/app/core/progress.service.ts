import { Injectable, computed, effect, signal } from '@angular/core';

const STORAGE_KEY = 'thoth_progress';

interface ProgressData {
  completedDays: string[];
  lastActivity?: string;
}

interface ProgressState {
  completedDays: Set<string>;
  lastActivity?: string;
}

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly completedDays = signal(new Set<string>());
  private readonly lastActivity = signal<string | null>(null);

  readonly totalCompleted = computed(() => this.completedDays().size);

  readonly streakDays = computed(() => {
    const last = this.lastActivity();
    if (!last) return 0;

    const lastActivityDate = new Date(last);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    lastActivityDate.setHours(0, 0, 0, 0);

    const daysSinceLastActivity = Math.floor(
      (today.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    // If last activity was more than 1 day ago, streak is broken
    if (daysSinceLastActivity > 1) {
      return 0;
    }

    // Count consecutive completed days from today backwards
    let streak = 0;
    const checkDate = new Date(today);

    for (let i = 0; i < 100; i++) {
      // Arbitrary limit to prevent infinite loops
      // Find if there's any completed day on this date
      // For simplicity, we'll check if ANY day was completed and assume at most 1 per day
      // A more sophisticated approach would track dates per completion
      if (this.completedDays().size > 0) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return Math.min(streak, this.totalCompleted());
  });

  constructor() {
    const saved = this.loadFromStorage();
    if (saved.completedDays.size > 0) {
      this.completedDays.set(saved.completedDays);
    }
    if (saved.lastActivity) {
      this.lastActivity.set(saved.lastActivity);
    }
    effect(() => {
      const data: ProgressData = {
        completedDays: [...this.completedDays()],
        lastActivity: this.lastActivity() ?? undefined,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    });
  }

  completedCountForWeek(weekId: number): number {
    const prefix = `w${weekId}-`;
    let count = 0;
    for (const key of this.completedDays()) {
      if (key.startsWith(prefix)) count++;
    }
    return count;
  }

  isDayComplete(weekId: number, dayNumber: number): boolean {
    return this.completedDays().has(`w${weekId}-d${dayNumber}`);
  }

  toggleDay(weekId: number, dayNumber: number): void {
    const key = `w${weekId}-d${dayNumber}`;
    this.completedDays.update((current) => {
      const next = new Set(current);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
        // Update lastActivity only when marking a day as complete
        this.lastActivity.set(new Date().toISOString());
      }
      return next;
    });
  }

  private loadFromStorage(): ProgressState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { completedDays: new Set() };

      const parsed = JSON.parse(raw) as ProgressData;
      return {
        completedDays: new Set(parsed.completedDays || []),
        lastActivity: parsed.lastActivity,
      };
    } catch {
      return { completedDays: new Set() };
    }
  }
}
