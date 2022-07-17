import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'projects/lib-shared-components/src/public-api';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/shared/auth.service';

export interface MenuItem {
  id: number;
  label: string;
  icon: string;
  url: string;
  document?: boolean;
  showOnMobile: boolean;
  showOnTablet: boolean;
  showOnDesktop: boolean;
  subMenu: MenuItem[];
}

@Component({
  selector: 'lib-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
})
export class NavbarMenuComponent implements OnInit {
  menuItems$: Observable<Menu[]>;
  @Input() public menuItems: Observable<Menu[]>;

  constructor(public router: Router, protected authService: AuthService) {}

  ngOnInit() {
    this.menuItems$ = this.menuItems;
  }

  goto(item: MenuItem) {
    if (item.document) {
      this.downloadFile(item.url);
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
