import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CiudadService } from 'src/app/services/shared/ciudad.service';
import { ParametersService } from 'src/app/services/shared/parameters.service';
import { UtilsService } from 'src/app/services/shared/utils.service';

import * as models from '../../../models/old-app';
import { ViabilityV1Service } from '../../../services/viability-v1/viability-v1.service';
import { CalculatorFacade } from '../../../store/calculator';
import { CreditFee } from '../../../store/calculator/calculator.state';
import { PartnerFacade } from '../../../store/partner';
import { CivilStatusService } from 'src/app/services/shared/civil-stratum.service';

@Component({
  selector: 'lib-viability-v1',
  templateUrl: './viability-v1.component.html',
  styleUrls: ['./viability-v1.component.scss'],
})
export class ViabilityV1Component implements OnInit, OnDestroy {
  public form: FormGroup;

  public days: number[] = [];
  public months: number[] = [];
  public years: number[] = [];
  public activities = [];
  public cities: models.City[] = [];
  public civilStatusList: models.CivilStatus[] = [];
  public department$: Subscription;
  public touched$: Subscription;
  public expand = false;

  public stratumList = [];

  private minAmount: number;

  minAmount$: Observable<number> = this.partnerFacade.minAmount$;
  currentFee$: Observable<CreditFee> = this.calculatorFacade.currentFee$;

  constructor(
    // TODO
    public utils: UtilsService,
    public viabilityService: ViabilityV1Service,
    // public calculatorService: CalculatorService,
    // TODO
    public ciudadService: CiudadService,
    public civilStatusService: CivilStatusService,
    private parametersService: ParametersService,
    private partnerFacade: PartnerFacade,
    private calculatorFacade: CalculatorFacade
  ) {
    this.initializerForm();
    this.onChangeDepartment();
    this.setStratumList();
  }

  setStratumList() {
    for (let index = 1; index <= 6; index++) {
      this.stratumList.push({
        id: index.toString(),
        label: index.toString(),
      });
    }
  }

  ngOnInit() {
    this.fillDate();
    this.loadDomains();
    this.process();
    this.partnerFacade.minAmount$
      .pipe(take(1))
      .subscribe((minAmount) => (this.minAmount = minAmount))
      .unsubscribe();
  }

  ngOnDestroy(): void {
    this.touched$.unsubscribe();
    this.department$.unsubscribe();
  }

  private initializerForm() {
    this.form = new FormGroup({
      dateBirth: new FormGroup({
        day: new FormControl('', Validators.required),
        month: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required),
      }),
      economicActivity: new FormControl('', Validators.required),
      income: new FormControl('', [Validators.required, Validators.min(this.minAmount)]),
      departmentResidence: new FormControl('', Validators.required),
      cityResidence: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      stratum: new FormControl('', Validators.required),
      civilStatus: new FormControl('', Validators.required),
    });
  }

  private onChangeDepartment() {
    this.department$ = this.form.get('departmentResidence').valueChanges.subscribe(async (value) => {
      const department: models.Department = this.ciudadService.Departments.find(
        (department: models.Department) => department.id === value
      );
      this.cities = department.ciudades;
      this.cities.sort((a, b) => {
        return a.nombre.localeCompare(b.nombre);
      });
    });
  }

  private loadDomains() {
    this.activities = this.parametersService.TypesOcupation;
  }

  private fillDate() {
    const currentDate = new Date();
    for (let i = 1; i <= 31; i++) {
      this.days.push(i);
      if (i <= 12) {
        this.months.push(i);
      }
    }
    currentDate.setFullYear(currentDate.getFullYear() - 18);
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
          this.viabilityService.DepartmentResidence = this.form.value.departmentResidence;
          this.fillRequest();
          this.viabilityService.makeViable().subscribe(
            (response: any) => {
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

  public fillRequest(): void {
    const rq = {
      anoNacimiento: {
        year: this.form.value.dateBirth.year,
        mes: this.form.value.dateBirth.month,
        dia: this.form.value.dateBirth.day,
      },
      actividad: this.form.value.economicActivity,
      ingresos: this.form.value.income,
      ciudad: this.form.value.cityResidence,
      direccion: this.form.value.address,
      estrato: this.form.value.stratum,
      estadoCivil: this.form.value.civilStatus,
    };

    this.viabilityService.fillFormRequest(rq);
  }
}
