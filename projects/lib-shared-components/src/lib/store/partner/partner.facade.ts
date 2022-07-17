import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getInfoPartner, resetValueFeeWithInsurance, setValueFeeShow, resetValueFeeShow } from './partner.actions';
import {
  selectBizagiDealerAccParam,
  selectBizagiDealerAgreeParam,
  selectBizagiRateParam,
  selectInstallmentsParam,
  selectInstallmentsWithoutInsuranceParam,
  selectMaxAmount,
  selectMinAmount,
  selectPercentMin,
  selectPercentMax,
  selectPartnerId,
  selectPartnerInfo,
  selectGracePeriod,
  selectMaxProduct,
  selectBizagiRateByFeeParam,
  selectPercentBquilla,
  selectCitiesParams,
} from './partner.selectors';
import { Parameter, PartnerState } from './partner.state';

@Injectable({
  providedIn: 'root',
})
export class PartnerFacade {
  partnerId$: Observable<number>;
  partnerInfo$: Observable<PartnerState>;
  minAmount$: Observable<number>;
  maxAmount$: Observable<number>;
  maxProduct$: Observable<number>;
  percentMin$: Observable<number>;
  percentMax$: Observable<number>;
  bizagiDealerAccParam$: Observable<Parameter>;
  bizagiRateParam$: Observable<Parameter>;
  bizagiDealerAgreeParam$: Observable<Parameter>;
  installmentsParam$: Observable<Parameter[]>;
  installmentsWithoutInsuranceParam$: Observable<Parameter[]>;
  gracePeriod$: Observable<number>;
  percentBquilla$: Observable<number>;
  citiesParams$: Observable<Parameter[]>;

  constructor(private store: Store<PartnerState>) {
    this.partnerId$ = store.pipe(select(selectPartnerId));
    this.partnerInfo$ = store.pipe(select(selectPartnerInfo));
    this.minAmount$ = store.pipe(select(selectMinAmount));
    this.maxAmount$ = store.pipe(select(selectMaxAmount));
    this.maxProduct$ = store.pipe(select(selectMaxProduct));
    this.percentMin$ = store.pipe(select(selectPercentMin));
    this.percentMax$ = store.pipe(select(selectPercentMax));
    this.bizagiDealerAccParam$ = store.pipe(select(selectBizagiDealerAccParam));
    this.bizagiRateParam$ = store.pipe(select(selectBizagiRateParam));
    this.bizagiDealerAgreeParam$ = store.pipe(select(selectBizagiDealerAgreeParam));
    this.installmentsParam$ = store.pipe(select(selectInstallmentsParam));
    this.installmentsWithoutInsuranceParam$ = store.pipe(select(selectInstallmentsWithoutInsuranceParam));
    this.gracePeriod$ = store.pipe(select(selectGracePeriod));
    this.percentBquilla$ = store.pipe(select(selectPercentBquilla));
    this.citiesParams$ = store.pipe(select(selectCitiesParams));
  }

  getInfoPartnertByName(parnert: string): void {
    this.store.dispatch(getInfoPartner({ payload: parnert }));
  }

  resetValueFeeWithInsurance(): void {
    this.store.dispatch(resetValueFeeWithInsurance());
  }

  setValueFeeShow(showedParameters: number[]): void {
    this.store.dispatch(setValueFeeShow({ showedParameters }));
  }

  resetValueFeeShow(): void {
    this.store.dispatch(resetValueFeeShow());
  }

  bizagiRateByFeeParam(numberFee: number): Observable<Parameter> {
    return this.store.pipe(select(selectBizagiRateByFeeParam, { numberFee }));
  }
}
