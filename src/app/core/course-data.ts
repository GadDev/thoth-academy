export interface CourseChallenge {
  description: string;
  starterCode: string;
  solutionCode: string;
}

export interface CourseDay {
  number: number;
  title: string;
  summary: string;
  pdfUrl?: string;
  challenge?: CourseChallenge;
}

export interface CourseWeek {
  id: number;
  title: string;
  theme: string;
  days: CourseDay[];
}

export const COURSE_WEEKS: CourseWeek[] = [
  {
    id: 1,
    title: 'Angular Fundamentals',
    theme: 'Components, dependency injection & change detection',
    days: [
      {
        number: 1,
        title: 'Components & Template Syntax',
        summary: 'Standalone components, templates, built-in control flow',
        pdfUrl: 'pdfs/week1-day1-components-template-syntax.pdf',
      },
      {
        number: 2,
        title: 'Dependency Injection',
        summary: 'inject(), services, providedIn, hierarchical DI',
        pdfUrl: 'pdfs/week1-day2-dependency-injection.pdf',
      },
      {
        number: 3,
        title: 'Data Binding & Signals',
        summary: 'Property binding, event binding, signal() and computed()',
      },
      {
        number: 4,
        title: 'Change Detection & OnPush',
        summary: 'ChangeDetectionStrategy.OnPush, zones vs signals',
        pdfUrl: 'pdfs/week1-day4-change-detection-onpush.pdf',
      },
      {
        number: 5,
        title: 'Coding Drill',
        summary: 'Apply Week 1 concepts in a timed coding exercise',
        pdfUrl: 'pdfs/week1-day5-coding-drill.pdf',
        challenge: {
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
        },
      },
    ],
  },
  {
    id: 2,
    title: 'Routing, RxJS & HTTP',
    theme: 'Router, lazy loading, observables & HttpClient',
    days: [
      {
        number: 1,
        title: 'Router & Lazy Loading',
        summary: 'Routes, RouterOutlet, loadComponent, route guards',
        pdfUrl: 'pdfs/week2-day1-router-lazy-loading.pdf',
      },
      {
        number: 2,
        title: 'Route Parameters & Guards',
        summary: 'Dynamic params, canActivate, canDeactivate, resolvers',
      },
      {
        number: 3,
        title: 'RxJS Operators',
        summary: 'map, filter, switchMap, combineLatest, async pipe',
        pdfUrl: 'pdfs/week2-day3-rxjs-operators.pdf',
      },
      {
        number: 4,
        title: 'HttpClient & Interceptors',
        summary: 'HTTP calls, error handling, functional interceptors',
        pdfUrl: 'pdfs/week2-day4-httpclient-interceptors.pdf',
      },
      {
        number: 5,
        title: 'Timed Challenge',
        summary: 'Routing & data layer coding challenge',
        pdfUrl: 'pdfs/week2-day5-timed-challenge.pdf',
        challenge: {
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
        },
      },
    ],
  },
  {
    id: 3,
    title: 'Forms, Pipes & Directives',
    theme: 'Reactive forms, custom pipes & attribute directives',
    days: [
      {
        number: 1,
        title: 'Reactive Forms',
        summary: 'FormGroup, FormControl, typed forms, validators',
        pdfUrl: 'pdfs/week3-day1-reactive-forms.pdf',
      },
      {
        number: 2,
        title: 'State Management Patterns',
        summary: 'Signal-based state, service patterns, local vs global',
      },
      {
        number: 3,
        title: 'Pipes',
        summary: 'Built-in pipes, custom pipes, pure vs impure',
        pdfUrl: 'pdfs/week3-day3-pipes.pdf',
      },
      {
        number: 4,
        title: 'Custom Directives',
        summary: 'Attribute directives, host bindings, inject()',
        pdfUrl: 'pdfs/week3-day4-custom-directives.pdf',
      },
      {
        number: 5,
        title: 'Timed Challenge',
        summary: 'Forms, pipes & directives coding challenge',
        pdfUrl: 'pdfs/week3-day5-timed-challenge.pdf',
        challenge: {
          description:
            'Build a reactive login form with email and password validation. Email must be a valid address; password must be at least 6 characters. Show field errors on blur and disable the submit button while the form is invalid.',
          starterCode: `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// 🎯 Timed Challenge — Reactive Forms & Validators
// Build a login form:
//   • FormGroup with 'email' (required, valid email) and
//     'password' (required, minLength 6) controls
//   • Submit button disabled while form.invalid
//   • Error messages shown when a control is touched and invalid
//   • On submit, console.log(form.getRawValue())

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<!-- TODO -->',
})
export class LoginForm {
  // TODO: define FormGroup with typed controls and validators
}`,
          solutionCode: `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()"
          style="display:flex;flex-direction:column;gap:1rem;max-width:20rem">
      <div>
        <input formControlName="email" type="email" placeholder="Email"
               style="width:100%;padding:.5rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:.5rem;color:white" />
        @if (form.controls.email.touched && form.controls.email.invalid) {
          <p style="color:#f87171;font-size:.75rem;margin-top:.25rem">Valid email is required.</p>
        }
      </div>
      <div>
        <input formControlName="password" type="password" placeholder="Password"
               style="width:100%;padding:.5rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:.5rem;color:white" />
        @if (form.controls.password.touched && form.controls.password.invalid) {
          <p style="color:#f87171;font-size:.75rem;margin-top:.25rem">Min 6 characters required.</p>
        }
      </div>
      <button type="submit" [disabled]="form.invalid"
              style="padding:.5rem 1rem;border-radius:.5rem;background:#6366f1;color:white;cursor:pointer">
        Sign In
      </button>
    </form>
  \`,
})
export class LoginForm {
  form = new FormGroup({
    email:    new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
  });

  onSubmit() {
    if (this.form.valid) console.log(this.form.getRawValue());
  }
}`,
        },
      },
    ],
  },
  {
    id: 4,
    title: 'Architecture & Advanced Angular',
    theme: 'App design, SSR, SSG & performance',
    days: [
      {
        number: 1,
        title: 'Angular Architecture',
        summary: 'Feature organisation, scalable application design patterns',
        pdfUrl: 'pdfs/week4-day1-architecture.pdf',
      },
      {
        number: 2,
        title: 'Testing Fundamentals',
        summary: 'TestBed, component testing, service mocking',
      },
      {
        number: 3,
        title: 'SSR & SSG',
        summary: 'Server-side rendering, hydration, static site generation',
        pdfUrl: 'pdfs/week4-day3-ssr-ssg.pdf',
      },
      {
        number: 4,
        title: 'Performance Optimisation',
        summary: 'Deferrable views, lazy loading, bundle analysis',
        pdfUrl: 'pdfs/week4-day4-performance.pdf',
      },
      {
        number: 5,
        title: 'Architecture Challenge',
        summary: 'Apply architecture patterns in a timed exercise',
        pdfUrl: 'pdfs/week4-day5-architecture-challenge.pdf',
        challenge: {
          description:
            'Implement a signal-based CartService. It should hold a list of CartItems in a WritableSignal, expose computed totalPrice and itemCount, and provide addItem(), removeItem(), and clear() methods.',
          starterCode: `import { Injectable } from '@angular/core';

// 🎯 Architecture Challenge — Signal-based Service
// Implement CartService:
//   • items: WritableSignal<CartItem[]> starting empty
//   • totalPrice: computed sum of (price × quantity) for all items
//   • itemCount: computed sum of quantities
//   • addItem(item):  increments quantity if id exists, otherwise appends
//   • removeItem(id): filters out the matching item
//   • clear():        resets items to []

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  // TODO: implement
}`,
          solutionCode: `import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>([]);

  readonly totalPrice = computed(() =>
    this.items().reduce((sum, i) => sum + i.price * i.quantity, 0)
  );

  readonly itemCount = computed(() =>
    this.items().reduce((sum, i) => sum + i.quantity, 0)
  );

  addItem(item: CartItem): void {
    this.items.update(current => {
      const existing = current.find(i => i.id === item.id);
      if (existing) {
        return current.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  }

  removeItem(id: string): void {
    this.items.update(current => current.filter(i => i.id !== id));
  }

  clear(): void {
    this.items.set([]);
  }
}`,
        },
      },
    ],
  },
  {
    id: 5,
    title: 'Exam Prep',
    theme: 'Testing, weak spot repair & certification.dev',
    days: [
      {
        number: 1,
        title: 'Testing in Depth',
        summary: 'Unit tests, integration tests, Playwright e2e',
        pdfUrl: 'pdfs/week5-day1-testing.pdf',
      },
      {
        number: 2,
        title: 'Build & Deploy',
        summary: 'Production builds, environments, CI/CD pipeline',
      },
      {
        number: 3,
        title: 'Weak Spot Repair',
        summary: 'Identify and close knowledge gaps before the exam',
        pdfUrl: 'pdfs/week5-day3-weak-spot-repair.pdf',
      },
      {
        number: 4,
        title: 'Mock Certification Session',
        summary: 'Timed mock exam under real certification conditions',
      },
      {
        number: 5,
        title: 'Final Review & Exam Day',
        summary: 'Final review, exam checklist, certification.dev',
        pdfUrl: 'pdfs/week5-day5-final-review-exam-day.pdf',
        challenge: {
          description:
            'Full synthesis: build a NotesService (signal-based, injectable) and a NoteListComponent that injects it. The component should allow adding and removing notes, tracked by id.',
          starterCode: `import { Component, ChangeDetectionStrategy, Injectable } from '@angular/core';

// 🎯 Final Synthesis Challenge
// Part 1 — NotesService
//   • notes: WritableSignal<Note[]>
//   • add(text: string): appends a new note with auto-incremented id
//   • remove(id: number): filters the note out
//
// Part 2 — NoteListComponent
//   • Injects NotesService
//   • Template: text input + "Add" button, list of notes with "×" remove buttons
//   • Uses @for with track by id
//   • OnPush

export interface Note {
  id: number;
  text: string;
}

// TODO: implement NotesService

// TODO: implement NoteListComponent`,
          solutionCode: `import { Component, ChangeDetectionStrategy, Injectable, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Note { id: number; text: string; }

@Injectable({ providedIn: 'root' })
class NotesService {
  readonly notes = signal<Note[]>([]);
  private nextId = 1;

  add(text: string): void {
    if (!text.trim()) return;
    this.notes.update(n => [...n, { id: this.nextId++, text: text.trim() }]);
  }

  remove(id: number): void {
    this.notes.update(n => n.filter(note => note.id !== id));
  }
}

@Component({
  selector: 'app-note-list',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div style="max-width:28rem;padding:2rem">
      <div style="display:flex;gap:.5rem;margin-bottom:1rem">
        <input [(ngModel)]="newNote" placeholder="New note…"
               style="flex:1;padding:.5rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:.5rem;color:white" />
        <button (click)="addNote()"
                style="padding:.5rem 1rem;background:#6366f1;border-radius:.5rem;color:white;cursor:pointer">
          Add
        </button>
      </div>
      <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:.5rem">
        @for (note of svc.notes(); track note.id) {
          <li style="display:flex;justify-content:space-between;padding:.5rem .75rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:.5rem">
            {{ note.text }}
            <button (click)="svc.remove(note.id)" [attr.aria-label]="'Remove ' + note.text"
                    style="opacity:.5;cursor:pointer;background:none;border:none;color:white">×</button>
          </li>
        } @empty {
          <p style="opacity:.4;font-size:.875rem">No notes yet.</p>
        }
      </ul>
    </div>
  \`,
})
export class NoteListComponent {
  protected readonly svc = inject(NotesService);
  newNote = '';

  addNote() {
    this.svc.add(this.newNote);
    this.newNote = '';
  }
}`,
        },
      },
    ],
  },
];

export const TOTAL_LESSONS = COURSE_WEEKS.reduce((sum, w) => sum + w.days.length, 0);
