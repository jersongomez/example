export interface TraceData {
  id: number;
  fechaOperacion: string;
  usuario: string;
  nombreAliado: string;
  nombreAsesor: string;
  sede: string;
  cedulaCliente: string;
  apellidoCliente: string;
  edadCliente: number;
  actividad: number;
  decision: string;
  causalRechazo: string;
  valorSolicitado: number;
  valorAprovado: number;
  plazo: number;
  disponibleEndeudamiento: number;
  score: number;
  variableSalida: string;
  endeudamientoMaximoQ12: number;
  endeudamientoMaximoQ24: number;
  endeudamientoMaximoQ36: number;
}
