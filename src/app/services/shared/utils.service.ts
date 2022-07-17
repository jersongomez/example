import { Injectable } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  public numbersOnly(event: any) {
    return event.charCode >= 48 && event.charCode <= 57;
  }

  public lettersOnly(event: any) {
    return (
      (event.charCode >= 65 && event.charCode <= 90) ||
      (event.charCode >= 97 && event.charCode <= 122) ||
      event.charCode === 32 ||
      event.charCode === 241 ||
      event.charCode === 209
    );
  }

  public isAlphabetical(event: any) {
    return (
      (event.charCode >= 65 && event.charCode <= 90) ||
      (event.charCode >= 97 && event.charCode <= 122) ||
      event.charCode === 32 ||
      event.charCode === 241 ||
      event.charCode === 209 ||
      (event.charCode >= 160 && event.charCode <= 163) ||
      event.charCode === 130 ||
      event.charCode === 181 ||
      event.charCode === 144 ||
      event.charCode === 214 ||
      event.charCode === 224 ||
      event.charCode === 233
    );
  }

  public markNgFormTouched(form: NgForm) {
    (Object as any).values(form.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  unClick() {
    const radios: any = document.getElementsByClassName('check');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < radios.length; i++) {
      radios[i].checked = false;
    }
  }

  public markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
