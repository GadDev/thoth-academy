import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Question {
  id: string;
  number: number;
  icon: string;
  title: string;
  tag: 'common' | 'differentiator' | 'bonus' | 'killer';
  body: Block[];
}

interface Block {
  type: 'paragraph' | 'comparison' | 'bullets' | 'answer' | 'tip' | 'quote';
  text?: string;
  label?: string;
  rows?: { react: string; angular: string }[];
  items?: string[];
}

@Component({
  selector: 'app-interview-cheatsheet',
  imports: [RouterLink],
  templateUrl: './interview-cheatsheet.html',
  styleUrl: './interview-cheatsheet.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterviewCheatsheet {
  readonly tagLabels: Record<Question['tag'], string> = {
    common: 'Common',
    differentiator: 'Differentiator',
    bonus: 'Bonus',
    killer: 'Killer answer',
  };

  readonly tagColors: Record<Question['tag'], string> = {
    common: 'bg-white/5 text-white/50 border-white/10',
    differentiator: 'bg-accent/10 text-accent/80 border-accent/20',
    bonus: 'bg-primary/10 text-primary border-primary/20',
    killer: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  readonly tagLegend: { tag: Question['tag']; label: string }[] = [
    { tag: 'common', label: 'Common question' },
    { tag: 'differentiator', label: 'Key differentiator' },
    { tag: 'bonus', label: 'Bonus point' },
    { tag: 'killer', label: 'Killer answer' },
  ];

  readonly jumpLinks = this.questions.map((q) => ({
    id: q.id,
    label: `${q.icon} ${q.number}. ${q.title}`,
  }));

  get questions(): Question[] {
    return [
      {
        id: 'difference',
        number: 1,
        icon: '🧠',
        title: 'React vs Angular difference',
        tag: 'common',
        body: [
          {
            type: 'paragraph',
            text: 'React is a UI library focused on building components with a flexible, JavaScript-first approach, while Angular is a full framework that enforces a structured architecture with clear separation of concerns — components, services, directives, and dependency injection.',
          },
          {
            type: 'paragraph',
            text: 'In React, logic is composed using hooks inside components, whereas Angular externalizes logic into services and uses dependency injection to manage it at scale.',
          },
          {
            type: 'comparison',
            rows: [
              { react: 'UI library', angular: 'Full framework' },
              { react: 'JS-first (JSX)', angular: 'HTML-first (templates)' },
              { react: 'Hooks for logic reuse', angular: 'Services + DI' },
              { react: 'Flexibility + composition', angular: 'Structure + scalability' },
            ],
          },
          {
            type: 'answer',
            text: 'Angular trades flexibility for consistency, which becomes very valuable in large teams and enterprise applications.',
          },
        ],
      },
      {
        id: 'components',
        number: 2,
        icon: '🧩',
        title: 'Component model',
        tag: 'common',
        body: [
          {
            type: 'comparison',
            rows: [
              { react: 'Component = UI + logic + state', angular: 'Component = UI only' },
              { react: 'Hooks = logic reuse', angular: 'Service = logic' },
              { react: '(no direct equiv.)', angular: 'Directive = DOM behavior' },
              { react: 'helper function', angular: 'Pipe = formatting' },
            ],
          },
          {
            type: 'answer',
            text: 'Angular enforces separation of concerns, whereas React co-locates logic and UI.',
          },
        ],
      },
      {
        id: 'state',
        number: 3,
        icon: '🔄',
        title: 'State management',
        tag: 'common',
        body: [
          {
            type: 'comparison',
            rows: [
              { react: 'useState', angular: 'signal()' },
              { react: 'useReducer', angular: 'signal() + update()' },
              { react: 'useMemo', angular: 'computed()' },
              { react: 'Context API', angular: 'Service (singleton via DI)' },
            ],
          },
          {
            type: 'answer',
            text: "Angular's signals are conceptually similar to React state and memoization combined, but they are framework-native and integrate directly with change detection — no manual dependency arrays needed.",
          },
        ],
      },
      {
        id: 'effects',
        number: 4,
        icon: '⚡',
        title: 'Side effects',
        tag: 'common',
        body: [
          {
            type: 'comparison',
            rows: [
              { react: 'useEffect(...)', angular: 'effect() — reactive to signals' },
              { react: 'useEffect(fn, [])', angular: 'ngOnInit() — runs once' },
              { react: 'useEffect cleanup', angular: 'ngOnDestroy / DestroyRef' },
            ],
          },
          {
            type: 'answer',
            text: 'Angular separates lifecycle and reactive side effects more explicitly, while React unifies them in useEffect.',
          },
        ],
      },
      {
        id: 'di',
        number: 5,
        icon: '💉',
        title: 'Dependency Injection',
        tag: 'differentiator',
        body: [
          {
            type: 'comparison',
            rows: [
              { react: 'Context API (manual wiring)', angular: 'Built-in DI container' },
              { react: 'useContext()', angular: 'inject()' },
              { react: 'No scoping', angular: 'root / component / route scoping' },
            ],
          },
          {
            type: 'answer',
            text: 'Angular has a powerful built-in dependency injection system which allows services to be easily shared and scoped across the application without manual wiring like React context.',
          },
          {
            type: 'tip',
            text: 'This makes Angular particularly well-suited for large-scale applications with complex service layers.',
          },
        ],
      },
      {
        id: 'reusability',
        number: 6,
        icon: '🧱',
        title: 'Reusability patterns',
        tag: 'differentiator',
        body: [
          {
            type: 'comparison',
            rows: [
              { react: 'Custom hooks (logic)', angular: 'Services (logic)' },
              { react: 'Props spreading / HOC', angular: 'Directives (DOM behavior)' },
              { react: 'render props', angular: 'Content projection (ng-content)' },
            ],
          },
          {
            type: 'answer',
            text: 'In React, reuse is mostly logic-driven via hooks, whereas Angular allows both logic reuse via services and DOM behavior reuse via directives.',
          },
        ],
      },
      {
        id: 'templates',
        number: 7,
        icon: '🎨',
        title: 'Templates vs JSX',
        tag: 'common',
        body: [
          {
            type: 'comparison',
            rows: [
              { react: 'JSX — everything in JS', angular: 'HTML templates with bindings' },
              { react: '{expr && <Comp />}', angular: '@if (expr) { <app-comp /> }' },
              { react: 'arr.map()', angular: '@for (item of arr; track item.id)' },
              { react: 'onClick', angular: '(click)' },
              { react: 'className', angular: '[class]' },
            ],
          },
          {
            type: 'answer',
            text: 'Angular separates template and logic, improving readability in large teams, while React keeps everything in JavaScript for maximum flexibility.',
          },
        ],
      },
      {
        id: 'directives',
        number: 8,
        icon: '🔧',
        title: 'Directives — Angular advantage',
        tag: 'differentiator',
        body: [
          {
            type: 'paragraph',
            text: "Angular directives allow you to attach reusable behavior directly to DOM elements, which React doesn't natively support outside of custom hooks and props spreading.",
          },
          {
            type: 'bullets',
            label: 'Real-world examples:',
            items: [
              '*appHasRole="ADMIN" — role-based access control',
              'appTooltip — declarative tooltips',
              'appHighlight — hover effects without component overhead',
              'appIntersectionObserver — lazy loading behavior',
            ],
          },
          {
            type: 'answer',
            text: "Directives are one of Angular's most powerful features for DRY, reusable DOM behavior — and often the clearest differentiator in interviews.",
          },
        ],
      },
      {
        id: 'data-flow',
        number: 9,
        icon: '🔁',
        title: 'Data flow',
        tag: 'common',
        body: [
          {
            type: 'comparison',
            rows: [
              { react: 'Props (down)', angular: 'input() (down)' },
              { react: 'Callbacks (up)', angular: 'output() (up)' },
              { react: 'Context (cross-tree)', angular: 'Service via DI (cross-tree)' },
              { react: 'State management lib', angular: 'Signal-based store in service' },
            ],
          },
          {
            type: 'answer',
            text: 'Both follow unidirectional data flow, but Angular complements it with dependency injection for shared state, making the architecture more structured.',
          },
        ],
      },
      {
        id: 'performance',
        number: 10,
        icon: '⚙️',
        title: 'Performance model',
        tag: 'differentiator',
        body: [
          {
            type: 'comparison',
            rows: [
              { react: 'Re-renders entire subtree', angular: 'Zone.js change detection' },
              { react: 'useMemo / useCallback opt-in', angular: 'OnPush opt-in' },
              { react: 'React.memo', angular: 'ChangeDetectionStrategy.OnPush' },
              { react: 'Concurrent rendering', angular: 'Signals (fine-grained, no zones)' },
            ],
          },
          {
            type: 'answer',
            text: "Angular traditionally uses change detection with Zone.js, but with signals it's moving toward fine-grained reactivity similar to React — without virtual DOM overhead.",
          },
        ],
      },
      {
        id: 'testing',
        number: 11,
        icon: '🧪',
        title: 'Testing',
        tag: 'common',
        body: [
          {
            type: 'comparison',
            rows: [
              { react: 'Jest + React Testing Library', angular: 'Jest / Karma + TestBed' },
              { react: 'No built-in DI mocking', angular: 'TestBed provides / overrides DI' },
              { react: 'Render + query', angular: 'ComponentFixture + query' },
            ],
          },
          {
            type: 'answer',
            text: 'Angular provides more out-of-the-box testing tooling including TestBed for DI overrides, whereas React relies more on the ecosystem.',
          },
        ],
      },
      {
        id: 'when-to-choose',
        number: 12,
        icon: '🚀',
        title: 'When to choose Angular vs React',
        tag: 'common',
        body: [
          {
            type: 'bullets',
            label: 'Choose Angular when:',
            items: [
              'Large enterprise applications with many developers',
              'Strong, consistent architecture is required',
              'Complex business logic with many services',
              'Long-term maintainability is a priority',
              'Teams need guardrails and conventions',
            ],
          },
          {
            type: 'bullets',
            label: 'Choose React when:',
            items: [
              'Maximum flexibility matters',
              'Fast iteration and prototyping',
              'Smaller teams with strong autonomy',
              'Custom or unconventional architectures',
              'Rich ecosystem integration is key',
            ],
          },
          {
            type: 'answer',
            text: 'I would choose Angular for structured, enterprise-grade applications where consistency and maintainability are key, and React for projects requiring flexibility and rapid iteration.',
          },
        ],
      },
      {
        id: 'modern-angular',
        number: 13,
        icon: '✨',
        title: 'Modern Angular awareness',
        tag: 'bonus',
        body: [
          {
            type: 'bullets',
            label: 'Key modern Angular features to mention:',
            items: [
              'Signals — fine-grained reactivity, no Zone.js needed',
              'Standalone components — no NgModules required',
              'New control flow — @if, @for, @switch in templates',
              'input() / output() functions — signal-based component API',
              'inject() — replaces constructor injection',
              'Deferred loading — @defer blocks for lazy UI',
            ],
          },
          {
            type: 'answer',
            text: "I'm particularly interested in Angular's move toward signals and standalone components, which simplifies the mental model and reduces reliance on older patterns like NgModules.",
          },
        ],
      },
      {
        id: 'positioning',
        number: 14,
        icon: '💡',
        title: 'Personal positioning',
        tag: 'bonus',
        body: [
          {
            type: 'quote',
            text: "Coming from a React background, I appreciate Angular's structure and built-in features like dependency injection and directives. It reduces the need to make architectural decisions repeatedly and helps scale applications more predictably.",
          },
          {
            type: 'tip',
            text: 'Acknowledge your React background as an asset — you understand both paradigms, which is valuable.',
          },
        ],
      },
      {
        id: 'killer',
        number: 15,
        icon: '🔥',
        title: 'Killer comparison line',
        tag: 'killer',
        body: [
          {
            type: 'quote',
            text: 'React gives you the tools to build your architecture, while Angular gives you the architecture upfront.',
          },
          {
            type: 'tip',
            text: 'Use this as a closing line — it demonstrates framework-level thinking and leaves a strong impression.',
          },
        ],
      },
    ];
  }
}
