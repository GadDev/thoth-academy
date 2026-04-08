import { Injectable, signal, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);

  readonly theme = signal<'dark' | 'light'>(this.loadTheme());

  constructor() {
    effect(() => {
      const t = this.theme();
      this.doc.documentElement.classList.toggle('light', t === 'light');
      try {
        localStorage.setItem('thoth_theme', t);
      } catch {
        // localStorage unavailable (e.g. private browsing with strict settings)
      }
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  private loadTheme(): 'dark' | 'light' {
    try {
      const saved = localStorage.getItem('thoth_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // ignore
    }
    return 'dark';
  }
}
