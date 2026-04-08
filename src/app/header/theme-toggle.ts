import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      (click)="themeService.toggle()"
      [attr.aria-label]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
      [attr.title]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
      class="flex items-center justify-center w-9 h-9 rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      [class]="
        isDark()
          ? 'text-white/60 bg-white/5 border-white/10 hover:text-white hover:bg-white/10'
          : 'text-amber-600 bg-amber-50 border-amber-200 hover:bg-amber-100'
      "
    >
      @if (isDark()) {
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          width="18"
          height="18"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path
            stroke-linecap="round"
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
          />
        </svg>
      } @else {
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      }
    </button>
  `,
})
export class ThemeToggle {
  protected readonly themeService = inject(ThemeService);
  readonly isDark = computed(() => this.themeService.theme() === 'dark');
}
