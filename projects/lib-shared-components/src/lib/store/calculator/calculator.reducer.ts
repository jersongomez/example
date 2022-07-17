import { Action, createReducer, on } from '@ngrx/store';
import {
  getAllFees,
  getAllFeesSuccess,
  resetCalculator,
  setCalculateFeesRq,
  setCurrentFee,
} from './calculator.actions';
import { CalculatorState, initialCalculatorState } from './calculator.state';

const _calculatorReducer = createReducer(
  initialCalculatorState,
  on(getAllFees, (state) => ({ ...state, loading: true })),
  on(getAllFeesSuccess, (state, { fees }) => ({
    ...state,
    allFees: fees,
    loading: false,
  })),
  on(setCurrentFee, (state, { fee }) => ({
    ...state,
    currentFee: fee,
  })),

  on(resetCalculator, () => Object.assign({}, initialCalculatorState)),

  on(setCalculateFeesRq, (state, { rq }) => ({
    ...state,
    calculateFeesRq: Object.assign({}, rq),
  }))
);

export function calculatorReducer(state: CalculatorState, action: Action) {
  return _calculatorReducer(state, action);
}
