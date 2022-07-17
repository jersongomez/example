import { selectMenu } from './../../../../../../lib-shared-components/src/lib/store/menu/menu.actions';
import { select } from '@ngrx/store';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { MenuFacade } from 'projects/lib-shared-components/src/public-api';
import { Subscription } from 'rxjs';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-nav-path',
  templateUrl: './nav-path.component.html',
  styleUrls: ['./nav-path.component.scss'],
})
export class NavPathComponent implements OnInit {
  selectmenu: string = '';


  public selectedMenu = null;
  menu: any;
  ubicacion: any;
  private menuSubscription: Subscription;
  contenerarray;


  constructor(private menuFacade: MenuFacade) {
  }

  ngOnInit() {
  this.selectionMenu();
  }

  selectionMenu(){
    this.menuSubscription = this.menuFacade.getSelectedMenu().subscribe((selectedMenu) => {
      if (selectedMenu !== null) {
        this.selectedMenu = selectedMenu;
      }
      return selectedMenu;
    });
  }

  tomarInfo(){
    const prueba = this.selectedMenu.filter( res => {
    })
  }


  ngOnDestroy() {
    this.menuSubscription.unsubscribe();
  }
}

