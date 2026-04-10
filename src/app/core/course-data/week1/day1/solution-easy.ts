export const WEEK1_DAY1_SOLUTION_EASY = `import { Component, ChangeDetectionStrategy, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-user-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div
      [class.followed]="followed()"
      style="display:flex;flex-direction:column;gap:.75rem;padding:1.5rem;
             border:1px solid rgba(255,255,255,.1);border-radius:1rem;max-width:16rem"
    >
      <h2 style="font-size:1.125rem;font-weight:600">{{ name() }}</h2>
      <span style="font-size:.875rem;opacity:.6">{{ role() }}</span>
      <button
        (click)="onFollow()"
        [disabled]="followed()"
        style="padding:.5rem 1rem;border-radius:.5rem;cursor:pointer;
               font-weight:600;border:none;transition:opacity .15s"
        [style.background]="followed() ? 'rgba(212,175,55,.3)' : '#D4AF37'"
        [style.color]="'#0B0F14'"
      >
        {{ followed() ? '✓ Following' : 'Follow' }}
      </button>
    </div>
  \`,
})
export class UserCard {
  // Inputs — replaces React props
  readonly name = input.required<string>();
  readonly role = input<string>('');

  // Local state — replaces useState(false)
  readonly followed = signal(false);

  // Output — replaces the onFollow callback prop
  readonly follow = output<string>();

  onFollow(): void {
    this.followed.set(true);        // signal.set() — not setState()
    this.follow.emit(this.name());  // read signal with (), then emit
  }
}`;
