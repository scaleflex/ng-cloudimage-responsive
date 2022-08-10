[![Release](https://img.shields.io/badge/release-v4.0.0-blue.svg)](https://github.com/scaleflex/ng-cloudimage-responsive/releases)
[![Free plan](https://img.shields.io/badge/price-includes%20free%20plan-green.svg)](https://www.cloudimage.io/en/home#b38181a6-b9c8-4015-9742-7b1a1ad382d5)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)](#contributing)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Scaleflex team](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-the%20Scaleflex%20team-6986fa.svg)](https://www.scaleflex.com/en/home)
[![Cloudimage](https://img.shields.io/badge/Powered%20by-cloudimage-blue)](https://www.cloudimage.io/en/home)

<p align="center">
	<img
		height="175"
		alt="The Lounge"
		src="https://demo.cloudimg.io/v7/https://cdn.scaleflex.it/filerobot/filerobot-cloudimage.png?h=350">
</p>

<h1 align="center">
   Angular Cloudimage Responsive
</h1>

<p align="center">
	<strong>
		<a href="#table_of_contents">Docs</a>
		•
		<a href="https://scaleflex.github.io/ng-cloudimage-responsive/" target="_blank">Demo</a>
		•
		<a href="https://codesandbox.io/s/qr6zzr8rj?fontsize=14&module=%2Fsrc%2Fapp%2Fapp.module.ts" target="_blank">Code Sandbox</a>
		•
		<a href="https://medium.com/@dmitry_82269/responsive-images-in-2019-now-easier-than-ever-b76e5a43c074" target="_blank">Why?</a>
	</strong>
</p>

This plugin detects the width of any image container as well as the device pixel ratio
density to load the optimal image size needed.
Images are resized on-the-fly via the <a href="https://cloudimage.io" target="_blank">Cloudimage service</a>, thus offering a comprehensive
automated image optimization service.

When an image is first loaded on your website or mobile app,
Cloudimage's resizing servers will download the origin image from
the source, resize it for the client's screen size and deliver to your users through one or multiple
Content Delivery Networks (CDNs). The generated image formats are cached in the CDN and will be delivered rocket fast on any subsequent request.

**NOTE:** Your original (master) images should be stored on a server
or storage bucket (S3, Google Cloud, Azure Blob...) reachable over
HTTP or HTTPS by Cloudimage. If you want to upload your master images to
Cloudimage, contact us at
[hello@cloudimage.io](mailto:hello@cloudimage.io).

<p align="center">
	<img
		alt="The Lounge"
		src="https://demo.cloudimg.io/v7/https://cdn.scaleflex.it/filerobot/cloudimage-process.jpg?w=1400">
</p>

## Table of contents

* [Demo](#demo)
* [Requirements](#requirements)
* [Step 1: Installation](#installation)
* [Step 2: Initialize](#initialize)
* [Step 3: Implement](#implement)
* [Configuration](#configuration)
* [Image properties](#image_properties)
* [Lazy loading](#lazy_loading)
* [Browser support](#browser_support)
* [Filerobot UI Family](#ui_family)
* [Contributing](#contributing)
* [License](#license)


## <a name="demo"></a> Demo

To see the Cloudimage Responsive plugin in action, please check out the
[Demo page](https://scaleflex.github.io/ng-cloudimage-responsive/).
Play with your browser's window size and observe your
Inspector's Network tab to see how Cloudimage delivers the optimal
image size to your browser, hence accelerating the overall page
loading time.

## <a name="requirements"/> Requirements

To use the Cloudimage Responsive plugin, you will need a
Cloudimage token to deliver your images over CDN. Don't worry, it only takes seconds to get one by
registering [here](https://www.cloudimage.io/en/register_page).
Once your token is created, you can configure it as described below.
This token allows you to use 25GB of image cache and 25GB of worldwide
CDN traffic per month for free.

## <a name="installation"></a>Step 1: Installation

using npm

```
$ npm install --save ng-cloudimage-responsive
```

## <a name="initialize"></a>Step 2: Initialize

After installing the ng-cloudimage-responsive lib, simply initialize it with your **token** and the **baseUrl**
of your image storage:

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CIModule, CIConfig } from 'ng-cloudimage-responsive';
import { AppComponent } from './app.component';

const ciConfig = {
  token: 'demo',
  baseUrl: 'https://jolipage.scaleflex.it/'
};

@NgModule({
    declarations: [ AppComponent ],
    imports: [ BrowserModule, CIModule ],
    providers: [
      {provide: CIConfig, useValue: ciConfig}
    ],
    bootstrap: [ AppComponent ]
})
export class MyAppModule {}
```

## <a name="implement"></a>Step 3: Implement it

Finally, just use the ci-img component:

```html
<ci-img src="img.jpg" alt="Demo image" ratio="1.5"></ci-img>
```

NOTE: "ratio" is recommended to prevent page layout jumping. The parameter is used to calculate image height to hold
the image position while image is loading.

<a href="https://codesandbox.io/s/qr6zzr8rj?fontsize=14&module=%2Fsrc%2Fapp%2Fapp.module.ts"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="edeit in codesandbox"/></a>

## <a name="configuration"></a> Config

### token

###### Type: **String** | Default: **"demo"** | _required_

Your Cloudimage customer token.
[Subscribe](https://www.cloudimage.io/en/register_page) for a
Cloudimage account to get one. The subscription takes less than a
minute and is totally free.

### baseUrl

###### Type: **String** | Default: **"/"** | _optional_

Your image folder on server, this alows to shorten your origin image URLs.

### lazyLoading

###### Type: **Bool** | Default: **true** | _optional_

Only images close to the client's viewport will be loaded, hence accelerating the page loading time. The plugin uses
[ng-lazyload-image](https://github.com/tjoskar/ng-lazyload-image) library to achieve it.

### lazyLoadOffset

###### Type: **Number** | Default: **100** | _required_

Preload an image even if it's e.g. 100px below the viewport
(user have to scroll 100px more to see this image)

### imgLoadingAnimation

###### Type: **Bool** | Default: **true** | _optional_

Applies a nice interlacing effect for preview transition

### filters

###### Type: **String** | Default: **'foil1'** | _optional_

Applies default Cloudimage filters to your image, e.g. fcontrast, fpixelate, fgaussian, backtransparent,
rotation...  Multiple filters can be applied, separated by "```.```" (dot).

[Full documentation here.](https://docs.cloudimage.io/go/cloudimage-documentation/en/filters/)


### placeholderBackground

###### Type: **String** | Default: **'#f4f4f4'** | _optional_

Placeholder colored background while the image is loading

### presets

###### Type: **Object**

Default:

```javascript
const ciConfig = {
  token: 'demo',
  baseUrl: 'https://jolipage.scaleflex.it/',
  ...
  presets: {
      xs: '(max-width: 575px)', // up to 575    PHONE
      sm: '(min-width: 576px)', // 576 - 767    PHABLET
      md: '(min-width: 768px)', // 768 - 991    TABLET
      lg: '(min-width: 992px)', // 992 - 1199   SMALL_LAPTOP_SCREEN
      xl: '(min-width: 1200px)' // from 1200    USUALSCREEN
  }
};
```

Breakpoints shortcuts to use in image size property, can be overwridden.

## <a name="image_properties"></a> Image properties

### src

###### Type: **String** | Default: **undefined** | _required_

Original image hosted on your web server. You can use absolute path or
relative to baseUrl in your config.

**NOTES:**

The plugin uses a special algorithm to detect the width of image container and set the image size accordingly.
This is the recommended way of using the Cloudimage Responsive plugin.

### operation (or o)

###### Type: **String** | Default: **width** | _optional_

Operation allows to customize the behaviour of the plugin for specific images:

**width** - to resize with a specific width. This is useful when you want to have a fixed width, regardless of screen size.

**height** - to resize with a specific height. This is useful when you want to have a fixed height, regardless of screen size.

**crop** - to crop the image around the center

**fit** - to resize the image in a box and keeping the proportions of the source image

**cover** - to resize the image in a box without keeping the proportions of the source image

**NOTES:**

When you use an operation, you must specify the size for each screen size, see below

Full documentation of all operations available [here](https://docs.cloudimage.io/go/cloudimage-documentation/en/operations/)

### size (or s)

###### Type: **String** | Default: **undefined** | _optional_ but _required_ when using operation

Size of an image which is used as a base for creating retina ready and responsive image element.

Examples (PR - stands for your device Pixel Ratio):

**[width]**:

```html
<ci-img
  src="dino-reichmuth-1.jpg"
  operation="width"
  size="250"/>
```
=> width: 250 * PR (px); height: auto;

**[width x height]**:

```html
<ci-img
  src="dino-reichmuth-1.jpg"
  operation="width"
  size="125x200"/>
```

=> width: 125 * PR (px); height: 200 * PR (px);

**[Width and height for different screen resolutions]**:

```html
<ci-img
  src="dino-reichmuth-1.jpg"
  operation="crop"
  size="
    sm 800x400,
    (min-width: 620px) 200x20,
    md 1000x1350,
    lg 1400x1200,
    xl 1600x1000
"/>
```

You can drop some breakpoints, for example:

```html
<ci-img
  src="dino-reichmuth-1.jpg"
  operation="crop"
  size="md 1000x1350, lg 1400x1200"/>
```

**NOTE:** if size is not set, the plugin uses a special algorithm to
detect the width of image container and set the image size accordingly. This is the recommended way of using
the Cloudimage Responsive plugin.

For example:

```html
<ci-img src="dino-reichmuth-1.jpg"/>
```

### filters (or f)

###### Type: **String** | Default: **none** | _optional_

Filters allow you to modify the image's apperance and can be added on top of the resizing features above.

**fgrey** - apply a greyscale filter on the image

**fgaussian[0..10]** - apply a gaussian blur filter on the image

**fcontrast[-100..100]** - apply a contrast filter on the image

**fbright[0..255]** - apply a brightness filter on the image

**fpixelate[0..100]** - apply a pixelate filter on the image

**fradius[0..500]** - create a radius on the corners

Full documentation of all filters available [here](https://docs.cloudimage.io/go/cloudimage-documentation/en/filters/)

### ratio (or r)

###### Type: **Number** | _optional_

It is recommended to prevent page layout jumping. The parameter is used to calculate image height to hold
the image position while image is loading.

To see the full cloudimage documentation [click here](https://docs.cloudimage.io/go/cloudimage-documentation)

### lazyLoading

###### Type: **Bool** | Default: **undefined** | _optional_

Property allows to override global lazyLoading config for specific images.

### emptyOnSsr

###### Type: **Bool** | Default: **false** | _optional_

Allow to specify visibility behavior for SSR. 
If you use SSR and want to use lazy loading for some images (maybe some images which are not on initial viewport) it's recommended to set emptyOnSsr to true. 

## <a name="browser_support"></a>Browser support

Tested in all modern browsers and IE 11.

## <a name="ui_family"></a>Filerobot UI Familiy

* [JS Cloudimage Responsive](https://github.com/scaleflex/js-cloudimage-responsive)
* [React Cloudimage Responsive](https://github.com/scaleflex/react-cloudimage-responsive)
* [JS Cloudimage 360 view](https://github.com/scaleflex/js-cloudimage-360-view)
* [Image Editor](https://github.com/scaleflex/filerobot-image-editor)
* [Uploader](https://github.com/scaleflex/filerobot-uploader)

## <a name="contributing"></a>Contributing!

All contributions are super welcome!


## <a name="license"></a>License
Angular Cloudimage Responsive is provided under the [MIT License](https://opensource.org/licenses/MIT)
