import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { NavbarMenuModule } from '../navbar-menu/navbar-menu.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, NavbarMenuModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
