import {Injectable} from '@angular/core';
import {CIConfig} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class LibService {
  public config: any = {};

  constructor(ciConfig: CIConfig) {
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
      filters = 'n',
      placeholderBackground = '#f4f4f4',
      baseUrl = '/',
      presets,
      queryString = ''
    } = ciConfig;

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
      presets: presets ? this.getPresets(presets, 'presets') :
        {
          xs: 575,  // up to 576    PHONE
          sm: 767,  // 577 - 768    PHABLET
          md: 991,  // 769 - 992    TABLET
          lg: 1199, // 993 - 1200   SMALL_LAPTOP_SCREEN
          xl: 3000  // from 1200    USUALSCREEN
        },
      order: presets ? this.getPresets(presets, 'order') : ['xl', 'lg', 'md', 'sm', 'xs'],
      queryString,
      innerWidth: window.innerWidth,
      // isChrome: /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
    };
  }

  getPresets(value = '', type) {
    const splittedValues = value.split('|');
    const result = {presets: {}, order: []};

    for (let i = 0; i < splittedValues.length; i++) {
      const splittedParam = splittedValues[i] && splittedValues[i].split(':');
      const prop = splittedParam[0] && splittedParam[0].trim();
      const val = splittedParam[1] && splittedParam[1].trim();

      if (prop && val) {
        result.presets[prop] = val;
        result.order.unshift(prop);
      }
    }

    return result[type];
  }

  public getParentWidth(img, config) {
    if (!(img && img.parentElement && img.parentElement.getBoundingClientRect) && !(img && img.width)) {
      return config.width;
    }

    const parentContainer = this.getParentContainerWithWidth(img);
    const currentWidth = parseInt('' + parentContainer, 10);
    const computedWidth = Number(window.getComputedStyle(img).width);

    if ((computedWidth && (computedWidth < currentWidth && computedWidth > 15) || !currentWidth)) {
      return this.getSizeLimit(computedWidth);
    } else {
      if (!currentWidth) {
        return img.width || config.width;
      }

      return this.getSizeLimit(currentWidth);
    }
  }

  getParentContainerWithWidth(img) {
    let parentNode = null;
    let width = 0;

    do {
      parentNode = (parentNode && parentNode.parentNode) || img.parentNode;
      width = parentNode.getBoundingClientRect().width;
    } while (parentNode && !width);

    return width;
  }

  getSizeLimit(currentSize) {
    return currentSize <= 25 ? '25' :
      currentSize <= 50 ? '50' :
        currentSize <= 100 ? '100'
          : currentSize <= 200 ? '200'
          : currentSize <= 300 ? '300'
            : currentSize <= 400 ? '400'
              : currentSize <= 500 ? '500'
                : currentSize <= 600 ? '600'
                  : currentSize <= 700 ? '700'
                    : currentSize <= 800 ? '800'
                      : currentSize <= 900 ? '900'
                        : currentSize <= 1000 ? '1000'
                          : currentSize <= 1100 ? '1100'
                            : currentSize <= 1200 ? '1200'
                              : currentSize <= 1300 ? '1300'
                                : currentSize <= 1400 ? '1400'
                                  : currentSize <= 1500 ? '1500'
                                    : currentSize <= 1600 ? '1600'
                                      : currentSize <= 1700 ? '1700'
                                        : currentSize <= 1800 ? '1800'
                                          : currentSize <= 1900 ? '1900'
                                            : currentSize <= 2400 ? '2400'
                                              : currentSize <= 2800 ? '2800'
                                                : '3600';
  }

  public checkOnMedia(size) {
    return size && typeof size === 'object';
  }

  public checkIfRelativeUrlPath(src) {
    if (src.indexOf('//') === 0) {
      src = window.location.protocol + src;
    }
    return (src.indexOf('http://') !== 0 && src.indexOf('https://') !== 0 && src.indexOf('//') !== 0);
  }

  public getImgSrc(src, isRelativeUrlPath = false, baseUrl = '') {
    if (isRelativeUrlPath) {
      return baseUrl + src;
    }

    return src;
  }

  public getSizeAccordingToPixelRatio(size) {
    const splittedSizes = size.toString().split('x');
    const result = [];

    [].forEach.call(splittedSizes, item => {
      result.push(item * Math.round(window.devicePixelRatio || 1));
    });

    return result.join('x');
  }

  public generateUrl(operation, size, filters, imgSrc, config) {
    const {ultraFast, token, container, queryString} = config;
    const isUltraFast = ultraFast ? 'https://scaleflex.ultrafast.io/' : 'https://';
    const cloudUrl = isUltraFast + token + '.' + container + '/';

    return cloudUrl + operation + '/' + size + '/' + filters + '/' + imgSrc + queryString;
  }

  public generateSources(operation, size, filters, imgSrc, isAdaptive, config, isPreview) {
    const sources = [];

    if (isAdaptive) {
      const orderFiltered = [];

      for (let i = 0; i < config.order.length; i++) {
        const nextSize = size[config.order[i]];

        if (nextSize) {
          orderFiltered.unshift(config.order[i]);
        }
      }

      for (let i = 0; i < orderFiltered.length; i++) {
        const isLast = !(i < orderFiltered.length - 1);
        const nextSizeType = isLast ? orderFiltered[i - 1] : orderFiltered[i];
        let nextSize = size[orderFiltered[i]];

        if (isPreview) {
          nextSize = nextSize.split('x').map(item => item / 5).join('x');
        }

        const srcSet = this.generateSrcset(operation, nextSize, filters, imgSrc, config);
        const mediaQuery = '(' + (isLast ? 'min' : 'max') + '-width: ' + (config.presets[nextSizeType] + (isLast ? 1 : 0)) + 'px)';

        sources.push({mediaQuery, srcSet});
      }
    } else {
      sources.push({
        srcSet: this.generateSrcset(operation, size.split('x').map(item => item / 5).join('x'), 'q10.foil1', imgSrc, config)
      });
    }

    return sources;
  }

  generateSrcset(operation, size, filters, imgSrc, config) {
    const imgWidth = size.toString().split('x')[0];
    const imgHeight = size.toString().split('x')[1];

    return this.generateImgSrc(operation, filters, imgSrc, imgWidth, imgHeight, 1, config);
  }

  generateImgSrc(operation, filters, imgSrc, imgWidth, imgHeight, factor, config) {
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

  public getRatioBySize(size, config) {
    let width, height;

    if (typeof size === 'object') {
      const breakPoint = this.getBreakPoint(config);
      let orderIndex = config.order.indexOf(breakPoint);
      let breakPointSize = null;

      do {
        const nextBreakpoint = config.order[orderIndex];
        breakPointSize = size[nextBreakpoint];
        orderIndex--;
      } while (!breakPointSize && orderIndex >= 0);

      if (!breakPointSize) {
        let orderIndexStepTwo = config.order.indexOf(breakPoint);

        do {
          const nextBreakpoint = config.order[orderIndexStepTwo];
          breakPointSize = size[nextBreakpoint];
          orderIndexStepTwo++;
        } while (!breakPointSize && orderIndexStepTwo <= config.order.length);
      }

      width = breakPointSize.toString().split('x')[0];
      height = breakPointSize.toString().split('x')[1];
    } else {
      width = size.toString().split('x')[0];
      height = size.toString().split('x')[1];
    }

    if (width && height) {
      return width / height;
    }

    return null;
  }

  getBreakPoint(config) {
    const {presets, order} = config;
    const innerWidth = window.innerWidth;
    const prevBreakPointLimit = order.findIndex(item => presets[item] < innerWidth);

    return order[prevBreakPointLimit - 1] || order[prevBreakPointLimit] || order[order.length - 1];
  }
}
