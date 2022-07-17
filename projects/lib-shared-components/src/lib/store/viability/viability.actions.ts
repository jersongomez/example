import { createAction, props } from '@ngrx/store';
import { CalculateFeeRq } from '../../models/calculator/calculate-fee.model';
import { ViabilityClient, ViabilityOtherInfo } from './viability.state';

export enum ViabilityActionsType {
  SET_DATA_TO_CALCULATOR = '[Viability] SET_DATA_TO_CALCULATOR',
  SET_CLIENT = '[Viability] SET_CLIENT',
  SET_OTHER_INFO = '[Viability] SET_OTHER_INFO',
  RESET_FLOW_MIDDLEWARE_DATA = '[Viability] RESET_FLOW_MIDDLEWARE_DATA',
}

export const setDataToCalculator = createAction(
  ViabilityActionsType.SET_DATA_TO_CALCULATOR,
  props<{ rq: CalculateFeeRq }>()
);

export const setClient = createAction(ViabilityActionsType.SET_CLIENT, props<{ client: ViabilityClient }>());

export const setOtherInfo = createAction(
  ViabilityActionsType.SET_OTHER_INFO,
  props<{ otherInfo: ViabilityOtherInfo }>()
);

export const resetFlowMiddlewareData = createAction(ViabilityActionsType.RESET_FLOW_MIDDLEWARE_DATA);
