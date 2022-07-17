import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from 'src/app/utils/constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Parameter, PartnerState } from 'projects/lib-shared-components/src/public-api';
import { AppConfig } from 'src/app/app-config';

@Injectable({
  providedIn: 'root',
})
export class AliadoService {
  private loadAliado = false;
  constructor(private http: HttpClient) {}

  public set LoadAliado(loadAliado: boolean) {
    this.loadAliado = loadAliado;
  }

  public get LoadAliado() {
    return this.loadAliado;
  }

  public getAliadoByName(name: string) {
    const params = new HttpParams().set(Constants.NOMBRE_ALIADO, name);
    return this.http.get<any>(`${AppConfig.settings.apiServer.backend}/puntofisico/aliado/findAliado`, { params });
  }

  public mappingPartnerRs(partner: string): Observable<PartnerState> {
    return this.getAliadoByName(partner).pipe(
      map((rs) => {
        const partner: PartnerState = {
          id: rs.id,
          partnerName: rs.nombreAliado,
          active: rs.activo,
          date: rs.fecha,
          parameters: rs.parametros.map((paramRs) => {
            const parameter: Parameter = {
              id: paramRs.id,
              name: paramRs.nombre,
              type: paramRs.tipo,
              numbericalValue: paramRs.valorNumerico,
              textValue: paramRs.valorTexto,
              active: paramRs.activo,
              valueFeeShow: true,
            };
            return parameter;
          }),
        };
        return partner;
      })
    );
  }
}
