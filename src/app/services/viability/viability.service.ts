import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as models from 'src/app/models/index';
import { AuthService } from 'src/app/services/shared/auth.service';
import { CalculatorService } from 'src/app/services/shared/calculator.service';
import { DataFault } from 'src/app/models/index';
import { ParametersService } from '../shared/parameters.service';
import { map, take } from 'rxjs/operators';
import {
  DomainsFacade,
  PartnerFacade,
  PartnerState,
  ViabilityFacade,
} from 'projects/lib-shared-components/src/public-api';
import { AppConfig } from 'src/app/app-config';

@Injectable({
  providedIn: 'root',
})
export class ViabilityService {
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

  constructor(
    protected authService: AuthService,
    protected calculatorService: CalculatorService,
    protected http: HttpClient,
    private parametersService: ParametersService,
    private domainsFacade: DomainsFacade,
    private partnerFacade: PartnerFacade,
    private viabilityFacade: ViabilityFacade
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
      .subscribe((partner: PartnerState) => (this.request.requestHeader.codAliado = partner.partnerName));
    this.request.requestHeader.usuarioAliado = this.authService.getUserName();
    this.request.requestHeader.sesionId = this.authService.getSessionId();
    this.request.requestBody.valorSolicitado = this.calculatorService.Cuota.montoAFinanciar;
    this.request.requestBody.plazo = this.calculatorService.Cuota.numeroCuota;
    this.request.requestBody.nombres = value.nombres;
    this.request.requestBody.apellidos = value.apellidos;
    this.request.requestHeader.tipoIdentificacion = value.tipoIdentificacion;
    this.request.requestHeader.identificacion = value.numeroIdentificacion;
    this.request.requestBody.correoElectronico = value.correoElectronico;
    this.request.requestBody.celular = value.celular;
    this.request.requestBody.motor = 'dictum';
    console.log(this.request);

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
