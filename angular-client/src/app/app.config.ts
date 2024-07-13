import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';

import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { Xml2JsonService } from './util/xml2json.service';
import { HttpErrorHandler } from './util/http-error-handler.service';
import { MessageService } from './util/message.service';
import { LocalStorageService } from './util/local-storage.service';
import { LoaderService } from './util/loader.service';
import { DelegatorService } from './util/delegator.service';
import { ToastService } from './util/toastr.service';
import { ToastrModule, provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
    importProvidersFrom(SidebarModule, DropdownModule),
    provideHttpClient(),
    Xml2JsonService,
    ToastService,
    HttpErrorHandler,
    MessageService,
    LocalStorageService,
    LoaderService,
    DelegatorService,
    IconSetService,
    provideToastr(),
    provideAnimations()
  ]
};
