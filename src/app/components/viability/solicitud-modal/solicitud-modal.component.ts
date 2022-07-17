import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CalculatorService } from 'src/app/services/shared/calculator.service';
import { UtilsService } from 'src/app/services/shared/utils.service';
import { ViabilityService } from '../../../services/viability/viability.service';
import { Observable, Subscription } from 'rxjs';
import { ValidationService } from '../../../services/viability/validation.service';
import { DomainsFacade, Domain } from 'projects/lib-shared-components/src/public-api';
import { take } from 'rxjs/operators';
import { AppConfig } from 'src/app/app-config';

declare var require: any;
const publicIp = require('public-ip');

@Component({
  selector: 'app-solicitud-modal',
  templateUrl: './solicitud-modal.component.html',
  styleUrls: ['./solicitud-modal.component.css'],
})
export class SolicitudModalComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  ip: string;
  showSpinner: boolean = false;

  typesId$: Observable<Domain[]> = this.domainsFacade.typesId$;

  public dias: number[] = [];
  public meses: number[] = [];
  public years: number[] = [];

  public lastTypes = [];
  public numDocumentMinLength = 0;

  public touched$: Subscription;
  allowViabilization: any;

  constructor(
    public calculatorService: CalculatorService,
    public utils: UtilsService,
    public viabilityService: ViabilityService,
    public validationService: ValidationService,
    private domainsFacade: DomainsFacade
  ) {
    this.initializerForm();
  }

  ngOnInit() {
    this.fillDate();
    this.process();
    this.showIp((result) => {
      this.ip = result;
    });

    this.typesId$
      .pipe(take(1))
      .subscribe((valueTypes) => {
        if (valueTypes && valueTypes.length) {
          this.lastTypes = valueTypes;
        }
      })
      .unsubscribe();

    this.form.controls.tipoIdentificacion.valueChanges.subscribe((valueTipoIdentificacion) => {
      const cext = this.lastTypes.find((row) => row.name === 'Cédula de extranjería');
      this.numDocumentMinLength = 7;
      if (cext && cext.code === valueTipoIdentificacion) {
        this.numDocumentMinLength = 6;
      }
      this.form.get('numeroIdentificacion').setErrors(null);
      this.form
        .get('numeroIdentificacion')
        .setValidators([Validators.required, Validators.minLength(this.numDocumentMinLength)]);
    });
  }

  ngOnDestroy(): void {
    this.touched$.unsubscribe();
  }

  private initializerForm() {
    this.form = new FormGroup({
      nombres: new FormControl('', Validators.required),
      apellidos: new FormControl('', [Validators.required, Validators.maxLength(16)]),
      tipoIdentificacion: new FormControl('', [Validators.required]),
      numeroIdentificacion: new FormControl('', [Validators.required, Validators.minLength(7)]),
      correoElectronico: new FormControl('', [Validators.required, Validators.email]),
      celular: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      fechaExpedicion: new FormGroup({
        dia: new FormControl('', Validators.required),
        mes: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required),
      }),
      authorizeAll: new FormControl('', [
        (control) => {
          return !control.value ? { required: true } : null;
        },
      ]),
    });
  }

  private fillDate() {
    const currentDate = new Date();
    for (let i = 1; i <= 31; i++) {
      this.dias.push(i);
      if (i <= 12) {
        this.meses.push(i);
      }
    }
    const yearToday = currentDate.getFullYear();
    const yearMax = yearToday - 75;
    for (let i = yearToday; i >= yearMax; i--) {
      this.years.push(i);
    }
  }

   public process() {
    this.touched$ = this.viabilityService.touched$.subscribe((touched) => {
      if (touched) {
        if (this.form.valid) {
          this.showSpinner = true;
          const id = this.form.get('numeroIdentificacion').value;//
          this.viabilityService.getRepetCredit(AppConfig.settings.apiServer.backend, id).subscribe(//
            (response: any) => {
              if (response.codRespuesta === 0) {

                this.validationService.AuthorizeAll = this.form.value.authorizeAll;
                this.validationService.fillRequestHeader();
                this.viabilityService.fillInitialRequest(this.form.value);
                this.fillRequest();
                this.validationService.validateIdentity().subscribe(
                  (response: any) => {
                    this.viabilityService.process$.emit(response);
                  },
                  (error) => {
                    this.viabilityService.process$.error(error);
                  }
                );
              } else if (response.codRespuesta === 1) {
                const data = {
                  codRespuesta: response.codRespuesta,
                  status: 'NoViable'
                };
                this.viabilityService.process$.emit(data);
              }
            }
          );

        } else this.utils.markFormGroupTouched(this.form);
      }
    });
  }

  public showIp(callback: (result) => void) {
    publicIp.v4().then(
      (ip) => {
        console.log(ip);
        callback(ip);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public fillRequest() {
    this.validationService.Request.requestHeader.tipoIdentificacion = this.form.value.tipoIdentificacion;
    this.validationService.Request.requestHeader.identificacion = this.form.value.numeroIdentificacion;
    this.validationService.Request.requestBody.primerNombre = this.form.value.nombres;
    this.validationService.Request.requestBody.primerApellido = this.form.value.apellidos;
    const mes = `0${this.form.value.fechaExpedicion.mes}`.substr(-2);
    const dia = `0${this.form.value.fechaExpedicion.dia}`.substr(-2);
    this.validationService.Request.requestBody.fechaExpedicion = `${this.form.value.fechaExpedicion.year}-${mes}-${dia}`;
    this.validationService.Request.requestBody.numeroCelular = this.form.value.celular;
    this.validationService.Request.requestBody.centralRiesgo = this.form.value.authorizeAll;
    this.validationService.Request.requestHeader.ip = this.ip;
  }
}
