import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../assets/fonts/helvetica-neue.css'],
})
export class AppComponent {
  initialization = `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CIModule, CIConfig, CI_CONFIG } from 'ng-cloudimage-responsive';
import { AppComponent } from './app.component';

const ciConfig: Partial<CIConfig> = {
  token: 'demo',
  baseUrl: 'https://jolipage.scaleflex.it/'
};

@NgModule({
    declarations: [ AppComponent ],
    imports: [ BrowserModule, CIModule ],
    providers: [
      {provide: CI_CONFIG, useValue: ciConfig}
    ],
    bootstrap: [ AppComponent ]
})
export class MyAppModule {}`;

  implement = `<ci-img src="img.jpg" alt="Demo image" ratio="1.5"></ci-img>`;

  images = [
    {
      src: 'luca-bravo-121932.jpg',
      ratio: 4.538 / 1.932,
      original_size: '4.8mb',
    },
    {
      src: 'alain.jpg',
      ratio: 6 / 4,
      original_size: '5.8mb',
    },
    {
      src: 'ameen-fahmy.jpg',
      ratio: 2.926 / 1.953,
      original_size: '0.5mb',
    },
    {
      src: 'tim-patch.jpg',
      ratio: 5.464 / 3.64,
      original_size: '7.5mb',
    },
    {
      src: 'veeterzy.jpg',
      ratio: 5.76 / 3.84,
      original_size: '8.5mb',
    },
    {
      src: 'dino-reichmuth.jpg',
      ratio: 7.833 / 5.304,
      original_size: '11.9mb',
    },
    {
      src: 'inma-lesielle.jpg',
      ratio: 4.032 / 2.688,
      original_size: '3.0mb',
    },
    {
      src: 'jeremy-thomas.jpg',
      ratio: 5.005 / 3.417,
      original_size: '5.2mb',
    },
    {
      src: 'jordan-hubbard.jpg',
      ratio: 5 / 3.333,
      original_size: '3.0mb',
    },
    {
      src: 'jp-valery.jpg',
      ratio: 5.472 / 3.648,
      original_size: '2.2mb',
    },
    {
      src: 'kira-laktionov.jpg',
      ratio: 4.032 / 2.688,
      original_size: '2.6mb',
    },
    {
      src: 'michael-d-beckwith-6.jpg',
      ratio: 5.184 / 3.456,
      original_size: '5.2mb',
    },
    {
      src: 'michael-d-beckwith.jpg',
      ratio: 8.192 / 5.461,
      original_size: '9.2mb',
    },
    {
      src: 'ricky-kharawala.jpg',
      ratio: 8.192 / 5.461,
      original_size: '9.2mb',
    },
    {
      src: 'rodolfo-marques.jpg',
      ratio: 6 / 4,
      original_size: '8.2mb',
    },
    {
      src: 'dino-reichmuth-9.jpg',
      ratio: 6.616 / 3.744,
      b: 1.76,
      original_size: '9.7mb',
    },
    {
      src: 'ishan-seefromthesky.jpg',
      ratio: 5.464 / 3.07,
      original_size: '4.2mb',
    },
    {
      src: 'dino-reichmuth-1.jpg',
      ratio: 7.952 / 5.622,
      original_size: '9.2mb',
    },
    {
      src: 'dino-reichmuth-11.jpg',
      ratio: 5.256 / 7.88,
      original_size: '11mb',
    },
  ];

  getDevicePixelRatio() {
    return Math.round(window.devicePixelRatio || 1);
  }
}
