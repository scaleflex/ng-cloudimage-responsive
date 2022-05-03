import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CIConfig, CIModule, CI_CONFIG } from 'lib';

import { HighlightModule } from 'ngx-highlightjs';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

import ContainerBoxComponent from './containerBox/containerBox.component';

export function hljsLanguages() {
  return [
    { name: 'typescript', func: typescript },
    { name: 'xml', func: xml },
  ];
}

const ciConfig: Partial<CIConfig> = {
  token: 'demo',
  baseUrl: 'https://cdn.scaleflex.it/demo/',
  lazyLoadOffset: 100,
  lazyLoading: true,
  placeholderBackground: '#e1e1e1',
};

@NgModule({
  declarations: [AppComponent, ContainerBoxComponent],
  imports: [
    BrowserModule,
    CIModule,
    HighlightModule.forRoot({
      languages: hljsLanguages,
    }),
  ],
  providers: [{ provide: CI_CONFIG, useValue: ciConfig }],
  bootstrap: [AppComponent],
})
export class AppModule {}
