import { createAction, props } from '@ngrx/store';
import { Domain } from './domains.state';

export enum DomainsActionsType {
  GET_ALL_DOMAINS = '[Domains] GET_ALL_DOMAINS',
  GET_ALL_DOMAINS_SUCCESS = '[Domains] GET_ALL_DOMAINS_SUCCESS',
}

export const getAllDomains = createAction(DomainsActionsType.GET_ALL_DOMAINS);
export const getAllDomainsSuccess = createAction(
  DomainsActionsType.GET_ALL_DOMAINS_SUCCESS,
  props<{ payload: Domain[] }>()
);
