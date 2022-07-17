import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { concatMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { AliadoService } from 'src/app/services/shared/aliado.service';
import { PartnerActionsType } from './partner.actions';
import { selectPartnerInfo } from './partner.selectors';
import { PartnerState } from './partner.state';

@Injectable()
export class PartnerEffects {
  loadPartner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartnerActionsType.GET_INFO_PARTNER),
      concatMap((action) => of(action).pipe(withLatestFrom(this.store.pipe(select(selectPartnerInfo))))),
      mergeMap(([{ payload }, stateRs]) => {
        if (!!stateRs && !!stateRs.id) {
          return of({ type: PartnerActionsType.GET_INFO_PARTNER_SUCCESS, payload: stateRs });
        }

        return this.aliadoService
          .mappingPartnerRs(payload)
          .pipe(map((partner) => ({ type: PartnerActionsType.GET_INFO_PARTNER_SUCCESS, payload: partner })));
      })
    )
  );

  constructor(private actions$: Actions, private aliadoService: AliadoService, private store: Store<PartnerState>) {}
}
