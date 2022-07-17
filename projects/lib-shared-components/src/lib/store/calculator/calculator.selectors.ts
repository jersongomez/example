import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CalculatorState } from './calculator.state';

export const calculatorKey = 'calculatorState';
export const selectFeatureCalculator = createFeatureSelector<CalculatorState>(calculatorKey);

export const selectCurrentFee = createSelector(selectFeatureCalculator, (state: CalculatorState) => state.currentFee);
export const selectAllFees = createSelector(selectFeatureCalculator, (state: CalculatorState) => state.allFees);
export const selectLoading = createSelector(selectFeatureCalculator, (state: CalculatorState) => state.loading);
export const selectCalculateFeesRq = createSelector(
  selectFeatureCalculator,
  (state: CalculatorState) => state.calculateFeesRq
);
