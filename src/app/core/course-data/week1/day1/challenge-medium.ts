import type { CourseChallenge } from '../../types';

export const WEEK1_DAY1_CHALLENGE_MEDIUM: CourseChallenge = {
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
};
