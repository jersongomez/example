import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MenuItem } from 'src/app/components/shared/menu/menu-item.interface';
import { Menu as MenuStore, SubMenu as SubMenuStore } from 'projects/lib-shared-components/src/public-api';
import { Constants } from 'src/app/utils/constants';
import { AppConfig } from 'src/app/app-config';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menus: MenuItem[] = [];
  private menuItems: MenuItem[] = [];
  private menusObs$: Subscription;
  private rutaActived: string;
  constructor(private http: HttpClient, private router: Router) {
    this.menusObs$ = this.filterMenu().subscribe(({ ruta }) => {
      this.rutaActived = ruta;
      this.menuItems = this.menus.filter((item) => item.url !== this.rutaActived);
    });
  }

  public set MenuItems(menuItems: MenuItem[]) {
    this.menuItems = menuItems;
  }

  public get MenuItems(): MenuItem[] {
    return this.menuItems;
  }

  filterMenu() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }

  getMenuByAliado(name: string) {
    this.callMenuByAliado(name).subscribe((data: MenuItem[]) => {
      this.menus = data;
      this.menuItems = this.menus.filter((item) => item.url !== this.rutaActived);
    });
  }

  private callMenuByAliado(name: string): Observable<MenuItem[]> {
    const params = new HttpParams().set(Constants.NOMBRE_ALIADO, name);
    return this.http.get<MenuItem[]>(`${AppConfig.settings.apiServer.backend}/puntofisico/menu/menuByAliado`, {
      params,
    });
  }

  public mappingMenuRs(partner: string): Observable<MenuStore[]> {
    if(partner === "colsanitas"  || partner === "specialized" ){
      const menuModule = this.rutaActived.slice(1)
      if (partner !== menuModule) {
      partner = menuModule;
      }
    }
    return this.callMenuByAliado(partner).pipe(
      map((menuRs) =>
        menuRs.map(
          (menuRs) =>
            ({
              id: menuRs.id,
              label: menuRs.label,
              icon: menuRs.icon,
              url: menuRs.url,
              document: menuRs.document,
              showOnMobile: menuRs.showOnMobile,
              showOnTablet: menuRs.showOnTablet,
              showOnDesktop: menuRs.showOnDesktop,
              subMenu: menuRs.subMenu.map(
                (subMenuRs) =>
                  ({
                    id: subMenuRs.id,
                    label: subMenuRs.label,
                    icon: subMenuRs.icon,
                    url: subMenuRs.url,
                    document: subMenuRs.document,
                    showOnMobile: subMenuRs.showOnMobile,
                    showOnTablet: subMenuRs.showOnTablet,
                    showOnDesktop: subMenuRs.showOnDesktop,
                  } as SubMenuStore)
              ),
            } as MenuStore)
        )
      )
    );
  }
}
