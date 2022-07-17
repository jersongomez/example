import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditFee } from '../../store/calculator/calculator.state';

@Component({
  selector: 'lib-calculator-summary',
  templateUrl: './calculator-summary.component.html',
  styleUrls: ['./calculator-summary.component.scss'],
})
export class CalculatorSummaryComponent implements OnInit {
  public showContent = false;

  @Input('creditfeedata') creditFeeData$: Observable<CreditFee>;

  constructor() {}

  ngOnInit() {}
}
