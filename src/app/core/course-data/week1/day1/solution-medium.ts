export const WEEK1_DAY1_SOLUTION_MEDIUM = `import { Component, ChangeDetectionStrategy, signal, computed, input } from '@angular/core';
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
}`;
