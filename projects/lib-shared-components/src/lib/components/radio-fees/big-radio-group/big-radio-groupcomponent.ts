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
import { CreditFee } from '../../../store/calculator/calculator.state';
import { Parameter } from '../../../store/partner';

@Component({
  selector: 'lib-big-radio-group',
  templateUrl: './big-radio-group.component.html',
  styleUrls: ['./big-radio-group.component.scss'],
})
export class BigRadioGroupComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input('fees') fees$: Observable<Parameter[]>;
  @Input('minAmount') public minAmount$: number;
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

  selectFee(feeNumber: number): void {
    this.validateRadioButton = false;
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
  }

  handleChange(target: any): void {
    this.calculatorFees$
      .pipe(take(1))
      .subscribe((fees) => {
        if (fees.length === 0) {
          target.checked = false;
        }
      })
      .unsubscribe();
  }

  ngOnDestroy(): void {
    this.allFees$.unsubscribe();
  }
}
