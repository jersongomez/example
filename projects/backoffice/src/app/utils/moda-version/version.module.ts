import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModaVersionComponent } from './moda-version.component';



@NgModule({
  declarations: [ModaVersionComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ModaVersionComponent
  ],
  entryComponents: [ModaVersionComponent],
})
export class VersionModule { }
