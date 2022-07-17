import { Component, EventEmitter } from '@angular/core';
import { ViabilityService } from 'src/app/services/viability/viability.service';
import { CalculatorService } from 'src/app/services/shared/calculator.service';
import { AuthService } from 'src/app/services/shared/auth.service';
import * as models from 'src/app/models/index';
import { UtilsService } from '../../../services/shared/utils.service';
import { FlowService } from 'src/app/services/viability/flow.service';
import { SarlaftService } from 'src/app/services/viability/sarlaft.service';
import { ValidationService } from 'src/app/services/viability/validation.service';

@Component({
  selector: 'app-process-request',
  templateUrl: './process-request.component.html',
  styleUrls: ['./process-request.component.scss'],
})
export class ProcessRequestComponent {
  public showvalidate = false;
  public showFinalMessage = false;
  public showSummary = false;
  public flagRequest = true;

  constructor(
    public calculatorService: CalculatorService,
    protected auth: AuthService,
    public flowService: FlowService,
    public viabilityService: ViabilityService,
    public utilsService: UtilsService,
    public sarlaftService: SarlaftService,
    public validationService: ValidationService
  ) {}

  public startProcessRequest() {
    this.flowService.nextStep();
  }

  public cancelRequest() {
    this.calculatorService.resetRequest();
    this.viabilityService.Response = new models.ResponseViability();
    this.viabilityService.Request = new models.RequestViability();
    this.utilsService.unClick();
    this.flowService.initFlow();
    this.viabilityService.HasNextBtn = true;
    this.viabilityService.process$ = new EventEmitter<any>();

    if (!!this.flowService.process$) {
      this.flowService.process$.unsubscribe();
    }

    this.sarlaftService.Request = new models.RequestSarlaft();
    this.validationService.Request = new models.RequestValidate();

    if (!!this.flowService.getGosign$) {
      this.flowService.getGosign$.unsubscribe();
    }

    if (!!this.flowService.getGosignOneRq$) {
      this.flowService.getGosignOneRq$.unsubscribe();
    }
  }
}
