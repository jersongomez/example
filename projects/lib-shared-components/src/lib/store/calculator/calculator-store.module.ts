import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CalculatorEffects } from './calculator.effects';
import { calculatorReducer } from './calculator.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('calculatorState', calculatorReducer),
    EffectsModule.forFeature([CalculatorEffects]),
  ],
  providers: [],
})
export class CalculatorStoreModule {}
