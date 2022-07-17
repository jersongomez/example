import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Constants } from '../utils/constants';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/shared/auth.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-no-page-found',
  templateUrl: './no-page-found.component.html',
  styleUrls: ['./no-page-found.component.scss'],
})
export class NoPageFoundComponent {
  public aliado: FormControl = new FormControl();
  public aliados = [
    // { nombre: 'Automundial', url : `/${Constants.ALIADO_AUTOMUNDIAL}`},
    // { nombre: 'Colchones Paraiso', url: `/${Constants.ALIADO_PARAISO}` },
    // { nombre: 'Platzi', url: `/${Constants.ALIADO_PLATZI}`},
    // { nombre: 'Specialized', url: `/${Constants.ALIADO_SPECIALIZED}` },
    // { nombre: 'Muebles & Accesorios', url: `/${Constants.ALIADO_MUEBLES_Y_ACCESORIOS}` },
    { nombre: 'Automundial', url: `/${Constants.ALIADO_AUTOMUNDIAL}` },
    { nombre: 'Cemex', url: `/${Constants.ALIADO_CEMEX}` },
    { nombre: 'Centros Clinicos Auditivos Gaes', url: `/${Constants.ALIADO_GAES}` },
    { nombre: 'O3mobility', url: `/${Constants.ALIADO_O3}` },
    { nombre: 'Colsanitas', url: `/${Constants.ALIADO_COLSANITAS}` },
  ];
  constructor(private route: Router, public auth: AuthService) {}

  go() {
    this.route.navigateByUrl(this.aliado.value);
  }
}
