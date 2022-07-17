import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CiudadService } from 'src/app/services/shared/ciudad.service';
import { UtilsService } from 'src/app/services/shared/utils.service';

import * as models from '../../../models/old-app';
import { GosignMiddlewareFlow } from '../../../models/old-app/gosign-middleware/gosign-middleware-flow.model';
import { SarlaftV1Service } from '../../../services/viability-v1/sarlaft-v1.service';
import { ViabilityV1Service } from '../../../services/viability-v1/viability-v1.service';
import { Domain, DomainsFacade } from '../../../store/domains';

@Component({
  selector: 'lib-sarlaft-v1',
  templateUrl: './sarlaft-v1.component.html',
  styleUrls: ['./sarlaft-v1.component.scss'],
})
export class SarlaftV1Component implements OnInit {
  public form: FormGroup;

  public days: number[] = [];
  public months: number[] = [];
  public years: number[] = [];

  typesContract$: Observable<Domain[]> = this.domainsFacade.typesContract$;

  public touched$: Subscription;

  public deparmentBirth$: Subscription;
  public deparmentCompany$: Subscription;
  public citiesBirth: models.City[] = [];
  public citiesCompany: models.City[] = [];

  isActivityEmployee = false;

  constructor(
    // TODO
    public utils: UtilsService,
    public viabilityService: ViabilityV1Service,
    // TODO
    public ciudadService: CiudadService,
    public sarlaftService: SarlaftV1Service,
    private domainsFacade: DomainsFacade
  ) {}

  ngOnInit() {
    this.isActivityEmployee = !!this.viabilityService.ActivityCode ? this.viabilityService.ActivityCode === 2 : false;
    this.fillDate();
    this.initializerForm();
    this.process();
    this.onChangeDepartmentBirth();
    this.onChangeDeparmentCompany();
  }

  ngOnDestroy(): void {
    this.touched$.unsubscribe();
    this.deparmentBirth$.unsubscribe();
  }

  private initializerForm() {
    const validatorIsEmployee = this.isActivityEmployee ? Validators.required : null;

    this.form = new FormGroup({
      deparmentBirth: new FormControl('', Validators.required),
      cityBirth: new FormControl('', Validators.required),
      companyDateEntry: new FormGroup({
        day: new FormControl('', validatorIsEmployee),
        month: new FormControl('', validatorIsEmployee),
        year: new FormControl('', validatorIsEmployee),
      }),
      companyName: new FormControl('', validatorIsEmployee),
      typeContract: new FormControl('', validatorIsEmployee),
      deparmentCompany: new FormControl('', validatorIsEmployee),
      companyCity: new FormControl('', validatorIsEmployee),
      companyAddress: new FormControl('', validatorIsEmployee),
      companyPhone: new FormControl(
        '',
        this.isActivityEmployee ? [Validators.required, Validators.minLength(7), Validators.maxLength(7)] : null
      ),
    });
  }

  private onChangeDepartmentBirth() {
    this.deparmentBirth$ = this.form.get('deparmentBirth').valueChanges.subscribe(async (value) => {
      const department: models.Department = this.ciudadService.Departments.find(
        (department: models.Department) => department.id === value
      );
      this.citiesBirth = department.ciudades;
      this.citiesBirth.sort((a, b) => {
        return a.nombre.localeCompare(b.nombre);
      });
    });
  }

  private onChangeDeparmentCompany() {
    this.deparmentCompany$ = this.form.get('deparmentCompany').valueChanges.subscribe(async (value) => {
      const department: models.Department = this.ciudadService.Departments.find(
        (department: models.Department) => department.id === value
      );
      this.citiesCompany = department.ciudades;
      this.citiesCompany.sort((a, b) => {
        return a.nombre.localeCompare(b.nombre);
      });
    });
  }

  private fillDate() {
    const currentDate = new Date();
    for (let i = 1; i <= 31; i++) {
      this.days.push(i);
      if (i <= 12) {
        this.months.push(i);
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
          this.viabilityService.progress = true;
          this.sarlaftService.fillInitialRq();
          this.sarlaftService.fillRq(this.form.value);
          this.sarlaftService.orchestrationGosignMiddleware().subscribe(
            (response: GosignMiddlewareFlow) => {
              this.viabilityService.process$.emit(response);
            },
            (error) => {
              this.viabilityService.process$.error(error);
            }
          );
        } else {
          this.utils.markFormGroupTouched(this.form);
        }
      }
    });
  }
}
