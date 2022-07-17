import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Constants } from 'src/app/utils/constants';
import { Parameter, PartnerState } from './partner.state';

const findParamByType = (type: string) => (parameter: Parameter) => parameter.type === type;
const findParamByTypeName = (type: string, name: string) => (parameter: Parameter) =>
  parameter.type === type && parameter.name === name;

export const partnerKey = 'partnerState';
export const selectFeaturePartner = createFeatureSelector<PartnerState>(partnerKey);

export const selectPartnerInfo = createSelector(selectFeaturePartner, (partner) => partner);
export const selectAllParameters = createSelector(selectFeaturePartner, (partner) => partner.parameters);
export const selectPartnerId = createSelector(selectFeaturePartner, (partner) => partner.id);
export const selectMinAmount = createSelector(
  selectAllParameters,
  (parameters) => parameters.length && parameters.find(findParamByTypeName('monto', 'min')).numbericalValue
);
export const selectMaxAmount = createSelector(
  selectAllParameters,
  (parameters) => parameters.length && parameters.find(findParamByTypeName('monto', 'max')).numbericalValue
);
export const selectMaxProduct = createSelector(
  selectAllParameters,
  (parameters) => parameters.length && parameters.find(findParamByTypeName('monto', 'maxProduct')).numbericalValue
);
export const selectPercentMin = createSelector(
  selectAllParameters,
  (parameters) =>
    parameters.length && parameters.find(findParamByTypeName(Constants.PORCENTAJE, Constants.MIN)).numbericalValue
);
export const selectPercentMax = createSelector(
  selectAllParameters,
  (parameters) =>
    parameters.length && parameters.find(findParamByTypeName(Constants.PORCENTAJE, Constants.MAX)).numbericalValue
);
export const selectBizagiDealerAccParam = createSelector(
  selectAllParameters,
  (parameters) => parameters.length && parameters.find(findParamByTypeName(Constants.BIZAGI, Constants.DEALER_ACCOUNT))
);
export const selectBizagiRateParam = createSelector(
  selectAllParameters,
  (parameters) => parameters.length && parameters.find(findParamByTypeName(Constants.BIZAGI, Constants.TASA))
);
export const selectBizagiRateByFeeParam = createSelector(
  selectAllParameters,
  (parameters, props: any) =>
    parameters.length && parameters.find(findParamByTypeName(Constants.BIZAGI, `${Constants.TASA}${props.numberFee}`))
);
export const selectBizagiDealerAgreeParam = createSelector(
  selectAllParameters,
  (parameters) =>
    parameters.length && parameters.find(findParamByTypeName(Constants.BIZAGI, Constants.DEALER_AGREEMENT))
);
export const selectInstallmentsParam = createSelector(selectAllParameters, (parameters) =>
  parameters.filter(findParamByType('cuota'))
);
export const selectInstallmentsWithoutInsuranceParam = createSelector(selectAllParameters, (parameters) =>
  parameters.filter(findParamByType('cuota-sininteres'))
);
export const selectGracePeriod = createSelector(
  selectAllParameters,
  (parameters) => parameters.length && parameters.find(findParamByTypeName('valor', 'gracePeriod')).numbericalValue
);
export const selectPercentBquilla = createSelector(
  selectAllParameters,
  (parameters) =>
    parameters.length &&
    parameters.find(findParamByTypeName(Constants.PORCENTAJE, Constants.MINBQUILLA)).numbericalValue
);
export const selectCitiesParams = createSelector(selectAllParameters, (parameters) =>
  parameters.filter(findParamByType('ciudad'))
);
