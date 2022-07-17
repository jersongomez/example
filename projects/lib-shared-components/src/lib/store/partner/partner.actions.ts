import { createAction, props } from '@ngrx/store';
import { CreditFee } from '../calculator/calculator.state';
import { PartnerState } from './partner.state';

export enum PartnerActionsType {
  GET_INFO_PARTNER = '[Partner] GET_INFO_PARTNER',
  GET_INFO_PARTNER_SUCCESS = '[Partner] GET_INFO_PARTNER_SUCCESS',
  SET_VALUE_FEE_WITH_INSURANCE = '[Partner] SET_VALUE_FEE_WITH_INSURANCE',
  RESET_VALUE_FEE_WITH_INSURANCE = '[Partner] RESET_VALUE_FEE_WITH_INSURANCE',
  SET_VALUE_FEE_SHOW = '[Partner] SET_VALUE_FEE_SHOW',
  RESET_VALUE_FEE_SHOW = '[Partner] RESET_VALUE_FEE_WITH_INSURANCE',
}

export const getInfoPartner = createAction(PartnerActionsType.GET_INFO_PARTNER, props<{ payload: string }>());
export const getInfoPartnerSuccess = createAction(
  PartnerActionsType.GET_INFO_PARTNER_SUCCESS,
  props<{ payload: PartnerState }>()
);

export const setValueFeeWithInsurance = createAction(
  PartnerActionsType.SET_VALUE_FEE_WITH_INSURANCE,
  props<{ fees: CreditFee[] }>()
);

export const resetValueFeeWithInsurance = createAction(PartnerActionsType.RESET_VALUE_FEE_WITH_INSURANCE);

export const setValueFeeShow = createAction(
  PartnerActionsType.SET_VALUE_FEE_SHOW,
  props<{ showedParameters: number[] }>()
);

export const resetValueFeeShow = createAction(PartnerActionsType.RESET_VALUE_FEE_SHOW);
