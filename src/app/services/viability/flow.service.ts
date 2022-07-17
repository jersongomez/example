import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ChallengeQuestionComponent } from 'src/app/components/viability/challenge-question/challenge-question.component';
import { SarlaftComponent } from 'src/app/components/viability/sarlaft/sarlaft.component';
import { SolicitudModalComponent } from 'src/app/components/viability/solicitud-modal/solicitud-modal.component';
import { ValidateOtpComponent } from 'src/app/components/viability/validate-otp/validate-otp.component';
import { ViabilityComponent } from 'src/app/components/viability/viability/viability.component';
import { Flow } from 'src/app/models/flow.interface';
import { GeneralInformationComponent } from '../../components/viability/general-information/general-information.component';
import { ViabilityService } from './viability.service';
import { ValidationService } from './validation.service';
import { Constants } from '../../utils/constants';
import { GeneralInformationService } from './general-information.service';
import { DocumentDownload, GeneralInfo } from 'src/app/models/general-info.model';
import { SarlaftService } from './sarlaft.service';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { formatNumber } from '@angular/common';
import { GosignMiddlewareFlow } from 'src/app/models/gosign-middleware/gosign-middleware-flow.model';
import { getObsevableValue } from 'src/utils/observables';
import { ViabilityClient } from 'projects/lib-shared-components/src/lib/store/viability/viability.state';
import { ViabilityFacade } from 'projects/lib-shared-components/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class FlowService {
  private TXT_MANUAL_SIGNATURE = 'Tu solicitud fue aprobada, Continua el proceso con una firma manual.';
  private flow: Flow[] = [];
  private currentStep: Flow;
  private startFlow: boolean;
  public getGosign$: Subscription;
  public getGosignOneRq$: Subscription;
  private externalId: string;
  private caseNumber: string;
  public process$: Subscription;
  private documents: DocumentDownload[];

  public viabilityClient$: Observable<ViabilityClient> = this.viabilityFacade.client$;

  constructor(
    public viabilityService: ViabilityService,
    public validationService: ValidationService,
    public generalInformationService: GeneralInformationService,
    public sarlaftService: SarlaftService,
    public viabilityFacade: ViabilityFacade,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.initFlow();
  }

  public get CurrentStep(): Flow {
    return this.currentStep;
  }

  public set StartFlow(startFlow: boolean) {
    this.startFlow = startFlow;
  }

  public get StartFlow(): boolean {
    return this.startFlow;
  }

  public initFlow() {
    this.flow = [
      {
        step: 1,
        name: Constants.VALIDATE_IDENTITY,
        component: SolicitudModalComponent,
        next: 2,
      },
      {
        step: 2,
        name: Constants.VALIDATE_OTP_IDENTITY,
        component: ValidateOtpComponent,
        next: 3,
      },
      {
        step: 3,
        name: Constants.CHALLENGE_QUESTION,
        component: ChallengeQuestionComponent,
        next: 4,
      },
      {
        step: 4,
        name: Constants.VIABILITY,
        component: ViabilityComponent,
        next: 5,
      },
      {
        step: 5,
        name: Constants.RESULT_FEASIBILITY,
        component: GeneralInformationComponent,
        next: 6,
      },
      {
        step: 6,
        name: Constants.SARLAFT_QUESTIONS,
        component: SarlaftComponent,
        next: 7,
      },
      {
        step: 7,
        name: Constants.SIGN_INFORMATION,
        component: GeneralInformationComponent,
        next: 8,
      },
      {
        step: 8,
        name: Constants.APPLICATION_APROVED,
        component: GeneralInformationComponent,
        next: null,
      },
      {
        step: 9,
        name: Constants.PROCESS_ERROR,
        component: GeneralInformationComponent,
        next: null,
      },
      {
        step: 10,
        name: Constants.UNIDENTIFIED,
        component: GeneralInformationComponent,
        next: null,
      },
    ];
    this.startFlow = false;
    this.currentStep = this.flow[0];
    this.generalInformationService.Documents = this.documents = [];
    console.log('current step', this.currentStep.name);
  }

  public nextStep() {
    window.scroll(0, 0);
    this.viabilityService.touched$.emit(true);
    console.log('current step', this.currentStep.name);
  }

  public process() {
    this.process$ = this.viabilityService.process$.subscribe(
      (process: any) => {
        this.viabilityService.progress = false;
        if (process) {
          console.log(process);

          // Validar cliente no viable
          if (process.status === 'NoViable') {
            this.validateNoViability(process);
            return;
          }

          switch (this.currentStep.name) {
            case Constants.VALIDATE_IDENTITY: {
              this.validateResponseIdentity(process);
              break;
            }
            case Constants.VALIDATE_OTP_IDENTITY: {
              this.validateResponseOtp(process);
              break;
            }
            case Constants.CHALLENGE_QUESTION: {
              this.validateResponseQuestions(process);
              break;
            }
            case Constants.VIABILITY: {
              this.validateResponseViability(process);
              break;
            }
            case Constants.RESULT_FEASIBILITY: {
              this.currentStep = this.flow.filter((nextFlow) => this.currentStep.next === nextFlow.step)[0];
              break;
            }
            case Constants.SARLAFT_QUESTIONS: {
              this.validateResponseSarlaft(process);
              break;
            }
            case Constants.SIGN_INFORMATION: {
              this.validateRsSignInformation();
              break;
            }
          }
        }
      },
      (error) => {
        console.error(error);
        this.viabilityService.progress = false;
        this.generalInformationService.setDataError();
        this.currentStep = this.flow.filter((nextFlow) => nextFlow.name === Constants.PROCESS_ERROR)[0];
      }
    );
  }

  public validateNoViability(response: any) {
    if (response.status === 'NoViable') {
      this.generalInformationService.setFailIdentity(this.setFailViabilityInfo('En este momento no podemos procesar tu solicitud'));
     this.currentStep = this.flow.filter((nextFlow) => nextFlow.name === Constants.UNIDENTIFIED)[0];
    }
  }


  public validateResponseIdentity(response: any) {
    if (response.codRespuesta === 2) {
      this.currentStep = this.flow.filter((nextFlow) => this.currentStep.next === nextFlow.step)[0];
      this.validationService.Request.requestBody.regValidacion = response.respuestaServicio.regValidacion;
      this.validationService.Request.requestBody.idTransaccionOTP = response.respuestaServicio.idTransaccionOTP;
    } else if (response.codRespuesta === 3) {
      this.validationService.cuestionario = response.respuestaServicio.cuestionario;
      this.currentStep = this.flow.filter((nextFlow) => nextFlow.name === Constants.CHALLENGE_QUESTION)[0];
    } else {
      this.generalInformationService.setFailIdentity(this.setFailIdentityInfo(response.mensajeError));
      this.currentStep = this.flow.filter((nextFlow) => nextFlow.name === Constants.UNIDENTIFIED)[0];
    }
  }

  public validateResponseOtp(response: any) {
    if (response.codRespuesta === 1) {
      this.validationService.smsExpire = '¿No te llegó ningún SMS?';
      this.currentStep = this.flow.filter((nextFlow) => nextFlow.name === Constants.VIABILITY)[0];
    } else if (response.codRespuesta === 3) {
      this.validationService.cuestionario = response.respuestaServicio.cuestionario;
      this.currentStep = this.flow.filter((nextFlow) => this.currentStep.next === nextFlow.step)[0];
    } else if (response.codRespuesta === 2) {
      this.validationService.smsExpire = 'Código OTP expirado';
    } else {
      this.generalInformationService.setFailIdentity(this.setFailIdentityInfo(response.mensajeError));
      this.currentStep = this.flow.filter((nextFlow) => nextFlow.name === Constants.UNIDENTIFIED)[0];
    }
  }

  public validateResponseQuestions(response: any) {
    if (response.codRespuesta === 1) {
      this.currentStep = this.flow.filter((nextFlow) => this.currentStep.next === nextFlow.step)[0];
    } else {
      this.generalInformationService.setFailIdentity(this.setFailIdentityInfo(response.mensajeError));
      this.currentStep = this.flow.filter((nextFlow) => nextFlow.name === Constants.UNIDENTIFIED)[0];
    }
  }

  public validateResponseViability(response: any) {
    if (response.codRespuesta === 1 || response.codRespuesta === 0) {
      const detail = response.respuestaServicio.detalles;
      const maxCredit = formatNumber(+detail.endeudamientoMaximo, this.locale, '1.0-0');
      const data: GeneralInfo = {
        content: {
          status: [
            { title: 'Aciertamás', value: detail.aciertaMas },
            { title: 'Causal Rechazo', value: detail.causalRechazo },
            { title: 'Endeudamiento máximo 2', value: `$ ${maxCredit}` },
          ],
        },
      };

      if (response.codRespuesta === 1) {
        const requestHeader = this.viabilityService.Request.requestHeader;
        const requestBody = this.viabilityService.Request.requestBody;
        const amountApproved = formatNumber(+requestBody.valorSolicitado, this.locale, '1.0-0');
        data.content.status.unshift(
          ...[
            {
              title: 'Número de identificación',
              value: `${requestHeader.identificacion}`,
            },
            { title: 'Nombre', value: `${requestBody.nombres} ${requestBody.apellidos}` },
            { title: 'Monto aprobado', value: `$ ${amountApproved}` },
          ]
        );
        this.generalInformationService.setRqApproved(data);
      } else {
        this.generalInformationService.setRqDenied(data);
      }

      this.currentStep = this.flow.filter((nextFlow) => this.currentStep.next === nextFlow.step)[0];
    } else {
      this.mapErrorToRs(!!response.mensajeError ? response.mensajeError : null);
      this.currentStep = this.flow.filter((nextFlow) => nextFlow.name === Constants.PROCESS_ERROR)[0];
    }
  }

  public async validateResponseSarlaft(rsFlow: GosignMiddlewareFlow) {
    this.caseNumber = !!rsFlow.bizagiCase ? rsFlow.bizagiCase : '';

    if (!!rsFlow.documents && rsFlow.documents.length > 0) {
      this.documents = rsFlow.documents;
    }

    const findNextStep = this.flow.find((nextFlow) => this.currentStep.next === nextFlow.step);

    const email = this.viabilityService.Request.requestBody.correoElectronico;

    switch (rsFlow.case) {
      default:
      case Constants.GOSIGN_MIDDLEWARE_SERVICE_ERROR:
        this.mapErrorToRs(rsFlow.error);
        this.currentStep = this.flow.find((nextFlow) => nextFlow.name === Constants.PROCESS_ERROR);

        break;
      case Constants.GOSIGN_MIDDLEWARE_MANUAL_SIGNATURE:
        // TODO Añadir pantalla aciertamas
        this.generalInformationService.setSendDocs(
          await this.mapInfoToGosignRs(this.TXT_MANUAL_SIGNATURE, this.caseNumber)
        );
        this.viabilityService.HasNextBtn = false;
        this.currentStep = findNextStep;

        break;
      case Constants.GOSIGN_MIDDLEWARE_DOWNLOAD_DOCUMENTS:
        // TODO Añadir pantalla aciertamas
        this.generalInformationService.setSendDocs(
          await this.mapInfoToGosignRs(this.TXT_MANUAL_SIGNATURE, this.caseNumber)
        );
        this.viabilityService.HasNextBtn = false;
        this.generalInformationService.Documents = this.documents;
        this.currentStep = findNextStep;

        break;
      case Constants.GOSIGN_MIDDLEWARE_URL_ENVELOP:
        this.externalId = `${rsFlow.envelopSignature}`;
        this.generalInformationService.setSendDocs(
          await this.mapInfoToGosignRs(
            `Te enviamos los documentos de tu crédito a tu correo electrónico <strong>(${email})</strong> para que los valides y los firmes.
            O ingresa <a href="${rsFlow.urlSignature}" target="_blank">aquí</a>.`,
            this.caseNumber
          )
        );
        this.generalInformationService.Documents = this.documents;
        this.intervalRsSignInformation();
        this.currentStep = findNextStep;

        break;
      case Constants.GOSIGN_MIDDLEWARE_ENVELOP:
        this.externalId = `${rsFlow.envelopSignature}`;
        this.generalInformationService.setSendDocs(
          await this.mapInfoToGosignRs(
            `Te enviamos los documentos de tu crédito a tu correo electrónico <strong>(${email})</strong> para que los valides y los firmes.`,
            this.caseNumber
          )
        );
        this.generalInformationService.Documents = this.documents;
        this.intervalRsSignInformation();
        this.currentStep = findNextStep;

        break;
    }
  }

  private intervalRsSignInformation(): void {
    this.getGosign$ = this.sarlaftService
      .getGosignStatus(this.externalId)
      .pipe(tap(() => (this.viabilityService.progress = false)))
      .subscribe(
        (rs) => this.rsSucessGosignStatus(rs),
        (error) => {
          console.error('[error gosign-middleware-status]->', error);
          this.rsErrorGosignStatus();
        },
        () => this.rsErrorGosignStatus()
      );
  }

  private validateRsSignInformation(): void {
    this.viabilityService.progress = true;
    this.getGosignOneRq$ = this.sarlaftService
      .callGosignStatus(this.externalId)
      .pipe(tap(() => (this.viabilityService.progress = false)))
      .subscribe((rs) => this.rsSucessGosignStatus(rs));
  }

  private rsSucessGosignStatus(response: any): void {
    if (response.codRespuesta === 1 && response.respuestaServicio.state === Constants.SIGN_PROCESS_ENDED) {
      if (!!this.getGosignOneRq$) {
        this.getGosignOneRq$.unsubscribe();
      }
      this.getGosign$.unsubscribe();
      this.generalInformationService.setLastRqApproved();
      this.currentStep = this.flow.filter((nextFlow) => this.currentStep.next === nextFlow.step)[0];
    }
  }

  private async rsErrorGosignStatus(): Promise<void> {
    this.generalInformationService.Documents = this.documents;
    this.viabilityService.HasNextBtn = false;
    const data = await this.mapInfoToGosignRs(this.TXT_MANUAL_SIGNATURE, this.caseNumber);
    this.generalInformationService.setSendDocs(data);
  }

  private mapErrorToRs(message: string = 'Servicio no disponible'): void {
    this.generalInformationService.setDataError({
      subtitle: message,
    });
  }

  private async mapInfoToGosignRs(subtitle: string, caseNumber: string): Promise<GeneralInfo> {
    ///
    const data: GeneralInfo = {
      titletext: '¡RECUERDA!',
      text: 'Ademas de la firma electrónica, No olvides realizar el proceso de validación de seguridad a tu cliente "WHO IS WHO", Sin finalizar este proceso exitosamente no podrás facturar el pedido."',
      img: Constants.PATH_GOOD_BUSINESSMAN,
      subtitle,
      content: {
        title: `Número de su caso: ${caseNumber} `,
      },
    };

    const viabilityClient = await getObsevableValue<ViabilityClient>(this.viabilityClient$);
    const requestBody = this.viabilityService.Request.requestBody;
    const amountApproved = formatNumber(+requestBody.valorSolicitado, this.locale, '1.0-0');
    data.content.status = [
      {
        title: 'Número de identificación',
        value: `${viabilityClient.idNumber}`,
      },
      { title: 'Nombre', value: `${viabilityClient.name} ${viabilityClient.surname}` },
      { title: 'Monto aprobado', value: `$ ${amountApproved}` },
    ];
    return data;
  }

  private setFailIdentityInfo(errorMessage: string): GeneralInfo {
    return {
      title: !!errorMessage ? errorMessage : 'No se pudo validar <br> la identidad del cliente',
      subtitle: '',
      img: Constants.PATH_BAD_BUSINESSMAN,
    };
  }

  private setFailViabilityInfo(errorMessage: string): GeneralInfo {
    return {
      title: !!errorMessage ? errorMessage : 'No se pudo validar <br> error interno',
      subtitle: '',
      img: Constants.PATH_BAD_BUSINESSMAN,
    };
  }
}
