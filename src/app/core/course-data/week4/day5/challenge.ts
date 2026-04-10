import type { CourseChallenge } from '../../types';

export const WEEK4_DAY5_CHALLENGE: CourseChallenge = {
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
};
