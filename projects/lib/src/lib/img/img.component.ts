import {
  imgStyles as styles,
  processReactNode,
  generateAlt,
} from 'cloudimage-responsive-utils';
import {
  Component,
  Input,
  Output,
  ViewChild,
  ElementRef,
  EventEmitter,
  SimpleChanges,
  OnInit,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CIService } from '../lib.service';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'ci-img',
  templateUrl: './img.component.html',
})
export class ImgComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @ViewChild('imgElem') imgElem: ElementRef;

  @Input() class = '';
  @Input() alt: string;

  @Input() src: string = '';
  @Input() doNotReplaceURL = this.ciService.config.doNotReplaceURL;
  @Input() disableAnimation = false;
  @Input() width: string;
  @Input() height: string;
  @Input() params = this.ciService.config.params;
  @Input() sizes: { [key: string]: any };
  @Input() ratio: number;
  @Input() lazyLoading = this.ciService.config.lazyLoading;
  @Input() placeholderBackground = this.ciService.config.placeholderBackground;
  @Input() offset = this.ciService.config.lazyLoadOffset;
  @Input() preserveSize: boolean;
  @Input() operation: string;

  @Output() onImgLoad: EventEmitter<Event> = new EventEmitter<Event>();

  // Internal states
  lowQualityPreview = true;
  loaded = false;
  previewLoaded = false;
  loadedImageDim: {
    width: number;
    height: number;
    ratio: number;
  };
  isSsr: boolean;
  processed = false;
  preview: boolean;
  cloudimgURL = '';
  previewCloudimgURL: string;
  cloudimgSRCSET: { dpr: string; url: any }[];
  delay = this.ciService.config.delay;
  resizeObservable$: Observable<Event>;
  resizeSubscription: Subscription;
  windowInnerWidthOld: number;

  get isLazyLoadingMode(): boolean {
    if (this.isSsr) {
      return false;
    }

    return this.lazyLoading;
  }

  constructor(
    private ciService: CIService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isSsr = isPlatformServer(this.platformId);
    this.windowInnerWidthOld = this.ciService.getWindowInnerWidth();
  }

  ngOnDestroy(): void {
    if (!this.isSsr) {
      this.resizeSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (!this.isSsr) {
      this.resizeObservable$ = fromEvent(window, 'resize').pipe(
        debounceTime(500)
      );
      this.resizeSubscription = this.resizeObservable$.subscribe(() => {
        const windowInnerWidth = this.ciService.getWindowInnerWidth();

        this.processImage(true, this.windowInnerWidthOld < windowInnerWidth);

        this.windowInnerWidthOld = windowInnerWidth;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const srcChanged =
      changes.src &&
      changes.src.previousValue !== changes.src.currentValue &&
      !changes.src.firstChange;
    const ratioChanged =
      changes.ratio &&
      changes.ratio.previousValue !== changes.ratio.currentValue &&
      !changes.ratio.firstChange;

    if (srcChanged || ratioChanged) {
      this.processImage();
    }
  }

  ngAfterViewInit(): void {
    if (!this.isSsr) {
      setTimeout(() => {
        this.processImage();
      }, this.delay);
    } else {
      this.processImage();
    }
  }

  onImageLoad(event: Event) {
    this.updateLoadedImageSize(event.target as HTMLImageElement);
    this.loaded = true;

    this.onImgLoad.emit(event);
  }

  onPreviewLoaded(event: Event) {
    if (this.previewLoaded) return;

    this.updateLoadedImageSize(event.target as HTMLImageElement);
    this.previewLoaded = true;
  }

  getcloudimgSRCSET() {
    if (this.cloudimgSRCSET && !this.isSsr) {
      return this.cloudimgSRCSET
        .map(({ dpr, url }) => `${url} ${dpr}x`)
        .join(', ');
    }

    return null;
  }

  get pictureAlt() {
    return this.alt || generateAlt(this.src);
  }

  get lowQualityPreviewAlt() {
    return 'low quality preview for ' + this.pictureAlt
  }

  get previewWrapperStyles() {
    return styles.previewWrapper();
  }

  get imgStyles() {
    return {
      ...styles.img({
        preview: this.preview,
        loaded: this.loaded,
        operation: this.operation,
      }),
      transition: 'transform 400ms ease 0ms',
    };
  }

  get imageStyles() {
    return styles.image({
      preserveSize: this.preserveSize,
      imgNodeWidth: this.width,
      imgNodeHeight: this.height,
      operation: this.operation,
    });
  }

  get previewImgStyles() {
    return {
      ...styles.previewImg({
        loaded: this.loaded,
        operation: this.operation,
      }),
      transition: 'opacity 400ms ease',
    };
  }

  get pictureStyles() {
    return styles.picture({
      preserveSize: this.preserveSize,
      imgNodeWidth: this.width,
      imgNodeHeight: this.height,
      ratio: this.ratio || this.loadedImageDim?.ratio,
      previewLoaded: this.previewLoaded,
      loaded: this.loaded,
      placeholderBackground: this.placeholderBackground,
      operation: this.operation,
    });
  }

  get pictureClassName() {
    return `${this.class} cloudimage-image ${
      this.loaded ? 'loaded' : 'loading'
    }`.trim();
  }

  private updateLoadedImageSize(image: HTMLImageElement) {
    this.loadedImageDim = {
      width: image.naturalWidth,
      height: image.naturalHeight,
      ratio: image.naturalWidth / image.naturalHeight,
    };
  }

  private getAlt(name: string) {
    if (!name) return;

    const index = name.indexOf('.');
    return name.slice(0, index);
  }

  private getProps() {
    return {
      src: this.src,
      width: this.width,
      height: this.height,
      ratio: this.ratio,
      params: this.params,
      sizes: this.sizes,
      doNotReplaceURL: this.doNotReplaceURL,
      config: this.ciService.config,
    };
  }

  private processImage(update = false, windowScreenBecomesBigger = false) {
    const imgNode = this.imgElem.nativeElement;

    const data = processReactNode(
      this.getProps(),
      imgNode,
      update,
      windowScreenBecomesBigger
    );

    if (data) {
      this.cloudimgURL = data.cloudimgURL;
      this.previewCloudimgURL = data.previewCloudimgURL;
      (this.cloudimgSRCSET = data.cloudimgSRCSET),
        (this.processed = data.processed);
      this.preview = data.preview;
      this.operation = data.operation;
    }
  }
}
