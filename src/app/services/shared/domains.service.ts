import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Domain } from 'src/app/models/domain';
import { Observable } from 'rxjs';
import { Domain as DomainStore } from 'projects/lib-shared-components/src/public-api';
import { map } from 'rxjs/operators';
import { AppConfig } from 'src/app/app-config';

@Injectable({
  providedIn: 'root',
})
export class DomainsService {
  constructor(protected http: HttpClient) {}

  public consultarDominios() {
    return this.http.get<Domain[]>(`${AppConfig.settings.apiServer.backend}/puntofisico/consultardominios`);
  }

  public mappingDomainsRs(): Observable<DomainStore[]> {
    return this.consultarDominios().pipe(
      map((domainsApi) =>
        domainsApi.map((domainApi) => {
          const domain: DomainStore = {
            id: domainApi.id,
            code: domainApi.codigo,
            domain: domainApi.dominio,
            name: domainApi.nombre,
            description: domainApi.descripcion,
            parentCode: domainApi.codigoPadre,
            parentDomain: domainApi.dominioPadre,
            active: domainApi.activo,
          };
          return domain;
        })
      )
    );
  }
}
