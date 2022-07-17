import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditFee } from '../../../store/calculator/calculator.state';

@Component({
  selector: 'lib-print-detail-partners',
  templateUrl: './print-detail-partners.component.html',
  styleUrls: ['./print-detail-partners.component.scss'],
})
export class PrintDetailPartnersComponent implements OnInit {
  @Input('currentfee') currentFee$: Observable<CreditFee>;
  @Input('logoheader') logoHeader: string;
  @Input('companyheaderlogo') companyHeaderLogo: string;

  constructor() {}

  ngOnInit() {}
}
