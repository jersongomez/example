import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomainsFacade, MenuFacade, PartnerFacade } from 'projects/lib-shared-components/src/public-api';
import { Observable } from 'rxjs';
import { ModalComponent } from 'src/app/common/modal/modal.component';
import { AuthService } from 'src/app/services/shared/auth.service';
import { FlowService } from 'src/app/services/viability/flow.service';
import { Constants } from '../../../utils/constants';

@Component({
  selector: 'app-specialized-home',
  templateUrl: './specialized-home.component.html',
  styleUrls: ['./specialized-home.component.scss'],
})
export class SpecializedHomeComponent implements OnInit {
  partnerId$: Observable<number> = this.partnerFacade.partnerId$;

  constructor(
    protected auth: AuthService,
    public flowService: FlowService,
    private partnerFacade: PartnerFacade,
    private domainsFacade: DomainsFacade,
    private menuFacade: MenuFacade,
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {
    window.document.title = Constants.SPECIALIZEDTITLE;
    //Store
    this.domainsFacade.getAllDomains();
    this.menuFacade.getMenuByName(Constants.ALIADO_SPECIALIZED);
    this.partnerFacade.getInfoPartnertByName(Constants.ALIADO_SPECIALIZED);
    this.logoutSesion();
  }

  openSolicitud() {
    window.scroll(0, 0);
    this.auth.updateToken();
    this.flowService.process();
    this.flowService.StartFlow = true;
  }

    logoutSesion(){
    this.auth.logout;
    const dialogRef = this.dialog.open(ModalComponent, {
          data: { tipoModal: 'closeInactive', aliado: 'specialized' },
          disableClose: true,
          width: '35%',
        });

  }
}
