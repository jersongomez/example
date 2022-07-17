import { Injectable } from '@angular/core';
import * as models from 'src/app/models/index';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'src/app/app-config';

@Injectable({
  providedIn: 'root',
})
export class CivilStatusService {
  private civilStatusesViability: any[] = [];

  defaultValues = [
    {
      id: 1,
      estadoCivil: 1,
      valor: 'Soltero',
    },
  ];

  constructor(private http: HttpClient) {
    this.getCivilStatuses();
  }

  public get CivilStatuses() {
    this.civilStatusesViability.sort((a, b) => {
      return a.valor.localeCompare(b.valor);
    });
    return this.civilStatusesViability;
  }

  public getCivilStatuses() {
    return this.http.get(`${AppConfig.settings.apiServer.backend}/puntofisico/aliado/findAllCivilStatus`).subscribe(
      (civilStatusesViability: models.CivilStatus[]) => {
        this.civilStatusesViability = civilStatusesViability;
      },
      (error) => {
        console.error(`error in response: ${error.message}`);
        this.civilStatusesViability = this.defaultValues;
      }
    );
  }
}
