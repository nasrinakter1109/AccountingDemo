import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ContainerComponent } from '../container/container.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule,  FooterComponent,NavbarComponent, SidebarComponent,ContainerComponent,RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MainLayoutComponent {
  hideLabel = false;  // Initialize hideLabel to false (expanded sidebar by default)

  // Method to toggle the sidebar state
  toggleSidebar() {
    this.hideLabel = !this.hideLabel;
  }
}
