import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '@app/app.routing';
import { AppComponent } from '@app/app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env/environment';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [AppComponent, AboutComponent],
  imports: [
    SharedModule,
    CoreModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
