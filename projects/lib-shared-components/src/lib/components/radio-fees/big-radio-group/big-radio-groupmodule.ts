import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigRadioGroupComponent } from './big-radio-groupcomponent';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [BigRadioGroupComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [BigRadioGroupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BigRadioGroupModule {}
