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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CIConfig = /** @class */ (function () {
    function CIConfig() {
    }
    return CIConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            presets: presets ? presets :
                {
                    xs: '(max-width: 575px)',
                    // to 575       PHONE
                    sm: '(min-width: 576px)',
                    // 576 - 767    PHABLET
                    md: '(min-width: 768px)',
                    // 768 - 991    TABLET
                    lg: '(min-width: 992px)',
                    // 992 - 1199   SMALL_LAPTOP_SCREEN
                    xl: '(min-width: 1200px)' // from 1200    USUALSCREEN
                },
            queryString: queryString,
            innerWidth: window.innerWidth,
        };
    }
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
        /** @type {?} */
        var letPadding = width && parentNode && parseInt(window.getComputedStyle(parentNode).paddingLeft, 10);
        /** @type {?} */
        var rightPadding = parseInt(window.getComputedStyle(parentNode).paddingRight, 10);
        return width + (width ? (-letPadding - rightPadding) : 0);
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
        if (currentSize <= 25) {
            return '25';
        }
        if (currentSize <= 50) {
            return '50';
        }
        return (Math.ceil(currentSize / 100) * 100).toString();
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
        try {
            /** @type {?} */
            var array = size.split(',');
            return array.length > 1;
        }
        catch (e) {
            return false;
        }
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
        [].forEach.call(splittedSizes, (/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            result.push(item * Math.round(window.devicePixelRatio || 1));
        }));
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
        var _this = this;
        /** @type {?} */
        var sources = [];
        if (isAdaptive) {
            size.forEach((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var nextSize = _a.size, mediaQuery = _a.media;
                if (isPreview) {
                    nextSize = nextSize.split('x').map((/**
                     * @param {?} sizeNext
                     * @return {?}
                     */
                    function (sizeNext) { return sizeNext / 5; })).join('x');
                    filters = 'q10.foil1';
                }
                sources.push({ mediaQuery: mediaQuery, srcSet: _this.generateSrcset(operation, nextSize, filters, imgSrc, config) });
            }));
        }
        else {
            if (isPreview) {
                size = size.split('x').map((/**
                 * @param {?} sizeNext
                 * @return {?}
                 */
                function (sizeNext) { return sizeNext / 5; })).join('x');
                filters = 'q10.foil1';
            }
            sources.push({
                srcSet: this.generateSrcset(operation, size, filters, imgSrc, config)
            });
        }
        return sources;
    };
    /**
     * @param {?} size
     * @param {?} config
     * @return {?}
     */
    CIService.prototype.getAdaptiveSize = /**
     * @param {?} size
     * @param {?} config
     * @return {?}
     */
    function (size, config) {
        /** @type {?} */
        var arrayOfSizes = size.split(',');
        /** @type {?} */
        var sizes = [];
        arrayOfSizes.forEach((/**
         * @param {?} string
         * @return {?}
         */
        function (string) {
            /** @type {?} */
            var groups = string.match(/((?<variable>[a-z_][a-z_]*)|(?<media>\([\S\s]*\)))\s*(?<size>[0-9xp]*)/).groups;
            /** @type {?} */
            var media = groups.media ? groups.media : config.presets[groups.variable];
            sizes.push({ media: media, size: groups.size });
        }));
        return sizes;
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
        var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__read"])(size.toString().split('x'), 2), imgWidth = _a[0], imgHeight = _a[1];
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
        var _a, _b;
        /** @type {?} */
        var width;
        /** @type {?} */
        var height;
        if (typeof size === 'object') {
            /** @type {?} */
            var breakPointSource = this.getBreakPoint(size);
            /** @type {?} */
            var breakPointSize = breakPointSource ? breakPointSource.size : size[0].size;
            _a = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__read"])(breakPointSize.toString().split('x'), 2), width = _a[0], height = _a[1];
        }
        else {
            _b = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__read"])(size.toString().split('x'), 2), width = _b[0], height = _b[1];
        }
        if (width && height) {
            return width / height;
        }
        return null;
    };
    /**
     * @param {?} size
     * @return {?}
     */
    CIService.prototype.getBreakPoint = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__spread"])(size).reverse().find((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return matchMedia(item.media).matches; }));
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ImgComponent = /** @class */ (function () {
    function ImgComponent(ciService, _sanitizer) {
        this.ciService = ciService;
        this._sanitizer = _sanitizer;
        this.class = '';
        this.offset = 100;
        this.cloudimageUrl = '';
        this.sources = [];
        this.firstSource = null;
        this.restSources = [];
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
        this.resizeSubscription$ = this.resizeObservable$.subscribe((/**
         * @return {?}
         */
        function () {
            if (_this.isAdaptive || _this.windowInnerWidth < window.innerWidth) {
                _this.processImage();
            }
            _this.windowInnerWidth = window.innerWidth;
        }));
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
        size = isAdaptive ? this.ciService.getAdaptiveSize(size, config) : size;
        /** @type {?} */
        var isRelativeUrlPath = this.ciService.checkIfRelativeUrlPath(this.src);
        /** @type {?} */
        var imgSrc = this.ciService.getImgSrc(this.src, isRelativeUrlPath, config.baseUrl);
        /** @type {?} */
        var resultSize = isAdaptive ? size : this.ciService.getSizeAccordingToPixelRatio(size);
        this.isPreview = !config.isChrome && (parentContainerWidth > 400) && config.lazyLoading;
        this.cloudimageUrl = isAdaptive ?
            this.ciService.generateUrl('width', this.ciService.getSizeAccordingToPixelRatio(parentContainerWidth), filters, imgSrc, config) :
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
                this.ciService.generateUrl(operation, resultSize.split('x').map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item / 5; })).join('x'), 'q10.foil1', imgSrc, previewConfig);
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
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.isProcessed = true;
        }));
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
    ImgComponent.prototype.getRestSources = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var resultSources = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__spread"])((!this.isPreview ? this.sources : (this.isPreviewLoaded ? this.sources : this.previewSources)));
        return resultSources.slice(1).reverse();
    };
    /**
     * @return {?}
     */
    ImgComponent.prototype.getFirstSource = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var resultSources = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__spread"])((!this.isPreview ? this.sources : (this.isPreviewLoaded ? this.sources : this.previewSources)));
        this.firstSource = resultSources[0];
        return resultSources[0];
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
        // todo check if we need 100% height
        // return this._sanitizer.bypassSecurityTrustStyle(this.isRatio ? '100%' : 'auto');
        return this._sanitizer.bypassSecurityTrustStyle(this.isRatio ? 'auto' : 'auto');
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
        if (this.isRatio && !this.isPreviewLoaded && !this.isLoaded) {
            result = config.placeholderBackground;
        }
        return this._sanitizer.bypassSecurityTrustStyle(result);
    };
    ImgComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"], args: [{
                    selector: 'ci-img',
                    template: "\n    <picture #pictureElem *ngIf=\"!isProcessed\"></picture>\n\n    <ng-container [ngSwitch]=\"lazyLoading\">\n      <ng-container *ngSwitchCase=\"true\">\n        <picture\n          [class]=\"class + ' cloudimage-image-picture cloudimage-image-' + (isLoaded ? 'loaded' : 'loading')\"\n          style=\"display:block;width:100%;overflow:hidden;position:relative;\"\n          [style.paddingBottom]=\"getPicturePaddingBottom()\"\n          [style.background]=\"getPictureBackground()\"\n          #imgElem\n          *ngIf=\"isProcessed\">\n          <source\n            *ngFor=\"let source of getRestSources()\"\n            [media]=\"source.mediaQuery || ''\"\n            [attr.lazyLoad]=\"source.srcSet || ''\"\n            [srcset]=\"source.srcSet || ''\"\n            (load)=\"onImageLoad()\"\n          />\n          <source\n            *ngIf=\"getFirstSource()\"\n            [attr.lazyLoad]=\"firstSource.srcSet || ''\"\n            [srcset]=\"firstSource.srcSet || ''\"\n            (load)=\"onImageLoad()\"\n          />\n          <img\n            style=\"display:block;width:100%;opacity:1;top:0;left:0;\"\n            [style.position]=\"getPositionStyle()\"\n            [style.height]=\"getImgHeight()\"\n            [style.transform]=\"getTransformStyle()\"\n            [style.transition]=\"getTransitionStyle()\"\n            [style.filter]=\"getFilterStyle()\"\n            (load)=\"onImageLoad()\"\n            [lazyLoad]=\"!isPreview ? cloudimageUrl : (isPreviewLoaded ? cloudimageUrl : previewCloudimageUrl)\"\n            [offset]=\"offset\"\n            [alt]=\"\">\n        </picture>\n      </ng-container>\n      <div *ngSwitchCase=\"false\">\n        <picture\n          [class]=\"class + ' cloudimage-image-picture cloudimage-image-' + (isLoaded ? 'loaded' : 'loading')\"\n          style=\"display:block;width:100%;overflow:hidden;position:relative;\"\n          [style.paddingBottom]=\"getPicturePaddingBottom()\"\n          [style.background]=\"getPictureBackground()\"\n          #imgElem\n          *ngIf=\"isProcessed\">\n          <source\n            *ngFor=\"let source of restSources\"\n            [media]=\"source.mediaQuery || ''\"\n            [attr.lazyLoad]=\"source.srcSet || ''\"\n            [srcset]=\"source.srcSet || ''\"\n            (load)=\"onImageLoad()\"\n          />\n          <source\n            *ngIf=\"firstSource\"\n            [attr.lazyLoad]=\"firstSource.srcSet || ''\"\n            [srcset]=\"firstSource.srcSet || ''\"\n            (load)=\"onImageLoad()\"\n          />\n          <img\n            style=\"display:block;width:100%;opacity:1;top:0;left:0;\"\n            [style.position]=\"getPositionStyle()\"\n            [style.height]=\"getImgHeight()\"\n            [style.transform]=\"getTransformStyle()\"\n            [style.transition]=\"getTransitionStyle()\"\n            [style.filter]=\"getFilterStyle()\"\n            (load)=\"onImageLoad()\"\n            [src]=\"!isPreview ? cloudimageUrl : (isPreviewLoaded ? cloudimageUrl : previewCloudimageUrl)\"\n            [alt]=\"\">\n        </picture>\n      </div>\n    </ng-container>\n  "
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZWN0cy9leGFtcGxlL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"wrapper\">\n  <section class=\"home\">\n    <div class=\"container\">\n      <a class=\"logo\" href=\"https://scaleflex.github.io/ng-cloudimage-responsive/\">Angular Cloudimage Responsive</a>\n      <div class=\"reference-buttons\">\n        <a class=\"github-button\" target=\"_blank\"\n           href=\"https://github.com/Scaleflex/ng-cloudimage-responsive/subscription\" data-icon=\"octicon-eye\"\n           aria-label=\"Watch Scaleflex/ng-cloudimage-responsive on GitHub\">Watch</a>\n        <a class=\"github-button\" target=\"_blank\" href=\"https://github.com/Scaleflex/ng-cloudimage-responsive\"\n           data-icon=\"octicon-star\" aria-label=\"Star Scaleflex/ng-cloudimage-responsive on GitHub\">Star</a>\n        <a class=\"github-button\" target=\"_blank\" href=\"https://github.com/Scaleflex/ng-cloudimage-responsive/fork\"\n           data-icon=\"octicon-repo-forked\" aria-label=\"Fork Scaleflex/ng-cloudimage-responsive on GitHub\">Fork</a>\n        <a class=\"twitter-share-button btn btn-info\" target=\"_blank\"\n           href=\"https://twitter.com/intent/tweet?text=Responsive%20images,%20now%20easier%20than%20ever&url=https://scaleflex.github.io/ng-cloudimage-responsive/&via=cloudimage&hashtags=images,cloudimage,responsive_images,lazy_loading,web_acceleration,image_managementimage_resizing,image_compression,image_optimization,image_CDN,image_CDNwebp,jpeg_xr,jpg_optimization,image_resizing_and_CDN,cropresize\">\n          <i> </i>\n          <span>Tweet</span>\n        </a>\n        <!--<a class=\"github-button\" href=\"https://github.com/Scaleflex/filerobot-uploader/archive/master.zip\" data-icon=\"octicon-cloud-download\" aria-label=\"Download Scaleflex/filerobot-uploader on GitHub\">Download</a>-->\n      </div>\n      <h1><strong>Responsive images</strong>, now easier than ever.</h1>\n      <h2>\n        Make your existing images <strong>responsive</strong> without creating new images. <strong>Upload</strong> one\n        high quality original image and the plugin will <strong>resize, compress and accelerate</strong> images across\n        the World in your site for all devices. The plugin supports <strong>lazy load</strong> with <strong>fancy\n        animation</strong> on image load.\n      </h2>\n\n\n      <div class=\"actions-wrapper\">\n        <a\n          id=\"view-github-btn\"\n          href=\"https://github.com/scaleflex/ng-cloudimage-responsive\"\n          class=\"btn btn-primary btn-lg\"\n          target=\"_blank\"\n        >View on GitHub</a>\n        <!--<a href=\"#\" class=\"btn btn-light btn-lg\">Read on Medium</a>-->\n      </div>\n    </div>\n\n    <a href=\"https://github.com/scaleflex/ng-cloudimage-responsive\" target=\"_blank\">\n      <img\n        class=\"fork-me-on-github\"\n        src=\"https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png\"\n        alt=\"Fork me on GitHub\">\n    </a>\n\n    <a href=\"https://www.filerobot.com/\" class=\"robot-icon\">\n      <img style=\"width:100%;\" id=\"robot-icon\"\n           src=\"https://demo.cloudimg.io/width/800/q35.foil1/https://scaleflex.airstore.io/filerobot/assets/robot-icon-left.png\"\n           alt=\"\">\n    </a>\n  </section>\n\n  <section>\n    <app-container-box></app-container-box>\n    <ci-img [src]=\"images[0].src\" [ratio]=\"images[0].ratio\"></ci-img>\n  </section>\n\n  <div style=\"background: #fff\">\n    <section class=\"container ready-to-start\">\n      <h2 class=\"text-center\">Features</h2>\n\n      <ul>\n        <li><strong>Resize large images</strong> to the size needed by your design and\n          <strong>generate multiple images</strong> for different device screen size\n        </li>\n        <li>Strip all unnecessary metadata and <strong>optimize JPEG, PNG and GIF compression</strong></li>\n        <li>Efficiently <strong>lazy load images</strong> to speed initial page load and save bandwidth</li>\n        <li>Use the low quality image with \"blur-up\" technique to <strong>show a preview</strong> of the image\n          <strong>while it loads</strong></li>\n        <li><strong>Hold the image position</strong> so your page doesn't jump while images load</li>\n      </ul>\n\n    </section>\n  </div>\n\n  <section class=\"container ready-to-start\">\n    <h2 class=\"text-center\">How it works</h2>\n    <p>\n      The plugin detects the <strong>width of image's container</strong> and <strong>pixel ratio density</strong> of\n      your device to load the exact image size you need. It <strong>processes</strong> images via\n      <a href=\"https://www.cloudimage.io/en/home\">Cloudimage.io</a> service which offers comprehensive <strong>automated\n      image optimization</strong> solutions.\n    </p>\n    <p style=\"margin-top: 20px;\">\n      When an image is first loaded on your website or mobile app, Cloudimage's resizing servers will\n      <strong>download</strong> your origin image from your origin server, <strong>resize</strong> it and\n      <strong>deliver</strong> to your user via lightning-fast Content Delivery Networks (CDNs). Once the image is\n      resized\n      in the format of your choice, Cloudimage will send it to a Content Delivery Network, which will in turn deliver\n      it rocket fast to your visitors, <strong>responsively across various screen sizes</strong>.\n    </p>\n    <p style=\"margin-top: 20px;\">\n      Read the following\n      <a href=\"https://medium.com/cloudimage/cloudimage-resizes-your-images-saves-time-accelerates-your-website-and-increases-your-conversion-eb128903d4c2\">article</a>\n      to learn more about Cloudimage.io service.\n    </p>\n  </section>\n\n  <div style=\"background: #fff\">\n    <section class=\"container ready-to-start\">\n      <h2 class=\"text-center\">In numbers</h2>\n\n      <p>\n        We have original image stored via CDN with <strong>6240×4160 px resolution</strong> and\n        <strong>8.7 mb size</strong>:\n        <code>https://scaleflex.airstore.io/demo/redcharlie.jpg</code>\n        <a target=\"_blank\" href=\"https://scaleflex.airstore.io/demo/redcharlie.jpg\"> link</a>\n        In the table below we can see what size and resolution will be loaded depending on the image's container.\n      </p>\n\n      <table class=\"table table-bordered\">\n        <thead>\n        <tr>\n          <th>container size</th>\n          <th>pixel ratio density</th>\n          <th>calculated width</th>\n          <th>result: dimantion | size | link</th>\n        </tr>\n        </thead>\n        <tbody>\n\n        <tr>\n          <td rowspan=\"2\" style=\"vertical-align: middle;\">\n            400px\n          </td>\n          <td>1</td>\n          <td>400px</td>\n          <td>400×267 | 18.7 kb | <a target=\"_blank\"\n                                     href=\"https://demo.cloudimg.io/width/400/q35.foil1/https://scaleflex.airstore.io/demo/redcharlie.jpg\">link</a>\n          </td>\n        </tr>\n        <tr>\n          <td>2</td>\n          <td>800px</td>\n          <td>800×533 | 58.1 kb | <a target=\"_blank\"\n                                     href=\"https://demo.cloudimg.io/width/800/q35.foil1/https://scaleflex.airstore.io/demo/redcharlie.jpg\">link</a>\n          </td>\n        </tr>\n\n        <tr>\n          <td rowspan=\"2\" style=\"vertical-align: middle;\">\n            570px\n          </td>\n          <td>1</td>\n          <td>600px</td>\n          <td>600×400 | 35.4 kb | <a target=\"_blank\"\n                                     href=\"https://demo.cloudimg.io/width/600/q35.foil1/https://scaleflex.airstore.io/demo/redcharlie.jpg\">link</a>\n          </td>\n        </tr>\n        <tr>\n          <td>2</td>\n          <td>1200px</td>\n          <td>1200x800 | 119 kb | <a target=\"_blank\"\n                                     href=\"https://demo.cloudimg.io/width/1200/q35.foil1/https://scaleflex.airstore.io/demo/redcharlie.jpg\">link</a>\n          </td>\n        </tr>\n\n\n        <tr>\n          <td rowspan=\"2\" style=\"vertical-align: middle;\">\n            720px\n          </td>\n          <td>1</td>\n          <td>800px</td>\n          <td>800×533 | 58.1 kb | <a target=\"_blank\"\n                                     href=\"https://demo.cloudimg.io/width/800/q35.foil1/https://scaleflex.airstore.io/demo/redcharlie.jpg\">link</a>\n          </td>\n        </tr>\n        <tr>\n          <td>2</td>\n          <td>1600px</td>\n          <td>1600px×1066 | 200 kb | <a target=\"_blank\"\n                                        href=\"https://demo.cloudimg.io/width/1600/q35.foil1/https://scaleflex.airstore.io/demo/redcharlie.jpg\">link</a>\n          </td>\n        </tr>\n\n        <tr>\n          <td rowspan=\"2\" style=\"vertical-align: middle;\">\n            1170px\n          </td>\n          <td>1</td>\n          <td>1200px</td>\n          <td>1200x800 | 119 kb | <a target=\"_blank\"\n                                     href=\"https://demo.cloudimg.io/width/1200/q35.foil1/https://scaleflex.airstore.io/demo/redcharlie.jpg\">link</a>\n          </td>\n        </tr>\n        <tr>\n          <td>2</td>\n          <td>2400px</td>\n          <td>2400x1600 | 405 kb | <a target=\"_blank\"\n                                      href=\"https://demo.cloudimg.io/width/2400/q35.foil1/https://scaleflex.airstore.io/demo/redcharlie.jpg\">link</a>\n          </td>\n        </tr>\n\n        </tbody>\n\n      </table>\n\n      <p>\n        * The plugin <strong>rounds container width</strong> to next possible value which can be divided by 100 without\n        the remainder. It's done for <strong>cache reasons</strong> so that we cache not all images different by 1px,\n        but only 100px, 200px, 300px …\n      </p>\n    </section>\n  </div>\n\n\n  <section class=\"ready-to-start\">\n    <h2 class=\"text-center\">Gallery demo</h2>\n\n    <p>Change the size of your browser's window and reload the page to see how the Cloudimage Responsive plugin will\n      deliver an optimized image for the screen size.</p>\n\n    <div class=\"container-fluid\" style=\"max-width: 1200px; margin-left: auto; margin-right: auto; padding-top: 20px;\">\n      <div class=\"row images-in-columns\">\n        <div class=\"col-12\">\n          <app-container-box></app-container-box>\n          <ci-img [src]=\"images[8].src\" [ratio]=\"images[8].ratio\"></ci-img>\n        </div>\n\n        <div *ngFor=\"let image of images.slice(1, 7)\" class=\"col-6\">\n          <app-container-box></app-container-box>\n          <ci-img [src]=\"image.src\" [ratio]=\"image.ratio\"></ci-img>\n          original: <i>{{image.original_size}}</i>\n          <a href=\"{{'https://cloudimage.public.airstore.io/demo/' + image.src}}\" target=\"_blank\"> link</a><br/>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-6 col-lg-7\">\n          <!--<app-container-box></app-container-box>-->\n          <ci-img\n            [src]=\"images[18].src\"\n            [operation]=\"'crop'\"\n            [size]=\"'sm 400x200, (min-width: 620px) 200x60, md 250x350, lg 350x300, xl 400x250'\"\n          ></ci-img>\n          <small>\n            original: <i>9.2mb</i> <a\n            href=\"https://cloudimage.public.airstore.io/demo/dino-reichmuth-1.jpg\" target=\"_blank\"> link</a><br/>\n          </small>\n        </div>\n        <div class=\"col-md-6 col-lg-5 desc-wrapper-with-media-query\">\n          <h4>You can control your image size/ratio/crop with media query breakpoints</h4>\n          <p>Resize your browser window to see how it works</p>\n          <pre><code>\n&lt;ci-img\n  operation=\"crop\"\n  [src]=\"images[18].src\"\n  [size]=\"'\n    sm 400x200,\n    (min-width: 620px) 200x60,\n    md 250x350,\n    lg 350x300,\n    xl 400x250\n  '\"\n&lt;/ci-img&gt;\n      </code></pre>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"container ready-to-start\">\n    <h2 class=\"text-center\">Ready to get started?</h2>\n    <p>To use the plugin, you will need a Cloudimage token. Don't worry, it only takes seconds to get one by registering\n      <a\n        href=\"https://www.cloudimage.io/en/register_page\">here</a>. Once your token is created, you can configure\n      it as\n      described below.\n      This token allows you to use 25GB of image cache and 25GB of worldwide CDN traffic per month for free.</p>\n  </section>\n\n  <section class=\"container\">\n    <div class=\"text-center\">\n      <div id=\"plugin-version-switcher\" class=\"plugin-version-switcher btn-group btn-toggle\">\n        <!--{/*//&lt;!&ndash;<button id=\"js-btn\" class=\"btn btn-primary\">JS version</button>&ndash;&gt;*/}-->\n        <!--{/*//&lt;!&ndash;<a href=\"#\" class=\"btn btn-light\">React version</a>&ndash;&gt;*/}-->\n        <!--{/*//&lt;!&ndash;<a href=\"#\" class=\"btn btn-light\">Angular version</a>&ndash;&gt;*/}-->\n      </div>\n    </div>\n\n    <div id=\"js-version-box\" >\n\n      <div class=\"action-wrapper first-action\">\n        <p>Install using npm</p>\n        <figure class=\"highlight\">\n          <pre><code class=\"javascript\">npm install --save ng-cloudimage-responsive</code></pre>\n        </figure>\n      </div>\n\n      <div>\n        <div class=\"action-wrapper second-action\">\n          <p>\n            initialize it with your <strong>token</strong> and the <strong>baseUrl</strong> of your image storage\n            using <strong>CloudimageProvider</strong>\n          </p>\n          <figure class=\"highlight\">\n            <pre><code [highlight]=\"initialization\"></code></pre>\n          </figure>\n          <p>\n            Get your Cloudimage tokens <a href=\"https://www.cloudimage.io/en/register_page\">here</a>.\n          </p>\n        </div>\n\n\n        <div class=\"action-wrapper third-action\">\n          <p>\n            Implement it, just using the Img component:\n          </p>\n          <figure class=\"highlight\">\n            <pre><code [highlight]=\"implement\"></code></pre>\n          </figure>\n          <p>\n            <small>NOTE: \"ratio\" is recommended to prevent page layout jumping.\n              The parameter is used to calculate image height to hold the image position while image is loading.\n            </small>\n          </p>\n        </div>\n\n        <div class=\"action-wrapper forth-action\">\n          <p>\n            …and you're done!\n            <a href=\"https://github.com/scaleflex/ng-cloudimage-responsive#table-of-contents\"\n               target=\"_blank\">\n              Visit the full documentation here.\n            </a>\n          </p>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <section style=\"text-align: center;\">\n    <div class=\"container ready-to-start\">\n      <h2>Any questions?</h2>\n      <p>\n        Contact us at <a href=\"mailto:hello@cloudimage.io\">hello@cloudimage.io</a>, our experts will be happy to help!\n      </p>\n    </div>\n  </section>\n\n  <footer>\n    <div style=\"background: #fff\">\n      <section class=\"container ready-to-start filerobot-ui-family\">\n        <div class=\"row\">\n          <div class=\"col-sm-3 filerobot-ui-family-label\" style=\"max-width: 200px; min-width: 200px;\">\n            <h5>Filerobot UI family:</h5>\n          </div>\n          <div class=\"col-sm-9\" style=\"max-width: calc(100% - 200px);\">\n            <ul>\n              <li><a target=\"_blank\" href=\"https://github.com/scaleflex/js-cloudimage-responsive\">JS Cloudimage Responsive</a></li>\n              <li><a target=\"_blank\" href=\"https://github.com/scaleflex/react-cloudimage-responsive\">React Cloudimage Responsive</a></li>\n              <li><a target=\"_blank\" href=\"https://github.com/scaleflex/filerobot-image-editor\">Uploader</a></li>\n              <li><a target=\"_blank\" href=\"https://github.com/scaleflex/filerobot-uploader\">Image Editor</a></li>\n            </ul>\n          </div>\n        </div>\n      </section>\n    </div>\n    <hr/>\n    <div class=\"copyright\">\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"team-desc col-sm-8\">\n            <div>Made with ❤ in 2019 in Paris, Munich and Sofia by the Scaleflex team, the guys behind <a\n              href=\"https://www.cloudimage.io/en/home\" target=\"_blank\">Cloudimage.io</a>.\n            </div>\n            <div style=\"margin-top: 10px;\">Powered by <a href=\"https://www.scaleflex.it/en/home\" target=\"_blank\">Scaleflex team</a>.\n              All rights reserved.\n            </div>\n          </div>\n          <div class=\"footer-menu col-sm-4\">\n            <ul>\n              <li><a href=\"https://github.com/scaleflex/ng-cloudimage-responsive\" target=\"_blank\">View GitHub</a></li>\n              <li><a href=\"https://github.com/scaleflex/ng-cloudimage-responsive/issues\" target=\"_blank\">Current\n                Issues</a>\n              </li>\n              <li><a href=\"https://github.com/scaleflex/ng-cloudimage-responsive#table-of-contents\" target=\"_blank\">Documentation</a>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n  </footer>\n\n  <div id=\"device-pixel-ratio\" class=\"device-pixel-ratio\">\n    Your device pixel ratio: <span>{{getDevicePixelRatio()}}</span>\n  </div>\n</div>\n"

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
        this.initialization = "import { NgModule } from '@angular/core';\nimport { BrowserModule } from '@angular/platform-browser';\nimport { CIModule, CIConfig } from 'ng-cloudimage-responsive';\nimport { AppComponent } from './app.component';\n\nconst ciConfig = {\n  token: 'demo',\n  baseUrl: 'https://jolipage.airstore.io/'\n};\n\n@NgModule({\n    declarations: [ AppComponent ],\n    imports: [ BrowserModule, CIModule ],\n    providers: [\n      {provide: CIConfig, useValue: ciConfig}\n    ],\n    bootstrap: [ AppComponent ]\n})\nexport class MyAppModule {}";
        this.implement = "<ci-img src=\"img.jpg\" alt=\"Demo image\" ratio=\"1.5\"></ci-img>";
        this.images = [
            {
                src: 'https://cloudimage.public.airstore.io/demo/luca-bravo-121932.jpg',
                ratio: 4.538 / 1.932,
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
                src: 'dino-reichmuth-9.jpg',
                ratio: 6.616 / 3.744,
                b: 1.76,
                original_size: '9.7mb'
            },
            {
                src: 'ishan-seefromthesky.jpg',
                ratio: 5.464 / 3.070,
                original_size: '4.2mb'
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
    AppComponent.prototype.getDevicePixelRatio = function () {
        return Math.round(window.devicePixelRatio || 1);
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css"), __webpack_require__(/*! ../assets/fonts/helvetica-neue.css */ "./src/assets/fonts/helvetica-neue.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: hljsLanguages, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hljsLanguages", function() { return hljsLanguages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lib */ "../../dist/lib/fesm5/ng-cloudimage-responsive.js");
/* harmony import */ var ngx_highlightjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-highlightjs */ "../../node_modules/ngx-highlightjs/fesm5/ngx-highlightjs.js");
/* harmony import */ var highlight_js_lib_languages_typescript__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! highlight.js/lib/languages/typescript */ "../../node_modules/highlight.js/lib/languages/typescript.js");
/* harmony import */ var highlight_js_lib_languages_typescript__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(highlight_js_lib_languages_typescript__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var highlight_js_lib_languages_xml__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! highlight.js/lib/languages/xml */ "../../node_modules/highlight.js/lib/languages/xml.js");
/* harmony import */ var highlight_js_lib_languages_xml__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(highlight_js_lib_languages_xml__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _containerBox_containerBox_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./containerBox/containerBox.component */ "./src/app/containerBox/containerBox.component.ts");









function hljsLanguages() {
    return [
        { name: 'typescript', func: highlight_js_lib_languages_typescript__WEBPACK_IMPORTED_MODULE_6___default.a },
        { name: 'xml', func: highlight_js_lib_languages_xml__WEBPACK_IMPORTED_MODULE_7___default.a }
    ];
}
var ciConfig = {
    token: 'demo',
    baseUrl: 'https://cloudimage.public.airstore.io/demo/',
    filters: 'q80.foil1',
    queryString: '?&size_info=1&v2',
    lazyLoadOffset: 100,
    lazyLoading: true
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _containerBox_containerBox_component__WEBPACK_IMPORTED_MODULE_8__["default"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                lib__WEBPACK_IMPORTED_MODULE_4__["CIModule"],
                ngx_highlightjs__WEBPACK_IMPORTED_MODULE_5__["HighlightModule"].forRoot({
                    languages: hljsLanguages
                })
            ],
            providers: [
                { provide: lib__WEBPACK_IMPORTED_MODULE_4__["CIConfig"], useValue: ciConfig }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/containerBox/containerBox.component.ts":
/*!********************************************************!*\
  !*** ./src/app/containerBox/containerBox.component.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");




var ContainerBoxComponent = /** @class */ (function () {
    function ContainerBoxComponent() {
    }
    ContainerBoxComponent.prototype.ngOnDestroy = function () {
        this.resizeSubscription$.unsubscribe();
    };
    ContainerBoxComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.width = this.containerElem.nativeElement.offsetWidth;
        this.resizeObservable$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(window, 'resize').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(400));
        this.resizeSubscription$ = this.resizeObservable$.subscribe(function () {
            _this.width = _this.containerElem.nativeElement.offsetWidth;
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('containerElem'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], ContainerBoxComponent.prototype, "containerElem", void 0);
    ContainerBoxComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-container-box',
            template: "<div class=\"container-width-box\" #containerElem>container width: <span>{{width}}</span> px</div>"
        })
    ], ContainerBoxComponent);
    return ContainerBoxComponent;
}());
/* harmony default export */ __webpack_exports__["default"] = (ContainerBoxComponent);


/***/ }),

/***/ "./src/assets/fonts/helvetica-neue.css":
/*!*********************************************!*\
  !*** ./src/assets/fonts/helvetica-neue.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@font-face {\n  font-family: 'Helvetica Neue';\n  src: url('https://scaleflex.airstore.io/filerobot/assets/fonts/helvetica-neue/HelveticaNeue-Medium.eot');\n  src: url('https://scaleflex.airstore.io/filerobot/assets/fonts/helvetica-neue/HelveticaNeue-Medium.eot?#iefix') format('embedded-opentype'),\n  url('https://scaleflex.airstore.io/filerobot/assets/fonts/helvetica-neue/HelveticaNeue-Medium.woff2') format('woff2'),\n  url('https://scaleflex.airstore.io/filerobot/assets/fonts/helvetica-neue/HelveticaNeue-Medium.woff') format('woff'),\n  url('https://scaleflex.airstore.io/filerobot/assets/fonts/helvetica-neue/HelveticaNeue-Medium.ttf') format('truetype'),\n  url('https://scaleflex.airstore.io/filerobot/assets/fonts/helvetica-neue/HelveticaNeue-Medium.svg#HelveticaNeue-Medium') format('svg');\n  font-weight: 500;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Helvetica Neue';\n  src: url('https://scaleflex.airstore.io/filerobot/assets/fonts/helvetica-neue/HelveticaNeue-LightExt.eot');\n  src: url('https://scaleflex.airstore.io/filerobot/assets/fonts/helvetica-neue/HelveticaNeue-LightExt.eot?#iefix') format('embedded-opentype'),\n  url('https://scaleflex.airstore.io/filerobot/assets/fonts/helvetica-neue/HelveticaNeue-LightExt.woff2') format('woff2'),\n  url('https://scaleflex.airstore.io/filerobot/assets/fonts/helvetica-neue/HelveticaNeue-LightExt.woff') format('woff'),\n  url('https://scaleflex.airstore.io/filerobot/assets/fonts/helvetica-neue/HelveticaNeue-LightExt.ttf') format('truetype'),\n  url('https://scaleflex.airstore.io/filerobot/assets/fonts/helvetica-neue/HelveticaNeue-LightExt.svg#HelveticaNeue-LightExt') format('svg');\n  font-weight: 300;\n  font-style: normal;\n}\n\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2V4YW1wbGUvc3JjL2Fzc2V0cy9mb250cy9oZWx2ZXRpY2EtbmV1ZS5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSw4QkFBOEI7RUFDOUIseUdBQXlHO0VBQ3pHOzs7O3lJQUl1STtFQUN2SSxpQkFBaUI7RUFDakIsbUJBQW1CO0NBQ3BCOztBQUVEO0VBQ0UsOEJBQThCO0VBQzlCLDJHQUEyRztFQUMzRzs7Ozs2SUFJMkk7RUFDM0ksaUJBQWlCO0VBQ2pCLG1CQUFtQjtDQUNwQiIsImZpbGUiOiJwcm9qZWN0cy9leGFtcGxlL3NyYy9hc3NldHMvZm9udHMvaGVsdmV0aWNhLW5ldWUuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiAnSGVsdmV0aWNhIE5ldWUnO1xuICBzcmM6IHVybCgnaHR0cHM6Ly9zY2FsZWZsZXguYWlyc3RvcmUuaW8vZmlsZXJvYm90L2Fzc2V0cy9mb250cy9oZWx2ZXRpY2EtbmV1ZS9IZWx2ZXRpY2FOZXVlLU1lZGl1bS5lb3QnKTtcbiAgc3JjOiB1cmwoJ2h0dHBzOi8vc2NhbGVmbGV4LmFpcnN0b3JlLmlvL2ZpbGVyb2JvdC9hc3NldHMvZm9udHMvaGVsdmV0aWNhLW5ldWUvSGVsdmV0aWNhTmV1ZS1NZWRpdW0uZW90PyNpZWZpeCcpIGZvcm1hdCgnZW1iZWRkZWQtb3BlbnR5cGUnKSxcbiAgdXJsKCdodHRwczovL3NjYWxlZmxleC5haXJzdG9yZS5pby9maWxlcm9ib3QvYXNzZXRzL2ZvbnRzL2hlbHZldGljYS1uZXVlL0hlbHZldGljYU5ldWUtTWVkaXVtLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxuICB1cmwoJ2h0dHBzOi8vc2NhbGVmbGV4LmFpcnN0b3JlLmlvL2ZpbGVyb2JvdC9hc3NldHMvZm9udHMvaGVsdmV0aWNhLW5ldWUvSGVsdmV0aWNhTmV1ZS1NZWRpdW0ud29mZicpIGZvcm1hdCgnd29mZicpLFxuICB1cmwoJ2h0dHBzOi8vc2NhbGVmbGV4LmFpcnN0b3JlLmlvL2ZpbGVyb2JvdC9hc3NldHMvZm9udHMvaGVsdmV0aWNhLW5ldWUvSGVsdmV0aWNhTmV1ZS1NZWRpdW0udHRmJykgZm9ybWF0KCd0cnVldHlwZScpLFxuICB1cmwoJ2h0dHBzOi8vc2NhbGVmbGV4LmFpcnN0b3JlLmlvL2ZpbGVyb2JvdC9hc3NldHMvZm9udHMvaGVsdmV0aWNhLW5ldWUvSGVsdmV0aWNhTmV1ZS1NZWRpdW0uc3ZnI0hlbHZldGljYU5ldWUtTWVkaXVtJykgZm9ybWF0KCdzdmcnKTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdIZWx2ZXRpY2EgTmV1ZSc7XG4gIHNyYzogdXJsKCdodHRwczovL3NjYWxlZmxleC5haXJzdG9yZS5pby9maWxlcm9ib3QvYXNzZXRzL2ZvbnRzL2hlbHZldGljYS1uZXVlL0hlbHZldGljYU5ldWUtTGlnaHRFeHQuZW90Jyk7XG4gIHNyYzogdXJsKCdodHRwczovL3NjYWxlZmxleC5haXJzdG9yZS5pby9maWxlcm9ib3QvYXNzZXRzL2ZvbnRzL2hlbHZldGljYS1uZXVlL0hlbHZldGljYU5ldWUtTGlnaHRFeHQuZW90PyNpZWZpeCcpIGZvcm1hdCgnZW1iZWRkZWQtb3BlbnR5cGUnKSxcbiAgdXJsKCdodHRwczovL3NjYWxlZmxleC5haXJzdG9yZS5pby9maWxlcm9ib3QvYXNzZXRzL2ZvbnRzL2hlbHZldGljYS1uZXVlL0hlbHZldGljYU5ldWUtTGlnaHRFeHQud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXG4gIHVybCgnaHR0cHM6Ly9zY2FsZWZsZXguYWlyc3RvcmUuaW8vZmlsZXJvYm90L2Fzc2V0cy9mb250cy9oZWx2ZXRpY2EtbmV1ZS9IZWx2ZXRpY2FOZXVlLUxpZ2h0RXh0LndvZmYnKSBmb3JtYXQoJ3dvZmYnKSxcbiAgdXJsKCdodHRwczovL3NjYWxlZmxleC5haXJzdG9yZS5pby9maWxlcm9ib3QvYXNzZXRzL2ZvbnRzL2hlbHZldGljYS1uZXVlL0hlbHZldGljYU5ldWUtTGlnaHRFeHQudHRmJykgZm9ybWF0KCd0cnVldHlwZScpLFxuICB1cmwoJ2h0dHBzOi8vc2NhbGVmbGV4LmFpcnN0b3JlLmlvL2ZpbGVyb2JvdC9hc3NldHMvZm9udHMvaGVsdmV0aWNhLW5ldWUvSGVsdmV0aWNhTmV1ZS1MaWdodEV4dC5zdmcjSGVsdmV0aWNhTmV1ZS1MaWdodEV4dCcpIGZvcm1hdCgnc3ZnJyk7XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cblxuIl19 */"

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