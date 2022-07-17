export class Question {
  cuestionario: Cuestionario;
  constructor() {
    this.cuestionario = new Cuestionario();
  }
}

export class Cuestionario {
  resultado: string;
  id: number;
  registro: number;
  pregunta: Pregunta[];
  constructor() {
    this.resultado = '';
    this.registro = 0;
    this.id = 0;
    this.pregunta = [];
  }
}

export class Pregunta {
  texto: string;
  orden: number;
  respuesta: Respuesta[];

  constructor() {
    this.texto = '';
    this.orden = 0;
    this.respuesta = [];
  }
}

class Respuesta {
  texto: string;
  id: string;

  constructor() {
    this.texto = '';
    this.id = '';
  }
}
