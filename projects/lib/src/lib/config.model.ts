import { InjectionToken } from '@angular/core';

export const CI_CONFIG = new InjectionToken<CIConfig>('ci.config');

export interface CIConfig {
  token: string;
  domain: string;
  customDomain: boolean;
  lazyLoading: boolean;
  lazyLoadOffset: number;
  placeholderBackground: string;
  baseUrl: string; // to support old name
  baseURL: string;
  apiVersion: string;
  presets: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  ratio: number;
  params: string;
  imageSizeAttributes: 'use' | 'ignore' | 'take-ratio';
  exactSize: boolean;
  doNotReplaceURL: boolean;
  limitFactor: number;
  devicePixelRatioList: number[];
  lowQualityPreview: {
    minImgWidth: number;
  };
  autoAlt: boolean;
  delay: number;
}
