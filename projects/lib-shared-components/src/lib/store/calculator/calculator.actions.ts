import { createAction, props } from '@ngrx/store';
import { CalculateFeeRq } from '../../models/calculator/calculate-fee.model';
import { CreditFee } from './calculator.state';

export enum CalculatorActionsType {
  GET_ALL_FEES = '[Calculator] GET_ALL_FEES',
  GET_ALL_FEES_SUCCESS = '[Calculator] GET_ALL_FEES_SUCCESS',
  SET_CURRENT_FEE = '[Calculator] SET_CURRENT_FEE',
  RESET_CALCULATOR = '[Calculator] RESET_CALCULATOR',
  SET_CALCULATE_FEES_RQ = '[Calculator] SET_CALCULATE_FEES_RQ',
}

export const getAllFees = createAction(
  CalculatorActionsType.GET_ALL_FEES,
  props<{ urlApi: string; rq: CalculateFeeRq }>()
);
export const getAllFeesSuccess = createAction(
  CalculatorActionsType.GET_ALL_FEES_SUCCESS,
  props<{ fees: CreditFee[] }>()
);
export const resetCalculator = createAction(CalculatorActionsType.RESET_CALCULATOR);
export const setCurrentFee = createAction(CalculatorActionsType.SET_CURRENT_FEE, props<{ fee: CreditFee }>());
export const setCalculateFeesRq = createAction(
  CalculatorActionsType.SET_CALCULATE_FEES_RQ,
  props<{ rq: CalculateFeeRq }>()
);
