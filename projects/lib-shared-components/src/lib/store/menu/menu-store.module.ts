import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MenuService } from 'src/app/services/shared/menu.service';
import { MenuEffects } from './menu.effects';
import { menuReducer } from './menu.reducer';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('menuState', menuReducer), EffectsModule.forFeature([MenuEffects])],
  providers: [MenuService],
})
export class MenuStoreModule {}
