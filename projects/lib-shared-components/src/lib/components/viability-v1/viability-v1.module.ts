import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeQuestionV1Component } from './challenge-question-v1/challenge-question-v1.component';
import { GeneralInformationV1Component } from './general-information-v1/general-information-v1.component';
import { ModalV1Component } from './modal-v1/modal-v1.component';
import { ModalContentV1Component } from './modal-content-v1/modal-content-v1.component';
import { PanelExpansionV1Component } from './panel-expansion-v1/panel-expansion-v1.component';
import { ProcessRequestV1Component } from './process-request-v1/process-request-v1.component';
import { SarlaftV1Component } from './sarlaft-v1/sarlaft-v1.component';
import { SolicitudModalV1Component } from './solicitud-modal-v1/solicitud-modal-v1.component';
import { ValidateOtpV1Component } from './validate-otp-v1/validate-otp-v1.component';
import { ViabilityV1Component } from './viability-v1/viability-v1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [
    ChallengeQuestionV1Component,
    GeneralInformationV1Component,
    ModalV1Component,
    ModalContentV1Component,
    PanelExpansionV1Component,
    ProcessRequestV1Component,
    SarlaftV1Component,
    SolicitudModalV1Component,
    ValidateOtpV1Component,
    ViabilityV1Component,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule, CurrencyMaskModule],
  exports: [
    ChallengeQuestionV1Component,
    GeneralInformationV1Component,
    ModalV1Component,
    ModalContentV1Component,
    PanelExpansionV1Component,
    ProcessRequestV1Component,
    SarlaftV1Component,
    SolicitudModalV1Component,
    ValidateOtpV1Component,
    ViabilityV1Component,
  ],
  entryComponents: [
    ModalContentV1Component,
    SolicitudModalV1Component,
    ValidateOtpV1Component,
    ChallengeQuestionV1Component,
    ViabilityV1Component,
    GeneralInformationV1Component,
    SarlaftV1Component,
  ],
})
export class ViabilityV1Module {}
