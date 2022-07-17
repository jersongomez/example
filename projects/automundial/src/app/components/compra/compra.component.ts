import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FlowV1Service } from 'projects/lib-shared-components/src/lib/services/viability-v1/flow-v1.service';
import { CreditFee } from 'projects/lib-shared-components/src/lib/store/calculator/calculator.state';
import {
  DomainsFacade,
  PartnerFacade,
  CalculatorFacade,
  InputheaderComponent,
} from 'projects/lib-shared-components/src/public-api';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/shared/auth.service';
import { Constants } from 'src/app/utils/constants';
import { CompraDialogComponent } from '../compra-dialog/compra-dialog.component';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss'],
})
export class CompraComponent implements OnInit {
  partner = Constants.ALIADO_AUTOMUNDIAL;
  URL_BACKGROUND = 'assets/automundial/fondo.png';
  URL_LOGO_PARTNER = 'assets/automundial/logoautomundial.png';
  URL_LOGO_SANTANDER = 'assets/cemex/img/SantanderConsumer.png';
  URL_LOGO_FOOTER = 'assets/automundial/footer.png';

  fees$: Observable<CreditFee[]> = this.calculatorFacade.allFees$;
  partnerId$: Observable<number> = this.partnerFacade.partnerId$;
  currentFee$: Observable<CreditFee> = this.calculatorFacade.currentFee$;

  @ViewChild('calculatorCard', { static: false }) calculatorCard: InputheaderComponent;

  constructor(
    private partnerFacade: PartnerFacade,
    private domainsFacade: DomainsFacade,
    private calculatorFacade: CalculatorFacade,
    protected auth: AuthService,
    public flowService: FlowV1Service,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.domainsFacade.getAllDomains();
    this.partnerFacade.getInfoPartnertByName(this.partner);
  }

  onPrint() {
    this.currentFee$
      .pipe(take(1))
      .subscribe((fee) => {
        if (fee.valueFeeWithInsurance) {
          window.print();
        }
      })
      .unsubscribe();
  }

  openDialog() {
    this.dialog.open(CompraDialogComponent, {
      width: '500px',
    });
  }

  startRequestFlow() {
    this.currentFee$
      .pipe(take(1))
      .subscribe((fee) => {
        if (fee.valueFeeWithInsurance) {
          window.scroll(0, 0);
          this.auth.updateToken();
          this.flowService.process();
          this.flowService.StartFlow = true;
        }
      })
      .unsubscribe();
  }

  endRequestViability(): void {
    this.calculatorCard.setValue(0);
    this.calculatorFacade.resetCalculator();
    this.partnerFacade.resetValueFeeWithInsurance();
  }
}
