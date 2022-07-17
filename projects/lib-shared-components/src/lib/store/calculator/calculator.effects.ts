import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap } from 'rxjs/operators';
import { CalculatorService } from '../../services/calculator';
import { PartnerActionsType } from '../partner/partner.actions';
import { CalculatorActionsType } from './calculator.actions';
import { CalculatorState, CreditFee } from './calculator.state';

@Injectable()
export class CalculatorEffects {
  loadAllFees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CalculatorActionsType.GET_ALL_FEES),
      mergeMap(({ urlApi, rq }) => {
        return this.calculatorService.mappingAllFeesRs(urlApi, rq).pipe(
          mergeMap((rs: CreditFee[]) => [
            { type: CalculatorActionsType.GET_ALL_FEES_SUCCESS, fees: rs },
            { type: PartnerActionsType.SET_VALUE_FEE_WITH_INSURANCE, fees: rs },
          ])
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<CalculatorState>,
    private calculatorService: CalculatorService
  ) {}
}
