import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainLayoutComponent {
  hideLabel = false;


  toggleSidebar() {
    this.hideLabel = !this.hideLabel;
  }
}
