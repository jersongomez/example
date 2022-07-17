import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ViabilityState } from './viability.state';

export const viabilityKey = 'viabilityState';
export const selectFeatureViability = createFeatureSelector<ViabilityState>(viabilityKey);

export const selectFlowMiddlewareData = createSelector(
  selectFeatureViability,
  (viabilityState) => viabilityState.flowMiddlewareData
);
export const selectCreditInfo = createSelector(
  selectFlowMiddlewareData,
  (flowMiddlewareData) => flowMiddlewareData.creditInfo
);
export const selectClient = createSelector(selectFlowMiddlewareData, (flowMiddlewareData) => flowMiddlewareData.client);
export const selectOtherInfo = createSelector(
  selectFlowMiddlewareData,
  (flowMiddlewareData) => flowMiddlewareData.otherInfo
);
