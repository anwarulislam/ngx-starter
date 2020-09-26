import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages.routing';


@NgModule({
  declarations: [PagesComponent],
  imports: [
    SharedModule,
    CommonModule,

    PagesRoutingModule
  ]
})
export class PagesModule { }
