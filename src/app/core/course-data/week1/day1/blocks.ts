import type { LessonBlock } from '../../types';

export const WEEK1_DAY1_BLOCKS: LessonBlock[] = [
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
];
