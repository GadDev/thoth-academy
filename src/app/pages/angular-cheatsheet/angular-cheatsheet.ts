import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface CodeExample {
  label: string;
  code: string;
}

interface Section {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  examples?: CodeExample[];
  bullets?: string[];
  tip?: string;
  analogy?: string;
  tableRows?: { situation: string; use: string }[];
}

@Component({
  selector: 'app-angular-cheatsheet',
  imports: [RouterLink],
  templateUrl: './angular-cheatsheet.html',
  styleUrl: './angular-cheatsheet.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularCheatsheet {
  readonly sections: Section[] = [
    {
      id: 'evolution',
      icon: '🧠',
      title: 'Evolution Overview',
      subtitle: 'What is Angular?',
      paragraphs: [
        'Angular is a frontend framework used to build web applications (like dashboards, apps, admin panels).',
      ],
      bullets: [
        'Angular 16 → introduced Signals (new way to manage state)',
        'Angular 17 → improved templates (@if, @for)',
        'Angular 21 → makes everything faster, simpler, and more flexible',
      ],
      tip: 'Angular is moving from complex patterns → to simpler and more reactive code',
    },
    {
      id: 'communication',
      icon: '🔄',
      title: 'Component Communication',
      subtitle: 'How components talk to each other',
      paragraphs: ['A component is a piece of UI (like a button, card, or page).'],
      examples: [
        {
          label: 'Angular 16/17',
          code: `@Input() data!: string;\n@Output() updated = new EventEmitter<string>();`,
        },
        {
          label: 'Angular 21 alternative',
          code: `data = input<string>();\nupdated = output<string>();`,
        },
      ],
      analogy:
        'Parent = boss, Child = employee. Boss gives instructions (@Input), employee reports back (@Output).',
      tip: 'You can keep using @Input / @Output safely — they are NOT outdated',
    },
    {
      id: 'signals',
      icon: '⚡',
      title: 'Signals (New Reactivity System)',
      subtitle: 'Simpler state management',
      paragraphs: [
        'In older Angular, managing data changes could be complex. Signals make it simpler and more predictable.',
      ],
      examples: [
        {
          label: 'Reactive value',
          code: `count = signal(0);`,
        },
        {
          label: 'Derived value',
          code: `double = computed(() => count() * 2);`,
        },
        {
          label: 'Side effect',
          code: `effect(() => {\n  console.log(count());\n});`,
        },
      ],
      analogy:
        'A signal is a variable that automatically updates the UI and notifies Angular when it changes.',
      tip: 'Signals = simpler state management',
    },
    {
      id: 'templates',
      icon: '🎨',
      title: 'Template Syntax',
      subtitle: 'The HTML of your component',
      paragraphs: [],
      examples: [
        {
          label: 'Angular 16 way',
          code: `<div *ngIf="isVisible"></div>`,
        },
        {
          label: 'Angular 17+ way',
          code: `@if (isVisible) {\n  <div></div>\n}`,
        },
      ],
      bullets: ['Looks like JavaScript', 'Easier to read', 'Less confusing for beginners'],
      tip: 'New syntax = cleaner and more intuitive',
    },
    {
      id: 'standalone',
      icon: '🧱',
      title: 'Standalone Components',
      subtitle: 'No more NgModules',
      paragraphs: [
        'Standalone components are self-contained components that can work independently without being wrapped in an NgModule.',
        'Before Angular 14, every component had to be declared in an NgModule. This created a lot of boilerplate and unnecessary structure.',
        "Standalone components can declare their own dependencies (imports, providers) and exist on their own. They're simpler to understand, test, and reuse.",
      ],
      examples: [
        {
          label: 'Old way (with NgModule)',
          code: `@NgModule({\n  declarations: [AppComponent]\n})\nexport class AppModule {}`,
        },
        {
          label: 'New way (standalone)',
          code: `bootstrapApplication(AppComponent);\n\n// Inside component:\n@Component({\n  selector: 'app-root',\n  imports: [CommonModule, RouterModule]\n})\nexport class AppComponent {}`,
        },
      ],
      tip: 'Less boilerplate → Faster development',
    },
    {
      id: 'zonejs',
      icon: '🚫',
      title: 'Zone.js',
      subtitle: 'Advanced but important',
      paragraphs: [
        'Zone.js is a tool Angular uses to detect changes automatically. It can be heavy and hard to control.',
        'Angular 21 improvement: you can run Angular without it.',
      ],
      bullets: ['Better performance', 'More control'],
      tip: "Beginners can ignore this at first — but it's important for advanced optimization",
    },
    {
      id: 'routing',
      icon: '🧭',
      title: 'Routing',
      subtitle: 'Navigation system of your app',
      paragraphs: ['Routing lets you navigate between pages, like /home or /dashboard.'],
      examples: [
        {
          label: 'Angular 16+',
          code: `provideRouter(routes);\n\n// Define routes\n{ path: 'home', component: HomeComponent }`,
        },
      ],
      tip: 'Routing = navigation system of your app',
    },
    {
      id: 'pitfalls',
      icon: '⚠️',
      title: 'Common Pitfalls',
      subtitle: 'Things to avoid',
      paragraphs: [],
      bullets: [
        '❌ Mixing old and new patterns (user$ observable + user signal at the same time)',
        "❌ Overcomplicating things — don't use Signals + RxJS + everything at once",
        '❌ Rewriting everything — not needed',
      ],
      tip: 'Keep things simple and consistent',
    },
    {
      id: 'migration',
      icon: '🚀',
      title: 'Migration Strategy',
      subtitle: 'Beginner-friendly steps',
      paragraphs: [],
      examples: [
        {
          label: 'Step 1 — Upgrade Angular',
          code: `ng update @angular/core`,
        },
        {
          label: 'Steps 4 — Improve templates',
          code: `@if (condition) { ... }\n@for (item of items; track item.id) { ... }`,
        },
      ],
      bullets: [
        "Step 2 — Keep existing code (don't rewrite everything)",
        'Step 3 — Learn Signals gradually, start with small components',
        'Step 5 — Optimize later, only when needed',
      ],
    },
    {
      id: 'rules',
      icon: '🧠',
      title: 'Practical Rules',
      subtitle: 'Use the right tool for the job',
      paragraphs: [],
      tableRows: [
        { situation: 'Parent → Child', use: '@Input / input()' },
        { situation: 'Child → Parent', use: '@Output / output()' },
        { situation: 'Local state', use: 'Signals' },
        { situation: 'Async data', use: 'RxJS' },
      ],
      tip: 'Start with components, inputs/outputs, and basic signals',
    },
  ];

  readonly jumpLinks = this.sections.map((s) => ({ id: s.id, label: `${s.icon} ${s.title}` }));
}
