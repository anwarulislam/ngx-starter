import { Directive, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { StorageService } from '../services';
import { I18nService } from './i18n.service';

@Directive({
    selector: '[appLanguage]'
})
export class LanguageDirective implements OnChanges {

    @Input() public language: string;
    @Output() onInit: EventEmitter<string> = new EventEmitter();

    constructor(private i18n: I18nService, private storage: StorageService) {
    }

    ngOnInit(): void {
        this.language = this.i18n.language;
        this.onInit.emit(this.language);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.language && !changes.language.firstChange) {
            setTimeout(() => {
                this.i18n.language = changes.language.currentValue;
            }, 200);

        }
    }

}
