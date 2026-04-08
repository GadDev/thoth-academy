import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { TranslocoService, TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-lang-switcher',
  imports: [TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex items-center gap-1"
      role="group"
      [attr.aria-label]="'lang.switcher' | transloco"
    >
      @for (lang of langs; track lang) {
        <button
          type="button"
          (click)="setLang(lang)"
          class="px-2 py-1 text-xs font-semibold rounded transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          [class]="
            activeLang() === lang
              ? 'text-primary bg-primary/10 border border-primary/30'
              : 'text-white/50 hover:text-white border border-transparent hover:bg-white/10'
          "
          [attr.aria-pressed]="activeLang() === lang"
          [attr.aria-label]="'lang.' + lang | transloco"
        >
          {{ 'lang.' + lang | transloco }}
        </button>
      }
    </div>
  `,
})
export class LangSwitcher {
  private readonly translocoService = inject(TranslocoService);

  readonly langs = ['en', 'fr', 'nl'] as const;
  readonly activeLang = signal(this.translocoService.getActiveLang());

  setLang(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.activeLang.set(lang);
  }
}
