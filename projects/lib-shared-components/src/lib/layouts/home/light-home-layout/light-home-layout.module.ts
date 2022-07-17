import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightHomeLayoutComponent } from './light-home-layout.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [LightHomeLayoutComponent],
  imports: [CommonModule, MaterialModule],
  exports: [LightHomeLayoutComponent],
})
export class LightHomeLayoutModule {}
