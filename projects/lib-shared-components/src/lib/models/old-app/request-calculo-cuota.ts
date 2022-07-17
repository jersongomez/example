export class RequestCalculoCuota {
  aliado: string;
  cantidadCuotas: number;
  valorSolicitado: number;
  descuento: number;
  porcentajeCuotaInicial: number;
  diaCorte: number;
  valorProducto: number;
  gracePeriod: boolean;
  riskInsurance: boolean;

  constructor() {
    this.aliado = '';
    this.cantidadCuotas = 0;
    this.valorSolicitado = 0;
    this.descuento = 0;
    this.porcentajeCuotaInicial = 0;
    this.diaCorte = 0;
    this.valorProducto = 0;
    this.gracePeriod = true;
    this.riskInsurance = true;
  }
}
