import { Injectable, computed, effect, signal } from '@angular/core';

const STORAGE_KEY = 'thoth_progress';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly completedDays = signal(new Set<string>());

  readonly totalCompleted = computed(() => this.completedDays().size);

  constructor() {
    const saved = this.loadFromStorage();
    if (saved.size > 0) {
      this.completedDays.set(saved);
    }
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...this.completedDays()]));
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
      }
      return next;
    });
  }

  private loadFromStorage(): Set<string> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
    } catch {
      return new Set();
    }
  }
}
