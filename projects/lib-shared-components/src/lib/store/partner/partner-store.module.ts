import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { partnerReducer } from './partner.reducer';
import { AliadoService } from 'src/app/services/shared/aliado.service';
import { PartnerEffects } from './partner.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('partnerState', partnerReducer),
    EffectsModule.forFeature([PartnerEffects]),
  ],
  providers: [AliadoService],
})
export class PartnerStoreModule {}
