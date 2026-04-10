import type { CourseChallenge } from '../../types';

export const WEEK1_DAY1_CHALLENGE_EASY: CourseChallenge = {
  difficulty: 'easy',
  description: `<p>You know React — now translate it. Convert the <code>UserCard</code> component into a proper Angular standalone component.</p>
<ul class="mt-3 space-y-2">
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span><code>name = input.required&lt;string&gt;()</code></li>
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span><code>role = input&lt;string&gt;('')</code> — optional with default</li>
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span><code>follow = output&lt;string&gt;()</code> — emits the user name on click</li>
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span><code>followed = signal(false)</code> — local state, no prop</li>
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span><code>[class.followed]</code> on the wrapper <code>div</code></li>
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span>Button is <code>disabled</code> once <code>followed()</code> is <code>true</code></li>
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span>Standalone, <code>OnPush</code>, no NgModule</li>
</ul>
<p><strong>React source to convert:</strong></p>
<pre class="bg-[#0d1117] border border-white/10 rounded-xl px-5 py-4 overflow-x-auto text-xs font-mono text-emerald-300 leading-relaxed whitespace-pre"><code>function UserCard({ name, role, onFollow }) {
  const [followed, setFollowed] = useState(false);
  return (
    &lt;div className={&#96;card \${followed ? "card--active" : ""}&#96;}&gt;
      &lt;h2&gt;{name}&lt;/h2&gt;
      &lt;span&gt;{role}&lt;/span&gt;
      &lt;button onClick={() =&gt; { setFollowed(true); onFollow(name); }}&gt;
        {followed ? "✓ Following" : "Follow"}
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>`,
  starterCode: `import { Component, ChangeDetectionStrategy } from '@angular/core';

// 🎯 Easy Challenge — React → Angular translation
//
// Convert this React component to Angular:
//
//   function UserCard({ name, role, onFollow }) {
//     const [followed, setFollowed] = useState(false);
//     return (
//       <div className={\`card \${followed ? 'card--active' : ''}\`}>
//         <h2>{name}</h2>
//         <span>{role}</span>
//         <button onClick={() => { setFollowed(true); onFollow(name); }}>
//           {followed ? '✓ Following' : 'Follow'}
//         </button>
//       </div>
//     );
//   }
//
// Requirements:
//   • Standalone component, selector: app-user-card, OnPush
//   • name = input.required<string>()
//   • role = input<string>('')
//   • followed = signal(false)   ← local state, no prop for this
//   • follow = output<string>()  ← emits name when clicked
//   • [class.followed] on the wrapper div
//   • Button is disabled once followed() is true

@Component({
  selector: 'app-user-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`<!-- TODO -->\`,
})
export class UserCard {
  // TODO: name input, role input, followed signal, follow output, onFollow()
}`,
  solutionCode: `import { Component, ChangeDetectionStrategy, input, output, signal } from '@angular/core';

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
}`,
};
