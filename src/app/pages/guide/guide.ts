import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface WorkingRule {
  icon: string;
  text: string;
}

interface SessionFormat {
  icon: string;
  title: string;
  trigger: string;
  steps: string[];
}

interface WeekDay {
  name: string;
  hard?: string;
  points: string[];
}

interface Week {
  number: number;
  title: string;
  theme: string;
  days: WeekDay[];
}

interface CourseWeekOverview {
  number: number;
  theme: string;
  laneMix: string;
  friday: string;
}

interface SetupStep {
  number: number;
  title: string;
  description: string;
}

interface RoutineBlock {
  time: string;
  title: string;
  icon: string;
  steps: string[];
}

interface PowerTip {
  icon: string;
  title: string;
  description: string;
}

interface PdfEntry {
  file: string;
  upload: boolean;
  note: string;
}

@Component({
  selector: 'app-guide',
  imports: [RouterLink],
  templateUrl: './guide.html',
  styleUrl: './guide.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Guide {
  readonly jumpLinks: { id: string; label: string }[] = [
    { id: 'overview', label: 'What This Course Is' },
    { id: 'profile', label: 'My Profile' },
    { id: 'setup', label: 'Claude Setup' },
    { id: 'working-rules', label: 'Working Rules' },
    { id: 'sessions', label: 'Session Formats' },
    { id: 'routine', label: 'Daily Routine' },
    { id: 'schedule', label: '5-Week Schedule' },
    { id: 'tips', label: 'Power Tips' },
    { id: 'instructions', label: 'Instructions' },
    { id: 'pdfs', label: 'PDF Library' },
    { id: 'start', label: 'Start' },
    { id: 'progress', label: 'Progress' },
  ];

  readonly workingRules: WorkingRule[] = [
    { icon: '⚛️', text: 'Draw React analogies when introducing Angular concepts' },
    {
      icon: '🚩',
      text: 'Explicitly flag when a concept has <strong class="text-white">NO React equivalent</strong> — spend extra time on these: DI, structural directives, change detection / Zone.js / OnPush / zoneless, RxJS Observables',
    },
    {
      icon: '🔍',
      text: 'When I share code, review it as a <strong class="text-white">senior Angular certification examiner</strong> would — flag poor patterns, not just bugs',
    },
    {
      icon: '⚠️',
      text: 'Point out React habits that would cost me marks (mutating arrays with OnPush, methods in templates, missing track, inject() outside injection context)',
    },
    { icon: '📄', text: "Reference the day's PDF content when relevant" },
  ];

  readonly sessionFormats: SessionFormat[] = [
    {
      icon: '📖',
      title: 'Teaching Session',
      trigger: '"Week X, Day Y — teach me [topic]"',
      steps: [
        'Concept explanation with React analogy (or NO EQUIVALENT flag)',
        'Minimal working code example',
        'Side-by-side React vs Angular comparison',
        '3 gotcha questions to check understanding',
      ],
    },
    {
      icon: '🧪',
      title: 'Quiz Session',
      trigger: '"Quiz me on [topic] — 10 questions"',
      steps: [
        'Give all 10 MCQ (A/B/C/D) first — I answer all, then you score',
        'For every wrong answer: explain why, show correct code, give 1 follow-up question',
      ],
    },
    {
      icon: '💻',
      title: 'Coding Session',
      trigger: '"[Week X coding challenge] — here is my solution: [paste]"',
      steps: [
        'Review as senior examiner: correctness, patterns, performance',
        'What a senior would do differently',
        'Point out any React habits that crept in',
      ],
    },
    {
      icon: '🎯',
      title: 'Weak-Spot Session',
      trigger: '"Drill me on [topic] — 3-in-a-row rule"',
      steps: [
        'Keep drilling with targeted questions until I get 3 consecutive correct',
        'Then give a micro coding exercise on that topic',
      ],
    },
    {
      icon: '📝',
      title: 'Mock Exam',
      trigger: '"Give me a full senior mock exam — 40 questions"',
      steps: [
        'All 40 at once, I answer all before you score',
        'Score by category, explain every wrong answer',
        'List my top 3 weak areas',
      ],
    },
  ];

  readonly weeks: Week[] = [
    {
      number: 1,
      title: 'Angular Core + Signals',
      theme: 'Establish the Angular mental model from a React foundation',
      days: [
        {
          name: 'Monday — Components & Modern Template Syntax',
          hard: 'Fast lane · 4h',
          points: [
            'Standalone @Component, selector, template, imports array',
            'Template bindings: {{ }} interpolation, [prop] property, (event) event, [(ngModel)] two-way',
            'Modern control flow: @if / @else if / @else, @for with mandatory track, @switch',
            '@defer with all triggers: on idle, on viewport, on interaction, on hover, on timer(ms), when condition',
            '@placeholder, @loading (minimum Xms), @error blocks inside @defer',
          ],
        },
        {
          name: 'Tuesday — Dependency Injection',
          hard: 'Hard · NO React equivalent · 4–5h',
          points: [
            "@Injectable({ providedIn: 'root' }) — singleton service",
            'inject() function (modern) vs constructor injection (legacy)',
            'Injector tree: root → component → child — scope determines instance count',
            'Provider recipes: useClass, useValue, useFactory, useExisting',
            'InjectionToken<T> for non-class values (strings, config objects, primitives)',
          ],
        },
        {
          name: 'Wednesday — Signals & Reactivity',
          hard: 'Hard · 4–5h',
          points: [
            'signal<T>(init) — read with signal(), write with .set(), .update()',
            'computed(() => expr) — lazy, memoised, auto-tracked derived value',
            'effect(() => sideEffect) — auto-reruns when signals inside change, no dependency array',
            'input(), input.required<T>(), output<T>(), model<T>() — signal-based I/O',
            'toSignal(obs$, { initialValue }), toObservable(signal) — bridge functions',
          ],
        },
        {
          name: 'Thursday — Change Detection & OnPush',
          hard: 'Hard · NO React equivalent · 4–5h',
          points: [
            'Zone.js: monkey-patches async APIs → notifies Angular after each completes → full tree CD',
            'Default CD: checks EVERY component after every async event',
            'OnPush — 4 triggers: @Input() reference change, event from component, async pipe, manual markForCheck()',
            'ChangeDetectorRef: markForCheck(), detectChanges(), detach(), reattach()',
            'Zoneless: provideZonelessChangeDetection() — no Zone.js, only signals/markForCheck drive CD',
          ],
        },
        {
          name: 'Friday — Coding Drill',
          hard: '4h timed',
          points: [
            'ProductService (DI, providedIn: root, signal for products list)',
            'ProductListComponent (standalone, OnPush): inject service, @for track, computed filter, @if/@empty, @defer',
            'ProductCardComponent (dumb, OnPush): input.required<Product>(), output<string>()',
            'No any types, full TypeScript generics',
          ],
        },
      ],
    },
    {
      number: 2,
      title: 'Routing + RxJS + HttpClient',
      theme: 'The async layer. RxJS is the hardest React→Angular shift',
      days: [
        {
          name: 'Monday — Router & Lazy Loading',
          hard: 'Fast lane · 4h',
          points: [
            'provideRouter(routes, withComponentInputBinding(), withPreloading(...))',
            'loadComponent and loadChildren for lazy loading',
            'withComponentInputBinding() — route params bind to input() signals automatically',
            'Functional guards: CanActivateFn, CanDeactivateFn, CanMatchFn',
            'ResolveFn<T> — pre-fetch data before component loads',
          ],
        },
        {
          name: 'Tuesday — RxJS Fundamentals',
          hard: 'Hard · NO React equivalent · 5h',
          points: [
            'Observable<T> — cold by default (new producer per subscriber)',
            'Subject<T>, BehaviorSubject<T> (has current value), ReplaySubject<T>(n)',
            'Cold vs hot: HTTP = cold (2 subscribes = 2 requests); Subject = hot',
            'takeUntilDestroyed() — auto-unsubscribe on component destroy',
            'async pipe — subscribes, returns latest value, auto-unsubscribes, triggers OnPush CD',
          ],
        },
        {
          name: 'Wednesday — RxJS Operators Deep Dive',
          hard: 'Hard · 5h',
          points: [
            'switchMap — cancels previous inner; use for search/autocomplete',
            'mergeMap — runs concurrently; use for parallel HTTP requests',
            'concatMap — queues in order; use for sequential saves',
            'exhaustMap — ignores new while inner runs; use for login/submit buttons',
            'combineLatest, forkJoin, catchError, debounceTime, distinctUntilChanged, shareReplay(1)',
          ],
        },
        {
          name: 'Thursday — HttpClient & Interceptors',
          hard: 'Fast lane · 4h',
          points: [
            'provideHttpClient(withInterceptors([fn1, fn2])) — functional interceptors',
            'http.get<T>(url, { params, headers }) — always type the generic',
            'HttpRequest is immutable — always req.clone({ setHeaders: {...} })',
            'HttpInterceptorFn = (req, next) => next(clonedReq) — inject() works inside',
            "withFetch() required for SSR (XHR doesn't work in Node.js)",
          ],
        },
        {
          name: 'Friday — Timed Challenge',
          hard: '60 min',
          points: [
            'Movie search: HttpClient + debounceTime(300) + distinctUntilChanged + filter + switchMap',
            'isLoading signal (true in tap, false in finalize), errorMessage signal (catchError)',
            'toSignal() or async pipe — not both; OnPush everywhere; track in @for',
          ],
        },
      ],
    },
    {
      number: 3,
      title: 'Forms + Pipes + Directives',
      theme: 'The declarative layer. Forms are a major exam topic',
      days: [
        {
          name: 'Monday — Reactive Forms & Typed FormControl',
          hard: 'Fast lane · 4h',
          points: [
            "FormBuilder.nonNullable.group({field: ['init', [Validators.required]]}) — always nonNullable",
            'FormArray for dynamic lists',
            'Custom ValidatorFn: (ctrl: AbstractControl) => ValidationErrors | null',
            'Cross-field validator on FormGroup — e.g. password match',
            'AsyncValidatorFn: (ctrl) => Observable<ValidationErrors | null> — debounce with timer()',
            'Always form.getRawValue() on submit — never form.value',
          ],
        },
        {
          name: 'Tuesday — Template-Driven Forms & ngModel',
          hard: 'Hard · 4h',
          points: [
            "Import FormsModule in standalone component's imports array — easy to forget",
            "[(ngModel)]='prop' — two-way binding (banana in a box)",
            "name='fieldName' attribute — REQUIRED for ngForm to track the control",
            "#ref='ngModel' — template reference; .valid, .touched, .errors",
            'When to use: template-driven for simple forms; reactive for complex validation + testing',
          ],
        },
        {
          name: 'Wednesday — Pipes',
          hard: 'Fast lane · 3h',
          points: [
            'Built-in: currency, date, number, percent, uppercase, lowercase, titlecase, json, async, slice, keyvalue',
            '@if (obs$ | async; as val) — alias avoids double subscription',
            'Pure pipe (default): re-runs only on input reference change — like useMemo',
            'Impure pipe (pure: false): re-runs every CD cycle — expensive; prefer computed() signals',
            "@Pipe({ name: 'x', standalone: true, pure: true }) + implements PipeTransform",
          ],
        },
        {
          name: 'Thursday — Custom Directives',
          hard: 'Hard · NO React equivalent · 4–5h',
          points: [
            "@Directive({ selector: '[appName]', standalone: true })",
            'inject(ElementRef), inject(Renderer2) — always Renderer2 (SSR-safe)',
            "@HostListener('event'), @HostBinding('class.active') on host element",
            'Structural directive: inject(TemplateRef) + inject(ViewContainerRef)',
            'vcr.createEmbeddedView(tmpl) to render, vcr.clear() to remove',
            "* desugaring: *appUnless='cond' → <ng-template [appUnless]='cond'>",
          ],
        },
        {
          name: 'Friday — Timed Challenge',
          hard: '90 min',
          points: [
            'Multi-step registration form: firstName, lastName, email (async unique), password, confirmPassword',
            'Cross-field password match validator on FormGroup',
            'PasswordStrengthPipe (pure) — weak/medium/strong',
            'appFocusHighlight attribute directive — CSS class on focus/blur via Renderer2',
          ],
        },
      ],
    },
    {
      number: 4,
      title: 'Architecture + Performance + SSR',
      theme: 'Senior-level thinking. Not just "does it work" but "is it well-designed"',
      days: [
        {
          name: 'Monday — Large-Scale App Architecture',
          hard: 'Hard · 5h',
          points: [
            'Feature-based folder structure: core/ shared/ features/[feature]/',
            'Smart component: injects facade, OnPush, manages page state',
            'Dumb component: input() / output() only, OnPush, no service injection, easily testable',
            'Facade pattern: wraps store + service; components ONLY talk to facade; exposes read-only signals',
            'APP_INITIALIZER — blocks app startup; ENVIRONMENT_INITIALIZER — feature-level bootstrap',
          ],
        },
        {
          name: 'Tuesday — State Management',
          hard: 'Hard · 5h',
          points: [
            'Signals service store: private _x = signal<T>(init) + readonly x = this._x.asReadonly()',
            'NgRx: createAction → createReducer(on(...)) → createSelector → createEffect',
            '@ngrx/signals: signalStore(withState, withComputed, withMethods) — modern NgRx',
            'When to use: signals service (small team, simple); NgRx (large team, DevTools needed)',
          ],
        },
        {
          name: 'Wednesday — SSR, SSG & Hydration',
          hard: 'Fast lane · 4h',
          points: [
            'ng add @angular/ssr — creates server.ts + app.config.server.ts',
            'provideClientHydration(withEventReplay()) — enables hydration + event replay',
            'provideHttpClient(withFetch()) — required for SSR',
            'isPlatformBrowser(inject(PLATFORM_ID)) — guard localStorage/window/document',
            "TransferState + makeStateKey<T>('key') — avoid double HTTP fetch server→browser",
          ],
        },
        {
          name: 'Thursday — Performance Optimisation',
          hard: 'Hard · 5h',
          points: [
            '@defer triggers: on idle|viewport|interaction|hover|timer(ms), when condition, prefetch on idle',
            '@for (x of arr(); track x.id) — always track; $index, $first, $last, $even, $odd',
            "CDK virtual scrolling: <cdk-virtual-scroll-viewport itemSize='72'> + *cdkVirtualFor",
            'Pure pipe > method in template — methods run every CD cycle, pipes are memoised',
            'NgOptimizedImage: [ngSrc], width, height (required), priority for LCP image',
          ],
        },
        {
          name: 'Friday — Architecture Challenge',
          hard: '90 min',
          points: [
            'Full e-commerce feature: folder structure, signals store, facade, smart/dumb split',
            'Lazy route, guard, resolver, @defer, SSR guards, NgOptimizedImage, pure pipe',
            'Write architectural decision comments throughout',
          ],
        },
      ],
    },
    {
      number: 5,
      title: 'Testing + Mock Exams + Weak-Spot Repair',
      theme: 'Consolidate, find gaps, simulate the real exam',
      days: [
        {
          name: 'Monday — Testing with TestBed',
          hard: 'Hard · 5h',
          points: [
            'TestBed.configureTestingModule({ imports: [StandaloneComp], providers: [...] })',
            'fixture.detectChanges() — mandatory after every state change (TestBed disables auto-CD)',
            "fixture.componentRef.setInput('propName', value) — correct way to set signal inputs in tests",
            'fakeAsync(() => { tick(300); }) — control time for debounce/interval tests',
            'provideHttpClientTesting() + HttpTestingController: expectOne(url), req.flush(data), verify()',
          ],
        },
        {
          name: 'Tuesday — Full Senior Mock Exam',
          hard: '90 min timed',
          points: [
            '40 MCQ covering all topics from Weeks 1–4',
            'Answer all 40 before pasting for scoring',
            'Score by category → identify top 3 weak areas → those drive Wednesday',
          ],
        },
        {
          name: 'Wednesday — Weak-Spot Repair',
          hard: '5h',
          points: [
            'Per topic: re-explain with fresh angle → 5 targeted questions → 3-in-a-row rule → micro coding exercise',
            'Re-test at end of day — confirm gaps are closed',
          ],
        },
        {
          name: 'Thursday — Full Coding Simulation',
          hard: '105 min timed',
          points: [
            'Real exam format: spec given, build from scratch, no lookups',
            'Submit for examiner review with 5 specific questions',
          ],
        },
        {
          name: 'Friday — Final Review & Exam Day',
          hard: '🎓 Exam',
          points: [
            'Morning: 20-concept rapid-fire + 10 React-developer traps + 5 warm-up questions',
            'Exam: certificates.dev/angular — 40 MCQ (90 min) + coding challenge (105 min)',
          ],
        },
      ],
    },
  ];

  readonly focusTopics: string[] = [
    'Dependency Injection — inject(), provider recipes, scoped instances',
    'RxJS operators — especially switchMap vs mergeMap vs exhaustMap',
    'Change detection — OnPush, markForCheck, zoneless',
    'Structural directives — TemplateRef, ViewContainerRef, * syntax',
    'Template-driven forms — ngModel, ngForm, two-way binding',
    'NgRx — actions, reducers, selectors, effects',
    'Testing OnPush components — setInput(), detectChanges() timing',
  ];

  readonly progress: { label: string; value: string; highlight?: boolean }[] = [
    { label: 'Current Week', value: 'Week 1', highlight: true },
    { label: 'Current Day', value: 'Monday', highlight: true },
    { label: 'Mock Exam Score', value: 'Not taken yet' },
    { label: 'Exam Date', value: 'Not booked yet' },
  ];

  readonly courseOverview: CourseWeekOverview[] = [
    {
      number: 1,
      theme: 'Angular core — components, DI, signals, change detection',
      laneMix: '3 hard · 1 fast · 1 drill',
      friday: '4h coding drill',
    },
    {
      number: 2,
      theme: 'Routing, RxJS, HttpClient',
      laneMix: '2 hard · 2 fast · 1 challenge',
      friday: '60-min timed challenge',
    },
    {
      number: 3,
      theme: 'Forms, pipes, directives',
      laneMix: '2 hard · 2 fast · 1 challenge',
      friday: '90-min timed challenge',
    },
    {
      number: 4,
      theme: 'Architecture, state, SSR, performance',
      laneMix: '4 hard · 1 fast · 1 challenge',
      friday: '90-min architecture challenge',
    },
    {
      number: 5,
      theme: 'Testing, mock exams, weak-spot repair',
      laneMix: 'All exam simulation',
      friday: 'Exam day',
    },
  ];

  readonly setupSteps: SetupStep[] = [
    {
      number: 1,
      title: 'Create the project',
      description:
        "In claude.ai, click Projects in the left sidebar → New project. Name it 'Angular Senior Cert Prep'. This is your permanent study space.",
    },
    {
      number: 2,
      title: 'Add project instructions',
      description:
        'Click the pencil/edit icon inside the project. Paste the content from angular-cert-project-instructions.md (the file generated alongside these PDFs). This tells Claude your background, schedule, and session format preferences.',
    },
    {
      number: 3,
      title: 'Upload reference PDFs',
      description:
        "Click 'Add content' or the upload icon in your project. Upload all PDF files from this course — one per day, per week. Claude can reference them when reviewing your code or when you ask 'what should I study today?'",
    },
    {
      number: 4,
      title: 'Always start sessions from inside the project',
      description:
        "Click 'New chat' WHILE you are inside the project view — not from the home sidebar. If you start from home, your project instructions are not loaded.",
    },
  ];

  readonly dailyRoutine: RoutineBlock[] = [
    {
      time: 'First 5 min',
      title: 'Open a new chat inside the project and set the context',
      icon: '🚀',
      steps: [
        'Start with: "I\'m on Week X, Day Y — [topic]. Let\'s begin."',
        'Claude loads your instructions and knows exactly where you are.',
      ],
    },
    {
      time: 'Main block · 2–3h',
      title: "Teaching or coding session on today's topic",
      icon: '📖',
      steps: [
        "Follow the day's PDF.",
        'For teaching days: ask Claude to teach, then do the mini-challenge.',
        'For coding days: read the spec, set the timer, build it, paste for review.',
      ],
    },
    {
      time: 'Second block · 1–2h',
      title: 'Quiz session or weak-spot drilling',
      icon: '🧪',
      steps: [
        'End the session with: "Quiz me on today\'s topic — 10 questions."',
        'Score yourself. Any topic where you score below 7/10 goes on your weak-spot list.',
      ],
    },
    {
      time: 'Last 5 min',
      title: 'Update your project instructions',
      icon: '📝',
      steps: [
        "Edit the 'Current Progress' section: update the week/day, check off mastered topics, add new weak spots.",
        'This keeps Claude perfectly calibrated for tomorrow.',
      ],
    },
  ];

  readonly powerTips: PowerTip[] = [
    {
      icon: '📎',
      title: 'Upload the cheat sheets',
      description:
        'Download the free Angular Signals and Modern Template Syntax cheat sheets from certificates.dev/cheat-sheets and upload them to your project. Claude can reference them when quizzing you.',
    },
    {
      icon: '🗣️',
      title: 'Use the exact opening phrase',
      description:
        "The session format phrases ('teach me', 'quiz me', 'drill me') are in your project instructions. Claude switches modes based on them — use them consistently.",
    },
    {
      icon: '📋',
      title: 'Paste code as text, not images',
      description:
        'When submitting coding challenges, paste raw TypeScript — not screenshots. Claude can read, run, and critique actual code far better than images.',
    },
    {
      icon: '🔄',
      title: 'Ask for analogies explicitly',
      description:
        "If a React analogy isn't clear, say: 'Give me a more concrete React comparison for this.' Claude will try different angles until it clicks.",
    },
    {
      icon: '📝',
      title: 'Mock exams in one message',
      description:
        "For quiz sessions: let Claude give all 10 questions first, then paste all 10 answers at once. Don't answer one at a time — it breaks the exam flow.",
    },
    {
      icon: '🎯',
      title: 'The 3-in-a-row rule',
      description:
        "In weak-spot sessions, tell Claude: 'Keep drilling me until I get 3 in a row correct, then stop.' This prevents moving on before you're solid.",
    },
    {
      icon: '🏆',
      title: 'Before exam day',
      description:
        "Ask Claude: 'Give me the 10 most common mistakes React developers make in the Angular senior exam.' This is a high-value 30-minute session.",
    },
  ];

  readonly pdfLibrary: PdfEntry[] = [
    {
      file: 'angular-cert-project-instructions.md',
      upload: false,
      note: 'Core context — paste into project instructions field. Claude reads this every session.',
    },
    {
      file: 'course-guide.pdf',
      upload: true,
      note: 'Reference for study routine and session formats.',
    },
    {
      file: 'week1-day1-components-template-syntax.pdf',
      upload: true,
      note: 'Reference during and after Monday Week 1.',
    },
    {
      file: 'week1-day2-dependency-injection.pdf',
      upload: true,
      note: 'Reference during and after Tuesday Week 1.',
    },
    {
      file: 'week1-day3-signals-reactivity.pdf',
      upload: true,
      note: 'Reference during and after Wednesday Week 1.',
    },
    {
      file: 'week1-day4-change-detection-onpush.pdf',
      upload: true,
      note: 'Reference during and after Thursday Week 1.',
    },
    {
      file: 'week1-day5-coding-drill.pdf',
      upload: true,
      note: 'Coding challenge spec for Friday Week 1.',
    },
    {
      file: 'week2-day1 through week2-day5',
      upload: true,
      note: 'Week 2 — Router, RxJS, HttpClient.',
    },
    {
      file: 'week3-day1 through week3-day5',
      upload: true,
      note: 'Week 3 — Forms, Pipes, Directives.',
    },
  ];

  readonly instructionsSample = `## Current Progress  ← update this section weekly
- Current week: Week 2
- Current day: Wednesday
- Mock exam score: Not taken yet
- Exam date: Not booked yet

## Topics needing extra time  ← check off as you master them
- [x] Dependency Injection  ← mastered Week 1
- [ ] RxJS operators — switchMap vs exhaustMap still shaky
- [ ] Change detection — OnPush mutation bug unclear
- [ ] Structural directives
- [ ] Template-driven forms`;
}
