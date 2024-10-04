import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  hideLabel = false;

  toggleSidebar() {
    this.hideLabel = !this.hideLabel;
  }
  logout(){}
}
