import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataService, AuthService, StorageService } from '@app/core/services';
import { AuthGuard, LoggedGuard } from './guards';

import { HttpService } from './http/http.service';
import { RouteReuseStrategy } from '@angular/router';
import { RouteReusableStrategy } from './http/route-reusable-strategy';
import { I18nService } from './i18n';
import { SkillService } from '@app/skills/skill.service';


@NgModule({
    providers: [
        {
            provide: HttpClient,
            useClass: HttpService,
        },
        {
            provide: RouteReuseStrategy,
            useClass: RouteReusableStrategy
        },
        StorageService,
        DataService,
        SkillService,
        AuthService,
        AuthGuard,
        LoggedGuard,
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
