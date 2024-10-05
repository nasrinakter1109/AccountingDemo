import { animate, transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { hide, show } from '../../Shared/animations';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        useAnimation(show, {
          params: {
            duration: '2000ms'
          }
        }),
        animate(200),
      ]),
      transition(':leave', [
        useAnimation(hide, {
          params: {
            duration: '2000ms'
          }
        }),
        animate(200)
      ])
    ])
  ]
})
export class SidebarComponent {
  openSubmenuIndex: number | null = null; // Track which submenu is open
  activeIndex: number | null = null; // Track which menu item is active

  // Define your menu items with submenus
  menuItems = [
    { name: 'Dashboard', link: '/' },
    {
      name: 'Settings',
      submenuItems: [
        { name: 'User', link: '/user' },
        { name: 'RolePermission', link: '/role-permission' },
      ]
    },
    {
      name: 'Accounting',
      submenuItems: [
        { name: 'Account/Ledger', link: '/account-list' },
        { name: 'Supplier', link: '/supplier-list' },
        { name: 'Customer', link: '/customer-list' },
        { name: 'Bank', link: '/bank-list' },
        { name: 'Journal', link: '/journal-list' },
      ]
    },
    {
      name: 'Invoice',
      submenuItems: [
        { name: 'Sales Invoice', link: '/salesInvoice-list' },
        { name: 'Purcash Invoice', link: '/purchaseInvoice-list' },
        { name: 'Sales Return Invoice', link: '/salesReturnInvoice-list' },
        { name: 'Purchase Return Invoice', link: '/purchaseReturnInvoice-list' },
      ]
    },
    {
      name: 'Reports',
      submenuItems: [
        { name: 'Financial Report', link: '/finalcialrpt' },
      ]
    },
  ];

  // Method to toggle submenu and set active index
  toggleSubmenu(index: number) {
    if (this.activeIndex === index) {
      // If the same menu item is clicked, toggle the submenu
      this.openSubmenuIndex = this.openSubmenuIndex === index ? null : index;
    } else {
      // Set the active index and open the submenu
      this.activeIndex = index;
      this.openSubmenuIndex = index; // Open the submenu if it's different
    }
  }

  // Method to set the active index when a submenu item is clicked
  setActiveSubmenu(index: number) {
    this.activeIndex = index; // Set the active index to the clicked submenu item
  }
}
