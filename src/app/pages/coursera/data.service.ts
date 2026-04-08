import { Injectable } from '@angular/core';

export interface DataItem {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class Dataservice {
  private data: DataItem[] = [
    { id: 1, name: 'Item 1', description: 'Description for Item 1' },
    { id: 2, name: 'Item 2', description: 'Description for Item 2' },
    { id: 3, name: 'Item 3', description: 'Description for Item 3' },
  ];

  getData() {
    return this.data;
  }

  getItemById(id: number) {
    return this.data.find((item) => item.id === id);
  }

  addItem(item: { id: number; name: string; description: string }) {
    this.data.push(item);
  }

  updateItem(id: number, updatedItem: { name?: string; description?: string }) {
    const item = this.getItemById(id);
    if (item) {
      item.name = updatedItem.name ?? item.name;
      item.description = updatedItem.description ?? item.description;
    }
  }

  deleteItem(id: number) {
    this.data = this.data.filter((item) => item.id !== id);
  }
}
