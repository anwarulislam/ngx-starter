import { HttpClient } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
// If you want to make some component only accessible for logged in user
// If user logged in then this guard will protect the user from entering in login page again
import { AuthGuard } from '@core/guards/auth.guard';
import { LoggedGuard } from '@core/guards/logged.guard';
// These provider for interceptors
import { HttpService } from '@core/http/http.service';
import { RouteReusableStrategy } from '@core/http/route-reusable-strategy';
// For authentication API and so on
// Cookie Service. Must needed for almost every project
import { AuthService } from '@core/services/auth.service';
import { StorageService } from '@core/services/storage.service';

@NgModule({
  providers: [
    // These provider for interceptors
    {
      provide: HttpClient,
      useClass: HttpService,
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },

    // Cookie Service. Must needed for almost every project
    StorageService,

    // For authentication API and so on
    AuthService,

    // If you want to make some component only accessible for logged in user
    AuthGuard,

    // If user logged in then this guard will protect the user from entering in login page again
    LoggedGuard,

    // This line for translation. If you don't want in your project just comment out the line
    // I18nService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
