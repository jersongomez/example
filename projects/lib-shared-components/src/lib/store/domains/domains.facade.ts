import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAllDomains } from './domains.actions';
import { selectAllDomains, selectTypesContract, selectTypesId } from './domains.selectors';
import { Domain, DomainState } from './domains.state';

@Injectable({
  providedIn: 'root',
})
export class DomainsFacade {
  allDomains$: Observable<Domain[]>;
  typesId$: Observable<Domain[]>;
  typesContract$: Observable<Domain[]>;

  constructor(private store: Store<DomainState>) {
    this.allDomains$ = store.pipe(select(selectAllDomains));
    this.typesId$ = store.pipe(select(selectTypesId));
    this.typesContract$ = store.pipe(select(selectTypesContract));
  }

  getAllDomains(): void {
    this.store.dispatch(getAllDomains());
  }
}
