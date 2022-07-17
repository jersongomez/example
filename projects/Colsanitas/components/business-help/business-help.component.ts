import { Component, OnInit } from '@angular/core';
import { HelpSalesService } from 'projects/lib-shared-components/src/lib/services/help-sales/help-sales.service';
import { FlowV1Service } from 'projects/lib-shared-components/src/lib/services/viability-v1/flow-v1.service';
import { MenuFacade, Menu } from 'projects/lib-shared-components/src/public-api';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/shared/auth.service';
import { Constants } from 'src/app/utils/constants';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-business-help',
  templateUrl: './business-help.component.html',
  styleUrls: ['./business-help.component.scss'],
})
export class BusinessHelpComponent implements OnInit {
  bannerBackground = 'assets/colsanitas/fondoAzul.png';
  logoPartner = 'assets/colsanitas/logoSanitas.png';

  menuItems$: Observable<Menu[]>;
  helpItemsColsanitas = this.helpSalesService.helpItemsColsanitas;
  helpTipsColsanitas = this.helpSalesService.helpTipsColsanitas;

  constructor(
    private menuFacade: MenuFacade,
    protected auth: AuthService,
    public flowService: FlowV1Service,
    private helpSalesService: HelpSalesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.menuFacade.getMenuByName(Constants.ALIADO_COLSANITAS);
    this.menuFacade.menuWithoutCurUrl();
    this.menuItems$ = this.menuFacade.menuWithoutCurUrl$;
  }

  public getImg(typeImg: string | string[], sanitize: boolean = true) {
    if (Array.isArray(typeImg)) {
      const variables = [];
      typeImg.forEach((element) => {
        variables.push(this.getImg(element, false));
      });
      return this.sanitizer.bypassSecurityTrustStyle(variables.join(';'));
    }

    let varName = '';
    let varValue = '';

    switch (typeImg) {
      case 'bannerBackground':
        varName = '--banner-background';
        varValue = this.bannerBackground;
        break;
      case 'logoPartner':
        varName = '--logo-partner';
        varValue = this.logoPartner;
        break;
    }

    const result = `${varName}:url(${varValue})`;
    return sanitize ? this.sanitizer.bypassSecurityTrustStyle(result) : result;
  }
}
