import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MenuFacade, Menu as MenuStore } from 'projects/lib-shared-components/src/public-api';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/shared/auth.service';
import { Constants } from 'src/app/utils/constants';
import { Menu } from '../../../models/menu/menu';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit, OnDestroy {
   @Output() selectedMenu = new EventEmitter<string>();
  public menu: Menu;
  public itemSelected: MenuStore;
  private menuSubscription: Subscription;


  constructor(private menuFacade: MenuFacade, private authService: AuthService) {
    this.menu = new Menu();
    this.menu.items = [];
    this.menu.bottomItems = [];
  }


  ngOnInit() {
    this.menuFacade.getMenuByName(Constants.BACK_OFFICE);
    this.menuFacade.getMainMenu();

    this.menuSubscription = this.menuFacade
      .getMainMenu()
      .pipe(
        map((menu: MenuStore[]) => {
          this.menu.items = menu.filter((menuItem) => !!menuItem.url && menuItem.url.includes('/'));
          this.menu.bottomItems = menu.filter((menuItem) => !!menuItem.url && !menuItem.url.includes('/'));

        })
      )
      .subscribe(() => {
        this.menuFacade.selectMenu(this.menu.items[0]);
      });
  }

  ngOnDestroy() {
    this.menuSubscription.unsubscribe();
  }

  public select(item: MenuStore) {
    this.menuFacade.selectMenu(item);
    this.selectedMenu.emit(item.label);
  }

  public logout() {
    this.authService.logout();
  }
}
