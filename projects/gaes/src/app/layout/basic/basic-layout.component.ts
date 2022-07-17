import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FlowV1Service } from 'projects/lib-shared-components/src/lib/services/viability-v1/flow-v1.service';
import { CreditFee } from 'projects/lib-shared-components/src/lib/store/calculator/calculator.state';
import {
  DomainsFacade,
  MenuFacade,
  PartnerFacade,
  Menu,
  CalculatorFacade,
  InputheaderComponent,
} from 'projects/lib-shared-components/src/public-api';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/shared/auth.service';
import { Constants } from 'src/app/utils/constants';

@Component({
  selector: 'gaes-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BasicLayoutComponent implements OnInit {
  URL_BANNER_BACKGROUND = '/assets/home/gaes-bg.png';
  URL_LOGO_PARTNER = '/assets/gaes/img/gaes.png';
  URL_LOGO_WHITE_PARTNER = '/assets/gaes/img/gaes-white.png';
  URL_LOGO_SANTANDER = '/assets/gaes/img/consumerFinance.png';
  URL_LOGO_WHITE_SANTANDER = '/assets/gaes/img/consumerFinance-white.png';

  partnerId$: Observable<number> = this.partnerFacade.partnerId$;
  menuItems$: Observable<Menu[]>;
  currentFee$: Observable<CreditFee> = this.calculatorFacade.currentFee$;

  @ViewChild('inputHeader', { static: false }) inputHeader: InputheaderComponent;

  constructor(
    private partnerFacade: PartnerFacade,
    private domainsFacade: DomainsFacade,
    private menuFacade: MenuFacade,
    private calculatorFacade: CalculatorFacade,
    protected auth: AuthService,
    public flowService: FlowV1Service,
    public router: Router
  ) {}

  ngOnInit() {
    this.domainsFacade.getAllDomains();
    this.menuFacade.getMenuByName(Constants.ALIADO_GAES);
    this.partnerFacade.getInfoPartnertByName(Constants.ALIADO_GAES);
    this.menuFacade.menuWithoutCurUrl();
    this.menuItems$ = this.menuFacade.menuWithoutCurUrl$;
  }

  endRequestViability(): void {
    this.calculatorFacade.resetCalculator();
    this.partnerFacade.resetValueFeeWithInsurance();
  }

  goto(url: string) {
    if (url === 'logout') {
      this.auth.logout();
    } else {
      this.router.navigateByUrl(url);
    }
  }
}
