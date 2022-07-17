import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/shared/auth.service';
import { UtilsService } from 'src/app/services/shared/utils.service';

import * as models from '../../../models/old-app';
import { FlowV1Service } from '../../../services/viability-v1/flow-v1.service';
import { SarlaftV1Service } from '../../../services/viability-v1/sarlaft-v1.service';
import { ValidationV1Service } from '../../../services/viability-v1/validation-v1.service';
import { ViabilityV1Service } from '../../../services/viability-v1/viability-v1.service';

@Component({
  selector: 'lib-process-request-v1',
  templateUrl: './process-request-v1.component.html',
  styleUrls: ['./process-request-v1.component.scss'],
})
export class ProcessRequestV1Component implements OnInit {
  public showvalidate = false;
  public showFinalMessage = false;
  public showSummary = false;
  public flagRequest = true;

  @Output() endRequest = new EventEmitter();

  constructor(
    // TODO
    protected auth: AuthService,
    public flowService: FlowV1Service,
    public viabilityService: ViabilityV1Service,
    // TODO
    public utilsService: UtilsService,
    public validationService: ValidationV1Service,
    public sarlaftService: SarlaftV1Service
  ) {}

  ngOnInit() {}

  public startProcessRequest() {
    this.flowService.nextStep();
  }

  public cancelRequest() {
    this.viabilityService.Response = new models.ResponseViability();
    this.viabilityService.Request = new models.RequestViability();
    this.utilsService.unClick();
    this.flowService.initFlow();
    this.viabilityService.HasNextBtn = true;
    this.viabilityService.process$ = new EventEmitter<any>();
    if (!!this.flowService.process$) {
      this.flowService.process$.unsubscribe();
    }
    if (!!this.flowService.getGosign$) {
      this.flowService.getGosign$.unsubscribe();
    }
    if (!!this.flowService.getGosignOneRq$) {
      this.flowService.getGosignOneRq$.unsubscribe();
    }
    this.validationService.Request = new models.RequestValidate();
    this.sarlaftService.Request = new models.RequestSarlaft();

    this.endRequest.emit();
  }
}
