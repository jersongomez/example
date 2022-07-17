export class Department {
  id: number;
  nombre: string;
  ciudades: City[];

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.ciudades = [];
  }
}

export class City {
  id: number;
  nombre: string;
  idDepartamento: number;
  nombreDepartamento: string;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.idDepartamento = 0;
    this.nombreDepartamento = '';
  }
}
