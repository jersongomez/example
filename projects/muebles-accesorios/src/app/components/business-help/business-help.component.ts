import { Component, OnInit } from '@angular/core';
import { HelpSalesService } from 'projects/lib-shared-components/src/lib/services/help-sales/help-sales.service';
import { FlowV1Service } from 'projects/lib-shared-components/src/lib/services/viability-v1/flow-v1.service';
import { Menu, MenuFacade } from 'projects/lib-shared-components/src/public-api';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/shared/auth.service';
import { Constants } from 'src/app/utils/constants';

@Component({
  selector: 'app-business-help',
  templateUrl: './business-help.component.html',
  styleUrls: ['./business-help.component.scss'],
})
export class BusinessHelpComponent implements OnInit {
  URL_BACKGROUND = 'assets/home/muebles-accesorios-bg.jpg';
  URL_LOGO_PARTNER = 'assets/muebles-accesorios/img/muebles-accesorios.png';
  URL_LOGO_SANTANDER = 'assets/muebles-accesorios/img/consumerFinance.png';

  menuItems$: Observable<Menu[]>;
  helpItemsParaiso = this.helpSalesService.helpItemsParaiso;
  helpTipsParaiso = this.helpSalesService.helpTipsParaiso;

  constructor(
    private menuFacade: MenuFacade,
    protected auth: AuthService,
    public flowService: FlowV1Service,
    private helpSalesService: HelpSalesService
  ) {}

  ngOnInit() {
    this.menuFacade.getMenuByName(Constants.ALIADO_MUEBLES_Y_ACCESORIOS);
    this.menuFacade.menuWithoutCurUrl();
    this.menuItems$ = this.menuFacade.menuWithoutCurUrl$;
  }
}
