# react-scrollwatch

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

## Motivation
There are a couple of existing libraries for handling scroll events: [scrollwatch](https://github.com/edull24/ScrollWatch) and [react-component-visibility](https://github.com/Pomax/react-component-visibility).
However neither of these worked well in modern [react](https://facebook.github.io/react/) projects.

`react-scrollwatch` is a simple higher order component (HOC) that makes reacting to when a components shows up in the viewport.

## Browser only
This module depends on a browser environment with `document` and `window`.
Other environments such as those available through React Native is not currently supported.

## Install
```bash
npm i -S react-scrollwatch
```

## Usage
`react-scrollwatch` relies on [nwb](https://github.com/insin/nwb).
This is mainly for packaging into various types of npm-ready modules (compatible with UMD, CommonJS, ES5, and ES6).
Run the example to see this component in action:
```bash
git clone https://github.com/vuldin/react-scrollwatch.git
cd react-scollwatch
npm i -g nwb
npm i
npm start
```
Open [http://localhost:3000](http://localhost:3000) and scroll down the page to see a div change background color when in view.

## Properties
All properties are optional.
- **shownPercent** (default: `'50%'`): percentage of the div that needs to be shown from either side before being considerd 'shown'
- **throttle** (default: `250`): milliseconds to wait between listening for one of the following listeners:
  1. visibilitychange (on document)
  2. scroll (on document)
  3. resize (on window)
- **onShown** (default: function `undefined`): if defined this function will be passed the JSON version of the style from the wrapped component once it is considered visible.
- **onHidden** (default: function `undefined`): if defined this function will be passed the JSON version of the style from the wrapped component once it is considered hidden.
- *style properties* (default: none): Pass any css styles you wish as properties to this higher order component... they will be applied as inline styled to the wrapped component.

# Guidelines
- *This HOC must wrap a React component.* Normal elements will result in an error.

## Testing
While testing is built in to this project (thanks to [nwb](https://github.com/insin/nwb)!) I have not yet created tests. *Check back later!*

[build-badge]: https://img.shields.io/travis/vuldin/react-scrollwatch/master.png?style=flat-square
[build]: https://travis-ci.org/vuldin/react-scrollwatch

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-scrollwatch

[coveralls-badge]: https://img.shields.io/coveralls/vuldin/react-scrollwatch/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/vuldin/react-scrollwatch
