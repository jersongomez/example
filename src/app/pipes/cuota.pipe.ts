import { Pipe, PipeTransform } from '@angular/core';
import { ResponseCalculator } from '../models/response-calculator';

@Pipe({
  name: 'cuota',
})
export class CuotaPipe implements PipeTransform {
  transform(dataCuotas: ResponseCalculator[], cuota: string): any {
    let valor = 0;
    if (dataCuotas.length > 0) {
      // tslint:disable-next-line: radix
      const cuot = parseInt(cuota);
      const dataCuota = dataCuotas.filter((data) => data.numeroCuota === cuot);
      valor = dataCuota[0].valorCuotaConSeguro;
    }
    return valor;
  }
}
