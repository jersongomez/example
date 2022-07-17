import { Component, Input, OnInit } from '@angular/core';
import { CreditFee } from 'projects/lib-shared-components/src/lib/store/calculator/calculator.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.scss'],
})
export class LoanDetailComponent implements OnInit {
  @Input('currentFee') currentFee$: Observable<CreditFee>;
  @Input('initialPercent') initialPercent: number;
  @Input('zeroRate') zeroRate: boolean;

  showDetails: boolean = false;

  constructor() {}

  ngOnInit() {}

  setShowDetails() {
    this.showDetails = !this.showDetails;
  }
}
