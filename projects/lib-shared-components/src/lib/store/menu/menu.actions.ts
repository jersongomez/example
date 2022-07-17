import { createAction, props } from '@ngrx/store';
import { Menu } from './menu.state';

export enum MenuActionsType {
  GET_MENU = '[Menu] GET_MENU',
  GET_MENU_SUCCESS = '[Menu] GET_MENU_SUCCESS',
  SELECT_MENU = '[Menu] SELECT_MENU',
}

export const getMenu = createAction(MenuActionsType.GET_MENU, props<{ payload: string }>());
export const getMenuSuccess = createAction(MenuActionsType.GET_MENU_SUCCESS, props<{ payload: Menu[] }>());
export const selectMenu = createAction(MenuActionsType.SELECT_MENU, props<{ payload: Menu }>());
