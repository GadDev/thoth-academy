import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-back-to-top',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <button
        type="button"
        (click)="scrollToTop()"
        aria-label="Back to top"
        class="fixed bottom-8 right-8 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-surface border border-primary/30 text-primary shadow-lg hover:bg-surface-light hover:border-primary/60 transition-all duration-200"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          width="16"
          height="16"
          aria-hidden="true"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    }
  `,
})
export class BackToTop {
  readonly visible = signal(false);

  constructor() {
    fromEvent(window, 'scroll', { passive: true } as AddEventListenerOptions)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.visible.set(window.scrollY > 300));
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
