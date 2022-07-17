import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuFacade, Menu as MenuStore } from 'projects/lib-shared-components/src/public-api';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/utils/constants';
import { AuthService } from '../../../services/shared/auth.service';
import { MenuItem } from './menu-item.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuItems$: Observable<MenuStore[]>;

  constructor(public router: Router, protected authService: AuthService, private menuFacade: MenuFacade) {}

  ngOnInit(): void {
    this.menuFacade.getMenuByName(Constants.ALIADO_SPECIALIZED);
    this.menuFacade.menuWithoutCurUrl();
    this.menuItems$ = this.menuFacade.menuWithoutCurUrl$;
  }

  goto(item: MenuItem) {
    if (item.document) {
      this.downloadFile(item.url.replace('assets/', 'assets/specialized/'));
    } else if (item.url !== null) {
      if (item.url === 'logout') {
        this.authService.logout();
      } else {
        this.router.navigateByUrl(item.url);
      }
    }
  }

  downloadFile(url: string) {
    const link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
