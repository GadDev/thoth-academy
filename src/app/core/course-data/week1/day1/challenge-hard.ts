import type { CourseChallenge } from '../../types';

export const WEEK1_DAY1_CHALLENGE_HARD: CourseChallenge = {
  difficulty: 'hard',
  description: `<p>Build a production-ready reusable <code>&lt;app-tabs&gt;</code> component from scratch.</p>
<ul class="mt-3 space-y-2">
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span>Interface: <code>Tab &#123; id: string; label: string; content: string &#125;</code></li>
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span><code>tabs = input&lt;Tab[]&gt;([])</code>, <code>initialTabId = input&lt;string&gt;('')</code></li>
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span><code>tabChange = output&lt;string&gt;()</code> — emits on every switch</li>
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span><code>activeTabId = signal('')</code> — initialise from <code>initialTabId</code> (or first tab) inside <code>effect()</code> in the constructor</li>
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span><code>host: &#123; role: 'tablist' &#125;</code> — <strong>NOT</strong> <code>@HostBinding</code></li>
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span>Arrow key navigation (<code>ArrowRight</code> / <code>ArrowLeft</code>) via host keydown bindings</li>
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span>Tab buttons: <code>role="tab"</code>, <code>[attr.aria-selected]</code>, <code>[attr.aria-controls]</code></li>
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span>Panels: <code>role="tabpanel"</code>, <code>[hidden]</code>, <code>[attr.aria-labelledby]</code></li>
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span>Wrap each panel content with <code>@defer (on interaction)</code> so inactive panels are lazy-rendered</li>
</ul>
<p><strong>Interview traps:</strong> <code>@HostBinding</code> vs <code>host</code> object, <code>[hidden]</code> vs <code>@if</code> for accessibility, <code>effect()</code> init pattern, <code>@defer</code> trigger syntax.</p>`,
  starterCode: `import { Component, ChangeDetectionStrategy } from '@angular/core';

// 🎯 Hard Challenge — Reusable accessible Tabs component
//
// Interface:
//   Tab { id: string; label: string; content: string }
//
// Inputs / Outputs:
//   • tabs = input<Tab[]>([])
//   • initialTabId = input<string>('')   ← activate first tab if empty
//   • tabChange = output<string>()       ← emits id on every switch
//
// State:
//   • activeTabId = signal('')
//     → initialise once in constructor with effect() when tabs first populate
//
// Template (WCAG AA):
//   • Tab strip wrapper: no extra role needed — host already has role="tablist"
//   • Each tab button: role="tab", [attr.aria-selected], [attr.aria-controls]="'panel-'+id"
//   • Tab panels: role="tabpanel", [id]="'panel-'+id",
//                 [attr.aria-labelledby]="'tab-'+id", [hidden]="activeTabId() !== tab.id"
//   • Wrap panel inner content with @defer (on interaction)
//
// Host bindings (in @Component decorator, NOT @HostBinding / @HostListener):
//   • role: 'tablist'
//   • '(keydown.arrowRight)': 'navigate(1)'
//   • '(keydown.arrowLeft)':  'navigate(-1)'

export interface Tab { id: string; label: string; content: string; }

@Component({
  selector: 'app-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // TODO: add host object
  template: \`<!-- TODO -->\`,
})
export class TabsComponent {
  // TODO: inputs, output, signal, effect, switchTo(), navigate()
}`,
  solutionCode: `import {
  Component, ChangeDetectionStrategy,
  input, output, signal, effect,
} from '@angular/core';

export interface Tab { id: string; label: string; content: string; }

@Component({
  selector: 'app-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // host replaces @HostBinding / @HostListener — required by the style guide
  host: {
    role: 'tablist',
    '(keydown.arrowRight)': 'navigate(1)',
    '(keydown.arrowLeft)': 'navigate(-1)',
  },
  template: \`
    <!-- Tab strip ––– host already carries role="tablist" -->
    <div style="display:flex;gap:.25rem;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:1.5rem">
      @for (tab of tabs(); track tab.id) {
        <button
          type="button"
          role="tab"
          [id]="'tab-' + tab.id"
          [attr.aria-selected]="activeTabId() === tab.id"
          [attr.aria-controls]="'panel-' + tab.id"
          (click)="switchTo(tab.id)"
          style="padding:.625rem 1rem;border:none;background:none;
                 font-size:.875rem;cursor:pointer;transition:all .15s;color:inherit"
          [style.border-bottom]="activeTabId() === tab.id
            ? '2px solid #D4AF37' : '2px solid transparent'"
          [style.color]="activeTabId() === tab.id ? '#D4AF37' : 'rgba(255,255,255,.5)'"
        >{{ tab.label }}</button>
      }
    </div>

    <!-- Panels — [hidden] keeps DOM for AXE, @if would break aria-controls -->
    @for (tab of tabs(); track tab.id) {
      <div
        role="tabpanel"
        [id]="'panel-' + tab.id"
        [attr.aria-labelledby]="'tab-' + tab.id"
        [hidden]="activeTabId() !== tab.id"
        style="outline:none"
        [attr.tabindex]="activeTabId() === tab.id ? 0 : -1"
      >
        @defer (on interaction) {
          <p style="font-size:.9375rem;line-height:1.7;opacity:.75">{{ tab.content }}</p>
        } @placeholder {
          <p style="opacity:.2;font-size:.875rem;font-style:italic">Loading…</p>
        }
      </div>
    }
  \`,
})
export class TabsComponent {
  readonly tabs         = input<Tab[]>([]);
  readonly initialTabId = input<string>('');
  readonly tabChange    = output<string>();

  readonly activeTabId = signal('');

  constructor() {
    // effect() replaces the "initialise on first render" useEffect pattern in React.
    // Runs once when tabs() is non-empty, respects the initialTabId input.
    effect(() => {
      const tabs = this.tabs();
      if (this.activeTabId() === '' && tabs.length > 0) {
        this.activeTabId.set(this.initialTabId() || tabs[0].id);
      }
    });
  }

  switchTo(id: string): void {
    this.activeTabId.set(id);
    this.tabChange.emit(id);
  }

  navigate(direction: 1 | -1): void {
    const tabs = this.tabs();
    const idx  = tabs.findIndex(t => t.id === this.activeTabId());
    const next = (idx + direction + tabs.length) % tabs.length;
    this.switchTo(tabs[next].id);
  }
}`,
};
