import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { PreloaderComponent } from './components';

import { SafePipe } from './pipes';

// import { } from './directives';

const DECLARATION = [
    // Components
    PreloaderComponent,

    // Pipes
    SafePipe,

    // Directives
];

const IMPORTS = [
    CommonModule,
    RouterModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,

    TranslateModule
];




@NgModule({
    imports: [
        ...IMPORTS,
    ],
    declarations: [
        ...DECLARATION
    ],
    exports: [
        ...IMPORTS,
        ...DECLARATION
    ]
})
export class SharedModule { }
