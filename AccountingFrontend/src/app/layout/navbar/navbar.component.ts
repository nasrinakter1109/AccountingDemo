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
    this.userData = this.authService.getUserData();
    console.log({user1:this.userData})
  }
  toggleSidebar() {
    this.hideLabel = !this.hideLabel;
  }
  logout(){
    this.authService.logout();
  }
}
