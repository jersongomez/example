import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/services/shared/utils.service';
import { ValidationV1Service } from '../../../services/viability-v1/validation-v1.service';
import { ViabilityV1Service } from '../../../services/viability-v1/viability-v1.service';

@Component({
  selector: 'lib-validate-otp-v1',
  templateUrl: './validate-otp-v1.component.html',
  styleUrls: ['./validate-otp-v1.component.scss'],
})
export class ValidateOtpV1Component implements OnInit, OnDestroy {
  public form: FormGroup;
  public touched$: Subscription;

  constructor(
    // TODO
    public utils: UtilsService,
    public viabilityService: ViabilityV1Service,
    public validationService: ValidationV1Service
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
