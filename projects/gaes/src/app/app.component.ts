import { Component, ViewEncapsulation } from '@angular/core';
import hammerjs from '../../../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'gaes';
}
