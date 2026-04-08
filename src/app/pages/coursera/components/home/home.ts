import { Component } from '@angular/core';
import { Child } from '../child/child';
import { Highlight } from "../../highlight";

@Component({
  selector: 'app-home',
  imports: [Child, Highlight],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})

export class Home {
  SuperAdmin = true;
  Admin = false;
  color= 'blue';
  itemList = ['Item 1', 'Item 2', 'Item 3'];
  selectedItem: string = '';

  OnItemSelected(item: string) {
    this.selectedItem = item;
  }
}
