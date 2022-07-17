export interface SubMenu {
  id: number;
  label: string;
  icon: string;
  url: string;
  document: boolean;
  showOnMobile: boolean;
  showOnTablet: boolean;
  showOnDesktop: boolean;
}

export interface Menu {
  id: number;
  label: string;
  icon: string;
  url: string;
  document: boolean;
  showOnMobile: boolean;
  showOnTablet: boolean;
  showOnDesktop: boolean;
  subMenu: [];
}

export interface MenuState {
  menus: Menu[];
  itemSelected: Menu;
}
