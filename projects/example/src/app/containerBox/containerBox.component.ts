import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-container-box',
  template: `<div class="container-width-box" #containerElem>container width: <span>{{width}}</span> px</div>`
})

export default class ContainerBoxComponent implements OnInit, OnDestroy {
  @ViewChild('containerElem', { static: true }) containerElem: ElementRef;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  width: number;

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }

  ngOnInit() {
    this.width = this.containerElem.nativeElement.offsetWidth;
    this.resizeObservable$ = fromEvent(window, 'resize').pipe(debounceTime(400));
    this.resizeSubscription$ = this.resizeObservable$.subscribe(() => {
      this.width = this.containerElem.nativeElement.offsetWidth;
    });
  }
}
