import { Component, OnInit, Output, EventEmitter, Input, ViewChildren, ViewChild } from '@angular/core';
import { CuotasService } from 'src/app/services/shared/cuotas.service';
import { Constants } from 'src/app/utils/constants';
import { CalculatorService } from '../../../src/app/services/shared/calculator.service';
import { map, take } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import {
  CalculatorFacade,
  Parameter,
  PartnerFacade,
  ViabilityFacade,
} from 'projects/lib-shared-components/src/public-api';
import * as models from '../../../src/app/models';
import { MatCheckbox, MatCheckboxChange, MatDialog } from '@angular/material';
import { CreditFee } from 'projects/lib-shared-components/src/lib/store/calculator/calculator.state';
import { CalculateFeeRq } from 'projects/lib-shared-components/src/lib/models/calculator/calculate-fee.model';
import { AppConfig } from 'src/app/app-config';
import { AuthService } from 'src/app/services/shared/auth.service';
import { FlowV1Service } from 'projects/lib-shared-components/src/lib/services/viability-v1/flow-v1.service';
import { ViabilityV1Service } from 'projects/lib-shared-components/src/lib/services/viability-v1/viability-v1.service';
import { ModalAlliesComponent } from 'projects/lib-shared-components/src/lib/components/allies-store/allies-store.component';

export enum TypesCheckbox {
  EPS,
  PREPAID,
  GRACEPERIOD,
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  isGracePeriod = false;
  isPrepaid = false;
  typesCheckbox = TypesCheckbox;

  URL_LOGO_PARTNER = 'assets/colsanitas/logoSanitas.png';
  URL_LOGO_SANTANDER = 'assets/colsanitas/logoSantander.png';

  @ViewChild('epsCheckbox', { static: false }) epsCheckbox: MatCheckbox;
  @ViewChild('prepaidCheckbox', { static: false }) prepaidCheckbox: MatCheckbox;
  @ViewChild('gracePeriodCheckbox', { static: false }) gracePeriodCheckbox: MatCheckbox;

  productValue: number = 0;
  feeSelected: number;

  @Input('minamount') minAmount$: Observable<number>;
  @Input('maxamount') maxAmount$: Observable<number>;
  @Input('graceperiod') gracePeriod$: Observable<number>;
  @Input('fees') fees$: Observable<CreditFee[]>;
  @Input('creditfeedata') currentFee$: Observable<CreditFee>;

  @Output() public starSolicitud = new EventEmitter();
  // alliedSelected: any;
  // numeroCedulaAsesor: any;
  // Sede: any;

  constructor(
    private calculatorFacade: CalculatorFacade,
    private viabilityFacade: ViabilityFacade,
    protected auth: AuthService,
    public flowService: FlowV1Service,
    // private dialog: MatDialog,
    // private viabilityService: ViabilityV1Service
  ) { }

  ngOnInit() { }

  public changeRequestValue() {
    this.calculatorFacade.resetCalculator();
    this.viabilityFacade.resetFlowMiddlewareData();

    combineLatest(this.minAmount$, this.maxAmount$)
      .pipe(take(1))
      .subscribe(([minAmount, maxAmount]) => {
        if (!!this.productValue && this.productValue >= minAmount && this.productValue <= maxAmount) {
          this.validateGracePeriodAndcallGetAllFees(
            +this.productValue,
            this.prepaidCheckbox.checked,
            !!this.gracePeriodCheckbox && this.gracePeriodCheckbox.checked
          );
        }
      })
      .unsubscribe();
  }

  buildCalculateFeeRq(amount: number, epsPrepagada: boolean, gracePeriod: boolean, lack: number): CalculateFeeRq {
    return {
      aliado: Constants.ALIADO_COLSANITAS,
      valorSolicitado: +amount,
      valorProducto: +amount,
      epsPrepagada,
      gracePeriod,
      lack,
    };
  }

  callGetAllFees(rq: CalculateFeeRq): void {
    this.viabilityFacade.setDataToCalculator(rq);
    this.calculatorFacade.getAllFees(AppConfig.settings.apiServer.backend, rq);
  }

  validateGracePeriodAndcallGetAllFees(amount: number, epsPrepagada: boolean, gracePeriod: boolean): void {
    let validateEpsprepagada = epsPrepagada === true ? false : true;
    epsPrepagada = validateEpsprepagada;
    if (gracePeriod) {
      this.gracePeriod$
        .pipe(take(1))
        .subscribe((lack) => {
          const rq = this.buildCalculateFeeRq(+amount, epsPrepagada, gracePeriod, lack);
          this.callGetAllFees(rq);
        })
        .unsubscribe();
    } else {
      const rq = this.buildCalculateFeeRq(+amount, epsPrepagada, gracePeriod, 0);
      this.callGetAllFees(rq);
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

  openSolicitud() {
    this.currentFee$
      .pipe(take(1))
      .subscribe((fee) => {
        if (fee.feeNumber > 0) {
          this.starSolicitud.emit();
          window.scroll(0, 0);
          this.auth.updateToken();
          this.flowService.process();
          this.flowService.StartFlow = true;
        }
      })
      .unsubscribe();
  }

  selectFee(feeNumber: number) {
    this.calculatorFacade.allFees$
      .pipe(
        take(1),
        map((fees) => fees.find((fee) => fee.feeNumber === feeNumber))
      )
      .subscribe((fee) => this.calculatorFacade.setCurrentFee(fee))
      .unsubscribe();
  }

  toggleEditable(ev: MatCheckboxChange, type: TypesCheckbox) {
    if (type === this.typesCheckbox.EPS && ev.checked) {
      this.prepaidCheckbox.checked = false;
      this.prepaidCheckbox.disabled = false;
      this.gracePeriodCheckbox.checked = false;
      this.isGracePeriod = false;
      this.isPrepaid = false;
      ev.source.disabled = true;
    } else if (type === this.typesCheckbox.PREPAID && ev.checked) {
      this.epsCheckbox.checked = false;
      this.epsCheckbox.disabled = false;
      this.isPrepaid = true;
      this.isGracePeriod = false;
      ev.source.disabled = true;
    } else if (type === this.typesCheckbox.GRACEPERIOD) {
      this.isGracePeriod = ev.checked;
    }
    this.changeRequestValue();
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
  //       this.openSolicitud();
  //     }
  //   });
  // }


}
