import { Component, Input, OnInit } from '@angular/core';
import { ItemInfo } from '../../../models/help-sales/item-info.model';

@Component({
  selector: 'lib-app-manual-partners',
  templateUrl: './app-manual-partners.component.html',
  styleUrls: ['./app-manual-partners.component.scss'],
})
export class AppManualPartnersComponent implements OnInit {
  @Input('helpitems') helpItems: ItemInfo[] = [];

  constructor() {}

  ngOnInit() {}
}
