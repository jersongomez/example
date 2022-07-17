import { TraceabilityService } from './../../services/traceability/traceability.service';
import { Component, OnInit, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConfig } from 'src/app/app-config';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'src/app/services/shared/utils.service';

@Component({
  selector: 'app-modal-component',
  templateUrl: './allies-store.html',
  styleUrls: ['./allies-store.scss'],
})
export class ModalAlliesComponent implements OnInit {
  public dataAlliets: any = [];
  public selectAlliet: any = null;
  public form: FormGroup;
  public cedula: string = '';
  patternNumber: '[0-9]+$';

  constructor(
    private traceabilityService: TraceabilityService,
    public dialogRef: MatDialogRef<ModalAlliesComponent>,
    public utils: UtilsService,
    // private trade: TraceData,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    // console.log(this.data);
    this.traceabilityService
      .getTiendasAliados(AppConfig.settings.apiServer.backend, this.data.type)
      .subscribe((response) => {
        //    this.dataAlliets = response;
        response.forEach((element) => {
          const data = this.dataAlliets.find(
            (x) => x.nombreApellido === element.nombreApellido && x.correo === element.correo
          );
          if (!data) {
            this.dataAlliets.push(element);
          }
        });
      });
  }

  confirmAllies() {
    let row: any[] = [];
    row.push(...this.dataAlliets.filter((x) => x.id === this.selectAlliet));
    row.push({ cedulaAsesor: this.cedula });
    this.dialogRef.close(row);
  }
}
