import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Menu, MenuState } from './menu.state';

export const menuKey = 'menuState';
export const selectFeatureMenu = createFeatureSelector<MenuState>(menuKey);

export const selectAllMenus = createSelector(selectFeatureMenu, (menuState) => menuState.menus);
export const selectedMenu = createSelector(selectFeatureMenu, (menuState) => menuState.itemSelected);
export const selectWithoutCurUrl = createSelector(selectAllMenus, (menus: Menu[], props: any) =>
  menus.filter((menu: Menu) => menu.url !== props.url)
);
