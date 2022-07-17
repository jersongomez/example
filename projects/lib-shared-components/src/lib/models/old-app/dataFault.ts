import { Birthday } from './birthday';

export class DataFault {
  tipoId: string;
  fechaNacimiento: Birthday;
  actividadEco: string;

  constructor() {
    this.tipoId = '';
    this.fechaNacimiento = new Birthday();
    this.actividadEco = '';
  }
}
