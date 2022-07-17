export class RequestViability {
  requestHeader: {
    codAliado: string; // cargue inicial
    usuarioAliado: string; // cargue inicial
    sesionId: string; // cargue inicial
    numeroSolicitudCredito: number; // colocar 0
    tipoIdentificacion: number; // formulario
    identificacion: number; // formulario
  };
  requestBody: {
    nombres: string; // formulario
    apellidos: string; // formulario
    direccion: string; // formulario
    telefono: number;
    celular: number; // formulario
    correoElectronico: string; // formulario
    anoNacimiento: number; // formulario
    valorSolicitado: number; // formulario
    ingresos: number; // formulario
    plazo: number; // cargue inicial
    actividad: string; // formulario
    ciudad: string; // solicitar creacion de servicio. por parte de samtel.
    canalOrigen: number; // colocar 1
    motor: string;
    estrato: string;
    estadoCivil: string;
    // nombreAsesor : string;//modal
    // sede: string;//modal
  };

  constructor() {
    this.requestHeader = {
      codAliado: '',
      usuarioAliado: '',
      sesionId: '',
      numeroSolicitudCredito: 0,
      tipoIdentificacion: 0,
      identificacion: 0,
    };
    this.requestBody = {
      nombres: '',
      apellidos: '',
      direccion: '',
      telefono: 0,
      celular: 0,
      correoElectronico: '',
      anoNacimiento: 0,
      valorSolicitado: 0,
      ingresos: 0,
      plazo: 0,
      actividad: '',
      ciudad: '',
      canalOrigen: 1,
      motor: '',
      estrato: '',
      estadoCivil: '',
      // nombreAsesor:'',
      // sede: ''
    };
  }
}
