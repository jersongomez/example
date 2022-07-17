import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { concatMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { MenuService } from 'src/app/services/shared/menu.service';
import { MenuActionsType } from './menu.actions';
import { selectAllMenus } from './menu.selectors';
import { MenuState } from './menu.state';

@Injectable()
export class MenuEffects {
  loadMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActionsType.GET_MENU),
      concatMap((action) => of(action).pipe(withLatestFrom(this.store.pipe(select(selectAllMenus))))),
      mergeMap(([{ payload }, stateRs]) => {
        if (!!stateRs && stateRs.length > 0) {
          return of({ type: MenuActionsType.GET_MENU_SUCCESS, payload: stateRs });
        }
        return this.menuService
          .mappingMenuRs(payload)
          .pipe(map((menuRs) => ({ type: MenuActionsType.GET_MENU_SUCCESS, payload: menuRs })));
      })
    )
  );

  constructor(private actions$: Actions, private menuService: MenuService, private store: Store<MenuState>) {}
}
