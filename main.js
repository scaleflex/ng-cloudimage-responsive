(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../dist/lib/fesm5/ng-cloudimage-responsive.js":
/*!**********************************************************************************************!*\
  !*** /Users/dmitry/2019/ng-cloudimage-responsive/dist/lib/fesm5/ng-cloudimage-responsive.js ***!
  \**********************************************************************************************/
/*! exports provided: CIService, CIConfig, CIModule, ImgComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CIService", function() { return CIService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CIConfig", function() { return CIConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CIModule", function() { return CIModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImgComponent", function() { return ImgComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-lazyload-image */ "../../node_modules/ng-lazyload-image/index.js");








/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CIConfig = /** @class */ (function () {
    function CIConfig() {
    }
    return CIConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CIService = /** @class */ (function () {
    function CIService(ciConfig) {
        this.config = {};
        var _a = ciConfig.token, token = _a === void 0 ? '' : _a, _b = ciConfig.container, container = _b === void 0 ? 'cloudimg.io' : _b, _c = ciConfig.ultraFast, ultraFast = _c === void 0 ? false : _c, _d = ciConfig.lazyLoading, lazyLoading = _d === void 0 ? true : _d, _e = ciConfig.imgLoadingAnimation, imgLoadingAnimation = _e === void 0 ? true : _e, _f = ciConfig.lazyLoadOffset, lazyLoadOffset = _f === void 0 ? 100 : _f, _g = ciConfig.width, width = _g === void 0 ? '400' : _g, _h = ciConfig.height, height = _h === void 0 ? '300' : _h, _j = ciConfig.operation, operation = _j === void 0 ? 'width' : _j, _k = ciConfig.filters, filters = _k === void 0 ? 'n' : _k, _l = ciConfig.placeholderBackground, placeholderBackground = _l === void 0 ? '#f4f4f4' : _l, _m = ciConfig.baseUrl, baseUrl = _m === void 0 ? '/' : _m, presets = ciConfig.presets, _o = ciConfig.queryString, queryString = _o === void 0 ? '' : _o;
        this.config = {
            token: token,
            container: container,
            ultraFast: ultraFast,
            lazyLoading: lazyLoading,
            imgLoadingAnimation: imgLoadingAnimation,
            lazyLoadOffset: lazyLoadOffset,
            width: width,
            height: height,
            operation: operation,
            filters: filters,
            placeholderBackground: placeholderBackground,
            baseUrl: baseUrl,
            presets: presets ? this.getPresets(presets, 'presets') :
                {
                    xs: 575,
                    // up to 576    PHONE
                    sm: 767,
                    // 577 - 768    PHABLET
                    md: 991,
                    // 769 - 992    TABLET
                    lg: 1199,
                    // 993 - 1200   SMALL_LAPTOP_SCREEN
                    xl: 3000 // from 1200    USUALSCREEN
                },
            order: presets ? this.getPresets(presets, 'order') : ['xl', 'lg', 'md', 'sm', 'xs'],
            queryString: queryString,
            innerWidth: window.innerWidth,
        };
    }
    /**
     * @param {?=} value
     * @param {?=} type
     * @return {?}
     */
    CIService.prototype.getPresets = /**
     * @param {?=} value
     * @param {?=} type
     * @return {?}
     */
    function (value, type) {
        if (value === void 0) { value = ''; }
        /** @type {?} */
        var splittedValues = value.split('|');
        /** @type {?} */
        var result = { presets: {}, order: [] };
        for (var i = 0; i < splittedValues.length; i++) {
            /** @type {?} */
            var splittedParam = splittedValues[i] && splittedValues[i].split(':');
            /** @type {?} */
            var prop = splittedParam[0] && splittedParam[0].trim();
            /** @type {?} */
            var val = splittedParam[1] && splittedParam[1].trim();
            if (prop && val) {
                result.presets[prop] = val;
                result.order.unshift(prop);
            }
        }
        return result[type];
    };
    /**
     * @param {?} img
     * @param {?} config
     * @return {?}
     */
    CIService.prototype.getParentWidth = /**
     * @param {?} img
     * @param {?} config
     * @return {?}
     */
    function (img, config) {
        if (!(img && img.parentElement && img.parentElement.getBoundingClientRect) && !(img && img.width)) {
            return config.width;
        }
        /** @type {?} */
        var parentContainer = this.getParentContainerWithWidth(img);
        /** @type {?} */
        var currentWidth = parseInt('' + parentContainer, 10);
        /** @type {?} */
        var computedWidth = Number(window.getComputedStyle(img).width);
        if ((computedWidth && (computedWidth < currentWidth && computedWidth > 15) || !currentWidth)) {
            return this.getSizeLimit(computedWidth);
        }
        else {
            if (!currentWidth) {
                return img.width || config.width;
            }
            return this.getSizeLimit(currentWidth);
        }
    };
    /**
     * @param {?} img
     * @return {?}
     */
    CIService.prototype.getParentContainerWithWidth = /**
     * @param {?} img
     * @return {?}
     */
    function (img) {
        /** @type {?} */
        var parentNode = null;
        /** @type {?} */
        var width = 0;
        do {
            parentNode = (parentNode && parentNode.parentNode) || img.parentNode;
            width = parentNode.getBoundingClientRect().width;
        } while (parentNode && !width);
        return width;
    };
    /**
     * @param {?} currentSize
     * @return {?}
     */
    CIService.prototype.getSizeLimit = /**
     * @param {?} currentSize
     * @return {?}
     */
    function (currentSize) {
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
    };
    /**
     * @param {?} size
     * @return {?}
     */
    CIService.prototype.checkOnMedia = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        return size && typeof size === 'object';
    };
    /**
     * @param {?} src
     * @return {?}
     */
    CIService.prototype.checkIfRelativeUrlPath = /**
     * @param {?} src
     * @return {?}
     */
    function (src) {
        if (src.indexOf('//') === 0) {
            src = window.location.protocol + src;
        }
        return (src.indexOf('http://') !== 0 && src.indexOf('https://') !== 0 && src.indexOf('//') !== 0);
    };
    /**
     * @param {?} src
     * @param {?=} isRelativeUrlPath
     * @param {?=} baseUrl
     * @return {?}
     */
    CIService.prototype.getImgSrc = /**
     * @param {?} src
     * @param {?=} isRelativeUrlPath
     * @param {?=} baseUrl
     * @return {?}
     */
    function (src, isRelativeUrlPath, baseUrl) {
        if (isRelativeUrlPath === void 0) { isRelativeUrlPath = false; }
        if (baseUrl === void 0) { baseUrl = ''; }
        if (isRelativeUrlPath) {
            return baseUrl + src;
        }
        return src;
    };
    /**
     * @param {?} size
     * @return {?}
     */
    CIService.prototype.getSizeAccordingToPixelRatio = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        /** @type {?} */
        var splittedSizes = size.toString().split('x');
        /** @type {?} */
        var result = [];
        [].forEach.call(splittedSizes, function (item) {
            result.push(item * Math.round(window.devicePixelRatio || 1));
        });
        return result.join('x');
    };
    /**
     * @param {?} operation
     * @param {?} size
     * @param {?} filters
     * @param {?} imgSrc
     * @param {?} config
     * @return {?}
     */
    CIService.prototype.generateUrl = /**
     * @param {?} operation
     * @param {?} size
     * @param {?} filters
     * @param {?} imgSrc
     * @param {?} config
     * @return {?}
     */
    function (operation, size, filters, imgSrc, config) {
        var ultraFast = config.ultraFast, token = config.token, container = config.container, queryString = config.queryString;
        /** @type {?} */
        var isUltraFast = ultraFast ? 'https://scaleflex.ultrafast.io/' : 'https://';
        /** @type {?} */
        var cloudUrl = isUltraFast + token + '.' + container + '/';
        return cloudUrl + operation + '/' + size + '/' + filters + '/' + imgSrc + queryString;
    };
    /**
     * @param {?} operation
     * @param {?} size
     * @param {?} filters
     * @param {?} imgSrc
     * @param {?} isAdaptive
     * @param {?} config
     * @param {?} isPreview
     * @return {?}
     */
    CIService.prototype.generateSources = /**
     * @param {?} operation
     * @param {?} size
     * @param {?} filters
     * @param {?} imgSrc
     * @param {?} isAdaptive
     * @param {?} config
     * @param {?} isPreview
     * @return {?}
     */
    function (operation, size, filters, imgSrc, isAdaptive, config, isPreview) {
        /** @type {?} */
        var sources = [];
        if (isAdaptive) {
            /** @type {?} */
            var orderFiltered = [];
            for (var i = 0; i < config.order.length; i++) {
                /** @type {?} */
                var nextSize = size[config.order[i]];
                if (nextSize) {
                    orderFiltered.unshift(config.order[i]);
                }
            }
            for (var i = 0; i < orderFiltered.length; i++) {
                /** @type {?} */
                var isLast = !(i < orderFiltered.length - 1);
                /** @type {?} */
                var nextSizeType = isLast ? orderFiltered[i - 1] : orderFiltered[i];
                /** @type {?} */
                var nextSize = size[orderFiltered[i]];
                if (isPreview) {
                    nextSize = nextSize.split('x').map(function (item) { return item / 5; }).join('x');
                }
                /** @type {?} */
                var srcSet = this.generateSrcset(operation, nextSize, filters, imgSrc, config);
                /** @type {?} */
                var mediaQuery = '(' + (isLast ? 'min' : 'max') + '-width: ' + (config.presets[nextSizeType] + (isLast ? 1 : 0)) + 'px)';
                sources.push({ mediaQuery: mediaQuery, srcSet: srcSet });
            }
        }
        else {
            sources.push({
                srcSet: this.generateSrcset(operation, size.split('x').map(function (item) { return item / 5; }).join('x'), 'q10.foil1', imgSrc, config)
            });
        }
        return sources;
    };
    /**
     * @param {?} operation
     * @param {?} size
     * @param {?} filters
     * @param {?} imgSrc
     * @param {?} config
     * @return {?}
     */
    CIService.prototype.generateSrcset = /**
     * @param {?} operation
     * @param {?} size
     * @param {?} filters
     * @param {?} imgSrc
     * @param {?} config
     * @return {?}
     */
    function (operation, size, filters, imgSrc, config) {
        /** @type {?} */
        var imgWidth = size.toString().split('x')[0];
        /** @type {?} */
        var imgHeight = size.toString().split('x')[1];
        return this.generateImgSrc(operation, filters, imgSrc, imgWidth, imgHeight, 1, config);
    };
    /**
     * @param {?} operation
     * @param {?} filters
     * @param {?} imgSrc
     * @param {?} imgWidth
     * @param {?} imgHeight
     * @param {?} factor
     * @param {?} config
     * @return {?}
     */
    CIService.prototype.generateImgSrc = /**
     * @param {?} operation
     * @param {?} filters
     * @param {?} imgSrc
     * @param {?} imgWidth
     * @param {?} imgHeight
     * @param {?} factor
     * @param {?} config
     * @return {?}
     */
    function (operation, filters, imgSrc, imgWidth, imgHeight, factor, config) {
        /** @type {?} */
        var imgSize = '' + Math.trunc(imgWidth * factor);
        if (imgHeight) {
            imgSize += 'x' + Math.trunc(imgHeight * factor);
        }
        return this.generateUrl(operation, this.getSizeAccordingToPixelRatio(imgSize), filters, imgSrc, config)
            .replace('http://scaleflex.ultrafast.io/', '')
            .replace('https://scaleflex.ultrafast.io/', '')
            .replace('//scaleflex.ultrafast.io/', '')
            .replace('///', '/');
    };
    /**
     * @param {?} size
     * @param {?} config
     * @return {?}
     */
    CIService.prototype.getRatioBySize = /**
     * @param {?} size
     * @param {?} config
     * @return {?}
     */
    function (size, config) {
        /** @type {?} */
        var width;
        /** @type {?} */
        var height;
        if (typeof size === 'object') {
            /** @type {?} */
            var breakPoint = this.getBreakPoint(config);
            /** @type {?} */
            var orderIndex = config.order.indexOf(breakPoint);
            /** @type {?} */
            var breakPointSize = null;
            do {
                /** @type {?} */
                var nextBreakpoint = config.order[orderIndex];
                breakPointSize = size[nextBreakpoint];
                orderIndex--;
            } while (!breakPointSize && orderIndex >= 0);
            if (!breakPointSize) {
                /** @type {?} */
                var orderIndexStepTwo = config.order.indexOf(breakPoint);
                do {
                    /** @type {?} */
                    var nextBreakpoint = config.order[orderIndexStepTwo];
                    breakPointSize = size[nextBreakpoint];
                    orderIndexStepTwo++;
                } while (!breakPointSize && orderIndexStepTwo <= config.order.length);
            }
            width = breakPointSize.toString().split('x')[0];
            height = breakPointSize.toString().split('x')[1];
        }
        else {
            width = size.toString().split('x')[0];
            height = size.toString().split('x')[1];
        }
        if (width && height) {
            return width / height;
        }
        return null;
    };
    /**
     * @param {?} config
     * @return {?}
     */
    CIService.prototype.getBreakPoint = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var presets = config.presets, order = config.order;
        /** @type {?} */
        var innerWidth = window.innerWidth;
        /** @type {?} */
        var prevBreakPointLimit = order.findIndex(function (item) { return presets[item] < innerWidth; });
        return order[prevBreakPointLimit - 1] || order[prevBreakPointLimit] || order[order.length - 1];
    };
    CIService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    CIService.ctorParameters = function () { return [
        { type: CIConfig }
    ]; };
    /** @nocollapse */ CIService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["defineInjectable"])({ factory: function CIService_Factory() { return new CIService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["inject"])(CIConfig)); }, token: CIService, providedIn: "root" });
    return CIService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ImgComponent = /** @class */ (function () {
    function ImgComponent(ciService, _sanitizer) {
        this.ciService = ciService;
        this._sanitizer = _sanitizer;
        this.offset = 100;
        this.cloudimageUrl = '';
        this.sources = [];
        this.isLoaded = false;
        this.isProcessed = false;
        this.windowInnerWidth = window.innerWidth;
        this.lazyLoading = ciService.config.lazyLoading;
    }
    /**
     * @return {?}
     */
    ImgComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.resizeSubscription$.unsubscribe();
    };
    /**
     * @return {?}
     */
    ImgComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.resizeObservable$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["fromEvent"])(window, 'resize').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["debounceTime"])(500));
        this.resizeSubscription$ = this.resizeObservable$.subscribe(function () {
            if (_this.isAdaptive) {
                _this.processImage();
            }
            else if (_this.windowInnerWidth < window.innerWidth) {
                _this.processImage();
            }
            _this.windowInnerWidth = window.innerWidth;
        });
    };
    /**
     * @return {?}
     */
    ImgComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.processImage();
    };
    /**
     * @return {?}
     */
    ImgComponent.prototype.processImage = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var imgNode = (this.imgElem || this.pictureElem).nativeElement;
        var config = this.ciService.config;
        /** @type {?} */
        var operation = this.operation || this.o || config.operation;
        /** @type {?} */
        var parentContainerWidth = this.ciService.getParentWidth(imgNode, config);
        /** @type {?} */
        var size = this.size || this.s || config.size || parentContainerWidth;
        /** @type {?} */
        var filters = this.filters || this.f || config.filters;
        /** @type {?} */
        var isAdaptive = this.ciService.checkOnMedia(size);
        /** @type {?} */
        var isRelativeUrlPath = this.ciService.checkIfRelativeUrlPath(this.src);
        /** @type {?} */
        var imgSrc = this.ciService.getImgSrc(this.src, isRelativeUrlPath, config.baseUrl);
        /** @type {?} */
        var resultSize = isAdaptive ? size : this.ciService.getSizeAccordingToPixelRatio(size);
        this.isPreview = !config.isChrome && (parentContainerWidth > 400) && config.lazyLoading;
        this.cloudimageUrl = isAdaptive ?
            this.ciService.generateUrl('width', parentContainerWidth, filters, imgSrc, config) :
            this.ciService.generateUrl(operation, resultSize, filters, imgSrc, config);
        this.sources = isAdaptive ?
            this.ciService.generateSources(operation, resultSize, filters, imgSrc, isAdaptive, config, false) : [];
        /** @type {?} */
        var previewCloudimageUrl;
        /** @type {?} */
        var previewSources;
        if (this.isPreview) {
            /** @type {?} */
            var previewConfig = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, config, { queryString: '' });
            previewCloudimageUrl = isAdaptive ?
                this.ciService.generateUrl('width', (parentContainerWidth / 5), 'q10.foil1', imgSrc, previewConfig) :
                this.ciService.generateUrl(operation, resultSize.split('x').map(function (item) { return item / 5; }).join('x'), 'q10.foil1', imgSrc, previewConfig);
            previewSources = isAdaptive ?
                this.ciService.generateSources(operation, resultSize, 'q10.foil1', imgSrc, isAdaptive, previewConfig, true) : [];
        }
        this.previewCloudimageUrl = previewCloudimageUrl;
        this.previewSources = previewSources;
        this.isAdaptive = isAdaptive;
        this.actualSize = size;
        this.parentContainerWidth = parentContainerWidth;
        /** @type {?} */
        var ratioBySize = this.ciService.getRatioBySize(size, config);
        this.imageHeight = Math.floor(parentContainerWidth / (ratioBySize || this.ratio || 1.5));
        this.isRatio = !!(ratioBySize || this.ratio);
        this.ratioBySize = ratioBySize;
        setTimeout(function () {
            _this.isProcessed = true;
        });
    };
    /**
     * @return {?}
     */
    ImgComponent.prototype.onImageLoad = /**
     * @return {?}
     */
    function () {
        if (!this.isPreview) {
            this.isPreviewLoaded = true;
            this.isLoaded = true;
        }
        else if (this.isPreviewLoaded) {
            this.isLoaded = true;
        }
        else {
            this.isPreviewLoaded = true;
        }
    };
    /**
     * @return {?}
     */
    ImgComponent.prototype.getPositionStyle = /**
     * @return {?}
     */
    function () {
        return this._sanitizer.bypassSecurityTrustStyle(this.isRatio ? 'absolute' : 'relative');
    };
    /**
     * @return {?}
     */
    ImgComponent.prototype.getImgHeight = /**
     * @return {?}
     */
    function () {
        return this._sanitizer.bypassSecurityTrustStyle(this.isRatio ? '100%' : 'auto');
    };
    /**
     * @return {?}
     */
    ImgComponent.prototype.getTransformStyle = /**
     * @return {?}
     */
    function () {
        var config = this.ciService.config;
        /** @type {?} */
        var result = 'none';
        if (config.imgLoadingAnimation) {
            result = 'scale3d(1.1, 1.1, 1)';
        }
        if (this.isLoaded && config.imgLoadingAnimation) {
            result = 'translateZ(0) scale3d(1, 1, 1)';
        }
        return this._sanitizer.bypassSecurityTrustStyle(result);
    };
    /**
     * @return {?}
     */
    ImgComponent.prototype.getTransitionStyle = /**
     * @return {?}
     */
    function () {
        var config = this.ciService.config;
        /** @type {?} */
        var result = 'none';
        if (this.isLoaded && config.imgLoadingAnimation) {
            result = 'all 0.3s ease-in-out';
        }
        return this._sanitizer.bypassSecurityTrustStyle(result);
    };
    /**
     * @return {?}
     */
    ImgComponent.prototype.getFilterStyle = /**
     * @return {?}
     */
    function () {
        var config = this.ciService.config;
        /** @type {?} */
        var result = 'none';
        if (config.imgLoadingAnimation) {
            result = "blur(" + Math.floor(parseInt(this.parentContainerWidth, 10) / 100) + "px)";
        }
        if (this.isLoaded && config.imgLoadingAnimation) {
            result = 'blur(0px)';
        }
        return this._sanitizer.bypassSecurityTrustStyle(result);
    };
    /**
     * @return {?}
     */
    ImgComponent.prototype.getPicturePaddingBottom = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var result = '';
        if (this.isRatio) {
            result = (100 / (this.ratioBySize || this.ratio)) + '%';
        }
        return this._sanitizer.bypassSecurityTrustStyle(result);
    };
    /**
     * @return {?}
     */
    ImgComponent.prototype.getPictureBackground = /**
     * @return {?}
     */
    function () {
        var config = this.ciService.config;
        /** @type {?} */
        var result = 'transparent';
        if (this.isRatio) {
            result = config.placeholderBackground;
        }
        return this._sanitizer.bypassSecurityTrustStyle(result);
    };
    ImgComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"], args: [{
                    selector: 'ci-img',
                    template: "\n    <picture #pictureElem *ngIf=\"!isProcessed\"></picture>\n\n    <ng-container [ngSwitch]=\"lazyLoading\">\n      <ng-container *ngSwitchCase=\"true\">\n        <picture\n          class=\"{{class + ' cloudimage-image-picture cloudimage-image-' + (isLoaded ? 'loaded' : 'loading')}}\"\n          style=\"display:block;width:100%;overflow:hidden;position:relative;\"\n          [style.paddingBottom]=\"getPicturePaddingBottom()\"\n          [style.background]=\"getPictureBackground()\"\n          #imgElem\n          *ngIf=\"isProcessed\">\n          <source\n            *ngFor=\"let source of (!isPreview ? sources : (isPreviewLoaded ? sources : previewSources))\"\n            [media]=\"source.mediaQuery || ''\"\n            [attr.lazyLoad]=\"source.srcSet || ''\"\n            [srcset]=\"source.srcSet || ''\"\n            (load)=\"onImageLoad()\"\n          />\n          <img\n            style=\"display:block;width:100%;opacity:1;top:0;left:0;\"\n            [style.position]=\"getPositionStyle()\"\n            [style.height]=\"getImgHeight()\"\n            [style.transform]=\"getTransformStyle()\"\n            [style.transition]=\"getTransitionStyle()\"\n            [style.filter]=\"getFilterStyle()\"\n            (load)=\"onImageLoad()\"\n            [lazyLoad]=\"!isPreview ? cloudimageUrl : (isPreviewLoaded ? cloudimageUrl : previewCloudimageUrl)\"\n            [offset]=\"offset\"\n            [alt]=\"\">\n        </picture>\n      </ng-container>\n      <div *ngSwitchCase=\"false\">\n        <picture\n          class=\"{{class + ' cloudimage-image-picture cloudimage-image-' + (isLoaded ? 'loaded' : 'loading')}}\"\n          style=\"display:block;width:100%;overflow:hidden;position:relative;\"\n          [style.paddingBottom]=\"getPicturePaddingBottom()\"\n          [style.background]=\"getPictureBackground()\"\n          #imgElem\n          *ngIf=\"isProcessed\">\n          <source\n            *ngFor=\"let source of (!isPreview ? sources : (isPreviewLoaded ? sources : previewSources))\"\n            [media]=\"source.mediaQuery || ''\"\n            [srcset]=\"source.srcSet || ''\"\n            (load)=\"onImageLoad()\"\n          />\n          <img\n            style=\"display:block;width:100%;opacity:1;top:0;left:0;\"\n            [style.position]=\"getPositionStyle()\"\n            [style.height]=\"getImgHeight()\"\n            [style.transform]=\"getTransformStyle()\"\n            [style.transition]=\"getTransitionStyle()\"\n            [style.filter]=\"getFilterStyle()\"\n            (load)=\"onImageLoad()\"\n            [src]=\"!isPreview ? cloudimageUrl : (isPreviewLoaded ? cloudimageUrl : previewCloudimageUrl)\"\n            [alt]=\"\">\n        </picture>\n      </div>\n    </ng-container>\n  "
                }] }
    ];
    /** @nocollapse */
    ImgComponent.ctorParameters = function () { return [
        { type: CIService },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"] }
    ]; };
    ImgComponent.propDecorators = {
        imgElem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"], args: ['imgElem',] }],
        pictureElem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"], args: ['pictureElem',] }],
        src: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        class: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        alt: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        operation: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        o: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        size: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        s: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        filters: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        f: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        ratio: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        offset: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        ngSwitch: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }]
    };
    return ImgComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CIModule = /** @class */ (function () {
    function CIModule() {
    }
    CIModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"], args: [{
                    declarations: [ImgComponent],
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], ng_lazyload_image__WEBPACK_IMPORTED_MODULE_6__["LazyLoadImageModule"]],
                    exports: [ImgComponent],
                    providers: []
                },] }
    ];
    return CIModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=ng-cloudimage-responsive.js.map

/***/ }),

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "body {\n  font-size: 18px;\n}\n\n.logo {\n  display: inline;\n  width: auto;\n  height: 40px;\n  position: relative;\n  top: -3px;\n}\n\n.container h1 {\n  margin-top: 40px;\n}\n\n.container h1 + p {\n  color: #ababab;\n  font-size: 22px;\n}\n\np.description {\n  margin-top: 10px;\n}\n\np.numbers {\n  font-size: 16px;\n  color: #4b4b4b;\n}\n\n@media (max-width: 767px) {\n  .desc-wrapper-with-media-query {\n    margin-top: 20px;\n  }\n}\n\ndiv.images-in-columns div {\n  margin-bottom: 15px;\n  font-size: 14px;\n}\n\npre {\n  padding: 1.5rem;\n  margin-right: 0;\n  margin-left: 0;\n  border-width: .2rem;\n  margin: 1rem -15px 0;\n  border: solid #f8f9fa;\n}\n\npre p {\n  margin: 0;\n  padding: 0;\n}\n\nimg {\n  width: 100%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2V4YW1wbGUvc3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFnQjtDQUNqQjs7QUFFRDtFQUNFLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixVQUFVO0NBQ1g7O0FBRUQ7RUFDRSxpQkFBaUI7Q0FDbEI7O0FBRUQ7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0NBQ2pCOztBQUVEO0VBQ0UsaUJBQWlCO0NBQ2xCOztBQUVEO0VBQ0UsZ0JBQWdCO0VBQ2hCLGVBQWU7Q0FDaEI7O0FBRUQ7RUFDRTtJQUNFLGlCQUFpQjtHQUNsQjtDQUNGOztBQUVEO0VBQ0Usb0JBQW9CO0VBQ3BCLGdCQUFnQjtDQUNqQjs7QUFFRDtFQUNFLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLG9CQUFvQjtFQUNwQixxQkFBcUI7RUFDckIsc0JBQXNCO0NBQ3ZCOztBQUVEO0VBQ0UsVUFBVTtFQUNWLFdBQVc7Q0FDWjs7QUFFRDtFQUNFLFlBQVk7Q0FDYiIsImZpbGUiOiJwcm9qZWN0cy9leGFtcGxlL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJib2R5IHtcbiAgZm9udC1zaXplOiAxOHB4O1xufVxuXG4ubG9nbyB7XG4gIGRpc3BsYXk6IGlubGluZTtcbiAgd2lkdGg6IGF1dG87XG4gIGhlaWdodDogNDBweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0b3A6IC0zcHg7XG59XG5cbi5jb250YWluZXIgaDEge1xuICBtYXJnaW4tdG9wOiA0MHB4O1xufVxuXG4uY29udGFpbmVyIGgxICsgcCB7XG4gIGNvbG9yOiAjYWJhYmFiO1xuICBmb250LXNpemU6IDIycHg7XG59XG5cbnAuZGVzY3JpcHRpb24ge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xufVxuXG5wLm51bWJlcnMge1xuICBmb250LXNpemU6IDE2cHg7XG4gIGNvbG9yOiAjNGI0YjRiO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgLmRlc2Mtd3JhcHBlci13aXRoLW1lZGlhLXF1ZXJ5IHtcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xuICB9XG59XG5cbmRpdi5pbWFnZXMtaW4tY29sdW1ucyBkaXYge1xuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cbnByZSB7XG4gIHBhZGRpbmc6IDEuNXJlbTtcbiAgbWFyZ2luLXJpZ2h0OiAwO1xuICBtYXJnaW4tbGVmdDogMDtcbiAgYm9yZGVyLXdpZHRoOiAuMnJlbTtcbiAgbWFyZ2luOiAxcmVtIC0xNXB4IDA7XG4gIGJvcmRlcjogc29saWQgI2Y4ZjlmYTtcbn1cblxucHJlIHAge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG59XG5cbmltZyB7XG4gIHdpZHRoOiAxMDAlO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <h1>\n    Cloudimage Angular Plugin\n    <img\n      class=\"logo\"\n      src=\"https://think360studio.com/wp-content/uploads/2016/03/angular-js-icon.svg\"\n      alt=\"Angular logo\"\n      height=\"40px\">\n  </h1>\n  <p>Cloudimage Responsive plugin\n    will <strong>resize</strong>, <strong>compress</strong> and <strong>accelerate</strong> images across the World\n    in your <b>Angular</b> application. It leverages the HTML5 &lt;picture&gt; and &lt;srcset&gt; elements to deliver\n    the right image size based on the client's <strong>screen size</strong> and <strong>pixel ratio</strong> (retina\n    vs non-retina). You can find the full extend of image operations in the Cloudimage documentation\n    <a href=\"https://docs.cloudimage.io/go/cloudimage-documentation/en/operations/\"> here</a>.</p>\n\n  <h3 style=\"margin-top:40px;margin-bottom:20px;\">\n    I. Responsive mode, according to image container size\n  </h3>\n</div>\n\n<ci-img [src]=\"images[0].src\" [ratio]=\"images[0].ratio\"></ci-img>\n\n<div class=\"container\">\n      <pre><code>\n        <p>&lt;ci-img [src]=\"images[0].src\" [ratio]=\"images[0].ratio\"/&gt;</p>\n      </code></pre>\n\n  <p class=\"description\">\n    In this example, image width equals to browser window screen width and is used for calculations.\n    Image will be downloaded according to the closest limit (25px, 50px, 100px, 100px * n ). Limit is used for cache\n    reasons.\n  </p>\n\n  Let's see the numbers:<br/>\n\n  <p class=\"numbers\">\n    <b>original image:</b> <i>4.8mb</i> <a href=\"https://cloudimage.public.airstore.io/demo/magnus-lindvall.jpg\"\n                                           target=\"_blank\"> link</a><br/>\n    mobile sizes:<br/>\n    <b>400px screen</b> with 1x pixel ratio: <i>31.5kb</i> <a\n    href=\"https://demo.cloudimg.io/width/400/q80.foil1/https://cloudimage.public.airstore.io/demo/magnus-lindvall.jpg\"\n    target=\"_blank\"> link</a><br/>\n    <b>400px screen</b> with 2x(Retina) pixel ratio: <i>105kb</i> <a\n    href=\"https://demo.cloudimg.io/width/800/q80.foil1/https://cloudimage.public.airstore.io/demo/magnus-lindvall.jpg\"\n    target=\"_blank\"> link</a><br/>\n    laptop sizes:<br/>\n    <b>1400px screen</b> with 1x pixel ratio: <i>300kb</i> <a\n    href=\"https://demo.cloudimg.io/width/1400/q80.foil1/https://cloudimage.public.airstore.io/demo/magnus-lindvall.jpg\"\n    target=\"_blank\"> link</a><br/>\n    <b>1400px screen</b> with 2x(Retina) pixel ratio: <i>1mb</i> <a\n    href=\"https://demo.cloudimg.io/width/2800/q80.foil1/https://cloudimage.public.airstore.io/demo/magnus-lindvall.jpg\"\n    target=\"_blank\"> link</a><br/>\n  </p>\n\n  <p class=\"description\" style=\"margin-top:15px;\">\n    In the examples below, the images will be downloaded according to the closest limit for their container\n  </p>\n\n  <div class=\"row images-in-columns\">\n    <div class=\"col-12\">\n      <ci-img [src]=\"images[8].src\" [ratio]=\"images[8].ratio\"></ci-img>\n    </div>\n\n    <div *ngFor=\"let image of images.slice(1, 7)\" class=\"col-6\">\n      <ci-img [src]=\"image.src\" [ratio]=\"image.ratio\"></ci-img>\n      original: <i>{{image.original_size}}</i>\n        <a href=\"{{'https://cloudimage.public.airstore.io/demo/' + image.src}}\" target=\"_blank\"> link</a><br/>\n    </div>\n  </div>\n\n  <h3 style=\"margin-top:40px;margin-bottom:20px;\">\n    II. Manual mode\n  </h3>\n\n  <div class=\"row\">\n    <div class=\"col-md-6 col-lg-7\">\n      <ci-img\n        [src]=\"images[18].src\"\n        [operation]=\"'crop'\"\n        [size]=\"{ xl: '1600x1000', lg: '1400x1200', md: '1000x1350', sm: '800x400' }\"\n      ></ci-img>\n      <small>\n        original: <i>{{images[18].original_size}}</i> <a\n        href=\"{{'https://cloudimage.public.airstore.io/demo/' + images[18].src}}\" target=\"_blank\"> link</a><br/>\n      </small>\n    </div>\n    <div class=\"col-md-6 col-lg-5 desc-wrapper-with-media-query\">\n      <h4>You can control your image size/ratio/crop with media query breakpoints</h4>\n      <p>Resize your browser window to see how it works</p>\n      <pre><code>\n&lt;ci-img\n  operation=\"crop\"\n  [src]=\"images[18].src\"\n  [size]=\"&#123;\n    xl: '1600x1000',\n    lg: '1400x1200',\n    md: '1000x1350',\n    sm: '800x400'\n  &#125;\"\n&lt;/ci-img&gt;\n      </code></pre>\n    </div>\n  </div>\n\n  <div style=\"margin-top:40px;\">\n    <h4>Any questions?</h4>\n    <p>Contact us at <a href=\"mailto:hello@cloudimage.io\">hello@cloudimage.io</a>, our image resizing experts will be happy to help!</p>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.images = [
            {
                src: 'magnus-lindvall.jpg',
                ratio: 4.896 / 3.264,
                original_size: '4.8mb'
            },
            {
                src: 'alain.jpg',
                ratio: 6 / 4,
                original_size: '5.8mb'
            },
            {
                src: 'ameen-fahmy.jpg',
                ratio: 2.926 / 1.953,
                original_size: '0.5mb'
            },
            {
                src: 'dino-reichmuth-9.jpg',
                ratio: 6.616 / 3.744,
                original_size: '9.7mb'
            },
            {
                src: 'ishan-seefromthesky.jpg',
                ratio: 5.464 / 3.070,
                original_size: '4.2mb'
            },
            {
                src: 'dino-reichmuth.jpg',
                ratio: 7.833 / 5.304,
                original_size: '11.9mb'
            },
            {
                src: 'inma-lesielle.jpg',
                ratio: 4.032 / 2.688,
                original_size: '3.0mb'
            },
            {
                src: 'jeremy-thomas.jpg',
                ratio: 5.005 / 3.417,
                original_size: '5.2mb'
            },
            {
                src: 'jordan-hubbard.jpg',
                ratio: 5 / 3.333,
                original_size: '3.0mb'
            },
            {
                src: 'jp-valery.jpg',
                ratio: 5.472 / 3.648,
                original_size: '2.2mb'
            },
            {
                src: 'kira-laktionov.jpg',
                ratio: 4.032 / 2.688,
                original_size: '2.6mb'
            },
            {
                src: 'michael-d-beckwith-6.jpg',
                ratio: 5.184 / 3.456,
                original_size: '5.2mb'
            },
            {
                src: 'michael-d-beckwith.jpg',
                ratio: 8.192 / 5.461,
                original_size: '9.2mb'
            },
            {
                src: 'ricky-kharawala.jpg',
                ratio: 8.192 / 5.461,
                original_size: '9.2mb'
            },
            {
                src: 'rodolfo-marques.jpg',
                ratio: 6 / 4,
                original_size: '8.2mb'
            },
            {
                src: 'tim-patch.jpg',
                ratio: 5.464 / 3.640,
                original_size: '7.5mb'
            },
            {
                src: 'veeterzy.jpg',
                ratio: 5.760 / 3.840,
                original_size: '8.5mb'
            },
            {
                src: 'dino-reichmuth-1.jpg',
                ratio: 7.952 / 5.622,
                original_size: '9.2mb'
            },
            {
                src: 'dino-reichmuth-11.jpg',
                ratio: 5.256 / 7.880,
                original_size: '11mb'
            }
        ];
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lib */ "../../dist/lib/fesm5/ng-cloudimage-responsive.js");





var ciConfig = {
    token: 'demo',
    baseUrl: 'https://cloudimage.public.airstore.io/demo/',
    filters: 'q80.foil1',
    queryString: '?&size_info=1',
    lazyLoadOffset: 100,
    lazyLoading: true
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                lib__WEBPACK_IMPORTED_MODULE_4__["CIModule"]
            ],
            providers: [
                { provide: lib__WEBPACK_IMPORTED_MODULE_4__["CIConfig"], useValue: ciConfig },
                lib__WEBPACK_IMPORTED_MODULE_4__["CIService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../../node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/dmitry/2019/ng-cloudimage-responsive/projects/example/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map