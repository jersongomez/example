import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface IAppConfig {
  env: {
    name: string;
  };
  logging: {
    console: boolean;
  };
  keycloakConfig: {
    url: string;
    realm: string;
    clientId: string;
  };
  apiServer: {
    backend: string;
    viability: string;
    middleware: string;
    getIp: string;
    getIpV2: string;
  };
  // session: {
  //   timeoutWarningMinutes: number,
  //   timeoutLogoutMinutes: number
  // };
}

@Injectable()
export class AppConfig {
  static readonly ENVIRONMENT_PAHT: string = environment.kicker;

  static settings: IAppConfig;

  constructor(private _http: HttpClient) {}

  loadEnvironmentConfig() {
    return new Promise<void>((resolve, reject) => {
      this._http
        .get(AppConfig.ENVIRONMENT_PAHT)
        .toPromise()
        .then((response: IAppConfig) => {
          AppConfig.settings = <IAppConfig>response;
          resolve();
        })
        .catch((response: any) => {
          reject(`Could not load file '${AppConfig.ENVIRONMENT_PAHT}': ${JSON.stringify(response)}`);
        });
    });
  }
}
