import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { addTagCSP } from './metaTag';

if (environment.production) {
  enableProdMode();
}

addTagCSP();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
