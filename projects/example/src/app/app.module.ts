import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CIModule, CIConfig} from 'lib';

const ciConfig = {
  token: 'demo',
  baseUrl: 'https://cloudimage.public.airstore.io/demo/',
  filters: 'q80.foil1',
  queryString: '?&size_info=1&v2',
  lazyLoadOffset: 100,
  lazyLoading: true
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CIModule
  ],
  providers: [
    {provide: CIConfig, useValue: ciConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
