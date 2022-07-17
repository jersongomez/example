import { Injectable } from '@angular/core';
import { PartnerFacade } from 'projects/lib-shared-components/src/public-api';
import { take } from 'rxjs/operators';
import { Cuota } from 'src/app/models/index';

@Injectable({
  providedIn: 'root',
})
export class CuotasService {
  private cuotas: Cuota[] = [];

  constructor(private partnerFacade: PartnerFacade) {
    this.getCuotas();
  }

  public get Cuotas() {
    return this.cuotas;
  }

  public getCuotas = (): Promise<Cuota[]> => {
    return new Promise((resolve, reject) => {
      this.partnerFacade.installmentsParam$.pipe(take(2)).subscribe(
        (installments) => {
          installments.forEach((installment) => {
            const cuota = new Cuota();
            cuota.idCuota = installment.numbericalValue;
            cuota.meses = installment.textValue;
            this.cuotas.push(cuota);
          });
          this.Cuotas.sort((a, b) => {
            return a.idCuota - b.idCuota;
          });
          resolve(this.cuotas);
        },
        () => {
          reject('No se pudo cargar las cuotas');
        }
      );
    });
  };
}
