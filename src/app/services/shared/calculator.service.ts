import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as models from 'src/app/models/index';
import { AppConfig } from 'src/app/app-config';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private request: models.RequestCalculoCuota = new models.RequestCalculoCuota();
  private dataCuotas: models.ResponseCalculator[] = [];
  private cuota: models.ResponseCalculator = new models.ResponseCalculator();
  private cuotaTC: models.ResponseCalculator = new models.ResponseCalculator();
  private showData = false;
  private loadData = false;
  private accions = false;
  private pristine = true;
  private minToFinance: number;
  private errorMinToFinance = false;

  constructor(public http: HttpClient) {}

  public set Request(request: models.RequestCalculoCuota) {
    this.request = request;
  }

  public get Request(): models.RequestCalculoCuota {
    return this.request;
  }

  public set DataCuotas(data: models.ResponseCalculator[]) {
    this.dataCuotas = data;
  }

  public get DataCuotas(): models.ResponseCalculator[] {
    return this.dataCuotas;
  }

  public set Cuota(cuota: models.ResponseCalculator) {
    this.actions(cuota.montoTotalFinanciamiento >= this.minToFinance ? false : true);
    this.cuota = cuota;
  }

  public get Cuota(): models.ResponseCalculator {
    return this.cuota;
  }

  public set CuotaTC(cuotaTC: models.ResponseCalculator) {
    this.cuota = cuotaTC;
  }

  public get CuotaTC(): models.ResponseCalculator {
    return this.cuotaTC;
  }

  public set ShowData(showdata: boolean) {
    this.showData = showdata;
  }

  public get ShowData(): boolean {
    return this.showData;
  }

  public set setLoadData(loadData: boolean) {
    this.loadData = loadData;
  }

  public get getLoadData(): boolean {
    return this.loadData;
  }

  public get getAccions(): boolean {
    return this.accions;
  }

  public set setPristine(value: boolean) {
    this.pristine = value;
  }

  public get getPristine(): boolean {
    return this.pristine;
  }

  public set MinToFinance(minToFinance: number) {
    this.minToFinance = minToFinance;
  }

  public get MinToFinance(): number {
    return this.minToFinance;
  }

  public set ErrorMinToFinance(errorMinToFinance: boolean) {
    this.errorMinToFinance = errorMinToFinance;
  }

  public get ErrorMinToFinance(): boolean {
    return this.errorMinToFinance;
  }

  public calculoCuotas() {
    this.errorMinToFinance = false;
    return this.http.post<models.ResponseCalculator[]>(
      `${AppConfig.settings.apiServer.backend}/puntofisico/calculosCuotas`,
      this.request
    );
  }

  public feeCalculator(request: models.RequestCalculoCuota) {
    return this.http.post<models.ResponseCalculator[]>(
      `${AppConfig.settings.apiServer.backend}/puntofisico/calculoautomundial`,
      request
    );
  }

  public calculateFee() {
    return this.http.post<models.ResponseCalculator>(
      `${AppConfig.settings.apiServer.backend}/puntofisico/calculateFee`,
      this.request
    );
  }

  public actions(reset: boolean) {
    if (reset) {
      this.accions = false;
      this.showData = false;
    } else {
      this.accions = true;
    }
  }

  public resetRequest() {
    this.request = new models.RequestCalculoCuota();
    this.request.valorSolicitado = this.minToFinance;
    this.request.valorProducto = this.minToFinance;
    this.cuota = new models.ResponseCalculator();
    this.accions = false;
  }
}
