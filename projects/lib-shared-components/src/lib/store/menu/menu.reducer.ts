import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { getMenu, getMenuSuccess, selectMenu } from './menu.actions';
import { MenuState } from './menu.state';

export const initialMenuState: MenuState = {
  menus: [],
  itemSelected: null,
};

const _menuReducer = createReducer(
  initialMenuState,
  on(getMenu, (state) => state),
  on(getMenuSuccess, (state, { payload }) => ({
    ...state,
    menus: payload,
  })),
  on(selectMenu, (state, { payload }) => ({
    ...state,
    itemSelected: payload,
  }))
);

export function menuReducer(state: MenuState, action: Action) {
  return _menuReducer(state, action);
}
