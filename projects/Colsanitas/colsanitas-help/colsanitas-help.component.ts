import { Component, OnInit } from '@angular/core';
import { MenuFacade } from 'projects/lib-shared-components/src/public-api';
import { Constants } from 'src/app/utils/constants';

@Component({
  selector: 'app-colsanitas-help',
  templateUrl: './colsanitas-help.component.html',
  styleUrls: ['./colsanitas-help.component.scss'],
})
export class ColsanitasHelpComponent implements OnInit {
  constructor(private menuFacade: MenuFacade) {}

  ngOnInit() {
    this.menuFacade.getMenuByName(Constants.ALIADO_COLSANITAS);
  }
}
