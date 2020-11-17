import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { CIConfig } from './config.model';

@Injectable({
  providedIn: 'root'
})
export class CIService {
  config: any = {};
  isSsr = false;

  constructor(ciConfig: CIConfig, @Inject(PLATFORM_ID) private platformId: object) {
    this.isSsr = isPlatformServer(platformId);

    const {
      token = '',
      container = 'cloudimg.io',
      ultraFast = false,
      lazyLoading = true,
      imgLoadingAnimation = true,
      lazyLoadOffset = 100,
      width = '400',
      height = '300',
      operation = 'width',
      filters = 'foil1',
      placeholderBackground = '#f4f4f4',
      baseUrl = '/',
      presets,
      queryString = ''
    } = ciConfig;
    const windowInnerWidth = this.getWindowInnerWidth();

    this.config = {
      token,
      container,
      ultraFast,
      lazyLoading,
      imgLoadingAnimation,
      lazyLoadOffset,
      width,
      height,
      operation,
      filters,
      placeholderBackground,
      baseUrl,
      presets: presets ? presets :
        {
          xs: '(max-width: 575px)',  // to 575       PHONE
          sm: '(min-width: 576px)',  // 576 - 767    PHABLET
          md: '(min-width: 768px)',  // 768 - 991    TABLET
          lg: '(min-width: 992px)',  // 992 - 1199   SMALL_LAPTOP_SCREEN
          xl: '(min-width: 1200px)'  // from 1200    USUALSCREEN
        },
      queryString,
      innerWidth: windowInnerWidth,
      previewQualityFactor: 10
      // isChrome: /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
    };
  }

  getParentWidth(img, config): number {
    if (!(img && img.parentElement && img.parentElement.getBoundingClientRect) && !(img && img.width)) {
      return config.width;
    }

    const parentContainer = this.getParentContainerWithWidth(img);
    const currentWidth = parseInt('' + parentContainer, 10);
    const computedWidth = Number(this.getComputedStyle(img).width);

    if ((computedWidth && (computedWidth < currentWidth && computedWidth > 15) || !currentWidth)) {
      return this.getSizeLimit(computedWidth);
    } else {
      if (!currentWidth) {
        return img.width || config.width;
      }

      return this.getSizeLimit(currentWidth);
    }
  }

  getParentContainerWithWidth(img): number {
    let parentNode = null;
    let width = 0;

    do {
      parentNode = (parentNode && parentNode.parentNode) || img.parentNode;
      width = parentNode.getBoundingClientRect().width;
    } while (parentNode && !width);

    const letPadding = width && parentNode && parseInt(this.getComputedStyle(parentNode).paddingLeft, 10);
    const rightPadding = parseInt(this.getComputedStyle(parentNode).paddingRight, 10);

    return width + (width ? (-letPadding - rightPadding) : 0);
  }

  getSizeLimit(currentSize): number {
    if (currentSize <= 25) {
      return 25;
    }
    if (currentSize <= 50) {
      return 50;
    }

    return (Math.ceil(currentSize / 100) * 100);
  }

  checkOnMedia(size): boolean {
    try {
      const array = size.split(',');

      return array.length > 1;
    } catch (e) {
      return false;
    }
  }

  checkIfRelativeUrlPath(src): boolean {
    if (src.indexOf('//') === 0) {
      const protocol = this.isSsr ? 'https:' : window.location.protocol;
      src = protocol + src;
    }

    return (src.indexOf('http://') !== 0 && src.indexOf('https://') !== 0 && src.indexOf('//') !== 0);
  }

  getImgSrc(src, isRelativeUrlPath = false, baseUrl = ''): string {
    if (isRelativeUrlPath) {
      return baseUrl + src;
    }

    return src;
  }

  getSizeAccordingToPixelRatio(size): string {
    const splittedSizes = size.toString().split('x');
    const result = [];

    [].forEach.call(splittedSizes, item => {
      result.push(item * Math.round(this.getDevicePixelRatio()));
    });

    return result.join('x');
  }

  generateUrl(operation, size, filters, imgSrc, config): string {
    const {ultraFast, token, container, queryString} = config;
    const isUltraFast = ultraFast ? 'https://scaleflex.ultrafast.io/' : 'https://';
    const cloudUrl = isUltraFast + token + '.' + container + '/';

    return cloudUrl + operation + '/' + size + '/' + filters + '/' + imgSrc + queryString;
  }

  generateSources(operation, size, filters, imgSrc, isAdaptive, config, isPreview): object[] {
    const { previewQualityFactor } = config;
    const sources = [];

    if (isAdaptive) {
      size.forEach(({ size: nextSize, media: mediaQuery}) => {
        if (isPreview) {
          nextSize = nextSize.split('x').map(sizeNext => Math.floor(sizeNext / previewQualityFactor)).join('x');
        }

        sources.push({ mediaQuery, srcSet: this.generateSrcset(operation, nextSize, filters, imgSrc, config) });
      });
    } else {
      if (isPreview) {
        size = size.split('x').map(sizeNext => Math.floor(sizeNext / previewQualityFactor)).join('x');
      }

      sources.push({
        srcSet: this.generateSrcset(operation, size, filters, imgSrc, config)
      });
    }
    return sources;
  }

  getAdaptiveSize(size, config): object[] {
    const arrayOfSizes = size.split(',');
    const sizes = [];

    arrayOfSizes.forEach(str => {
      const groups = str.match(/(([a-z_][a-z_]*)|(\([\S\s]*\)))\s*([0-9xp]*)/);
      const media = groups[3] ? groups[3] : config.presets[groups[2]];

      sizes.push({ media, size: groups[4] });
    });

    return sizes;
  }

  generateSrcset(operation, size, filters, imgSrc, config): string {
    const [imgWidth, imgHeight] = size.toString().split('x');

    return this.generateImgSrc(operation, filters, imgSrc, imgWidth, imgHeight, 1, config);
  }

  generateImgSrc(operation, filters, imgSrc, imgWidth, imgHeight, factor, config): string {
    let imgSize = '' + Math.trunc(imgWidth * factor);

    if (imgHeight) {
      imgSize += 'x' + Math.trunc(imgHeight * factor);
    }

    return this.generateUrl(operation, this.getSizeAccordingToPixelRatio(imgSize), filters, imgSrc, config)
      .replace('http://scaleflex.ultrafast.io/', '')
      .replace('https://scaleflex.ultrafast.io/', '')
      .replace('//scaleflex.ultrafast.io/', '')
      .replace('///', '/');
  }

  getRatioBySize(size, config): number|null {
    let width;
    let height;

    if (typeof size === 'object') {
      const breakPointSource = this.getBreakPoint(size);
      const breakPointSize = breakPointSource ? breakPointSource.size : size[0].size;

      [width, height] = breakPointSize.toString().split('x');
    } else {
      [width, height] = size.toString().split('x');
    }

    if (width && height) {
      return width / height;
    }

    return null;
  }

  getBreakPoint(size): any {
    return [...size].reverse().find(item => matchMedia(item.media).matches);
  }

  getWindowInnerWidth(): number {
    return this.isSsr ? 1000 : window.innerWidth;
  }

  getComputedStyle(elem): any {
    return this.isSsr ? {} : window.getComputedStyle(elem);
  }

  getDevicePixelRatio(): number {
    return this.isSsr ? 1 : (window.devicePixelRatio || 1);
  }
}
