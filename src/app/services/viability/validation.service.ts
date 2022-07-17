import { Injectable } from '@angular/core';
import * as models from 'src/app/models/index';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/shared/auth.service';
import { take } from 'rxjs/operators';
import { PartnerFacade, PartnerState } from 'projects/lib-shared-components/src/public-api';
import { AppConfig } from 'src/app/app-config';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  private request: models.RequestValidate = new models.RequestValidate();
  public cuestionario: any;
  public smsExpire = '¿No te llegó ningún SMS?';
  public attemps = false;
  private authorizeAll = false;

  constructor(protected http: HttpClient, protected authService: AuthService, private partnerFacade: PartnerFacade) {}

  public set Request(request: models.RequestValidate) {
    this.request = request;
  }

  public get Request(): models.RequestValidate {
    return this.request;
  }

  public set AuthorizeAll(authorizeAll: boolean) {
    this.authorizeAll = authorizeAll;
  }

  public get AuthorizeAll(): boolean {
    return this.authorizeAll;
  }

  public fillRequestHeader() {
    this.partnerFacade.partnerInfo$
      .pipe(take(1))
      .subscribe((partner: PartnerState) => (this.request.requestHeader.codAliado = partner.partnerName))
      .unsubscribe();

    // this.request.requestHeader.codAliado = aliado.nombreAliado;
    this.request.requestHeader.usuarioAliado = this.authService.getUserName();
    this.request.requestHeader.sesionId = this.authService.getSessionId();
    this.request.requestHeader.numeroSolicitudCredito = 0;
  }

  public validateIdentity() {
    return this.http.post(`${AppConfig.settings.apiServer.backend}/puntofisico/validation/v1/identity/`, this.request);
  }
  public validateOtp() {
    return this.http.post(`${AppConfig.settings.apiServer.backend}/puntofisico/validation/v1/otp/`, this.request);
  }
  public validateQuestions() {
    return this.http.post(`${AppConfig.settings.apiServer.backend}/puntofisico/validation/v1/questions/`, this.request);
  }
}
