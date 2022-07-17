import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Tasas } from '../../services/viability-v1/bizagiEnumTasas';
import { ViabilityEffects } from './viability.effects';
import { viabilityReducer } from './viability.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('viabilityState', viabilityReducer),
    EffectsModule.forFeature([ViabilityEffects]),
  ],
  providers: [DecimalPipe, Tasas],
})
export class ViabilityStoreModule { }
