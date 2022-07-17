export class RequestValidate {
  requestHeader: {
    codAliado: string;
    usuarioAliado: string;
    sesionId: string;
    ip: string;
    numeroSolicitudCredito: number;
    tipoIdentificacion: number;
    identificacion: number;
  };
  requestBody: {
    primerNombre: string;
    primerApellido: string;
    fechaExpedicion: string; // format yyyy-mm-dd
    numeroCelular: string;
    centralRiesgo: boolean;

    // otp
    regValidacion: string;
    codigoOTP: string;
    idTransaccionOTP: string;

    // preguntas
    idCuestionario: string;
    regCuestionario: string;
    respuestas: RespuestaQuestion[];
  };

  constructor() {
    this.requestHeader = {
      codAliado: '',
      usuarioAliado: '',
      sesionId: '',
      ip: '',
      numeroSolicitudCredito: 0,
      tipoIdentificacion: 0,
      identificacion: 0,
    };
    this.requestBody = {
      primerNombre: '',
      primerApellido: '',
      fechaExpedicion: '',
      numeroCelular: '',
      centralRiesgo: false,
      regValidacion: '',
      codigoOTP: '',
      idTransaccionOTP: '',
      idCuestionario: '',
      regCuestionario: '',
      respuestas: [],
    };
  }
}

export class RespuestaQuestion {
  idPregunta: string;
  idRespuesta: string;
  constructor() {
    this.idPregunta = '';
    this.idRespuesta = '';
  }
}
