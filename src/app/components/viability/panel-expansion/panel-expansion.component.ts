import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../utils/constants';

@Component({
  selector: 'app-panel-expansion',
  templateUrl: './panel-expansion.component.html',
  styleUrls: ['./panel-expansion.component.css'],
})
export class PanelExpansionComponent {
  public showPane2 = false;
  public info = Constants.MAS;
  constructor() {}

  showInfo() {
    this.showPane2 = !this.showPane2;
    this.info = !this.showPane2 ? Constants.MAS : Constants.MENOS;
  }
}
