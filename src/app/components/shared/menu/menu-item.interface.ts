export interface MenuItem {
  id: number;
  label: string;
  icon: string;
  url: string;
  document?: boolean;
  showOnMobile: boolean;
  showOnTablet: boolean;
  showOnDesktop: boolean;
  subMenu: MenuItem[];
}
