import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { PanelExpansionComponent } from './panel-expansion/panel-expansion.component';
import { ProcessRequestComponent } from './process-request/process-request.component';
import { SolicitudModalComponent } from './solicitud-modal/solicitud-modal.component';
import { MaterialModule } from '../../material/material.module';
import { BirthdayPipe } from 'src/app/pipes/birthday.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ValidateOtpComponent } from './validate-otp/validate-otp.component';
import { ChallengeQuestionComponent } from './challenge-question/challenge-question.component';
import { ViabilityComponent } from './viability/viability.component';
import { GeneralInformationComponent } from './general-information/general-information.component';
import { SarlaftComponent } from './sarlaft/sarlaft.component';

const ViabilityComponents = [
  ModalComponent,
  ModalContentComponent,
  PanelExpansionComponent,
  ProcessRequestComponent,
  SolicitudModalComponent,
  BirthdayPipe,
  ValidateOtpComponent,
  ChallengeQuestionComponent,
  ViabilityComponent,
  GeneralInformationComponent,
  SarlaftComponent,
];

@NgModule({
  declarations: [ViabilityComponents],
  exports: [ViabilityComponents],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule, CurrencyMaskModule],
  entryComponents: [
    ModalContentComponent,
    SolicitudModalComponent,
    ValidateOtpComponent,
    ChallengeQuestionComponent,
    ViabilityComponent,
    GeneralInformationComponent,
    SarlaftComponent,
  ],
})
export class ViabilityModule {}
