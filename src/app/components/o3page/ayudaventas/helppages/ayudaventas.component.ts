import { Component, OnInit } from '@angular/core';
import { HelpSalesService } from 'projects/lib-shared-components/src/lib/services/help-sales/help-sales.service';
import { Menu, MenuFacade } from 'projects/lib-shared-components/src/public-api';
import { Observable, of } from 'rxjs';
import { Constants } from 'src/app/utils/constants';

@Component({
  selector: 'app-ayudaventas',
  templateUrl: './ayudaventas.component.html',
  styleUrls: ['./ayudaventas.component.scss'],
})
export class AyudaventasComponent implements OnInit {
  URL_LOGO_PARTNER = 'assets/img/logoO3.png';
  URL_LOGO_SANTANDER = 'assets/paraiso/img/consumerFinance.png';

  helpItemsO3Mobility = this.helpSalesService.helpItemsO3Mobility;
  helpTipsO3Mobility = this.helpSalesService.helpTipsO3Mobility;

  menuItems$: Observable<Menu[]> = of([]);

  constructor(private menuFacade: MenuFacade, private helpSalesService: HelpSalesService) {}

  ngOnInit() {
    this.menuFacade.getMenuByName(Constants.ALIADO_O3);
    this.menuItems$ = this.menuFacade.withoutCurrentUrl();
  }
}
