export class Parameters {
  id: number;
  nombre: string;
  tipo: string;
  valorNumerico: number;
  valorTexto: string;
  activo: boolean;
  aliado: string;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.tipo = '';
    this.valorNumerico = 0;
    this.valorTexto = '';
    this.activo = false;
    this.aliado = '';
  }
}
