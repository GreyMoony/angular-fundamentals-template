import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { WINDOW } from '@app/auth/services/window.token';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, {
    providers: [
      { provide: WINDOW, useValue: window }
    ]
  })
  .catch(err => console.error(err));
