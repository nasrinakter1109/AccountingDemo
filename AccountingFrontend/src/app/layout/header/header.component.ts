import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
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
