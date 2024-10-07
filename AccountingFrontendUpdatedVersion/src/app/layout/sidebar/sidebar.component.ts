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
  openSubmenuIndex: number | null = null; // Tracks which submenu is open
  activeIndex: number | null = null; // Tracks the active main menu item
  activeSubmenuIndex: number | null = null; // Tracks the active submenu item

  // Define your menu items with submenus
  menuItems = [
    { name: 'Dashboard', link: '/account/dashboard' },
    {
      name: 'Settings',
      submenuItems: [
        { name: 'User', link: '/account/user' },
        { name: 'RolePermission', link: '/account/role-permission' }
      ]
    },
    {
      name: 'Accounting',
      submenuItems: [
        { name: 'Account/Ledger', link: '/account/account-list' },
        { name: 'Supplier', link: '/account/supplier-list' },
        { name: 'Customer', link: '/account/customer-list' },
        { name: 'Bank', link: '/account/bank-list' },
        { name: 'Journal', link: '/account/journal-list' }
      ]
    },
    {
      name: 'Invoice',
      submenuItems: [
        { name: 'Sales Invoice', link: '/account/salesInvoice-list' },
        { name: 'Purchase Invoice', link: '/account/purchaseInvoice-list' },
        { name: 'Sales Return Invoice', link: '/account/salesReturnInvoice-list' },
        { name: 'Purchase Return Invoice', link: '/account/purchaseReturnInvoice-list' }
      ]
    },
    { name: 'Reports', submenuItems: [{ name: 'Financial Report', link: '/account/finalcialrpt' }] }
  ];

  // Toggle submenu open/close and manage active states
  toggleSubmenu(index: number) {
    if (this.activeIndex === index) {
      // Toggle submenu open/close
      this.openSubmenuIndex = this.openSubmenuIndex === index ? null : index;
    } else {
      // Set the active main menu item and open the submenu
      this.activeIndex = index;
      this.openSubmenuIndex = index;
      this.activeSubmenuIndex = null; // Reset submenu active state
    }
  }

  // Handle submenu item activation
  setActiveSubmenu(index: number, submenuIndex: number) {
    this.activeIndex = index; // Keep track of which main menu is active
    this.activeSubmenuIndex = submenuIndex; // Track which submenu is active
  }
}
