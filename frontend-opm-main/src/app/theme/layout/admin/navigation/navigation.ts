import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const adminNavigation = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'home',
        title: 'Home',
        type: 'item',
        url: '/home',
        classes: 'nav-item',
        icon: 'feather icon-home'
      },
      {
        id: 'clients-list',
        title: 'Clients',
        type: 'item',
        url: '/clients-list',
        classes: 'nav-item',
        icon: 'feather icon-users'
      },
      {
        id: 'employers-list',
        title: 'Technicians',
        type: 'item',
        url: '/employers-list',
        classes: 'nav-item',
        icon: 'feather icon-settings'
      },
      {
        id: 'folders',
        title: 'Folders',
        type: 'item',
        url: '/folders',
        classes: 'nav-item',
        icon: 'feather icon-folder'
      }
    ]
  },
]

const clientNavigation = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'home',
        title: 'Home',
        type: 'item',
        url: '/home',
        classes: 'nav-item',
        icon: 'feather icon-home'
      },
      {
        id: 'my-work-orders',
        title: 'My Work Orders',
        type: 'item',
        url: '/my-work-orders',
        classes: 'nav-item',
        icon: 'feather icon-briefcase'
      },
      {
        id: 'profile',
        title: 'Profile',
        type: 'item',
        url: '/profile',
        classes: 'nav-item',
        icon: 'feather icon-user',
        hidden: true
      }
    ]
  }
]

const technicianNavigation = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'home',
        title: 'Home',
        type: 'item',
        url: '/home',
        classes: 'nav-item',
        icon: 'feather icon-home'
      },
      {
        id: 'work-orders-assigned',
        title: 'Work Orders',
        type: 'item',
        url: '/work-orders-assigned',
        classes: 'nav-item',
        icon: 'feather icon-briefcase'
      },
      {
        id: 'profile',
        title: 'Profile',
        type: 'item',
        url: '/profile',
        classes: 'nav-item',
        icon: 'feather icon-user',
        hidden: true
      }
    ]
  }
]

@Injectable()
export class NavigationItem {
  get userRole() {
    return sessionStorage.getItem("authority")
  }

  get() {
    if (this.userRole === 'admin') return adminNavigation
    if (this.userRole === 'client') return clientNavigation
    return technicianNavigation;
  }
}
