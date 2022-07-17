import { Component, AfterViewChecked } from '@angular/core';
import * as models from 'src/app/models/index';
import { CalculatorService } from 'src/app/services/shared/calculator.service';
import { CuotasService } from 'src/app/services/shared/cuotas.service';

@Component({
  selector: 'app-radiogroup',
  templateUrl: './radiogroup.component.html',
  styleUrls: ['./radiogroup.component.scss'],
})
export class RadiogroupComponent implements AfterViewChecked {
  public radios: models.Cuota[];
  public data: models.ResponseCalculator[] = [];
  constructor(public calculatorService: CalculatorService, public serviceCuota: CuotasService) {}

  setCuota(idCuota: number) {
    const cuota = this.calculatorService.DataCuotas.filter((dataCuota) => dataCuota.numeroCuota === idCuota);
    if (cuota.length > 0) {
      this.calculatorService.Cuota = cuota[0];
    }
    this.calculatorService.setPristine = false;
  }

  unClick() {
    const radios: any = document.getElementsByClassName('check');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < radios.length; i++) {
      radios[i].checked = false;
    }
  }

  ngAfterViewChecked(): void {
    if (this.calculatorService.DataCuotas.length === 0) {
      this.unClick();
    }
  }
}
