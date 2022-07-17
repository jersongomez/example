import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getMenu, selectMenu } from './menu.actions';
import { selectAllMenus, selectedMenu, selectWithoutCurUrl } from './menu.selectors';
import { Menu, MenuState } from './menu.state';

@Injectable({
  providedIn: 'root',
})
export class MenuFacade {
  menuWithoutCurUrl$: Observable<Menu[]>;

  constructor(private store: Store<MenuState>, private router: Router) {}

  getMenuByName(parnert: string): void {
    this.store.dispatch(getMenu({ payload: parnert }));
  }

  getMainMenu(): Observable<Menu[]> {
    return this.store.pipe(select(selectAllMenus));
  }

  menuWithoutCurUrl(): void {
    this.menuWithoutCurUrl$ = this.store.pipe(select(selectWithoutCurUrl, { url: this.router.url }));
  }

  withoutCurrentUrl(): Observable<Menu[]> {
    return this.store.pipe(select(selectWithoutCurUrl, { url: this.router.url }));
  }

  selectMenu(menu: Menu): void {
    this.store.dispatch(selectMenu({ payload: menu }));
  }

  getSelectedMenu() {
    return this.store.pipe(select(selectedMenu));
  }
}
