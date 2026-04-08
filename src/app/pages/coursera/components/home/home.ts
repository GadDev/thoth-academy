import { Component, inject } from '@angular/core';
import { Child } from '../child/child';
import { Highlight } from '../../highlight';
import { Dataservice } from '../../data.service';
@Component({
  selector: 'app-home',
  imports: [Child, Highlight],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  private dataService = inject(Dataservice);

  SuperAdmin = true;
  Admin = false;
  color = 'blue';
  itemList = ['Item 1', 'Item 2', 'Item 3'];
  selectedItem = '';

  OnItemSelected(item: string) {
    this.selectedItem = item;
  }

  addItem() {
    const newItem = `Item ${this.itemList.length + 1}`;
    this.itemList.push(newItem);
    this.dataService.addItem({
      id: this.itemList.length,
      name: newItem,
      description: `Description for ${newItem}`,
    });
  }
}
