import { MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalAlliesComponent } from 'projects/lib-shared-components/src/lib/components/allies-store/allies-store.component';
import { FlowV1Service } from 'projects/lib-shared-components/src/lib/services/viability-v1/flow-v1.service';
import { CreditFee } from 'projects/lib-shared-components/src/lib/store/calculator/calculator.state';
import {
  DomainsFacade,
  PartnerFacade,
  CalculatorFacade,
  Parameter,
  ViabilityFacade,
  InputheaderComponent,
} from 'projects/lib-shared-components/src/public-api';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/shared/auth.service';
import { Constants } from 'src/app/utils/constants';
import { ModalComponent } from 'src/app/common/modal/modal.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  partner = Constants.ALIADO_AUTOMUNDIAL;
  URL_BACKGROUND = 'assets/automundial/fondo.png';
  URL_LOGO_PARTNER = 'assets/automundial/logoautomundial.png';
  URL_LOGO_SANTANDER = 'assets/cemex/img/SantanderConsumer.png';
  URL_LOGO_FOOTER = 'assets/automundial/footer.png';

  amount = 0;
  step = 10000;

  fees$: Observable<CreditFee[]> = this.calculatorFacade.allFees$;
  partnerId$: Observable<number> = this.partnerFacade.partnerId$;
  currentFee$: Observable<CreditFee> = this.calculatorFacade.currentFee$;
  max$: Observable<number> = this.partnerFacade.maxAmount$;
  min$: Observable<number> = this.partnerFacade.minAmount$;

  @ViewChild('inputHeader', { static: false }) inputHeader: InputheaderComponent;
  alliedSelected: any;

  constructor(
    private partnerFacade: PartnerFacade,
    private domainsFacade: DomainsFacade,
    private calculatorFacade: CalculatorFacade,
    protected auth: AuthService,
    public flowService: FlowV1Service,
    private viabilityFacade: ViabilityFacade,
    private dialog :MatDialog
  ) {
  }

  ngOnInit() {
    this.domainsFacade.getAllDomains();
    this.partnerFacade.getInfoPartnertByName(this.partner);
  }

  changeRequestValue() {
    this.inputHeader.setValue(this.amount);
    this.calculate();
  }

  changeAmountRq(monto) {
    this.amount = monto;
    this.calculate();
  }

  calculate() {
    this.currentFee$
      .pipe(take(1))
      .subscribe((fee) => {
        const currentFee = fee;
        currentFee.amountToFinanced = this.amount;
        currentFee.feeNumber = 12;
        this.calculatorFacade.setCurrentFee(currentFee);
      })
      .unsubscribe();
  }

  startRequestFlow() {
    this.currentFee$
      .pipe(take(1))
      .subscribe((fee) => {
        if (fee.feeNumber && this.amount) {
          window.scroll(0, 0);
          this.auth.updateToken();
          this.flowService.process();
          this.flowService.StartFlow = true;
        }
      })
      .unsubscribe();
  }

  endRequestViability(): void {
    this.inputHeader.setValue(0);
    this.calculatorFacade.resetCalculator();
    this.partnerFacade.resetValueFeeWithInsurance();
  }

  logoutSesion(){
    this.auth.logout;
    const dialogRef = this.dialog.open(ModalComponent, {
          data: { tipoModal: 'closeInactive', aliado: 'Automundial' },
          disableClose: true,
          width: '35%',
        });
  }
}
