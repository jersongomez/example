import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/services/shared/utils.service';
import { ViabilityService } from 'src/app/services/viability/viability.service';
import { ValidationService } from '../../../services/viability/validation.service';

@Component({
  selector: 'app-validate-otp',
  templateUrl: './validate-otp.component.html',
  styleUrls: ['./validate-otp.component.scss'],
})
export class ValidateOtpComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public touched$: Subscription;

  constructor(
    public utils: UtilsService,
    public viabilityService: ViabilityService,
    public validationService: ValidationService
  ) {}

  ngOnInit() {
    this.initializerForm();
    this.process();
  }

  ngOnDestroy(): void {
    this.touched$.unsubscribe();
    console.log('destroy');
  }

  private initializerForm() {
    this.form = new FormGroup({
      otp: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    });
  }

  public process() {
    this.touched$ = this.viabilityService.touched$.subscribe((touched) => {
      if (touched) {
        if (this.form.valid) {
          this.viabilityService.progress = true;
          this.validationService.Request.requestBody.codigoOTP = this.form.value.otp;
          this.validationService.validateOtp().subscribe(
            (response) => {
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

  public sendAgainOtp() {
    this.viabilityService.progress = true;
    if (!this.validationService.attemps) {
      this.validationService.attemps = true;
      this.validateIdentity();
    } else {
      this.validationService.attemps = false;
      this.validationService.Request.requestBody.numeroCelular += 1;
      this.validateIdentity();
    }
  }

  public validateIdentity() {
    this.validationService.validateIdentity().subscribe(
      (response: any) => {
        this.viabilityService.process$.emit(response);
      },
      (error) => {
        this.viabilityService.process$.error(error);
      }
    );
  }
}
