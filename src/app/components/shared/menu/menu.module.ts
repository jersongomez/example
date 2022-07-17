import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  BreakPointRegistry,
  FlexLayoutModule,
  FlexStyleBuilder,
  LayoutAlignStyleBuilder,
  LayoutStyleBuilder,
  MediaMarshaller,
  PrintHook,
  ShowHideStyleBuilder,
  StylesheetMap,
  StyleUtils,
  ɵMatchMedia,
} from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { MenuComponent } from './menu.component';

const providerFlex = [
  PrintHook,
  StyleUtils,
  StyleSheet,
  StylesheetMap,
  LayoutAlignStyleBuilder,
  LayoutStyleBuilder,
  FlexStyleBuilder,
  MediaMarshaller,
  ɵMatchMedia,
  BreakPointRegistry,
  ShowHideStyleBuilder,
];

@NgModule({
  declarations: [MenuComponent],
  imports: [FlexLayoutModule, CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
  exports: [MenuComponent],
  providers: [],
})
export class MenuModule {}
