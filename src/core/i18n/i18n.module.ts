import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageDirective } from './language.directive';

@NgModule({
    imports: [
        TranslateModule
    ],
    declarations: [
        LanguageDirective
    ],
    exports: [
        TranslateModule,
        LanguageDirective
    ],
})
export class I18nModule { }
