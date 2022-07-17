import { Injectable } from '@angular/core';
import * as models from 'src/app/models/index';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'src/app/app-config';

@Injectable({
  providedIn: 'root',
})
export class CiudadService {
  private ciudadesO3: models.Parameters[] = [];
  private departmentsViability: any[] = [];

  constructor(private http: HttpClient) {
    this.getDepartments();
  }

  public get CiudadesO3() {
    return this.ciudadesO3;
  }

  public get Departments() {
    this.departmentsViability.sort((a, b) => {
      return a.nombre.localeCompare(b.nombre);
    });
    return this.departmentsViability;
  }

  public getDepartments() {
    return this.http
      .get(`${AppConfig.settings.apiServer.backend}/puntofisico/city/findAllDepartamentos`)
      .subscribe((departments: models.Department[]) => {
        this.departmentsViability = departments;
      });
  }
}
