import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CuotasService } from 'src/app/services/shared/cuotas.service';
import { Constants } from 'src/app/utils/constants';
import { CalculatorService } from '../../../services/shared/calculator.service';
import { take } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { PartnerFacade } from 'projects/lib-shared-components/src/public-api';
import * as models from '../../../models';
import { MatDialog } from '@angular/material/dialog';
import { ViabilityV1Service } from 'projects/lib-shared-components/src/lib/services/viability-v1/viability-v1.service';
import { ModalAlliesComponent } from 'projects/lib-shared-components/src/lib/components/allies-store/allies-store.component';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  public step = 10000;
  public checkedBtnRq = false;
  isSubsidized = false;
  public uncheckedBtnSz = true;

  minAmount$: Observable<number> = this.partnerFacade.minAmount$;
  maxAmount$: Observable<number> = this.partnerFacade.maxAmount$;
  maxProduct$: Observable<number> = this.partnerFacade.maxProduct$;
  gracePeriod$: Observable<number> = this.partnerFacade.gracePeriod$;
  // alliedSelected: any;
  // numeroCedulaAsesor: any;
  // Sede: any;

  @Output() public starSolicitud = new EventEmitter();
  constructor(
    public cuotaService: CuotasService,
    public calculatorService: CalculatorService,
    private partnerFacade: PartnerFacade //  private dialog: MatDialog, //  private viabilityService: ViabilityV1Service
  ) {}

  ngOnInit() {
    this.loadParameters();
  }

  public loadParameters() {
    this.partnerFacade.minAmount$
      .pipe(take(1))
      .subscribe((minAmount) => {
        this.calculatorService.Request.valorSolicitado = minAmount;
        this.calculatorService.Request.valorProducto = minAmount;
        this.calculatorService.MinToFinance = minAmount;
      })
      .unsubscribe();
  }

  public feeCalculator() {
    this.calculatorService.Request.aliado = Constants.ALIADO_SPECIALIZED;
    this.calculatorService.calculateFee().subscribe((data) => {
      this.calculatorService.Cuota = data;
    });
  }

  public changeRequestValue(type: string = null) {
    const feeSix = this.cuotaService.Cuotas.find((fee) => fee.idCuota === 6);
    feeSix.isDisable = false;
    this.isSubsidized = false;

    if (type === 'subsidized' && this.calculatorService.Request.subsidized) {
      feeSix.isDisable = true;
      this.isSubsidized = true;
      this.calculatorService.Cuota = new models.ResponseCalculator();
      this.calculatorService.Request.gracePeriod = false;

      if (this.calculatorService.Request.cantidadCuotas === 6) {
        this.calculatorService.Request.cantidadCuotas = 0;
      }
    } else if (type === 'subsidized' && !this.calculatorService.Request.subsidized) {
      this.calculatorService.Request.gracePeriod = true;
    } else if (this.calculatorService.Request.subsidized) {
      feeSix.isDisable = true;
      this.isSubsidized = true;
    }

    this.calculatorService.actions(true);

    combineLatest(this.minAmount$, this.maxAmount$, this.maxProduct$)
      .pipe(take(1))
      .subscribe(([minAmount, maxAmount, maxProduct]) => {
        if (
          this.calculatorService.Request.valorProducto >= minAmount &&
          this.calculatorService.Request.valorProducto <= maxProduct &&
          this.calculatorService.Request.valorSolicitado >= minAmount &&
          this.calculatorService.Request.valorSolicitado <= maxAmount &&
          this.calculatorService.Request.cantidadCuotas > 0
        ) {
          this.feeCalculator();
        }
      })
      .unsubscribe();
  }

  public onPrint() {
    window.print();
  }

  openSolicitud() {
    if (this.calculatorService.getAccions) {
      this.starSolicitud.emit();
    } else {
      this.checkedBtnRq = true;
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
  //       this.openSolicitud();
  //     }
  //   });
  // }
}
