import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CalculateFeeRq } from '../../models/calculator/calculate-fee.model';
import { getAllFees, setCurrentFee, resetCalculator, setCalculateFeesRq } from './calculator.actions';
import { selectAllFees, selectCurrentFee, selectLoading, selectCalculateFeesRq } from './calculator.selectors';
import { CalculatorState, CreditFee } from './calculator.state';

@Injectable({
  providedIn: 'root',
})
export class CalculatorFacade {
  currentFee$: Observable<CreditFee>;
  allFees$: Observable<CreditFee[]>;
  loadingFees$: Observable<boolean>;
  calculateFeesRq$: Observable<CalculateFeeRq>;

  constructor(private store: Store<CalculatorState>) {
    this.currentFee$ = store.pipe(select(selectCurrentFee));
    this.allFees$ = store.pipe(select(selectAllFees));
    this.loadingFees$ = store.pipe(select(selectLoading));
    this.calculateFeesRq$ = store.pipe(select(selectCalculateFeesRq));
  }

  public getAllFees(urlApi: string, rq: CalculateFeeRq): void {
    this.store.dispatch(setCalculateFeesRq({ rq }));
    this.store.dispatch(getAllFees({ urlApi, rq }));
  }

  public setCurrentFee(fee: CreditFee) {
    this.store.dispatch(setCurrentFee({ fee }));
  }

  public resetCalculator() {
    this.store.dispatch(resetCalculator());
  }
}
