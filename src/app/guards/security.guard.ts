import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { DOCUMENT } from '@angular/common';
import { Constants } from 'src/app/utils/constants';
import { AuthService } from 'src/app/services/shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SecurityGuard extends KeycloakAuthGuard implements CanActivate {
  constructor(
    protected router: Router,
    protected keycloakAngular: KeycloakService,
    protected authService: AuthService,
    @Inject(DOCUMENT) document: any
  ) {
    super(router, keycloakAngular);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const path = route.routeConfig.path;
    let access = false;
    return new Promise((resolve, reject) => {
      if (!this.authenticated) {
        const redirec = document.location.href.replace(Constants.PUBLIC, path);
        this.keycloakAngular.login({ redirectUri: redirec }).catch((e) => console.error);
        return reject(false);
      }
      this.roles.forEach((rol) => {
        if (rol === path) {
          access = true;
        }
      });
      return resolve(access);
    });
  }
}
