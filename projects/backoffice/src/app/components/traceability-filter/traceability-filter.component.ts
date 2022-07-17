import { Component, OnInit, Output, EventEmitter, Injectable, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { TraceabilityService } from 'projects/lib-shared-components/src/lib/services/traceability/traceability.service';
import { UtilsService } from 'src/app/services/shared/utils.service';
import { AppConfig } from 'src/app/app-config';

@Component({
  selector: 'app-traceability-filter',
  templateUrl: './traceability-filter.component.html',
  styleUrls: ['./traceability-filter.component.scss'],
})
export class TraceabilityFilterComponent implements OnInit {
  @Output() public filter = new EventEmitter<any>();
  @Output() public createAlliet = new EventEmitter<any>();
  @Input() menuselect: string;
  id: any;

  public form: FormGroup;
  maxDateTo: any;
  maxDateFrom: any;
  minDateTo: any;
  menu: string = 'trazabilidad';
  NumeroCedula: any;
  aliadosActivos: any;

  constructor(
    public utils: UtilsService,
    private traceabilityService: TraceabilityService) {
    this.menuselect;
    this.getAliadosActivos();
  }

  ngOnInit() {
    this.maxDateFrom = moment().format();
    this.maxDateTo = moment().format();
    this.initializerForm();
  }

  private initializerForm() {
    if (this.menuselect === 'Trazabilidad') {
      this.form = new FormGroup({
        from: new FormControl(Validators.required),
        to: new FormControl(Validators.required)
      });
    } else if (this.menuselect === 'Identidad') {
      this.form = new FormGroup({
        from: new FormControl(Validators.required),
        to: new FormControl(Validators.required),
        document: new FormControl('',Validators.required),
      });
    } else if (this.menuselect === 'Agregar Aliados') {
      this.form = new FormGroup({
        aliadosNombre: new FormControl('',Validators.required),
        aliadoAddi: new FormControl('',Validators.required),
        estadoAliado: new FormControl('',Validators.required),
      });
    } else if (this.menuselect === 'Parametria Aliados') {
      this.form = new FormGroup({
        idAliadoSelect: new FormControl('',Validators.required),
        nombreParametro: new FormControl('',Validators.required),
        tipoParametro: new FormControl('',Validators.required)
      });
    }
    else {
      this.form = new FormGroup({
        cedulaId: new FormControl('', Validators.required)
      });
    }
  }

  public isValidFilter(): boolean {
    return this.form.valid;
  }

  public getLogData() {
    this.filter.emit(this.form.value);
  }

  changeInitialDate(event) {
    this.maxDateTo = moment(event.value).add(1, 'months').format();
    this.minDateTo = moment(event.value).format();
    if (this.maxDateTo > this.maxDateFrom) {
      this.maxDateTo = this.maxDateFrom;
    }
  }

  changeFinalDate(event) { }

  CreateAlliet(){
    this.createAlliet.emit(true);
  }

  getAliadosActivos(){
    this.traceabilityService.
    findAlliets(AppConfig.settings.apiServer.backend, null, true, true)
    .subscribe((respuestaServicio) =>{
      this.aliadosActivos = respuestaServicio.respuestaServicio
    })
  }

}
