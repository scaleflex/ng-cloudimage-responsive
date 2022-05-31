import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgComponent } from './img/img.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [ImgComponent],
  imports: [CommonModule, LazyLoadImageModule],
  exports: [ImgComponent],
  providers: [],
})
export class CIModule {}
