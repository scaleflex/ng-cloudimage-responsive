import {
  Component, Input, Output, ViewChild, ElementRef, EventEmitter, ChangeDetectorRef, SimpleChanges,
  OnInit, OnChanges, OnDestroy, AfterViewInit
} from '@angular/core';
import {CIService} from '../lib.service';
import {DomSanitizer} from '@angular/platform-browser';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'ci-img',
  template: `
    <picture #pictureElem *ngIf="!isProcessed"></picture>

    <ng-container [ngSwitch]="lazyLoading">
      <ng-container *ngSwitchCase="true">
        <picture
          [class]="class + ' cloudimage-image-picture cloudimage-image-' + (isLoaded ? 'loaded' : 'loading')"
          style="display:block;width:100%;overflow:hidden;position:relative;"
          [style.paddingBottom]="getPicturePaddingBottom()"
          [style.background]="getPictureBackground()"
          #imgElem
          *ngIf="isProcessed">
          <source
            *ngFor="let source of getRestSources()"
            [media]="source.mediaQuery || ''"
            [attr.lazyLoad]="source.srcSet || ''"
            (load)="onImageLoad($event)"
          />
          <source
            *ngIf="getFirstSource()"
            [attr.lazyLoad]="firstSource.srcSet || ''"
            (load)="onImageLoad($event)"
          />
          <img
            style="display:block;width:100%;opacity:1;top:0;left:0;"
            [style.position]="getPositionStyle()"
            [style.height]="getImgHeight()"
            [style.paddingBottom]="getPicturePaddingBottom()"
            [style.transform]="getTransformStyle()"
            [style.transition]="getTransitionStyle()"
            [style.filter]="getFilterStyle()"
            (load)="onImageLoad($event)"
            [lazyLoad]="!isPreview ? cloudimageUrl : (isPreviewLoaded ? cloudimageUrl : previewCloudimageUrl)"
            [offset]="offset"
            [attr.alt]="alt"
          />
        </picture>
      </ng-container>
      <div *ngSwitchCase="false">
        <picture
          [class]="class + ' cloudimage-image-picture cloudimage-image-' + (isLoaded ? 'loaded' : 'loading')"
          style="display:block;width:100%;overflow:hidden;position:relative;"
          [style.paddingBottom]="getPicturePaddingBottom()"
          [style.background]="getPictureBackground()"
          #imgElem
          *ngIf="isProcessed">
          <source
            *ngFor="let source of restSources"
            [media]="source.mediaQuery || ''"
            [srcset]="source.srcSet || ''"
            (load)="onImageLoad($event)"
          />
          <source
            *ngIf="firstSource"
            [srcset]="firstSource.srcSet || ''"
            (load)="onImageLoad($event)"
          />
          <img
            style="display:block;width:100%;opacity:1;top:0;left:0;"
            [style.position]="getPositionStyle()"
            [style.height]="getImgHeight()"
            [style.transform]="getTransformStyle()"
            [style.transition]="getTransitionStyle()"
            [style.filter]="getFilterStyle()"
            (load)="onImageLoad($event)"
            [src]="!isPreview ? cloudimageUrl : (isPreviewLoaded ? cloudimageUrl : previewCloudimageUrl)"
            [attr.alt]="alt"
          />
        </picture>
      </div>
    </ng-container>
  `
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('imgElem', {static: false}) imgElem: ElementRef;
  @ViewChild('pictureElem', {static: false}) pictureElem: ElementRef;
  @Input() src: string;
  @Input() class: string = '';
  @Input() alt: string;
  @Input() operation: string;
  @Input() o: string;
  @Input() size: string | {};
  @Input() s: string | {};
  @Input() filters: string;
  @Input() f: string;
  @Input() ratio: number;
  @Input() offset = 100;
  @Input() ngSwitch: any;
  @Output() imageLoaded: EventEmitter<any> = new EventEmitter<any>();

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  cloudimageUrl = '';
  sources = [];
  firstSource = null;
  restSources = [];
  isLoaded = false;
  isProcessed = false;
  isPreview: boolean;
  previewCloudimageUrl: string;
  previewSources: string;
  isAdaptive: boolean;
  actualSize: string;
  parentContainerWidth: string;
  isPreviewLoaded: boolean;
  isRatio: boolean;
  ratioBySize: number;
  lazyLoading: boolean;
  imageHeight: number;
  windowInnerWidth: number = window.innerWidth;

  constructor(
    private ciService: CIService,
    private _sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef,
  ) {
    this.lazyLoading = ciService.config.lazyLoading;
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }

  ngOnInit() {
    this.resizeObservable$ = fromEvent(window, 'resize').pipe(debounceTime(500));
    this.resizeSubscription$ = this.resizeObservable$.subscribe(() => {
      if (this.isAdaptive || this.windowInnerWidth < window.innerWidth) {
        this.processImage();
      }
      this.windowInnerWidth = window.innerWidth;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const srcChanged = changes.src && changes.src.previousValue !== changes.src.currentValue && !changes.src.firstChange;
    const ratioChanged = changes.ratio && changes.ratio.previousValue !== changes.ratio.currentValue && !changes.ratio.firstChange;

    if (srcChanged || ratioChanged) {
      this.processImage();
    }
  }

  ngAfterViewInit() {
    this.processImage();
  }

  processImage() {
    const imgNode = (this.imgElem || this.pictureElem).nativeElement;
    const {config = {}} = this.ciService;
    const {previewQualityFactor} = config;
    const operation = this.operation || this.o || config.operation;
    const parentContainerWidth = this.ciService.getParentWidth(imgNode, config);
    let size = this.size || this.s || config.size || parentContainerWidth;
    const filters = this.filters || this.f || config.filters;
    const isAdaptive = this.ciService.checkOnMedia(size);

    size = isAdaptive ? this.ciService.getAdaptiveSize(size, config) : size;

    const isRelativeUrlPath = this.ciService.checkIfRelativeUrlPath(this.src);
    const imgSrc = this.ciService.getImgSrc(this.src, isRelativeUrlPath, config.baseUrl);
    const resultSize = isAdaptive ? size : this.ciService.getSizeAccordingToPixelRatio(size);
    this.isPreview = !config.isChrome && (parentContainerWidth > 400) && config.lazyLoading;
    this.cloudimageUrl = isAdaptive ?
      this.ciService.generateUrl('width', this.ciService.getSizeAccordingToPixelRatio(parentContainerWidth), filters, imgSrc, config) :
      this.ciService.generateUrl(operation, resultSize, filters, imgSrc, config);
    this.sources = isAdaptive ?
      this.ciService.generateSources(operation, resultSize, filters, imgSrc, isAdaptive, config, false) : [];
    let previewCloudimageUrl, previewSources;

    if (this.isPreview) {
      const previewConfig = {...config, queryString: ''};
      previewCloudimageUrl = isAdaptive ?
        this.ciService.generateUrl('width', (Math.floor(parentContainerWidth / previewQualityFactor)), filters, imgSrc, previewConfig) :
        this.ciService.generateUrl(
          operation,
          resultSize.split('x').map(item => Math.floor(item / previewQualityFactor)).join('x'),
          filters,
          imgSrc,
          previewConfig
        );
      previewSources = isAdaptive ?
        this.ciService.generateSources(operation, resultSize, filters, imgSrc, isAdaptive, previewConfig, true) : [];
    }

    this.previewCloudimageUrl = previewCloudimageUrl;
    this.previewSources = previewSources;
    this.isAdaptive = isAdaptive;
    this.actualSize = size;
    this.parentContainerWidth = parentContainerWidth;
    const ratioBySize = this.ciService.getRatioBySize(size, config);
    this.imageHeight = Math.floor(parentContainerWidth / (ratioBySize || this.ratio || 1.5));
    this.isRatio = !!(ratioBySize || this.ratio);
    this.ratioBySize = ratioBySize;

    this.isProcessed = true;
    this.cd.detectChanges();
  }

  onImageLoad($event) {
    if (!this.isPreview) {
      this.isPreviewLoaded = true;
      this.isLoaded = true;
    } else if (this.isPreviewLoaded) {
      this.isLoaded = true;
    } else {
      this.isPreviewLoaded = true;
    }
    this.imageLoaded.emit($event);
  }

  getRestSources() {
    const resultSources = [...(!this.isPreview ? this.sources : (this.isPreviewLoaded ? this.sources : this.previewSources))];

    return resultSources.slice(1).reverse();
  }

  getFirstSource() {
    const resultSources = [...(!this.isPreview ? this.sources : (this.isPreviewLoaded ? this.sources : this.previewSources))];
    this.firstSource = resultSources[0];

    return resultSources[0];
  }

  getPositionStyle() {
    return this._sanitizer.bypassSecurityTrustStyle(this.isRatio ? 'absolute' : 'relative');
  }

  getImgHeight() {
    // todo check if we need 100% height
    // return this._sanitizer.bypassSecurityTrustStyle(this.isRatio ? '100%' : 'auto');
    return this._sanitizer.bypassSecurityTrustStyle(this.isRatio ? 'auto' : 'auto');
  }

  getTransformStyle() {
    const {config} = this.ciService;
    let result = 'none';

    if (config.imgLoadingAnimation) {
      result = 'scale3d(1.1, 1.1, 1)';
    }

    if (this.isLoaded && config.imgLoadingAnimation) {
      result = 'translateZ(0) scale3d(1, 1, 1)';
    }

    return this._sanitizer.bypassSecurityTrustStyle(result);
  }

  getTransitionStyle() {
    const {config} = this.ciService;
    let result = 'none';

    if (this.isLoaded && config.imgLoadingAnimation) {
      result = 'all 0.3s ease-in-out';
    }

    return this._sanitizer.bypassSecurityTrustStyle(result);
  }

  getFilterStyle() {
    const {config} = this.ciService;
    let result = 'none';

    if (config.imgLoadingAnimation) {
      result = `blur(${Math.floor(parseInt(this.parentContainerWidth, 10) / 100)}px)`;
    }

    if (this.isLoaded && config.imgLoadingAnimation) {
      result = 'blur(0px)';
    }

    return this._sanitizer.bypassSecurityTrustStyle(result);
  }

  getPicturePaddingBottom() {
    let result = '';

    if (this.isRatio) {
      result = (100 / (this.ratioBySize || this.ratio)) + '%';
    }

    return this._sanitizer.bypassSecurityTrustStyle(result);
  }

  getPictureBackground() {
    const {config} = this.ciService;
    let result = 'transparent';

    if (this.isRatio && !this.isPreviewLoaded && !this.isLoaded) {
      result = config.placeholderBackground;
    }

    return this._sanitizer.bypassSecurityTrustStyle(result);
  }
}
