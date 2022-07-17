import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalComponent } from './modal.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDialogModule, MatInputModule, MatRadioModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';

const imports =
      [
        BrowserModule,
        RouterModule,
        MatButtonModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        FormsModule,
        MatRadioModule,
        MatFormFieldModule,
        MaterialModule,
      ];

const providers = [];

@NgModule({
  declarations: [ModalComponent],
  entryComponents: [ModalComponent],
  exports: [ModalComponent],
  imports: imports,
  providers: providers,
  schemas: [NO_ERRORS_SCHEMA],
})
export class ModalModule {}
