export class ResponseViability {
  codRespuesta: number;
  respuestaServicio: RespuestaServicio;
  mensajeError: string;

  constructor() {
    this.codRespuesta = 0;
    this.respuestaServicio = new RespuestaServicio();
    this.mensajeError = '';
  }
}

class RespuestaServicio {
  solicitud: string;
  detalles: Detalles;
  constructor() {
    this.solicitud = '';
    this.detalles = new Detalles();
  }
}

class Detalles {
  aciertaMas: number;
  causalRechazo: string;
  endeudamientoMaximo: number;
  constructor() {
    this.aciertaMas = 0;
    this.causalRechazo = '';
    this.endeudamientoMaximo = 0;
  }
}
