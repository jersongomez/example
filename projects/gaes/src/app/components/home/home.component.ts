import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDatepickerModule, MatDialog } from '@angular/material';
import { CalculateFeeRq } from 'projects/lib-shared-components/src/lib/models/calculator/calculate-fee.model';
import { FlowV1Service } from 'projects/lib-shared-components/src/lib/services/viability-v1/flow-v1.service';
import { CreditFee } from 'projects/lib-shared-components/src/lib/store/calculator/calculator.state';
import {
  PartnerFacade,
  CalculatorFacade,
  Parameter,
  ViabilityFacade,
  InputheaderComponent,
  MenuFacade,
  Menu,
  DomainsFacade,
} from 'projects/lib-shared-components/src/public-api';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppConfig } from 'src/app/app-config';
import { AuthService } from 'src/app/services/shared/auth.service';
import { Constants } from 'src/app/utils/constants';
import { DialogComponent } from '../dialog/dialog.component';
import { ModalAlliesComponent } from 'projects/lib-shared-components/src/lib/components/allies-store/allies-store.component';
import { ViabilityV1Service } from 'projects/lib-shared-components/src/lib/services/viability-v1/viability-v1.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  URL_LOGO_PARTNER = '/assets/gaes/img/gaes.png';
  URL_LOGO_SANTANDER = '/assets/gaes/img/consumerFinance.png';

  zeroRate = false;
  gracePeriod = false;
  amount = null;
  feeNumberSelected = null;
  initialPercent = 0;

  minInitialPercent = 0;
  maxInitialPercent = 50;
  // numeroCedulaAsesor: any;
  // Sede: any;

  partnerId$: Observable<number> = this.partnerFacade.partnerId$;
  currentFee$: Observable<CreditFee> = this.calculatorFacade.currentFee$;
  fees$: Observable<CreditFee[]> = this.calculatorFacade.allFees$;
  installmentsParam$: Observable<Parameter[]> = this.partnerFacade.installmentsParam$;
  installmentsWithoutInsuranceParam$: Observable<Parameter[]> = this.partnerFacade.installmentsWithoutInsuranceParam$;
  minAmount$: Observable<number> = this.partnerFacade.minAmount$;
  gracePeriod$: Observable<number> = this.partnerFacade.gracePeriod$;
  maxAmount$: Observable<number> = this.partnerFacade.maxAmount$;
  loadingFees$: Observable<boolean> = this.calculatorFacade.loadingFees$;
  birthDate: null | Date = null;

  menuItems$: Observable<Menu[]>;
  //alliedSelected: any;

  @ViewChild('inputHeader', { static: false }) inputHeader: InputheaderComponent;

  constructor(
    private partnerFacade: PartnerFacade,
    private calculatorFacade: CalculatorFacade,
    protected auth: AuthService,
    public flowService: FlowV1Service,
    private viabilityFacade: ViabilityFacade,
    public matDialog: MatDialog,
    public matDatepicker: MatDatepickerModule,
    public router: Router,
    private menuFacade: MenuFacade,
    private domainsFacade: DomainsFacade // private dialog: MatDialog, // private viabilityService: ViabilityV1Service
  ) {}

  ngOnInit() {
    this.domainsFacade.getAllDomains();
    this.menuFacade.getMenuByName(Constants.ALIADO_GAES);
    this.partnerFacade.getInfoPartnertByName(Constants.ALIADO_GAES);
    this.menuFacade.menuWithoutCurUrl();
    this.menuItems$ = this.menuFacade.menuWithoutCurUrl$;

    const partnerIdSubcription: Subscription = this.partnerFacade.partnerId$.subscribe((parterId) => {
      if (parterId) {
        this.matDialog
          .open(DialogComponent, { disableClose: true })
          .afterClosed()
          .subscribe((result) => {
            this.birthDate = result;
          });
        partnerIdSubcription.unsubscribe();
      }
    });
  }

  outPercent(initialPercent) {
    if (initialPercent) {
      this.initialPercent = initialPercent;
      this.changeAmountRq(this.amount);
    }
  }

  selectFee(feeNumber: number) {
    this.feeNumberSelected = feeNumber;

    this.fees$
      .pipe(
        take(1),
        map((fees) => fees.find((fee) => fee.feeNumber === feeNumber))
      )
      .subscribe((fee) => this.calculatorFacade.setCurrentFee(fee))
      .unsubscribe();
  }

  resetFacades() {
    this.calculatorFacade.resetCalculator();
    this.partnerFacade.resetValueFeeWithInsurance();
    this.viabilityFacade.resetFlowMiddlewareData();
    this.partnerFacade.resetValueFeeShow();

    if (this.zeroRate) {
      this.installmentsWithoutInsuranceParam$
        .pipe(take(1))
        .subscribe((paramenters) => {
          this.partnerFacade.setValueFeeShow(paramenters.map((parameter) => parameter.numbericalValue));
        })
        .unsubscribe();
    }
  }

  changeAmountRq(amount: number) {
    this.amount = amount;

    this.resetFacades();

    if (!!amount) {
      this.partnerFacade.gracePeriod$
        .pipe(take(1))
        .subscribe((lack) => {
          const rq: CalculateFeeRq = {
            aliado: Constants.ALIADO_GAES,
            valorSolicitado: +amount,
            valorProducto: +amount,
            zeroRate: this.zeroRate,
            gracePeriod: !this.zeroRate && this.gracePeriod,
            lack: (!this.zeroRate && this.gracePeriod && lack) || 0,
            porcentajeCuotaInicial: this.initialPercent,
          };
          this.viabilityFacade.setDataToCalculator(rq);
          this.calculatorFacade.getAllFees(AppConfig.settings.apiServer.backend, rq);
        })
        .unsubscribe();
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

  setSlide(attribute, event) {
    this[attribute] = event.checked;

    if (this.amount) {
      this.changeAmountRq(this.amount);
    } else {
      this.resetFacades();
    }
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
