import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CalculateFeeRq } from '../../models/calculator/calculate-fee.model';
import { resetFlowMiddlewareData, setClient, setDataToCalculator, setOtherInfo } from './viability.actions';
import { selectClient, selectCreditInfo, selectOtherInfo } from './viability.selectors';
import { ViabilityClient, ViabilityCreditInfo, ViabilityOtherInfo, ViabilityState } from './viability.state';

@Injectable({
  providedIn: 'root',
})
export class ViabilityFacade {
  creditInfo$: Observable<ViabilityCreditInfo>;
  client$: Observable<ViabilityClient>;
  otherInfo$: Observable<ViabilityOtherInfo>;

  constructor(private store: Store<ViabilityState>) {
    this.creditInfo$ = store.pipe(select(selectCreditInfo));
    this.client$ = store.pipe(select(selectClient));
    this.otherInfo$ = store.pipe(select(selectOtherInfo));
  }

  setDataToCalculator(rq: CalculateFeeRq) {
    this.store.dispatch(setDataToCalculator({ rq }));
  }

  setClient(client: ViabilityClient) {
    this.store.dispatch(setClient({ client }));
  }

  setOtherInfo(otherInfo: ViabilityOtherInfo) {
    this.store.dispatch(setOtherInfo({ otherInfo }));
  }

  resetFlowMiddlewareData() {
    this.store.dispatch(resetFlowMiddlewareData());
  }
}
