export interface CalculateFeeRq {
  aliado: string;
  valorSolicitado: number;
  valorProducto?: number;
  zeroRate?: boolean;
  cantidadCuotas?: number;
  gracePeriod?: boolean;
  riskInsurance?: boolean;
  lack?: number;
  subsidized?: boolean;
  epsPrepagada?: boolean;
  porcentajeCuotaInicial?: number;
}

export interface CalculateFeeRs {
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
  tarjetaDeCredito: boolean;
  valorInteres: number;
  valorTodoRiesgo: number;
  costoMensualTodoRiesgo: number;
  valorAccidentes: number;
  valorPrimaAnual: number;
  valorProducto: number;
  tasaRiesgo: number;
  valorCapital: number;
  valorTotalPagoConSeguro: number;
  valorTotalPagoSinSeguro: number;
  error: string;
  zubsidized: boolean;
  valueZubsidized: string;
  valorAsistencia: number;
  valoSeguroSinAsistencia: number;
  ivazubsidized: string;
}
