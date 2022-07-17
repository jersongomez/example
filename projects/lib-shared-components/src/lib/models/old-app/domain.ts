export class Domain {
  public id: number;
  public codigo: string;
  public dominio: string;
  public nombre: string;
  public descripcion: string;
  public codigoPadre: string;
  public dominioPadre: string;
  public activo: boolean;

  constructor() {
    this.id = 0;
    this.codigo = '';
    this.dominio = '';
    this.nombre = '';
    this.descripcion = '';
    this.codigoPadre = '';
    this.dominioPadre = '';
    this.activo = false;
  }
}
