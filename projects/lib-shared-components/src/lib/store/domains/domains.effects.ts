import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { concatMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { DomainsService } from 'src/app/services/shared/domains.service';
import { DomainsActionsType } from './domains.actions';
import { selectAllDomains } from './domains.selectors';
import { Domain, DomainState } from './domains.state';

@Injectable()
export class DomainsEffects {
  loadDomains$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsActionsType.GET_ALL_DOMAINS),
      concatMap((action) => of(action).pipe(withLatestFrom(this.store.pipe(select(selectAllDomains))))),
      mergeMap(([_, stateRs]) => {
        if (!!stateRs && stateRs.length > 0) {
          return of({ type: DomainsActionsType.GET_ALL_DOMAINS_SUCCESS, payload: stateRs });
        }
        return this.domainService
          .mappingDomainsRs()
          .pipe(map((domains: Domain[]) => ({ type: DomainsActionsType.GET_ALL_DOMAINS_SUCCESS, payload: domains })));
      })
    )
  );

  constructor(private actions$: Actions, private domainService: DomainsService, private store: Store<DomainState>) {}
}
