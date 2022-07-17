import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ParametersService {
  private typesOcupation = [
    {
      code: 1,
      ocupation: 1,
      typeOcupation: 15,
      name: 'Pensionado',
    },
    {
      code: 2,
      ocupation: 1,
      typeOcupation: 16,
      name: 'Empleado',
    },
    {
      code: 3,
      ocupation: 2,
      typeOcupation: 9,
      name: 'Independiente',
    },
  ];

  constructor() {}

  public get TypesOcupation() {
    return this.typesOcupation;
  }

  public getOcupationToCode(code: number): number {
    const type = this.typesOcupation.find((e) => e.code === code);
    return !!type ? type.ocupation : null;
  }

  public getTypeOcupationToCode(code: number): number {
    const type = this.typesOcupation.find((e) => e.code === code);
    return !!type ? type.typeOcupation : null;
  }

  public getNameToCode(code: number): string {
    const type = this.typesOcupation.find((e) => e.code === code);
    return !!type ? type.name : null;
  }
}
