import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioGroupComponent } from './radio-group.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [RadioGroupComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [RadioGroupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RadioGroupModule {}
