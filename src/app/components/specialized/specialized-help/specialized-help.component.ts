import { Component, OnInit } from '@angular/core';
import { MenuFacade } from 'projects/lib-shared-components/src/public-api';
import { Constants } from 'src/app/utils/constants';

@Component({
  selector: 'app-specialized-help',
  templateUrl: './specialized-help.component.html',
  styleUrls: ['./specialized-help.component.scss'],
})
export class SpecializedHelpComponent implements OnInit {
  constructor(private menuFacade: MenuFacade) {}

  ngOnInit() {
    this.menuFacade.getMenuByName(Constants.ALIADO_SPECIALIZED);
  }
}
