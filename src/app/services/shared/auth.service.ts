import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public logoutting = false;
  constructor(private keycloakAngular: KeycloakService) {}

  public getToken() {
    return this.keycloakAngular.getKeycloakInstance().token;
  }

  public getUserName() {
    return this.keycloakAngular.getKeycloakInstance().profile.username;
  }

  public getUserProfile() {
    return this.keycloakAngular.getKeycloakInstance().profile;
  }

  public getIdUsuario() {
    return this.keycloakAngular.getKeycloakInstance().subject;
  }

  public getSessionId() {
    return this.keycloakAngular.getKeycloakInstance().sessionId;
  }

  public isTokenExpired() {
    this.keycloakAngular
      .isLoggedIn()
      .then((logged) => {
        if (logged) {
          console.log('verifica token');
          setTimeout(() => {
            console.log('token expired', this.keycloakAngular.isTokenExpired());
            if (this.keycloakAngular.isTokenExpired()) {
              this.keycloakAngular.logout();
            } else {
              this.isTokenExpired();
            }
          }, 1000 * 60);
        }
      })
      .catch(() => {
        this.logout();
      });
  }

  public logout() {
    this.logoutting = true;
    this.keycloakAngular.logout();
  }

  public updateToken() {
    this.keycloakAngular.updateToken(300);
  }
}
