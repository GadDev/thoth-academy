import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <div
        class="fixed bottom-6 right-6 px-6 py-4 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-sm font-medium shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300 z-50"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {{ message() }}
      </div>
    }
  `,
})
export class Toast {
  readonly message = input<string>('');
  readonly visible = input<boolean>(false);
}
