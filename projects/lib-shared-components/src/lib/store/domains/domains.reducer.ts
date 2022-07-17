import { Action, createReducer, on } from '@ngrx/store';
import { getAllDomains, getAllDomainsSuccess } from './domains.actions';
import { DomainState } from './domains.state';

export const initialDomainsState: DomainState = {
  domains: [],
};

const _domainsReducer = createReducer(
  initialDomainsState,
  on(getAllDomains, (state) => state),
  on(getAllDomainsSuccess, (state, { payload }) => ({
    ...state,
    domains: payload,
  }))
);

export function domainsReducer(state: DomainState, action: Action) {
  return _domainsReducer(state, action);
}
