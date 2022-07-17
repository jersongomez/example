import { Component, OnInit, ViewChild } from '@angular/core';
import { CalculateFeeRq } from 'projects/lib-shared-components/src/lib/models/calculator/calculate-fee.model';
import { FlowV1Service } from 'projects/lib-shared-components/src/lib/services/viability-v1/flow-v1.service';
import { CreditFee } from 'projects/lib-shared-components/src/lib/store/calculator/calculator.state';
import {
  DomainsFacade,
  MenuFacade,
  PartnerFacade,
  Menu,
  CalculatorFacade,
  Parameter,
  ViabilityFacade,
  InputheaderComponent,
} from 'projects/lib-shared-components/src/public-api';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppConfig } from 'src/app/app-config';
import { AuthService } from 'src/app/services/shared/auth.service';
import { Constants } from 'src/app/utils/constants';
import { MatDialog } from '@angular/material';
import { ModalComponent } from 'src/app/common/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  URL_BACKGROUND = 'assets/home/paraiso-bg.jpg';
  URL_LOGO_PARTNER = 'assets/paraiso/img/paraiso.png';
  URL_LOGO_SANTANDER = 'assets/paraiso/img/consumerFinance.png';
  partnerId$: Observable<number> = this.partnerFacade.partnerId$;
  menuItems$: Observable<Menu[]>;
  currentFee$: Observable<CreditFee> = this.calculatorFacade.currentFee$;
  fees$: Observable<CreditFee[]> = this.calculatorFacade.allFees$;
  installmentsParam$: Observable<Parameter[]> = this.partnerFacade.installmentsParam$;
  minAmount$: Observable<number> = this.partnerFacade.minAmount$;
  maxAmount$: Observable<number> = this.partnerFacade.maxAmount$;
  loadingFees$: Observable<boolean> = this.calculatorFacade.loadingFees$;


  @ViewChild('inputHeader', { static: false }) inputHeader: InputheaderComponent;

  constructor(
    private partnerFacade: PartnerFacade,
    private domainsFacade: DomainsFacade,
    private menuFacade: MenuFacade,
    private calculatorFacade: CalculatorFacade,
    protected auth: AuthService,
    public flowService: FlowV1Service,
    private viabilityFacade: ViabilityFacade,
    private dialog: MatDialog
  ) {
    this.logoutSesion();
  }

  ngOnInit() {
    this.domainsFacade.getAllDomains();
    this.menuFacade.getMenuByName(Constants.ALIADO_PARAISO);
    this.partnerFacade.getInfoPartnertByName(Constants.ALIADO_PARAISO);
    this.menuFacade.menuWithoutCurUrl();
    this.menuItems$ = this.menuFacade.menuWithoutCurUrl$;
  }

  selectFee(feeNumber: number) {
    this.fees$
      .pipe(
        take(1),
        map((fees) => fees.find((fee) => fee.feeNumber === feeNumber))
      )
      .subscribe((fee) => this.calculatorFacade.setCurrentFee(fee))
      .unsubscribe();
  }

  buildCalculateFeeRq(
    amount: number,
    zeroRate: boolean,
    gracePeriod: boolean,
    lack: number,
    subsidized: boolean
  ): CalculateFeeRq {
    return {
      aliado: Constants.ALIADO_PARAISO,
      valorSolicitado: +amount,
      valorProducto: +amount,
      zeroRate,
      gracePeriod,
      lack,
      subsidized,
    };
  }

  callGetAllFees(rq: CalculateFeeRq): void {
    this.viabilityFacade.setDataToCalculator(rq);
    this.calculatorFacade.getAllFees(AppConfig.settings.apiServer.backend, rq);
  }

  validateGracePeriodAndcallGetAllFees(
    amount: number,
    zeroRate: boolean,
    gracePeriod: boolean,
    subsidized: boolean
  ): void {
    if (gracePeriod) {
      this.partnerFacade.gracePeriod$
        .pipe(take(1))
        .subscribe((lack) => {
          const rq = this.buildCalculateFeeRq(+amount, zeroRate, gracePeriod, lack, subsidized);
          this.callGetAllFees(rq);
        })
        .unsubscribe();
    } else {
      const rq = this.buildCalculateFeeRq(+amount, zeroRate, gracePeriod, 0, subsidized);
      this.callGetAllFees(rq);
    }
  }

  changeAmountRq(amount: number) {
    this.calculatorFacade.resetCalculator();
    this.partnerFacade.resetValueFeeWithInsurance();
    this.viabilityFacade.resetFlowMiddlewareData();

    if (!!amount) {
      this.validateGracePeriodAndcallGetAllFees(+amount, false, false, true);
    }
  }

  onPrint() {
    this.currentFee$
      .pipe(take(1))
      .subscribe((fee) => {
        if (fee.feeNumber) {
          window.print();
        }
      })
      .unsubscribe();
  }

  startRequestFlow() {
    this.currentFee$
      .pipe(take(1))
      .subscribe((fee) => {
        if (fee.feeNumber) {
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
          data: { tipoModal: 'closeInactive', aliado: 'paraiso' },
          disableClose: true,
          width: '35%',
        });

  }
}
