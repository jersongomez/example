import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorSummaryComponent } from './calculator-summary.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [CalculatorSummaryComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CalculatorSummaryComponent],
})
export class CalculatorSummaryModule {}
