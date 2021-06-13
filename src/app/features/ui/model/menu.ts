import { NavItem } from './nav-item';

export let menu: NavItem[] = [
  {
    displayName: 'Addresses',
    iconName: 'dashboard',
    route: 'dashboard'
  },
  {
    displayName: 'User',
    iconName: 'face',
    route: 'user',
    children: [
      {
        displayName: 'Account Info',
        iconName: 'account_box',
        route: 'user/account-info'
      }
    ]
  },
  {
    displayName: 'Sign Out',
    iconName: 'highlight_off'
  }
];
