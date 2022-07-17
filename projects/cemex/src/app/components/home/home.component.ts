import { ViabilityService } from './../../../../../../src/app/services/viability/viability.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckbox, MatCheckboxChange, MatDialog } from '@angular/material';
import { ModalAlliesComponent } from 'projects/lib-shared-components/src/lib/components/allies-store/allies-store.component';
import { CalculateFeeRq } from 'projects/lib-shared-components/src/lib/models/calculator/calculate-fee.model';
import { RequestViability } from 'projects/lib-shared-components/src/lib/models/old-app/request-viability';
import { FlowV1Service } from 'projects/lib-shared-components/src/lib/services/viability-v1/flow-v1.service';
import { ValidationV1Service } from 'projects/lib-shared-components/src/lib/services/viability-v1/validation-v1.service';
import { ViabilityV1Service } from 'projects/lib-shared-components/src/lib/services/viability-v1/viability-v1.service';
import { CreditFee } from 'projects/lib-shared-components/src/lib/store/calculator/calculator.state';
import { ViabilityCreditInfo } from 'projects/lib-shared-components/src/lib/store/viability/viability.state';
import {
  DomainsFacade,
  MenuFacade,
  PartnerFacade,
  Menu as MenuStore,
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  URL_BACKGROUND = 'assets/home/cemex.png';
  URL_LOGO_PARTNER = 'assets/cemex/img/LogoCemex.png';
  URL_LOGO_SANTANDER = 'assets/cemex/img/SantanderConsumer.png';

  partnerId$: Observable<number> = this.partnerFacade.partnerId$;
  menuItems$: Observable<MenuStore[]>;
  currentFee$: Observable<CreditFee> = this.calculatorFacade.currentFee$;
  fees$: Observable<CreditFee[]> = this.calculatorFacade.allFees$;
  installmentsParam$: Observable<Parameter[]> = this.partnerFacade.installmentsParam$;
  minAmount$: Observable<number> = this.partnerFacade.minAmount$;
  maxAmount$: Observable<number> = this.partnerFacade.maxAmount$;
  loadingFees$: Observable<boolean> = this.calculatorFacade.loadingFees$;
  creditInfo$: Observable<ViabilityCreditInfo> = this.viabilityFacade.creditInfo$;

  @ViewChild('inputHeader', { static: false }) inputHeader: InputheaderComponent;
  @ViewChild('traditional', { static: false }) traditional: MatCheckbox;
  @ViewChild('zeroRate', { static: false }) zeroRate: MatCheckbox;
  // alliedSelected: any;
  // numeroCedulaAsesor: any;
  // Sede: any;

  constructor(
    private partnerFacade: PartnerFacade,
    private domainsFacade: DomainsFacade,
    private menuFacade: MenuFacade,
    private calculatorFacade: CalculatorFacade,
    protected auth: AuthService,
    public flowService: FlowV1Service,
    private viabilityFacade: ViabilityFacade // private dialog: MatDialog, // private viabilityService: ViabilityV1Service
  ) {}

  ngOnInit() {
    this.domainsFacade.getAllDomains();
    this.menuFacade.getMenuByName(Constants.ALIADO_CEMEX);
    this.partnerFacade.getInfoPartnertByName(Constants.ALIADO_CEMEX);
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

  buildCalculateFeeRq(amount: number, zeroRate: boolean, gracePeriod: boolean, lack: number): CalculateFeeRq {
    return {
      aliado: Constants.ALIADO_CEMEX,
      valorSolicitado: +amount,
      valorProducto: +amount,
      zeroRate,
      gracePeriod,
      lack,
    };
  }

  callGetAllFees(rq: CalculateFeeRq): void {
    this.viabilityFacade.setDataToCalculator(rq);
    this.calculatorFacade.getAllFees(AppConfig.settings.apiServer.backend, rq);
  }

  validateGracePeriodAndcallGetAllFees(amount: number, zeroRate: boolean, gracePeriod: boolean): void {
    if (gracePeriod) {
      this.partnerFacade.gracePeriod$
        .pipe(take(1))
        .subscribe((lack) => {
          const rq = this.buildCalculateFeeRq(+amount, zeroRate, gracePeriod, lack);
          this.callGetAllFees(rq);
        })
        .unsubscribe();
    } else {
      const rq = this.buildCalculateFeeRq(+amount, zeroRate, gracePeriod, 0);
      this.callGetAllFees(rq);
    }
  }

  changeAmountRq(amount: number) {
    this.calculatorFacade.resetCalculator();
    this.partnerFacade.resetValueFeeWithInsurance();
    this.viabilityFacade.resetFlowMiddlewareData();

    if (!!amount) {
      this.validateGracePeriodAndcallGetAllFees(+amount, this.zeroRate.checked, false);
    }
  }

  changeBoolean() {
    this.creditInfo$
      .pipe(take(1))
      .subscribe((creditInfo) => {
        if (!!creditInfo.requestAmount) {
          this.calculatorFacade.resetCalculator();
          this.partnerFacade.resetValueFeeWithInsurance();
          this.viabilityFacade.resetFlowMiddlewareData();

          this.validateGracePeriodAndcallGetAllFees(+creditInfo.requestAmount, this.zeroRate.checked, false);
        }
      })
      .unsubscribe();
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

  // startAlliets() {
  //   const dialogRef = this.dialog.open(ModalAlliesComponent, {
  //     data: { type: 'paraiso' },
  //     disableClose: true,
  //     width: '30%'
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       console.log(result)
  //       this.alliedSelected = result[0];
  //       const valueString = JSON.stringify(this.alliedSelected);
  //       sessionStorage.setItem('alliates', valueString);
  //       this.Sede = result[0].sede;
  //       this.numeroCedulaAsesor = result[1].cedulaAsesor;
  //       this.viabilityService.cedulaAsesor = this.numeroCedulaAsesor;
  //       this.viabilityService.Sede = this.Sede;
  //       this.startRequestFlow();
  //     }
  //   });
  // }
}
