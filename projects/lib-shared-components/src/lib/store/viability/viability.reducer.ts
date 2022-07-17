import { Action, createReducer, on } from '@ngrx/store';
import { resetFlowMiddlewareData, setClient, setDataToCalculator, setOtherInfo } from './viability.actions';
import { initialViabilityState, ViabilityState } from './viability.state';

const _viabilityReducer = createReducer(
  initialViabilityState,
  on(setDataToCalculator, (state, { rq }) => ({
    ...state,
    flowMiddlewareData: {
      ...state.flowMiddlewareData,
      creditInfo: {
        ...state.flowMiddlewareData.creditInfo,
        requestAmount: rq.valorSolicitado,
        purchaseValue: rq.valorProducto,
        gracePeriod: !!rq.gracePeriod,
        insurancePolicy: !!rq.riskInsurance,
      },
    },
  })),
  on(setClient, (state, { client }) => ({
    ...state,
    flowMiddlewareData: {
      ...state.flowMiddlewareData,
      client: {
        ...state.flowMiddlewareData.client,
        ...client,
      },
    },
  })),
  on(setOtherInfo, (state, { otherInfo }) => ({
    ...state,
    flowMiddlewareData: {
      ...state.flowMiddlewareData,
      otherInfo: {
        ...state.flowMiddlewareData.otherInfo,
        ...otherInfo,
      },
    },
  })),
  on(resetFlowMiddlewareData, (state) => ({
    ...state,
    flowMiddlewareData: Object.assign({}, initialViabilityState.flowMiddlewareData),
  }))
);

export function viabilityReducer(state: ViabilityState, action: Action) {
  return _viabilityReducer(state, action);
}
