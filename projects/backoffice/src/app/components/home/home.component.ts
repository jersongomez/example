import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModaVersionComponent } from '../../utils/moda-version/moda-version.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  dataInput: string = "Trazabilidad";
  version = '1.0.13.'
  fechaCambio = '17-02-2022'
  constructor(
    private dialog: MatDialog
   ) {
   }

  ngOnInit() {
    this.dataInput;
  }

  menuSelect(dataMenu){
  }

  optionSelected(event) {
    this.dataInput = event;
  }

  showVersion(){
    const dialogRef = this.dialog.open(ModaVersionComponent, {
        data: {
          Version : this.version,
          Fecha   : this.fechaCambio,
        },
      width: '200px',
      height:'150px'
    });
  }

}
