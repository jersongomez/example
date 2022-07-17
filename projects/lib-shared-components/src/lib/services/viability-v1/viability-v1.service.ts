import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { HomeComponent } from 'projects/cemex/src/app/components/home/home.component';
import { map, take } from 'rxjs/operators';
import { AppConfig } from 'src/app/app-config';
import { AuthService } from 'src/app/services/shared/auth.service';
import { ParametersService } from 'src/app/services/shared/parameters.service';
import { ModalAllietsModule } from '../../components/allies-store/allies-store.module';

import * as models from '../../models/old-app';
import { DataFault } from '../../models/old-app';
import { CalculatorFacade } from '../../store/calculator';
import { DomainsFacade } from '../../store/domains';
import { PartnerFacade, PartnerState } from '../../store/partner';
import { ViabilityFacade } from '../../store/viability';

@Injectable({
  providedIn: 'root',
})
export class ViabilityV1Service {
  private startRequest = false;
  private hasNextBtn = true;
  private request: models.RequestViability = new models.RequestViability();
  private response: models.ResponseViability = new models.ResponseViability();
  private viable: boolean;
  private dataFault: models.DataFault = new models.DataFault();
  public touched$ = new EventEmitter<boolean>();
  public process$ = new EventEmitter<any>();
  public progress = false;
  private departmentResidence: number;
  private activityCode: number;
  // cedulaAsesor: any;
  // Sede: any;

  constructor(
    protected authService: AuthService,
    protected http: HttpClient,
    private parametersService: ParametersService,
    private domainsFacade: DomainsFacade,
    private partnerFacade: PartnerFacade,
    private calculatorFacade: CalculatorFacade,
    private viabilityFacade: ViabilityFacade,

  ) {}

  public set StartRequest(starRequest: boolean) {
    this.startRequest = starRequest;
  }

  public get StartRequest() {
    return this.startRequest;
  }

  public set HasNextBtn(hasNextBtn: boolean) {
    this.hasNextBtn = hasNextBtn;
  }

  public get HasNextBtn() {
    return this.hasNextBtn;
  }

  public set Request(request: models.RequestViability) {
    this.request = request;
  }

  public get Request(): models.RequestViability {
    return this.request;
  }

  public set Response(response: models.ResponseViability) {
    this.response = response;
  }

  public get Response(): models.ResponseViability {
    return this.response;
  }

  public set Viable(viable: boolean) {
    this.viable = viable;
  }

  public get Viable() {
    return this.viable;
  }

  public set DataFault(dataFault: DataFault) {
    this.dataFault = dataFault;
  }

  public get DataFault() {
    return this.dataFault;
  }

  public set DepartmentResidence(deparmentId: number) {
    this.departmentResidence = deparmentId;
  }

  public get DepartmentResidence() {
    return this.departmentResidence;
  }

  public set ActivityCode(code: number) {
    this.activityCode = code;
  }

  public get ActivityCode() {
    return this.activityCode;
  }

  public fillInitialRequest(value: any) {
    this.partnerFacade.partnerInfo$
      .pipe(take(1))
      .subscribe((partner: PartnerState) => (this.request.requestHeader.codAliado = partner.partnerName))
      .unsubscribe();

    this.request.requestHeader.usuarioAliado = this.authService.getUserName();
    this.request.requestHeader.sesionId = this.authService.getSessionId();

    this.calculatorFacade.currentFee$
      .pipe(take(1))
      .subscribe(
        (fee) => (
          (this.request.requestBody.valorSolicitado = fee.amountToFinanced),
          (this.request.requestBody.plazo = fee.feeNumber)
        )
      )
      .unsubscribe();

    this.request.requestBody.nombres = value.nombres;
    this.request.requestBody.apellidos = value.apellidos;
    this.request.requestHeader.tipoIdentificacion = value.tipoIdentificacion;
    this.request.requestHeader.identificacion = value.numeroIdentificacion;
    this.request.requestBody.correoElectronico = value.correoElectronico;
    this.request.requestBody.celular = value.celular;
    this.request.requestBody.motor = 'dictum';
    // this.request.requestBody.nombreAsesor = this.cedulaAsesor;
    // this.request.requestBody.sede = this.Sede;

    this.setViaabilityClientData();
  }

  setViaabilityClientData() {
    this.viabilityFacade.setClient({
      idType: this.request.requestHeader.tipoIdentificacion.toString(),
      idNumber: this.request.requestHeader.identificacion.toString(),
      name: this.request.requestBody.nombres,
      surname: this.request.requestBody.apellidos,
      email: this.request.requestBody.correoElectronico,
    });
  }

  public fillFormRequest(value: any) {
    this.request.requestBody.anoNacimiento = value.anoNacimiento.year;
    this.request.requestBody.actividad = `${this.parametersService.getOcupationToCode(+value.actividad)}`;
    this.request.requestBody.ingresos = value.ingresos;
    this.request.requestBody.ciudad = value.ciudad;
    this.request.requestBody.direccion = value.direccion;
    this.request.requestBody.estrato = value.estrato;
    this.request.requestBody.estadoCivil = value.estadoCivil;

    this.ActivityCode = +value.actividad;
    this.fillDataFault(value);
  }

  public fillDataFault(value: any) {
    this.domainsFacade.typesId$
      .pipe(
        take(1),
        map((types) => types.find((type) => type.code === `${this.request.requestHeader.tipoIdentificacion}`))
      )
      .subscribe((type) => (this.dataFault.tipoId = !!type ? type.name : ''));

    this.dataFault.actividadEco = this.parametersService.getNameToCode(+value.actividad);
    this.dataFault.fechaNacimiento.dia = value.anoNacimiento.dia;
    this.dataFault.fechaNacimiento.mes = value.anoNacimiento.mes;
    this.dataFault.fechaNacimiento.year = value.anoNacimiento.year;
  }

  public makeViable() {
    return this.http.post<models.ResponseViability>(
      `${AppConfig.settings.apiServer.viability}/viabilizacion/v1/solicitud/viabilizacion`,
      this.request
    );
  }

  public getRepetCredit (backURL: string, idNumber: string){
    let params = new HttpParams();
    params = params.set('client_id', idNumber);
    return this.http.get<any>(`${backURL}/puntofisico/validation/v1/getRepeatCredit?idNumber=${idNumber}`);
  }
}
