import type { CourseChallenge } from '../../types';

export const WEEK2_DAY5_CHALLENGE: CourseChallenge = {
  description:
    'Wire a lazy-loaded route and read a route parameter reactively. Add a /users/:id route that lazy-loads UserDetailComponent, then read the id param with toSignal() inside the component.',
  starterCode: `import { Routes } from '@angular/router';

// 🎯 Timed Challenge — Lazy Loading & Route Parameters
//
// Part 1 — app.routes.ts
// Add a lazy-loaded route '/users/:id' that loads UserDetailComponent
// from './pages/user-detail/user-detail'.
//
// Part 2 — user-detail.ts
// Read the 'id' route param reactively using toSignal() + ActivatedRoute.
// Display it in the template.

export const routes: Routes = [
  // TODO: add lazy-loaded /users/:id route
];

// ─── user-detail.ts stub ────────────────────────────────
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<!-- TODO: show userId -->',
})
export class UserDetailComponent {
  // TODO: read userId from route params reactively
}`,
  solutionCode: `// ─── app.routes.ts ──────────────────────────────────────
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users/:id',
    loadComponent: () =>
      import('./pages/user-detail/user-detail').then(m => m.UserDetailComponent),
  },
];

// ─── pages/user-detail/user-detail.ts ───────────────────
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div style="padding:2rem">
      <h1>User #{{ userId() }}</h1>
    </div>
  \`,
})
export class UserDetailComponent {
  private readonly route = inject(ActivatedRoute);

  readonly userId = toSignal(
    this.route.paramMap.pipe(map(p => p.get('id') ?? ''))
  );
}`,
};
