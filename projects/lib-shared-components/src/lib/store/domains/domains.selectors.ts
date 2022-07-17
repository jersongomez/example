import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Constants } from 'src/app/utils/constants';
import { Domain, DomainState } from './domains.state';

export const domainsKey = 'domainState';
export const selectFeatureDomain = createFeatureSelector<DomainState>(domainsKey);

export const selectAllDomains = createSelector(selectFeatureDomain, (state: DomainState) => state.domains);

export const selectTypesId = createSelector(selectAllDomains, (domains: Domain[]) =>
  domains.filter((domain) => domain.domain === Constants.DOMAIN_IDENTIFICACION)
);

export const selectTypesContract = createSelector(selectAllDomains, (domains: Domain[]) =>
  domains.filter((domain) => domain.domain === Constants.TYPE_CONTRACT)
);
