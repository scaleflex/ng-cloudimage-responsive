import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { CONSTANTS, processParams } from 'cloudimage-responsive-utils';
import { CIConfig, CI_CONFIG } from './config.model';

@Injectable({
  providedIn: 'root',
})
export class CIService {
  isSsr = false;
  config: {
    token: string;
    domain: string | true;
    customDomain: boolean;
    lazyLoading: boolean;
    lazyLoadOffset: number;
    placeholderBackground: string;
    baseURL: string;
    apiVersion: string;
    presets: { xs: string; sm: string; md: string; lg: string; xl: string };
    ratio: number;
    params: any;
    imageSizeAttributes: string;
    exactSize: boolean;
    doNotReplaceURL: boolean;
    limitFactor: number;
    devicePixelRatioList: number[];
    previewQualityFactor: number;
    minLowQualityWidth: number;
    delay: number;
  } = {} as any;

  constructor(
    @Inject(CI_CONFIG) ciConfig: CIConfig,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isSsr = isPlatformServer(this.platformId);

    const {
      token = '',
      domain = ciConfig.customDomain ? ciConfig.customDomain : 'cloudimg.io',
      customDomain = false,
      lazyLoading = true,
      lazyLoadOffset = 100,
      placeholderBackground = '#f4f4f4',
      baseUrl,
      baseURL,
      apiVersion = 'v7',
      presets,
      ratio = 1.5,
      params = 'org_if_sml=1',
      imageSizeAttributes = 'use',
      exactSize = false,
      doNotReplaceURL = false,
      limitFactor = 100,
      devicePixelRatioList = CONSTANTS.DEVICE_PIXEL_RATIO_LIST,
      lowQualityPreview: { minImgWidth = 250 } = {},
      delay,
    } = ciConfig;

    this.config = {
      token,
      domain,
      customDomain,
      lazyLoading,
      lazyLoadOffset,
      placeholderBackground,
      baseURL: baseUrl || baseURL,
      ratio,
      exactSize,
      presets: presets
        ? presets
        : {
            xs: '(max-width: 575px)', // to 575       PHONE
            sm: '(min-width: 576px)', // 576 - 767    PHABLET
            md: '(min-width: 768px)', // 768 - 991    TABLET
            lg: '(min-width: 992px)', // 992 - 1199   SMALL_LAPTOP_SCREEN
            xl: '(min-width: 1200px)', // from 1200    USUALSCREEN
          },
      params: processParams(params),
      apiVersion,
      previewQualityFactor: 10,
      doNotReplaceURL,
      devicePixelRatioList,
      limitFactor,
      minLowQualityWidth: minImgWidth,
      imageSizeAttributes,
      delay,
    };
  }

  getWindowInnerWidth(): number {
    return this.isSsr ? 1000 : window.innerWidth;
  }
}
