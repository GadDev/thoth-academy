import type { CourseChallenge } from '../../types';

export const WEEK1_DAY5_CHALLENGE: CourseChallenge = {
  description:
    'Build a Counter component using Angular signals. Requirements: count signal starting at 0, doubled computed signal, increment / decrement / reset methods, OnPush change detection.',
  starterCode: `import { Component, ChangeDetectionStrategy } from '@angular/core';

// 🎯 Coding Drill — Signals & OnPush
// Build a Counter component:
//   • count  → WritableSignal<number> starting at 0
//   • doubled → computed(() => count * 2)
//   • Methods: increment(), decrement(), reset()
//   • Template: shows count, doubled, and three buttons
//   • ChangeDetectionStrategy.OnPush

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<!-- TODO: render count, doubled, and three buttons -->',
})
export class Counter {
  // TODO: define count signal, doubled computed, and methods
}`,
  solutionCode: `import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;padding:2rem">
      <p style="font-size:1.5rem;font-weight:bold">Count: {{ count() }}</p>
      <p style="opacity:.6">Doubled: {{ doubled() }}</p>
      <div style="display:flex;gap:.75rem">
        <button (click)="decrement()">−</button>
        <button (click)="reset()">Reset</button>
        <button (click)="increment()">+</button>
      </div>
    </div>
  \`,
})
export class Counter {
  readonly count   = signal(0);
  readonly doubled = computed(() => this.count() * 2);

  increment() { this.count.update(n => n + 1); }
  decrement() { this.count.update(n => n - 1); }
  reset()     { this.count.set(0); }
}`,
};
