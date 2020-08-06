import {
  Component, Input, Output, ViewChild, ElementRef, EventEmitter, ChangeDetectorRef, SimpleChanges,
  OnInit, OnChanges, OnDestroy, AfterViewInit, Inject, PLATFORM_ID
} from '@angular/core';
import {CIService} from '../lib.service';
import {DomSanitizer} from '@angular/platform-browser';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {isPlatformServer} from '@angular/common';

@Component({
  selector: 'ci-img',
  templateUrl: './img.component.html',
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('imgElem', {static: false}) imgElem: ElementRef;
  @ViewChild('pictureElem', {static: false}) pictureElem: ElementRef;
  @Input() src: string;
  @Input() class = '';
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
  @Input() lazyLoading: boolean | null = null;
  @Input() emptyOnSsr = false;
  @Output() imageLoaded: EventEmitter<any> = new EventEmitter<any>();

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  cloudimageUrl = '';
  sources: any[] = [];
  firstSource = null;
  restSources = [];
  isLoaded = false;
  isProcessed = false;
  isPreview: boolean;
  previewCloudimageUrl: string;
  previewSources: any[];
  isAdaptive: boolean;
  actualSize: string;
  parentContainerWidth: string;
  isPreviewLoaded: boolean;
  isRatio: boolean;
  ratioBySize: number;
  imageHeight: number;
  windowInnerWidth: number = window.innerWidth;
  isSsr: boolean;

  get isLazyLoadingMode() {
    if (this.isSsr) {
      return false;
    }

    if (typeof this.lazyLoading === 'boolean') {
      return this.lazyLoading;
    }

    return this.ciService.config.lazyLoading || false;
  }

  constructor(
    private ciService: CIService,
    private _sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isSsr = isPlatformServer(platformId);
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
    this.isPreview = !config.isChrome && (parentContainerWidth > 400) && this.isLazyLoadingMode;
    this.cloudimageUrl = isAdaptive ?
      this.ciService.generateUrl('width', this.ciService.getSizeAccordingToPixelRatio(parentContainerWidth), filters, imgSrc, config) :
      this.ciService.generateUrl(operation, resultSize, filters, imgSrc, config);
    this.sources = isAdaptive ?
      this.ciService.generateSources(operation, resultSize, filters, imgSrc, isAdaptive, config, false) : [];
    let previewCloudimageUrl;
    let previewSources;

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

  getBasicImageStyles() {
    const {config = {}} = this.ciService;
    const operation = this.operation || this.o || config.operation;
    let display = 'block';
    let width;
    let left = '0';
    let maxWidth;
    let maxHeight;

    if (operation === 'fit') {
      display = 'flex';
      maxWidth = '100%';
      maxHeight = '100%';
      left = 'auto';
    } else {
      width = '100%';
    }

    const styles = {
      display,
      top: '0',
      left,
      width,
      'max-width': maxWidth,
      'max-height': maxHeight,
      opacity: '1',
    };

    return Object.keys(styles)
      .filter(propName => styles[propName])
      .map(propName => `${propName}:${styles[propName]};`)
      .join('');
  }
}
