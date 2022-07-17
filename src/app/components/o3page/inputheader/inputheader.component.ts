import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CalculatorService } from 'src/app/services/shared/calculator.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import * as models from 'src/app/models/index';
import { AuthService } from 'src/app/services/shared/auth.service';
import { Parameter, PartnerFacade } from 'projects/lib-shared-components/src/public-api';
import { combineLatest, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-inputheader',
  templateUrl: './inputheader.component.html',
  styleUrls: ['./inputheader.component.scss'],
})
export class InputheaderComponent implements OnInit {
  form: FormGroup;
  percentMin: number;

  minAmount$: Observable<number> = this.partnerFacade.minAmount$;
  maxAmount$: Observable<number> = this.partnerFacade.maxAmount$;
  percentMin$: Observable<number> = this.partnerFacade.percentMin$;
  percentMax$: Observable<number> = this.partnerFacade.percentMax$;
  percentBquilla$: Observable<number> = this.partnerFacade.percentBquilla$;
  citiesParams$: Observable<Parameter[]> = this.partnerFacade.citiesParams$;

  @Output() public outMontoSolicitado = new EventEmitter<number>();

  constructor(
    public calculatorService: CalculatorService,
    protected authService: AuthService,
    private partnerFacade: PartnerFacade
  ) {}

  ngOnInit() {
    this.initializerForm();
    this.cityChange();
  }

  initializerForm(): void {
    this.form = new FormGroup({
      monto: new FormControl('', [Validators.required]),
      ciudad: new FormControl('', Validators.required),
      porcentajeInitial: new FormControl(0, [Validators.required]),
    });

    combineLatest(this.minAmount$, this.maxAmount$, this.percentMin$, this.percentMax$)
      .pipe(take(1))
      .subscribe(([minAmount, maxAmount, percentMin, percentMax]) => {
        this.calculatorService.MinToFinance = minAmount;
        this.percentMin = percentMin;

        this.form = new FormGroup({
          monto: new FormControl('', [Validators.required, Validators.min(minAmount), Validators.max(maxAmount)]),
          ciudad: new FormControl('', Validators.required),
          porcentajeInitial: new FormControl(0, [
            Validators.required,
            Validators.min(percentMin),
            Validators.max(percentMax),
          ]),
        });
      })
      .unsubscribe();

    this.form.valueChanges.subscribe(async (value) => {
      this.calculatorService.Cuota = new models.ResponseCalculator();
      if (this.form.valid) {
        await this.authService.updateToken();
        this.outMontoSolicitado.emit(value);
      } else {
        const dataCuotas: models.ResponseCalculator[] = [];
        this.calculatorService.DataCuotas = dataCuotas;
      }
    });
  }

  cityChange(): void {
    this.form.get('ciudad').valueChanges.subscribe(async (value) => {
      combineLatest(this.percentMin$, this.percentBquilla$)
        .pipe(take(1))
        .subscribe(([percentMin, percentBquilla]) => {
          if (value === 'BARRANQUILLA') {
            if (this.form.get('porcentajeInitial').value < percentBquilla) {
              this.form.get('porcentajeInitial').setValue(percentBquilla);
            }
            this.percentMin = percentBquilla;
          } else {
            this.percentMin = percentMin;
          }
        })
        .unsubscribe();
    });
  }
}
