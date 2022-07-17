import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ViabilityState } from './viability.state';

@Injectable()
export class ViabilityEffects {
  constructor(private actions$: Actions, private store: Store<ViabilityState>) {}
}
