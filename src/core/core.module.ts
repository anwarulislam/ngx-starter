import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// For authentication API and so on
// Cookie Service. Must needed for almost every project
import { AuthService, StorageService } from '@core/services';

// These provider for interceptors
import { HttpService } from './http/http.service';
import { RouteReusableStrategy } from './http/route-reusable-strategy';

// If you want to make some component only accessible for logged in user
// If user logged in then this guard will protect the user from entering in login page again
import { AuthGuard, LoggedGuard } from './guards';

// This line for translation. If you don't want in your project just comment out the line
import { I18nService } from './i18n';


@NgModule({
    providers: [

        // These provider for interceptors
        {
            provide: HttpClient,
            useClass: HttpService,
        },
        {
            provide: RouteReuseStrategy,
            useClass: RouteReusableStrategy
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
        I18nService,
    ]
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
