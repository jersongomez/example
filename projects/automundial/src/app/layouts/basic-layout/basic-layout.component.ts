import { Component, Input, OnInit } from '@angular/core';
import { FlowV1Service } from 'projects/lib-shared-components/src/lib/services/viability-v1/flow-v1.service';
import {
  DomainsFacade,
  MenuFacade,
  PartnerFacade,
  Menu as MenuStore,
} from 'projects/lib-shared-components/src/public-api';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/shared/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HelpSalesService } from 'projects/lib-shared-components/src/lib/services/help-sales/help-sales.service';

@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.scss'],
})
export class BasicLayoutComponent implements OnInit {
  @Input('partner') partner = '';

  @Input('URL_BACKGROUND') URL_BACKGROUND = '';
  @Input('URL_LOGO_PARTNER') URL_LOGO_PARTNER = '';
  @Input('URL_LOGO_FOOTER') URL_LOGO_FOOTER = '';
  @Input('URL_LOGO_SANTANDER') URL_LOGO_SANTANDER = '';

  helpTips = this.helpSalesService.helpTipsAutomundial;

  partnerId$: Observable<number> = this.partnerFacade.partnerId$;
  menuItems$: Observable<MenuStore[]>;

  constructor(
    private partnerFacade: PartnerFacade,
    private domainsFacade: DomainsFacade,
    private menuFacade: MenuFacade,
    protected auth: AuthService,
    public flowService: FlowV1Service,
    private helpSalesService: HelpSalesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.domainsFacade.getAllDomains();
    this.menuFacade.getMenuByName(this.partner);
    this.partnerFacade.getInfoPartnertByName(this.partner);
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
        varValue = this.URL_BACKGROUND;
        break;
      case 'logoPartner':
        varName = '--logo-partner';
        varValue = this.URL_LOGO_PARTNER;
        break;
      case 'imgFooter':
        varName = '--img-footer';
        varValue = this.URL_LOGO_FOOTER;
        break;
      case 'logoSantander':
        varName = '--logo-santander';
        varValue = this.URL_LOGO_SANTANDER;
        break;
    }

    const result = `${varName}:url(${varValue})`;
    return sanitize ? this.sanitizer.bypassSecurityTrustStyle(result) : result;
  }
}
