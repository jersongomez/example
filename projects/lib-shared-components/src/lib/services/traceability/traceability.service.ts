// import { RequestBody } from '../../../../../backoffice/src/app/models/traceability/aliado-Search/I_requestBody';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseAdapter } from 'projects/backoffice/src/app/models/Identity/responseAdapter';
import { Observable } from 'rxjs';
import { ObjectInitializer } from '../../../../../backoffice/src/app/models/Identity/ObjectInitializer';
import { RequestLogWS } from '../../../../../backoffice/src/app/models/Identity/requestLogWS';
import { TraceData } from '../../models/traceability/trace.data';
import { I_searchAllies } from 'projects/backoffice/src/app/models/traceability/aliado-Search/I_searchAllies';
import { I_CreateOrEditAliados } from 'projects/backoffice/src/app/models/traceability/aliado-CreateOrEdit/I_CreateOrEdit';
import { I_searcparametroForSearchhAllies } from 'projects/backoffice/src/app/models/traceability/parametro-ForSearch/I_parametroForSearch';
import { I_ParametrosCreateOrEdit } from 'projects/backoffice/src/app/models/traceability/parametro-CreateOrEdit/I_parametroCreateOrEdit';

@Injectable({
  providedIn: 'root',
})
export class TraceabilityService {
  private static readonly FROM: string = 'fechaIni';
  private static readonly TO: string = 'fechaFin';
  objectInitializer: any;



  constructor(
    private _http: HttpClient,
    objectInitializer: ObjectInitializer
    )
    {
      this.objectInitializer = objectInitializer;
    }

  public getLogByDateRange(backURL: string, from: string, to: string): Observable<TraceData[]> {
    let params = new HttpParams();
    params = params.append(TraceabilityService.FROM, `${from} 00:00:00`);
    params = params.append(TraceabilityService.TO, `${to} 23:59:59`);

    return this._http.get<TraceData[]>(`${backURL}/puntofisico/trazaViabilizacion/getTrazasByFechas`, { params });
  }

  public getLogWsMethodDocument(backURL: string, from: string, to: string, document: string): Observable<any> {
    let listResponseAdapter: ResponseAdapter[] = [];
    let request: RequestLogWS = this.objectInitializer.getLogWS();
    to = to.split('/').join('-');
    from = from.split('/').join('-');
    request.requestHeader.identificacion = document;
    request.requestBody.methods = [
      'VALIDATION-IDENTIDAD', 'VALIDATION-PREGUNTAS', 'VALIDATION-OTP'
    ]
    request.requestBody.endDate = to;
    request.requestBody.startDate = from;
    request.requestBody.identificationNumber = document;

    return this._http.post<any>(`${backURL}/puntofisico/validation/v1/findForMethodAndIdentification/`, request);
  }

  public getProcessFirma(backURL: string, client_id: string, numbercase: string, aliado: string ): Observable<any> {
    let params = new HttpParams();
    params = params.append('client_id',client_id );
    params = params.append('aliado', aliado );
    params = params.append('numberCase', numbercase);

    return this._http.get<any>(`${backURL}/middleware/v1/allState`, {params});
  }

  public getTiendasAliados(backURL: string, aliado: string) {
    let params = new HttpParams();
    params = params.set('aliado', aliado);
    return this._http.get<any>(`${backURL}/puntofisico/aliado/findAliadoDirectory`, {
      params,
    });
  }

  public generateLogReportByDateRange(backURL: string, from: string, to: string) {
    let params = new HttpParams();
    params = params.append(TraceabilityService.FROM, `${from} 00:00:00`);
    params = params.append(TraceabilityService.TO, `${to} 23:59:59`);

    return this._http.get<any>(`${backURL}/puntofisico/trazaViabilizacion/generateLogReportByDateRange`, {
      params,
      responseType: 'arraybuffer' as any,
    });
  }

  public getsignedDocuments(backURL: string, idNumber: string) {
    let params = new HttpParams();
    params = params.set('client_id', idNumber);
    return this._http.get<any>(`${backURL}/middleware/v1/getAllFilenet?idNumber=${idNumber}`);
  }

 inicializarInterface: I_searchAllies = {
    requestHeader:{
      codAliado: '',
      usuarioAliado: '',
      sesionId: '',
      ip: '',
      numeroSolicitudCredito : 0,
      tipoIdentificacion: '',
      identificacion: ''
    },
    requestBody: {
      id: 0,
      nombreAliado: '',
      activo: null,
      riesgo: null,
      aliadoAddi: null
    }
 }

 public findAlliets(backURL: string, textoBusqueda: string, aliadoAddi: boolean,  estadoAliado: boolean): Observable<any> {
   let request=  this.inicializarInterface;
     request.requestBody.id = null;
     request.requestBody.nombreAliado = textoBusqueda;
     request.requestBody.activo = estadoAliado;
     request.requestBody.riesgo = null;
     request.requestBody.aliadoAddi = aliadoAddi;
    return this._http.post<any>(`${backURL}/puntofisico/aliado/aliadoForSearch/`, request);
 }

  interfaceCreateOrEdit : I_CreateOrEditAliados = {
    requestHeader:{
      codAliado: '',
      usuarioAliado: '',
      sesionId: '',
      ip: '',
      numeroSolicitudCredito : 0,
      tipoIdentificacion: '',
      identificacion: ''
    },
    requestBody: {
      id: 0,
      nombreAliado: '',
      activo: null,
      riesgo: 0,
      aliadoAddi: null
    }
  }

  publicaliadoCreateOrEdit(backURL: string, id: number, nombreAliado: string,  activo: boolean, riesgo: number, aliadoAddi: boolean ): Observable<any> {
    let request=  this.interfaceCreateOrEdit;
     request.requestBody.id = id;
     request.requestBody.nombreAliado = nombreAliado;
     request.requestBody.activo = activo;
     request.requestBody.riesgo = riesgo;
     request.requestBody.aliadoAddi = aliadoAddi;
    return this._http.post<any>(`${backURL}/puntofisico/aliado/aliadoCreateOrEdit/`, request);
  }

  intparameterForSearch: I_searcparametroForSearchhAllies ={
    requestHeader:{
      codAliado: '',
      usuarioAliado: '',
      sesionId: '',
      ip: '',
      numeroSolicitudCredito : 0,
      tipoIdentificacion: '',
      identificacion: ''
    },
    requestBody: {
      id: null,
      nombre: '',
      tipo: '',
      valorNumerico: null,
      valorTexto: null,
      activo: null,
      idAliado: 0
    }

  }

  parameterForSearch(backURL: string, nombre: string, tipo: string, id: number){
    let request = this.intparameterForSearch;
    request.requestBody.nombre = nombre;
    request.requestBody.tipo = tipo;
    request.requestBody.idAliado= id;
    return this._http.post<any>(`${backURL}/puntofisico/aliado/parameterForSearch/`, request);
  }

  intparameterCreateOrEdit: I_ParametrosCreateOrEdit ={
    requestHeader:{
      codAliado: '',
      usuarioAliado: '',
      sesionId: '',
      ip: '',
      numeroSolicitudCredito : 0,
      tipoIdentificacion: '',
      identificacion: ''
    },
    requestBody: {
      id: null,
      nombre: '',
      tipo: '',
      valorNumerico: null,
      valorTexto: null,
      activo: null,
      idAliado: 0
    }

  }

  parameterCreateOrEdit(backURL: string, idParametro: number, nombreParametro: string, tipoParametro: string, valorNumerico: number, valorTexto: string,  activo: boolean, idAliado: number){
    let request = this.intparameterCreateOrEdit;
    request.requestBody.id = idParametro;
    request.requestBody.nombre = nombreParametro;
    request.requestBody.tipo = tipoParametro;
    request.requestBody.valorNumerico = valorNumerico;
    request.requestBody.valorTexto = valorTexto;
    request.requestBody.activo = activo;
    request.requestBody.idAliado = idAliado;
return this._http.post<any>(`${backURL}/puntofisico/aliado/parameterCreateOrEdit/`, request);
  }
}
