import { Component, OnInit } from '@angular/core';
import { CreditFee } from 'projects/lib-shared-components/src/lib/store/calculator/calculator.state';
import {
  CalculatorFacade,
  DomainsFacade,
  MenuFacade,
  Parameter,
  PartnerFacade,
} from 'projects/lib-shared-components/src/public-api';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/shared/auth.service';
import { FlowV1Service } from 'projects/lib-shared-components/src/lib/services/viability-v1/flow-v1.service';
import { Constants } from '../../../src/app/utils/constants';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-specialized-home',
  templateUrl: './colsanitas-home.component.html',
  styleUrls: ['./colsanitas-home.component.scss'],
})
export class ColsanitasHomeComponent implements OnInit {
  URL_LOGO_PARTNER = 'assets/colsanitas/logoSanitas.png';
  URL_LOGO_SANTANDER = 'assets/colsanitas/logoSantander.png';

  partnerId$: Observable<number> = this.partnerFacade.partnerId$;

  minAmount$: Observable<number> = this.partnerFacade.minAmount$;
  maxAmount$: Observable<number> = this.partnerFacade.maxAmount$;
  gracePeriod$: Observable<number> = this.partnerFacade.gracePeriod$;

  fees$: Observable<CreditFee[]> = this.calculatorFacade.allFees$;

  installmentsParam$: Observable<Parameter[]> = this.partnerFacade.installmentsParam$;

  currentFee$: Observable<CreditFee> = this.calculatorFacade.currentFee$;

  constructor(
    protected auth: AuthService,
    public flowService: FlowV1Service,
    private partnerFacade: PartnerFacade,
    private domainsFacade: DomainsFacade,
    private menuFacade: MenuFacade,
    private calculatorFacade: CalculatorFacade
  ) { }

  ngOnInit() {
    window.document.title = Constants.COLSANITASTITLE;
    //Store
    this.domainsFacade.getAllDomains();
    this.menuFacade.getMenuByName(Constants.ALIADO_COLSANITAS);
    this.partnerFacade.getInfoPartnertByName(Constants.ALIADO_COLSANITAS);
  }

  onPrint() {
    this.currentFee$.pipe(take(1)).subscribe((fee) => {
      if (fee.feeNumber) {
        window.print();
      }
    });
  }

  openSolicitud() {
    window.scroll(0, 0);

  }

  endRequestViability(): void {
    this.calculatorFacade.resetCalculator();
    this.partnerFacade.resetValueFeeWithInsurance();
  }
}
