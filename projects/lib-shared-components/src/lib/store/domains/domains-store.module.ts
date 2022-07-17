import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DomainsService } from 'src/app/services/shared/domains.service';
import { DomainsEffects } from './domains.effects';
import { DomainsFacade } from './domains.facade';
import { domainsReducer } from './domains.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('domainState', domainsReducer),
    EffectsModule.forFeature([DomainsEffects]),
  ],
  providers: [DomainsService],
})
export class DomainsStoreModule {}
