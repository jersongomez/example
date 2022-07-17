import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CreditFee } from '../../store/calculator/calculator.state';
import { Parameter } from '../../store/partner';

@Component({
  selector: 'lib-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
})
export class RadioGroupComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input('fees') fees$: Observable<Parameter[]>;
  @Input('minAmount') public minAmount$: number;
  @Input('disableIfFeeCalculated') public disableIfFeeCalculated: boolean = true;
  @Input('showFeeCalculated') public showFeeCalculated: boolean = true;
  @Input('color') public color: string;
  @Input('creditfeedata') currentFee$: Observable<CreditFee>;
  @Output() onSelectFee = new EventEmitter<number>();
  @Input('calculatorfees') calculatorFees$: Observable<CreditFee[]>;
  @Input('loadingfees') loadingFees$: Observable<boolean>;
  validateRadioButton: boolean = false;
  allFees$: Subscription;
  existCalculatorFees = false;

  @ViewChildren('radioBtns') radioBtns: QueryList<ElementRef>;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.allFees$ = this.calculatorFees$.subscribe((fees) => {
      if (fees.length === 0) {
        this.radioBtns.forEach((el) => (el.nativeElement.checked = false));
      }
      this.existCalculatorFees = fees.length > 0;
    });
  }

  disabled(fee) {
    if (!this.disableIfFeeCalculated) {
      return false;
    }

    return !fee.valueFeeWithInsurance && this.existCalculatorFees;
  }

  selectFee(feeNumber: number): void {
    this.validateRadioButton = false;

    if (this.disableIfFeeCalculated) {
      this.calculatorFees$
        .pipe(take(1))
        .subscribe((fees) => {
          if (fees.length > 0) {
            this.onSelectFee.emit(feeNumber);
          } else {
            this.validateRadioButton = true;
          }
        })
        .unsubscribe();
    } else {
      this.onSelectFee.emit(feeNumber);
    }
  }

  handleChange(target: any): void {
    if (this.disableIfFeeCalculated) {
      this.calculatorFees$
        .pipe(take(1))
        .subscribe((fees) => {
          if (fees.length === 0) {
            target.checked = false;
          }
        })
        .unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.allFees$.unsubscribe();
  }
}
