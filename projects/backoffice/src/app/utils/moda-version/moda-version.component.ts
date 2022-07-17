import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-moda-version',
  templateUrl: './moda-version.component.html',
  styleUrls: ['./moda-version.component.scss']
})
export class ModaVersionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModaVersionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      Version : string,
      Fecha : string
    },
  ) {   }

  ngOnInit() {
  }

  CerrarModal() {
    this.dialogRef.close();
  }

}
