import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DATE_LOCALE, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'lib-modal-content-v1',
  templateUrl: './modal-content-v1.component.html',
  styleUrls: ['./modal-content-v1.component.scss'],
})
@NgModule({
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-CO' }],
})
export class ModalContentV1Component implements OnInit {
  forma: FormGroup;
  diferencia;
  showAge = 0;
  message = 'El paciente debe ser mayor de edad y menor de 75 Años';

  constructor(
    public dialogRef: MatDialogRef<ModalContentV1Component>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {
    this.forma = new FormGroup({
      fechaNmto: new FormControl(new Date(), Validators.required),
    });
  }
  ngOnInit() {}

  save() {
    if (this.forma.valid) {
      this.data.ageCalc = this.forma.value.fechaNmto;
      this.ageCalculator();

      if (this.showAge >= 18 && this.showAge <= 75) {
        this.dialogRef.close(this.data);
      } else {
        this.openSnackBar(this.message, '');
      }
    }
  }

  ageCalculator() {
    if (this.data.ageCalc) {
      var showAge;

      const convertAge = this.data.ageCalc.getTime();
      const timeDiff = Date.now() - convertAge;

      showAge = Number((timeDiff / (1000 * 60 * 60 * 24 * 365.25)).toFixed(2));

      this.diferencia = Math.round((75 - showAge) * 12);
      this.showAge = Math.round(showAge);
    }
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, { duration: 2000 });
  }
}
