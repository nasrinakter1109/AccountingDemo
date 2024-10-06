import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  hideLabel = false;
  userData:any;
  constructor(private authService: AuthService) {
    //this.userData = this.authService.getUserData();

  }
  toggleSidebar() {
    this.hideLabel = !this.hideLabel;
  }
  logout(){}
}
