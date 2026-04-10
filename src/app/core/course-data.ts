export interface CourseChallenge {
  difficulty?: 'easy' | 'medium' | 'hard';
  description: string;
  starterCode: string;
  solutionCode: string;
}

// ─── Lesson content blocks ──────────────────────────────────────────────────

export interface LessonHeadingBlock {
  type: 'heading';
  key: string;
}

export interface LessonParagraphBlock {
  type: 'paragraph';
  key: string;
}

export interface LessonCodeBlock {
  type: 'code';
  code: string;
  language?: string;
  captionKey?: string;
}

export interface LessonTableBlock {
  type: 'table';
  captionKey?: string;
  headers: string[];
  rows: string[][];
}

export interface LessonListBlock {
  type: 'list';
  itemKeys: string[];
}

export interface LessonQABlock {
  type: 'qa';
  items: Array<{ questionKey: string; answerKey: string }>;
}

export type LessonBlock =
  | LessonHeadingBlock
  | LessonParagraphBlock
  | LessonCodeBlock
  | LessonTableBlock
  | LessonListBlock
  | LessonQABlock;

// ────────────────────────────────────────────────────────────────────────────

export interface CourseDay {
  number: number;
  title: string;
  summary: string;
  pdfUrl?: string;
  challenge?: CourseChallenge;
  challenges?: CourseChallenge[];
  blocks?: LessonBlock[];
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
        blocks: [
          { type: 'heading', key: 'lessons.w1d1.sec1Title' },
          { type: 'paragraph', key: 'lessons.w1d1.sec1Body' },
          {
            type: 'code',
            language: 'typescript',
            captionKey: 'lessons.w1d1.sec1CodeCaption',
            code: `// Minimal standalone component (Angular 17+)
import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting', // custom HTML tag for this component
  standalone: true, // no NgModule needed
  template: \`
    <h1>Hello, {{ name }}!</h1>
    <button (click)="greet()">Say hi</button>
  \`,
  imports: [], // array of other components, directives, pipes used in the template
})
export class GreetingComponent {
  name = 'Angular';
  greet() { alert('Hi from ' + this.name); }
}`,
          },
          { type: 'heading', key: 'The React brain translation:' },
          {
            type: 'list',
            itemKeys: [
              'Your react file exports a function -> Your Angular file exports a class',
              'JSX lives in the function body -> template lives in the decorator',
              '`useState`, `useEffect` etc. -> class properties and methods',
              'import MyComp from "./MyComp" for composition -> list MyComp in the imports array in the decorator',
            ],
          },
          {
            type: 'paragraph',
            key: "The imports array is critical and trips up React devs constantly. If you use <product-card /> in the template, ProductCardComponent must be in the imports array of the component's decorator. No imports array entry = Angular pretends the components doesn't exist, no error thrown",
          },
          { type: 'heading', key: 'lessons.w1d1.sec2Title' },
          {
            type: 'table',
            headers: ['React', 'Angular'],
            rows: [
              ['{value}', '{{ value }}'],
              ['className={expr}', '[class]="expr"'],
              ['onClick={handler}', '(click)="handler()"'],
              ['<input value={v} onChange={} />', '[(ngModel)]="v"  (two-way)'],
              ['style={{color: expr}}', '[style.color]="expr"'],
              ['{condition && <Comp/>}', '@if (condition) { <comp/> }'],
              ['{arr.map(x => <Li key={x.id}/>)}', '@for (x of arr; track x.id) { <li/> }'],
            ],
          },
          { type: 'heading', key: 'lessons.w1d1.sec3Title' },
          {
            type: 'code',
            language: 'html',
            captionKey: 'lessons.w1d1.sec3CodeCaption',
            code: `<!-- @if / @else if / @else -->
@if (user.isAdmin) {
  <admin-panel/>
} @else if (user.isLoggedIn) {
  <dashboard/>
} @else {
  <login-form/>
}

<!-- @for with mandatory track -->
@for (product of products; track product.id) {
  <product-card [item]="product"/>
} @empty {
  <p>No products found.</p>
}

<!-- @defer — lazy render on viewport entry -->
@defer (on viewport) {
  <heavy-chart/>
} @placeholder {
  <p>Loading chart…</p>
} @loading {
  <spinner/>
} @error {
  <p>Failed to load.</p>
}`,
          },
          { type: 'heading', key: 'lessons.w1d1.sec4Title' },
          {
            type: 'code',
            language: 'typescript',
            captionKey: 'lessons.w1d1.sec4CodeCaption',
            code: `import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-card',
  template: \`
    <div>
      <h2>{{ title() }}</h2>
      <button (click)="onDelete()">Delete</button>
    </div>
  \`,
})
export class CardComponent {
  // input() replaces @Input() — returns a signal
  title = input.required<string>();
  subtitle = input<string>(''); // optional with default

  // output() replaces @Output() + EventEmitter
  deleted = output<string>();

  onDelete() {
    this.deleted.emit(this.title()); // read signal with ()
  }
}

// Parent template:
// <app-card [title]="product.name" (deleted)="remove($event)" />`,
          },
          { type: 'heading', key: 'lessons.w1d1.sec5Title' },
          {
            type: 'list',
            itemKeys: [
              'lessons.w1d1.sec5Item1',
              'lessons.w1d1.sec5Item2',
              'lessons.w1d1.sec5Item3',
              'lessons.w1d1.sec5Item4',
              'lessons.w1d1.sec5Item5',
            ],
          },
          { type: 'heading', key: 'lessons.w1d1.sec6Title' },
          {
            type: 'qa',
            items: [
              { questionKey: 'lessons.w1d1.sec6Q1', answerKey: 'lessons.w1d1.sec6A1' },
              { questionKey: 'lessons.w1d1.sec6Q2', answerKey: 'lessons.w1d1.sec6A2' },
              { questionKey: 'lessons.w1d1.sec6Q3', answerKey: 'lessons.w1d1.sec6A3' },
            ],
          },
          { type: 'heading', key: 'lessons.w1d1.sec7Title' },
          {
            type: 'list',
            itemKeys: [
              'lessons.w1d1.sec7Item1',
              'lessons.w1d1.sec7Item2',
              'lessons.w1d1.sec7Item3',
              'lessons.w1d1.sec7Item4',
            ],
          },
        ],
        challenges: [
          // ─── EASY ────────────────────────────────────────────────────────
          {
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
          },
          // ─── MEDIUM ───────────────────────────────────────────────────────
          {
            difficulty: 'medium',
            description: `<p>Build a <code>ProductListComponent</code> that accepts a <code>products</code> array as input and lets the user filter by category. The filtered list must be derived reactively using <code>computed()</code> — not filtered inside the template.</p>
<ul class="mt-3 space-y-2">
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span><code>products = input&lt;Product[]&gt;(MOCK_PRODUCTS)</code></li>
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span><code>selectedCategory = signal('all')</code></li>
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span><code>categories = computed(() =&gt; ['all', ...uniqueCategories])</code></li>
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span><code>filtered = computed(() =&gt; ...)</code> — return all when <code>'all'</code>, else filter by selected</li>
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span>Template: category pill buttons + <code>@for (product of filtered(); track product.id)</code> with <code>@empty</code></li>
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span>Each card shows name, price via <code>CurrencyPipe</code>, and a category badge</li>
  <li class="flex items-start gap-2 text-sm text-white/70"><span aria-hidden="true" class="text-primary/70 font-bold mt-px shrink-0">•</span><code>OnPush</code>, <code>CurrencyPipe</code> in the <code>imports</code> array</li>
</ul>
<p><strong>Common React-dev trap:</strong> filtering inside the template with a method call instead of <code>computed()</code>.</p>`,
            starterCode: `import { Component, ChangeDetectionStrategy, signal, computed, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

// 🎯 Medium Challenge — Reactive filtering with signals
//
// Requirements:
//   • products = input<Product[]>(MOCK_PRODUCTS)  // use provided data as default
//   • selectedCategory = signal('all')
//   • categories = computed(() => ['all', ...unique categories from products()])
//   • filtered = computed(() => skip filter when 'all', else filter by selectedCategory())
//
// Template:
//   • Category pills: @for (cat of categories(); track cat)
//     – active pill styling with [style.background] or [class]
//   • Product grid: @for (product of filtered(); track product.id)
//     – show name, price (CurrencyPipe), category badge
//     – @empty fallback message
//   • OnPush

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Angular Hoodie',    price: 49, category: 'apparel'   },
  { id: 2, name: 'RxJS Mug',          price: 12, category: 'drinkware' },
  { id: 3, name: 'Signal Cap',         price: 24, category: 'apparel'   },
  { id: 4, name: 'TypeScript Bottle',  price: 18, category: 'drinkware' },
  { id: 5, name: 'NgRx Sticker Pack',  price: 8,  category: 'stickers'  },
];

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`<!-- TODO -->\`,
})
export class ProductList {
  readonly products = input<Product[]>(MOCK_PRODUCTS);
  // TODO: selectedCategory, categories, filtered
}`,
            solutionCode: `import { Component, ChangeDetectionStrategy, signal, computed, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

export interface Product { id: number; name: string; price: number; category: string; }

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Angular Hoodie',    price: 49, category: 'apparel'   },
  { id: 2, name: 'RxJS Mug',          price: 12, category: 'drinkware' },
  { id: 3, name: 'Signal Cap',         price: 24, category: 'apparel'   },
  { id: 4, name: 'TypeScript Bottle',  price: 18, category: 'drinkware' },
  { id: 5, name: 'NgRx Sticker Pack',  price: 8,  category: 'stickers'  },
];

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div style="display:flex;flex-direction:column;gap:1.5rem;padding:1.5rem">

      <!-- Category pills -->
      <div style="display:flex;flex-wrap:wrap;gap:.5rem" role="group" aria-label="Filter by category">
        @for (cat of categories(); track cat) {
          <button
            type="button"
            (click)="selectedCategory.set(cat)"
            style="padding:.375rem .875rem;border-radius:9999px;border:1px solid
                   rgba(255,255,255,.15);font-size:.8125rem;cursor:pointer;transition:all .15s"
            [style.background]="selectedCategory() === cat ? '#D4AF37' : 'rgba(255,255,255,.04)'"
            [style.color]="selectedCategory() === cat ? '#0B0F14' : 'inherit'"
            [style.font-weight]="selectedCategory() === cat ? '600' : '400'"
          >{{ cat === 'all' ? 'All' : cat }}</button>
        }
      </div>

      <!-- Product grid — note: computed(), not a method call -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(12rem,1fr));gap:1rem">
        @for (product of filtered(); track product.id) {
          <div style="padding:1rem;border:1px solid rgba(255,255,255,.08);
                      border-radius:.75rem;background:rgba(255,255,255,.02)">
            <span style="font-size:.7rem;font-weight:600;text-transform:uppercase;
                         letter-spacing:.05em;opacity:.4">{{ product.category }}</span>
            <p style="font-weight:600;margin:.375rem 0 .25rem">{{ product.name }}</p>
            <p style="color:#3ABEFF;font-weight:600">{{ product.price | currency }}</p>
          </div>
        } @empty {
          <p style="opacity:.3;font-size:.875rem;grid-column:1/-1">No products in this category.</p>
        }
      </div>
    </div>
  \`,
})
export class ProductList {
  readonly products = input<Product[]>(MOCK_PRODUCTS);

  // signal() replaces useState — mutable reactive value
  readonly selectedCategory = signal('all');

  // computed() replaces useMemo — recalculates only when products() changes
  readonly categories = computed(() => [
    'all',
    ...new Set(this.products().map(p => p.category)),
  ]);

  // computed() again — this is the correct Angular pattern, NOT a template method call
  readonly filtered = computed(() => {
    const cat = this.selectedCategory();
    return cat === 'all'
      ? this.products()
      : this.products().filter(p => p.category === cat);
  });
}`,
          },
          // ─── HARD ─────────────────────────────────────────────────────────
          {
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
          },
        ],
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
