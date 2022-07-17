import { Action, createReducer, on } from '@ngrx/store';
import {
  getInfoPartner,
  getInfoPartnerSuccess,
  setValueFeeWithInsurance,
  resetValueFeeWithInsurance,
  setValueFeeShow,
  resetValueFeeShow,
} from './partner.actions';

import { PartnerState } from './partner.state';

export const initialPartnerState: PartnerState = {
  id: null,
  partnerName: '',
  active: false,
  date: '',
  parameters: [],
};

const _partnerReducer = createReducer(
  initialPartnerState,
  on(getInfoPartner, (state) => state),
  on(getInfoPartnerSuccess, (state, { payload }) => ({
    ...state,
    id: payload.id,
    partnerName: payload.partnerName,
    active: payload.active,
    date: payload.date,
    parameters: payload.parameters,
  })),
  on(setValueFeeWithInsurance, (state, { fees }) => {
    fees.forEach((fee) => {
      const findFeed = state.parameters.find(
        (parameter) => parameter.type === 'cuota' && parameter.numbericalValue === fee.feeNumber
      );

      if (findFeed) {
        findFeed.valueFeeWithInsurance = fee.valueFeeWithInsurance;
      }
    });
    return {
      ...state,
      parameters: [...state.parameters],
    };
  }),
  on(resetValueFeeWithInsurance, (state) => {
    state.parameters.forEach((parameter) => (parameter.valueFeeWithInsurance = null));
    return {
      ...state,
      parameters: [...state.parameters],
    };
  }),
  on(setValueFeeShow, (state, { showedParameters }) => {
    state.parameters.forEach(
      (parameter) => (parameter.valueFeeShow = !!showedParameters.includes(parameter.numbericalValue))
    );

    return {
      ...state,
      parameters: [...state.parameters],
    };
  }),
  on(resetValueFeeShow, (state) => {
    state.parameters.forEach((parameter) => (parameter.valueFeeShow = true));
    return {
      ...state,
      parameters: [...state.parameters],
    };
  })
);

export function partnerReducer(state: PartnerState, action: Action) {
  return _partnerReducer(state, action);
}
