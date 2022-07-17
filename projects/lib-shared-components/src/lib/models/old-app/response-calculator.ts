export class ResponseCalculator {
  valorCuotaConSeguro: number;
  valorCuotaSinSeguro: number;
  valorTotalSeguro: number;
  costoMensualSeguro: number;
  montoTotalFinanciamiento: number;
  montoAFinanciar: number;
  valorConDescuento: number;
  tasa: number;
  nominalMesVencido: number;
  numeroCuota: number;
  cuotaMensualSinInicial: number;
  cuotaInicial: number;
  valorSinCuotaInicial: number;
  cuatroxMil: number;
  costoInteres: number;
  descuentoFinanciacion: number;
  costoGaes: number;
  costoTotalGaes: number;
  valorSinCuotaInicialNiDescuento: number;
  fechaCorte: string;
  valorTodoRiesgo: number;
  costoMensualTodoRiesgo: number;
  valorAccidentes: number;
  valorPrimaAnual: number;
  valorProducto: number;
  tasaRiesgo: number;
  error: string;

  constructor() {
    this.valorCuotaConSeguro = 0;
    this.valorCuotaSinSeguro = 0;
    this.valorTotalSeguro = 0;
    this.costoMensualSeguro = 0;
    this.montoTotalFinanciamiento = 0;
    this.montoAFinanciar = 0;
    this.valorConDescuento = 0;
    this.tasa = 0;
    this.nominalMesVencido = 0;
    this.numeroCuota = 0;
    this.cuotaMensualSinInicial = 0;
    this.cuotaInicial = 0;
    this.valorSinCuotaInicial = 0;
    this.cuatroxMil = 0;
    this.costoInteres = 0;
    this.descuentoFinanciacion = 0;
    this.costoGaes = 0;
    this.costoTotalGaes = 0;
    this.valorSinCuotaInicialNiDescuento = 0;
    this.fechaCorte = '';
    this.valorAccidentes = 0;
    this.valorPrimaAnual = 0;
    this.valorProducto = 0;
    this.tasaRiesgo = 0;
    this.error = '';
  }
}
