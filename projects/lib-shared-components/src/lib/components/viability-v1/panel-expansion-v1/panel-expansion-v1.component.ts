import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/utils/constants';

@Component({
  selector: 'lib-panel-expansion-v1',
  templateUrl: './panel-expansion-v1.component.html',
  styleUrls: ['./panel-expansion-v1.component.scss'],
})
export class PanelExpansionV1Component implements OnInit {
  public showPane2 = false;
  public info = Constants.MAS;
  constructor() {}

  ngOnInit() {}

  showInfo() {
    this.showPane2 = !this.showPane2;
    this.info = !this.showPane2 ? Constants.MAS : Constants.MENOS;
  }
}
