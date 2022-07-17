import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppConfig } from 'src/app/app-config';
import { CalculateFeeRq } from '../../../models/calculator/calculate-fee.model';
import { CalculatorFacade } from '../../../store/calculator';
import { CreditFee } from '../../../store/calculator/calculator.state';
import { Parameter, PartnerFacade } from '../../../store/partner';
import { ViabilityFacade } from '../../../store/viability';
import { InputheaderComponent } from '../../inputheader';

@Component({
  selector: 'lib-card-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  step = 100000;
  amount = 0;
  feeSelected = null;
  toolTippText = '';

  currentFee$: Observable<CreditFee> = this.calculatorFacade.currentFee$;
  fees$: Observable<CreditFee[]> = this.calculatorFacade.allFees$;
  installmentsParam$: Observable<Parameter[]> = this.partnerFacade.installmentsParam$;
  min$: Observable<number> = this.partnerFacade.minAmount$;
  max$: Observable<number> = this.partnerFacade.maxAmount$;
  loadingFees$: Observable<boolean> = this.calculatorFacade.loadingFees$;

  minSubscription: Subscription;

  @ViewChild('inputHeader', { static: false }) inputHeader: InputheaderComponent;

  @Input('partner') public partner: string;

  @Output() public starRequest = new EventEmitter();
  @Output() public print = new EventEmitter();

  constructor(
    private partnerFacade: PartnerFacade,
    private calculatorFacade: CalculatorFacade,
    private viabilityFacade: ViabilityFacade
  ) {}

  ngOnInit() {
    this.fees$.subscribe((newFees) => {
      if (newFees.length) {
        const newCurrentFee = newFees[0];
        const tcFee = newFees.filter((alllFees) => alllFees.creditCard);
        const normalFee = newFees.filter((alllFees) => !alllFees.creditCard);
        const interestValuesTc = tcFee.map((tc) => tc.interestValue).reduce((a, b) => a + b, 0);
        const interestValuesNormal = normalFee.map((tc) => tc.interestValue).reduce((a, b) => a + b, 0);

        newCurrentFee.totalValuePaymentWithoutInsurance = this.amount + interestValuesNormal;
        newCurrentFee.totalValuePaymentWithoutInsuranceTc = this.amount + interestValuesTc;

        this.calculatorFacade.setCurrentFee(newCurrentFee);
        this.setTooltipText(newCurrentFee);
      }
    });
  }

  selectFee(feeNumber) {
    this.feeSelected = feeNumber;
    this.calculate();
  }

  changeAmountRq(monto) {
    this.amount = monto;
    this.calculate();
  }

  setTooltipText(currentFee) {
    this.toolTippText = `
      Monto total a financiar: $ ${this.amount}
      Cuota mensual: $ ${currentFee.valueFeeWithoutInsurance} + seguro
      Tasa NMV: ${(currentFee.nominalMonthOverdue * 100).toFixed(2)}
    `;
  }

  buildCalculateFeeRq(lack: number): CalculateFeeRq {
    return {
      aliado: this.partner,
      valorSolicitado: +this.amount,
      valorProducto: +this.amount,
      cantidadCuotas: this.feeSelected,
      lack,
    };
  }

  callGetAllFees(rq: CalculateFeeRq): void {
    this.viabilityFacade.setDataToCalculator(rq);
    this.calculatorFacade.getAllFees(AppConfig.settings.apiServer.backend, rq);
  }

  calculate() {
    if (this.amount && this.feeSelected) {
      const rq = this.buildCalculateFeeRq(0);
      this.callGetAllFees(rq);
    }
  }

  changeRequestValue() {
    this.inputHeader.setValue(this.amount);
    this.calculate();
  }

  onInitRequest() {
    this.starRequest.emit();
  }

  onPrint() {
    this.print.emit();
  }

  setValue(value) {
    this.inputHeader.setValue(value);
  }
}
