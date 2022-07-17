import { DecimalPipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { catchError, delay, mergeMap, retryWhen, switchMap, take } from 'rxjs/operators';
import { AppConfig } from 'src/app/app-config';
import { AuthService } from 'src/app/services/shared/auth.service';
import { ParametersService } from 'src/app/services/shared/parameters.service';
import { Constants } from 'src/app/utils/constants';
import * as models from '../../models/old-app';
import { RequestSarlaft } from '../../models/old-app';
import { BizagiCase } from '../../models/old-app/gosign-middleware/bizagi-case.model';
import { BizagiData } from '../../models/old-app/gosign-middleware/bizagi-data.model';
import { DefaultRs } from '../../models/old-app/gosign-middleware/default-rs.model';
import { DocumentPdf, DocumentsPdfRs } from '../../models/old-app/gosign-middleware/documents-rs.model';
import { GosignMiddlewareFlow } from '../../models/old-app/gosign-middleware/gosign-middleware-flow.model';
import { GosignSignatureRq, GosignSignatureRs } from '../../models/old-app/gosign-middleware/gosign-signature.model';
import { CalculatorFacade } from '../../store/calculator';
import { PartnerFacade } from '../../store/partner';
import { ViabilityFacade } from '../../store/viability';
import { Tasas } from './bizagiEnumTasas';
import { ValidationV1Service } from './validation-v1.service';
import { ViabilityV1Service } from './viability-v1.service';

@Injectable({
  providedIn: 'root',
})
export class SarlaftV1Service {
  private DELAY_GOSIGN_PROCESS = 60000;
  private request: models.RequestSarlaft = new models.RequestSarlaft();

  constructor(
    protected http: HttpClient,
    private _decimalPipe: DecimalPipe,
    // TODO
    protected authService: AuthService,
    protected viabilityService: ViabilityV1Service,
    protected validationService: ValidationV1Service,
    // TODO
    private parametersService: ParametersService,
    private partnerFacade: PartnerFacade,
    private calculatorFacade: CalculatorFacade,
    private viabilityFacade: ViabilityFacade,
    private bizagiEnumTasas: Tasas
  ) { }

  public set Request(request: models.RequestSarlaft) {
    this.request = request;
  }

  public get Request(): models.RequestSarlaft {
    return this.request;
  }

  public fillInitialRq(): void {
    const rqValidation = this.validationService.Request;
    const rqViability = this.viabilityService.Request;
    const dataFaultViability = this.viabilityService.DataFault;

    const userProfile = this.authService.getUserProfile();

    this.partnerFacade.partnerInfo$
      .pipe(take(1))
      .subscribe((partner) => (this.request.origin.partnerCode = partner.partnerName));

    this.request.origin.userName = this.authService.getUserName();
    this.request.origin.email = this.getEmailToUserProfile(userProfile);

    this.request.client.idType = `${rqValidation.requestHeader.tipoIdentificacion}`;
    this.request.client.idNumber = `${rqValidation.requestHeader.identificacion}`;
    this.request.client.name = `${rqValidation.requestBody.primerNombre}`;
    this.request.client.surname = `${rqValidation.requestBody.primerApellido}`;
    this.request.client.email = rqViability.requestBody.correoElectronico;

    const dateBirth = {
      day: dataFaultViability.fechaNacimiento.dia,
      month: dataFaultViability.fechaNacimiento.mes,
      year: dataFaultViability.fechaNacimiento.year,
    };

    this.request.otherInfo.dateOfBirth = this.formatDate(dateBirth);
    this.request.otherInfo.ocupation = +rqViability.requestBody.actividad;
    this.request.otherInfo.typeOcupation = this.parametersService.getTypeOcupationToCode(
      this.viabilityService.ActivityCode
    );
    this.request.otherInfo.assetValue = `${rqViability.requestBody.ingresos}`;
    this.request.otherInfo.incomeValue = `${rqViability.requestBody.ingresos}`;

    this.request.otherInfo.authorizeInfoEmail = this.validationService.AuthorizeAll;
    this.request.otherInfo.authorizePhone = this.validationService.AuthorizeAll;
    this.request.otherInfo.authorizeEmail = this.validationService.AuthorizeAll;
    this.request.otherInfo.authorizeWhastApp = this.validationService.AuthorizeAll;
    this.request.otherInfo.expeditionDate = this.validationService.Request.requestBody.fechaExpedicion;

    this.request.otherInfo.cityResidence = +rqViability.requestBody.ciudad;
    this.request.otherInfo.address = rqViability.requestBody.direccion;
    this.request.otherInfo.cellphone = rqValidation.requestBody.numeroCelular;
    this.request.otherInfo.departmentResidence = +this.viabilityService.DepartmentResidence;
    this.request.otherInfo.stratum = +rqViability.requestBody.estrato;
    this.request.otherInfo.civilStatus = +rqViability.requestBody.estadoCivil;

    this.calculatorFacade.currentFee$
      .pipe(take(1))
      .subscribe(
        (fee) => (
          (this.request.creditInfo.allRisk = fee.allRiskValue),
          (this.Request.creditInfo.valueCuota = fee.valueFeeWithInsurance),
          (this.request.creditInfo.totalSafe = fee.totalSafeValue),
          (this.request.creditInfo.amountInstallments = fee.feeNumber),
          (this.request.creditInfo.requestAmount = fee.amountToFinanced),
          (this.request.creditInfo.zubsidized = fee.zubsidized),
          (this.request.creditInfo.valueZubsidized = fee.valueZubsidized),
          (this.request.creditInfo.ivaZubsidized = fee.ivazubsidized),
          (this.request.creditInfo.valueAssistance = parseInt(`${fee.valueAssistance}`)),
          (this.request.creditInfo.valueSecureNoAssistance = parseInt(`${fee.valueSecureNoAssistance}`))
         // (this.request.creditInfo.tasaEA = this.bizagiEnumTasas.obtenerTasaBizagi(this.transformDecimal(fee.nominalMonthOverdue * 100)))
        

        )
      )
      .unsubscribe();

    this.viabilityFacade.creditInfo$
      .pipe(take(1))
      .subscribe((creditInfo) => {
        this.Request.creditInfo.valueCuota = this.request.creditInfo.purchaseValue = creditInfo.purchaseValue;
        this.request.creditInfo.insurancePolicy = creditInfo.insurancePolicy;
        this.request.creditInfo.gracePeriod = creditInfo.gracePeriod;
      })
      .unsubscribe();

    this.calculatorFacade.calculateFeesRq$
      .pipe(take(1))
      .subscribe((rq) => {
        this.request.creditInfo.lack = !!rq && !!rq.lack ? rq.lack : 0;
      })
      .unsubscribe();

    this.fillParamsBizagi();

    console.log('[request] -> ', this.request);
  }

  public fillRq(values: any): void {
    this.request.otherInfo.cityBirth = `${values.cityBirth}`;
    this.request.otherInfo.dateAdmission = this.formatDate(values.companyDateEntry);
    this.request.otherInfo.companyName = values.companyName;
    this.request.otherInfo.typeContract = +values.typeContract;
    this.request.otherInfo.companyCity = `${values.companyCity}`;
    this.request.otherInfo.companyAddress = values.companyAddress;
    this.request.otherInfo.companyPhone = values.companyPhone;
    this.request.otherInfo.laborCity = +values.companyCity;
  }

  public orchestrationGosignMiddleware() {
    const callGosignSignatureFn = (documents: DocumentPdf[], bizagiCase: string) => {
      const rq: GosignSignatureRq = {
        client: this.request.client,
        origin: this.request.origin,
        documents: documents,
      };
      return this.callGosignSignature(rq).pipe(
        catchError(() =>
          of({
            codRespuesta: 0,
          } as DefaultRs<GosignSignatureRs>)
        ),
        mergeMap((gosignSignatureRs) => {
          if (gosignSignatureRs.codRespuesta === 1) {
            return of({
              case: Constants.GOSIGN_MIDDLEWARE_URL_ENVELOP,
              envelopSignature: gosignSignatureRs.respuestaServicio.externalId,
              urlSignature: gosignSignatureRs.respuestaServicio.url,
              bizagiCase,
              documents,
            } as GosignMiddlewareFlow);
          } else if (gosignSignatureRs.codRespuesta === 2) {
            return of({
              case: Constants.GOSIGN_MIDDLEWARE_ENVELOP,
              envelopSignature: gosignSignatureRs.respuestaServicio.externalId,
              bizagiCase,
              documents,
            } as GosignMiddlewareFlow);
          }

          return of({
            case: Constants.GOSIGN_MIDDLEWARE_DOWNLOAD_DOCUMENTS,
            bizagiCase,
            documents,
          } as GosignMiddlewareFlow);
        })
      );
    };

    const createDocumentsFn = (bizagiData: BizagiData, bizagiCaseRs: DefaultRs<BizagiCase>) =>
      this.createDocuments(
        bizagiData,
        bizagiCaseRs.respuestaServicio.processRadNumber,
        this.request.creditInfo.gracePeriod,
        this.request.creditInfo.purchaseValue,
        this.request.creditInfo.lack
      ).pipe(
        catchError(() =>
          of({
            codRespuesta: 0,
          } as DefaultRs<DocumentsPdfRs>)
        ),
        mergeMap((documentsPdfRs) => {
          if (
            documentsPdfRs.codRespuesta === 1 &&
            (bizagiCaseRs.codRespuesta === 2 || bizagiCaseRs.codRespuesta === 0)
          ) {
            return of({
              case: Constants.GOSIGN_MIDDLEWARE_DOWNLOAD_DOCUMENTS,
              documents: documentsPdfRs.respuestaServicio.documents,
              bizagiCase: bizagiCaseRs.respuestaServicio.processRadNumber,
            } as GosignMiddlewareFlow);
          } else if (documentsPdfRs.codRespuesta === 1) {
            return callGosignSignatureFn(
              documentsPdfRs.respuestaServicio.documents,
              bizagiCaseRs.respuestaServicio.processRadNumber
            );
          }

          return of({
            case: Constants.GOSIGN_MIDDLEWARE_MANUAL_SIGNATURE,
            bizagiCase: bizagiCaseRs.respuestaServicio.processRadNumber,
          } as GosignMiddlewareFlow);
        })
      );

    const createCaseBizagiFn = (bizagiData: BizagiData) =>
      this.createCaseBizagi(bizagiData).pipe(
        catchError(() =>
          of({
            codRespuesta: 0,
            respuestaServicio: {
              processRadNumber: '0',
            },
          } as DefaultRs<BizagiCase>)
        ),
        mergeMap((bizagiCaseRs) => createDocumentsFn(bizagiData, bizagiCaseRs))
      );

    return this.callBizagiData(this.request).pipe(
      catchError(() =>
        of({
          codRespuesta: 0,
          error: 'Servicio no disponible',
        } as DefaultRs<BizagiData>)
      ),
      mergeMap((bizagiDataRs) => {
        if (!!bizagiDataRs.codRespuesta && bizagiDataRs.codRespuesta === 1) {
          return createCaseBizagiFn(bizagiDataRs.respuestaServicio);
        }

        return of({
          case: Constants.GOSIGN_MIDDLEWARE_SERVICE_ERROR,
          error: !!bizagiDataRs.error ? bizagiDataRs.error : 'Servicio no disponible',
        } as GosignMiddlewareFlow);
      })
    );
  }

  public callBizagiData(rq: RequestSarlaft): Observable<DefaultRs<BizagiData>> {
    return this.http.post<DefaultRs<BizagiData>>(
      `${AppConfig.settings.apiServer.middleware}/middleware/v1/process`,
      rq
    );
  }

  public createCaseBizagi(rq: BizagiData): Observable<DefaultRs<BizagiCase>> {
    return this.http.post<DefaultRs<BizagiCase>>(`${AppConfig.settings.apiServer.middleware}/middleware/v1/create`, rq);
  }

  public createDocuments(
    rq: BizagiData,
    caseNumber: string,
    gracePeriod: boolean,
    purchaseValue: number,
    lack: number
  ): Observable<DefaultRs<DocumentsPdfRs>> {
    const params = new HttpParams()
      .set('numberCase', caseNumber)
      .set('gracePeriod', `${gracePeriod}`)
      .set('purchaseValue', `${purchaseValue}`)
      .set('lack', `${lack}`);

    return this.http.post<DefaultRs<DocumentsPdfRs>>(
      `${AppConfig.settings.apiServer.middleware}/middleware/v1/document`,
      rq,
      {
        params: params,
      }
    );
  }

  public callGosignSignature(rq: GosignSignatureRq): Observable<DefaultRs<GosignSignatureRs>> {
    return this.http.post<DefaultRs<GosignSignatureRs>>(
      `${AppConfig.settings.apiServer.middleware}/middleware/v1/signature`,
      rq
    );
  }

  public callGosignStatus(envelopId: string = ''): Observable<any> {
    return this.http.get<any>(`${AppConfig.settings.apiServer.middleware}/middleware/v1/status/${envelopId}`);
  }

  public getGosignStatus(envelopId: string = ''): Observable<any> {
    return timer(0, this.DELAY_GOSIGN_PROCESS).pipe(
      take(10),
      switchMap(() => this.callGosignStatus(envelopId)),
      retryWhen((errors) => errors.pipe(delay(this.DELAY_GOSIGN_PROCESS), take(10)))
    );
  }

  private formatDate(date: any): string {
    const month = `0${date.month}`.substr(-2);
    const day = `0${date.day}`.substr(-2);
    return `${day}/${month}/${date.year}`;
  }

  private getEmailToUserProfile(profile: any): string {
    if (!!profile.attributes && !!profile.attributes.email && profile.attributes.email.length > 0) {
      return profile.attributes.email[0];
    }
    return '';
  }

  private fillParamsBizagi() {
    this.partnerFacade.bizagiDealerAccParam$
      .pipe(take(1))
      .subscribe((parameter) => (this.request.creditInfo.dealerAccount = parameter.numbericalValue))
      .unsubscribe();

    this.viabilityFacade.creditInfo$
      .pipe(take(1))
      .subscribe((creditInfo) => {
        this.request.creditInfo.requestAmount = creditInfo.requestAmount;
        this.request.creditInfo.purchaseValue = creditInfo.purchaseValue;
        this.request.creditInfo.insurancePolicy = creditInfo.insurancePolicy;
        this.request.creditInfo.gracePeriod = creditInfo.gracePeriod;
      })
      .unsubscribe();





    //Tasa parametrizacion con bizagi anterior
      this.calculatorFacade.calculateFeesRq$
        .pipe(take(1))
        .subscribe((rq) => {
          if (!!rq && (!!rq.zeroRate || !!rq.subsidized)) {
            const numberFee = !!rq.zeroRate ? 0 : this.request.creditInfo.amountInstallments;
  
            this.partnerFacade
              .bizagiRateByFeeParam(numberFee)
              .pipe(take(1))
              .subscribe((parameter) => (this.request.creditInfo.tasaEA = parameter.numbericalValue))
              .unsubscribe();
          } else {
            this.partnerFacade.bizagiRateParam$
              .pipe(take(1))
              .subscribe((parameter) => (this.request.creditInfo.tasaEA = parameter.numbericalValue))
              .unsubscribe();
          }
        })
        .unsubscribe();
  

    this.partnerFacade.bizagiDealerAgreeParam$
      .pipe(take(1))
      .subscribe((parameter) => (this.request.creditInfo.dealerAgreement = parameter.numbericalValue))
      .unsubscribe();
  }
  transformDecimal(num) {
    return this._decimalPipe.transform(num, '1.0-2');
  }
}
