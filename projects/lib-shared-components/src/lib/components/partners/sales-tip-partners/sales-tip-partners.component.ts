import { Component, Input, OnInit } from '@angular/core';
import { ItemInfo } from '../../../models/help-sales/item-info.model';

@Component({
  selector: 'lib-sales-tip-partners',
  templateUrl: './sales-tip-partners.component.html',
  styleUrls: ['./sales-tip-partners.component.scss'],
})
export class SalesTipPartnersComponent implements OnInit {
  @Input('helptips') helpTips: ItemInfo[] = [];

  constructor() {}

  ngOnInit() {}
}
