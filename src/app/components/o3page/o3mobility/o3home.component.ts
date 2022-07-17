import { Component, OnInit, ViewChild } from '@angular/core';
import { CalculatorService } from 'src/app/services/shared/calculator.service';
import { Constants } from 'src/app/utils/constants';
import { ViabilityService } from 'src/app/services/viability/viability.service';
import { AuthService } from 'src/app/services/shared/auth.service';
import { Title } from '@angular/platform-browser';
import * as models from 'src/app/models/index';
import { CalculatorComponent } from '../calculator/calculator.component';
import { AliadoService } from 'src/app/services/shared/aliado.service';
import { DomainsFacade, Menu, MenuFacade, PartnerFacade } from 'projects/lib-shared-components/src/public-api';
import { Observable, of } from 'rxjs';
import { FlowService } from 'src/app/services/viability/flow.service';
import { MatDialog } from '@angular/material/dialog';
import { ViabilityV1Service } from 'projects/lib-shared-components/src/lib/services/viability-v1/viability-v1.service';
import { ModalAlliesComponent } from 'projects/lib-shared-components/src/lib/components/allies-store/allies-store.component';

@Component({
  selector: 'app-o3home',
  templateUrl: './o3home.component.html',
  styleUrls: ['./o3home.component.scss'],
})
export class O3HomeComponent implements OnInit {
  URL_LOGO_PARTNER = 'assets/img/logoO3.png';
  URL_LOGO_SANTANDER = 'assets/paraiso/img/consumerFinance.png';

  public btnRequest = false;
  public showErrorRequest = false;
  public ciudades: models.Parameters = new models.Parameters();

  @ViewChild(CalculatorComponent, { static: false }) calculator: CalculatorComponent;

  partnerId$: Observable<number> = this.partnerFacade.partnerId$;
  menuItems$: Observable<Menu[]>;
  // alliedSelected: any;
  // numeroCedulaAsesor: any;
  // Sede: any;

  constructor(
    public calculatorService: CalculatorService,
    public viabilityService: ViabilityService,
    public aliadoService: AliadoService,
    protected auth: AuthService,
    protected title: Title,
    private partnerFacade: PartnerFacade,
    private domainsFacade: DomainsFacade,
    private menuFacade: MenuFacade,
    public flowService: FlowService // private dialog: MatDialog, // private viabilityServicev1: ViabilityV1Service
  ) {
    this.title.setTitle(Constants.O3TITLE);
  }

  ngOnInit(): void {
    this.domainsFacade.getAllDomains();
    this.menuFacade.getMenuByName(Constants.ALIADO_O3);
    this.menuItems$ = this.menuFacade.withoutCurrentUrl();

    this.partnerFacade.getInfoPartnertByName(Constants.ALIADO_O3);
  }

  onPrint() {
    window.print();
  }

  openSolicitud() {
    window.scroll(0, 0);
    this.auth.updateToken();
    this.flowService.process();
    this.flowService.StartFlow = true;
  }

  public calcularCuota($event: any) {
    this.calculatorService.Request.valorSolicitado = $event.monto;
    this.calculatorService.Request.aliado = Constants.ALIADO_O3;
    this.calculatorService.Request.porcentajeCuotaInicial = $event.porcentajeInitial / 100;
    this.calculatorService.Request.subsidized = true;
    this.calculatorService.ShowData = false;
    this.calculatorService.setLoadData = true;
    this.calculatorService.setPristine = true;
    this.calculator.unClick();
    this.calculatorService.calculoCuotas().subscribe((data) => {
      this.calculatorService.DataCuotas = data;
      this.calculatorService.setLoadData = false;
      this.calculatorService.ShowData = true;
      this.calculatorService.ErrorMinToFinance = data[0].montoTotalFinanciamiento < this.calculatorService.MinToFinance;
    });
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
  //       this.viabilityServicev1.cedulaAsesor = this.numeroCedulaAsesor;
  //       this.viabilityServicev1.Sede = this.Sede;
  //       this.openSolicitud();
  //     }
  //   });
  // }
}
