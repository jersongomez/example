import { Component, NgModule, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import moment from 'moment';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  maxDate: Date;
  minDate: Date;
  dateborn: Date;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 75, 0, 1);
    this.maxDate = new Date(currentYear - 18, 11, 31);
  }

  onNoClick(): void {
    this.dialogRef.close(this.dateborn);
  }

  ngOnInit() {}
}
