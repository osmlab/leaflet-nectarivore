(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("leaflet"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("leaflet")) : factory(root["L"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE_leaflet__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/js-clipper/clipper.js":
/*!********************************************!*\
  !*** ./node_modules/js-clipper/clipper.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// rev 452
/********************************************************************************
*                                                                              *
* Author    :  Angus Johnson                                                   *
* Version   :  6.1.3a                                                          *
* Date      :  22 January 2014                                                 *
* Website   :  http://www.angusj.com                                           *
* Copyright :  Angus Johnson 2010-2014                                         *
*                                                                              *
* License:                                                                     *
* Use, modification & distribution is subject to Boost Software License Ver 1. *
* http://www.boost.org/LICENSE_1_0.txt                                         *
*                                                                              *
* Attributions:                                                                *
* The code in this library is an extension of Bala Vatti's clipping algorithm: *
* "A generic solution to polygon clipping"                                     *
* Communications of the ACM, Vol 35, Issue 7 (July 1992) pp 56-63.             *
* http://portal.acm.org/citation.cfm?id=129906                                 *
*                                                                              *
* Computer graphics and geometric modeling: implementation and algorithms      *
* By Max K. Agoston                                                            *
* Springer; 1 edition (January 4, 2005)                                        *
* http://books.google.com/books?q=vatti+clipping+agoston                       *
*                                                                              *
* See also:                                                                    *
* "Polygon Offsetting by Computing Winding Numbers"                            *
* Paper no. DETC2005-85513 pp. 565-575                                         *
* ASME 2005 International Design Engineering Technical Conferences             *
* and Computers and Information in Engineering Conference (IDETC/CIE2005)      *
* September 24-28, 2005 , Long Beach, California, USA                          *
* http://www.me.berkeley.edu/~mcmains/pubs/DAC05OffsetPolygon.pdf              *
*                                                                              *
*******************************************************************************/
/*******************************************************************************
*                                                                              *
* Author    :  Timo                                                            *
* Version   :  6.1.3.2                                                         *
* Date      :  1 February 2014                                                 *
*                                                                              *
* This is a translation of the C# Clipper library to Javascript.               *
* Int128 struct of C# is implemented using JSBN of Tom Wu.                     *
* Because Javascript lacks support for 64-bit integers, the space              *
* is a little more restricted than in C# version.                              *
*                                                                              *
* C# version has support for coordinate space:                                 *
* +-4611686018427387903 ( sqrt(2^127 -1)/2 )                                   *
* while Javascript version has support for space:                              *
* +-4503599627370495 ( sqrt(2^106 -1)/2 )                                      *
*                                                                              *
* Tom Wu's JSBN proved to be the fastest big integer library:                  *
* http://jsperf.com/big-integer-library-test                                   *
*                                                                              *
* This class can be made simpler when (if ever) 64-bit integer support comes.  *
*                                                                              *
*******************************************************************************/
/*******************************************************************************
*                                                                              *
* Basic JavaScript BN library - subset useful for RSA encryption.              *
* http://www-cs-students.stanford.edu/~tjw/jsbn/                               *
* Copyright (c) 2005  Tom Wu                                                   *
* All Rights Reserved.                                                         *
* See "LICENSE" for details:                                                   *
* http://www-cs-students.stanford.edu/~tjw/jsbn/LICENSE                        *
*                                                                              *
*******************************************************************************/


//use_int32: When enabled 32bit ints are used instead of 64bit ints. This
//improve performance but coordinate values are limited to the range +/- 46340
var use_int32 = false;
//use_xyz: adds a Z member to IntPoint. Adds a minor cost to performance.
var use_xyz = false;
//UseLines: Enables line clipping. Adds a very minor cost to performance.
var use_lines = true;
//use_deprecated: Enables support for the obsolete OffsetPaths() function
//which has been replace with the ClipperOffset class.
var use_deprecated = false;

var ClipperLib = {};
var isNode = false;
if (typeof module !== 'undefined' && module.exports)
{
  module.exports = ClipperLib;
  isNode = true;
}
else
{
  if (typeof (document) !== "undefined") window.ClipperLib = ClipperLib;
  else self['ClipperLib'] = ClipperLib;
}
var navigator_appName;
if (!isNode)
{
  var nav = navigator.userAgent.toString().toLowerCase();
  navigator_appName = navigator.appName;
}
else
{
  var nav = "chrome"; // Node.js uses Chrome's V8 engine
  navigator_appName = "Netscape"; // Firefox, Chrome and Safari returns "Netscape", so Node.js should also
}
// Browser test to speedup performance critical functions
var browser = {};
if (nav.indexOf("chrome") != -1 && nav.indexOf("chromium") == -1) browser.chrome = 1;
else browser.chrome = 0;
if (nav.indexOf("chromium") != -1) browser.chromium = 1;
else browser.chromium = 0;
if (nav.indexOf("safari") != -1 && nav.indexOf("chrome") == -1 && nav.indexOf("chromium") == -1) browser.safari = 1;
else browser.safari = 0;
if (nav.indexOf("firefox") != -1) browser.firefox = 1;
else browser.firefox = 0;
if (nav.indexOf("firefox/17") != -1) browser.firefox17 = 1;
else browser.firefox17 = 0;
if (nav.indexOf("firefox/15") != -1) browser.firefox15 = 1;
else browser.firefox15 = 0;
if (nav.indexOf("firefox/3") != -1) browser.firefox3 = 1;
else browser.firefox3 = 0;
if (nav.indexOf("opera") != -1) browser.opera = 1;
else browser.opera = 0;
if (nav.indexOf("msie 10") != -1) browser.msie10 = 1;
else browser.msie10 = 0;
if (nav.indexOf("msie 9") != -1) browser.msie9 = 1;
else browser.msie9 = 0;
if (nav.indexOf("msie 8") != -1) browser.msie8 = 1;
else browser.msie8 = 0;
if (nav.indexOf("msie 7") != -1) browser.msie7 = 1;
else browser.msie7 = 0;
if (nav.indexOf("msie ") != -1) browser.msie = 1;
else browser.msie = 0;
ClipperLib.biginteger_used = null;
// Copyright (c) 2005  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.
// Basic JavaScript BN library - subset useful for RSA encryption.
// Bits per digit
var dbits;
// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = ((canary & 0xffffff) == 0xefcafe);
// (public) Constructor
function BigInteger(a, b, c)
{
  // This test variable can be removed,
  // but at least for performance tests it is useful piece of knowledge
  // This is the only ClipperLib related variable in BigInteger library
  ClipperLib.biginteger_used = 1;
  if (a != null)
    if ("number" == typeof a && "undefined" == typeof (b)) this.fromInt(a); // faster conversion
    else if ("number" == typeof a) this.fromNumber(a, b, c);
  else if (b == null && "string" != typeof a) this.fromString(a, 256);
  else this.fromString(a, b);
}
// return new, unset BigInteger
function nbi()
{
  return new BigInteger(null);
}
// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.
// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
function am1(i, x, w, j, c, n)
{
  while (--n >= 0)
  {
    var v = x * this[i++] + w[j] + c;
    c = Math.floor(v / 0x4000000);
    w[j++] = v & 0x3ffffff;
  }
  return c;
}
// am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
function am2(i, x, w, j, c, n)
{
  var xl = x & 0x7fff,
    xh = x >> 15;
  while (--n >= 0)
  {
    var l = this[i] & 0x7fff;
    var h = this[i++] >> 15;
    var m = xh * l + h * xl;
    l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
    c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
    w[j++] = l & 0x3fffffff;
  }
  return c;
}
// Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
function am3(i, x, w, j, c, n)
{
  var xl = x & 0x3fff,
    xh = x >> 14;
  while (--n >= 0)
  {
    var l = this[i] & 0x3fff;
    var h = this[i++] >> 14;
    var m = xh * l + h * xl;
    l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
    c = (l >> 28) + (m >> 14) + xh * h;
    w[j++] = l & 0xfffffff;
  }
  return c;
}
if (j_lm && (navigator_appName == "Microsoft Internet Explorer"))
{
  BigInteger.prototype.am = am2;
  dbits = 30;
}
else if (j_lm && (navigator_appName != "Netscape"))
{
  BigInteger.prototype.am = am1;
  dbits = 26;
}
else
{ // Mozilla/Netscape seems to prefer am3
  BigInteger.prototype.am = am3;
  dbits = 28;
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1 << dbits) - 1);
BigInteger.prototype.DV = (1 << dbits);
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
// Digit conversions
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr, vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

function int2char(n)
{
  return BI_RM.charAt(n);
}

function intAt(s, i)
{
  var c = BI_RC[s.charCodeAt(i)];
  return (c == null) ? -1 : c;
}
// (protected) copy this to r
function bnpCopyTo(r)
{
  for (var i = this.t - 1; i >= 0; --i) r[i] = this[i];
  r.t = this.t;
  r.s = this.s;
}
// (protected) set from integer value x, -DV <= x < DV
function bnpFromInt(x)
{
  this.t = 1;
  this.s = (x < 0) ? -1 : 0;
  if (x > 0) this[0] = x;
  else if (x < -1) this[0] = x + this.DV;
  else this.t = 0;
}
// return bigint initialized to value
function nbv(i)
{
  var r = nbi();
  r.fromInt(i);
  return r;
}
// (protected) set from string and radix
function bnpFromString(s, b)
{
  var k;
  if (b == 16) k = 4;
  else if (b == 8) k = 3;
  else if (b == 256) k = 8; // byte array
  else if (b == 2) k = 1;
  else if (b == 32) k = 5;
  else if (b == 4) k = 2;
  else
  {
    this.fromRadix(s, b);
    return;
  }
  this.t = 0;
  this.s = 0;
  var i = s.length,
    mi = false,
    sh = 0;
  while (--i >= 0)
  {
    var x = (k == 8) ? s[i] & 0xff : intAt(s, i);
    if (x < 0)
    {
      if (s.charAt(i) == "-") mi = true;
      continue;
    }
    mi = false;
    if (sh == 0)
      this[this.t++] = x;
    else if (sh + k > this.DB)
    {
      this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
      this[this.t++] = (x >> (this.DB - sh));
    }
    else
      this[this.t - 1] |= x << sh;
    sh += k;
    if (sh >= this.DB) sh -= this.DB;
  }
  if (k == 8 && (s[0] & 0x80) != 0)
  {
    this.s = -1;
    if (sh > 0) this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
  }
  this.clamp();
  if (mi) BigInteger.ZERO.subTo(this, this);
}
// (protected) clamp off excess high words
function bnpClamp()
{
  var c = this.s & this.DM;
  while (this.t > 0 && this[this.t - 1] == c)--this.t;
}
// (public) return string representation in given radix
function bnToString(b)
{
  if (this.s < 0) return "-" + this.negate().toString(b);
  var k;
  if (b == 16) k = 4;
  else if (b == 8) k = 3;
  else if (b == 2) k = 1;
  else if (b == 32) k = 5;
  else if (b == 4) k = 2;
  else return this.toRadix(b);
  var km = (1 << k) - 1,
    d, m = false,
    r = "",
    i = this.t;
  var p = this.DB - (i * this.DB) % k;
  if (i-- > 0)
  {
    if (p < this.DB && (d = this[i] >> p) > 0)
    {
      m = true;
      r = int2char(d);
    }
    while (i >= 0)
    {
      if (p < k)
      {
        d = (this[i] & ((1 << p) - 1)) << (k - p);
        d |= this[--i] >> (p += this.DB - k);
      }
      else
      {
        d = (this[i] >> (p -= k)) & km;
        if (p <= 0)
        {
          p += this.DB;
          --i;
        }
      }
      if (d > 0) m = true;
      if (m) r += int2char(d);
    }
  }
  return m ? r : "0";
}
// (public) -this
function bnNegate()
{
  var r = nbi();
  BigInteger.ZERO.subTo(this, r);
  return r;
}
// (public) |this|
function bnAbs()
{
  return (this.s < 0) ? this.negate() : this;
}
// (public) return + if this > a, - if this < a, 0 if equal
function bnCompareTo(a)
{
  var r = this.s - a.s;
  if (r != 0) return r;
  var i = this.t;
  r = i - a.t;
  if (r != 0) return (this.s < 0) ? -r : r;
  while (--i >= 0)
    if ((r = this[i] - a[i]) != 0) return r;
  return 0;
}
// returns bit length of the integer x
function nbits(x)
{
  var r = 1,
    t;
  if ((t = x >>> 16) != 0)
  {
    x = t;
    r += 16;
  }
  if ((t = x >> 8) != 0)
  {
    x = t;
    r += 8;
  }
  if ((t = x >> 4) != 0)
  {
    x = t;
    r += 4;
  }
  if ((t = x >> 2) != 0)
  {
    x = t;
    r += 2;
  }
  if ((t = x >> 1) != 0)
  {
    x = t;
    r += 1;
  }
  return r;
}
// (public) return the number of bits in "this"
function bnBitLength()
{
  if (this.t <= 0) return 0;
  return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
}
// (protected) r = this << n*DB
function bnpDLShiftTo(n, r)
{
  var i;
  for (i = this.t - 1; i >= 0; --i) r[i + n] = this[i];
  for (i = n - 1; i >= 0; --i) r[i] = 0;
  r.t = this.t + n;
  r.s = this.s;
}
// (protected) r = this >> n*DB
function bnpDRShiftTo(n, r)
{
  for (var i = n; i < this.t; ++i) r[i - n] = this[i];
  r.t = Math.max(this.t - n, 0);
  r.s = this.s;
}
// (protected) r = this << n
function bnpLShiftTo(n, r)
{
  var bs = n % this.DB;
  var cbs = this.DB - bs;
  var bm = (1 << cbs) - 1;
  var ds = Math.floor(n / this.DB),
    c = (this.s << bs) & this.DM,
    i;
  for (i = this.t - 1; i >= 0; --i)
  {
    r[i + ds + 1] = (this[i] >> cbs) | c;
    c = (this[i] & bm) << bs;
  }
  for (i = ds - 1; i >= 0; --i) r[i] = 0;
  r[ds] = c;
  r.t = this.t + ds + 1;
  r.s = this.s;
  r.clamp();
}
// (protected) r = this >> n
function bnpRShiftTo(n, r)
{
  r.s = this.s;
  var ds = Math.floor(n / this.DB);
  if (ds >= this.t)
  {
    r.t = 0;
    return;
  }
  var bs = n % this.DB;
  var cbs = this.DB - bs;
  var bm = (1 << bs) - 1;
  r[0] = this[ds] >> bs;
  for (var i = ds + 1; i < this.t; ++i)
  {
    r[i - ds - 1] |= (this[i] & bm) << cbs;
    r[i - ds] = this[i] >> bs;
  }
  if (bs > 0) r[this.t - ds - 1] |= (this.s & bm) << cbs;
  r.t = this.t - ds;
  r.clamp();
}
// (protected) r = this - a
function bnpSubTo(a, r)
{
  var i = 0,
    c = 0,
    m = Math.min(a.t, this.t);
  while (i < m)
  {
    c += this[i] - a[i];
    r[i++] = c & this.DM;
    c >>= this.DB;
  }
  if (a.t < this.t)
  {
    c -= a.s;
    while (i < this.t)
    {
      c += this[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    c += this.s;
  }
  else
  {
    c += this.s;
    while (i < a.t)
    {
      c -= a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    c -= a.s;
  }
  r.s = (c < 0) ? -1 : 0;
  if (c < -1) r[i++] = this.DV + c;
  else if (c > 0) r[i++] = c;
  r.t = i;
  r.clamp();
}
// (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.
function bnpMultiplyTo(a, r)
{
  var x = this.abs(),
    y = a.abs();
  var i = x.t;
  r.t = i + y.t;
  while (--i >= 0) r[i] = 0;
  for (i = 0; i < y.t; ++i) r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
  r.s = 0;
  r.clamp();
  if (this.s != a.s) BigInteger.ZERO.subTo(r, r);
}
// (protected) r = this^2, r != this (HAC 14.16)
function bnpSquareTo(r)
{
  var x = this.abs();
  var i = r.t = 2 * x.t;
  while (--i >= 0) r[i] = 0;
  for (i = 0; i < x.t - 1; ++i)
  {
    var c = x.am(i, x[i], r, 2 * i, 0, 1);
    if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV)
    {
      r[i + x.t] -= x.DV;
      r[i + x.t + 1] = 1;
    }
  }
  if (r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
  r.s = 0;
  r.clamp();
}
// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.
function bnpDivRemTo(m, q, r)
{
  var pm = m.abs();
  if (pm.t <= 0) return;
  var pt = this.abs();
  if (pt.t < pm.t)
  {
    if (q != null) q.fromInt(0);
    if (r != null) this.copyTo(r);
    return;
  }
  if (r == null) r = nbi();
  var y = nbi(),
    ts = this.s,
    ms = m.s;
  var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus
  if (nsh > 0)
  {
    pm.lShiftTo(nsh, y);
    pt.lShiftTo(nsh, r);
  }
  else
  {
    pm.copyTo(y);
    pt.copyTo(r);
  }
  var ys = y.t;
  var y0 = y[ys - 1];
  if (y0 == 0) return;
  var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
  var d1 = this.FV / yt,
    d2 = (1 << this.F1) / yt,
    e = 1 << this.F2;
  var i = r.t,
    j = i - ys,
    t = (q == null) ? nbi() : q;
  y.dlShiftTo(j, t);
  if (r.compareTo(t) >= 0)
  {
    r[r.t++] = 1;
    r.subTo(t, r);
  }
  BigInteger.ONE.dlShiftTo(ys, t);
  t.subTo(y, y); // "negative" y so we can replace sub with am later
  while (y.t < ys) y[y.t++] = 0;
  while (--j >= 0)
  {
    // Estimate quotient digit
    var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
    if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd)
    { // Try it out
      y.dlShiftTo(j, t);
      r.subTo(t, r);
      while (r[i] < --qd) r.subTo(t, r);
    }
  }
  if (q != null)
  {
    r.drShiftTo(ys, q);
    if (ts != ms) BigInteger.ZERO.subTo(q, q);
  }
  r.t = ys;
  r.clamp();
  if (nsh > 0) r.rShiftTo(nsh, r); // Denormalize remainder
  if (ts < 0) BigInteger.ZERO.subTo(r, r);
}
// (public) this mod a
function bnMod(a)
{
  var r = nbi();
  this.abs().divRemTo(a, null, r);
  if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r, r);
  return r;
}
// Modular reduction using "classic" algorithm
function Classic(m)
{
  this.m = m;
}

function cConvert(x)
{
  if (x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
  else return x;
}

function cRevert(x)
{
  return x;
}

function cReduce(x)
{
  x.divRemTo(this.m, null, x);
}

function cMulTo(x, y, r)
{
  x.multiplyTo(y, r);
  this.reduce(r);
}

function cSqrTo(x, r)
{
  x.squareTo(r);
  this.reduce(r);
}
Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;
// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.
function bnpInvDigit()
{
  if (this.t < 1) return 0;
  var x = this[0];
  if ((x & 1) == 0) return 0;
  var y = x & 3; // y == 1/x mod 2^2
  y = (y * (2 - (x & 0xf) * y)) & 0xf; // y == 1/x mod 2^4
  y = (y * (2 - (x & 0xff) * y)) & 0xff; // y == 1/x mod 2^8
  y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff; // y == 1/x mod 2^16
  // last step - calculate inverse mod DV directly;
  // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
  y = (y * (2 - x * y % this.DV)) % this.DV; // y == 1/x mod 2^dbits
  // we really want the negative inverse, and -DV < y < DV
  return (y > 0) ? this.DV - y : -y;
}
// Montgomery reduction
function Montgomery(m)
{
  this.m = m;
  this.mp = m.invDigit();
  this.mpl = this.mp & 0x7fff;
  this.mph = this.mp >> 15;
  this.um = (1 << (m.DB - 15)) - 1;
  this.mt2 = 2 * m.t;
}
// xR mod m
function montConvert(x)
{
  var r = nbi();
  x.abs().dlShiftTo(this.m.t, r);
  r.divRemTo(this.m, null, r);
  if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r, r);
  return r;
}
// x/R mod m
function montRevert(x)
{
  var r = nbi();
  x.copyTo(r);
  this.reduce(r);
  return r;
}
// x = x/R mod m (HAC 14.32)
function montReduce(x)
{
  while (x.t <= this.mt2) // pad x so am has enough room later
    x[x.t++] = 0;
  for (var i = 0; i < this.m.t; ++i)
  {
    // faster way of calculating u0 = x[i]*mp mod DV
    var j = x[i] & 0x7fff;
    var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
    // use am to combine the multiply-shift-add into one call
    j = i + this.m.t;
    x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
    // propagate carry
    while (x[j] >= x.DV)
    {
      x[j] -= x.DV;
      x[++j]++;
    }
  }
  x.clamp();
  x.drShiftTo(this.m.t, x);
  if (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
}
// r = "x^2/R mod m"; x != r
function montSqrTo(x, r)
{
  x.squareTo(r);
  this.reduce(r);
}
// r = "xy/R mod m"; x,y != r
function montMulTo(x, y, r)
{
  x.multiplyTo(y, r);
  this.reduce(r);
}
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;
// (protected) true iff this is even
function bnpIsEven()
{
  return ((this.t > 0) ? (this[0] & 1) : this.s) == 0;
}
// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
function bnpExp(e, z)
{
  if (e > 0xffffffff || e < 1) return BigInteger.ONE;
  var r = nbi(),
    r2 = nbi(),
    g = z.convert(this),
    i = nbits(e) - 1;
  g.copyTo(r);
  while (--i >= 0)
  {
    z.sqrTo(r, r2);
    if ((e & (1 << i)) > 0) z.mulTo(r2, g, r);
    else
    {
      var t = r;
      r = r2;
      r2 = t;
    }
  }
  return z.revert(r);
}
// (public) this^e % m, 0 <= e < 2^32
function bnModPowInt(e, m)
{
  var z;
  if (e < 256 || m.isEven()) z = new Classic(m);
  else z = new Montgomery(m);
  return this.exp(e, z);
}
// protected
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
// public
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
// "constants"
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
// Copyright (c) 2005-2009  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.
// Extended JavaScript BN functions, required for RSA private ops.
// Version 1.1: new BigInteger("0", 10) returns "proper" zero
// Version 1.2: square() API, isProbablePrime fix
// (public)
function bnClone()
{
  var r = nbi();
  this.copyTo(r);
  return r;
}
// (public) return value as integer
function bnIntValue()
{
  if (this.s < 0)
  {
    if (this.t == 1) return this[0] - this.DV;
    else if (this.t == 0) return -1;
  }
  else if (this.t == 1) return this[0];
  else if (this.t == 0) return 0;
  // assumes 16 < DB < 32
  return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0];
}
// (public) return value as byte
function bnByteValue()
{
  return (this.t == 0) ? this.s : (this[0] << 24) >> 24;
}
// (public) return value as short (assumes DB>=16)
function bnShortValue()
{
  return (this.t == 0) ? this.s : (this[0] << 16) >> 16;
}
// (protected) return x s.t. r^x < DV
function bnpChunkSize(r)
{
  return Math.floor(Math.LN2 * this.DB / Math.log(r));
}
// (public) 0 if this == 0, 1 if this > 0
function bnSigNum()
{
  if (this.s < 0) return -1;
  else if (this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
  else return 1;
}
// (protected) convert to radix string
function bnpToRadix(b)
{
  if (b == null) b = 10;
  if (this.signum() == 0 || b < 2 || b > 36) return "0";
  var cs = this.chunkSize(b);
  var a = Math.pow(b, cs);
  var d = nbv(a),
    y = nbi(),
    z = nbi(),
    r = "";
  this.divRemTo(d, y, z);
  while (y.signum() > 0)
  {
    r = (a + z.intValue()).toString(b).substr(1) + r;
    y.divRemTo(d, y, z);
  }
  return z.intValue().toString(b) + r;
}
// (protected) convert from radix string
function bnpFromRadix(s, b)
{
  this.fromInt(0);
  if (b == null) b = 10;
  var cs = this.chunkSize(b);
  var d = Math.pow(b, cs),
    mi = false,
    j = 0,
    w = 0;
  for (var i = 0; i < s.length; ++i)
  {
    var x = intAt(s, i);
    if (x < 0)
    {
      if (s.charAt(i) == "-" && this.signum() == 0) mi = true;
      continue;
    }
    w = b * w + x;
    if (++j >= cs)
    {
      this.dMultiply(d);
      this.dAddOffset(w, 0);
      j = 0;
      w = 0;
    }
  }
  if (j > 0)
  {
    this.dMultiply(Math.pow(b, j));
    this.dAddOffset(w, 0);
  }
  if (mi) BigInteger.ZERO.subTo(this, this);
}
// (protected) alternate constructor
function bnpFromNumber(a, b, c)
{
  if ("number" == typeof b)
  {
    // new BigInteger(int,int,RNG)
    if (a < 2) this.fromInt(1);
    else
    {
      this.fromNumber(a, c);
      if (!this.testBit(a - 1)) // force MSB set
        this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
      if (this.isEven()) this.dAddOffset(1, 0); // force odd
      while (!this.isProbablePrime(b))
      {
        this.dAddOffset(2, 0);
        if (this.bitLength() > a) this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
      }
    }
  }
  else
  {
    // new BigInteger(int,RNG)
    var x = new Array(),
      t = a & 7;
    x.length = (a >> 3) + 1;
    b.nextBytes(x);
    if (t > 0) x[0] &= ((1 << t) - 1);
    else x[0] = 0;
    this.fromString(x, 256);
  }
}
// (public) convert to bigendian byte array
function bnToByteArray()
{
  var i = this.t,
    r = new Array();
  r[0] = this.s;
  var p = this.DB - (i * this.DB) % 8,
    d, k = 0;
  if (i-- > 0)
  {
    if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p)
      r[k++] = d | (this.s << (this.DB - p));
    while (i >= 0)
    {
      if (p < 8)
      {
        d = (this[i] & ((1 << p) - 1)) << (8 - p);
        d |= this[--i] >> (p += this.DB - 8);
      }
      else
      {
        d = (this[i] >> (p -= 8)) & 0xff;
        if (p <= 0)
        {
          p += this.DB;
          --i;
        }
      }
      if ((d & 0x80) != 0) d |= -256;
      if (k == 0 && (this.s & 0x80) != (d & 0x80))++k;
      if (k > 0 || d != this.s) r[k++] = d;
    }
  }
  return r;
}

function bnEquals(a)
{
  return (this.compareTo(a) == 0);
}

function bnMin(a)
{
  return (this.compareTo(a) < 0) ? this : a;
}

function bnMax(a)
{
  return (this.compareTo(a) > 0) ? this : a;
}
// (protected) r = this op a (bitwise)
function bnpBitwiseTo(a, op, r)
{
  var i, f, m = Math.min(a.t, this.t);
  for (i = 0; i < m; ++i) r[i] = op(this[i], a[i]);
  if (a.t < this.t)
  {
    f = a.s & this.DM;
    for (i = m; i < this.t; ++i) r[i] = op(this[i], f);
    r.t = this.t;
  }
  else
  {
    f = this.s & this.DM;
    for (i = m; i < a.t; ++i) r[i] = op(f, a[i]);
    r.t = a.t;
  }
  r.s = op(this.s, a.s);
  r.clamp();
}
// (public) this & a
function op_and(x, y)
{
  return x & y;
}

function bnAnd(a)
{
  var r = nbi();
  this.bitwiseTo(a, op_and, r);
  return r;
}
// (public) this | a
function op_or(x, y)
{
  return x | y;
}

function bnOr(a)
{
  var r = nbi();
  this.bitwiseTo(a, op_or, r);
  return r;
}
// (public) this ^ a
function op_xor(x, y)
{
  return x ^ y;
}

function bnXor(a)
{
  var r = nbi();
  this.bitwiseTo(a, op_xor, r);
  return r;
}
// (public) this & ~a
function op_andnot(x, y)
{
  return x & ~y;
}

function bnAndNot(a)
{
  var r = nbi();
  this.bitwiseTo(a, op_andnot, r);
  return r;
}
// (public) ~this
function bnNot()
{
  var r = nbi();
  for (var i = 0; i < this.t; ++i) r[i] = this.DM & ~this[i];
  r.t = this.t;
  r.s = ~this.s;
  return r;
}
// (public) this << n
function bnShiftLeft(n)
{
  var r = nbi();
  if (n < 0) this.rShiftTo(-n, r);
  else this.lShiftTo(n, r);
  return r;
}
// (public) this >> n
function bnShiftRight(n)
{
  var r = nbi();
  if (n < 0) this.lShiftTo(-n, r);
  else this.rShiftTo(n, r);
  return r;
}
// return index of lowest 1-bit in x, x < 2^31
function lbit(x)
{
  if (x == 0) return -1;
  var r = 0;
  if ((x & 0xffff) == 0)
  {
    x >>= 16;
    r += 16;
  }
  if ((x & 0xff) == 0)
  {
    x >>= 8;
    r += 8;
  }
  if ((x & 0xf) == 0)
  {
    x >>= 4;
    r += 4;
  }
  if ((x & 3) == 0)
  {
    x >>= 2;
    r += 2;
  }
  if ((x & 1) == 0)++r;
  return r;
}
// (public) returns index of lowest 1-bit (or -1 if none)
function bnGetLowestSetBit()
{
  for (var i = 0; i < this.t; ++i)
    if (this[i] != 0) return i * this.DB + lbit(this[i]);
  if (this.s < 0) return this.t * this.DB;
  return -1;
}
// return number of 1 bits in x
function cbit(x)
{
  var r = 0;
  while (x != 0)
  {
    x &= x - 1;
    ++r;
  }
  return r;
}
// (public) return number of set bits
function bnBitCount()
{
  var r = 0,
    x = this.s & this.DM;
  for (var i = 0; i < this.t; ++i) r += cbit(this[i] ^ x);
  return r;
}
// (public) true iff nth bit is set
function bnTestBit(n)
{
  var j = Math.floor(n / this.DB);
  if (j >= this.t) return (this.s != 0);
  return ((this[j] & (1 << (n % this.DB))) != 0);
}
// (protected) this op (1<<n)
function bnpChangeBit(n, op)
{
  var r = BigInteger.ONE.shiftLeft(n);
  this.bitwiseTo(r, op, r);
  return r;
}
// (public) this | (1<<n)
function bnSetBit(n)
{
  return this.changeBit(n, op_or);
}
// (public) this & ~(1<<n)
function bnClearBit(n)
{
  return this.changeBit(n, op_andnot);
}
// (public) this ^ (1<<n)
function bnFlipBit(n)
{
  return this.changeBit(n, op_xor);
}
// (protected) r = this + a
function bnpAddTo(a, r)
{
  var i = 0,
    c = 0,
    m = Math.min(a.t, this.t);
  while (i < m)
  {
    c += this[i] + a[i];
    r[i++] = c & this.DM;
    c >>= this.DB;
  }
  if (a.t < this.t)
  {
    c += a.s;
    while (i < this.t)
    {
      c += this[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    c += this.s;
  }
  else
  {
    c += this.s;
    while (i < a.t)
    {
      c += a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    c += a.s;
  }
  r.s = (c < 0) ? -1 : 0;
  if (c > 0) r[i++] = c;
  else if (c < -1) r[i++] = this.DV + c;
  r.t = i;
  r.clamp();
}
// (public) this + a
function bnAdd(a)
{
  var r = nbi();
  this.addTo(a, r);
  return r;
}
// (public) this - a
function bnSubtract(a)
{
  var r = nbi();
  this.subTo(a, r);
  return r;
}
// (public) this * a
function bnMultiply(a)
{
  var r = nbi();
  this.multiplyTo(a, r);
  return r;
}
// (public) this^2
function bnSquare()
{
  var r = nbi();
  this.squareTo(r);
  return r;
}
// (public) this / a
function bnDivide(a)
{
  var r = nbi();
  this.divRemTo(a, r, null);
  return r;
}
// (public) this % a
function bnRemainder(a)
{
  var r = nbi();
  this.divRemTo(a, null, r);
  return r;
}
// (public) [this/a,this%a]
function bnDivideAndRemainder(a)
{
  var q = nbi(),
    r = nbi();
  this.divRemTo(a, q, r);
  return new Array(q, r);
}
// (protected) this *= n, this >= 0, 1 < n < DV
function bnpDMultiply(n)
{
  this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
  ++this.t;
  this.clamp();
}
// (protected) this += n << w words, this >= 0
function bnpDAddOffset(n, w)
{
  if (n == 0) return;
  while (this.t <= w) this[this.t++] = 0;
  this[w] += n;
  while (this[w] >= this.DV)
  {
    this[w] -= this.DV;
    if (++w >= this.t) this[this.t++] = 0;
    ++this[w];
  }
}
// A "null" reducer
function NullExp()
{}

function nNop(x)
{
  return x;
}

function nMulTo(x, y, r)
{
  x.multiplyTo(y, r);
}

function nSqrTo(x, r)
{
  x.squareTo(r);
}
NullExp.prototype.convert = nNop;
NullExp.prototype.revert = nNop;
NullExp.prototype.mulTo = nMulTo;
NullExp.prototype.sqrTo = nSqrTo;
// (public) this^e
function bnPow(e)
{
  return this.exp(e, new NullExp());
}
// (protected) r = lower n words of "this * a", a.t <= n
// "this" should be the larger one if appropriate.
function bnpMultiplyLowerTo(a, n, r)
{
  var i = Math.min(this.t + a.t, n);
  r.s = 0; // assumes a,this >= 0
  r.t = i;
  while (i > 0) r[--i] = 0;
  var j;
  for (j = r.t - this.t; i < j; ++i) r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
  for (j = Math.min(a.t, n); i < j; ++i) this.am(0, a[i], r, i, 0, n - i);
  r.clamp();
}
// (protected) r = "this * a" without lower n words, n > 0
// "this" should be the larger one if appropriate.
function bnpMultiplyUpperTo(a, n, r)
{
  --n;
  var i = r.t = this.t + a.t - n;
  r.s = 0; // assumes a,this >= 0
  while (--i >= 0) r[i] = 0;
  for (i = Math.max(n - this.t, 0); i < a.t; ++i)
    r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
  r.clamp();
  r.drShiftTo(1, r);
}
// Barrett modular reduction
function Barrett(m)
{
  // setup Barrett
  this.r2 = nbi();
  this.q3 = nbi();
  BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
  this.mu = this.r2.divide(m);
  this.m = m;
}

function barrettConvert(x)
{
  if (x.s < 0 || x.t > 2 * this.m.t) return x.mod(this.m);
  else if (x.compareTo(this.m) < 0) return x;
  else
  {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
  }
}

function barrettRevert(x)
{
  return x;
}
// x = x mod m (HAC 14.42)
function barrettReduce(x)
{
  x.drShiftTo(this.m.t - 1, this.r2);
  if (x.t > this.m.t + 1)
  {
    x.t = this.m.t + 1;
    x.clamp();
  }
  this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
  this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
  while (x.compareTo(this.r2) < 0) x.dAddOffset(1, this.m.t + 1);
  x.subTo(this.r2, x);
  while (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
}
// r = x^2 mod m; x != r
function barrettSqrTo(x, r)
{
  x.squareTo(r);
  this.reduce(r);
}
// r = x*y mod m; x,y != r
function barrettMulTo(x, y, r)
{
  x.multiplyTo(y, r);
  this.reduce(r);
}
Barrett.prototype.convert = barrettConvert;
Barrett.prototype.revert = barrettRevert;
Barrett.prototype.reduce = barrettReduce;
Barrett.prototype.mulTo = barrettMulTo;
Barrett.prototype.sqrTo = barrettSqrTo;
// (public) this^e % m (HAC 14.85)
function bnModPow(e, m)
{
  var i = e.bitLength(),
    k, r = nbv(1),
    z;
  if (i <= 0) return r;
  else if (i < 18) k = 1;
  else if (i < 48) k = 3;
  else if (i < 144) k = 4;
  else if (i < 768) k = 5;
  else k = 6;
  if (i < 8)
    z = new Classic(m);
  else if (m.isEven())
    z = new Barrett(m);
  else
    z = new Montgomery(m);
  // precomputation
  var g = new Array(),
    n = 3,
    k1 = k - 1,
    km = (1 << k) - 1;
  g[1] = z.convert(this);
  if (k > 1)
  {
    var g2 = nbi();
    z.sqrTo(g[1], g2);
    while (n <= km)
    {
      g[n] = nbi();
      z.mulTo(g2, g[n - 2], g[n]);
      n += 2;
    }
  }
  var j = e.t - 1,
    w, is1 = true,
    r2 = nbi(),
    t;
  i = nbits(e[j]) - 1;
  while (j >= 0)
  {
    if (i >= k1) w = (e[j] >> (i - k1)) & km;
    else
    {
      w = (e[j] & ((1 << (i + 1)) - 1)) << (k1 - i);
      if (j > 0) w |= e[j - 1] >> (this.DB + i - k1);
    }
    n = k;
    while ((w & 1) == 0)
    {
      w >>= 1;
      --n;
    }
    if ((i -= n) < 0)
    {
      i += this.DB;
      --j;
    }
    if (is1)
    { // ret == 1, don't bother squaring or multiplying it
      g[w].copyTo(r);
      is1 = false;
    }
    else
    {
      while (n > 1)
      {
        z.sqrTo(r, r2);
        z.sqrTo(r2, r);
        n -= 2;
      }
      if (n > 0) z.sqrTo(r, r2);
      else
      {
        t = r;
        r = r2;
        r2 = t;
      }
      z.mulTo(r2, g[w], r);
    }
    while (j >= 0 && (e[j] & (1 << i)) == 0)
    {
      z.sqrTo(r, r2);
      t = r;
      r = r2;
      r2 = t;
      if (--i < 0)
      {
        i = this.DB - 1;
        --j;
      }
    }
  }
  return z.revert(r);
}
// (public) gcd(this,a) (HAC 14.54)
function bnGCD(a)
{
  var x = (this.s < 0) ? this.negate() : this.clone();
  var y = (a.s < 0) ? a.negate() : a.clone();
  if (x.compareTo(y) < 0)
  {
    var t = x;
    x = y;
    y = t;
  }
  var i = x.getLowestSetBit(),
    g = y.getLowestSetBit();
  if (g < 0) return x;
  if (i < g) g = i;
  if (g > 0)
  {
    x.rShiftTo(g, x);
    y.rShiftTo(g, y);
  }
  while (x.signum() > 0)
  {
    if ((i = x.getLowestSetBit()) > 0) x.rShiftTo(i, x);
    if ((i = y.getLowestSetBit()) > 0) y.rShiftTo(i, y);
    if (x.compareTo(y) >= 0)
    {
      x.subTo(y, x);
      x.rShiftTo(1, x);
    }
    else
    {
      y.subTo(x, y);
      y.rShiftTo(1, y);
    }
  }
  if (g > 0) y.lShiftTo(g, y);
  return y;
}
// (protected) this % n, n < 2^26
function bnpModInt(n)
{
  if (n <= 0) return 0;
  var d = this.DV % n,
    r = (this.s < 0) ? n - 1 : 0;
  if (this.t > 0)
    if (d == 0) r = this[0] % n;
    else
      for (var i = this.t - 1; i >= 0; --i) r = (d * r + this[i]) % n;
  return r;
}
// (public) 1/this % m (HAC 14.61)
function bnModInverse(m)
{
  var ac = m.isEven();
  if ((this.isEven() && ac) || m.signum() == 0) return BigInteger.ZERO;
  var u = m.clone(),
    v = this.clone();
  var a = nbv(1),
    b = nbv(0),
    c = nbv(0),
    d = nbv(1);
  while (u.signum() != 0)
  {
    while (u.isEven())
    {
      u.rShiftTo(1, u);
      if (ac)
      {
        if (!a.isEven() || !b.isEven())
        {
          a.addTo(this, a);
          b.subTo(m, b);
        }
        a.rShiftTo(1, a);
      }
      else if (!b.isEven()) b.subTo(m, b);
      b.rShiftTo(1, b);
    }
    while (v.isEven())
    {
      v.rShiftTo(1, v);
      if (ac)
      {
        if (!c.isEven() || !d.isEven())
        {
          c.addTo(this, c);
          d.subTo(m, d);
        }
        c.rShiftTo(1, c);
      }
      else if (!d.isEven()) d.subTo(m, d);
      d.rShiftTo(1, d);
    }
    if (u.compareTo(v) >= 0)
    {
      u.subTo(v, u);
      if (ac) a.subTo(c, a);
      b.subTo(d, b);
    }
    else
    {
      v.subTo(u, v);
      if (ac) c.subTo(a, c);
      d.subTo(b, d);
    }
  }
  if (v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;
  if (d.compareTo(m) >= 0) return d.subtract(m);
  if (d.signum() < 0) d.addTo(m, d);
  else return d;
  if (d.signum() < 0) return d.add(m);
  else return d;
}
var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
// (public) test primality with certainty >= 1-.5^t
function bnIsProbablePrime(t)
{
  var i, x = this.abs();
  if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1])
  {
    for (i = 0; i < lowprimes.length; ++i)
      if (x[0] == lowprimes[i]) return true;
    return false;
  }
  if (x.isEven()) return false;
  i = 1;
  while (i < lowprimes.length)
  {
    var m = lowprimes[i],
      j = i + 1;
    while (j < lowprimes.length && m < lplim) m *= lowprimes[j++];
    m = x.modInt(m);
    while (i < j)
      if (m % lowprimes[i++] == 0) return false;
  }
  return x.millerRabin(t);
}
// (protected) true if probably prime (HAC 4.24, Miller-Rabin)
function bnpMillerRabin(t)
{
  var n1 = this.subtract(BigInteger.ONE);
  var k = n1.getLowestSetBit();
  if (k <= 0) return false;
  var r = n1.shiftRight(k);
  t = (t + 1) >> 1;
  if (t > lowprimes.length) t = lowprimes.length;
  var a = nbi();
  for (var i = 0; i < t; ++i)
  {
    //Pick bases at random, instead of starting at 2
    a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
    var y = a.modPow(r, this);
    if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0)
    {
      var j = 1;
      while (j++ < k && y.compareTo(n1) != 0)
      {
        y = y.modPowInt(2, this);
        if (y.compareTo(BigInteger.ONE) == 0) return false;
      }
      if (y.compareTo(n1) != 0) return false;
    }
  }
  return true;
}
// protected
BigInteger.prototype.chunkSize = bnpChunkSize;
BigInteger.prototype.toRadix = bnpToRadix;
BigInteger.prototype.fromRadix = bnpFromRadix;
BigInteger.prototype.fromNumber = bnpFromNumber;
BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
BigInteger.prototype.changeBit = bnpChangeBit;
BigInteger.prototype.addTo = bnpAddTo;
BigInteger.prototype.dMultiply = bnpDMultiply;
BigInteger.prototype.dAddOffset = bnpDAddOffset;
BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
BigInteger.prototype.modInt = bnpModInt;
BigInteger.prototype.millerRabin = bnpMillerRabin;
// public
BigInteger.prototype.clone = bnClone;
BigInteger.prototype.intValue = bnIntValue;
BigInteger.prototype.byteValue = bnByteValue;
BigInteger.prototype.shortValue = bnShortValue;
BigInteger.prototype.signum = bnSigNum;
BigInteger.prototype.toByteArray = bnToByteArray;
BigInteger.prototype.equals = bnEquals;
BigInteger.prototype.min = bnMin;
BigInteger.prototype.max = bnMax;
BigInteger.prototype.and = bnAnd;
BigInteger.prototype.or = bnOr;
BigInteger.prototype.xor = bnXor;
BigInteger.prototype.andNot = bnAndNot;
BigInteger.prototype.not = bnNot;
BigInteger.prototype.shiftLeft = bnShiftLeft;
BigInteger.prototype.shiftRight = bnShiftRight;
BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
BigInteger.prototype.bitCount = bnBitCount;
BigInteger.prototype.testBit = bnTestBit;
BigInteger.prototype.setBit = bnSetBit;
BigInteger.prototype.clearBit = bnClearBit;
BigInteger.prototype.flipBit = bnFlipBit;
BigInteger.prototype.add = bnAdd;
BigInteger.prototype.subtract = bnSubtract;
BigInteger.prototype.multiply = bnMultiply;
BigInteger.prototype.divide = bnDivide;
BigInteger.prototype.remainder = bnRemainder;
BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
BigInteger.prototype.modPow = bnModPow;
BigInteger.prototype.modInverse = bnModInverse;
BigInteger.prototype.pow = bnPow;
BigInteger.prototype.gcd = bnGCD;
BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
// JSBN-specific extension
BigInteger.prototype.square = bnSquare;
var Int128 = BigInteger;
// BigInteger interfaces not implemented in jsbn:
// BigInteger(int signum, byte[] magnitude)
// double doubleValue()
// float floatValue()
// int hashCode()
// long longValue()
// static BigInteger valueOf(long val)
// Helper functions to make BigInteger functions callable with two parameters
// as in original C# Clipper
Int128.prototype.IsNegative = function ()
{
  if (this.compareTo(Int128.ZERO) == -1) return true;
  else return false;
};
Int128.op_Equality = function (val1, val2)
{
  if (val1.compareTo(val2) == 0) return true;
  else return false;
};
Int128.op_Inequality = function (val1, val2)
{
  if (val1.compareTo(val2) != 0) return true;
  else return false;
};
Int128.op_GreaterThan = function (val1, val2)
{
  if (val1.compareTo(val2) > 0) return true;
  else return false;
};
Int128.op_LessThan = function (val1, val2)
{
  if (val1.compareTo(val2) < 0) return true;
  else return false;
};
Int128.op_Addition = function (lhs, rhs)
{
  return new Int128(lhs).add(new Int128(rhs));
};
Int128.op_Subtraction = function (lhs, rhs)
{
  return new Int128(lhs).subtract(new Int128(rhs));
};
Int128.Int128Mul = function (lhs, rhs)
{
  return new Int128(lhs).multiply(new Int128(rhs));
};
Int128.op_Division = function (lhs, rhs)
{
  return lhs.divide(rhs);
};
Int128.prototype.ToDouble = function ()
{
  return parseFloat(this.toString()); // This could be something faster
};
// end of Int128 section
/*
// Uncomment the following two lines if you want to use Int128 outside ClipperLib
if (typeof(document) !== "undefined") window.Int128 = Int128;
else self.Int128 = Int128;
*/
// ---------------------------------------------  
// Here starts the actual Clipper library:
// Helper function to support Inheritance in Javascript
if (typeof (Inherit) == 'undefined')
{
  var Inherit = function (ce, ce2)
  {
    var p;
    if (typeof (Object.getOwnPropertyNames) == 'undefined')
    {
      for (p in ce2.prototype)
        if (typeof (ce.prototype[p]) == 'undefined' || ce.prototype[p] == Object.prototype[p]) ce.prototype[p] = ce2.prototype[p];
      for (p in ce2)
        if (typeof (ce[p]) == 'undefined') ce[p] = ce2[p];
      ce.$baseCtor = ce2;
    }
    else
    {
      var props = Object.getOwnPropertyNames(ce2.prototype);
      for (var i = 0; i < props.length; i++)
        if (typeof (Object.getOwnPropertyDescriptor(ce.prototype, props[i])) == 'undefined') Object.defineProperty(ce.prototype, props[i], Object.getOwnPropertyDescriptor(ce2.prototype, props[i]));
      for (p in ce2)
        if (typeof (ce[p]) == 'undefined') ce[p] = ce2[p];
      ce.$baseCtor = ce2;
    }
  };
}
ClipperLib.Path = function ()
{
  return [];
};
ClipperLib.Paths = function ()
{
  return []; // Was previously [[]], but caused problems when pushed
};
// Preserves the calling way of original C# Clipper
// Is essential due to compatibility, because DoublePoint is public class in original C# version
ClipperLib.DoublePoint = function ()
{
  var a = arguments;
  this.X = 0;
  this.Y = 0;
  // public DoublePoint(DoublePoint dp)
  // public DoublePoint(IntPoint ip)
  if (a.length == 1)
  {
    this.X = a[0].X;
    this.Y = a[0].Y;
  }
  else if (a.length == 2)
  {
    this.X = a[0];
    this.Y = a[1];
  }
}; // This is internal faster function when called without arguments
ClipperLib.DoublePoint0 = function ()
{
  this.X = 0;
  this.Y = 0;
};
// This is internal faster function when called with 1 argument (dp or ip)
ClipperLib.DoublePoint1 = function (dp)
{
  this.X = dp.X;
  this.Y = dp.Y;
};
// This is internal faster function when called with 2 arguments (x and y)
ClipperLib.DoublePoint2 = function (x, y)
{
  this.X = x;
  this.Y = y;
};
// PolyTree & PolyNode start
// -------------------------------
ClipperLib.PolyNode = function ()
{
  this.m_Parent = null;
  this.m_polygon = new ClipperLib.Path();
  this.m_Index = 0;
  this.m_jointype = 0;
  this.m_endtype = 0;
  this.m_Childs = [];
  this.IsOpen = false;
};
ClipperLib.PolyNode.prototype.IsHoleNode = function ()
{
  var result = true;
  var node = this.m_Parent;
  while (node !== null)
  {
    result = !result;
    node = node.m_Parent;
  }
  return result;
};
ClipperLib.PolyNode.prototype.ChildCount = function ()
{
  return this.m_Childs.length;
};
ClipperLib.PolyNode.prototype.Contour = function ()
{
  return this.m_polygon;
};
ClipperLib.PolyNode.prototype.AddChild = function (Child)
{
  var cnt = this.m_Childs.length;
  this.m_Childs.push(Child);
  Child.m_Parent = this;
  Child.m_Index = cnt;
};
ClipperLib.PolyNode.prototype.GetNext = function ()
{
  if (this.m_Childs.length > 0)
    return this.m_Childs[0];
  else
    return this.GetNextSiblingUp();
};
ClipperLib.PolyNode.prototype.GetNextSiblingUp = function ()
{
  if (this.m_Parent === null)
    return null;
  else if (this.m_Index == this.m_Parent.m_Childs.length - 1)
    return this.m_Parent.GetNextSiblingUp();
  else
    return this.m_Parent.m_Childs[this.m_Index + 1];
};
ClipperLib.PolyNode.prototype.Childs = function ()
{
  return this.m_Childs;
};
ClipperLib.PolyNode.prototype.Parent = function ()
{
  return this.m_Parent;
};
ClipperLib.PolyNode.prototype.IsHole = function ()
{
  return this.IsHoleNode();
};
// PolyTree : PolyNode
ClipperLib.PolyTree = function ()
{
  this.m_AllPolys = [];
  ClipperLib.PolyNode.call(this);
};
ClipperLib.PolyTree.prototype.Clear = function ()
{
  for (var i = 0, ilen = this.m_AllPolys.length; i < ilen; i++)
    this.m_AllPolys[i] = null;
  this.m_AllPolys.length = 0;
  this.m_Childs.length = 0;
};
ClipperLib.PolyTree.prototype.GetFirst = function ()
{
  if (this.m_Childs.length > 0)
    return this.m_Childs[0];
  else
    return null;
};
ClipperLib.PolyTree.prototype.Total = function ()
{
  return this.m_AllPolys.length;
};
Inherit(ClipperLib.PolyTree, ClipperLib.PolyNode);
// -------------------------------
// PolyTree & PolyNode end
ClipperLib.Math_Abs_Int64 = ClipperLib.Math_Abs_Int32 = ClipperLib.Math_Abs_Double = function (a)
{
  return Math.abs(a);
};
ClipperLib.Math_Max_Int32_Int32 = function (a, b)
{
  return Math.max(a, b);
};
/*
-----------------------------------
cast_32 speedtest: http://jsperf.com/truncate-float-to-integer/2
-----------------------------------
*/
if (browser.msie || browser.opera || browser.safari) ClipperLib.Cast_Int32 = function (a)
{
  return a | 0;
};
else ClipperLib.Cast_Int32 = function (a)
{ // eg. browser.chrome || browser.chromium || browser.firefox
  return~~ a;
};
/*
--------------------------
cast_64 speedtests: http://jsperf.com/truncate-float-to-integer
Chrome: bitwise_not_floor
Firefox17: toInteger (typeof test)
IE9: bitwise_or_floor
IE7 and IE8: to_parseint
Chromium: to_floor_or_ceil
Firefox3: to_floor_or_ceil
Firefox15: to_floor_or_ceil
Opera: to_floor_or_ceil
Safari: to_floor_or_ceil
--------------------------
*/
if (browser.chrome) ClipperLib.Cast_Int64 = function (a)
{
  if (a < -2147483648 || a > 2147483647)
    return a < 0 ? Math.ceil(a) : Math.floor(a);
  else return~~ a;
};
else if (browser.firefox && typeof (Number.toInteger) == "function") ClipperLib.Cast_Int64 = function (a)
{
  return Number.toInteger(a);
};
else if (browser.msie7 || browser.msie8) ClipperLib.Cast_Int64 = function (a)
{
  return parseInt(a, 10);
};
else if (browser.msie) ClipperLib.Cast_Int64 = function (a)
{
  if (a < -2147483648 || a > 2147483647)
    return a < 0 ? Math.ceil(a) : Math.floor(a);
  return a | 0;
};
// eg. browser.chromium || browser.firefox || browser.opera || browser.safari
else ClipperLib.Cast_Int64 = function (a)
{
  return a < 0 ? Math.ceil(a) : Math.floor(a);
};
ClipperLib.Clear = function (a)
{
  a.length = 0;
};
//ClipperLib.MaxSteps = 64; // How many steps at maximum in arc in BuildArc() function
ClipperLib.PI = 3.141592653589793;
ClipperLib.PI2 = 2 * 3.141592653589793;
ClipperLib.IntPoint = function ()
{
  var a = arguments,
    alen = a.length;
  this.X = 0;
  this.Y = 0;
  if (use_xyz)
  {
    this.Z = 0;
    if (alen == 3) // public IntPoint(cInt x, cInt y, cInt z = 0)
    {
      this.X = a[0];
      this.Y = a[1];
      this.Z = a[2];
    }
    else if (alen == 2) // public IntPoint(cInt x, cInt y)
    {
      this.X = a[0];
      this.Y = a[1];
      this.Z = 0;
    }
    else if (alen == 1)
    {
      if (a[0] instanceof ClipperLib.DoublePoint) // public IntPoint(DoublePoint dp)
      {
        var dp = a[0];
        this.X = ClipperLib.Clipper.Round(dp.X);
        this.Y = ClipperLib.Clipper.Round(dp.Y);
        this.Z = 0;
      }
      else // public IntPoint(IntPoint pt)
      {
        var pt = a[0];
        if (typeof (pt.Z) == "undefined") pt.Z = 0;
        this.X = pt.X;
        this.Y = pt.Y;
        this.Z = pt.Z;
      }
    }
    else // public IntPoint()
    {
      this.X = 0;
      this.Y = 0;
      this.Z = 0;
    }
  }
  else // if (!use_xyz)
  {
    if (alen == 2) // public IntPoint(cInt X, cInt Y)
    {
      this.X = a[0];
      this.Y = a[1];
    }
    else if (alen == 1)
    {
      if (a[0] instanceof ClipperLib.DoublePoint) // public IntPoint(DoublePoint dp)
      {
        var dp = a[0];
        this.X = ClipperLib.Clipper.Round(dp.X);
        this.Y = ClipperLib.Clipper.Round(dp.Y);
      }
      else // public IntPoint(IntPoint pt)
      {
        var pt = a[0];
        this.X = pt.X;
        this.Y = pt.Y;
      }
    }
    else // public IntPoint(IntPoint pt)
    {
      this.X = 0;
      this.Y = 0;
    }
  }
};
ClipperLib.IntPoint.op_Equality = function (a, b)
{
  //return a == b;
  return a.X == b.X && a.Y == b.Y;
};
ClipperLib.IntPoint.op_Inequality = function (a, b)
{
  //return a != b;
  return a.X != b.X || a.Y != b.Y;
};
/*
ClipperLib.IntPoint.prototype.Equals = function (obj)
{
  if (obj === null)
      return false;
  if (obj instanceof ClipperLib.IntPoint)
  {
      var a = Cast(obj, ClipperLib.IntPoint);
      return (this.X == a.X) && (this.Y == a.Y);
  }
  else
      return false;
};
*/
if (use_xyz)
{
  ClipperLib.IntPoint0 = function ()
  {
    this.X = 0;
    this.Y = 0;
    this.Z = 0;
  };
  ClipperLib.IntPoint1 = function (pt)
  {
    this.X = pt.X;
    this.Y = pt.Y;
    this.Z = pt.Z;
  };
  ClipperLib.IntPoint1dp = function (dp)
  {
    this.X = ClipperLib.Clipper.Round(dp.X);
    this.Y = ClipperLib.Clipper.Round(dp.Y);
    this.Z = 0;
  };
  ClipperLib.IntPoint2 = function (x, y)
  {
    this.X = x;
    this.Y = y;
    this.Z = 0;
  };
  ClipperLib.IntPoint3 = function (x, y, z)
  {
    this.X = x;
    this.Y = y;
    this.Z = z;
  };
}
else // if (!use_xyz)
{
  ClipperLib.IntPoint0 = function ()
  {
    this.X = 0;
    this.Y = 0;
  };
  ClipperLib.IntPoint1 = function (pt)
  {
    this.X = pt.X;
    this.Y = pt.Y;
  };
  ClipperLib.IntPoint1dp = function (dp)
  {
    this.X = ClipperLib.Clipper.Round(dp.X);
    this.Y = ClipperLib.Clipper.Round(dp.Y);
  };
  ClipperLib.IntPoint2 = function (x, y)
  {
    this.X = x;
    this.Y = y;
  };
}
ClipperLib.IntRect = function ()
{
  var a = arguments,
    alen = a.length;
  if (alen == 4) // function (l, t, r, b)
  {
    this.left = a[0];
    this.top = a[1];
    this.right = a[2];
    this.bottom = a[3];
  }
  else if (alen == 1) // function (ir)
  {
    this.left = ir.left;
    this.top = ir.top;
    this.right = ir.right;
    this.bottom = ir.bottom;
  }
  else // function ()
  {
    this.left = 0;
    this.top = 0;
    this.right = 0;
    this.bottom = 0;
  }
};
ClipperLib.IntRect0 = function ()
{
  this.left = 0;
  this.top = 0;
  this.right = 0;
  this.bottom = 0;
};
ClipperLib.IntRect1 = function (ir)
{
  this.left = ir.left;
  this.top = ir.top;
  this.right = ir.right;
  this.bottom = ir.bottom;
};
ClipperLib.IntRect4 = function (l, t, r, b)
{
  this.left = l;
  this.top = t;
  this.right = r;
  this.bottom = b;
};
ClipperLib.ClipType = {
  ctIntersection: 0,
  ctUnion: 1,
  ctDifference: 2,
  ctXor: 3
};
ClipperLib.PolyType = {
  ptSubject: 0,
  ptClip: 1
};
ClipperLib.PolyFillType = {
  pftEvenOdd: 0,
  pftNonZero: 1,
  pftPositive: 2,
  pftNegative: 3
};
ClipperLib.JoinType = {
  jtSquare: 0,
  jtRound: 1,
  jtMiter: 2
};
ClipperLib.EndType = {
  etOpenSquare: 0,
  etOpenRound: 1,
  etOpenButt: 2,
  etClosedLine: 3,
  etClosedPolygon: 4
};
if (use_deprecated)
  ClipperLib.EndType_ = {
    etSquare: 0,
    etRound: 1,
    etButt: 2,
    etClosed: 3
  };
ClipperLib.EdgeSide = {
  esLeft: 0,
  esRight: 1
};
ClipperLib.Direction = {
  dRightToLeft: 0,
  dLeftToRight: 1
};
ClipperLib.TEdge = function ()
{
  this.Bot = new ClipperLib.IntPoint();
  this.Curr = new ClipperLib.IntPoint();
  this.Top = new ClipperLib.IntPoint();
  this.Delta = new ClipperLib.IntPoint();
  this.Dx = 0;
  this.PolyTyp = ClipperLib.PolyType.ptSubject;
  this.Side = ClipperLib.EdgeSide.esLeft;
  this.WindDelta = 0;
  this.WindCnt = 0;
  this.WindCnt2 = 0;
  this.OutIdx = 0;
  this.Next = null;
  this.Prev = null;
  this.NextInLML = null;
  this.NextInAEL = null;
  this.PrevInAEL = null;
  this.NextInSEL = null;
  this.PrevInSEL = null;
};
ClipperLib.IntersectNode = function ()
{
  this.Edge1 = null;
  this.Edge2 = null;
  this.Pt = new ClipperLib.IntPoint();
};
ClipperLib.MyIntersectNodeSort = function () {};
ClipperLib.MyIntersectNodeSort.Compare = function (node1, node2)
{
  return (node2.Pt.Y - node1.Pt.Y);
};
ClipperLib.LocalMinima = function ()
{
  this.Y = 0;
  this.LeftBound = null;
  this.RightBound = null;
  this.Next = null;
};
ClipperLib.Scanbeam = function ()
{
  this.Y = 0;
  this.Next = null;
};
ClipperLib.OutRec = function ()
{
  this.Idx = 0;
  this.IsHole = false;
  this.IsOpen = false;
  this.FirstLeft = null;
  this.Pts = null;
  this.BottomPt = null;
  this.PolyNode = null;
};
ClipperLib.OutPt = function ()
{
  this.Idx = 0;
  this.Pt = new ClipperLib.IntPoint();
  this.Next = null;
  this.Prev = null;
};
ClipperLib.Join = function ()
{
  this.OutPt1 = null;
  this.OutPt2 = null;
  this.OffPt = new ClipperLib.IntPoint();
};
ClipperLib.ClipperBase = function ()
{
  this.m_MinimaList = null;
  this.m_CurrentLM = null;
  this.m_edges = new Array();
  this.m_UseFullRange = false;
  this.m_HasOpenPaths = false;
  this.PreserveCollinear = false;
  this.m_MinimaList = null;
  this.m_CurrentLM = null;
  this.m_UseFullRange = false;
  this.m_HasOpenPaths = false;
};
// Ranges are in original C# too high for Javascript (in current state 2013 september):
// protected const double horizontal = -3.4E+38;
// internal const cInt loRange = 0x3FFFFFFF; // = 1073741823 = sqrt(2^63 -1)/2
// internal const cInt hiRange = 0x3FFFFFFFFFFFFFFFL; // = 4611686018427387903 = sqrt(2^127 -1)/2
// So had to adjust them to more suitable for Javascript.
// If JS some day supports truly 64-bit integers, then these ranges can be as in C#
// and biginteger library can be more simpler (as then 128bit can be represented as two 64bit numbers)
ClipperLib.ClipperBase.horizontal = -9007199254740992; //-2^53
ClipperLib.ClipperBase.Skip = -2;
ClipperLib.ClipperBase.Unassigned = -1;
ClipperLib.ClipperBase.tolerance = 1E-20;
if (use_int32)
{
  ClipperLib.ClipperBase.loRange = 46340;
  ClipperLib.ClipperBase.hiRange = 46340;
}
else
{
  ClipperLib.ClipperBase.loRange = 47453132; // sqrt(2^53 -1)/2
  ClipperLib.ClipperBase.hiRange = 4503599627370495; // sqrt(2^106 -1)/2
}
ClipperLib.ClipperBase.near_zero = function (val)
{
  return (val > -ClipperLib.ClipperBase.tolerance) && (val < ClipperLib.ClipperBase.tolerance);
};
ClipperLib.ClipperBase.IsHorizontal = function (e)
{
  return e.Delta.Y === 0;
};
ClipperLib.ClipperBase.prototype.PointIsVertex = function (pt, pp)
{
  var pp2 = pp;
  do {
    if (ClipperLib.IntPoint.op_Equality(pp2.Pt, pt))
      return true;
    pp2 = pp2.Next;
  }
  while (pp2 != pp)
  return false;
};
ClipperLib.ClipperBase.prototype.PointOnLineSegment = function (pt, linePt1, linePt2, UseFullRange)
{
  if (UseFullRange)
    return ((pt.X == linePt1.X) && (pt.Y == linePt1.Y)) ||
      ((pt.X == linePt2.X) && (pt.Y == linePt2.Y)) ||
      (((pt.X > linePt1.X) == (pt.X < linePt2.X)) &&
      ((pt.Y > linePt1.Y) == (pt.Y < linePt2.Y)) &&
      (Int128.op_Equality(Int128.Int128Mul((pt.X - linePt1.X), (linePt2.Y - linePt1.Y)),
        Int128.Int128Mul((linePt2.X - linePt1.X), (pt.Y - linePt1.Y)))));
  else
    return ((pt.X == linePt1.X) && (pt.Y == linePt1.Y)) || ((pt.X == linePt2.X) && (pt.Y == linePt2.Y)) || (((pt.X > linePt1.X) == (pt.X < linePt2.X)) && ((pt.Y > linePt1.Y) == (pt.Y < linePt2.Y)) && ((pt.X - linePt1.X) * (linePt2.Y - linePt1.Y) == (linePt2.X - linePt1.X) * (pt.Y - linePt1.Y)));
};
ClipperLib.ClipperBase.prototype.PointOnPolygon = function (pt, pp, UseFullRange)
{
  var pp2 = pp;
  while (true)
  {
    if (this.PointOnLineSegment(pt, pp2.Pt, pp2.Next.Pt, UseFullRange))
      return true;
    pp2 = pp2.Next;
    if (pp2 == pp)
      break;
  }
  return false;
};
ClipperLib.ClipperBase.prototype.SlopesEqual = ClipperLib.ClipperBase.SlopesEqual = function ()
{
  var a = arguments,
    alen = a.length;
  var e1, e2, pt1, pt2, pt3, pt4, UseFullRange;
  if (alen == 3) // function (e1, e2, UseFullRange)
  {
    e1 = a[0];
    e2 = a[1];
    UseFullRange = a[2];
    if (UseFullRange)
      return Int128.op_Equality(Int128.Int128Mul(e1.Delta.Y, e2.Delta.X), Int128.Int128Mul(e1.Delta.X, e2.Delta.Y));
    else
      return ClipperLib.Cast_Int64((e1.Delta.Y) * (e2.Delta.X)) == ClipperLib.Cast_Int64((e1.Delta.X) * (e2.Delta.Y));
  }
  else if (alen == 4) // function (pt1, pt2, pt3, UseFullRange)
  {
    pt1 = a[0];
    pt2 = a[1];
    pt3 = a[2];
    UseFullRange = a[3];
    if (UseFullRange)
      return Int128.op_Equality(Int128.Int128Mul(pt1.Y - pt2.Y, pt2.X - pt3.X), Int128.Int128Mul(pt1.X - pt2.X, pt2.Y - pt3.Y));
    else
      return ClipperLib.Cast_Int64((pt1.Y - pt2.Y) * (pt2.X - pt3.X)) - ClipperLib.Cast_Int64((pt1.X - pt2.X) * (pt2.Y - pt3.Y)) === 0;
  }
  else // function (pt1, pt2, pt3, pt4, UseFullRange)
  {
    pt1 = a[0];
    pt2 = a[1];
    pt3 = a[2];
    pt4 = a[3];
    UseFullRange = a[4];
    if (UseFullRange)
      return Int128.op_Equality(Int128.Int128Mul(pt1.Y - pt2.Y, pt3.X - pt4.X), Int128.Int128Mul(pt1.X - pt2.X, pt3.Y - pt4.Y));
    else
      return ClipperLib.Cast_Int64((pt1.Y - pt2.Y) * (pt3.X - pt4.X)) - ClipperLib.Cast_Int64((pt1.X - pt2.X) * (pt3.Y - pt4.Y)) === 0;
  }
};
ClipperLib.ClipperBase.SlopesEqual3 = function (e1, e2, UseFullRange)
{
  if (UseFullRange)
    return Int128.op_Equality(Int128.Int128Mul(e1.Delta.Y, e2.Delta.X), Int128.Int128Mul(e1.Delta.X, e2.Delta.Y));
  else
    return ClipperLib.Cast_Int64((e1.Delta.Y) * (e2.Delta.X)) == ClipperLib.Cast_Int64((e1.Delta.X) * (e2.Delta.Y));
};
ClipperLib.ClipperBase.SlopesEqual4 = function (pt1, pt2, pt3, UseFullRange)
{
  if (UseFullRange)
    return Int128.op_Equality(Int128.Int128Mul(pt1.Y - pt2.Y, pt2.X - pt3.X), Int128.Int128Mul(pt1.X - pt2.X, pt2.Y - pt3.Y));
  else
    return ClipperLib.Cast_Int64((pt1.Y - pt2.Y) * (pt2.X - pt3.X)) - ClipperLib.Cast_Int64((pt1.X - pt2.X) * (pt2.Y - pt3.Y)) === 0;
};
ClipperLib.ClipperBase.SlopesEqual5 = function (pt1, pt2, pt3, pt4, UseFullRange)
{
  if (UseFullRange)
    return Int128.op_Equality(Int128.Int128Mul(pt1.Y - pt2.Y, pt3.X - pt4.X), Int128.Int128Mul(pt1.X - pt2.X, pt3.Y - pt4.Y));
  else
    return ClipperLib.Cast_Int64((pt1.Y - pt2.Y) * (pt3.X - pt4.X)) - ClipperLib.Cast_Int64((pt1.X - pt2.X) * (pt3.Y - pt4.Y)) === 0;
};
ClipperLib.ClipperBase.prototype.Clear = function ()
{
  this.DisposeLocalMinimaList();
  for (var i = 0, ilen = this.m_edges.length; i < ilen; ++i)
  {
    for (var j = 0, jlen = this.m_edges[i].length; j < jlen; ++j)
      this.m_edges[i][j] = null;
    ClipperLib.Clear(this.m_edges[i]);
  }
  ClipperLib.Clear(this.m_edges);
  this.m_UseFullRange = false;
  this.m_HasOpenPaths = false;
};
ClipperLib.ClipperBase.prototype.DisposeLocalMinimaList = function ()
{
  while (this.m_MinimaList !== null)
  {
    var tmpLm = this.m_MinimaList.Next;
    this.m_MinimaList = null;
    this.m_MinimaList = tmpLm;
  }
  this.m_CurrentLM = null;
};
ClipperLib.ClipperBase.prototype.RangeTest = function (Pt, useFullRange)
{
  if (useFullRange.Value)
  {
    if (Pt.X > ClipperLib.ClipperBase.hiRange || Pt.Y > ClipperLib.ClipperBase.hiRange || -Pt.X > ClipperLib.ClipperBase.hiRange || -Pt.Y > ClipperLib.ClipperBase.hiRange)
      ClipperLib.Error("Coordinate outside allowed range in RangeTest().");
  }
  else if (Pt.X > ClipperLib.ClipperBase.loRange || Pt.Y > ClipperLib.ClipperBase.loRange || -Pt.X > ClipperLib.ClipperBase.loRange || -Pt.Y > ClipperLib.ClipperBase.loRange)
  {
    useFullRange.Value = true;
    this.RangeTest(Pt, useFullRange);
  }
};
ClipperLib.ClipperBase.prototype.InitEdge = function (e, eNext, ePrev, pt)
{
  e.Next = eNext;
  e.Prev = ePrev;
  //e.Curr = pt;
  e.Curr.X = pt.X;
  e.Curr.Y = pt.Y;
  e.OutIdx = -1;
};
ClipperLib.ClipperBase.prototype.InitEdge2 = function (e, polyType)
{
  if (e.Curr.Y >= e.Next.Curr.Y)
  {
    //e.Bot = e.Curr;
    e.Bot.X = e.Curr.X;
    e.Bot.Y = e.Curr.Y;
    //e.Top = e.Next.Curr;
    e.Top.X = e.Next.Curr.X;
    e.Top.Y = e.Next.Curr.Y;
  }
  else
  {
    //e.Top = e.Curr;
    e.Top.X = e.Curr.X;
    e.Top.Y = e.Curr.Y;
    //e.Bot = e.Next.Curr;
    e.Bot.X = e.Next.Curr.X;
    e.Bot.Y = e.Next.Curr.Y;
  }
  this.SetDx(e);
  e.PolyTyp = polyType;
};
ClipperLib.ClipperBase.prototype.FindNextLocMin = function (E)
{
  var E2;
  for (;;)
  {
    while (ClipperLib.IntPoint.op_Inequality(E.Bot, E.Prev.Bot) || ClipperLib.IntPoint.op_Equality(E.Curr, E.Top))
      E = E.Next;
    if (E.Dx != ClipperLib.ClipperBase.horizontal && E.Prev.Dx != ClipperLib.ClipperBase.horizontal)
      break;
    while (E.Prev.Dx == ClipperLib.ClipperBase.horizontal)
      E = E.Prev;
    E2 = E;
    while (E.Dx == ClipperLib.ClipperBase.horizontal)
      E = E.Next;
    if (E.Top.Y == E.Prev.Bot.Y)
      continue;
    //ie just an intermediate horz.
    if (E2.Prev.Bot.X < E.Bot.X)
      E = E2;
    break;
  }
  return E;
};
ClipperLib.ClipperBase.prototype.ProcessBound = function (E, IsClockwise)
{
  var EStart = E,
    Result = E;
  var Horz;
  var StartX;
  if (E.Dx == ClipperLib.ClipperBase.horizontal)
  {
    //it's possible for adjacent overlapping horz edges to start heading left
    //before finishing right, so ...
    if (IsClockwise)
      StartX = E.Prev.Bot.X;
    else
      StartX = E.Next.Bot.X;
    if (E.Bot.X != StartX)
      this.ReverseHorizontal(E);
  }
  if (Result.OutIdx != ClipperLib.ClipperBase.Skip)
  {
    if (IsClockwise)
    {
      while (Result.Top.Y == Result.Next.Bot.Y && Result.Next.OutIdx != ClipperLib.ClipperBase.Skip)
        Result = Result.Next;
      if (Result.Dx == ClipperLib.ClipperBase.horizontal && Result.Next.OutIdx != ClipperLib.ClipperBase.Skip)
      {
        //nb: at the top of a bound, horizontals are added to the bound
        //only when the preceding edge attaches to the horizontal's left vertex
        //unless a Skip edge is encountered when that becomes the top divide
        Horz = Result;
        while (Horz.Prev.Dx == ClipperLib.ClipperBase.horizontal)
          Horz = Horz.Prev;
        if (Horz.Prev.Top.X == Result.Next.Top.X)
        {
          if (!IsClockwise)
            Result = Horz.Prev;
        }
        else if (Horz.Prev.Top.X > Result.Next.Top.X)
          Result = Horz.Prev;
      }
      while (E != Result)
      {
        E.NextInLML = E.Next;
        if (E.Dx == ClipperLib.ClipperBase.horizontal && E != EStart && E.Bot.X != E.Prev.Top.X)
          this.ReverseHorizontal(E);
        E = E.Next;
      }
      if (E.Dx == ClipperLib.ClipperBase.horizontal && E != EStart && E.Bot.X != E.Prev.Top.X)
        this.ReverseHorizontal(E);
      Result = Result.Next;
      //move to the edge just beyond current bound
    }
    else
    {
      while (Result.Top.Y == Result.Prev.Bot.Y && Result.Prev.OutIdx != ClipperLib.ClipperBase.Skip)
        Result = Result.Prev;
      if (Result.Dx == ClipperLib.ClipperBase.horizontal && Result.Prev.OutIdx != ClipperLib.ClipperBase.Skip)
      {
        Horz = Result;
        while (Horz.Next.Dx == ClipperLib.ClipperBase.horizontal)
          Horz = Horz.Next;
        if (Horz.Next.Top.X == Result.Prev.Top.X)
        {
          if (!IsClockwise)
            Result = Horz.Next;
        }
        else if (Horz.Next.Top.X > Result.Prev.Top.X)
          Result = Horz.Next;
      }
      while (E != Result)
      {
        E.NextInLML = E.Prev;
        if (E.Dx == ClipperLib.ClipperBase.horizontal && E != EStart && E.Bot.X != E.Next.Top.X)
          this.ReverseHorizontal(E);
        E = E.Prev;
      }
      if (E.Dx == ClipperLib.ClipperBase.horizontal && E != EStart && E.Bot.X != E.Next.Top.X)
        this.ReverseHorizontal(E);
      Result = Result.Prev;
      //move to the edge just beyond current bound
    }
  }
  if (Result.OutIdx == ClipperLib.ClipperBase.Skip)
  {
    //if edges still remain in the current bound beyond the skip edge then
    //create another LocMin and call ProcessBound once more
    E = Result;
    if (IsClockwise)
    {
      while (E.Top.Y == E.Next.Bot.Y)
        E = E.Next;
      //don't include top horizontals when parsing a bound a second time,
      //they will be contained in the opposite bound ...
      while (E != Result && E.Dx == ClipperLib.ClipperBase.horizontal)
        E = E.Prev;
    }
    else
    {
      while (E.Top.Y == E.Prev.Bot.Y)
        E = E.Prev;
      while (E != Result && E.Dx == ClipperLib.ClipperBase.horizontal)
        E = E.Next;
    }
    if (E == Result)
    {
      if (IsClockwise)
        Result = E.Next;
      else
        Result = E.Prev;
    }
    else
    {
      //there are more edges in the bound beyond result starting with E
      if (IsClockwise)
        E = Result.Next;
      else
        E = Result.Prev;
      var locMin = new ClipperLib.LocalMinima();
      locMin.Next = null;
      locMin.Y = E.Bot.Y;
      locMin.LeftBound = null;
      locMin.RightBound = E;
      locMin.RightBound.WindDelta = 0;
      Result = this.ProcessBound(locMin.RightBound, IsClockwise);
      this.InsertLocalMinima(locMin);
    }
  }
  return Result;
};
ClipperLib.ClipperBase.prototype.AddPath = function (pg, polyType, Closed)
{
  if (use_lines)
  {
    if (!Closed && polyType == ClipperLib.PolyType.ptClip)
      ClipperLib.Error("AddPath: Open paths must be subject.");
  }
  else
  {
    if (!Closed)
      ClipperLib.Error("AddPath: Open paths have been disabled.");
  }
  var highI = pg.length - 1;
  if (Closed)
    while (highI > 0 && (ClipperLib.IntPoint.op_Equality(pg[highI], pg[0])))
  --highI;
  while (highI > 0 && (ClipperLib.IntPoint.op_Equality(pg[highI], pg[highI - 1])))
  --highI;
  if ((Closed && highI < 2) || (!Closed && highI < 1))
    return false;
  //create a new edge array ...
  var edges = new Array();
  for (var i = 0; i <= highI; i++)
    edges.push(new ClipperLib.TEdge());
  var IsFlat = true;
  //1. Basic (first) edge initialization ...

  //edges[1].Curr = pg[1];
  edges[1].Curr.X = pg[1].X;
  edges[1].Curr.Y = pg[1].Y;

  var $1 = {Value: this.m_UseFullRange};
  this.RangeTest(pg[0], $1);
  this.m_UseFullRange = $1.Value;

  $1.Value = this.m_UseFullRange;
  this.RangeTest(pg[highI], $1);
  this.m_UseFullRange = $1.Value;

  this.InitEdge(edges[0], edges[1], edges[highI], pg[0]);
  this.InitEdge(edges[highI], edges[0], edges[highI - 1], pg[highI]);
  for (var i = highI - 1; i >= 1; --i)
  {
    $1.Value = this.m_UseFullRange;
    this.RangeTest(pg[i], $1);
    this.m_UseFullRange = $1.Value;

    this.InitEdge(edges[i], edges[i + 1], edges[i - 1], pg[i]);
  }

  var eStart = edges[0];
  //2. Remove duplicate vertices, and (when closed) collinear edges ...
  var E = eStart,
    eLoopStop = eStart;
  for (;;)
  {
    if (ClipperLib.IntPoint.op_Equality(E.Curr, E.Next.Curr))
    {
      if (E == E.Next)
        break;
      if (E == eStart)
        eStart = E.Next;
      E = this.RemoveEdge(E);
      eLoopStop = E;
      continue;
    }
    if (E.Prev == E.Next)
      break;
    else if (Closed && ClipperLib.ClipperBase.SlopesEqual(E.Prev.Curr, E.Curr, E.Next.Curr, this.m_UseFullRange) && (!this.PreserveCollinear || !this.Pt2IsBetweenPt1AndPt3(E.Prev.Curr, E.Curr, E.Next.Curr)))
    {
      //Collinear edges are allowed for open paths but in closed paths
      //the default is to merge adjacent collinear edges into a single edge.
      //However, if the PreserveCollinear property is enabled, only overlapping
      //collinear edges (ie spikes) will be removed from closed paths.
      if (E == eStart)
        eStart = E.Next;
      E = this.RemoveEdge(E);
      E = E.Prev;
      eLoopStop = E;
      continue;
    }
    E = E.Next;
    if (E == eLoopStop)
      break;
  }
  if ((!Closed && (E == E.Next)) || (Closed && (E.Prev == E.Next)))
    return false;
  if (!Closed)
  {
    this.m_HasOpenPaths = true;
    eStart.Prev.OutIdx = ClipperLib.ClipperBase.Skip;
  }
  //3. Do second stage of edge initialization ...
  var eHighest = eStart;
  E = eStart;
  do {
    this.InitEdge2(E, polyType);
    E = E.Next;
    if (IsFlat && E.Curr.Y != eStart.Curr.Y)
      IsFlat = false;
  }
  while (E != eStart)
  //4. Finally, add edge bounds to LocalMinima list ...
  //Totally flat paths must be handled differently when adding them
  //to LocalMinima list to avoid endless loops etc ...
  if (IsFlat)
  {
    if (Closed)
      return false;
    E.Prev.OutIdx = ClipperLib.ClipperBase.Skip;
    if (E.Prev.Bot.X < E.Prev.Top.X)
      this.ReverseHorizontal(E.Prev);
    var locMin = new ClipperLib.LocalMinima();
    locMin.Next = null;
    locMin.Y = E.Bot.Y;
    locMin.LeftBound = null;
    locMin.RightBound = E;
    locMin.RightBound.Side = ClipperLib.EdgeSide.esRight;
    locMin.RightBound.WindDelta = 0;
    while (E.Next.OutIdx != ClipperLib.ClipperBase.Skip)
    {
      E.NextInLML = E.Next;
      if (E.Bot.X != E.Prev.Top.X)
        this.ReverseHorizontal(E);
      E = E.Next;
    }
    this.InsertLocalMinima(locMin);
    this.m_edges.push(edges);
    return true;
  }
  this.m_edges.push(edges);
  var clockwise;
  var EMin = null;
  for (;;)
  {
    E = this.FindNextLocMin(E);
    if (E == EMin)
      break;
    else if (EMin == null)
      EMin = E;
    //E and E.Prev now share a local minima (left aligned if horizontal).
    //Compare their slopes to find which starts which bound ...
    var locMin = new ClipperLib.LocalMinima();
    locMin.Next = null;
    locMin.Y = E.Bot.Y;
    if (E.Dx < E.Prev.Dx)
    {
      locMin.LeftBound = E.Prev;
      locMin.RightBound = E;
      clockwise = false;
      //Q.nextInLML = Q.prev
    }
    else
    {
      locMin.LeftBound = E;
      locMin.RightBound = E.Prev;
      clockwise = true;
      //Q.nextInLML = Q.next
    }
    locMin.LeftBound.Side = ClipperLib.EdgeSide.esLeft;
    locMin.RightBound.Side = ClipperLib.EdgeSide.esRight;
    if (!Closed)
      locMin.LeftBound.WindDelta = 0;
    else if (locMin.LeftBound.Next == locMin.RightBound)
      locMin.LeftBound.WindDelta = -1;
    else
      locMin.LeftBound.WindDelta = 1;
    locMin.RightBound.WindDelta = -locMin.LeftBound.WindDelta;
    E = this.ProcessBound(locMin.LeftBound, clockwise);
    var E2 = this.ProcessBound(locMin.RightBound, !clockwise);
    if (locMin.LeftBound.OutIdx == ClipperLib.ClipperBase.Skip)
      locMin.LeftBound = null;
    else if (locMin.RightBound.OutIdx == ClipperLib.ClipperBase.Skip)
      locMin.RightBound = null;
    this.InsertLocalMinima(locMin);
    if (!clockwise)
      E = E2;
  }
  return true;
};
ClipperLib.ClipperBase.prototype.AddPaths = function (ppg, polyType, closed)
{
  //  console.log("-------------------------------------------");
  //  console.log(JSON.stringify(ppg));
  var result = false;
  for (var i = 0, ilen = ppg.length; i < ilen; ++i)
    if (this.AddPath(ppg[i], polyType, closed))
      result = true;
  return result;
};
//------------------------------------------------------------------------------
ClipperLib.ClipperBase.prototype.Pt2IsBetweenPt1AndPt3 = function (pt1, pt2, pt3)
{
  if ((ClipperLib.IntPoint.op_Equality(pt1, pt3)) || (ClipperLib.IntPoint.op_Equality(pt1, pt2)) ||
    (ClipperLib.IntPoint.op_Equality(pt3, pt2)))
    return false;
  else if (pt1.X != pt3.X)
    return (pt2.X > pt1.X) == (pt2.X < pt3.X);
  else
    return (pt2.Y > pt1.Y) == (pt2.Y < pt3.Y);
};
ClipperLib.ClipperBase.prototype.RemoveEdge = function (e)
{
  //removes e from double_linked_list (but without removing from memory)
  e.Prev.Next = e.Next;
  e.Next.Prev = e.Prev;
  var result = e.Next;
  e.Prev = null; //flag as removed (see ClipperBase.Clear)
  return result;
};
ClipperLib.ClipperBase.prototype.SetDx = function (e)
{
  e.Delta.X = (e.Top.X - e.Bot.X);
  e.Delta.Y = (e.Top.Y - e.Bot.Y);
  if (e.Delta.Y === 0) e.Dx = ClipperLib.ClipperBase.horizontal;
  else e.Dx = (e.Delta.X) / (e.Delta.Y);
};
ClipperLib.ClipperBase.prototype.InsertLocalMinima = function (newLm)
{
  if (this.m_MinimaList === null)
  {
    this.m_MinimaList = newLm;
  }
  else if (newLm.Y >= this.m_MinimaList.Y)
  {
    newLm.Next = this.m_MinimaList;
    this.m_MinimaList = newLm;
  }
  else
  {
    var tmpLm = this.m_MinimaList;
    while (tmpLm.Next !== null && (newLm.Y < tmpLm.Next.Y))
      tmpLm = tmpLm.Next;
    newLm.Next = tmpLm.Next;
    tmpLm.Next = newLm;
  }
};
ClipperLib.ClipperBase.prototype.PopLocalMinima = function ()
{
  if (this.m_CurrentLM === null)
    return;
  this.m_CurrentLM = this.m_CurrentLM.Next;
};
ClipperLib.ClipperBase.prototype.ReverseHorizontal = function (e)
{
  //swap horizontal edges' top and bottom x's so they follow the natural
  //progression of the bounds - ie so their xbots will align with the
  //adjoining lower edge. [Helpful in the ProcessHorizontal() method.]
  var tmp = e.Top.X;
  e.Top.X = e.Bot.X;
  e.Bot.X = tmp;
  if (use_xyz)
  {
    tmp = e.Top.Z;
    e.Top.Z = e.Bot.Z;
    e.Bot.Z = tmp;
  }
};
ClipperLib.ClipperBase.prototype.Reset = function ()
{
  this.m_CurrentLM = this.m_MinimaList;
  if (this.m_CurrentLM == null)
    return;
  //ie nothing to process
  //reset all edges ...
  var lm = this.m_MinimaList;
  while (lm != null)
  {
    var e = lm.LeftBound;
    if (e != null)
    {
      //e.Curr = e.Bot;
      e.Curr.X = e.Bot.X;
      e.Curr.Y = e.Bot.Y;
      e.Side = ClipperLib.EdgeSide.esLeft;
      e.OutIdx = ClipperLib.ClipperBase.Unassigned;
    }
    e = lm.RightBound;
    if (e != null)
    {
      //e.Curr = e.Bot;
      e.Curr.X = e.Bot.X;
      e.Curr.Y = e.Bot.Y;
      e.Side = ClipperLib.EdgeSide.esRight;
      e.OutIdx = ClipperLib.ClipperBase.Unassigned;
    }
    lm = lm.Next;
  }
};
ClipperLib.Clipper = function (InitOptions) // public Clipper(int InitOptions = 0)
{
  if (typeof (InitOptions) == "undefined") InitOptions = 0;
  this.m_PolyOuts = null;
  this.m_ClipType = ClipperLib.ClipType.ctIntersection;
  this.m_Scanbeam = null;
  this.m_ActiveEdges = null;
  this.m_SortedEdges = null;
  this.m_IntersectList = null;
  this.m_IntersectNodeComparer = null;
  this.m_ExecuteLocked = false;
  this.m_ClipFillType = ClipperLib.PolyFillType.pftEvenOdd;
  this.m_SubjFillType = ClipperLib.PolyFillType.pftEvenOdd;
  this.m_Joins = null;
  this.m_GhostJoins = null;
  this.m_UsingPolyTree = false;
  this.ReverseSolution = false;
  this.StrictlySimple = false;
  ClipperLib.ClipperBase.call(this);
  this.m_Scanbeam = null;
  this.m_ActiveEdges = null;
  this.m_SortedEdges = null;
  this.m_IntersectList = new Array();
  this.m_IntersectNodeComparer = ClipperLib.MyIntersectNodeSort.Compare;
  this.m_ExecuteLocked = false;
  this.m_UsingPolyTree = false;
  this.m_PolyOuts = new Array();
  this.m_Joins = new Array();
  this.m_GhostJoins = new Array();
  this.ReverseSolution = (1 & InitOptions) !== 0;
  this.StrictlySimple = (2 & InitOptions) !== 0;
  this.PreserveCollinear = (4 & InitOptions) !== 0;
  if (use_xyz)
  {
    this.ZFillFunction = null; // function (IntPoint vert1, IntPoint vert2, ref IntPoint intersectPt);
  }
};
ClipperLib.Clipper.ioReverseSolution = 1;
ClipperLib.Clipper.ioStrictlySimple = 2;
ClipperLib.Clipper.ioPreserveCollinear = 4;

ClipperLib.Clipper.prototype.Clear = function ()
{
  if (this.m_edges.length === 0)
    return;
  //avoids problems with ClipperBase destructor
  this.DisposeAllPolyPts();
  ClipperLib.ClipperBase.prototype.Clear.call(this);
};

ClipperLib.Clipper.prototype.DisposeScanbeamList = function ()
{
  while (this.m_Scanbeam !== null)
  {
    var sb2 = this.m_Scanbeam.Next;
    this.m_Scanbeam = null;
    this.m_Scanbeam = sb2;
  }
};
ClipperLib.Clipper.prototype.Reset = function ()
{
  ClipperLib.ClipperBase.prototype.Reset.call(this);
  this.m_Scanbeam = null;
  this.m_ActiveEdges = null;
  this.m_SortedEdges = null;

  var lm = this.m_MinimaList;
  while (lm !== null)
  {
    this.InsertScanbeam(lm.Y);
    lm = lm.Next;
  }
};
ClipperLib.Clipper.prototype.InsertScanbeam = function (Y)
{
  if (this.m_Scanbeam === null)
  {
    this.m_Scanbeam = new ClipperLib.Scanbeam();
    this.m_Scanbeam.Next = null;
    this.m_Scanbeam.Y = Y;
  }
  else if (Y > this.m_Scanbeam.Y)
  {
    var newSb = new ClipperLib.Scanbeam();
    newSb.Y = Y;
    newSb.Next = this.m_Scanbeam;
    this.m_Scanbeam = newSb;
  }
  else
  {
    var sb2 = this.m_Scanbeam;
    while (sb2.Next !== null && (Y <= sb2.Next.Y))
      sb2 = sb2.Next;
    if (Y == sb2.Y)
      return;
    //ie ignores duplicates
    var newSb = new ClipperLib.Scanbeam();
    newSb.Y = Y;
    newSb.Next = sb2.Next;
    sb2.Next = newSb;
  }
};
// ************************************
ClipperLib.Clipper.prototype.Execute = function ()
{
  var a = arguments,
    alen = a.length,
    ispolytree = a[1] instanceof ClipperLib.PolyTree;
  if (alen == 4 && !ispolytree) // function (clipType, solution, subjFillType, clipFillType)
  {
    var clipType = a[0],
      solution = a[1],
      subjFillType = a[2],
      clipFillType = a[3];
    if (this.m_ExecuteLocked)
      return false;
    if (this.m_HasOpenPaths)
      ClipperLib.Error("Error: PolyTree struct is need for open path clipping.");
    this.m_ExecuteLocked = true;
    ClipperLib.Clear(solution);
    this.m_SubjFillType = subjFillType;
    this.m_ClipFillType = clipFillType;
    this.m_ClipType = clipType;
    this.m_UsingPolyTree = false;
    try
    {
      var succeeded = this.ExecuteInternal();
      //build the return polygons ...
      if (succeeded) this.BuildResult(solution);
    }
    finally
    {
      this.DisposeAllPolyPts();
      this.m_ExecuteLocked = false;
    }
    return succeeded;
  }
  else if (alen == 4 && ispolytree) // function (clipType, polytree, subjFillType, clipFillType)
  {
    var clipType = a[0],
      polytree = a[1],
      subjFillType = a[2],
      clipFillType = a[3];
    if (this.m_ExecuteLocked)
      return false;
    this.m_ExecuteLocked = true;
    this.m_SubjFillType = subjFillType;
    this.m_ClipFillType = clipFillType;
    this.m_ClipType = clipType;
    this.m_UsingPolyTree = true;
    try
    {
      var succeeded = this.ExecuteInternal();
      //build the return polygons ...
      if (succeeded) this.BuildResult2(polytree);
    }
    finally
    {
      this.DisposeAllPolyPts();
      this.m_ExecuteLocked = false;
    }
    return succeeded;
  }
  else if (alen == 2 && !ispolytree) // function (clipType, solution)
  {
    var clipType = a[0],
      solution = a[1];
    return this.Execute(clipType, solution, ClipperLib.PolyFillType.pftEvenOdd, ClipperLib.PolyFillType.pftEvenOdd);
  }
  else if (alen == 2 && ispolytree) // function (clipType, polytree)
  {
    var clipType = a[0],
      polytree = a[1];
    return this.Execute(clipType, polytree, ClipperLib.PolyFillType.pftEvenOdd, ClipperLib.PolyFillType.pftEvenOdd);
  }
};
ClipperLib.Clipper.prototype.FixHoleLinkage = function (outRec)
{
  //skip if an outermost polygon or
  //already already points to the correct FirstLeft ...
  if (outRec.FirstLeft === null || (outRec.IsHole != outRec.FirstLeft.IsHole && outRec.FirstLeft.Pts !== null))
    return;
  var orfl = outRec.FirstLeft;
  while (orfl !== null && ((orfl.IsHole == outRec.IsHole) || orfl.Pts === null))
    orfl = orfl.FirstLeft;
  outRec.FirstLeft = orfl;
};
ClipperLib.Clipper.prototype.ExecuteInternal = function ()
{
  try
  {
    this.Reset();
    if (this.m_CurrentLM === null)
      return false;
    var botY = this.PopScanbeam();
    do {
      this.InsertLocalMinimaIntoAEL(botY);
      ClipperLib.Clear(this.m_GhostJoins);
      this.ProcessHorizontals(false);
      if (this.m_Scanbeam === null)
        break;
      var topY = this.PopScanbeam();
      //console.log("botY:" + botY + ", topY:" + topY);
      if (!this.ProcessIntersections(botY, topY))
        return false;
      this.ProcessEdgesAtTopOfScanbeam(topY);
      botY = topY;
    }
    while (this.m_Scanbeam !== null || this.m_CurrentLM !== null)
    //fix orientations ...
    for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++)
    {
      var outRec = this.m_PolyOuts[i];
      if (outRec.Pts === null || outRec.IsOpen)
        continue;
      if ((outRec.IsHole ^ this.ReverseSolution) == (this.Area(outRec) > 0))
        this.ReversePolyPtLinks(outRec.Pts);
    }
    this.JoinCommonEdges();
    for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++)
    {
      var outRec = this.m_PolyOuts[i];
      if (outRec.Pts !== null && !outRec.IsOpen)
        this.FixupOutPolygon(outRec);
    }
    if (this.StrictlySimple)
      this.DoSimplePolygons();
    return true;
  }
  finally
  {
    ClipperLib.Clear(this.m_Joins);
    ClipperLib.Clear(this.m_GhostJoins);
  }
};
ClipperLib.Clipper.prototype.PopScanbeam = function ()
{
  var Y = this.m_Scanbeam.Y;
  var sb2 = this.m_Scanbeam;
  this.m_Scanbeam = this.m_Scanbeam.Next;
  sb2 = null;
  return Y;
};
ClipperLib.Clipper.prototype.DisposeAllPolyPts = function ()
{
  for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; ++i)
    this.DisposeOutRec(i);
  ClipperLib.Clear(this.m_PolyOuts);
};
ClipperLib.Clipper.prototype.DisposeOutRec = function (index)
{
  var outRec = this.m_PolyOuts[index];
  if (outRec.Pts !== null)
    this.DisposeOutPts(outRec.Pts);
  outRec = null;
  this.m_PolyOuts[index] = null;
};
ClipperLib.Clipper.prototype.DisposeOutPts = function (pp)
{
  if (pp === null)
    return;
  var tmpPp = null;
  pp.Prev.Next = null;
  while (pp !== null)
  {
    tmpPp = pp;
    pp = pp.Next;
    tmpPp = null;
  }
};
ClipperLib.Clipper.prototype.AddJoin = function (Op1, Op2, OffPt)
{
  var j = new ClipperLib.Join();
  j.OutPt1 = Op1;
  j.OutPt2 = Op2;
  //j.OffPt = OffPt;
  j.OffPt.X = OffPt.X;
  j.OffPt.Y = OffPt.Y;
  this.m_Joins.push(j);
};
ClipperLib.Clipper.prototype.AddGhostJoin = function (Op, OffPt)
{
  var j = new ClipperLib.Join();
  j.OutPt1 = Op;
  //j.OffPt = OffPt;
  j.OffPt.X = OffPt.X;
  j.OffPt.Y = OffPt.Y;
  this.m_GhostJoins.push(j);
};
if (use_xyz)
{
  ClipperLib.Clipper.prototype.SetZ = function (pt, e)
  {
    pt.Z = 0;
    if (this.ZFillFunction !== null)
    {
      //put the 'preferred' point as first parameter ...
      if (e.OutIdx < 0)
        this.ZFillFunction(e.Bot, e.Top, pt); //outside a path so presume entering
      else
        this.ZFillFunction(e.Top, e.Bot, pt); //inside a path so presume exiting
    }
  };
  //------------------------------------------------------------------------------
}
ClipperLib.Clipper.prototype.InsertLocalMinimaIntoAEL = function (botY)
{
  while (this.m_CurrentLM !== null && (this.m_CurrentLM.Y == botY))
  {
    var lb = this.m_CurrentLM.LeftBound;
    var rb = this.m_CurrentLM.RightBound;
    this.PopLocalMinima();
    var Op1 = null;
    if (lb === null)
    {
      this.InsertEdgeIntoAEL(rb, null);
      this.SetWindingCount(rb);
      if (this.IsContributing(rb))
        Op1 = this.AddOutPt(rb, rb.Bot);
    }
    else if (rb == null)
    {
      this.InsertEdgeIntoAEL(lb, null);
      this.SetWindingCount(lb);
      if (this.IsContributing(lb))
        Op1 = this.AddOutPt(lb, lb.Bot);
      this.InsertScanbeam(lb.Top.Y);
    }
    else
    {
      this.InsertEdgeIntoAEL(lb, null);
      this.InsertEdgeIntoAEL(rb, lb);
      this.SetWindingCount(lb);
      rb.WindCnt = lb.WindCnt;
      rb.WindCnt2 = lb.WindCnt2;
      if (this.IsContributing(lb))
        Op1 = this.AddLocalMinPoly(lb, rb, lb.Bot);
      this.InsertScanbeam(lb.Top.Y);
    }
    if (rb != null)
    {
      if (ClipperLib.ClipperBase.IsHorizontal(rb))
        this.AddEdgeToSEL(rb);
      else
        this.InsertScanbeam(rb.Top.Y);
    }
    if (lb == null || rb == null) continue;
    //if output polygons share an Edge with a horizontal rb, they'll need joining later ...
    if (Op1 !== null && ClipperLib.ClipperBase.IsHorizontal(rb) && this.m_GhostJoins.length > 0 && rb.WindDelta !== 0)
    {
      for (var i = 0, ilen = this.m_GhostJoins.length; i < ilen; i++)
      {
        //if the horizontal Rb and a 'ghost' horizontal overlap, then convert
        //the 'ghost' join to a real join ready for later ...
        var j = this.m_GhostJoins[i];
        if (this.HorzSegmentsOverlap(j.OutPt1.Pt, j.OffPt, rb.Bot, rb.Top))
          this.AddJoin(j.OutPt1, Op1, j.OffPt);
      }
    }
    if (lb.OutIdx >= 0 && lb.PrevInAEL !== null &&
      lb.PrevInAEL.Curr.X == lb.Bot.X &&
      lb.PrevInAEL.OutIdx >= 0 &&
      ClipperLib.ClipperBase.SlopesEqual(lb.PrevInAEL, lb, this.m_UseFullRange) &&
      lb.WindDelta !== 0 && lb.PrevInAEL.WindDelta !== 0)
    {
      var Op2 = this.AddOutPt(lb.PrevInAEL, lb.Bot);
      this.AddJoin(Op1, Op2, lb.Top);
    }
    if (lb.NextInAEL != rb)
    {
      if (rb.OutIdx >= 0 && rb.PrevInAEL.OutIdx >= 0 &&
        ClipperLib.ClipperBase.SlopesEqual(rb.PrevInAEL, rb, this.m_UseFullRange) &&
        rb.WindDelta !== 0 && rb.PrevInAEL.WindDelta !== 0)
      {
        var Op2 = this.AddOutPt(rb.PrevInAEL, rb.Bot);
        this.AddJoin(Op1, Op2, rb.Top);
      }
      var e = lb.NextInAEL;
      if (e !== null)
        while (e != rb)
        {
          //nb: For calculating winding counts etc, IntersectEdges() assumes
          //that param1 will be to the right of param2 ABOVE the intersection ...
          this.IntersectEdges(rb, e, lb.Curr, false);
          //order important here
          e = e.NextInAEL;
        }
    }
  }
};
ClipperLib.Clipper.prototype.InsertEdgeIntoAEL = function (edge, startEdge)
{
  if (this.m_ActiveEdges === null)
  {
    edge.PrevInAEL = null;
    edge.NextInAEL = null;
    this.m_ActiveEdges = edge;
  }
  else if (startEdge === null && this.E2InsertsBeforeE1(this.m_ActiveEdges, edge))
  {
    edge.PrevInAEL = null;
    edge.NextInAEL = this.m_ActiveEdges;
    this.m_ActiveEdges.PrevInAEL = edge;
    this.m_ActiveEdges = edge;
  }
  else
  {
    if (startEdge === null)
      startEdge = this.m_ActiveEdges;
    while (startEdge.NextInAEL !== null && !this.E2InsertsBeforeE1(startEdge.NextInAEL, edge))
      startEdge = startEdge.NextInAEL;
    edge.NextInAEL = startEdge.NextInAEL;
    if (startEdge.NextInAEL !== null)
      startEdge.NextInAEL.PrevInAEL = edge;
    edge.PrevInAEL = startEdge;
    startEdge.NextInAEL = edge;
  }
};
ClipperLib.Clipper.prototype.E2InsertsBeforeE1 = function (e1, e2)
{
  if (e2.Curr.X == e1.Curr.X)
  {
    if (e2.Top.Y > e1.Top.Y)
      return e2.Top.X < ClipperLib.Clipper.TopX(e1, e2.Top.Y);
    else
      return e1.Top.X > ClipperLib.Clipper.TopX(e2, e1.Top.Y);
  }
  else
    return e2.Curr.X < e1.Curr.X;
};
ClipperLib.Clipper.prototype.IsEvenOddFillType = function (edge)
{
  if (edge.PolyTyp == ClipperLib.PolyType.ptSubject)
    return this.m_SubjFillType == ClipperLib.PolyFillType.pftEvenOdd;
  else
    return this.m_ClipFillType == ClipperLib.PolyFillType.pftEvenOdd;
};
ClipperLib.Clipper.prototype.IsEvenOddAltFillType = function (edge)
{
  if (edge.PolyTyp == ClipperLib.PolyType.ptSubject)
    return this.m_ClipFillType == ClipperLib.PolyFillType.pftEvenOdd;
  else
    return this.m_SubjFillType == ClipperLib.PolyFillType.pftEvenOdd;
};
ClipperLib.Clipper.prototype.IsContributing = function (edge)
{
  var pft, pft2;
  if (edge.PolyTyp == ClipperLib.PolyType.ptSubject)
  {
    pft = this.m_SubjFillType;
    pft2 = this.m_ClipFillType;
  }
  else
  {
    pft = this.m_ClipFillType;
    pft2 = this.m_SubjFillType;
  }
  switch (pft)
  {
  case ClipperLib.PolyFillType.pftEvenOdd:
    if (edge.WindDelta === 0 && edge.WindCnt != 1)
      return false;
    break;
  case ClipperLib.PolyFillType.pftNonZero:
    if (Math.abs(edge.WindCnt) != 1)
      return false;
    break;
  case ClipperLib.PolyFillType.pftPositive:
    if (edge.WindCnt != 1)
      return false;
    break;
  default:
    if (edge.WindCnt != -1)
      return false;
    break;
  }
  switch (this.m_ClipType)
  {
  case ClipperLib.ClipType.ctIntersection:
    switch (pft2)
    {
    case ClipperLib.PolyFillType.pftEvenOdd:
    case ClipperLib.PolyFillType.pftNonZero:
      return (edge.WindCnt2 !== 0);
    case ClipperLib.PolyFillType.pftPositive:
      return (edge.WindCnt2 > 0);
    default:
      return (edge.WindCnt2 < 0);
    }
  case ClipperLib.ClipType.ctUnion:
    switch (pft2)
    {
    case ClipperLib.PolyFillType.pftEvenOdd:
    case ClipperLib.PolyFillType.pftNonZero:
      return (edge.WindCnt2 === 0);
    case ClipperLib.PolyFillType.pftPositive:
      return (edge.WindCnt2 <= 0);
    default:
      return (edge.WindCnt2 >= 0);
    }
  case ClipperLib.ClipType.ctDifference:
    if (edge.PolyTyp == ClipperLib.PolyType.ptSubject)
      switch (pft2)
      {
      case ClipperLib.PolyFillType.pftEvenOdd:
      case ClipperLib.PolyFillType.pftNonZero:
        return (edge.WindCnt2 === 0);
      case ClipperLib.PolyFillType.pftPositive:
        return (edge.WindCnt2 <= 0);
      default:
        return (edge.WindCnt2 >= 0);
      }
    else
      switch (pft2)
      {
      case ClipperLib.PolyFillType.pftEvenOdd:
      case ClipperLib.PolyFillType.pftNonZero:
        return (edge.WindCnt2 !== 0);
      case ClipperLib.PolyFillType.pftPositive:
        return (edge.WindCnt2 > 0);
      default:
        return (edge.WindCnt2 < 0);
      }
  case ClipperLib.ClipType.ctXor:
    if (edge.WindDelta === 0)
      switch (pft2)
      {
      case ClipperLib.PolyFillType.pftEvenOdd:
      case ClipperLib.PolyFillType.pftNonZero:
        return (edge.WindCnt2 === 0);
      case ClipperLib.PolyFillType.pftPositive:
        return (edge.WindCnt2 <= 0);
      default:
        return (edge.WindCnt2 >= 0);
      }
    else
      return true;
  }
  return true;
};
ClipperLib.Clipper.prototype.SetWindingCount = function (edge)
{
  var e = edge.PrevInAEL;
  //find the edge of the same polytype that immediately preceeds 'edge' in AEL
  while (e !== null && ((e.PolyTyp != edge.PolyTyp) || (e.WindDelta === 0)))
    e = e.PrevInAEL;
  if (e === null)
  {
    edge.WindCnt = (edge.WindDelta === 0 ? 1 : edge.WindDelta);
    edge.WindCnt2 = 0;
    e = this.m_ActiveEdges;
    //ie get ready to calc WindCnt2
  }
  else if (edge.WindDelta === 0 && this.m_ClipType != ClipperLib.ClipType.ctUnion)
  {
    edge.WindCnt = 1;
    edge.WindCnt2 = e.WindCnt2;
    e = e.NextInAEL;
    //ie get ready to calc WindCnt2
  }
  else if (this.IsEvenOddFillType(edge))
  {
    //EvenOdd filling ...
    if (edge.WindDelta === 0)
    {
      //are we inside a subj polygon ...
      var Inside = true;
      var e2 = e.PrevInAEL;
      while (e2 !== null)
      {
        if (e2.PolyTyp == e.PolyTyp && e2.WindDelta !== 0)
          Inside = !Inside;
        e2 = e2.PrevInAEL;
      }
      edge.WindCnt = (Inside ? 0 : 1);
    }
    else
    {
      edge.WindCnt = edge.WindDelta;
    }
    edge.WindCnt2 = e.WindCnt2;
    e = e.NextInAEL;
    //ie get ready to calc WindCnt2
  }
  else
  {
    //nonZero, Positive or Negative filling ...
    if (e.WindCnt * e.WindDelta < 0)
    {
      //prev edge is 'decreasing' WindCount (WC) toward zero
      //so we're outside the previous polygon ...
      if (Math.abs(e.WindCnt) > 1)
      {
        //outside prev poly but still inside another.
        //when reversing direction of prev poly use the same WC 
        if (e.WindDelta * edge.WindDelta < 0)
          edge.WindCnt = e.WindCnt;
        else
          edge.WindCnt = e.WindCnt + edge.WindDelta;
      }
      else
        edge.WindCnt = (edge.WindDelta === 0 ? 1 : edge.WindDelta);
    }
    else
    {
      //prev edge is 'increasing' WindCount (WC) away from zero
      //so we're inside the previous polygon ...
      if (edge.WindDelta === 0)
        edge.WindCnt = (e.WindCnt < 0 ? e.WindCnt - 1 : e.WindCnt + 1);
      else if (e.WindDelta * edge.WindDelta < 0)
        edge.WindCnt = e.WindCnt;
      else
        edge.WindCnt = e.WindCnt + edge.WindDelta;
    }
    edge.WindCnt2 = e.WindCnt2;
    e = e.NextInAEL;
    //ie get ready to calc WindCnt2
  }
  //update WindCnt2 ...
  if (this.IsEvenOddAltFillType(edge))
  {
    //EvenOdd filling ...
    while (e != edge)
    {
      if (e.WindDelta !== 0)
        edge.WindCnt2 = (edge.WindCnt2 === 0 ? 1 : 0);
      e = e.NextInAEL;
    }
  }
  else
  {
    //nonZero, Positive or Negative filling ...
    while (e != edge)
    {
      edge.WindCnt2 += e.WindDelta;
      e = e.NextInAEL;
    }
  }
};
ClipperLib.Clipper.prototype.AddEdgeToSEL = function (edge)
{
  //SEL pointers in PEdge are reused to build a list of horizontal edges.
  //However, we don't need to worry about order with horizontal edge processing.
  if (this.m_SortedEdges === null)
  {
    this.m_SortedEdges = edge;
    edge.PrevInSEL = null;
    edge.NextInSEL = null;
  }
  else
  {
    edge.NextInSEL = this.m_SortedEdges;
    edge.PrevInSEL = null;
    this.m_SortedEdges.PrevInSEL = edge;
    this.m_SortedEdges = edge;
  }
};
ClipperLib.Clipper.prototype.CopyAELToSEL = function ()
{
  var e = this.m_ActiveEdges;
  this.m_SortedEdges = e;
  while (e !== null)
  {
    e.PrevInSEL = e.PrevInAEL;
    e.NextInSEL = e.NextInAEL;
    e = e.NextInAEL;
  }
};
ClipperLib.Clipper.prototype.SwapPositionsInAEL = function (edge1, edge2)
{
  //check that one or other edge hasn't already been removed from AEL ...
  if (edge1.NextInAEL == edge1.PrevInAEL || edge2.NextInAEL == edge2.PrevInAEL)
    return;
  if (edge1.NextInAEL == edge2)
  {
    var next = edge2.NextInAEL;
    if (next !== null)
      next.PrevInAEL = edge1;
    var prev = edge1.PrevInAEL;
    if (prev !== null)
      prev.NextInAEL = edge2;
    edge2.PrevInAEL = prev;
    edge2.NextInAEL = edge1;
    edge1.PrevInAEL = edge2;
    edge1.NextInAEL = next;
  }
  else if (edge2.NextInAEL == edge1)
  {
    var next = edge1.NextInAEL;
    if (next !== null)
      next.PrevInAEL = edge2;
    var prev = edge2.PrevInAEL;
    if (prev !== null)
      prev.NextInAEL = edge1;
    edge1.PrevInAEL = prev;
    edge1.NextInAEL = edge2;
    edge2.PrevInAEL = edge1;
    edge2.NextInAEL = next;
  }
  else
  {
    var next = edge1.NextInAEL;
    var prev = edge1.PrevInAEL;
    edge1.NextInAEL = edge2.NextInAEL;
    if (edge1.NextInAEL !== null)
      edge1.NextInAEL.PrevInAEL = edge1;
    edge1.PrevInAEL = edge2.PrevInAEL;
    if (edge1.PrevInAEL !== null)
      edge1.PrevInAEL.NextInAEL = edge1;
    edge2.NextInAEL = next;
    if (edge2.NextInAEL !== null)
      edge2.NextInAEL.PrevInAEL = edge2;
    edge2.PrevInAEL = prev;
    if (edge2.PrevInAEL !== null)
      edge2.PrevInAEL.NextInAEL = edge2;
  }
  if (edge1.PrevInAEL === null)
    this.m_ActiveEdges = edge1;
  else if (edge2.PrevInAEL === null)
    this.m_ActiveEdges = edge2;
};
ClipperLib.Clipper.prototype.SwapPositionsInSEL = function (edge1, edge2)
{
  if (edge1.NextInSEL === null && edge1.PrevInSEL === null)
    return;
  if (edge2.NextInSEL === null && edge2.PrevInSEL === null)
    return;
  if (edge1.NextInSEL == edge2)
  {
    var next = edge2.NextInSEL;
    if (next !== null)
      next.PrevInSEL = edge1;
    var prev = edge1.PrevInSEL;
    if (prev !== null)
      prev.NextInSEL = edge2;
    edge2.PrevInSEL = prev;
    edge2.NextInSEL = edge1;
    edge1.PrevInSEL = edge2;
    edge1.NextInSEL = next;
  }
  else if (edge2.NextInSEL == edge1)
  {
    var next = edge1.NextInSEL;
    if (next !== null)
      next.PrevInSEL = edge2;
    var prev = edge2.PrevInSEL;
    if (prev !== null)
      prev.NextInSEL = edge1;
    edge1.PrevInSEL = prev;
    edge1.NextInSEL = edge2;
    edge2.PrevInSEL = edge1;
    edge2.NextInSEL = next;
  }
  else
  {
    var next = edge1.NextInSEL;
    var prev = edge1.PrevInSEL;
    edge1.NextInSEL = edge2.NextInSEL;
    if (edge1.NextInSEL !== null)
      edge1.NextInSEL.PrevInSEL = edge1;
    edge1.PrevInSEL = edge2.PrevInSEL;
    if (edge1.PrevInSEL !== null)
      edge1.PrevInSEL.NextInSEL = edge1;
    edge2.NextInSEL = next;
    if (edge2.NextInSEL !== null)
      edge2.NextInSEL.PrevInSEL = edge2;
    edge2.PrevInSEL = prev;
    if (edge2.PrevInSEL !== null)
      edge2.PrevInSEL.NextInSEL = edge2;
  }
  if (edge1.PrevInSEL === null)
    this.m_SortedEdges = edge1;
  else if (edge2.PrevInSEL === null)
    this.m_SortedEdges = edge2;
};
ClipperLib.Clipper.prototype.AddLocalMaxPoly = function (e1, e2, pt)
{
  this.AddOutPt(e1, pt);
  if (e2.WindDelta == 0) this.AddOutPt(e2, pt);
  if (e1.OutIdx == e2.OutIdx)
  {
    e1.OutIdx = -1;
    e2.OutIdx = -1;
  }
  else if (e1.OutIdx < e2.OutIdx)
    this.AppendPolygon(e1, e2);
  else
    this.AppendPolygon(e2, e1);
};
ClipperLib.Clipper.prototype.AddLocalMinPoly = function (e1, e2, pt)
{
  var result;
  var e, prevE;
  if (ClipperLib.ClipperBase.IsHorizontal(e2) || (e1.Dx > e2.Dx))
  {
    result = this.AddOutPt(e1, pt);
    e2.OutIdx = e1.OutIdx;
    e1.Side = ClipperLib.EdgeSide.esLeft;
    e2.Side = ClipperLib.EdgeSide.esRight;
    e = e1;
    if (e.PrevInAEL == e2)
      prevE = e2.PrevInAEL;
    else
      prevE = e.PrevInAEL;
  }
  else
  {
    result = this.AddOutPt(e2, pt);
    e1.OutIdx = e2.OutIdx;
    e1.Side = ClipperLib.EdgeSide.esRight;
    e2.Side = ClipperLib.EdgeSide.esLeft;
    e = e2;
    if (e.PrevInAEL == e1)
      prevE = e1.PrevInAEL;
    else
      prevE = e.PrevInAEL;
  }
  if (prevE !== null && prevE.OutIdx >= 0 && (ClipperLib.Clipper.TopX(prevE, pt.Y) == ClipperLib.Clipper.TopX(e, pt.Y)) && ClipperLib.ClipperBase.SlopesEqual(e, prevE, this.m_UseFullRange) && (e.WindDelta !== 0) && (prevE.WindDelta !== 0))
  {
    var outPt = this.AddOutPt(prevE, pt);
    this.AddJoin(result, outPt, e.Top);
  }
  return result;
};
ClipperLib.Clipper.prototype.CreateOutRec = function ()
{
  var result = new ClipperLib.OutRec();
  result.Idx = -1;
  result.IsHole = false;
  result.IsOpen = false;
  result.FirstLeft = null;
  result.Pts = null;
  result.BottomPt = null;
  result.PolyNode = null;
  this.m_PolyOuts.push(result);
  result.Idx = this.m_PolyOuts.length - 1;
  return result;
};
ClipperLib.Clipper.prototype.AddOutPt = function (e, pt)
{
  var ToFront = (e.Side == ClipperLib.EdgeSide.esLeft);
  if (e.OutIdx < 0)
  {
    var outRec = this.CreateOutRec();
    outRec.IsOpen = (e.WindDelta === 0);
    var newOp = new ClipperLib.OutPt();
    outRec.Pts = newOp;
    newOp.Idx = outRec.Idx;
    //newOp.Pt = pt;
    newOp.Pt.X = pt.X;
    newOp.Pt.Y = pt.Y;
    newOp.Next = newOp;
    newOp.Prev = newOp;
    if (!outRec.IsOpen)
      this.SetHoleState(e, outRec);
    if (use_xyz)
    {
      if (ClipperLib.IntPoint.op_Equality(pt, e.Bot))
      {
        //newOp.Pt = e.Bot;
        newOp.Pt.X = e.Bot.X;
        newOp.Pt.Y = e.Bot.Y;
        newOp.Pt.Z = e.Bot.Z;
      }
      else if (ClipperLib.IntPoint.op_Equality(pt, e.Top))
      {
        //newOp.Pt = e.Top;
        newOp.Pt.X = e.Top.X;
        newOp.Pt.Y = e.Top.Y;
        newOp.Pt.Z = e.Top.Z;
      }
      else
        this.SetZ(newOp.Pt, e);
    }
    e.OutIdx = outRec.Idx;
    //nb: do this after SetZ !
    return newOp;
  }
  else
  {
    var outRec = this.m_PolyOuts[e.OutIdx];
    //OutRec.Pts is the 'Left-most' point & OutRec.Pts.Prev is the 'Right-most'
    var op = outRec.Pts;
    if (ToFront && ClipperLib.IntPoint.op_Equality(pt, op.Pt))
      return op;
    else if (!ToFront && ClipperLib.IntPoint.op_Equality(pt, op.Prev.Pt))
      return op.Prev;
    var newOp = new ClipperLib.OutPt();
    newOp.Idx = outRec.Idx;
    //newOp.Pt = pt;
    newOp.Pt.X = pt.X;
    newOp.Pt.Y = pt.Y;
    newOp.Next = op;
    newOp.Prev = op.Prev;
    newOp.Prev.Next = newOp;
    op.Prev = newOp;
    if (ToFront)
      outRec.Pts = newOp;
    if (use_xyz)
    {
      if (ClipperLib.IntPoint.op_Equality(pt, e.Bot))
      {
        //newOp.Pt = e.Bot;
        newOp.Pt.X = e.Bot.X;
        newOp.Pt.Y = e.Bot.Y;
        newOp.Pt.Z = e.Bot.Z;
      }
      else if (ClipperLib.IntPoint.op_Equality(pt, e.Top))
      {
        //newOp.Pt = e.Top;
        newOp.Pt.X = e.Top.X;
        newOp.Pt.Y = e.Top.Y;
        newOp.Pt.Z = e.Top.Z;
      }
      else
        this.SetZ(newOp.Pt, e);
    }
    return newOp;
  }
};
ClipperLib.Clipper.prototype.SwapPoints = function (pt1, pt2)
{
  var tmp = new ClipperLib.IntPoint(pt1.Value);
  //pt1.Value = pt2.Value;
  pt1.Value.X = pt2.Value.X;
  pt1.Value.Y = pt2.Value.Y;
  //pt2.Value = tmp;
  pt2.Value.X = tmp.X;
  pt2.Value.Y = tmp.Y;
};
ClipperLib.Clipper.prototype.HorzSegmentsOverlap = function (Pt1a, Pt1b, Pt2a, Pt2b)
{
  //precondition: both segments are horizontal
  if ((Pt1a.X > Pt2a.X) == (Pt1a.X < Pt2b.X))
    return true;
  else if ((Pt1b.X > Pt2a.X) == (Pt1b.X < Pt2b.X))
    return true;
  else if ((Pt2a.X > Pt1a.X) == (Pt2a.X < Pt1b.X))
    return true;
  else if ((Pt2b.X > Pt1a.X) == (Pt2b.X < Pt1b.X))
    return true;
  else if ((Pt1a.X == Pt2a.X) && (Pt1b.X == Pt2b.X))
    return true;
  else if ((Pt1a.X == Pt2b.X) && (Pt1b.X == Pt2a.X))
    return true;
  else
    return false;
};
ClipperLib.Clipper.prototype.InsertPolyPtBetween = function (p1, p2, pt)
{
  var result = new ClipperLib.OutPt();
  //result.Pt = pt;
  result.Pt.X = pt.X;
  result.Pt.Y = pt.Y;
  if (p2 == p1.Next)
  {
    p1.Next = result;
    p2.Prev = result;
    result.Next = p2;
    result.Prev = p1;
  }
  else
  {
    p2.Next = result;
    p1.Prev = result;
    result.Next = p1;
    result.Prev = p2;
  }
  return result;
};
ClipperLib.Clipper.prototype.SetHoleState = function (e, outRec)
{
  var isHole = false;
  var e2 = e.PrevInAEL;
  while (e2 !== null)
  {
    if (e2.OutIdx >= 0 && e2.WindDelta != 0)
    {
      isHole = !isHole;
      if (outRec.FirstLeft === null)
        outRec.FirstLeft = this.m_PolyOuts[e2.OutIdx];
    }
    e2 = e2.PrevInAEL;
  }
  if (isHole)
    outRec.IsHole = true;
};
ClipperLib.Clipper.prototype.GetDx = function (pt1, pt2)
{
  if (pt1.Y == pt2.Y)
    return ClipperLib.ClipperBase.horizontal;
  else
    return (pt2.X - pt1.X) / (pt2.Y - pt1.Y);
};
ClipperLib.Clipper.prototype.FirstIsBottomPt = function (btmPt1, btmPt2)
{
  var p = btmPt1.Prev;
  while ((ClipperLib.IntPoint.op_Equality(p.Pt, btmPt1.Pt)) && (p != btmPt1))
    p = p.Prev;
  var dx1p = Math.abs(this.GetDx(btmPt1.Pt, p.Pt));
  p = btmPt1.Next;
  while ((ClipperLib.IntPoint.op_Equality(p.Pt, btmPt1.Pt)) && (p != btmPt1))
    p = p.Next;
  var dx1n = Math.abs(this.GetDx(btmPt1.Pt, p.Pt));
  p = btmPt2.Prev;
  while ((ClipperLib.IntPoint.op_Equality(p.Pt, btmPt2.Pt)) && (p != btmPt2))
    p = p.Prev;
  var dx2p = Math.abs(this.GetDx(btmPt2.Pt, p.Pt));
  p = btmPt2.Next;
  while ((ClipperLib.IntPoint.op_Equality(p.Pt, btmPt2.Pt)) && (p != btmPt2))
    p = p.Next;
  var dx2n = Math.abs(this.GetDx(btmPt2.Pt, p.Pt));
  return (dx1p >= dx2p && dx1p >= dx2n) || (dx1n >= dx2p && dx1n >= dx2n);
};
ClipperLib.Clipper.prototype.GetBottomPt = function (pp)
{
  var dups = null;
  var p = pp.Next;
  while (p != pp)
  {
    if (p.Pt.Y > pp.Pt.Y)
    {
      pp = p;
      dups = null;
    }
    else if (p.Pt.Y == pp.Pt.Y && p.Pt.X <= pp.Pt.X)
    {
      if (p.Pt.X < pp.Pt.X)
      {
        dups = null;
        pp = p;
      }
      else
      {
        if (p.Next != pp && p.Prev != pp)
          dups = p;
      }
    }
    p = p.Next;
  }
  if (dups !== null)
  {
    //there appears to be at least 2 vertices at bottomPt so ...
    while (dups != p)
    {
      if (!this.FirstIsBottomPt(p, dups))
        pp = dups;
      dups = dups.Next;
      while (ClipperLib.IntPoint.op_Inequality(dups.Pt, pp.Pt))
        dups = dups.Next;
    }
  }
  return pp;
};
ClipperLib.Clipper.prototype.GetLowermostRec = function (outRec1, outRec2)
{
  //work out which polygon fragment has the correct hole state ...
  if (outRec1.BottomPt === null)
    outRec1.BottomPt = this.GetBottomPt(outRec1.Pts);
  if (outRec2.BottomPt === null)
    outRec2.BottomPt = this.GetBottomPt(outRec2.Pts);
  var bPt1 = outRec1.BottomPt;
  var bPt2 = outRec2.BottomPt;
  if (bPt1.Pt.Y > bPt2.Pt.Y)
    return outRec1;
  else if (bPt1.Pt.Y < bPt2.Pt.Y)
    return outRec2;
  else if (bPt1.Pt.X < bPt2.Pt.X)
    return outRec1;
  else if (bPt1.Pt.X > bPt2.Pt.X)
    return outRec2;
  else if (bPt1.Next == bPt1)
    return outRec2;
  else if (bPt2.Next == bPt2)
    return outRec1;
  else if (this.FirstIsBottomPt(bPt1, bPt2))
    return outRec1;
  else
    return outRec2;
};
ClipperLib.Clipper.prototype.Param1RightOfParam2 = function (outRec1, outRec2)
{
  do {
    outRec1 = outRec1.FirstLeft;
    if (outRec1 == outRec2)
      return true;
  }
  while (outRec1 !== null)
  return false;
};
ClipperLib.Clipper.prototype.GetOutRec = function (idx)
{
  var outrec = this.m_PolyOuts[idx];
  while (outrec != this.m_PolyOuts[outrec.Idx])
    outrec = this.m_PolyOuts[outrec.Idx];
  return outrec;
};
ClipperLib.Clipper.prototype.AppendPolygon = function (e1, e2)
{
  //get the start and ends of both output polygons ...
  var outRec1 = this.m_PolyOuts[e1.OutIdx];
  var outRec2 = this.m_PolyOuts[e2.OutIdx];
  var holeStateRec;
  if (this.Param1RightOfParam2(outRec1, outRec2))
    holeStateRec = outRec2;
  else if (this.Param1RightOfParam2(outRec2, outRec1))
    holeStateRec = outRec1;
  else
    holeStateRec = this.GetLowermostRec(outRec1, outRec2);
  var p1_lft = outRec1.Pts;
  var p1_rt = p1_lft.Prev;
  var p2_lft = outRec2.Pts;
  var p2_rt = p2_lft.Prev;
  var side;
  //join e2 poly onto e1 poly and delete pointers to e2 ...
  if (e1.Side == ClipperLib.EdgeSide.esLeft)
  {
    if (e2.Side == ClipperLib.EdgeSide.esLeft)
    {
      //z y x a b c
      this.ReversePolyPtLinks(p2_lft);
      p2_lft.Next = p1_lft;
      p1_lft.Prev = p2_lft;
      p1_rt.Next = p2_rt;
      p2_rt.Prev = p1_rt;
      outRec1.Pts = p2_rt;
    }
    else
    {
      //x y z a b c
      p2_rt.Next = p1_lft;
      p1_lft.Prev = p2_rt;
      p2_lft.Prev = p1_rt;
      p1_rt.Next = p2_lft;
      outRec1.Pts = p2_lft;
    }
    side = ClipperLib.EdgeSide.esLeft;
  }
  else
  {
    if (e2.Side == ClipperLib.EdgeSide.esRight)
    {
      //a b c z y x
      this.ReversePolyPtLinks(p2_lft);
      p1_rt.Next = p2_rt;
      p2_rt.Prev = p1_rt;
      p2_lft.Next = p1_lft;
      p1_lft.Prev = p2_lft;
    }
    else
    {
      //a b c x y z
      p1_rt.Next = p2_lft;
      p2_lft.Prev = p1_rt;
      p1_lft.Prev = p2_rt;
      p2_rt.Next = p1_lft;
    }
    side = ClipperLib.EdgeSide.esRight;
  }
  outRec1.BottomPt = null;
  if (holeStateRec == outRec2)
  {
    if (outRec2.FirstLeft != outRec1)
      outRec1.FirstLeft = outRec2.FirstLeft;
    outRec1.IsHole = outRec2.IsHole;
  }
  outRec2.Pts = null;
  outRec2.BottomPt = null;
  outRec2.FirstLeft = outRec1;
  var OKIdx = e1.OutIdx;
  var ObsoleteIdx = e2.OutIdx;
  e1.OutIdx = -1;
  //nb: safe because we only get here via AddLocalMaxPoly
  e2.OutIdx = -1;
  var e = this.m_ActiveEdges;
  while (e !== null)
  {
    if (e.OutIdx == ObsoleteIdx)
    {
      e.OutIdx = OKIdx;
      e.Side = side;
      break;
    }
    e = e.NextInAEL;
  }
  outRec2.Idx = outRec1.Idx;
};
ClipperLib.Clipper.prototype.ReversePolyPtLinks = function (pp)
{
  if (pp === null)
    return;
  var pp1;
  var pp2;
  pp1 = pp;
  do {
    pp2 = pp1.Next;
    pp1.Next = pp1.Prev;
    pp1.Prev = pp2;
    pp1 = pp2;
  }
  while (pp1 != pp)
};
ClipperLib.Clipper.SwapSides = function (edge1, edge2)
{
  var side = edge1.Side;
  edge1.Side = edge2.Side;
  edge2.Side = side;
};
ClipperLib.Clipper.SwapPolyIndexes = function (edge1, edge2)
{
  var outIdx = edge1.OutIdx;
  edge1.OutIdx = edge2.OutIdx;
  edge2.OutIdx = outIdx;
};
ClipperLib.Clipper.prototype.IntersectEdges = function (e1, e2, pt, protect)
{
  //e1 will be to the left of e2 BELOW the intersection. Therefore e1 is before
  //e2 in AEL except when e1 is being inserted at the intersection point ...
  var e1stops = !protect && e1.NextInLML === null &&
    e1.Top.X == pt.X && e1.Top.Y == pt.Y;
  var e2stops = !protect && e2.NextInLML === null &&
    e2.Top.X == pt.X && e2.Top.Y == pt.Y;
  var e1Contributing = (e1.OutIdx >= 0);
  var e2Contributing = (e2.OutIdx >= 0);
  if (use_lines)
  {
    //if either edge is on an OPEN path ...
    if (e1.WindDelta === 0 || e2.WindDelta === 0)
    {
      //ignore subject-subject open path intersections UNLESS they
      //are both open paths, AND they are both 'contributing maximas' ...
      if (e1.WindDelta === 0 && e2.WindDelta === 0)
      {
        if ((e1stops || e2stops) && e1Contributing && e2Contributing)
          this.AddLocalMaxPoly(e1, e2, pt);
      }
      //if intersecting a subj line with a subj poly ...
      else if (e1.PolyTyp == e2.PolyTyp &&
        e1.WindDelta != e2.WindDelta && this.m_ClipType == ClipperLib.ClipType.ctUnion)
      {
        if (e1.WindDelta === 0)
        {
          if (e2Contributing)
          {
            this.AddOutPt(e1, pt);
            if (e1Contributing)
              e1.OutIdx = -1;
          }
        }
        else
        {
          if (e1Contributing)
          {
            this.AddOutPt(e2, pt);
            if (e2Contributing)
              e2.OutIdx = -1;
          }
        }
      }
      else if (e1.PolyTyp != e2.PolyTyp)
      {
        if ((e1.WindDelta === 0) && Math.abs(e2.WindCnt) == 1 &&
          (this.m_ClipType != ClipperLib.ClipType.ctUnion || e2.WindCnt2 === 0))
        {
          this.AddOutPt(e1, pt);
          if (e1Contributing)
            e1.OutIdx = -1;
        }
        else if ((e2.WindDelta === 0) && (Math.abs(e1.WindCnt) == 1) &&
          (this.m_ClipType != ClipperLib.ClipType.ctUnion || e1.WindCnt2 === 0))
        {
          this.AddOutPt(e2, pt);
          if (e2Contributing)
            e2.OutIdx = -1;
        }
      }
      if (e1stops)
        if (e1.OutIdx < 0)
          this.DeleteFromAEL(e1);
        else
          ClipperLib.Error("Error intersecting polylines");
      if (e2stops)
        if (e2.OutIdx < 0)
          this.DeleteFromAEL(e2);
        else
          ClipperLib.Error("Error intersecting polylines");
      return;
    }
  }
  //update winding counts...
  //assumes that e1 will be to the Right of e2 ABOVE the intersection
  if (e1.PolyTyp == e2.PolyTyp)
  {
    if (this.IsEvenOddFillType(e1))
    {
      var oldE1WindCnt = e1.WindCnt;
      e1.WindCnt = e2.WindCnt;
      e2.WindCnt = oldE1WindCnt;
    }
    else
    {
      if (e1.WindCnt + e2.WindDelta === 0)
        e1.WindCnt = -e1.WindCnt;
      else
        e1.WindCnt += e2.WindDelta;
      if (e2.WindCnt - e1.WindDelta === 0)
        e2.WindCnt = -e2.WindCnt;
      else
        e2.WindCnt -= e1.WindDelta;
    }
  }
  else
  {
    if (!this.IsEvenOddFillType(e2))
      e1.WindCnt2 += e2.WindDelta;
    else
      e1.WindCnt2 = (e1.WindCnt2 === 0) ? 1 : 0;
    if (!this.IsEvenOddFillType(e1))
      e2.WindCnt2 -= e1.WindDelta;
    else
      e2.WindCnt2 = (e2.WindCnt2 === 0) ? 1 : 0;
  }
  var e1FillType, e2FillType, e1FillType2, e2FillType2;
  if (e1.PolyTyp == ClipperLib.PolyType.ptSubject)
  {
    e1FillType = this.m_SubjFillType;
    e1FillType2 = this.m_ClipFillType;
  }
  else
  {
    e1FillType = this.m_ClipFillType;
    e1FillType2 = this.m_SubjFillType;
  }
  if (e2.PolyTyp == ClipperLib.PolyType.ptSubject)
  {
    e2FillType = this.m_SubjFillType;
    e2FillType2 = this.m_ClipFillType;
  }
  else
  {
    e2FillType = this.m_ClipFillType;
    e2FillType2 = this.m_SubjFillType;
  }
  var e1Wc, e2Wc;
  switch (e1FillType)
  {
  case ClipperLib.PolyFillType.pftPositive:
    e1Wc = e1.WindCnt;
    break;
  case ClipperLib.PolyFillType.pftNegative:
    e1Wc = -e1.WindCnt;
    break;
  default:
    e1Wc = Math.abs(e1.WindCnt);
    break;
  }
  switch (e2FillType)
  {
  case ClipperLib.PolyFillType.pftPositive:
    e2Wc = e2.WindCnt;
    break;
  case ClipperLib.PolyFillType.pftNegative:
    e2Wc = -e2.WindCnt;
    break;
  default:
    e2Wc = Math.abs(e2.WindCnt);
    break;
  }
  if (e1Contributing && e2Contributing)
  {
    if (e1stops || e2stops || (e1Wc !== 0 && e1Wc != 1) || (e2Wc !== 0 && e2Wc != 1) ||
      (e1.PolyTyp != e2.PolyTyp && this.m_ClipType != ClipperLib.ClipType.ctXor))
      this.AddLocalMaxPoly(e1, e2, pt);
    else
    {
      this.AddOutPt(e1, pt);
      this.AddOutPt(e2, pt);
      ClipperLib.Clipper.SwapSides(e1, e2);
      ClipperLib.Clipper.SwapPolyIndexes(e1, e2);
    }
  }
  else if (e1Contributing)
  {
    if (e2Wc === 0 || e2Wc == 1)
    {
      this.AddOutPt(e1, pt);
      ClipperLib.Clipper.SwapSides(e1, e2);
      ClipperLib.Clipper.SwapPolyIndexes(e1, e2);
    }
  }
  else if (e2Contributing)
  {
    if (e1Wc === 0 || e1Wc == 1)
    {
      this.AddOutPt(e2, pt);
      ClipperLib.Clipper.SwapSides(e1, e2);
      ClipperLib.Clipper.SwapPolyIndexes(e1, e2);
    }
  }
  else if ((e1Wc === 0 || e1Wc == 1) &&
    (e2Wc === 0 || e2Wc == 1) && !e1stops && !e2stops)
  {
    //neither edge is currently contributing ...
    var e1Wc2, e2Wc2;
    switch (e1FillType2)
    {
    case ClipperLib.PolyFillType.pftPositive:
      e1Wc2 = e1.WindCnt2;
      break;
    case ClipperLib.PolyFillType.pftNegative:
      e1Wc2 = -e1.WindCnt2;
      break;
    default:
      e1Wc2 = Math.abs(e1.WindCnt2);
      break;
    }
    switch (e2FillType2)
    {
    case ClipperLib.PolyFillType.pftPositive:
      e2Wc2 = e2.WindCnt2;
      break;
    case ClipperLib.PolyFillType.pftNegative:
      e2Wc2 = -e2.WindCnt2;
      break;
    default:
      e2Wc2 = Math.abs(e2.WindCnt2);
      break;
    }
    if (e1.PolyTyp != e2.PolyTyp)
      this.AddLocalMinPoly(e1, e2, pt);
    else if (e1Wc == 1 && e2Wc == 1)
      switch (this.m_ClipType)
      {
      case ClipperLib.ClipType.ctIntersection:
        if (e1Wc2 > 0 && e2Wc2 > 0)
          this.AddLocalMinPoly(e1, e2, pt);
        break;
      case ClipperLib.ClipType.ctUnion:
        if (e1Wc2 <= 0 && e2Wc2 <= 0)
          this.AddLocalMinPoly(e1, e2, pt);
        break;
      case ClipperLib.ClipType.ctDifference:
        if (((e1.PolyTyp == ClipperLib.PolyType.ptClip) && (e1Wc2 > 0) && (e2Wc2 > 0)) ||
          ((e1.PolyTyp == ClipperLib.PolyType.ptSubject) && (e1Wc2 <= 0) && (e2Wc2 <= 0)))
          this.AddLocalMinPoly(e1, e2, pt);
        break;
      case ClipperLib.ClipType.ctXor:
        this.AddLocalMinPoly(e1, e2, pt);
        break;
      }
    else
      ClipperLib.Clipper.SwapSides(e1, e2);
  }
  if ((e1stops != e2stops) &&
    ((e1stops && (e1.OutIdx >= 0)) || (e2stops && (e2.OutIdx >= 0))))
  {
    ClipperLib.Clipper.SwapSides(e1, e2);
    ClipperLib.Clipper.SwapPolyIndexes(e1, e2);
  }
  //finally, delete any non-contributing maxima edges  ...
  if (e1stops)
    this.DeleteFromAEL(e1);
  if (e2stops)
    this.DeleteFromAEL(e2);
};
ClipperLib.Clipper.prototype.DeleteFromAEL = function (e)
{
  var AelPrev = e.PrevInAEL;
  var AelNext = e.NextInAEL;
  if (AelPrev === null && AelNext === null && (e != this.m_ActiveEdges))
    return;
  //already deleted
  if (AelPrev !== null)
    AelPrev.NextInAEL = AelNext;
  else
    this.m_ActiveEdges = AelNext;
  if (AelNext !== null)
    AelNext.PrevInAEL = AelPrev;
  e.NextInAEL = null;
  e.PrevInAEL = null;
};
ClipperLib.Clipper.prototype.DeleteFromSEL = function (e)
{
  var SelPrev = e.PrevInSEL;
  var SelNext = e.NextInSEL;
  if (SelPrev === null && SelNext === null && (e != this.m_SortedEdges))
    return;
  //already deleted
  if (SelPrev !== null)
    SelPrev.NextInSEL = SelNext;
  else
    this.m_SortedEdges = SelNext;
  if (SelNext !== null)
    SelNext.PrevInSEL = SelPrev;
  e.NextInSEL = null;
  e.PrevInSEL = null;
};
ClipperLib.Clipper.prototype.UpdateEdgeIntoAEL = function (e)
{
  if (e.NextInLML === null)
    ClipperLib.Error("UpdateEdgeIntoAEL: invalid call");
  var AelPrev = e.PrevInAEL;
  var AelNext = e.NextInAEL;
  e.NextInLML.OutIdx = e.OutIdx;
  if (AelPrev !== null)
    AelPrev.NextInAEL = e.NextInLML;
  else
    this.m_ActiveEdges = e.NextInLML;
  if (AelNext !== null)
    AelNext.PrevInAEL = e.NextInLML;
  e.NextInLML.Side = e.Side;
  e.NextInLML.WindDelta = e.WindDelta;
  e.NextInLML.WindCnt = e.WindCnt;
  e.NextInLML.WindCnt2 = e.WindCnt2;
  e = e.NextInLML;
  //    e.Curr = e.Bot;
  e.Curr.X = e.Bot.X;
  e.Curr.Y = e.Bot.Y;
  e.PrevInAEL = AelPrev;
  e.NextInAEL = AelNext;
  if (!ClipperLib.ClipperBase.IsHorizontal(e))
    this.InsertScanbeam(e.Top.Y);
  return e;
};
ClipperLib.Clipper.prototype.ProcessHorizontals = function (isTopOfScanbeam)
{
  var horzEdge = this.m_SortedEdges;
  while (horzEdge !== null)
  {
    this.DeleteFromSEL(horzEdge);
    this.ProcessHorizontal(horzEdge, isTopOfScanbeam);
    horzEdge = this.m_SortedEdges;
  }
};
ClipperLib.Clipper.prototype.GetHorzDirection = function (HorzEdge, $var)
{
  if (HorzEdge.Bot.X < HorzEdge.Top.X)
  {
      $var.Left = HorzEdge.Bot.X;
      $var.Right = HorzEdge.Top.X;
      $var.Dir = ClipperLib.Direction.dLeftToRight;
  }
  else
  {
      $var.Left = HorzEdge.Top.X;
      $var.Right = HorzEdge.Bot.X;
      $var.Dir = ClipperLib.Direction.dRightToLeft;
  }
};
ClipperLib.Clipper.prototype.PrepareHorzJoins = function (horzEdge, isTopOfScanbeam)
{
  //get the last Op for this horizontal edge
  //the point may be anywhere along the horizontal ...
  var outPt = this.m_PolyOuts[horzEdge.OutIdx].Pts;
  if (horzEdge.Side != ClipperLib.EdgeSide.esLeft)
    outPt = outPt.Prev;
  //First, match up overlapping horizontal edges (eg when one polygon's
  //intermediate horz edge overlaps an intermediate horz edge of another, or
  //when one polygon sits on top of another) ...
  //for (var i = 0, ilen = this.m_GhostJoins.length; i < ilen; ++i) {
  //  var j = this.m_GhostJoins[i];
  //  if (this.HorzSegmentsOverlap(j.OutPt1.Pt, j.OffPt, horzEdge.Bot, horzEdge.Top))
  //    this.AddJoin(j.OutPt1, outPt, j.OffPt);
  //}

  //Also, since horizontal edges at the top of one SB are often removed from
  //the AEL before we process the horizontal edges at the bottom of the next,
  //we need to create 'ghost' Join records of 'contrubuting' horizontals that
  //we can compare with horizontals at the bottom of the next SB.
  if (isTopOfScanbeam)
    if (ClipperLib.IntPoint.op_Equality(outPt.Pt, horzEdge.Top))
      this.AddGhostJoin(outPt, horzEdge.Bot);
    else
      this.AddGhostJoin(outPt, horzEdge.Top);
};
ClipperLib.Clipper.prototype.ProcessHorizontal = function (horzEdge, isTopOfScanbeam)
{
  var $var = {Dir: null, Left: null, Right: null};
  this.GetHorzDirection(horzEdge, $var);
  var dir = $var.Dir;
  var horzLeft = $var.Left;
  var horzRight = $var.Right;

  var eLastHorz = horzEdge,
    eMaxPair = null;
  while (eLastHorz.NextInLML !== null && ClipperLib.ClipperBase.IsHorizontal(eLastHorz.NextInLML))
    eLastHorz = eLastHorz.NextInLML;
  if (eLastHorz.NextInLML === null)
    eMaxPair = this.GetMaximaPair(eLastHorz);
  for (;;)
  {
    var IsLastHorz = (horzEdge == eLastHorz);
    var e = this.GetNextInAEL(horzEdge, dir);
    while (e !== null)
    {
      //Break if we've got to the end of an intermediate horizontal edge ...
      //nb: Smaller Dx's are to the right of larger Dx's ABOVE the horizontal.
      if (e.Curr.X == horzEdge.Top.X && horzEdge.NextInLML !== null && e.Dx < horzEdge.NextInLML.Dx)
        break;
      var eNext = this.GetNextInAEL(e, dir);
      //saves eNext for later
      if ((dir == ClipperLib.Direction.dLeftToRight && e.Curr.X <= horzRight) || (dir == ClipperLib.Direction.dRightToLeft && e.Curr.X >= horzLeft))
      {

        if (horzEdge.OutIdx >= 0 && horzEdge.WindDelta != 0)
          this.PrepareHorzJoins(horzEdge, isTopOfScanbeam);

        //so far we're still in range of the horizontal Edge  but make sure
        //we're at the last of consec. horizontals when matching with eMaxPair
        if (e == eMaxPair && IsLastHorz)
        {
          if (dir == ClipperLib.Direction.dLeftToRight)
            this.IntersectEdges(horzEdge, e, e.Top, false);
          else
            this.IntersectEdges(e, horzEdge, e.Top, false);
          if (eMaxPair.OutIdx >= 0)
            ClipperLib.Error("ProcessHorizontal error");
          return;
        }
        else if (dir == ClipperLib.Direction.dLeftToRight)
        {
          var Pt = new ClipperLib.IntPoint(e.Curr.X, horzEdge.Curr.Y);
          this.IntersectEdges(horzEdge, e, Pt, true);
        }
        else
        {
          var Pt = new ClipperLib.IntPoint(e.Curr.X, horzEdge.Curr.Y);
          this.IntersectEdges(e, horzEdge, Pt, true);
        }
        this.SwapPositionsInAEL(horzEdge, e);
      }
      else if ((dir == ClipperLib.Direction.dLeftToRight && e.Curr.X >= horzRight) || (dir == ClipperLib.Direction.dRightToLeft && e.Curr.X <= horzLeft))
        break;
      e = eNext;
    }
    //end while
    if (horzEdge.OutIdx >= 0 && horzEdge.WindDelta !== 0)
      this.PrepareHorzJoins(horzEdge, isTopOfScanbeam);
    if (horzEdge.NextInLML !== null && ClipperLib.ClipperBase.IsHorizontal(horzEdge.NextInLML))
    {
      horzEdge = this.UpdateEdgeIntoAEL(horzEdge);
      if (horzEdge.OutIdx >= 0)
        this.AddOutPt(horzEdge, horzEdge.Bot);
        
        var $var = {Dir: dir, Left: horzLeft, Right: horzRight};
        this.GetHorzDirection(horzEdge, $var);
        dir = $var.Dir;
        horzLeft = $var.Left;
        horzRight = $var.Right;
    }
    else
      break;
  }
  //end for (;;)
  if (horzEdge.NextInLML !== null)
  {
    if (horzEdge.OutIdx >= 0)
    {
      var op1 = this.AddOutPt(horzEdge, horzEdge.Top);
      horzEdge = this.UpdateEdgeIntoAEL(horzEdge);
      if (horzEdge.WindDelta === 0)
        return;
      //nb: HorzEdge is no longer horizontal here
      var ePrev = horzEdge.PrevInAEL;
      var eNext = horzEdge.NextInAEL;
      if (ePrev !== null && ePrev.Curr.X == horzEdge.Bot.X &&
        ePrev.Curr.Y == horzEdge.Bot.Y && ePrev.WindDelta !== 0 &&
        (ePrev.OutIdx >= 0 && ePrev.Curr.Y > ePrev.Top.Y &&
          ClipperLib.ClipperBase.SlopesEqual(horzEdge, ePrev, this.m_UseFullRange)))
      {
        var op2 = this.AddOutPt(ePrev, horzEdge.Bot);
        this.AddJoin(op1, op2, horzEdge.Top);
      }
      else if (eNext !== null && eNext.Curr.X == horzEdge.Bot.X &&
        eNext.Curr.Y == horzEdge.Bot.Y && eNext.WindDelta !== 0 &&
        eNext.OutIdx >= 0 && eNext.Curr.Y > eNext.Top.Y &&
        ClipperLib.ClipperBase.SlopesEqual(horzEdge, eNext, this.m_UseFullRange))
      {
        var op2 = this.AddOutPt(eNext, horzEdge.Bot);
        this.AddJoin(op1, op2, horzEdge.Top);
      }
    }
    else horzEdge = this.UpdateEdgeIntoAEL(horzEdge);
  }
  else if (eMaxPair !== null)
  {
    if (eMaxPair.OutIdx >= 0)
    {
      if (dir == ClipperLib.Direction.dLeftToRight)
        this.IntersectEdges(horzEdge, eMaxPair, horzEdge.Top, false);
      else
        this.IntersectEdges(eMaxPair, horzEdge, horzEdge.Top, false);
      if (eMaxPair.OutIdx >= 0)
        ClipperLib.Error("ProcessHorizontal error");
    }
    else
    {
      this.DeleteFromAEL(horzEdge);
      this.DeleteFromAEL(eMaxPair);
    }
  }
  else
  {
    if (horzEdge.OutIdx >= 0)
      this.AddOutPt(horzEdge, horzEdge.Top);
    this.DeleteFromAEL(horzEdge);
  }
};
ClipperLib.Clipper.prototype.GetNextInAEL = function (e, Direction)
{
  return Direction == ClipperLib.Direction.dLeftToRight ? e.NextInAEL : e.PrevInAEL;
};
ClipperLib.Clipper.prototype.IsMinima = function (e)
{
  return e !== null && (e.Prev.NextInLML != e) && (e.Next.NextInLML != e);
};
ClipperLib.Clipper.prototype.IsMaxima = function (e, Y)
{
  return (e !== null && e.Top.Y == Y && e.NextInLML === null);
};
ClipperLib.Clipper.prototype.IsIntermediate = function (e, Y)
{
  return (e.Top.Y == Y && e.NextInLML !== null);
};
ClipperLib.Clipper.prototype.GetMaximaPair = function (e)
{
  var result = null;
  if ((ClipperLib.IntPoint.op_Equality(e.Next.Top, e.Top)) && e.Next.NextInLML === null)
    result = e.Next;
  else if ((ClipperLib.IntPoint.op_Equality(e.Prev.Top, e.Top)) && e.Prev.NextInLML === null)
    result = e.Prev;
  if (result !== null && (result.OutIdx == -2 || (result.NextInAEL == result.PrevInAEL && !ClipperLib.ClipperBase.IsHorizontal(result))))
    return null;
  return result;
};
ClipperLib.Clipper.prototype.ProcessIntersections = function (botY, topY)
{
  if (this.m_ActiveEdges == null)
    return true;
  try
  {
    this.BuildIntersectList(botY, topY);
    if (this.m_IntersectList.length == 0)
      return true;
    if (this.m_IntersectList.length == 1 || this.FixupIntersectionOrder())
      this.ProcessIntersectList();
    else
      return false;
  }
  catch ($$e2)
  {
    this.m_SortedEdges = null;
    this.m_IntersectList.length = 0;
    ClipperLib.Error("ProcessIntersections error");
  }
  this.m_SortedEdges = null;
  return true;
};
ClipperLib.Clipper.prototype.BuildIntersectList = function (botY, topY)
{
  if (this.m_ActiveEdges === null)
    return;
  //prepare for sorting ...
  var e = this.m_ActiveEdges;
  //console.log(JSON.stringify(JSON.decycle( e )));
  this.m_SortedEdges = e;
  while (e !== null)
  {
    e.PrevInSEL = e.PrevInAEL;
    e.NextInSEL = e.NextInAEL;
    e.Curr.X = ClipperLib.Clipper.TopX(e, topY);
    e = e.NextInAEL;
  }
  //bubblesort ...
  var isModified = true;
  while (isModified && this.m_SortedEdges !== null)
  {
    isModified = false;
    e = this.m_SortedEdges;
    while (e.NextInSEL !== null)
    {
      var eNext = e.NextInSEL;
      var pt = new ClipperLib.IntPoint();
      //console.log("e.Curr.X: " + e.Curr.X + " eNext.Curr.X" + eNext.Curr.X);
      if (e.Curr.X > eNext.Curr.X)
      {
        if (!this.IntersectPoint(e, eNext, pt) && e.Curr.X > eNext.Curr.X + 1)
        {
          //console.log("e.Curr.X: "+JSON.stringify(JSON.decycle( e.Curr.X )));
          //console.log("eNext.Curr.X+1: "+JSON.stringify(JSON.decycle( eNext.Curr.X+1)));
          ClipperLib.Error("Intersection error");
        }
        if (pt.Y > botY)
        {
          pt.Y = botY;
          if (Math.abs(e.Dx) > Math.abs(eNext.Dx))
            pt.X = ClipperLib.Clipper.TopX(eNext, botY);
          else
            pt.X = ClipperLib.Clipper.TopX(e, botY);
        }
        var newNode = new ClipperLib.IntersectNode();
        newNode.Edge1 = e;
        newNode.Edge2 = eNext;
        //newNode.Pt = pt;
        newNode.Pt.X = pt.X;
        newNode.Pt.Y = pt.Y;
        this.m_IntersectList.push(newNode);
        this.SwapPositionsInSEL(e, eNext);
        isModified = true;
      }
      else
        e = eNext;
    }
    if (e.PrevInSEL !== null)
      e.PrevInSEL.NextInSEL = null;
    else
      break;
  }
  this.m_SortedEdges = null;
};
ClipperLib.Clipper.prototype.EdgesAdjacent = function (inode)
{
  return (inode.Edge1.NextInSEL == inode.Edge2) || (inode.Edge1.PrevInSEL == inode.Edge2);
};
ClipperLib.Clipper.IntersectNodeSort = function (node1, node2)
{
  //the following typecast is safe because the differences in Pt.Y will
  //be limited to the height of the scanbeam.
  return (node2.Pt.Y - node1.Pt.Y);
};
ClipperLib.Clipper.prototype.FixupIntersectionOrder = function ()
{
  //pre-condition: intersections are sorted bottom-most first.
  //Now it's crucial that intersections are made only between adjacent edges,
  //so to ensure this the order of intersections may need adjusting ...
  this.m_IntersectList.sort(this.m_IntersectNodeComparer);
  this.CopyAELToSEL();
  var cnt = this.m_IntersectList.length;
  for (var i = 0; i < cnt; i++)
  {
    if (!this.EdgesAdjacent(this.m_IntersectList[i]))
    {
      var j = i + 1;
      while (j < cnt && !this.EdgesAdjacent(this.m_IntersectList[j]))
        j++;
      if (j == cnt)
        return false;
      var tmp = this.m_IntersectList[i];
      this.m_IntersectList[i] = this.m_IntersectList[j];
      this.m_IntersectList[j] = tmp;
    }
    this.SwapPositionsInSEL(this.m_IntersectList[i].Edge1, this.m_IntersectList[i].Edge2);
  }
  return true;
};
ClipperLib.Clipper.prototype.ProcessIntersectList = function ()
{
  for (var i = 0, ilen = this.m_IntersectList.length; i < ilen; i++)
  {
    var iNode = this.m_IntersectList[i];
    this.IntersectEdges(iNode.Edge1, iNode.Edge2, iNode.Pt, true);
    this.SwapPositionsInAEL(iNode.Edge1, iNode.Edge2);
  }
  this.m_IntersectList.length = 0;
};
/*
--------------------------------
Round speedtest: http://jsperf.com/fastest-round
--------------------------------
*/
var R1 = function (a)
{
  return a < 0 ? Math.ceil(a - 0.5) : Math.round(a)
};
var R2 = function (a)
{
  return a < 0 ? Math.ceil(a - 0.5) : Math.floor(a + 0.5)
};
var R3 = function (a)
{
  return a < 0 ? -Math.round(Math.abs(a)) : Math.round(a)
};
var R4 = function (a)
{
  if (a < 0)
  {
    a -= 0.5;
    return a < -2147483648 ? Math.ceil(a) : a | 0;
  }
  else
  {
    a += 0.5;
    return a > 2147483647 ? Math.floor(a) : a | 0;
  }
};
if (browser.msie) ClipperLib.Clipper.Round = R1;
else if (browser.chromium) ClipperLib.Clipper.Round = R3;
else if (browser.safari) ClipperLib.Clipper.Round = R4;
else ClipperLib.Clipper.Round = R2; // eg. browser.chrome || browser.firefox || browser.opera
ClipperLib.Clipper.TopX = function (edge, currentY)
{
  //if (edge.Bot == edge.Curr) alert ("edge.Bot = edge.Curr");
  //if (edge.Bot == edge.Top) alert ("edge.Bot = edge.Top");
  if (currentY == edge.Top.Y)
    return edge.Top.X;
  return edge.Bot.X + ClipperLib.Clipper.Round(edge.Dx * (currentY - edge.Bot.Y));
};
ClipperLib.Clipper.prototype.IntersectPoint = function (edge1, edge2, ip)
{
  ip.X = 0;
  ip.Y = 0;
  var b1, b2;
  //nb: with very large coordinate values, it's possible for SlopesEqual() to 
  //return false but for the edge.Dx value be equal due to double precision rounding.
  if (ClipperLib.ClipperBase.SlopesEqual(edge1, edge2, this.m_UseFullRange) || edge1.Dx == edge2.Dx)
  {
    if (edge2.Bot.Y > edge1.Bot.Y)
    {
      ip.X = edge2.Bot.X;
      ip.Y = edge2.Bot.Y;
    }
    else
    {
      ip.X = edge1.Bot.X;
      ip.Y = edge1.Bot.Y;
    }
    return false;
  }
  else if (edge1.Delta.X === 0)
  {
    ip.X = edge1.Bot.X;
    if (ClipperLib.ClipperBase.IsHorizontal(edge2))
    {
      ip.Y = edge2.Bot.Y;
    }
    else
    {
      b2 = edge2.Bot.Y - (edge2.Bot.X / edge2.Dx);
      ip.Y = ClipperLib.Clipper.Round(ip.X / edge2.Dx + b2);
    }
  }
  else if (edge2.Delta.X === 0)
  {
    ip.X = edge2.Bot.X;
    if (ClipperLib.ClipperBase.IsHorizontal(edge1))
    {
      ip.Y = edge1.Bot.Y;
    }
    else
    {
      b1 = edge1.Bot.Y - (edge1.Bot.X / edge1.Dx);
      ip.Y = ClipperLib.Clipper.Round(ip.X / edge1.Dx + b1);
    }
  }
  else
  {
    b1 = edge1.Bot.X - edge1.Bot.Y * edge1.Dx;
    b2 = edge2.Bot.X - edge2.Bot.Y * edge2.Dx;
    var q = (b2 - b1) / (edge1.Dx - edge2.Dx);
    ip.Y = ClipperLib.Clipper.Round(q);
    if (Math.abs(edge1.Dx) < Math.abs(edge2.Dx))
      ip.X = ClipperLib.Clipper.Round(edge1.Dx * q + b1);
    else
      ip.X = ClipperLib.Clipper.Round(edge2.Dx * q + b2);
  }
  if (ip.Y < edge1.Top.Y || ip.Y < edge2.Top.Y)
  {
    if (edge1.Top.Y > edge2.Top.Y)
    {
      ip.Y = edge1.Top.Y;
      ip.X = ClipperLib.Clipper.TopX(edge2, edge1.Top.Y);
      return ip.X < edge1.Top.X;
    }
    else
      ip.Y = edge2.Top.Y;
    if (Math.abs(edge1.Dx) < Math.abs(edge2.Dx))
      ip.X = ClipperLib.Clipper.TopX(edge1, ip.Y);
    else
      ip.X = ClipperLib.Clipper.TopX(edge2, ip.Y);
  }
  return true;
};
ClipperLib.Clipper.prototype.ProcessEdgesAtTopOfScanbeam = function (topY)
{
  var e = this.m_ActiveEdges;
  while (e !== null)
  {
    //1. process maxima, treating them as if they're 'bent' horizontal edges,
    //   but exclude maxima with horizontal edges. nb: e can't be a horizontal.
    var IsMaximaEdge = this.IsMaxima(e, topY);
    if (IsMaximaEdge)
    {
      var eMaxPair = this.GetMaximaPair(e);
      IsMaximaEdge = (eMaxPair === null || !ClipperLib.ClipperBase.IsHorizontal(eMaxPair));
    }
    if (IsMaximaEdge)
    {
      var ePrev = e.PrevInAEL;
      this.DoMaxima(e);
      if (ePrev === null)
        e = this.m_ActiveEdges;
      else
        e = ePrev.NextInAEL;
    }
    else
    {
      //2. promote horizontal edges, otherwise update Curr.X and Curr.Y ...
      if (this.IsIntermediate(e, topY) && ClipperLib.ClipperBase.IsHorizontal(e.NextInLML))
      {
        e = this.UpdateEdgeIntoAEL(e);
        if (e.OutIdx >= 0)
          this.AddOutPt(e, e.Bot);
        this.AddEdgeToSEL(e);
      }
      else
      {
        e.Curr.X = ClipperLib.Clipper.TopX(e, topY);
        e.Curr.Y = topY;
      }
      if (this.StrictlySimple)
      {
        var ePrev = e.PrevInAEL;
        if ((e.OutIdx >= 0) && (e.WindDelta !== 0) && ePrev !== null &&
          (ePrev.OutIdx >= 0) && (ePrev.Curr.X == e.Curr.X) &&
          (ePrev.WindDelta !== 0))
        {
          var op = this.AddOutPt(ePrev, e.Curr);
          var op2 = this.AddOutPt(e, e.Curr);
          this.AddJoin(op, op2, e.Curr);
          //StrictlySimple (type-3) join
        }
      }
      e = e.NextInAEL;
    }
  }
  //3. Process horizontals at the Top of the scanbeam ...
  this.ProcessHorizontals(true);
  //4. Promote intermediate vertices ...
  e = this.m_ActiveEdges;
  while (e !== null)
  {
    if (this.IsIntermediate(e, topY))
    {
      var op = null;
      if (e.OutIdx >= 0)
        op = this.AddOutPt(e, e.Top);
      e = this.UpdateEdgeIntoAEL(e);
      //if output polygons share an edge, they'll need joining later ...
      var ePrev = e.PrevInAEL;
      var eNext = e.NextInAEL;
      if (ePrev !== null && ePrev.Curr.X == e.Bot.X &&
        ePrev.Curr.Y == e.Bot.Y && op !== null &&
        ePrev.OutIdx >= 0 && ePrev.Curr.Y > ePrev.Top.Y &&
        ClipperLib.ClipperBase.SlopesEqual(e, ePrev, this.m_UseFullRange) &&
        (e.WindDelta !== 0) && (ePrev.WindDelta !== 0))
      {
        var op2 = this.AddOutPt(ePrev, e.Bot);
        this.AddJoin(op, op2, e.Top);
      }
      else if (eNext !== null && eNext.Curr.X == e.Bot.X &&
        eNext.Curr.Y == e.Bot.Y && op !== null &&
        eNext.OutIdx >= 0 && eNext.Curr.Y > eNext.Top.Y &&
        ClipperLib.ClipperBase.SlopesEqual(e, eNext, this.m_UseFullRange) &&
        (e.WindDelta !== 0) && (eNext.WindDelta !== 0))
      {
        var op2 = this.AddOutPt(eNext, e.Bot);
        this.AddJoin(op, op2, e.Top);
      }
    }
    e = e.NextInAEL;
  }
};
ClipperLib.Clipper.prototype.DoMaxima = function (e)
{
  var eMaxPair = this.GetMaximaPair(e);
  if (eMaxPair === null)
  {
    if (e.OutIdx >= 0)
      this.AddOutPt(e, e.Top);
    this.DeleteFromAEL(e);
    return;
  }
  var eNext = e.NextInAEL;
  var use_lines = true;
  while (eNext !== null && eNext != eMaxPair)
  {
    this.IntersectEdges(e, eNext, e.Top, true);
    this.SwapPositionsInAEL(e, eNext);
    eNext = e.NextInAEL;
  }
  if (e.OutIdx == -1 && eMaxPair.OutIdx == -1)
  {
    this.DeleteFromAEL(e);
    this.DeleteFromAEL(eMaxPair);
  }
  else if (e.OutIdx >= 0 && eMaxPair.OutIdx >= 0)
  {
    this.IntersectEdges(e, eMaxPair, e.Top, false);
  }
  else if (use_lines && e.WindDelta === 0)
  {
    if (e.OutIdx >= 0)
    {
      this.AddOutPt(e, e.Top);
      e.OutIdx = -1;
    }
    this.DeleteFromAEL(e);
    if (eMaxPair.OutIdx >= 0)
    {
      this.AddOutPt(eMaxPair, e.Top);
      eMaxPair.OutIdx = -1;
    }
    this.DeleteFromAEL(eMaxPair);
  }
  else
    ClipperLib.Error("DoMaxima error");
};
ClipperLib.Clipper.ReversePaths = function (polys)
{
  for (var i = 0, len = polys.length; i < len; i++)
    polys[i].reverse();
};
ClipperLib.Clipper.Orientation = function (poly)
{
  return ClipperLib.Clipper.Area(poly) >= 0;
};
ClipperLib.Clipper.prototype.PointCount = function (pts)
{
  if (pts === null)
    return 0;
  var result = 0;
  var p = pts;
  do {
    result++;
    p = p.Next;
  }
  while (p != pts)
  return result;
};
ClipperLib.Clipper.prototype.BuildResult = function (polyg)
{
  ClipperLib.Clear(polyg);
  for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++)
  {
    var outRec = this.m_PolyOuts[i];
    if (outRec.Pts === null)
      continue;
    var p = outRec.Pts.Prev;
    var cnt = this.PointCount(p);
    if (cnt < 2)
      continue;
    var pg = new Array(cnt);
    for (var j = 0; j < cnt; j++)
    {
      pg[j] = p.Pt;
      p = p.Prev;
    }
    polyg.push(pg);
  }
};
ClipperLib.Clipper.prototype.BuildResult2 = function (polytree)
{
  polytree.Clear();
  //add each output polygon/contour to polytree ...
  //polytree.m_AllPolys.set_Capacity(this.m_PolyOuts.length);
  for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++)
  {
    var outRec = this.m_PolyOuts[i];
    var cnt = this.PointCount(outRec.Pts);
    if ((outRec.IsOpen && cnt < 2) || (!outRec.IsOpen && cnt < 3))
      continue;
    this.FixHoleLinkage(outRec);
    var pn = new ClipperLib.PolyNode();
    polytree.m_AllPolys.push(pn);
    outRec.PolyNode = pn;
    pn.m_polygon.length = cnt;
    var op = outRec.Pts.Prev;
    for (var j = 0; j < cnt; j++)
    {
      pn.m_polygon[j] = op.Pt;
      op = op.Prev;
    }
  }
  //fixup PolyNode links etc ...
  //polytree.m_Childs.set_Capacity(this.m_PolyOuts.length);
  for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++)
  {
    var outRec = this.m_PolyOuts[i];
    if (outRec.PolyNode === null)
      continue;
    else if (outRec.IsOpen)
    {
      outRec.PolyNode.IsOpen = true;
      polytree.AddChild(outRec.PolyNode);
    }
    else if (outRec.FirstLeft !== null && outRec.FirstLeft.PolyNode != null)
      outRec.FirstLeft.PolyNode.AddChild(outRec.PolyNode);
    else
      polytree.AddChild(outRec.PolyNode);
  }
};
ClipperLib.Clipper.prototype.FixupOutPolygon = function (outRec)
{
  //FixupOutPolygon() - removes duplicate points and simplifies consecutive
  //parallel edges by removing the middle vertex.
  var lastOK = null;
  outRec.BottomPt = null;
  var pp = outRec.Pts;
  for (;;)
  {
    if (pp.Prev == pp || pp.Prev == pp.Next)
    {
      this.DisposeOutPts(pp);
      outRec.Pts = null;
      return;
    }
    //test for duplicate points and collinear edges ...
    if ((ClipperLib.IntPoint.op_Equality(pp.Pt, pp.Next.Pt)) || (ClipperLib.IntPoint.op_Equality(pp.Pt, pp.Prev.Pt)) ||
      (ClipperLib.ClipperBase.SlopesEqual(pp.Prev.Pt, pp.Pt, pp.Next.Pt, this.m_UseFullRange) &&
        (!this.PreserveCollinear || !this.Pt2IsBetweenPt1AndPt3(pp.Prev.Pt, pp.Pt, pp.Next.Pt))))
    {
      lastOK = null;
      var tmp = pp;
      pp.Prev.Next = pp.Next;
      pp.Next.Prev = pp.Prev;
      pp = pp.Prev;
      tmp = null;
    }
    else if (pp == lastOK)
      break;
    else
    {
      if (lastOK === null)
        lastOK = pp;
      pp = pp.Next;
    }
  }
  outRec.Pts = pp;
};
ClipperLib.Clipper.prototype.DupOutPt = function (outPt, InsertAfter)
{
  var result = new ClipperLib.OutPt();
  //result.Pt = outPt.Pt;
  result.Pt.X = outPt.Pt.X;
  result.Pt.Y = outPt.Pt.Y;
  result.Idx = outPt.Idx;
  if (InsertAfter)
  {
    result.Next = outPt.Next;
    result.Prev = outPt;
    outPt.Next.Prev = result;
    outPt.Next = result;
  }
  else
  {
    result.Prev = outPt.Prev;
    result.Next = outPt;
    outPt.Prev.Next = result;
    outPt.Prev = result;
  }
  return result;
};
ClipperLib.Clipper.prototype.GetOverlap = function (a1, a2, b1, b2, $val)
{
  if (a1 < a2)
  {
    if (b1 < b2)
    {
      $val.Left = Math.max(a1, b1);
      $val.Right = Math.min(a2, b2);
    }
    else
    {
      $val.Left = Math.max(a1, b2);
      $val.Right = Math.min(a2, b1);
    }
  }
  else
  {
    if (b1 < b2)
    {
      $val.Left = Math.max(a2, b1);
      $val.Right = Math.min(a1, b2);
    }
    else
    {
      $val.Left = Math.max(a2, b2);
      $val.Right = Math.min(a1, b1);
    }
  }
  return $val.Left < $val.Right;
};
ClipperLib.Clipper.prototype.JoinHorz = function (op1, op1b, op2, op2b, Pt, DiscardLeft)
{
  var Dir1 = (op1.Pt.X > op1b.Pt.X ? ClipperLib.Direction.dRightToLeft : ClipperLib.Direction.dLeftToRight);
  var Dir2 = (op2.Pt.X > op2b.Pt.X ? ClipperLib.Direction.dRightToLeft : ClipperLib.Direction.dLeftToRight);
  if (Dir1 == Dir2)
    return false;
  //When DiscardLeft, we want Op1b to be on the Left of Op1, otherwise we
  //want Op1b to be on the Right. (And likewise with Op2 and Op2b.)
  //So, to facilitate this while inserting Op1b and Op2b ...
  //when DiscardLeft, make sure we're AT or RIGHT of Pt before adding Op1b,
  //otherwise make sure we're AT or LEFT of Pt. (Likewise with Op2b.)
  if (Dir1 == ClipperLib.Direction.dLeftToRight)
  {
    while (op1.Next.Pt.X <= Pt.X &&
      op1.Next.Pt.X >= op1.Pt.X && op1.Next.Pt.Y == Pt.Y)
      op1 = op1.Next;
    if (DiscardLeft && (op1.Pt.X != Pt.X))
      op1 = op1.Next;
    op1b = this.DupOutPt(op1, !DiscardLeft);
    if (ClipperLib.IntPoint.op_Inequality(op1b.Pt, Pt))
    {
      op1 = op1b;
      //op1.Pt = Pt;
      op1.Pt.X = Pt.X;
      op1.Pt.Y = Pt.Y;
      op1b = this.DupOutPt(op1, !DiscardLeft);
    }
  }
  else
  {
    while (op1.Next.Pt.X >= Pt.X &&
      op1.Next.Pt.X <= op1.Pt.X && op1.Next.Pt.Y == Pt.Y)
      op1 = op1.Next;
    if (!DiscardLeft && (op1.Pt.X != Pt.X))
      op1 = op1.Next;
    op1b = this.DupOutPt(op1, DiscardLeft);
    if (ClipperLib.IntPoint.op_Inequality(op1b.Pt, Pt))
    {
      op1 = op1b;
      //op1.Pt = Pt;
      op1.Pt.X = Pt.X;
      op1.Pt.Y = Pt.Y;
      op1b = this.DupOutPt(op1, DiscardLeft);
    }
  }
  if (Dir2 == ClipperLib.Direction.dLeftToRight)
  {
    while (op2.Next.Pt.X <= Pt.X &&
      op2.Next.Pt.X >= op2.Pt.X && op2.Next.Pt.Y == Pt.Y)
      op2 = op2.Next;
    if (DiscardLeft && (op2.Pt.X != Pt.X))
      op2 = op2.Next;
    op2b = this.DupOutPt(op2, !DiscardLeft);
    if (ClipperLib.IntPoint.op_Inequality(op2b.Pt, Pt))
    {
      op2 = op2b;
      //op2.Pt = Pt;
      op2.Pt.X = Pt.X;
      op2.Pt.Y = Pt.Y;
      op2b = this.DupOutPt(op2, !DiscardLeft);
    }
  }
  else
  {
    while (op2.Next.Pt.X >= Pt.X &&
      op2.Next.Pt.X <= op2.Pt.X && op2.Next.Pt.Y == Pt.Y)
      op2 = op2.Next;
    if (!DiscardLeft && (op2.Pt.X != Pt.X))
      op2 = op2.Next;
    op2b = this.DupOutPt(op2, DiscardLeft);
    if (ClipperLib.IntPoint.op_Inequality(op2b.Pt, Pt))
    {
      op2 = op2b;
      //op2.Pt = Pt;
      op2.Pt.X = Pt.X;
      op2.Pt.Y = Pt.Y;
      op2b = this.DupOutPt(op2, DiscardLeft);
    }
  }
  if ((Dir1 == ClipperLib.Direction.dLeftToRight) == DiscardLeft)
  {
    op1.Prev = op2;
    op2.Next = op1;
    op1b.Next = op2b;
    op2b.Prev = op1b;
  }
  else
  {
    op1.Next = op2;
    op2.Prev = op1;
    op1b.Prev = op2b;
    op2b.Next = op1b;
  }
  return true;
};
ClipperLib.Clipper.prototype.JoinPoints = function (j, outRec1, outRec2)
{
  var op1 = j.OutPt1,
    op1b = new ClipperLib.OutPt();
  var op2 = j.OutPt2,
    op2b = new ClipperLib.OutPt();
  //There are 3 kinds of joins for output polygons ...
  //1. Horizontal joins where Join.OutPt1 & Join.OutPt2 are a vertices anywhere
  //along (horizontal) collinear edges (& Join.OffPt is on the same horizontal).
  //2. Non-horizontal joins where Join.OutPt1 & Join.OutPt2 are at the same
  //location at the Bottom of the overlapping segment (& Join.OffPt is above).
  //3. StrictlySimple joins where edges touch but are not collinear and where
  //Join.OutPt1, Join.OutPt2 & Join.OffPt all share the same point.
  var isHorizontal = (j.OutPt1.Pt.Y == j.OffPt.Y);
  if (isHorizontal && (ClipperLib.IntPoint.op_Equality(j.OffPt, j.OutPt1.Pt)) && (ClipperLib.IntPoint.op_Equality(j.OffPt, j.OutPt2.Pt)))
  {
    //Strictly Simple join ...
    op1b = j.OutPt1.Next;
    while (op1b != op1 && (ClipperLib.IntPoint.op_Equality(op1b.Pt, j.OffPt)))
      op1b = op1b.Next;
    var reverse1 = (op1b.Pt.Y > j.OffPt.Y);
    op2b = j.OutPt2.Next;
    while (op2b != op2 && (ClipperLib.IntPoint.op_Equality(op2b.Pt, j.OffPt)))
      op2b = op2b.Next;
    var reverse2 = (op2b.Pt.Y > j.OffPt.Y);
    if (reverse1 == reverse2)
      return false;
    if (reverse1)
    {
      op1b = this.DupOutPt(op1, false);
      op2b = this.DupOutPt(op2, true);
      op1.Prev = op2;
      op2.Next = op1;
      op1b.Next = op2b;
      op2b.Prev = op1b;
      j.OutPt1 = op1;
      j.OutPt2 = op1b;
      return true;
    }
    else
    {
      op1b = this.DupOutPt(op1, true);
      op2b = this.DupOutPt(op2, false);
      op1.Next = op2;
      op2.Prev = op1;
      op1b.Prev = op2b;
      op2b.Next = op1b;
      j.OutPt1 = op1;
      j.OutPt2 = op1b;
      return true;
    }
  }
  else if (isHorizontal)
  {
    //treat horizontal joins differently to non-horizontal joins since with
    //them we're not yet sure where the overlapping is. OutPt1.Pt & OutPt2.Pt
    //may be anywhere along the horizontal edge.
    op1b = op1;
    while (op1.Prev.Pt.Y == op1.Pt.Y && op1.Prev != op1b && op1.Prev != op2)
      op1 = op1.Prev;
    while (op1b.Next.Pt.Y == op1b.Pt.Y && op1b.Next != op1 && op1b.Next != op2)
      op1b = op1b.Next;
    if (op1b.Next == op1 || op1b.Next == op2)
      return false;
    //a flat 'polygon'
    op2b = op2;
    while (op2.Prev.Pt.Y == op2.Pt.Y && op2.Prev != op2b && op2.Prev != op1b)
      op2 = op2.Prev;
    while (op2b.Next.Pt.Y == op2b.Pt.Y && op2b.Next != op2 && op2b.Next != op1)
      op2b = op2b.Next;
    if (op2b.Next == op2 || op2b.Next == op1)
      return false;
    //a flat 'polygon'
    //Op1 -. Op1b & Op2 -. Op2b are the extremites of the horizontal edges

    var $val = {Left: null, Right: null};
    if (!this.GetOverlap(op1.Pt.X, op1b.Pt.X, op2.Pt.X, op2b.Pt.X, $val))
      return false;
    var Left = $val.Left;
    var Right = $val.Right;

    //DiscardLeftSide: when overlapping edges are joined, a spike will created
    //which needs to be cleaned up. However, we don't want Op1 or Op2 caught up
    //on the discard Side as either may still be needed for other joins ...
    var Pt = new ClipperLib.IntPoint();
    var DiscardLeftSide;
    if (op1.Pt.X >= Left && op1.Pt.X <= Right)
    {
      //Pt = op1.Pt;
      Pt.X = op1.Pt.X;
      Pt.Y = op1.Pt.Y;
      DiscardLeftSide = (op1.Pt.X > op1b.Pt.X);
    }
    else if (op2.Pt.X >= Left && op2.Pt.X <= Right)
    {
      //Pt = op2.Pt;
      Pt.X = op2.Pt.X;
      Pt.Y = op2.Pt.Y;
      DiscardLeftSide = (op2.Pt.X > op2b.Pt.X);
    }
    else if (op1b.Pt.X >= Left && op1b.Pt.X <= Right)
    {
      //Pt = op1b.Pt;
      Pt.X = op1b.Pt.X;
      Pt.Y = op1b.Pt.Y;
      DiscardLeftSide = op1b.Pt.X > op1.Pt.X;
    }
    else
    {
      //Pt = op2b.Pt;
      Pt.X = op2b.Pt.X;
      Pt.Y = op2b.Pt.Y;
      DiscardLeftSide = (op2b.Pt.X > op2.Pt.X);
    }
    j.OutPt1 = op1;
    j.OutPt2 = op2;
    return this.JoinHorz(op1, op1b, op2, op2b, Pt, DiscardLeftSide);
  }
  else
  {
    //nb: For non-horizontal joins ...
    //    1. Jr.OutPt1.Pt.Y == Jr.OutPt2.Pt.Y
    //    2. Jr.OutPt1.Pt > Jr.OffPt.Y
    //make sure the polygons are correctly oriented ...
    op1b = op1.Next;
    while ((ClipperLib.IntPoint.op_Equality(op1b.Pt, op1.Pt)) && (op1b != op1))
      op1b = op1b.Next;
    var Reverse1 = ((op1b.Pt.Y > op1.Pt.Y) || !ClipperLib.ClipperBase.SlopesEqual(op1.Pt, op1b.Pt, j.OffPt, this.m_UseFullRange));
    if (Reverse1)
    {
      op1b = op1.Prev;
      while ((ClipperLib.IntPoint.op_Equality(op1b.Pt, op1.Pt)) && (op1b != op1))
        op1b = op1b.Prev;
      if ((op1b.Pt.Y > op1.Pt.Y) || !ClipperLib.ClipperBase.SlopesEqual(op1.Pt, op1b.Pt, j.OffPt, this.m_UseFullRange))
        return false;
    }
    op2b = op2.Next;
    while ((ClipperLib.IntPoint.op_Equality(op2b.Pt, op2.Pt)) && (op2b != op2))
      op2b = op2b.Next;
    var Reverse2 = ((op2b.Pt.Y > op2.Pt.Y) || !ClipperLib.ClipperBase.SlopesEqual(op2.Pt, op2b.Pt, j.OffPt, this.m_UseFullRange));
    if (Reverse2)
    {
      op2b = op2.Prev;
      while ((ClipperLib.IntPoint.op_Equality(op2b.Pt, op2.Pt)) && (op2b != op2))
        op2b = op2b.Prev;
      if ((op2b.Pt.Y > op2.Pt.Y) || !ClipperLib.ClipperBase.SlopesEqual(op2.Pt, op2b.Pt, j.OffPt, this.m_UseFullRange))
        return false;
    }
    if ((op1b == op1) || (op2b == op2) || (op1b == op2b) ||
      ((outRec1 == outRec2) && (Reverse1 == Reverse2)))
      return false;
    if (Reverse1)
    {
      op1b = this.DupOutPt(op1, false);
      op2b = this.DupOutPt(op2, true);
      op1.Prev = op2;
      op2.Next = op1;
      op1b.Next = op2b;
      op2b.Prev = op1b;
      j.OutPt1 = op1;
      j.OutPt2 = op1b;
      return true;
    }
    else
    {
      op1b = this.DupOutPt(op1, true);
      op2b = this.DupOutPt(op2, false);
      op1.Next = op2;
      op2.Prev = op1;
      op1b.Prev = op2b;
      op2b.Next = op1b;
      j.OutPt1 = op1;
      j.OutPt2 = op1b;
      return true;
    }
  }
};
ClipperLib.Clipper.GetBounds = function (paths)
{
  var i = 0,
    cnt = paths.length;
  while (i < cnt && paths[i].length == 0) i++;
  if (i == cnt) return new ClipperLib.IntRect(0, 0, 0, 0);
  var result = new ClipperLib.IntRect();
  result.left = paths[i][0].X;
  result.right = result.left;
  result.top = paths[i][0].Y;
  result.bottom = result.top;
  for (; i < cnt; i++)
    for (var j = 0, jlen = paths[i].length; j < jlen; j++)
    {
      if (paths[i][j].X < result.left) result.left = paths[i][j].X;
      else if (paths[i][j].X > result.right) result.right = paths[i][j].X;
      if (paths[i][j].Y < result.top) result.top = paths[i][j].Y;
      else if (paths[i][j].Y > result.bottom) result.bottom = paths[i][j].Y;
    }
  return result;
}
ClipperLib.Clipper.prototype.GetBounds2 = function (ops)
{
  var opStart = ops;
  var result = new ClipperLib.IntRect();
  result.left = ops.Pt.X;
  result.right = ops.Pt.X;
  result.top = ops.Pt.Y;
  result.bottom = ops.Pt.Y;
  ops = ops.Next;
  while (ops != opStart)
  {
    if (ops.Pt.X < result.left)
      result.left = ops.Pt.X;
    if (ops.Pt.X > result.right)
      result.right = ops.Pt.X;
    if (ops.Pt.Y < result.top)
      result.top = ops.Pt.Y;
    if (ops.Pt.Y > result.bottom)
      result.bottom = ops.Pt.Y;
    ops = ops.Next;
  }
  return result;
};

ClipperLib.Clipper.PointInPolygon = function (pt, path)
{
  //returns 0 if false, +1 if true, -1 if pt ON polygon boundary
  //http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.88.5498&rep=rep1&type=pdf
  var result = 0,
    cnt = path.length;
  if (cnt < 3)
    return 0;
  var ip = path[0];
  for (var i = 1; i <= cnt; ++i)
  {
    var ipNext = (i == cnt ? path[0] : path[i]);
    if (ipNext.Y == pt.Y)
    {
      if ((ipNext.X == pt.X) || (ip.Y == pt.Y && ((ipNext.X > pt.X) == (ip.X < pt.X))))
        return -1;
    }
    if ((ip.Y < pt.Y) != (ipNext.Y < pt.Y))
    {
      if (ip.X >= pt.X)
      {
        if (ipNext.X > pt.X)
          result = 1 - result;
        else
        {
          var d = (ip.X - pt.X) * (ipNext.Y - pt.Y) - (ipNext.X - pt.X) * (ip.Y - pt.Y);
          if (d == 0)
            return -1;
          else if ((d > 0) == (ipNext.Y > ip.Y))
            result = 1 - result;
        }
      }
      else
      {
        if (ipNext.X > pt.X)
        {
          var d = (ip.X - pt.X) * (ipNext.Y - pt.Y) - (ipNext.X - pt.X) * (ip.Y - pt.Y);
          if (d == 0)
            return -1;
          else if ((d > 0) == (ipNext.Y > ip.Y))
            result = 1 - result;
        }
      }
    }
    ip = ipNext;
  }
  return result;
};
    
ClipperLib.Clipper.prototype.PointInPolygon = function (pt, op)
{
  //returns 0 if false, +1 if true, -1 if pt ON polygon boundary
  //http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.88.5498&rep=rep1&type=pdf
  var result = 0;
  var startOp = op;
  for (;;)
  {
    var poly0x = op.Pt.X,
      poly0y = op.Pt.Y;
    var poly1x = op.Next.Pt.X,
      poly1y = op.Next.Pt.Y;
    if (poly1y == pt.Y)
    {
      if ((poly1x == pt.X) || (poly0y == pt.Y && ((poly1x > pt.X) == (poly0x < pt.X))))
        return -1;
    }
    if ((poly0y < pt.Y) != (poly1y < pt.Y))
    {
      if (poly0x >= pt.X)
      {
        if (poly1x > pt.X)
          result = 1 - result;
        else
        {
          var d = (poly0x - pt.X) * (poly1y - pt.Y) - (poly1x - pt.X) * (poly0y - pt.Y);
          if (d == 0)
            return -1;
          if ((d > 0) == (poly1y > poly0y))
            result = 1 - result;
        }
      }
      else
      {
        if (poly1x > pt.X)
        {
          var d = (poly0x - pt.X) * (poly1y - pt.Y) - (poly1x - pt.X) * (poly0y - pt.Y);
          if (d == 0)
            return -1;
          if ((d > 0) == (poly1y > poly0y))
            result = 1 - result;
        }
      }
    }
    op = op.Next;
    if (startOp == op)
      break;
  }
  return result;
};

ClipperLib.Clipper.prototype.Poly2ContainsPoly1 = function (outPt1, outPt2)
{
  var op = outPt1;
  do {
    var res = this.PointInPolygon(op.Pt, outPt2);
    if (res >= 0)
      return res != 0;
    op = op.Next;
  }
  while (op != outPt1)
  return true;
};
ClipperLib.Clipper.prototype.FixupFirstLefts1 = function (OldOutRec, NewOutRec)
{
  for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++)
  {
    var outRec = this.m_PolyOuts[i];
    if (outRec.Pts !== null && outRec.FirstLeft == OldOutRec)
    {
      if (this.Poly2ContainsPoly1(outRec.Pts, NewOutRec.Pts))
        outRec.FirstLeft = NewOutRec;
    }
  }
};
ClipperLib.Clipper.prototype.FixupFirstLefts2 = function (OldOutRec, NewOutRec)
{
  for (var $i2 = 0, $t2 = this.m_PolyOuts, $l2 = $t2.length, outRec = $t2[$i2]; $i2 < $l2; $i2++, outRec = $t2[$i2])
    if (outRec.FirstLeft == OldOutRec)
      outRec.FirstLeft = NewOutRec;
};
ClipperLib.Clipper.ParseFirstLeft = function (FirstLeft)
{
  while (FirstLeft != null && FirstLeft.Pts == null)
    FirstLeft = FirstLeft.FirstLeft;
  return FirstLeft;
};
ClipperLib.Clipper.prototype.JoinCommonEdges = function ()
{
  for (var i = 0, ilen = this.m_Joins.length; i < ilen; i++)
  {
    var join = this.m_Joins[i];
    var outRec1 = this.GetOutRec(join.OutPt1.Idx);
    var outRec2 = this.GetOutRec(join.OutPt2.Idx);
    if (outRec1.Pts == null || outRec2.Pts == null)
      continue;
    //get the polygon fragment with the correct hole state (FirstLeft)
    //before calling JoinPoints() ...
    var holeStateRec;
    if (outRec1 == outRec2)
      holeStateRec = outRec1;
    else if (this.Param1RightOfParam2(outRec1, outRec2))
      holeStateRec = outRec2;
    else if (this.Param1RightOfParam2(outRec2, outRec1))
      holeStateRec = outRec1;
    else
      holeStateRec = this.GetLowermostRec(outRec1, outRec2);

    if (!this.JoinPoints(join, outRec1, outRec2)) continue;

    if (outRec1 == outRec2)
    {
      //instead of joining two polygons, we've just created a new one by
      //splitting one polygon into two.
      outRec1.Pts = join.OutPt1;
      outRec1.BottomPt = null;
      outRec2 = this.CreateOutRec();
      outRec2.Pts = join.OutPt2;
      //update all OutRec2.Pts Idx's ...
      this.UpdateOutPtIdxs(outRec2);
      //We now need to check every OutRec.FirstLeft pointer. If it points
      //to OutRec1 it may need to point to OutRec2 instead ...
      if (this.m_UsingPolyTree)
        for (var j = 0, jlen = this.m_PolyOuts.length; j < jlen - 1; j++)
        {
          var oRec = this.m_PolyOuts[j];
          if (oRec.Pts == null || ClipperLib.Clipper.ParseFirstLeft(oRec.FirstLeft) != outRec1 || oRec.IsHole == outRec1.IsHole)
            continue;
          if (this.Poly2ContainsPoly1(oRec.Pts, join.OutPt2))
            oRec.FirstLeft = outRec2;
        }
      if (this.Poly2ContainsPoly1(outRec2.Pts, outRec1.Pts))
      {
        //outRec2 is contained by outRec1 ...
        outRec2.IsHole = !outRec1.IsHole;
        outRec2.FirstLeft = outRec1;
        //fixup FirstLeft pointers that may need reassigning to OutRec1
        if (this.m_UsingPolyTree)
          this.FixupFirstLefts2(outRec2, outRec1);
        if ((outRec2.IsHole ^ this.ReverseSolution) == (this.Area(outRec2) > 0))
          this.ReversePolyPtLinks(outRec2.Pts);
      }
      else if (this.Poly2ContainsPoly1(outRec1.Pts, outRec2.Pts))
      {
        //outRec1 is contained by outRec2 ...
        outRec2.IsHole = outRec1.IsHole;
        outRec1.IsHole = !outRec2.IsHole;
        outRec2.FirstLeft = outRec1.FirstLeft;
        outRec1.FirstLeft = outRec2;
        //fixup FirstLeft pointers that may need reassigning to OutRec1
        if (this.m_UsingPolyTree)
          this.FixupFirstLefts2(outRec1, outRec2);
        if ((outRec1.IsHole ^ this.ReverseSolution) == (this.Area(outRec1) > 0))
          this.ReversePolyPtLinks(outRec1.Pts);
      }
      else
      {
        //the 2 polygons are completely separate ...
        outRec2.IsHole = outRec1.IsHole;
        outRec2.FirstLeft = outRec1.FirstLeft;
        //fixup FirstLeft pointers that may need reassigning to OutRec2
        if (this.m_UsingPolyTree)
          this.FixupFirstLefts1(outRec1, outRec2);
      }
    }
    else
    {
      //joined 2 polygons together ...
      outRec2.Pts = null;
      outRec2.BottomPt = null;
      outRec2.Idx = outRec1.Idx;
      outRec1.IsHole = holeStateRec.IsHole;
      if (holeStateRec == outRec2)
        outRec1.FirstLeft = outRec2.FirstLeft;
      outRec2.FirstLeft = outRec1;
      //fixup FirstLeft pointers that may need reassigning to OutRec1
      if (this.m_UsingPolyTree)
        this.FixupFirstLefts2(outRec2, outRec1);
    }
  }
};
ClipperLib.Clipper.prototype.UpdateOutPtIdxs = function (outrec)
{
  var op = outrec.Pts;
  do {
    op.Idx = outrec.Idx;
    op = op.Prev;
  }
  while (op != outrec.Pts)
};
ClipperLib.Clipper.prototype.DoSimplePolygons = function ()
{
  var i = 0;
  while (i < this.m_PolyOuts.length)
  {
    var outrec = this.m_PolyOuts[i++];
    var op = outrec.Pts;
    if (op === null)
      continue;
    do //for each Pt in Polygon until duplicate found do ...
    {
      var op2 = op.Next;
      while (op2 != outrec.Pts)
      {
        if ((ClipperLib.IntPoint.op_Equality(op.Pt, op2.Pt)) && op2.Next != op && op2.Prev != op)
        {
          //split the polygon into two ...
          var op3 = op.Prev;
          var op4 = op2.Prev;
          op.Prev = op4;
          op4.Next = op;
          op2.Prev = op3;
          op3.Next = op2;
          outrec.Pts = op;
          var outrec2 = this.CreateOutRec();
          outrec2.Pts = op2;
          this.UpdateOutPtIdxs(outrec2);
          if (this.Poly2ContainsPoly1(outrec2.Pts, outrec.Pts))
          {
            //OutRec2 is contained by OutRec1 ...
            outrec2.IsHole = !outrec.IsHole;
            outrec2.FirstLeft = outrec;
          }
          else if (this.Poly2ContainsPoly1(outrec.Pts, outrec2.Pts))
          {
            //OutRec1 is contained by OutRec2 ...
            outrec2.IsHole = outrec.IsHole;
            outrec.IsHole = !outrec2.IsHole;
            outrec2.FirstLeft = outrec.FirstLeft;
            outrec.FirstLeft = outrec2;
          }
          else
          {
            //the 2 polygons are separate ...
            outrec2.IsHole = outrec.IsHole;
            outrec2.FirstLeft = outrec.FirstLeft;
          }
          op2 = op;
          //ie get ready for the next iteration
        }
        op2 = op2.Next;
      }
      op = op.Next;
    }
    while (op != outrec.Pts)
  }
};
ClipperLib.Clipper.Area = function (poly)
{
  var cnt = poly.length;
  if (cnt < 3)
    return 0;
  var a = 0;
  for (var i = 0, j = cnt - 1; i < cnt; ++i)
  {
    a += (poly[j].X + poly[i].X) * (poly[j].Y - poly[i].Y);
    j = i;
  }
  return -a * 0.5;
};
ClipperLib.Clipper.prototype.Area = function (outRec)
{
  var op = outRec.Pts;
  if (op == null)
    return 0;
  var a = 0;
  do {
    a = a + (op.Prev.Pt.X + op.Pt.X) * (op.Prev.Pt.Y - op.Pt.Y);
    op = op.Next;
  }
  while (op != outRec.Pts)
  return a * 0.5;
};
if (use_deprecated)
{
  ClipperLib.Clipper.OffsetPaths = function (polys, delta, jointype, endtype, MiterLimit)
  {
    var result = new ClipperLib.Paths();
    var co = new ClipperLib.ClipperOffset(MiterLimit, MiterLimit);
    co.AddPaths(polys, jointype, endtype);
    co.Execute(result, delta);
    return result;
  };
}
ClipperLib.Clipper.SimplifyPolygon = function (poly, fillType)
{
  var result = new Array();
  var c = new ClipperLib.Clipper(0);
  c.StrictlySimple = true;
  c.AddPath(poly, ClipperLib.PolyType.ptSubject, true);
  c.Execute(ClipperLib.ClipType.ctUnion, result, fillType, fillType);
  return result;
};
ClipperLib.Clipper.SimplifyPolygons = function (polys, fillType)
{
  if (typeof (fillType) == "undefined") fillType = ClipperLib.PolyFillType.pftEvenOdd;
  var result = new Array();
  var c = new ClipperLib.Clipper(0);
  c.StrictlySimple = true;
  c.AddPaths(polys, ClipperLib.PolyType.ptSubject, true);
  c.Execute(ClipperLib.ClipType.ctUnion, result, fillType, fillType);
  return result;
};
ClipperLib.Clipper.DistanceSqrd = function (pt1, pt2)
{
  var dx = (pt1.X - pt2.X);
  var dy = (pt1.Y - pt2.Y);
  return (dx * dx + dy * dy);
};
ClipperLib.Clipper.DistanceFromLineSqrd = function (pt, ln1, ln2)
{
  //The equation of a line in general form (Ax + By + C = 0)
  //given 2 points (x�,y�) & (x�,y�) is ...
  //(y� - y�)x + (x� - x�)y + (y� - y�)x� - (x� - x�)y� = 0
  //A = (y� - y�); B = (x� - x�); C = (y� - y�)x� - (x� - x�)y�
  //perpendicular distance of point (x�,y�) = (Ax� + By� + C)/Sqrt(A� + B�)
  //see http://en.wikipedia.org/wiki/Perpendicular_distance
  var A = ln1.Y - ln2.Y;
  var B = ln2.X - ln1.X;
  var C = A * ln1.X + B * ln1.Y;
  C = A * pt.X + B * pt.Y - C;
  return (C * C) / (A * A + B * B);
};
ClipperLib.Clipper.SlopesNearCollinear = function (pt1, pt2, pt3, distSqrd)
{
  return ClipperLib.Clipper.DistanceFromLineSqrd(pt2, pt1, pt3) < distSqrd;
};
ClipperLib.Clipper.PointsAreClose = function (pt1, pt2, distSqrd)
{
  var dx = pt1.X - pt2.X;
  var dy = pt1.Y - pt2.Y;
  return ((dx * dx) + (dy * dy) <= distSqrd);
};
//------------------------------------------------------------------------------
ClipperLib.Clipper.ExcludeOp = function (op)
{
  var result = op.Prev;
  result.Next = op.Next;
  op.Next.Prev = result;
  result.Idx = 0;
  return result;
};
ClipperLib.Clipper.CleanPolygon = function (path, distance)
{
  if (typeof (distance) == "undefined") distance = 1.415;
  //distance = proximity in units/pixels below which vertices will be stripped. 
  //Default ~= sqrt(2) so when adjacent vertices or semi-adjacent vertices have 
  //both x & y coords within 1 unit, then the second vertex will be stripped.
  var cnt = path.length;
  if (cnt == 0)
    return new Array();
  var outPts = new Array(cnt);
  for (var i = 0; i < cnt; ++i)
    outPts[i] = new ClipperLib.OutPt();
  for (var i = 0; i < cnt; ++i)
  {
    outPts[i].Pt = path[i];
    outPts[i].Next = outPts[(i + 1) % cnt];
    outPts[i].Next.Prev = outPts[i];
    outPts[i].Idx = 0;
  }
  var distSqrd = distance * distance;
  var op = outPts[0];
  while (op.Idx == 0 && op.Next != op.Prev)
  {
    if (ClipperLib.Clipper.PointsAreClose(op.Pt, op.Prev.Pt, distSqrd))
    {
      op = ClipperLib.Clipper.ExcludeOp(op);
      cnt--;
    }
    else if (ClipperLib.Clipper.PointsAreClose(op.Prev.Pt, op.Next.Pt, distSqrd))
    {
      ClipperLib.Clipper.ExcludeOp(op.Next);
      op = ClipperLib.Clipper.ExcludeOp(op);
      cnt -= 2;
    }
    else if (ClipperLib.Clipper.SlopesNearCollinear(op.Prev.Pt, op.Pt, op.Next.Pt, distSqrd))
    {
      op = ClipperLib.Clipper.ExcludeOp(op);
      cnt--;
    }
    else
    {
      op.Idx = 1;
      op = op.Next;
    }
  }
  if (cnt < 3)
    cnt = 0;
  var result = new Array(cnt);
  for (var i = 0; i < cnt; ++i)
  {
    result[i] = new ClipperLib.IntPoint(op.Pt);
    op = op.Next;
  }
  outPts = null;
  return result;
};
ClipperLib.Clipper.CleanPolygons = function (polys, distance)
{
  var result = new Array(polys.length);
  for (var i = 0, ilen = polys.length; i < ilen; i++)
    result[i] = ClipperLib.Clipper.CleanPolygon(polys[i], distance);
  return result;
};
ClipperLib.Clipper.Minkowski = function (pattern, path, IsSum, IsClosed)
{
  var delta = (IsClosed ? 1 : 0);
  var polyCnt = pattern.length;
  var pathCnt = path.length;
  var result = new Array();
  if (IsSum)
    for (var i = 0; i < pathCnt; i++)
    {
      var p = new Array(polyCnt);
      for (var j = 0, jlen = pattern.length, ip = pattern[j]; j < jlen; j++, ip = pattern[j])
        p[j] = new ClipperLib.IntPoint(path[i].X + ip.X, path[i].Y + ip.Y);
      result.push(p);
    }
  else
    for (var i = 0; i < pathCnt; i++)
    {
      var p = new Array(polyCnt);
      for (var j = 0, jlen = pattern.length, ip = pattern[j]; j < jlen; j++, ip = pattern[j])
        p[j] = new ClipperLib.IntPoint(path[i].X - ip.X, path[i].Y - ip.Y);
      result.push(p);
    }
  var quads = new Array();
  for (var i = 0; i < pathCnt - 1 + delta; i++)
    for (var j = 0; j < polyCnt; j++)
    {
      var quad = new Array();
      quad.push(result[i % pathCnt][j % polyCnt]);
      quad.push(result[(i + 1) % pathCnt][j % polyCnt]);
      quad.push(result[(i + 1) % pathCnt][(j + 1) % polyCnt]);
      quad.push(result[i % pathCnt][(j + 1) % polyCnt]);
      if (!ClipperLib.Clipper.Orientation(quad))
        quad.reverse();
      quads.push(quad);
    }
  var c = new ClipperLib.Clipper(0);
  c.AddPaths(quads, ClipperLib.PolyType.ptSubject, true);
  c.Execute(ClipperLib.ClipType.ctUnion, result, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);
  return result;
};

ClipperLib.Clipper.MinkowskiSum = function ()
{
  var a = arguments,
    alen = a.length;
  if (alen == 3) // MinkowskiSum(Path pattern, path, pathIsClosed)
  {
    var pattern = a[0],
      path = a[1],
      pathIsClosed = a[2];
    return ClipperLib.Clipper.Minkowski(pattern, path, true, pathIsClosed);
  }
  else if (alen == 4) // MinkowskiSum(pattern, paths, pathFillType, pathIsClosed)
  {
    var pattern = a[0],
      paths = a[1],
      pathFillType = a[2],
      pathIsClosed = a[3];
    var c = new ClipperLib.Clipper(),
      tmp;
    for (var i = 0, ilen = paths.length; i < ilen; ++i)
    {
      var tmp = ClipperLib.Clipper.Minkowski(pattern, paths[i], true, pathIsClosed);
      c.AddPaths(tmp, ClipperLib.PolyType.ptSubject, true);
    }
    if (pathIsClosed) c.AddPaths(paths, ClipperLib.PolyType.ptClip, true);
    var solution = new ClipperLib.Paths();
    c.Execute(ClipperLib.ClipType.ctUnion, solution, pathFillType, pathFillType);
    return solution;
  }
};

ClipperLib.Clipper.MinkowskiDiff = function (pattern, path, pathIsClosed)
{
  return ClipperLib.Clipper.Minkowski(pattern, path, false, pathIsClosed);
};

ClipperLib.Clipper.PolyTreeToPaths = function (polytree)
{
  var result = new Array();
  //result.set_Capacity(polytree.get_Total());
  ClipperLib.Clipper.AddPolyNodeToPaths(polytree, ClipperLib.Clipper.NodeType.ntAny, result);
  return result;
};
ClipperLib.Clipper.AddPolyNodeToPaths = function (polynode, nt, paths)
{
  var match = true;
  switch (nt)
  {
  case ClipperLib.Clipper.NodeType.ntOpen:
    return;
  case ClipperLib.Clipper.NodeType.ntClosed:
    match = !polynode.IsOpen;
    break;
  default:
    break;
  }
  if (polynode.m_polygon.length > 0 && match)
    paths.push(polynode.m_polygon);
  for (var $i3 = 0, $t3 = polynode.Childs(), $l3 = $t3.length, pn = $t3[$i3]; $i3 < $l3; $i3++, pn = $t3[$i3])
    ClipperLib.Clipper.AddPolyNodeToPaths(pn, nt, paths);
};
ClipperLib.Clipper.OpenPathsFromPolyTree = function (polytree)
{
  var result = new ClipperLib.Paths();
  //result.set_Capacity(polytree.ChildCount());
  for (var i = 0, ilen = polytree.ChildCount(); i < ilen; i++)
    if (polytree.Childs()[i].IsOpen)
      result.push(polytree.Childs()[i].m_polygon);
  return result;
};
ClipperLib.Clipper.ClosedPathsFromPolyTree = function (polytree)
{
  var result = new ClipperLib.Paths();
  //result.set_Capacity(polytree.Total());
  ClipperLib.Clipper.AddPolyNodeToPaths(polytree, ClipperLib.Clipper.NodeType.ntClosed, result);
  return result;
};
Inherit(ClipperLib.Clipper, ClipperLib.ClipperBase);
ClipperLib.Clipper.NodeType = {
  ntAny: 0,
  ntOpen: 1,
  ntClosed: 2
};
ClipperLib.ClipperOffset = function (miterLimit, arcTolerance)
{
  if (typeof (miterLimit) == "undefined") miterLimit = 2;
  if (typeof (arcTolerance) == "undefined") arcTolerance = ClipperLib.ClipperOffset.def_arc_tolerance;
  this.m_destPolys = new ClipperLib.Paths();
  this.m_srcPoly = new ClipperLib.Path();
  this.m_destPoly = new ClipperLib.Path();
  this.m_normals = new Array();
  this.m_delta = 0;
  this.m_sinA = 0;
  this.m_sin = 0;
  this.m_cos = 0;
  this.m_miterLim = 0;
  this.m_StepsPerRad = 0;
  this.m_lowest = new ClipperLib.IntPoint();
  this.m_polyNodes = new ClipperLib.PolyNode();
  this.MiterLimit = miterLimit;
  this.ArcTolerance = arcTolerance;
  this.m_lowest.X = -1;
};
ClipperLib.ClipperOffset.two_pi = 6.28318530717959;
ClipperLib.ClipperOffset.def_arc_tolerance = 0.25;
ClipperLib.ClipperOffset.prototype.Clear = function ()
{
  ClipperLib.Clear(this.m_polyNodes.Childs());
  this.m_lowest.X = -1;
};
ClipperLib.ClipperOffset.Round = ClipperLib.Clipper.Round;
ClipperLib.ClipperOffset.prototype.AddPath = function (path, joinType, endType)
{
  var highI = path.length - 1;
  if (highI < 0)
    return;
  var newNode = new ClipperLib.PolyNode();
  newNode.m_jointype = joinType;
  newNode.m_endtype = endType;
  //strip duplicate points from path and also get index to the lowest point ...
  if (endType == ClipperLib.EndType.etClosedLine || endType == ClipperLib.EndType.etClosedPolygon)
    while (highI > 0 && ClipperLib.IntPoint.op_Equality(path[0], path[highI]))
      highI--;
  //newNode.m_polygon.set_Capacity(highI + 1);
  newNode.m_polygon.push(path[0]);
  var j = 0,
    k = 0;
  for (var i = 1; i <= highI; i++)
    if (ClipperLib.IntPoint.op_Inequality(newNode.m_polygon[j], path[i]))
    {
      j++;
      newNode.m_polygon.push(path[i]);
      if (path[i].Y > newNode.m_polygon[k].Y || (path[i].Y == newNode.m_polygon[k].Y && path[i].X < newNode.m_polygon[k].X))
        k = j;
    }
  if ((endType == ClipperLib.EndType.etClosedPolygon && j < 2) || (endType != ClipperLib.EndType.etClosedPolygon && j < 0))
    return;
  this.m_polyNodes.AddChild(newNode);
  //if this path's lowest pt is lower than all the others then update m_lowest
  if (endType != ClipperLib.EndType.etClosedPolygon)
    return;
  if (this.m_lowest.X < 0)
    this.m_lowest = new ClipperLib.IntPoint(0, k);
  else
  {
    var ip = this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon[this.m_lowest.Y];
    if (newNode.m_polygon[k].Y > ip.Y || (newNode.m_polygon[k].Y == ip.Y && newNode.m_polygon[k].X < ip.X))
      this.m_lowest = new ClipperLib.IntPoint(this.m_polyNodes.ChildCount() - 1, k);
  }
};
ClipperLib.ClipperOffset.prototype.AddPaths = function (paths, joinType, endType)
{
  for (var i = 0, ilen = paths.length; i < ilen; i++)
    this.AddPath(paths[i], joinType, endType);
};
ClipperLib.ClipperOffset.prototype.FixOrientations = function ()
{
  //fixup orientations of all closed paths if the orientation of the
  //closed path with the lowermost vertex is wrong ...
  if (this.m_lowest.X >= 0 && !ClipperLib.Clipper.Orientation(this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon))
  {
    for (var i = 0; i < this.m_polyNodes.ChildCount(); i++)
    {
      var node = this.m_polyNodes.Childs()[i];
      if (node.m_endtype == ClipperLib.EndType.etClosedPolygon || (node.m_endtype == ClipperLib.EndType.etClosedLine && ClipperLib.Clipper.Orientation(node.m_polygon)))
        node.m_polygon.reverse();
    }
  }
  else
  {
    for (var i = 0; i < this.m_polyNodes.ChildCount(); i++)
    {
      var node = this.m_polyNodes.Childs()[i];
      if (node.m_endtype == ClipperLib.EndType.etClosedLine && !ClipperLib.Clipper.Orientation(node.m_polygon))
        node.m_polygon.reverse();
    }
  }
};
ClipperLib.ClipperOffset.GetUnitNormal = function (pt1, pt2)
{
  var dx = (pt2.X - pt1.X);
  var dy = (pt2.Y - pt1.Y);
  if ((dx == 0) && (dy == 0))
    return new ClipperLib.DoublePoint(0, 0);
  var f = 1 / Math.sqrt(dx * dx + dy * dy);
  dx *= f;
  dy *= f;
  return new ClipperLib.DoublePoint(dy, -dx);
};
ClipperLib.ClipperOffset.prototype.DoOffset = function (delta)
{
  this.m_destPolys = new Array();
  this.m_delta = delta;
  //if Zero offset, just copy any CLOSED polygons to m_p and return ...
  if (ClipperLib.ClipperBase.near_zero(delta))
  {
    //this.m_destPolys.set_Capacity(this.m_polyNodes.ChildCount);
    for (var i = 0; i < this.m_polyNodes.ChildCount(); i++)
    {
      var node = this.m_polyNodes.Childs()[i];
      if (node.m_endtype == ClipperLib.EndType.etClosedPolygon)
        this.m_destPolys.push(node.m_polygon);
    }
    return;
  }
  //see offset_triginometry3.svg in the documentation folder ...
  if (this.MiterLimit > 2)
    this.m_miterLim = 2 / (this.MiterLimit * this.MiterLimit);
  else
    this.m_miterLim = 0.5;
  var y;
  if (this.ArcTolerance <= 0)
    y = ClipperLib.ClipperOffset.def_arc_tolerance;
  else if (this.ArcTolerance > Math.abs(delta) * ClipperLib.ClipperOffset.def_arc_tolerance)
    y = Math.abs(delta) * ClipperLib.ClipperOffset.def_arc_tolerance;
  else
    y = this.ArcTolerance;
  //see offset_triginometry2.svg in the documentation folder ...
  var steps = 3.14159265358979 / Math.acos(1 - y / Math.abs(delta));
  this.m_sin = Math.sin(ClipperLib.ClipperOffset.two_pi / steps);
  this.m_cos = Math.cos(ClipperLib.ClipperOffset.two_pi / steps);
  this.m_StepsPerRad = steps / ClipperLib.ClipperOffset.two_pi;
  if (delta < 0)
    this.m_sin = -this.m_sin;
  //this.m_destPolys.set_Capacity(this.m_polyNodes.ChildCount * 2);
  for (var i = 0; i < this.m_polyNodes.ChildCount(); i++)
  {
    var node = this.m_polyNodes.Childs()[i];
    this.m_srcPoly = node.m_polygon;
    var len = this.m_srcPoly.length;
    if (len == 0 || (delta <= 0 && (len < 3 || node.m_endtype != ClipperLib.EndType.etClosedPolygon)))
      continue;
    this.m_destPoly = new Array();
    if (len == 1)
    {
      if (node.m_jointype == ClipperLib.JoinType.jtRound)
      {
        var X = 1,
          Y = 0;
        for (var j = 1; j <= steps; j++)
        {
          this.m_destPoly.push(new ClipperLib.IntPoint(ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].X + X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].Y + Y * delta)));
          var X2 = X;
          X = X * this.m_cos - this.m_sin * Y;
          Y = X2 * this.m_sin + Y * this.m_cos;
        }
      }
      else
      {
        var X = -1,
          Y = -1;
        for (var j = 0; j < 4; ++j)
        {
          this.m_destPoly.push(new ClipperLib.IntPoint(ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].X + X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].Y + Y * delta)));
          if (X < 0)
            X = 1;
          else if (Y < 0)
            Y = 1;
          else
            X = -1;
        }
      }
      this.m_destPolys.push(this.m_destPoly);
      continue;
    }
    //build m_normals ...
    this.m_normals.length = 0;
    //this.m_normals.set_Capacity(len);
    for (var j = 0; j < len - 1; j++)
      this.m_normals.push(ClipperLib.ClipperOffset.GetUnitNormal(this.m_srcPoly[j], this.m_srcPoly[j + 1]));
    if (node.m_endtype == ClipperLib.EndType.etClosedLine || node.m_endtype == ClipperLib.EndType.etClosedPolygon)
      this.m_normals.push(ClipperLib.ClipperOffset.GetUnitNormal(this.m_srcPoly[len - 1], this.m_srcPoly[0]));
    else
      this.m_normals.push(new ClipperLib.DoublePoint(this.m_normals[len - 2]));
    if (node.m_endtype == ClipperLib.EndType.etClosedPolygon)
    {
      var k = len - 1;
      for (var j = 0; j < len; j++)
        k = this.OffsetPoint(j, k, node.m_jointype);
      this.m_destPolys.push(this.m_destPoly);
    }
    else if (node.m_endtype == ClipperLib.EndType.etClosedLine)
    {
      var k = len - 1;
      for (var j = 0; j < len; j++)
        k = this.OffsetPoint(j, k, node.m_jointype);
      this.m_destPolys.push(this.m_destPoly);
      this.m_destPoly = new Array();
      //re-build m_normals ...
      var n = this.m_normals[len - 1];
      for (var j = len - 1; j > 0; j--)
        this.m_normals[j] = new ClipperLib.DoublePoint(-this.m_normals[j - 1].X, -this.m_normals[j - 1].Y);
      this.m_normals[0] = new ClipperLib.DoublePoint(-n.X, -n.Y);
      k = 0;
      for (var j = len - 1; j >= 0; j--)
        k = this.OffsetPoint(j, k, node.m_jointype);
      this.m_destPolys.push(this.m_destPoly);
    }
    else
    {
      var k = 0;
      for (var j = 1; j < len - 1; ++j)
        k = this.OffsetPoint(j, k, node.m_jointype);
      var pt1;
      if (node.m_endtype == ClipperLib.EndType.etOpenButt)
      {
        var j = len - 1;
        pt1 = new ClipperLib.IntPoint(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_normals[j].X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_normals[j].Y * delta));
        this.m_destPoly.push(pt1);
        pt1 = new ClipperLib.IntPoint(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X - this.m_normals[j].X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y - this.m_normals[j].Y * delta));
        this.m_destPoly.push(pt1);
      }
      else
      {
        var j = len - 1;
        k = len - 2;
        this.m_sinA = 0;
        this.m_normals[j] = new ClipperLib.DoublePoint(-this.m_normals[j].X, -this.m_normals[j].Y);
        if (node.m_endtype == ClipperLib.EndType.etOpenSquare)
          this.DoSquare(j, k);
        else
          this.DoRound(j, k);
      }
      //re-build m_normals ...
      for (var j = len - 1; j > 0; j--)
        this.m_normals[j] = new ClipperLib.DoublePoint(-this.m_normals[j - 1].X, -this.m_normals[j - 1].Y);
      this.m_normals[0] = new ClipperLib.DoublePoint(-this.m_normals[1].X, -this.m_normals[1].Y);
      k = len - 1;
      for (var j = k - 1; j > 0; --j)
        k = this.OffsetPoint(j, k, node.m_jointype);
      if (node.m_endtype == ClipperLib.EndType.etOpenButt)
      {
        pt1 = new ClipperLib.IntPoint(ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].X - this.m_normals[0].X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].Y - this.m_normals[0].Y * delta));
        this.m_destPoly.push(pt1);
        pt1 = new ClipperLib.IntPoint(ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].X + this.m_normals[0].X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].Y + this.m_normals[0].Y * delta));
        this.m_destPoly.push(pt1);
      }
      else
      {
        k = 1;
        this.m_sinA = 0;
        if (node.m_endtype == ClipperLib.EndType.etOpenSquare)
          this.DoSquare(0, 1);
        else
          this.DoRound(0, 1);
      }
      this.m_destPolys.push(this.m_destPoly);
    }
  }
};
ClipperLib.ClipperOffset.prototype.Execute = function ()
{
  var a = arguments,
    ispolytree = a[0] instanceof ClipperLib.PolyTree;
  if (!ispolytree) // function (solution, delta)
  {
    var solution = a[0],
      delta = a[1];
    ClipperLib.Clear(solution);
    this.FixOrientations();
    this.DoOffset(delta);
    //now clean up 'corners' ...
    var clpr = new ClipperLib.Clipper(0);
    clpr.AddPaths(this.m_destPolys, ClipperLib.PolyType.ptSubject, true);
    if (delta > 0)
    {
      clpr.Execute(ClipperLib.ClipType.ctUnion, solution, ClipperLib.PolyFillType.pftPositive, ClipperLib.PolyFillType.pftPositive);
    }
    else
    {
      var r = ClipperLib.Clipper.GetBounds(this.m_destPolys);
      var outer = new ClipperLib.Path();
      outer.push(new ClipperLib.IntPoint(r.left - 10, r.bottom + 10));
      outer.push(new ClipperLib.IntPoint(r.right + 10, r.bottom + 10));
      outer.push(new ClipperLib.IntPoint(r.right + 10, r.top - 10));
      outer.push(new ClipperLib.IntPoint(r.left - 10, r.top - 10));
      clpr.AddPath(outer, ClipperLib.PolyType.ptSubject, true);
      clpr.ReverseSolution = true;
      clpr.Execute(ClipperLib.ClipType.ctUnion, solution, ClipperLib.PolyFillType.pftNegative, ClipperLib.PolyFillType.pftNegative);
      if (solution.length > 0)
        solution.splice(0, 1);
    }
    //console.log(JSON.stringify(solution));
  }
  else // function (polytree, delta)
  {
    var solution = a[0],
      delta = a[1];
    solution.Clear();
    this.FixOrientations();
    this.DoOffset(delta);
    //now clean up 'corners' ...
    var clpr = new ClipperLib.Clipper(0);
    clpr.AddPaths(this.m_destPolys, ClipperLib.PolyType.ptSubject, true);
    if (delta > 0)
    {
      clpr.Execute(ClipperLib.ClipType.ctUnion, solution, ClipperLib.PolyFillType.pftPositive, ClipperLib.PolyFillType.pftPositive);
    }
    else
    {
      var r = ClipperLib.Clipper.GetBounds(this.m_destPolys);
      var outer = new ClipperLib.Path();
      outer.push(new ClipperLib.IntPoint(r.left - 10, r.bottom + 10));
      outer.push(new ClipperLib.IntPoint(r.right + 10, r.bottom + 10));
      outer.push(new ClipperLib.IntPoint(r.right + 10, r.top - 10));
      outer.push(new ClipperLib.IntPoint(r.left - 10, r.top - 10));
      clpr.AddPath(outer, ClipperLib.PolyType.ptSubject, true);
      clpr.ReverseSolution = true;
      clpr.Execute(ClipperLib.ClipType.ctUnion, solution, ClipperLib.PolyFillType.pftNegative, ClipperLib.PolyFillType.pftNegative);
      //remove the outer PolyNode rectangle ...
      if (solution.ChildCount() == 1 && solution.Childs()[0].ChildCount() > 0)
      {
        var outerNode = solution.Childs()[0];
        //solution.Childs.set_Capacity(outerNode.ChildCount);
        solution.Childs()[0] = outerNode.Childs()[0];
        for (var i = 1; i < outerNode.ChildCount(); i++)
          solution.AddChild(outerNode.Childs()[i]);
      }
      else
        solution.Clear();
    }
  }
};
ClipperLib.ClipperOffset.prototype.OffsetPoint = function (j, k, jointype)
{
  this.m_sinA = (this.m_normals[k].X * this.m_normals[j].Y - this.m_normals[j].X * this.m_normals[k].Y);
  if (this.m_sinA < 0.00005 && this.m_sinA > -0.00005)
    return k;
  else if (this.m_sinA > 1)
    this.m_sinA = 1.0;
  else if (this.m_sinA < -1)
    this.m_sinA = -1.0;
  if (this.m_sinA * this.m_delta < 0)
  {
    this.m_destPoly.push(new ClipperLib.IntPoint(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_normals[k].X * this.m_delta),
      ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_normals[k].Y * this.m_delta)));
    this.m_destPoly.push(new ClipperLib.IntPoint(this.m_srcPoly[j]));
    this.m_destPoly.push(new ClipperLib.IntPoint(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_normals[j].X * this.m_delta),
      ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_normals[j].Y * this.m_delta)));
  }
  else
    switch (jointype)
    {
    case ClipperLib.JoinType.jtMiter:
      {
        var r = 1 + (this.m_normals[j].X * this.m_normals[k].X + this.m_normals[j].Y * this.m_normals[k].Y);
        if (r >= this.m_miterLim)
          this.DoMiter(j, k, r);
        else
          this.DoSquare(j, k);
        break;
      }
    case ClipperLib.JoinType.jtSquare:
      this.DoSquare(j, k);
      break;
    case ClipperLib.JoinType.jtRound:
      this.DoRound(j, k);
      break;
    }
  k = j;
  return k;
};
ClipperLib.ClipperOffset.prototype.DoSquare = function (j, k)
{
  var dx = Math.tan(Math.atan2(this.m_sinA,
    this.m_normals[k].X * this.m_normals[j].X + this.m_normals[k].Y * this.m_normals[j].Y) / 4);
  this.m_destPoly.push(new ClipperLib.IntPoint(
    ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_delta * (this.m_normals[k].X - this.m_normals[k].Y * dx)),
    ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_delta * (this.m_normals[k].Y + this.m_normals[k].X * dx))));
  this.m_destPoly.push(new ClipperLib.IntPoint(
    ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_delta * (this.m_normals[j].X + this.m_normals[j].Y * dx)),
    ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_delta * (this.m_normals[j].Y - this.m_normals[j].X * dx))));
};
ClipperLib.ClipperOffset.prototype.DoMiter = function (j, k, r)
{
  var q = this.m_delta / r;
  this.m_destPoly.push(new ClipperLib.IntPoint(
    ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + (this.m_normals[k].X + this.m_normals[j].X) * q),
    ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + (this.m_normals[k].Y + this.m_normals[j].Y) * q)));
};
ClipperLib.ClipperOffset.prototype.DoRound = function (j, k)
{
  var a = Math.atan2(this.m_sinA,
    this.m_normals[k].X * this.m_normals[j].X + this.m_normals[k].Y * this.m_normals[j].Y);
  var steps = ClipperLib.Cast_Int32(ClipperLib.ClipperOffset.Round(this.m_StepsPerRad * Math.abs(a)));
  var X = this.m_normals[k].X,
    Y = this.m_normals[k].Y,
    X2;
  for (var i = 0; i < steps; ++i)
  {
    this.m_destPoly.push(new ClipperLib.IntPoint(
      ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + X * this.m_delta),
      ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + Y * this.m_delta)));
    X2 = X;
    X = X * this.m_cos - this.m_sin * Y;
    Y = X2 * this.m_sin + Y * this.m_cos;
  }
  this.m_destPoly.push(new ClipperLib.IntPoint(
    ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_normals[j].X * this.m_delta),
    ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_normals[j].Y * this.m_delta)));
};
ClipperLib.Error = function (message)
{
  try
  {
    throw new Error(message);
  }
  catch (err)
  {
    alert(err.message);
  }
};
// ---------------------------------
// JS extension by Timo 2013
ClipperLib.JS = {};
ClipperLib.JS.AreaOfPolygon = function (poly, scale)
{
  if (!scale) scale = 1;
  return ClipperLib.Clipper.Area(poly) / (scale * scale);
};
ClipperLib.JS.AreaOfPolygons = function (poly, scale)
{
  if (!scale) scale = 1;
  var area = 0;
  for (var i = 0; i < poly.length; i++)
  {
    area += ClipperLib.Clipper.Area(poly[i]);
  }
  return area / (scale * scale);
};
ClipperLib.JS.BoundsOfPath = function (path, scale)
{
  return ClipperLib.JS.BoundsOfPaths([path], scale);
};
ClipperLib.JS.BoundsOfPaths = function (paths, scale)
{
  if (!scale) scale = 1;
  var bounds = ClipperLib.Clipper.GetBounds(paths);
  bounds.left /= scale;
  bounds.bottom /= scale;
  bounds.right /= scale;
  bounds.top /= scale;
  return bounds;
};
// Clean() joins vertices that are too near each other
// and causes distortion to offsetted polygons without cleaning
ClipperLib.JS.Clean = function (polygon, delta)
{
  if (!(polygon instanceof Array)) return [];
  var isPolygons = polygon[0] instanceof Array;
  var polygon = ClipperLib.JS.Clone(polygon);
  if (typeof delta != "number" || delta === null)
  {
    ClipperLib.Error("Delta is not a number in Clean().");
    return polygon;
  }
  if (polygon.length === 0 || (polygon.length == 1 && polygon[0].length === 0) || delta < 0) return polygon;
  if (!isPolygons) polygon = [polygon];
  var k_length = polygon.length;
  var len, poly, result, d, p, j, i;
  var results = [];
  for (var k = 0; k < k_length; k++)
  {
    poly = polygon[k];
    len = poly.length;
    if (len === 0) continue;
    else if (len < 3)
    {
      result = poly;
      results.push(result);
      continue;
    }
    result = poly;
    d = delta * delta;
    //d = Math.floor(c_delta * c_delta);
    p = poly[0];
    j = 1;
    for (i = 1; i < len; i++)
    {
      if ((poly[i].X - p.X) * (poly[i].X - p.X) +
        (poly[i].Y - p.Y) * (poly[i].Y - p.Y) <= d)
        continue;
      result[j] = poly[i];
      p = poly[i];
      j++;
    }
    p = poly[j - 1];
    if ((poly[0].X - p.X) * (poly[0].X - p.X) +
      (poly[0].Y - p.Y) * (poly[0].Y - p.Y) <= d)
      j--;
    if (j < len)
      result.splice(j, len - j);
    if (result.length) results.push(result);
  }
  if (!isPolygons && results.length) results = results[0];
  else if (!isPolygons && results.length === 0) results = [];
  else if (isPolygons && results.length === 0) results = [
    []
  ];
  return results;
}
// Make deep copy of Polygons or Polygon
// so that also IntPoint objects are cloned and not only referenced
// This should be the fastest way
ClipperLib.JS.Clone = function (polygon)
{
  if (!(polygon instanceof Array)) return [];
  if (polygon.length === 0) return [];
  else if (polygon.length == 1 && polygon[0].length === 0) return [[]];
  var isPolygons = polygon[0] instanceof Array;
  if (!isPolygons) polygon = [polygon];
  var len = polygon.length,
    plen, i, j, result;
  var results = new Array(len);
  for (i = 0; i < len; i++)
  {
    plen = polygon[i].length;
    result = new Array(plen);
    for (j = 0; j < plen; j++)
    {
      result[j] = {
        X: polygon[i][j].X,
        Y: polygon[i][j].Y
      };
    }
    results[i] = result;
  }
  if (!isPolygons) results = results[0];
  return results;
};
// Removes points that doesn't affect much to the visual appearance.
// If middle point is at or under certain distance (tolerance) of the line segment between 
// start and end point, the middle point is removed.
ClipperLib.JS.Lighten = function (polygon, tolerance)
{
  if (!(polygon instanceof Array)) return [];
  if (typeof tolerance != "number" || tolerance === null)
  {
    ClipperLib.Error("Tolerance is not a number in Lighten().")
    return ClipperLib.JS.Clone(polygon);
  }
  if (polygon.length === 0 || (polygon.length == 1 && polygon[0].length === 0) || tolerance < 0)
  {
    return ClipperLib.JS.Clone(polygon);
  }
  if (!(polygon[0] instanceof Array)) polygon = [polygon];
  var i, j, poly, k, poly2, plen, A, B, P, d, rem, addlast;
  var bxax, byay, l, ax, ay;
  var len = polygon.length;
  var toleranceSq = tolerance * tolerance;
  var results = [];
  for (i = 0; i < len; i++)
  {
    poly = polygon[i];
    plen = poly.length;
    if (plen == 0) continue;
    for (k = 0; k < 1000000; k++) // could be forever loop, but wiser to restrict max repeat count
    {
      poly2 = [];
      plen = poly.length;
      // the first have to added to the end, if first and last are not the same
      // this way we ensure that also the actual last point can be removed if needed
      if (poly[plen - 1].X != poly[0].X || poly[plen - 1].Y != poly[0].Y)
      {
        addlast = 1;
        poly.push(
        {
          X: poly[0].X,
          Y: poly[0].Y
        });
        plen = poly.length;
      }
      else addlast = 0;
      rem = []; // Indexes of removed points
      for (j = 0; j < plen - 2; j++)
      {
        A = poly[j]; // Start point of line segment
        P = poly[j + 1]; // Middle point. This is the one to be removed.
        B = poly[j + 2]; // End point of line segment
        ax = A.X;
        ay = A.Y;
        bxax = B.X - ax;
        byay = B.Y - ay;
        if (bxax !== 0 || byay !== 0) // To avoid Nan, when A==P && P==B. And to avoid peaks (A==B && A!=P), which have lenght, but not area.
        {
          l = ((P.X - ax) * bxax + (P.Y - ay) * byay) / (bxax * bxax + byay * byay);
          if (l > 1)
          {
            ax = B.X;
            ay = B.Y;
          }
          else if (l > 0)
          {
            ax += bxax * l;
            ay += byay * l;
          }
        }
        bxax = P.X - ax;
        byay = P.Y - ay;
        d = bxax * bxax + byay * byay;
        if (d <= toleranceSq)
        {
          rem[j + 1] = 1;
          j++; // when removed, transfer the pointer to the next one
        }
      }
      // add all unremoved points to poly2
      poly2.push(
      {
        X: poly[0].X,
        Y: poly[0].Y
      });
      for (j = 1; j < plen - 1; j++)
        if (!rem[j]) poly2.push(
        {
          X: poly[j].X,
          Y: poly[j].Y
        });
      poly2.push(
      {
        X: poly[plen - 1].X,
        Y: poly[plen - 1].Y
      });
      // if the first point was added to the end, remove it
      if (addlast) poly.pop();
      // break, if there was not anymore removed points
      if (!rem.length) break;
      // else continue looping using poly2, to check if there are points to remove
      else poly = poly2;
    }
    plen = poly2.length;
    // remove duplicate from end, if needed
    if (poly2[plen - 1].X == poly2[0].X && poly2[plen - 1].Y == poly2[0].Y)
    {
      poly2.pop();
    }
    if (poly2.length > 2) // to avoid two-point-polygons
      results.push(poly2);
  }
  if (!polygon[0] instanceof Array) results = results[0];
  if (typeof (results) == "undefined") results = [
    []
  ];
  return results;
}
ClipperLib.JS.PerimeterOfPath = function (path, closed, scale)
{
  if (typeof (path) == "undefined") return 0;
  var sqrt = Math.sqrt;
  var perimeter = 0.0;
  var p1, p2, p1x = 0.0,
    p1y = 0.0,
    p2x = 0.0,
    p2y = 0.0;
  var j = path.length;
  if (j < 2) return 0;
  if (closed)
  {
    path[j] = path[0];
    j++;
  }
  while (--j)
  {
    p1 = path[j];
    p1x = p1.X;
    p1y = p1.Y;
    p2 = path[j - 1];
    p2x = p2.X;
    p2y = p2.Y;
    perimeter += sqrt((p1x - p2x) * (p1x - p2x) + (p1y - p2y) * (p1y - p2y));
  }
  if (closed) path.pop();
  return perimeter / scale;
};
ClipperLib.JS.PerimeterOfPaths = function (paths, closed, scale)
{
  if (!scale) scale = 1;
  var perimeter = 0;
  for (var i = 0; i < paths.length; i++)
  {
    perimeter += ClipperLib.JS.PerimeterOfPath(paths[i], closed, scale);
  }
  return perimeter;
};
ClipperLib.JS.ScaleDownPath = function (path, scale)
{
  var i, p;
  if (!scale) scale = 1;
  i = path.length;
  while (i--)
  {
    p = path[i];
    p.X = p.X / scale;
    p.Y = p.Y / scale;
  }
};
ClipperLib.JS.ScaleDownPaths = function (paths, scale)
{
  var i, j, p, round = Math.round;
  if (!scale) scale = 1;
  i = paths.length;
  while (i--)
  {
    j = paths[i].length;
    while (j--)
    {
      p = paths[i][j];
      p.X = p.X / scale;
      p.Y = p.Y / scale;
    }
  }
};
ClipperLib.JS.ScaleUpPath = function (path, scale)
{
  var i, p, round = Math.round;
  if (!scale) scale = 1;
  i = path.length;
  while (i--)
  {
    p = path[i];
    p.X = round(p.X * scale);
    p.Y = round(p.Y * scale);
  }
};
ClipperLib.JS.ScaleUpPaths = function (paths, scale)
{
  var i, j, p, round = Math.round;
  if (!scale) scale = 1;
  i = paths.length;
  while (i--)
  {
    j = paths[i].length;
    while (j--)
    {
      p = paths[i][j];
      p.X = round(p.X * scale);
      p.Y = round(p.Y * scale);
    }
  }
};
ClipperLib.ExPolygons = function ()
{
  return [];
}
ClipperLib.ExPolygon = function ()
{
  this.outer = null;
  this.holes = null;
};
ClipperLib.JS.AddOuterPolyNodeToExPolygons = function (polynode, expolygons)
{
  var ep = new ClipperLib.ExPolygon();
  ep.outer = polynode.Contour();
  var childs = polynode.Childs();
  var ilen = childs.length;
  ep.holes = new Array(ilen);
  var node, n, i, j, childs2, jlen;
  for (i = 0; i < ilen; i++)
  {
    node = childs[i];
    ep.holes[i] = node.Contour();
    //Add outer polygons contained by (nested within) holes ...
    for (j = 0, childs2 = node.Childs(), jlen = childs2.length; j < jlen; j++)
    {
      n = childs2[j];
      ClipperLib.JS.AddOuterPolyNodeToExPolygons(n, expolygons);
    }
  }
  expolygons.push(ep);
};
ClipperLib.JS.ExPolygonsToPaths = function (expolygons)
{
  var a, i, alen, ilen;
  var paths = new ClipperLib.Paths();
  for (a = 0, alen = expolygons.length; a < alen; a++)
  {
    paths.push(expolygons[a].outer);
    for (i = 0, ilen = expolygons[a].holes.length; i < ilen; i++)
    {
      paths.push(expolygons[a].holes[i]);
    }
  }
  return paths;
}
ClipperLib.JS.PolyTreeToExPolygons = function (polytree)
{
  var expolygons = new ClipperLib.ExPolygons();
  var node, i, childs, ilen;
  for (i = 0, childs = polytree.Childs(), ilen = childs.length; i < ilen; i++)
  {
    node = childs[i];
    ClipperLib.JS.AddOuterPolyNodeToExPolygons(node, expolygons);
  }
  return expolygons;
};


module.exports = ClipperLib;

/***/ }),

/***/ "./node_modules/osmose-request/dist/OsmoseRequest.js":
/*!***********************************************************!*\
  !*** ./node_modules/osmose-request/dist/OsmoseRequest.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,n){ true?module.exports=n():undefined}(this,function(){return function(t){function n(e){if(r[e])return r[e].exports;var o=r[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var r={};return n.m=t,n.c=r,n.d=function(t,r,e){n.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:e})},n.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(r,"a",r),r},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=92)}([function(t,n,r){var e=r(2),o=r(25),i=r(10),u=r(17),c=r(13),a=function(t,n,r){var f,s,l,h,p=t&a.F,v=t&a.G,d=t&a.S,y=t&a.P,g=t&a.B,m=v?e:d?e[n]||(e[n]={}):(e[n]||{}).prototype,b=v?o:o[n]||(o[n]={}),w=b.prototype||(b.prototype={});v&&(r=n);for(f in r)s=!p&&m&&void 0!==m[f],l=(s?m:r)[f],h=g&&s?c(l,e):y&&"function"==typeof l?c(Function.call,l):l,m&&u(m,f,l,t&a.U),b[f]!=l&&i(b,f,h),y&&w[f]!=l&&(w[f]=l)};e.core=o,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n){var r=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(t,n,r){var e=r(1);t.exports=function(t){if(!e(t))throw TypeError(t+" is not an object!");return t}},function(t,n,r){var e=r(52)("wks"),o=r(20),i=r(2).Symbol,u="function"==typeof i;(t.exports=function(t){return e[t]||(e[t]=u&&i[t]||(u?i:o)("Symbol."+t))}).store=e},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n,r){var e=r(3),o=r(66),i=r(36),u=Object.defineProperty;n.f=r(8)?Object.defineProperty:function(t,n,r){if(e(t),n=i(n,!0),e(r),o)try{return u(t,n,r)}catch(t){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!");return"value"in r&&(t[n]=r.value),t}},function(t,n,r){var e=r(22),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0}},function(t,n,r){t.exports=!r(5)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n){var r={}.hasOwnProperty;t.exports=function(t,n){return r.call(t,n)}},function(t,n,r){var e=r(6),o=r(19);t.exports=r(8)?function(t,n,r){return e.f(t,n,o(1,r))}:function(t,n,r){return t[n]=r,t}},function(t,n,r){var e=r(49),o=r(23);t.exports=function(t){return e(o(t))}},function(t,n,r){var e=r(0),o=r(25),i=r(5);t.exports=function(t,n){var r=(o.Object||{})[t]||Object[t],u={};u[t]=n(r),e(e.S+e.F*i(function(){r(1)}),"Object",u)}},function(t,n,r){var e=r(21);t.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,o){return t.call(n,r,e,o)}}return function(){return t.apply(n,arguments)}}},function(t,n,r){var e=r(23);t.exports=function(t){return Object(e(t))}},function(t,n,r){"use strict";if(r(8)){var e=r(26),o=r(2),i=r(5),u=r(0),c=r(48),a=r(67),f=r(13),s=r(28),l=r(19),h=r(10),p=r(27),v=r(22),d=r(7),y=r(68),g=r(30),m=r(36),b=r(9),w=r(56),_=r(1),x=r(14),S=r(57),E=r(38),O=r(33),P=r(37).f,A=r(58),j=r(20),M=r(4),R=r(39),F=r(50),T=r(55),L=r(59),I=r(32),k=r(42),B=r(41),N=r(54),C=r(74),U=r(6),D=r(16),W=U.f,q=D.f,G=o.RangeError,V=o.TypeError,H=o.Uint8Array,z=Array.prototype,Y=a.ArrayBuffer,K=a.DataView,J=R(0),X=R(2),Q=R(3),$=R(4),Z=R(5),tt=R(6),nt=F(!0),rt=F(!1),et=L.values,ot=L.keys,it=L.entries,ut=z.lastIndexOf,ct=z.reduce,at=z.reduceRight,ft=z.join,st=z.sort,lt=z.slice,ht=z.toString,pt=z.toLocaleString,vt=M("iterator"),dt=M("toStringTag"),yt=j("typed_constructor"),gt=j("def_constructor"),mt=c.CONSTR,bt=c.TYPED,wt=c.VIEW,_t=R(1,function(t,n){return Pt(T(t,t[gt]),n)}),xt=i(function(){return 1===new H(new Uint16Array([1]).buffer)[0]}),St=!!H&&!!H.prototype.set&&i(function(){new H(1).set({})}),Et=function(t,n){var r=v(t);if(r<0||r%n)throw G("Wrong offset!");return r},Ot=function(t){if(_(t)&&bt in t)return t;throw V(t+" is not a typed array!")},Pt=function(t,n){if(!(_(t)&&yt in t))throw V("It is not a typed array constructor!");return new t(n)},At=function(t,n){return jt(T(t,t[gt]),n)},jt=function(t,n){for(var r=0,e=n.length,o=Pt(t,e);e>r;)o[r]=n[r++];return o},Mt=function(t,n,r){W(t,n,{get:function(){return this._d[r]}})},Rt=function(t){var n,r,e,o,i,u,c=x(t),a=arguments.length,s=a>1?arguments[1]:void 0,l=void 0!==s,h=A(c);if(void 0!=h&&!S(h)){for(u=h.call(c),e=[],n=0;!(i=u.next()).done;n++)e.push(i.value);c=e}for(l&&a>2&&(s=f(s,arguments[2],2)),n=0,r=d(c.length),o=Pt(this,r);r>n;n++)o[n]=l?s(c[n],n):c[n];return o},Ft=function(){for(var t=0,n=arguments.length,r=Pt(this,n);n>t;)r[t]=arguments[t++];return r},Tt=!!H&&i(function(){pt.call(new H(1))}),Lt=function(){return pt.apply(Tt?lt.call(Ot(this)):Ot(this),arguments)},It={copyWithin:function(t,n){return C.call(Ot(this),t,n,arguments.length>2?arguments[2]:void 0)},every:function(t){return $(Ot(this),t,arguments.length>1?arguments[1]:void 0)},fill:function(t){return N.apply(Ot(this),arguments)},filter:function(t){return At(this,X(Ot(this),t,arguments.length>1?arguments[1]:void 0))},find:function(t){return Z(Ot(this),t,arguments.length>1?arguments[1]:void 0)},findIndex:function(t){return tt(Ot(this),t,arguments.length>1?arguments[1]:void 0)},forEach:function(t){J(Ot(this),t,arguments.length>1?arguments[1]:void 0)},indexOf:function(t){return rt(Ot(this),t,arguments.length>1?arguments[1]:void 0)},includes:function(t){return nt(Ot(this),t,arguments.length>1?arguments[1]:void 0)},join:function(t){return ft.apply(Ot(this),arguments)},lastIndexOf:function(t){return ut.apply(Ot(this),arguments)},map:function(t){return _t(Ot(this),t,arguments.length>1?arguments[1]:void 0)},reduce:function(t){return ct.apply(Ot(this),arguments)},reduceRight:function(t){return at.apply(Ot(this),arguments)},reverse:function(){for(var t,n=this,r=Ot(n).length,e=Math.floor(r/2),o=0;o<e;)t=n[o],n[o++]=n[--r],n[r]=t;return n},some:function(t){return Q(Ot(this),t,arguments.length>1?arguments[1]:void 0)},sort:function(t){return st.call(Ot(this),t)},subarray:function(t,n){var r=Ot(this),e=r.length,o=g(t,e);return new(T(r,r[gt]))(r.buffer,r.byteOffset+o*r.BYTES_PER_ELEMENT,d((void 0===n?e:g(n,e))-o))}},kt=function(t,n){return At(this,lt.call(Ot(this),t,n))},Bt=function(t){Ot(this);var n=Et(arguments[1],1),r=this.length,e=x(t),o=d(e.length),i=0;if(o+n>r)throw G("Wrong length!");for(;i<o;)this[n+i]=e[i++]},Nt={entries:function(){return it.call(Ot(this))},keys:function(){return ot.call(Ot(this))},values:function(){return et.call(Ot(this))}},Ct=function(t,n){return _(t)&&t[bt]&&"symbol"!=typeof n&&n in t&&String(+n)==String(n)},Ut=function(t,n){return Ct(t,n=m(n,!0))?l(2,t[n]):q(t,n)},Dt=function(t,n,r){return!(Ct(t,n=m(n,!0))&&_(r)&&b(r,"value"))||b(r,"get")||b(r,"set")||r.configurable||b(r,"writable")&&!r.writable||b(r,"enumerable")&&!r.enumerable?W(t,n,r):(t[n]=r.value,t)};mt||(D.f=Ut,U.f=Dt),u(u.S+u.F*!mt,"Object",{getOwnPropertyDescriptor:Ut,defineProperty:Dt}),i(function(){ht.call({})})&&(ht=pt=function(){return ft.call(this)});var Wt=p({},It);p(Wt,Nt),h(Wt,vt,Nt.values),p(Wt,{slice:kt,set:Bt,constructor:function(){},toString:ht,toLocaleString:Lt}),Mt(Wt,"buffer","b"),Mt(Wt,"byteOffset","o"),Mt(Wt,"byteLength","l"),Mt(Wt,"length","e"),W(Wt,dt,{get:function(){return this[bt]}}),t.exports=function(t,n,r,a){a=!!a;var f=t+(a?"Clamped":"")+"Array",l="get"+t,p="set"+t,v=o[f],g=v||{},m=v&&O(v),b=!v||!c.ABV,x={},S=v&&v.prototype,A=function(t,r){var e=t._d;return e.v[l](r*n+e.o,xt)},j=function(t,r,e){var o=t._d;a&&(e=(e=Math.round(e))<0?0:e>255?255:255&e),o.v[p](r*n+o.o,e,xt)},M=function(t,n){W(t,n,{get:function(){return A(this,n)},set:function(t){return j(this,n,t)},enumerable:!0})};b?(v=r(function(t,r,e,o){s(t,v,f,"_d");var i,u,c,a,l=0,p=0;if(_(r)){if(!(r instanceof Y||"ArrayBuffer"==(a=w(r))||"SharedArrayBuffer"==a))return bt in r?jt(v,r):Rt.call(v,r);i=r,p=Et(e,n);var g=r.byteLength;if(void 0===o){if(g%n)throw G("Wrong length!");if((u=g-p)<0)throw G("Wrong length!")}else if((u=d(o)*n)+p>g)throw G("Wrong length!");c=u/n}else c=y(r),u=c*n,i=new Y(u);for(h(t,"_d",{b:i,o:p,l:u,e:c,v:new K(i)});l<c;)M(t,l++)}),S=v.prototype=E(Wt),h(S,"constructor",v)):i(function(){v(1)})&&i(function(){new v(-1)})&&k(function(t){new v,new v(null),new v(1.5),new v(t)},!0)||(v=r(function(t,r,e,o){s(t,v,f);var i;return _(r)?r instanceof Y||"ArrayBuffer"==(i=w(r))||"SharedArrayBuffer"==i?void 0!==o?new g(r,Et(e,n),o):void 0!==e?new g(r,Et(e,n)):new g(r):bt in r?jt(v,r):Rt.call(v,r):new g(y(r))}),J(m!==Function.prototype?P(g).concat(P(m)):P(g),function(t){t in v||h(v,t,g[t])}),v.prototype=S,e||(S.constructor=v));var R=S[vt],F=!!R&&("values"==R.name||void 0==R.name),T=Nt.values;h(v,yt,!0),h(S,bt,f),h(S,wt,!0),h(S,gt,v),(a?new v(1)[dt]==f:dt in S)||W(S,dt,{get:function(){return f}}),x[f]=v,u(u.G+u.W+u.F*(v!=g),x),u(u.S,f,{BYTES_PER_ELEMENT:n}),u(u.S+u.F*i(function(){g.of.call(v,1)}),f,{from:Rt,of:Ft}),"BYTES_PER_ELEMENT"in S||h(S,"BYTES_PER_ELEMENT",n),u(u.P,f,It),B(f),u(u.P+u.F*St,f,{set:Bt}),u(u.P+u.F*!F,f,Nt),e||S.toString==ht||(S.toString=ht),u(u.P+u.F*i(function(){new v(1).slice()}),f,{slice:kt}),u(u.P+u.F*(i(function(){return[1,2].toLocaleString()!=new v([1,2]).toLocaleString()})||!i(function(){S.toLocaleString.call([1,2])})),f,{toLocaleString:Lt}),I[f]=F?R:T,e||F||h(S,vt,T)}}else t.exports=function(){}},function(t,n,r){var e=r(40),o=r(19),i=r(11),u=r(36),c=r(9),a=r(66),f=Object.getOwnPropertyDescriptor;n.f=r(8)?f:function(t,n){if(t=i(t),n=u(n,!0),a)try{return f(t,n)}catch(t){}if(c(t,n))return o(!e.f.call(t,n),t[n])}},function(t,n,r){var e=r(2),o=r(10),i=r(9),u=r(20)("src"),c=Function.toString,a=(""+c).split("toString");r(25).inspectSource=function(t){return c.call(t)},(t.exports=function(t,n,r,c){var f="function"==typeof r;f&&(i(r,"name")||o(r,"name",n)),t[n]!==r&&(f&&(i(r,u)||o(r,u,t[n]?""+t[n]:a.join(String(n)))),t===e?t[n]=r:c?t[n]?t[n]=r:o(t,n,r):(delete t[n],o(t,n,r)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[u]||c.call(this)})},function(t,n,r){var e=r(20)("meta"),o=r(1),i=r(9),u=r(6).f,c=0,a=Object.isExtensible||function(){return!0},f=!r(5)(function(){return a(Object.preventExtensions({}))}),s=function(t){u(t,e,{value:{i:"O"+ ++c,w:{}}})},l=function(t,n){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,e)){if(!a(t))return"F";if(!n)return"E";s(t)}return t[e].i},h=function(t,n){if(!i(t,e)){if(!a(t))return!0;if(!n)return!1;s(t)}return t[e].w},p=function(t){return f&&v.NEED&&a(t)&&!i(t,e)&&s(t),t},v=t.exports={KEY:e,NEED:!1,fastKey:l,getWeak:h,onFreeze:p}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n){var r=0,e=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++r+e).toString(36))}},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n){var r=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?e:r)(t)}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n,r){var e=r(69),o=r(53);t.exports=Object.keys||function(t){return e(t,o)}},function(t,n){var r=t.exports={version:"2.5.1"};"number"==typeof __e&&(__e=r)},function(t,n){t.exports=!1},function(t,n,r){var e=r(17);t.exports=function(t,n,r){for(var o in n)e(t,o,n[o],r);return t}},function(t,n){t.exports=function(t,n,r,e){if(!(t instanceof n)||void 0!==e&&e in t)throw TypeError(r+": incorrect invocation!");return t}},function(t,n){var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)}},function(t,n,r){var e=r(22),o=Math.max,i=Math.min;t.exports=function(t,n){return t=e(t),t<0?o(t+n,0):i(t,n)}},function(t,n,r){var e=r(6).f,o=r(9),i=r(4)("toStringTag");t.exports=function(t,n,r){t&&!o(t=r?t:t.prototype,i)&&e(t,i,{configurable:!0,value:n})}},function(t,n){t.exports={}},function(t,n,r){var e=r(9),o=r(14),i=r(51)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),e(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,n,r){var e=r(4)("unscopables"),o=Array.prototype;void 0==o[e]&&r(10)(o,e,{}),t.exports=function(t){o[e][t]=!0}},function(t,n,r){var e=r(1);t.exports=function(t,n){if(!e(t)||t._t!==n)throw TypeError("Incompatible receiver, "+n+" required!");return t}},function(t,n,r){var e=r(1);t.exports=function(t,n){if(!e(t))return t;var r,o;if(n&&"function"==typeof(r=t.toString)&&!e(o=r.call(t)))return o;if("function"==typeof(r=t.valueOf)&&!e(o=r.call(t)))return o;if(!n&&"function"==typeof(r=t.toString)&&!e(o=r.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,n,r){var e=r(69),o=r(53).concat("length","prototype");n.f=Object.getOwnPropertyNames||function(t){return e(t,o)}},function(t,n,r){var e=r(3),o=r(95),i=r(53),u=r(51)("IE_PROTO"),c=function(){},a=function(){var t,n=r(47)("iframe"),e=i.length;for(n.style.display="none",r(70).appendChild(n),n.src="javascript:",t=n.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),a=t.F;e--;)delete a.prototype[i[e]];return a()};t.exports=Object.create||function(t,n){var r;return null!==t?(c.prototype=e(t),r=new c,c.prototype=null,r[u]=t):r=a(),void 0===n?r:o(r,n)}},function(t,n,r){var e=r(13),o=r(49),i=r(14),u=r(7),c=r(96);t.exports=function(t,n){var r=1==t,a=2==t,f=3==t,s=4==t,l=6==t,h=5==t||l,p=n||c;return function(n,c,v){for(var d,y,g=i(n),m=o(g),b=e(c,v,3),w=u(m.length),_=0,x=r?p(n,w):a?p(n,0):void 0;w>_;_++)if((h||_ in m)&&(d=m[_],y=b(d,_,g),t))if(r)x[_]=y;else if(y)switch(t){case 3:return!0;case 5:return d;case 6:return _;case 2:x.push(d)}else if(s)return!1;return l?-1:f||s?s:x}}},function(t,n){n.f={}.propertyIsEnumerable},function(t,n,r){"use strict";var e=r(2),o=r(6),i=r(8),u=r(4)("species");t.exports=function(t){var n=e[t];i&&n&&!n[u]&&o.f(n,u,{configurable:!0,get:function(){return this}})}},function(t,n,r){var e=r(4)("iterator"),o=!1;try{var i=[7][e]();i.return=function(){o=!0},Array.from(i,function(){throw 2})}catch(t){}t.exports=function(t,n){if(!n&&!o)return!1;var r=!1;try{var i=[7],u=i[e]();u.next=function(){return{done:r=!0}},i[e]=function(){return u},t(i)}catch(t){}return r}},function(t,n,r){var e=r(13),o=r(76),i=r(57),u=r(3),c=r(7),a=r(58),f={},s={},n=t.exports=function(t,n,r,l,h){var p,v,d,y,g=h?function(){return t}:a(t),m=e(r,l,n?2:1),b=0;if("function"!=typeof g)throw TypeError(t+" is not iterable!");if(i(g)){for(p=c(t.length);p>b;b++)if((y=n?m(u(v=t[b])[0],v[1]):m(t[b]))===f||y===s)return y}else for(d=g.call(t);!(v=d.next()).done;)if((y=o(d,m,v.value,n))===f||y===s)return y};n.BREAK=f,n.RETURN=s},function(t,n,r){"use strict";var e=r(2),o=r(0),i=r(17),u=r(27),c=r(18),a=r(43),f=r(28),s=r(1),l=r(5),h=r(42),p=r(31),v=r(108);t.exports=function(t,n,r,d,y,g){var m=e[t],b=m,w=y?"set":"add",_=b&&b.prototype,x={},S=function(t){var n=_[t];i(_,t,"delete"==t?function(t){return!(g&&!s(t))&&n.call(this,0===t?0:t)}:"has"==t?function(t){return!(g&&!s(t))&&n.call(this,0===t?0:t)}:"get"==t?function(t){return g&&!s(t)?void 0:n.call(this,0===t?0:t)}:"add"==t?function(t){return n.call(this,0===t?0:t),this}:function(t,r){return n.call(this,0===t?0:t,r),this})};if("function"==typeof b&&(g||_.forEach&&!l(function(){(new b).entries().next()}))){var E=new b,O=E[w](g?{}:-0,1)!=E,P=l(function(){E.has(1)}),A=h(function(t){new b(t)}),j=!g&&l(function(){for(var t=new b,n=5;n--;)t[w](n,n);return!t.has(-0)});A||(b=n(function(n,r){f(n,b,t);var e=v(new m,n,b);return void 0!=r&&a(r,y,e[w],e),e}),b.prototype=_,_.constructor=b),(P||j)&&(S("delete"),S("has"),y&&S("get")),(j||O)&&S(w),g&&_.clear&&delete _.clear}else b=d.getConstructor(n,t,y,w),u(b.prototype,r),c.NEED=!0;return p(b,t),x[t]=b,o(o.G+o.W+o.F*(b!=m),x),g||d.setStrong(b,t,y),b}},function(t,n){n.f=Object.getOwnPropertySymbols},function(t,n,r){"use strict";var e=r(10),o=r(17),i=r(5),u=r(23),c=r(4);t.exports=function(t,n,r){var a=c(t),f=r(u,a,""[t]),s=f[0],l=f[1];i(function(){var n={};return n[a]=function(){return 7},7!=""[t](n)})&&(o(String.prototype,t,s),e(RegExp.prototype,a,2==n?function(t,n){return l.call(t,this,n)}:function(t){return l.call(t,this)}))}},function(t,n,r){var e=r(1),o=r(2).document,i=e(o)&&e(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,n,r){for(var e,o=r(2),i=r(10),u=r(20),c=u("typed_array"),a=u("view"),f=!(!o.ArrayBuffer||!o.DataView),s=f,l=0,h="Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(",");l<9;)(e=o[h[l++]])?(i(e.prototype,c,!0),i(e.prototype,a,!0)):s=!1;t.exports={ABV:f,CONSTR:s,TYPED:c,VIEW:a}},function(t,n,r){var e=r(29);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==e(t)?t.split(""):Object(t)}},function(t,n,r){var e=r(11),o=r(7),i=r(30);t.exports=function(t){return function(n,r,u){var c,a=e(n),f=o(a.length),s=i(u,f);if(t&&r!=r){for(;f>s;)if((c=a[s++])!=c)return!0}else for(;f>s;s++)if((t||s in a)&&a[s]===r)return t||s||0;return!t&&-1}}},function(t,n,r){var e=r(52)("keys"),o=r(20);t.exports=function(t){return e[t]||(e[t]=o(t))}},function(t,n,r){var e=r(2),o=e["__core-js_shared__"]||(e["__core-js_shared__"]={});t.exports=function(t){return o[t]||(o[t]={})}},function(t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,n,r){"use strict";var e=r(14),o=r(30),i=r(7);t.exports=function(t){for(var n=e(this),r=i(n.length),u=arguments.length,c=o(u>1?arguments[1]:void 0,r),a=u>2?arguments[2]:void 0,f=void 0===a?r:o(a,r);f>c;)n[c++]=t;return n}},function(t,n,r){var e=r(3),o=r(21),i=r(4)("species");t.exports=function(t,n){var r,u=e(t).constructor;return void 0===u||void 0==(r=e(u)[i])?n:o(r)}},function(t,n,r){var e=r(29),o=r(4)("toStringTag"),i="Arguments"==e(function(){return arguments}()),u=function(t,n){try{return t[n]}catch(t){}};t.exports=function(t){var n,r,c;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=u(n=Object(t),o))?r:i?e(n):"Object"==(c=e(n))&&"function"==typeof n.callee?"Arguments":c}},function(t,n,r){var e=r(32),o=r(4)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(e.Array===t||i[o]===t)}},function(t,n,r){var e=r(56),o=r(4)("iterator"),i=r(32);t.exports=r(25).getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||i[e(t)]}},function(t,n,r){"use strict";var e=r(34),o=r(72),i=r(32),u=r(11);t.exports=r(73)(Array,"Array",function(t,n){this._t=u(t),this._i=0,this._k=n},function(){var t=this._t,n=this._k,r=this._i++;return!t||r>=t.length?(this._t=void 0,o(1)):"keys"==n?o(0,r):"values"==n?o(0,t[r]):o(0,[r,t[r]])},"values"),i.Arguments=i.Array,e("keys"),e("values"),e("entries")},function(t,n,r){var e,o,i,u=r(13),c=r(80),a=r(70),f=r(47),s=r(2),l=s.process,h=s.setImmediate,p=s.clearImmediate,v=s.MessageChannel,d=s.Dispatch,y=0,g={},m=function(){var t=+this;if(g.hasOwnProperty(t)){var n=g[t];delete g[t],n()}},b=function(t){m.call(t.data)};h&&p||(h=function(t){for(var n=[],r=1;arguments.length>r;)n.push(arguments[r++]);return g[++y]=function(){c("function"==typeof t?t:Function(t),n)},e(y),y},p=function(t){delete g[t]},"process"==r(29)(l)?e=function(t){l.nextTick(u(m,t,1))}:d&&d.now?e=function(t){d.now(u(m,t,1))}:v?(o=new v,i=o.port2,o.port1.onmessage=b,e=u(i.postMessage,i,1)):s.addEventListener&&"function"==typeof postMessage&&!s.importScripts?(e=function(t){s.postMessage(t+"","*")},s.addEventListener("message",b,!1)):e="onreadystatechange"in f("script")?function(t){a.appendChild(f("script")).onreadystatechange=function(){a.removeChild(this),m.call(t)}}:function(t){setTimeout(u(m,t,1),0)}),t.exports={set:h,clear:p}},function(t,n,r){var e=r(86),o=r(23);t.exports=function(t,n,r){if(e(n))throw TypeError("String#"+r+" doesn't accept regex!");return String(o(t))}},function(t,n,r){var e=r(4)("match");t.exports=function(t){var n=/./;try{"/./"[t](n)}catch(r){try{return n[e]=!1,!"/./"[t](n)}catch(t){}}return!0}},function(t,n,r){"use strict";var e=r(6),o=r(19);t.exports=function(t,n,r){n in t?e.f(t,n,o(0,r)):t[n]=r}},function(t,n){t.exports=Math.sign||function(t){return 0==(t=+t)||t!=t?t:t<0?-1:1}},function(t,n){var r=Math.expm1;t.exports=!r||r(10)>22025.465794806718||r(10)<22025.465794806718||-2e-17!=r(-2e-17)?function(t){return 0==(t=+t)?t:t>-1e-6&&t<1e-6?t+t*t/2:Math.exp(t)-1}:r},function(t,n,r){t.exports=!r(8)&&!r(5)(function(){return 7!=Object.defineProperty(r(47)("div"),"a",{get:function(){return 7}}).a})},function(t,n,r){"use strict";function e(t,n,r){var e,o,i,u=Array(r),c=8*r-n-1,a=(1<<c)-1,f=a>>1,s=23===n?C(2,-24)-C(2,-77):0,l=0,h=t<0||0===t&&1/t<0?1:0;for(t=N(t),t!=t||t===k?(o=t!=t?1:0,e=a):(e=U(D(t)/W),t*(i=C(2,-e))<1&&(e--,i*=2),t+=e+f>=1?s/i:s*C(2,1-f),t*i>=2&&(e++,i/=2),e+f>=a?(o=0,e=a):e+f>=1?(o=(t*i-1)*C(2,n),e+=f):(o=t*C(2,f-1)*C(2,n),e=0));n>=8;u[l++]=255&o,o/=256,n-=8);for(e=e<<n|o,c+=n;c>0;u[l++]=255&e,e/=256,c-=8);return u[--l]|=128*h,u}function o(t,n,r){var e,o=8*r-n-1,i=(1<<o)-1,u=i>>1,c=o-7,a=r-1,f=t[a--],s=127&f;for(f>>=7;c>0;s=256*s+t[a],a--,c-=8);for(e=s&(1<<-c)-1,s>>=-c,c+=n;c>0;e=256*e+t[a],a--,c-=8);if(0===s)s=1-u;else{if(s===i)return e?NaN:f?-k:k;e+=C(2,n),s-=u}return(f?-1:1)*e*C(2,s-n)}function i(t){return t[3]<<24|t[2]<<16|t[1]<<8|t[0]}function u(t){return[255&t]}function c(t){return[255&t,t>>8&255]}function a(t){return[255&t,t>>8&255,t>>16&255,t>>24&255]}function f(t){return e(t,52,8)}function s(t){return e(t,23,4)}function l(t,n,r){P(t[M],n,{get:function(){return this[r]}})}function h(t,n,r,e){var o=+r,i=E(o);if(i+n>t[G])throw I(R);var u=t[q]._b,c=i+t[V],a=u.slice(c,c+n);return e?a:a.reverse()}function p(t,n,r,e,o,i){var u=+r,c=E(u);if(c+n>t[G])throw I(R);for(var a=t[q]._b,f=c+t[V],s=e(+o),l=0;l<n;l++)a[f+l]=s[i?l:n-l-1]}var v=r(2),d=r(8),y=r(26),g=r(48),m=r(10),b=r(27),w=r(5),_=r(28),x=r(22),S=r(7),E=r(68),O=r(37).f,P=r(6).f,A=r(54),j=r(31),M="prototype",R="Wrong index!",F=v.ArrayBuffer,T=v.DataView,L=v.Math,I=v.RangeError,k=v.Infinity,B=F,N=L.abs,C=L.pow,U=L.floor,D=L.log,W=L.LN2,q=d?"_b":"buffer",G=d?"_l":"byteLength",V=d?"_o":"byteOffset";if(g.ABV){if(!w(function(){F(1)})||!w(function(){new F(-1)})||w(function(){return new F,new F(1.5),new F(NaN),"ArrayBuffer"!=F.name})){F=function(t){return _(this,F),new B(E(t))};for(var H,z=F[M]=B[M],Y=O(B),K=0;Y.length>K;)(H=Y[K++])in F||m(F,H,B[H]);y||(z.constructor=F)}var J=new T(new F(2)),X=T[M].setInt8;J.setInt8(0,2147483648),J.setInt8(1,2147483649),!J.getInt8(0)&&J.getInt8(1)||b(T[M],{setInt8:function(t,n){X.call(this,t,n<<24>>24)},setUint8:function(t,n){X.call(this,t,n<<24>>24)}},!0)}else F=function(t){_(this,F,"ArrayBuffer");var n=E(t);this._b=A.call(Array(n),0),this[G]=n},T=function(t,n,r){_(this,T,"DataView"),_(t,F,"DataView");var e=t[G],o=x(n);if(o<0||o>e)throw I("Wrong offset!");if(r=void 0===r?e-o:S(r),o+r>e)throw I("Wrong length!");this[q]=t,this[V]=o,this[G]=r},d&&(l(F,"byteLength","_l"),l(T,"buffer","_b"),l(T,"byteLength","_l"),l(T,"byteOffset","_o")),b(T[M],{getInt8:function(t){return h(this,1,t)[0]<<24>>24},getUint8:function(t){return h(this,1,t)[0]},getInt16:function(t){var n=h(this,2,t,arguments[1]);return(n[1]<<8|n[0])<<16>>16},getUint16:function(t){var n=h(this,2,t,arguments[1]);return n[1]<<8|n[0]},getInt32:function(t){return i(h(this,4,t,arguments[1]))},getUint32:function(t){return i(h(this,4,t,arguments[1]))>>>0},getFloat32:function(t){return o(h(this,4,t,arguments[1]),23,4)},getFloat64:function(t){return o(h(this,8,t,arguments[1]),52,8)},setInt8:function(t,n){p(this,1,t,u,n)},setUint8:function(t,n){p(this,1,t,u,n)},setInt16:function(t,n){p(this,2,t,c,n,arguments[2])},setUint16:function(t,n){p(this,2,t,c,n,arguments[2])},setInt32:function(t,n){p(this,4,t,a,n,arguments[2])},setUint32:function(t,n){p(this,4,t,a,n,arguments[2])},setFloat32:function(t,n){p(this,4,t,s,n,arguments[2])},setFloat64:function(t,n){p(this,8,t,f,n,arguments[2])}});j(F,"ArrayBuffer"),j(T,"DataView"),m(T[M],g.VIEW,!0),n.ArrayBuffer=F,n.DataView=T},function(t,n,r){var e=r(22),o=r(7);t.exports=function(t){if(void 0===t)return 0;var n=e(t),r=o(n);if(n!==r)throw RangeError("Wrong length!");return r}},function(t,n,r){var e=r(9),o=r(11),i=r(50)(!1),u=r(51)("IE_PROTO");t.exports=function(t,n){var r,c=o(t),a=0,f=[];for(r in c)r!=u&&e(c,r)&&f.push(r);for(;n.length>a;)e(c,r=n[a++])&&(~i(f,r)||f.push(r));return f}},function(t,n,r){var e=r(2).document;t.exports=e&&e.documentElement},function(t,n,r){var e=r(29);t.exports=Array.isArray||function(t){return"Array"==e(t)}},function(t,n){t.exports=function(t,n){return{value:n,done:!!t}}},function(t,n,r){"use strict";var e=r(26),o=r(0),i=r(17),u=r(10),c=r(9),a=r(32),f=r(98),s=r(31),l=r(33),h=r(4)("iterator"),p=!([].keys&&"next"in[].keys()),v=function(){return this};t.exports=function(t,n,r,d,y,g,m){f(r,n,d);var b,w,_,x=function(t){if(!p&&t in P)return P[t];switch(t){case"keys":case"values":return function(){return new r(this,t)}}return function(){return new r(this,t)}},S=n+" Iterator",E="values"==y,O=!1,P=t.prototype,A=P[h]||P["@@iterator"]||y&&P[y],j=A||x(y),M=y?E?x("entries"):j:void 0,R="Array"==n?P.entries||A:A;if(R&&(_=l(R.call(new t)))!==Object.prototype&&_.next&&(s(_,S,!0),e||c(_,h)||u(_,h,v)),E&&A&&"values"!==A.name&&(O=!0,j=function(){return A.call(this)}),e&&!m||!p&&!O&&P[h]||u(P,h,j),a[n]=j,a[S]=v,y)if(b={values:E?j:x("values"),keys:g?j:x("keys"),entries:M},m)for(w in b)w in P||i(P,w,b[w]);else o(o.P+o.F*(p||O),n,b);return b}},function(t,n,r){"use strict";var e=r(14),o=r(30),i=r(7);t.exports=[].copyWithin||function(t,n){var r=e(this),u=i(r.length),c=o(t,u),a=o(n,u),f=arguments.length>2?arguments[2]:void 0,s=Math.min((void 0===f?u:o(f,u))-a,u-c),l=1;for(a<c&&c<a+s&&(l=-1,a+=s-1,c+=s-1);s-- >0;)a in r?r[c]=r[a]:delete r[c],c+=l,a+=l;return r}},function(t,n,r){"use strict";var e=r(6).f,o=r(38),i=r(27),u=r(13),c=r(28),a=r(43),f=r(73),s=r(72),l=r(41),h=r(8),p=r(18).fastKey,v=r(35),d=h?"_s":"size",y=function(t,n){var r,e=p(n);if("F"!==e)return t._i[e];for(r=t._f;r;r=r.n)if(r.k==n)return r};t.exports={getConstructor:function(t,n,r,f){var s=t(function(t,e){c(t,s,n,"_i"),t._t=n,t._i=o(null),t._f=void 0,t._l=void 0,t[d]=0,void 0!=e&&a(e,r,t[f],t)});return i(s.prototype,{clear:function(){for(var t=v(this,n),r=t._i,e=t._f;e;e=e.n)e.r=!0,e.p&&(e.p=e.p.n=void 0),delete r[e.i];t._f=t._l=void 0,t[d]=0},delete:function(t){var r=v(this,n),e=y(r,t);if(e){var o=e.n,i=e.p;delete r._i[e.i],e.r=!0,i&&(i.n=o),o&&(o.p=i),r._f==e&&(r._f=o),r._l==e&&(r._l=i),r[d]--}return!!e},forEach:function(t){v(this,n);for(var r,e=u(t,arguments.length>1?arguments[1]:void 0,3);r=r?r.n:this._f;)for(e(r.v,r.k,this);r&&r.r;)r=r.p},has:function(t){return!!y(v(this,n),t)}}),h&&e(s.prototype,"size",{get:function(){return v(this,n)[d]}}),s},def:function(t,n,r){var e,o,i=y(t,n);return i?i.v=r:(t._l=i={i:o=p(n,!0),k:n,v:r,p:e=t._l,n:void 0,r:!1},t._f||(t._f=i),e&&(e.n=i),t[d]++,"F"!==o&&(t._i[o]=i)),t},getEntry:y,setStrong:function(t,n,r){f(t,n,function(t,r){this._t=v(t,n),this._k=r,this._l=void 0},function(){for(var t=this,n=t._k,r=t._l;r&&r.r;)r=r.p;return t._t&&(t._l=r=r?r.n:t._t._f)?"keys"==n?s(0,r.k):"values"==n?s(0,r.v):s(0,[r.k,r.v]):(t._t=void 0,s(1))},r?"entries":"values",!r,!0),l(n)}}},function(t,n,r){var e=r(3);t.exports=function(t,n,r,o){try{return o?n(e(r)[0],r[1]):n(r)}catch(n){var i=t.return;throw void 0!==i&&e(i.call(t)),n}}},function(t,n,r){var e=r(1),o=r(3),i=function(t,n){if(o(t),!e(n)&&null!==n)throw TypeError(n+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,n,e){try{e=r(13)(Function.call,r(16).f(Object.prototype,"__proto__").set,2),e(t,[]),n=!(t instanceof Array)}catch(t){n=!0}return function(t,r){return i(t,r),n?t.__proto__=r:e(t,r),t}}({},!1):void 0),check:i}},function(t,n,r){"use strict";var e=r(24),o=r(45),i=r(40),u=r(14),c=r(49),a=Object.assign;t.exports=!a||r(5)(function(){var t={},n={},r=Symbol(),e="abcdefghijklmnopqrst";return t[r]=7,e.split("").forEach(function(t){n[t]=t}),7!=a({},t)[r]||Object.keys(a({},n)).join("")!=e})?function(t,n){for(var r=u(t),a=arguments.length,f=1,s=o.f,l=i.f;a>f;)for(var h,p=c(arguments[f++]),v=s?e(p).concat(s(p)):e(p),d=v.length,y=0;d>y;)l.call(p,h=v[y++])&&(r[h]=p[h]);return r}:a},function(t,n,r){"use strict";var e=r(27),o=r(18).getWeak,i=r(3),u=r(1),c=r(28),a=r(43),f=r(39),s=r(9),l=r(35),h=f(5),p=f(6),v=0,d=function(t){return t._l||(t._l=new y)},y=function(){this.a=[]},g=function(t,n){return h(t.a,function(t){return t[0]===n})};y.prototype={get:function(t){var n=g(this,t);if(n)return n[1]},has:function(t){return!!g(this,t)},set:function(t,n){var r=g(this,t);r?r[1]=n:this.a.push([t,n])},delete:function(t){var n=p(this.a,function(n){return n[0]===t});return~n&&this.a.splice(n,1),!!~n}},t.exports={getConstructor:function(t,n,r,i){var f=t(function(t,e){c(t,f,n,"_i"),t._t=n,t._i=v++,t._l=void 0,void 0!=e&&a(e,r,t[i],t)});return e(f.prototype,{delete:function(t){if(!u(t))return!1;var r=o(t);return!0===r?d(l(this,n)).delete(t):r&&s(r,this._i)&&delete r[this._i]},has:function(t){if(!u(t))return!1;var r=o(t);return!0===r?d(l(this,n)).has(t):r&&s(r,this._i)}}),f},def:function(t,n,r){var e=o(i(n),!0);return!0===e?d(t).set(n,r):e[t._i]=r,t},ufstore:d}},function(t,n){t.exports=function(t,n,r){var e=void 0===r;switch(n.length){case 0:return e?t():t.call(r);case 1:return e?t(n[0]):t.call(r,n[0]);case 2:return e?t(n[0],n[1]):t.call(r,n[0],n[1]);case 3:return e?t(n[0],n[1],n[2]):t.call(r,n[0],n[1],n[2]);case 4:return e?t(n[0],n[1],n[2],n[3]):t.call(r,n[0],n[1],n[2],n[3])}return t.apply(r,n)}},function(t,n,r){var e=r(37),o=r(45),i=r(3),u=r(2).Reflect;t.exports=u&&u.ownKeys||function(t){var n=e.f(i(t)),r=o.f;return r?n.concat(r(t)):n}},function(t,n,r){"use strict";function e(t){var n,r;this.promise=new t(function(t,e){if(void 0!==n||void 0!==r)throw TypeError("Bad Promise constructor");n=t,r=e}),this.resolve=o(n),this.reject=o(r)}var o=r(21);t.exports.f=function(t){return new e(t)}},function(t,n,r){n.f=r(4)},function(t,n,r){var e=r(11),o=r(37).f,i={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return o(t)}catch(t){return u.slice()}};t.exports.f=function(t){return u&&"[object Window]"==i.call(t)?c(t):o(e(t))}},function(t,n,r){"use strict";var e=r(22),o=r(23);t.exports=function(t){var n=String(o(this)),r="",i=e(t);if(i<0||i==1/0)throw RangeError("Count can't be negative");for(;i>0;(i>>>=1)&&(n+=n))1&i&&(r+=n);return r}},function(t,n,r){var e=r(1),o=r(29),i=r(4)("match");t.exports=function(t){var n;return e(t)&&(void 0!==(n=t[i])?!!n:"RegExp"==o(t))}},function(t,n,r){var e=r(1),o=Math.floor;t.exports=function(t){return!e(t)&&isFinite(t)&&o(t)===t}},function(t,n){t.exports=Math.log1p||function(t){return(t=+t)>-1e-8&&t<1e-8?t-t*t/2:Math.log(1+t)}},function(t,n,r){var e=r(24),o=r(11),i=r(40).f;t.exports=function(t){return function(n){for(var r,u=o(n),c=e(u),a=c.length,f=0,s=[];a>f;)i.call(u,r=c[f++])&&s.push(t?[r,u[r]]:u[r]);return s}}},function(t,n,r){var e=r(7),o=r(85),i=r(23);t.exports=function(t,n,r,u){var c=String(i(t)),a=c.length,f=void 0===r?" ":String(r),s=e(n);if(s<=a||""==f)return c;var l=s-a,h=o.call(f,Math.ceil(l/f.length));return h.length>l&&(h=h.slice(0,l)),u?h+c:c+h}},function(t,n){t.exports={language:"en",endpoint:"https://osmose.openstreetmap.fr/api/0.2"}},function(t,n,r){"use strict";function e(t){return function(){var n=t.apply(this,arguments);return new Promise(function(t,r){function e(o,i){try{var u=n[o](i),c=u.value}catch(t){return void r(t)}if(!u.done)return Promise.resolve(c).then(function(t){e("next",t)},function(t){e("throw",t)});t(c)}return e("next")})}}function o(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e])}return t},u=function(){function t(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(n,r,e){return r&&t(n.prototype,r),e&&t(n,e),n}}();r(93),r(94),r(99),r(100),r(101),r(102),r(103),r(104),r(105),r(106),r(107),r(109),r(110),r(111),r(112),r(113),r(115),r(116),r(117),r(118),r(119),r(120),r(121),r(122),r(123),r(124),r(125),r(126),r(130),r(133),r(134),r(135),r(136),r(137),r(138),r(139),r(140),r(141),r(142),r(143),r(144),r(146),r(147),r(148),r(149),r(151),r(152),r(153),r(154),r(155),r(157),r(158),r(159),r(160),r(161),r(162),r(163),r(164),r(165),r(166),r(59),r(167),r(168),r(169),r(170),r(171),r(172),r(173),r(174),r(175),r(176),r(177),r(178),r(179),r(180),r(181),r(183),r(184),r(185),r(186),r(187),r(188),r(189),r(190),r(191),r(192),r(193),r(194),r(195),r(196),r(197),r(198),r(199),r(200),r(201);var c=r(91),a=function(t){return t&&t.__esModule?t:{default:t}}(c),f=r(202),s=function(){function t(n){o(this,t),this._options=i({},a.default,n)}return u(t,[{key:"fetchErrors",value:function(){function t(t){return n.apply(this,arguments)}var n=e(regeneratorRuntime.mark(function t(n){var r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,f.fetchErrorsRequest)(this._options.endpoint,this._options.language,n);case 2:return r=t.sent,t.abrupt("return",r.errors.map(function(t){return r.description.reduce(function(n,r,e){return n[r]=t[e],n},{})}));case 4:case"end":return t.stop()}},t,this)}));return t}()},{key:"fetchError",value:function(){function t(t){return n.apply(this,arguments)}var n=e(regeneratorRuntime.mark(function t(n){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,f.fetchErrorRequest)(this._options.endpoint,this._options.language,n);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t,this)}));return t}()},{key:"closeError",value:function(){function t(t){return n.apply(this,arguments)}var n=e(regeneratorRuntime.mark(function t(n){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,f.closeErrorRequest)(this._options.endpoint,this._options.language,n);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t,this)}));return t}()},{key:"falseError",value:function(){function t(t){return n.apply(this,arguments)}var n=e(regeneratorRuntime.mark(function t(n){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,f.falseErrorRequest)(this._options.endpoint,this._options.language,n);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t,this)}));return t}()},{key:"fetchSupportedCountries",value:function(){function t(){return n.apply(this,arguments)}var n=e(regeneratorRuntime.mark(function t(){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,f.fetchSupportedCountriesRequest)(this._options.endpoint,this._options.language);case 2:return n=t.sent,t.abrupt("return",n.countries);case 4:case"end":return t.stop()}},t,this)}));return t}()},{key:"fetchItemCategories",value:function(){function t(){return n.apply(this,arguments)}var n=e(regeneratorRuntime.mark(function t(){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,f.fetchItemCategoriesRequest)(this._options.endpoint,this._options.language);case 2:return n=t.sent,t.abrupt("return",n.categories.map(function(t){return{id:t.categ,name:t.menu,items:t.item.map(function(t){return{id:t.item,name:t.menu,tags:t.tags,count:t.number,levels:t.levels}})}}));case 4:case"end":return t.stop()}},t,this)}));return t}()},{key:"fetchItems",value:function(){function t(t){return n.apply(this,arguments)}var n=e(regeneratorRuntime.mark(function t(n){var r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,f.fetchItemsRequest)(this._options.endpoint,this._options.language);case 2:if(r=t.sent,!n){t.next=7;break}return t.abrupt("return",r.items.map(function(t){return{id:t[0],name:t[1][n]}}));case 7:return t.abrupt("return",r.items.map(function(t){return{id:t[0],name:t[1]}}));case 8:case"end":return t.stop()}},t,this)}));return t}()},{key:"language",get:function(){return this._options.language}},{key:"endpoint",get:function(){return this._options.endpoint}}]),t}();n.default=s},function(t,n,r){"use strict";var e=r(0),o=r(48),i=r(67),u=r(3),c=r(30),a=r(7),f=r(1),s=r(2).ArrayBuffer,l=r(55),h=i.ArrayBuffer,p=i.DataView,v=o.ABV&&s.isView,d=h.prototype.slice,y=o.VIEW;e(e.G+e.W+e.F*(s!==h),{ArrayBuffer:h}),e(e.S+e.F*!o.CONSTR,"ArrayBuffer",{isView:function(t){return v&&v(t)||f(t)&&y in t}}),e(e.P+e.U+e.F*r(5)(function(){return!new h(2).slice(1,void 0).byteLength}),"ArrayBuffer",{slice:function(t,n){if(void 0!==d&&void 0===n)return d.call(u(this),t);for(var r=u(this).byteLength,e=c(t,r),o=c(void 0===n?r:n,r),i=new(l(this,h))(a(o-e)),f=new p(this),s=new p(i),v=0;e<o;)s.setUint8(v++,f.getUint8(e++));return i}}),r(41)("ArrayBuffer")},function(t,n,r){r(15)("Int8",1,function(t){return function(n,r,e){return t(this,n,r,e)}})},function(t,n,r){var e=r(6),o=r(3),i=r(24);t.exports=r(8)?Object.defineProperties:function(t,n){o(t);for(var r,u=i(n),c=u.length,a=0;c>a;)e.f(t,r=u[a++],n[r]);return t}},function(t,n,r){var e=r(97);t.exports=function(t,n){return new(e(t))(n)}},function(t,n,r){var e=r(1),o=r(71),i=r(4)("species");t.exports=function(t){var n;return o(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!o(n.prototype)||(n=void 0),e(n)&&null===(n=n[i])&&(n=void 0)),void 0===n?Array:n}},function(t,n,r){"use strict";var e=r(38),o=r(19),i=r(31),u={};r(10)(u,r(4)("iterator"),function(){return this}),t.exports=function(t,n,r){t.prototype=e(u,{next:o(1,r)}),i(t,n+" Iterator")}},function(t,n,r){r(15)("Uint8",1,function(t){return function(n,r,e){return t(this,n,r,e)}})},function(t,n,r){r(15)("Uint8",1,function(t){return function(n,r,e){return t(this,n,r,e)}},!0)},function(t,n,r){r(15)("Int16",2,function(t){return function(n,r,e){return t(this,n,r,e)}})},function(t,n,r){r(15)("Uint16",2,function(t){return function(n,r,e){return t(this,n,r,e)}})},function(t,n,r){r(15)("Int32",4,function(t){return function(n,r,e){return t(this,n,r,e)}})},function(t,n,r){r(15)("Uint32",4,function(t){return function(n,r,e){return t(this,n,r,e)}})},function(t,n,r){r(15)("Float32",4,function(t){return function(n,r,e){return t(this,n,r,e)}})},function(t,n,r){r(15)("Float64",8,function(t){return function(n,r,e){return t(this,n,r,e)}})},function(t,n,r){"use strict";var e=r(75),o=r(35);t.exports=r(44)("Map",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{get:function(t){var n=e.getEntry(o(this,"Map"),t);return n&&n.v},set:function(t,n){return e.def(o(this,"Map"),0===t?0:t,n)}},e,!0)},function(t,n,r){var e=r(1),o=r(77).set;t.exports=function(t,n,r){var i,u=n.constructor;return u!==r&&"function"==typeof u&&(i=u.prototype)!==r.prototype&&e(i)&&o&&o(t,i),t}},function(t,n,r){"use strict";var e=r(75),o=r(35);t.exports=r(44)("Set",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function(t){return e.def(o(this,"Set"),t=0===t?0:t,t)}},e)},function(t,n,r){"use strict";var e,o=r(39)(0),i=r(17),u=r(18),c=r(78),a=r(79),f=r(1),s=r(5),l=r(35),h=u.getWeak,p=Object.isExtensible,v=a.ufstore,d={},y=function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},g={get:function(t){if(f(t)){var n=h(t);return!0===n?v(l(this,"WeakMap")).get(t):n?n[this._i]:void 0}},set:function(t,n){return a.def(l(this,"WeakMap"),t,n)}},m=t.exports=r(44)("WeakMap",y,g,a,!0,!0);s(function(){return 7!=(new m).set((Object.freeze||Object)(d),7).get(d)})&&(e=a.getConstructor(y,"WeakMap"),c(e.prototype,g),u.NEED=!0,o(["delete","has","get","set"],function(t){var n=m.prototype,r=n[t];i(n,t,function(n,o){if(f(n)&&!p(n)){this._f||(this._f=new e);var i=this._f[t](n,o);return"set"==t?this:i}return r.call(this,n,o)})}))},function(t,n,r){"use strict";var e=r(79),o=r(35);r(44)("WeakSet",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function(t){return e.def(o(this,"WeakSet"),t,!0)}},e,!1,!0)},function(t,n,r){var e=r(0),o=r(21),i=r(3),u=(r(2).Reflect||{}).apply,c=Function.apply;e(e.S+e.F*!r(5)(function(){u(function(){})}),"Reflect",{apply:function(t,n,r){var e=o(t),a=i(r);return u?u(e,n,a):c.call(e,n,a)}})},function(t,n,r){var e=r(0),o=r(38),i=r(21),u=r(3),c=r(1),a=r(5),f=r(114),s=(r(2).Reflect||{}).construct,l=a(function(){function t(){}return!(s(function(){},[],t)instanceof t)}),h=!a(function(){s(function(){})});e(e.S+e.F*(l||h),"Reflect",{construct:function(t,n){i(t),u(n);var r=arguments.length<3?t:i(arguments[2]);if(h&&!l)return s(t,n,r);if(t==r){switch(n.length){case 0:return new t;case 1:return new t(n[0]);case 2:return new t(n[0],n[1]);case 3:return new t(n[0],n[1],n[2]);case 4:return new t(n[0],n[1],n[2],n[3])}var e=[null];return e.push.apply(e,n),new(f.apply(t,e))}var a=r.prototype,p=o(c(a)?a:Object.prototype),v=Function.apply.call(t,p,n);return c(v)?v:p}})},function(t,n,r){"use strict";var e=r(21),o=r(1),i=r(80),u=[].slice,c={},a=function(t,n,r){if(!(n in c)){for(var e=[],o=0;o<n;o++)e[o]="a["+o+"]";c[n]=Function("F,a","return new F("+e.join(",")+")")}return c[n](t,r)};t.exports=Function.bind||function(t){var n=e(this),r=u.call(arguments,1),c=function(){var e=r.concat(u.call(arguments));return this instanceof c?a(n,e.length,e):i(n,e,t)};return o(n.prototype)&&(c.prototype=n.prototype),c}},function(t,n,r){var e=r(6),o=r(0),i=r(3),u=r(36);o(o.S+o.F*r(5)(function(){Reflect.defineProperty(e.f({},1,{value:1}),1,{value:2})}),"Reflect",{defineProperty:function(t,n,r){i(t),n=u(n,!0),i(r);try{return e.f(t,n,r),!0}catch(t){return!1}}})},function(t,n,r){var e=r(0),o=r(16).f,i=r(3);e(e.S,"Reflect",{deleteProperty:function(t,n){var r=o(i(t),n);return!(r&&!r.configurable)&&delete t[n]}})},function(t,n,r){function e(t,n){var r,c,s=arguments.length<3?t:arguments[2];return f(t)===s?t[n]:(r=o.f(t,n))?u(r,"value")?r.value:void 0!==r.get?r.get.call(s):void 0:a(c=i(t))?e(c,n,s):void 0}var o=r(16),i=r(33),u=r(9),c=r(0),a=r(1),f=r(3);c(c.S,"Reflect",{get:e})},function(t,n,r){var e=r(16),o=r(0),i=r(3);o(o.S,"Reflect",{getOwnPropertyDescriptor:function(t,n){return e.f(i(t),n)}})},function(t,n,r){var e=r(0),o=r(33),i=r(3);e(e.S,"Reflect",{getPrototypeOf:function(t){return o(i(t))}})},function(t,n,r){var e=r(0);e(e.S,"Reflect",{has:function(t,n){return n in t}})},function(t,n,r){var e=r(0),o=r(3),i=Object.isExtensible;e(e.S,"Reflect",{isExtensible:function(t){return o(t),!i||i(t)}})},function(t,n,r){var e=r(0);e(e.S,"Reflect",{ownKeys:r(81)})},function(t,n,r){var e=r(0),o=r(3),i=Object.preventExtensions;e(e.S,"Reflect",{preventExtensions:function(t){o(t);try{return i&&i(t),!0}catch(t){return!1}}})},function(t,n,r){function e(t,n,r){var a,h,p=arguments.length<4?t:arguments[3],v=i.f(s(t),n);if(!v){if(l(h=u(t)))return e(h,n,r,p);v=f(0)}return c(v,"value")?!(!1===v.writable||!l(p))&&(a=i.f(p,n)||f(0),a.value=r,o.f(p,n,a),!0):void 0!==v.set&&(v.set.call(p,r),!0)}var o=r(6),i=r(16),u=r(33),c=r(9),a=r(0),f=r(19),s=r(3),l=r(1);a(a.S,"Reflect",{set:e})},function(t,n,r){var e=r(0),o=r(77);o&&e(e.S,"Reflect",{setPrototypeOf:function(t,n){o.check(t,n);try{return o.set(t,n),!0}catch(t){return!1}}})},function(t,n,r){"use strict";var e,o,i,u,c=r(26),a=r(2),f=r(13),s=r(56),l=r(0),h=r(1),p=r(21),v=r(28),d=r(43),y=r(55),g=r(60).set,m=r(127)(),b=r(82),w=r(128),_=r(129),x=a.TypeError,S=a.process,E=a.Promise,O="process"==s(S),P=function(){},A=o=b.f,j=!!function(){try{var t=E.resolve(1),n=(t.constructor={})[r(4)("species")]=function(t){t(P,P)};return(O||"function"==typeof PromiseRejectionEvent)&&t.then(P)instanceof n}catch(t){}}(),M=function(t){var n;return!(!h(t)||"function"!=typeof(n=t.then))&&n},R=function(t,n){if(!t._n){t._n=!0;var r=t._c;m(function(){for(var e=t._v,o=1==t._s,i=0;r.length>i;)!function(n){var r,i,u=o?n.ok:n.fail,c=n.resolve,a=n.reject,f=n.domain;try{u?(o||(2==t._h&&L(t),t._h=1),!0===u?r=e:(f&&f.enter(),r=u(e),f&&f.exit()),r===n.promise?a(x("Promise-chain cycle")):(i=M(r))?i.call(r,c,a):c(r)):a(e)}catch(t){a(t)}}(r[i++]);t._c=[],t._n=!1,n&&!t._h&&F(t)})}},F=function(t){g.call(a,function(){var n,r,e,o=t._v,i=T(t);if(i&&(n=w(function(){O?S.emit("unhandledRejection",o,t):(r=a.onunhandledrejection)?r({promise:t,reason:o}):(e=a.console)&&e.error&&e.error("Unhandled promise rejection",o)}),t._h=O||T(t)?2:1),t._a=void 0,i&&n.e)throw n.v})},T=function(t){if(1==t._h)return!1;for(var n,r=t._a||t._c,e=0;r.length>e;)if(n=r[e++],n.fail||!T(n.promise))return!1;return!0},L=function(t){g.call(a,function(){var n;O?S.emit("rejectionHandled",t):(n=a.onrejectionhandled)&&n({promise:t,reason:t._v})})},I=function(t){var n=this;n._d||(n._d=!0,n=n._w||n,n._v=t,n._s=2,n._a||(n._a=n._c.slice()),R(n,!0))},k=function(t){var n,r=this;if(!r._d){r._d=!0,r=r._w||r;try{if(r===t)throw x("Promise can't be resolved itself");(n=M(t))?m(function(){var e={_w:r,_d:!1};try{n.call(t,f(k,e,1),f(I,e,1))}catch(t){I.call(e,t)}}):(r._v=t,r._s=1,R(r,!1))}catch(t){I.call({_w:r,_d:!1},t)}}};j||(E=function(t){v(this,E,"Promise","_h"),p(t),e.call(this);try{t(f(k,this,1),f(I,this,1))}catch(t){I.call(this,t)}},e=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},e.prototype=r(27)(E.prototype,{then:function(t,n){var r=A(y(this,E));return r.ok="function"!=typeof t||t,r.fail="function"==typeof n&&n,r.domain=O?S.domain:void 0,this._c.push(r),this._a&&this._a.push(r),this._s&&R(this,!1),r.promise},catch:function(t){return this.then(void 0,t)}}),i=function(){var t=new e;this.promise=t,this.resolve=f(k,t,1),this.reject=f(I,t,1)},b.f=A=function(t){return t===E||t===u?new i(t):o(t)}),l(l.G+l.W+l.F*!j,{Promise:E}),r(31)(E,"Promise"),r(41)("Promise"),u=r(25).Promise,l(l.S+l.F*!j,"Promise",{reject:function(t){var n=A(this);return(0,n.reject)(t),n.promise}}),l(l.S+l.F*(c||!j),"Promise",{resolve:function(t){return _(c&&this===u?E:this,t)}}),l(l.S+l.F*!(j&&r(42)(function(t){E.all(t).catch(P)})),"Promise",{all:function(t){var n=this,r=A(n),e=r.resolve,o=r.reject,i=w(function(){var r=[],i=0,u=1;d(t,!1,function(t){var c=i++,a=!1;r.push(void 0),u++,n.resolve(t).then(function(t){a||(a=!0,r[c]=t,--u||e(r))},o)}),--u||e(r)});return i.e&&o(i.v),r.promise},race:function(t){var n=this,r=A(n),e=r.reject,o=w(function(){d(t,!1,function(t){n.resolve(t).then(r.resolve,e)})});return o.e&&e(o.v),r.promise}})},function(t,n,r){var e=r(2),o=r(60).set,i=e.MutationObserver||e.WebKitMutationObserver,u=e.process,c=e.Promise,a="process"==r(29)(u);t.exports=function(){var t,n,r,f=function(){var e,o;for(a&&(e=u.domain)&&e.exit();t;){o=t.fn,t=t.next;try{o()}catch(e){throw t?r():n=void 0,e}}n=void 0,e&&e.enter()};if(a)r=function(){u.nextTick(f)};else if(i){var s=!0,l=document.createTextNode("");new i(f).observe(l,{characterData:!0}),r=function(){l.data=s=!s}}else if(c&&c.resolve){var h=c.resolve();r=function(){h.then(f)}}else r=function(){o.call(e,f)};return function(e){var o={fn:e,next:void 0};n&&(n.next=o),t||(t=o,r()),n=o}}},function(t,n){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},function(t,n,r){var e=r(3),o=r(1),i=r(82);t.exports=function(t,n){if(e(t),o(n)&&n.constructor===t)return n;var r=i.f(t);return(0,r.resolve)(n),r.promise}},function(t,n,r){"use strict";var e=r(2),o=r(9),i=r(8),u=r(0),c=r(17),a=r(18).KEY,f=r(5),s=r(52),l=r(31),h=r(20),p=r(4),v=r(83),d=r(131),y=r(132),g=r(71),m=r(3),b=r(11),w=r(36),_=r(19),x=r(38),S=r(84),E=r(16),O=r(6),P=r(24),A=E.f,j=O.f,M=S.f,R=e.Symbol,F=e.JSON,T=F&&F.stringify,L=p("_hidden"),I=p("toPrimitive"),k={}.propertyIsEnumerable,B=s("symbol-registry"),N=s("symbols"),C=s("op-symbols"),U=Object.prototype,D="function"==typeof R,W=e.QObject,q=!W||!W.prototype||!W.prototype.findChild,G=i&&f(function(){return 7!=x(j({},"a",{get:function(){return j(this,"a",{value:7}).a}})).a})?function(t,n,r){var e=A(U,n);e&&delete U[n],j(t,n,r),e&&t!==U&&j(U,n,e)}:j,V=function(t){var n=N[t]=x(R.prototype);return n._k=t,n},H=D&&"symbol"==typeof R.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof R},z=function(t,n,r){return t===U&&z(C,n,r),m(t),n=w(n,!0),m(r),o(N,n)?(r.enumerable?(o(t,L)&&t[L][n]&&(t[L][n]=!1),r=x(r,{enumerable:_(0,!1)})):(o(t,L)||j(t,L,_(1,{})),t[L][n]=!0),G(t,n,r)):j(t,n,r)},Y=function(t,n){m(t);for(var r,e=y(n=b(n)),o=0,i=e.length;i>o;)z(t,r=e[o++],n[r]);return t},K=function(t,n){return void 0===n?x(t):Y(x(t),n)},J=function(t){var n=k.call(this,t=w(t,!0));return!(this===U&&o(N,t)&&!o(C,t))&&(!(n||!o(this,t)||!o(N,t)||o(this,L)&&this[L][t])||n)},X=function(t,n){if(t=b(t),n=w(n,!0),t!==U||!o(N,n)||o(C,n)){var r=A(t,n);return!r||!o(N,n)||o(t,L)&&t[L][n]||(r.enumerable=!0),r}},Q=function(t){for(var n,r=M(b(t)),e=[],i=0;r.length>i;)o(N,n=r[i++])||n==L||n==a||e.push(n);return e},$=function(t){for(var n,r=t===U,e=M(r?C:b(t)),i=[],u=0;e.length>u;)!o(N,n=e[u++])||r&&!o(U,n)||i.push(N[n]);return i};D||(R=function(){if(this instanceof R)throw TypeError("Symbol is not a constructor!");var t=h(arguments.length>0?arguments[0]:void 0),n=function(r){this===U&&n.call(C,r),o(this,L)&&o(this[L],t)&&(this[L][t]=!1),G(this,t,_(1,r))};return i&&q&&G(U,t,{configurable:!0,set:n}),V(t)},c(R.prototype,"toString",function(){return this._k}),E.f=X,O.f=z,r(37).f=S.f=Q,r(40).f=J,r(45).f=$,i&&!r(26)&&c(U,"propertyIsEnumerable",J,!0),v.f=function(t){return V(p(t))}),u(u.G+u.W+u.F*!D,{Symbol:R});for(var Z="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),tt=0;Z.length>tt;)p(Z[tt++]);for(var nt=P(p.store),rt=0;nt.length>rt;)d(nt[rt++]);u(u.S+u.F*!D,"Symbol",{for:function(t){return o(B,t+="")?B[t]:B[t]=R(t)},keyFor:function(t){if(!H(t))throw TypeError(t+" is not a symbol!");for(var n in B)if(B[n]===t)return n},useSetter:function(){q=!0},useSimple:function(){q=!1}}),u(u.S+u.F*!D,"Object",{create:K,defineProperty:z,defineProperties:Y,getOwnPropertyDescriptor:X,getOwnPropertyNames:Q,getOwnPropertySymbols:$}),F&&u(u.S+u.F*(!D||f(function(){var t=R();return"[null]"!=T([t])||"{}"!=T({a:t})||"{}"!=T(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!H(t)){for(var n,r,e=[t],o=1;arguments.length>o;)e.push(arguments[o++]);return n=e[1],"function"==typeof n&&(r=n),!r&&g(n)||(n=function(t,n){if(r&&(n=r.call(this,t,n)),!H(n))return n}),e[1]=n,T.apply(F,e)}}}),R.prototype[I]||r(10)(R.prototype,I,R.prototype.valueOf),l(R,"Symbol"),l(Math,"Math",!0),l(e.JSON,"JSON",!0)},function(t,n,r){var e=r(2),o=r(25),i=r(26),u=r(83),c=r(6).f;t.exports=function(t){var n=o.Symbol||(o.Symbol=i?{}:e.Symbol||{});"_"==t.charAt(0)||t in n||c(n,t,{value:u.f(t)})}},function(t,n,r){var e=r(24),o=r(45),i=r(40);t.exports=function(t){var n=e(t),r=o.f;if(r)for(var u,c=r(t),a=i.f,f=0;c.length>f;)a.call(t,u=c[f++])&&n.push(u);return n}},function(t,n,r){var e=r(1),o=r(18).onFreeze;r(12)("freeze",function(t){return function(n){return t&&e(n)?t(o(n)):n}})},function(t,n,r){var e=r(1),o=r(18).onFreeze;r(12)("seal",function(t){return function(n){return t&&e(n)?t(o(n)):n}})},function(t,n,r){var e=r(1),o=r(18).onFreeze;r(12)("preventExtensions",function(t){return function(n){return t&&e(n)?t(o(n)):n}})},function(t,n,r){var e=r(1);r(12)("isFrozen",function(t){return function(n){return!e(n)||!!t&&t(n)}})},function(t,n,r){var e=r(1);r(12)("isSealed",function(t){return function(n){return!e(n)||!!t&&t(n)}})},function(t,n,r){var e=r(1);r(12)("isExtensible",function(t){return function(n){return!!e(n)&&(!t||t(n))}})},function(t,n,r){var e=r(11),o=r(16).f;r(12)("getOwnPropertyDescriptor",function(){return function(t,n){return o(e(t),n)}})},function(t,n,r){var e=r(14),o=r(33);r(12)("getPrototypeOf",function(){return function(t){return o(e(t))}})},function(t,n,r){var e=r(14),o=r(24);r(12)("keys",function(){return function(t){return o(e(t))}})},function(t,n,r){r(12)("getOwnPropertyNames",function(){return r(84).f})},function(t,n,r){var e=r(0);e(e.S+e.F,"Object",{assign:r(78)})},function(t,n,r){var e=r(0);e(e.S,"Object",{is:r(145)})},function(t,n){t.exports=Object.is||function(t,n){return t===n?0!==t||1/t==1/n:t!=t&&n!=n}},function(t,n,r){var e=r(6).f,o=Function.prototype,i=/^\s*function ([^ (]*)/;"name"in o||r(8)&&e(o,"name",{configurable:!0,get:function(){try{return(""+this).match(i)[1]}catch(t){return""}}})},function(t,n,r){var e=r(0),o=r(11),i=r(7);e(e.S,"String",{raw:function(t){for(var n=o(t.raw),r=i(n.length),e=arguments.length,u=[],c=0;r>c;)u.push(String(n[c++])),c<e&&u.push(String(arguments[c]));return u.join("")}})},function(t,n,r){var e=r(0),o=r(30),i=String.fromCharCode,u=String.fromCodePoint;e(e.S+e.F*(!!u&&1!=u.length),"String",{fromCodePoint:function(t){for(var n,r=[],e=arguments.length,u=0;e>u;){if(n=+arguments[u++],o(n,1114111)!==n)throw RangeError(n+" is not a valid code point");r.push(n<65536?i(n):i(55296+((n-=65536)>>10),n%1024+56320))}return r.join("")}})},function(t,n,r){"use strict";var e=r(0),o=r(150)(!1);e(e.P,"String",{codePointAt:function(t){return o(this,t)}})},function(t,n,r){var e=r(22),o=r(23);t.exports=function(t){return function(n,r){var i,u,c=String(o(n)),a=e(r),f=c.length;return a<0||a>=f?t?"":void 0:(i=c.charCodeAt(a),i<55296||i>56319||a+1===f||(u=c.charCodeAt(a+1))<56320||u>57343?t?c.charAt(a):i:t?c.slice(a,a+2):u-56320+(i-55296<<10)+65536)}}},function(t,n,r){var e=r(0);e(e.P,"String",{repeat:r(85)})},function(t,n,r){"use strict";var e=r(0),o=r(7),i=r(61),u="".startsWith;e(e.P+e.F*r(62)("startsWith"),"String",{startsWith:function(t){var n=i(this,t,"startsWith"),r=o(Math.min(arguments.length>1?arguments[1]:void 0,n.length)),e=String(t);return u?u.call(n,e,r):n.slice(r,r+e.length)===e}})},function(t,n,r){"use strict";var e=r(0),o=r(7),i=r(61),u="".endsWith;e(e.P+e.F*r(62)("endsWith"),"String",{endsWith:function(t){var n=i(this,t,"endsWith"),r=arguments.length>1?arguments[1]:void 0,e=o(n.length),c=void 0===r?e:Math.min(o(r),e),a=String(t);return u?u.call(n,a,c):n.slice(c-a.length,c)===a}})},function(t,n,r){"use strict";var e=r(0),o=r(61);e(e.P+e.F*r(62)("includes"),"String",{includes:function(t){return!!~o(this,t,"includes").indexOf(t,arguments.length>1?arguments[1]:void 0)}})},function(t,n,r){r(8)&&"g"!=/./g.flags&&r(6).f(RegExp.prototype,"flags",{configurable:!0,get:r(156)})},function(t,n,r){"use strict";var e=r(3);t.exports=function(){var t=e(this),n="";return t.global&&(n+="g"),t.ignoreCase&&(n+="i"),t.multiline&&(n+="m"),t.unicode&&(n+="u"),t.sticky&&(n+="y"),n}},function(t,n,r){r(46)("match",1,function(t,n,r){return[function(r){"use strict";var e=t(this),o=void 0==r?void 0:r[n];return void 0!==o?o.call(r,e):new RegExp(r)[n](String(e))},r]})},function(t,n,r){r(46)("replace",2,function(t,n,r){return[function(e,o){"use strict";var i=t(this),u=void 0==e?void 0:e[n];return void 0!==u?u.call(e,i,o):r.call(String(i),e,o)},r]})},function(t,n,r){r(46)("split",2,function(t,n,e){"use strict";var o=r(86),i=e,u=[].push,c="length";if("c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1)[c]||2!="ab".split(/(?:ab)*/)[c]||4!=".".split(/(.?)(.?)/)[c]||".".split(/()()/)[c]>1||"".split(/.?/)[c]){var a=void 0===/()??/.exec("")[1];e=function(t,n){var r=String(this);if(void 0===t&&0===n)return[];if(!o(t))return i.call(r,t,n);var e,f,s,l,h,p=[],v=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),d=0,y=void 0===n?4294967295:n>>>0,g=new RegExp(t.source,v+"g");for(a||(e=new RegExp("^"+g.source+"$(?!\\s)",v));(f=g.exec(r))&&!((s=f.index+f[0][c])>d&&(p.push(r.slice(d,f.index)),!a&&f[c]>1&&f[0].replace(e,function(){for(h=1;h<arguments[c]-2;h++)void 0===arguments[h]&&(f[h]=void 0)}),f[c]>1&&f.index<r[c]&&u.apply(p,f.slice(1)),l=f[0][c],d=s,p[c]>=y));)g.lastIndex===f.index&&g.lastIndex++;return d===r[c]?!l&&g.test("")||p.push(""):p.push(r.slice(d)),p[c]>y?p.slice(0,y):p}}else"0".split(void 0,0)[c]&&(e=function(t,n){return void 0===t&&0===n?[]:i.call(this,t,n)});return[function(r,o){var i=t(this),u=void 0==r?void 0:r[n];return void 0!==u?u.call(r,i,o):e.call(String(i),r,o)},e]})},function(t,n,r){r(46)("search",1,function(t,n,r){return[function(r){"use strict";var e=t(this),o=void 0==r?void 0:r[n];return void 0!==o?o.call(r,e):new RegExp(r)[n](String(e))},r]})},function(t,n,r){"use strict";var e=r(13),o=r(0),i=r(14),u=r(76),c=r(57),a=r(7),f=r(63),s=r(58);o(o.S+o.F*!r(42)(function(t){Array.from(t)}),"Array",{from:function(t){var n,r,o,l,h=i(t),p="function"==typeof this?this:Array,v=arguments.length,d=v>1?arguments[1]:void 0,y=void 0!==d,g=0,m=s(h);if(y&&(d=e(d,v>2?arguments[2]:void 0,2)),void 0==m||p==Array&&c(m))for(n=a(h.length),r=new p(n);n>g;g++)f(r,g,y?d(h[g],g):h[g]);else for(l=m.call(h),r=new p;!(o=l.next()).done;g++)f(r,g,y?u(l,d,[o.value,g],!0):o.value);return r.length=g,r}})},function(t,n,r){"use strict";var e=r(0),o=r(63);e(e.S+e.F*r(5)(function(){function t(){}return!(Array.of.call(t)instanceof t)}),"Array",{of:function(){for(var t=0,n=arguments.length,r=new("function"==typeof this?this:Array)(n);n>t;)o(r,t,arguments[t++]);return r.length=n,r}})},function(t,n,r){var e=r(0);e(e.P,"Array",{copyWithin:r(74)}),r(34)("copyWithin")},function(t,n,r){"use strict";var e=r(0),o=r(39)(5),i=!0;"find"in[]&&Array(1).find(function(){i=!1}),e(e.P+e.F*i,"Array",{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),r(34)("find")},function(t,n,r){"use strict";var e=r(0),o=r(39)(6),i="findIndex",u=!0;i in[]&&Array(1)[i](function(){u=!1}),e(e.P+e.F*u,"Array",{findIndex:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),r(34)(i)},function(t,n,r){var e=r(0);e(e.P,"Array",{fill:r(54)}),r(34)("fill")},function(t,n,r){var e=r(0),o=r(2).isFinite;e(e.S,"Number",{isFinite:function(t){return"number"==typeof t&&o(t)}})},function(t,n,r){var e=r(0);e(e.S,"Number",{isInteger:r(87)})},function(t,n,r){var e=r(0),o=r(87),i=Math.abs;e(e.S,"Number",{isSafeInteger:function(t){return o(t)&&i(t)<=9007199254740991}})},function(t,n,r){var e=r(0);e(e.S,"Number",{isNaN:function(t){return t!=t}})},function(t,n,r){var e=r(0);e(e.S,"Number",{EPSILON:Math.pow(2,-52)})},function(t,n,r){var e=r(0);e(e.S,"Number",{MIN_SAFE_INTEGER:-9007199254740991})},function(t,n,r){var e=r(0);e(e.S,"Number",{MAX_SAFE_INTEGER:9007199254740991})},function(t,n,r){var e=r(0),o=r(88),i=Math.sqrt,u=Math.acosh;e(e.S+e.F*!(u&&710==Math.floor(u(Number.MAX_VALUE))&&u(1/0)==1/0),"Math",{acosh:function(t){return(t=+t)<1?NaN:t>94906265.62425156?Math.log(t)+Math.LN2:o(t-1+i(t-1)*i(t+1))}})},function(t,n,r){function e(t){return isFinite(t=+t)&&0!=t?t<0?-e(-t):Math.log(t+Math.sqrt(t*t+1)):t}var o=r(0),i=Math.asinh;o(o.S+o.F*!(i&&1/i(0)>0),"Math",{asinh:e})},function(t,n,r){var e=r(0),o=Math.atanh;e(e.S+e.F*!(o&&1/o(-0)<0),"Math",{atanh:function(t){return 0==(t=+t)?t:Math.log((1+t)/(1-t))/2}})},function(t,n,r){var e=r(0),o=r(64);e(e.S,"Math",{cbrt:function(t){return o(t=+t)*Math.pow(Math.abs(t),1/3)}})},function(t,n,r){var e=r(0);e(e.S,"Math",{clz32:function(t){return(t>>>=0)?31-Math.floor(Math.log(t+.5)*Math.LOG2E):32}})},function(t,n,r){var e=r(0),o=Math.exp;e(e.S,"Math",{cosh:function(t){return(o(t=+t)+o(-t))/2}})},function(t,n,r){var e=r(0),o=r(65);e(e.S+e.F*(o!=Math.expm1),"Math",{expm1:o})},function(t,n,r){var e=r(0);e(e.S,"Math",{fround:r(182)})},function(t,n,r){var e=r(64),o=Math.pow,i=o(2,-52),u=o(2,-23),c=o(2,127)*(2-u),a=o(2,-126),f=function(t){return t+1/i-1/i};t.exports=Math.fround||function(t){var n,r,o=Math.abs(t),s=e(t);return o<a?s*f(o/a/u)*a*u:(n=(1+u/i)*o,r=n-(n-o),r>c||r!=r?s*(1/0):s*r)}},function(t,n,r){var e=r(0),o=Math.abs;e(e.S,"Math",{hypot:function(t,n){for(var r,e,i=0,u=0,c=arguments.length,a=0;u<c;)r=o(arguments[u++]),a<r?(e=a/r,i=i*e*e+1,a=r):r>0?(e=r/a,i+=e*e):i+=r;return a===1/0?1/0:a*Math.sqrt(i)}})},function(t,n,r){var e=r(0),o=Math.imul;e(e.S+e.F*r(5)(function(){return-5!=o(4294967295,5)||2!=o.length}),"Math",{imul:function(t,n){var r=+t,e=+n,o=65535&r,i=65535&e;return 0|o*i+((65535&r>>>16)*i+o*(65535&e>>>16)<<16>>>0)}})},function(t,n,r){var e=r(0);e(e.S,"Math",{log1p:r(88)})},function(t,n,r){var e=r(0);e(e.S,"Math",{log10:function(t){return Math.log(t)*Math.LOG10E}})},function(t,n,r){var e=r(0);e(e.S,"Math",{log2:function(t){return Math.log(t)/Math.LN2}})},function(t,n,r){var e=r(0);e(e.S,"Math",{sign:r(64)})},function(t,n,r){var e=r(0),o=r(65),i=Math.exp;e(e.S+e.F*r(5)(function(){return-2e-17!=!Math.sinh(-2e-17)}),"Math",{sinh:function(t){return Math.abs(t=+t)<1?(o(t)-o(-t))/2:(i(t-1)-i(-t-1))*(Math.E/2)}})},function(t,n,r){var e=r(0),o=r(65),i=Math.exp;e(e.S,"Math",{tanh:function(t){var n=o(t=+t),r=o(-t);return n==1/0?1:r==1/0?-1:(n-r)/(i(t)+i(-t))}})},function(t,n,r){var e=r(0);e(e.S,"Math",{trunc:function(t){return(t>0?Math.floor:Math.ceil)(t)}})},function(t,n,r){"use strict";var e=r(0),o=r(50)(!0);e(e.P,"Array",{includes:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),r(34)("includes")},function(t,n,r){var e=r(0),o=r(89)(!1);e(e.S,"Object",{values:function(t){return o(t)}})},function(t,n,r){var e=r(0),o=r(89)(!0);e(e.S,"Object",{entries:function(t){return o(t)}})},function(t,n,r){var e=r(0),o=r(81),i=r(11),u=r(16),c=r(63);e(e.S,"Object",{getOwnPropertyDescriptors:function(t){for(var n,r,e=i(t),a=u.f,f=o(e),s={},l=0;f.length>l;)void 0!==(r=a(e,n=f[l++]))&&c(s,n,r);return s}})},function(t,n,r){"use strict";var e=r(0),o=r(90);e(e.P,"String",{padStart:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0,!0)}})},function(t,n,r){"use strict";var e=r(0),o=r(90);e(e.P,"String",{padEnd:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0,!1)}})},function(t,n,r){var e=r(2),o=r(0),i=e.navigator,u=[].slice,c=!!i&&/MSIE .\./.test(i.userAgent),a=function(t){return function(n,r){var e=arguments.length>2,o=!!e&&u.call(arguments,2);return t(e?function(){("function"==typeof n?n:Function(n)).apply(this,o)}:n,r)}};o(o.G+o.B+o.F*c,{setTimeout:a(e.setTimeout),setInterval:a(e.setInterval)})},function(t,n,r){var e=r(0),o=r(60);e(e.G+e.B,{setImmediate:o.set,clearImmediate:o.clear})},function(t,n,r){for(var e=r(59),o=r(24),i=r(17),u=r(2),c=r(10),a=r(32),f=r(4),s=f("iterator"),l=f("toStringTag"),h=a.Array,p={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},v=o(p),d=0;d<v.length;d++){var y,g=v[d],m=p[g],b=u[g],w=b&&b.prototype;if(w&&(w[s]||c(w,s,h),w[l]||c(w,l,g),a[g]=h,m))for(y in e)w[y]||i(w,y,e[y],!0)}},function(t,n){!function(n){"use strict";function r(t,n,r,e){var i=n&&n.prototype instanceof o?n:o,u=Object.create(i.prototype),c=new p(e||[]);return u._invoke=f(t,r,c),u}function e(t,n,r){try{return{type:"normal",arg:t.call(n,r)}}catch(t){return{type:"throw",arg:t}}}function o(){}function i(){}function u(){}function c(t){["next","throw","return"].forEach(function(n){t[n]=function(t){return this._invoke(n,t)}})}function a(t){function n(r,o,i,u){var c=e(t[r],t,o);if("throw"!==c.type){var a=c.arg,f=a.value;return f&&"object"==typeof f&&m.call(f,"__await")?Promise.resolve(f.__await).then(function(t){n("next",t,i,u)},function(t){n("throw",t,i,u)}):Promise.resolve(f).then(function(t){a.value=t,i(a)},u)}u(c.arg)}function r(t,r){function e(){return new Promise(function(e,o){n(t,r,e,o)})}return o=o?o.then(e,e):e()}var o;this._invoke=r}function f(t,n,r){var o=O;return function(i,u){if(o===A)throw new Error("Generator is already running");if(o===j){if("throw"===i)throw u;return d()}for(r.method=i,r.arg=u;;){var c=r.delegate;if(c){var a=s(c,r);if(a){if(a===M)continue;return a}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===O)throw o=j,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=A;var f=e(t,n,r);if("normal"===f.type){if(o=r.done?j:P,f.arg===M)continue;return{value:f.arg,done:r.done}}"throw"===f.type&&(o=j,r.method="throw",r.arg=f.arg)}}}function s(t,n){var r=t.iterator[n.method];if(r===y){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=y,s(t,n),"throw"===n.method))return M;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return M}var o=e(r,t.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,M;var i=o.arg;return i?i.done?(n[t.resultName]=i.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=y),n.delegate=null,M):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,M)}function l(t){var n={tryLoc:t[0]};1 in t&&(n.catchLoc=t[1]),2 in t&&(n.finallyLoc=t[2],n.afterLoc=t[3]),this.tryEntries.push(n)}function h(t){var n=t.completion||{};n.type="normal",delete n.arg,t.completion=n}function p(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(l,this),this.reset(!0)}function v(t){if(t){var n=t[w];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,e=function n(){for(;++r<t.length;)if(m.call(t,r))return n.value=t[r],n.done=!1,n;return n.value=y,n.done=!0,n};return e.next=e}}return{next:d}}function d(){return{value:y,done:!0}}var y,g=Object.prototype,m=g.hasOwnProperty,b="function"==typeof Symbol?Symbol:{},w=b.iterator||"@@iterator",_=b.asyncIterator||"@@asyncIterator",x=b.toStringTag||"@@toStringTag",S="object"==typeof t,E=n.regeneratorRuntime;if(E)return void(S&&(t.exports=E));E=n.regeneratorRuntime=S?t.exports:{},E.wrap=r;var O="suspendedStart",P="suspendedYield",A="executing",j="completed",M={},R={};R[w]=function(){return this};var F=Object.getPrototypeOf,T=F&&F(F(v([])));T&&T!==g&&m.call(T,w)&&(R=T);var L=u.prototype=o.prototype=Object.create(R);i.prototype=L.constructor=u,u.constructor=i,u[x]=i.displayName="GeneratorFunction",E.isGeneratorFunction=function(t){var n="function"==typeof t&&t.constructor;return!!n&&(n===i||"GeneratorFunction"===(n.displayName||n.name))},E.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,u):(t.__proto__=u,x in t||(t[x]="GeneratorFunction")),t.prototype=Object.create(L),t},E.awrap=function(t){return{__await:t}},c(a.prototype),a.prototype[_]=function(){return this},E.AsyncIterator=a,E.async=function(t,n,e,o){var i=new a(r(t,n,e,o));return E.isGeneratorFunction(n)?i:i.next().then(function(t){return t.done?t.value:i.next()})},c(L),L[x]="Generator",L[w]=function(){return this},L.toString=function(){return"[object Generator]"},E.keys=function(t){var n=[];for(var r in t)n.push(r);return n.reverse(),function r(){for(;n.length;){var e=n.pop();if(e in t)return r.value=e,r.done=!1,r}return r.done=!0,r}},E.values=v,p.prototype={constructor:p,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=y,this.done=!1,this.delegate=null,this.method="next",this.arg=y,this.tryEntries.forEach(h),!t)for(var n in this)"t"===n.charAt(0)&&m.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=y)},stop:function(){this.done=!0;var t=this.tryEntries[0],n=t.completion;if("throw"===n.type)throw n.arg;return this.rval},dispatchException:function(t){function n(n,e){return i.type="throw",i.arg=t,r.next=n,e&&(r.method="next",r.arg=y),!!e}if(this.done)throw t;for(var r=this,e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e],i=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var u=m.call(o,"catchLoc"),c=m.call(o,"finallyLoc");if(u&&c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,n){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc<=this.prev&&m.call(e,"finallyLoc")&&this.prev<e.finallyLoc){var o=e;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=n&&n<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=n,o?(this.method="next",this.next=o.finallyLoc,M):this.complete(i)},complete:function(t,n){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&n&&(this.next=n),M},finish:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),h(r),M}},catch:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc===t){var e=r.completion;if("throw"===e.type){var o=e.arg;h(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:v(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=y),M}}}(function(){return this}()||Function("return this")())},function(t,n,r){"use strict";function e(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(n,"__esModule",{value:!0}),n.fetchItemsRequest=n.fetchItemCategoriesRequest=n.fetchSupportedCountriesRequest=n.falseErrorRequest=n.closeErrorRequest=n.fetchErrorRequest=n.fetchErrorsRequest=void 0;var o=r(203),i=e(o),u=r(91),c=e(u),a=r(204);n.fetchErrorsRequest=function(t,n,r){var e=t+"/errors"+(0,a.buildQueryString)(r),o={"Accept-Language":n||c.default.language};return(0,i.default)(e,{headers:o}).then(function(t){return t.json()}).then(function(t){if(!t||!t.description||!t.errors)throw"The data received from the Osmose API is malformed ("+e+")";return t})},n.fetchErrorRequest=function(t,n,r){var e=t+"/error/"+r,o={"Accept-Language":n||c.default.language};return(0,i.default)(e,{headers:o}).then(function(t){return t.json()}).then(function(t){if(!(t&&t.title&&t.lat&&t.lon))throw"The data received from the Osmose API is malformed ("+e+")";return t})},n.closeErrorRequest=function(t,n,r){var e=t+"/error/"+r+"/done",o={"Accept-Language":n||c.default.language};return(0,i.default)(e,{headers:o}).then(function(t){if(!t)throw"The data received from the Osmose API is malformed ("+e+")";return!0})},n.falseErrorRequest=function(t,n,r){var e=t+"/error/"+r+"/false",o={"Accept-Language":n||c.default.language};return(0,i.default)(e,{headers:o}).then(function(t){if(!t)throw"The data received from the Osmose API is malformed ("+e+")";return!0})},n.fetchSupportedCountriesRequest=function(t,n){var r=t+"/meta/countries",e={"Accept-Language":n||c.default.language};return(0,i.default)(r,{headers:e}).then(function(t){return t.json()}).then(function(t){if(!t||!t.countries)throw"The data received from the Osmose API is malformed ("+r+")";return t})},n.fetchItemCategoriesRequest=function(t,n){var r=t+"/meta/categories",e={"Accept-Language":n||c.default.language};return(0,i.default)(r,{headers:e}).then(function(t){return t.json()}).then(function(t){if(!t||!t.categories)throw"The data received from the Osmose API is malformed ("+r+")";return t})},n.fetchItemsRequest=function(t,n){var r=t+"/meta/items",e={"Accept-Language":n||c.default.language};return(0,i.default)(r,{headers:e}).then(function(t){return t.json()}).then(function(t){if(!t||!t.items)throw"The data received from the Osmose API is malformed ("+r+")";return t})}},function(t,n){var r={};!function(t){"use strict";function n(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function r(t){return"string"!=typeof t&&(t=String(t)),t}function e(t){var n={next:function(){var n=t.shift();return{done:void 0===n,value:n}}};return g.iterable&&(n[Symbol.iterator]=function(){return n}),n}function o(t){this.map={},t instanceof o?t.forEach(function(t,n){this.append(n,t)},this):Array.isArray(t)?t.forEach(function(t){this.append(t[0],t[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(n){this.append(n,t[n])},this)}function i(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function u(t){return new Promise(function(n,r){t.onload=function(){n(t.result)},t.onerror=function(){r(t.error)}})}function c(t){var n=new FileReader,r=u(n);return n.readAsArrayBuffer(t),r}function a(t){var n=new FileReader,r=u(n);return n.readAsText(t),r}function f(t){for(var n=new Uint8Array(t),r=new Array(n.length),e=0;e<n.length;e++)r[e]=String.fromCharCode(n[e]);return r.join("")}function s(t){if(t.slice)return t.slice(0);var n=new Uint8Array(t.byteLength);return n.set(new Uint8Array(t)),n.buffer}function l(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,t)if("string"==typeof t)this._bodyText=t;else if(g.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(g.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(g.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(g.arrayBuffer&&g.blob&&b(t))this._bodyArrayBuffer=s(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!g.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!w(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=s(t)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):g.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},g.blob&&(this.blob=function(){var t=i(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?i(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(c)}),this.text=function(){var t=i(this);if(t)return t;if(this._bodyBlob)return a(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(f(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},g.formData&&(this.formData=function(){return this.text().then(v)}),this.json=function(){return this.text().then(JSON.parse)},this}function h(t){var n=t.toUpperCase();return _.indexOf(n)>-1?n:t}function p(t,n){n=n||{};var r=n.body;if(t instanceof p){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,n.headers||(this.headers=new o(t.headers)),this.method=t.method,this.mode=t.mode,r||null==t._bodyInit||(r=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=n.credentials||this.credentials||"omit",!n.headers&&this.headers||(this.headers=new o(n.headers)),this.method=h(n.method||this.method||"GET"),this.mode=n.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function v(t){var n=new FormData;return t.trim().split("&").forEach(function(t){if(t){var r=t.split("="),e=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");n.append(decodeURIComponent(e),decodeURIComponent(o))}}),n}function d(t){var n=new o;return t.split(/\r?\n/).forEach(function(t){var r=t.split(":"),e=r.shift().trim();if(e){var o=r.join(":").trim();n.append(e,o)}}),n}function y(t,n){n||(n={}),this.type="default",this.status="status"in n?n.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in n?n.statusText:"OK",this.headers=new o(n.headers),this.url=n.url||"",this._initBody(t)}if(!t.fetch){var g={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(g.arrayBuffer)var m=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],b=function(t){return t&&DataView.prototype.isPrototypeOf(t)},w=ArrayBuffer.isView||function(t){return t&&m.indexOf(Object.prototype.toString.call(t))>-1};o.prototype.append=function(t,e){t=n(t),e=r(e);var o=this.map[t];this.map[t]=o?o+","+e:e},o.prototype.delete=function(t){delete this.map[n(t)]},o.prototype.get=function(t){return t=n(t),this.has(t)?this.map[t]:null},o.prototype.has=function(t){return this.map.hasOwnProperty(n(t))},o.prototype.set=function(t,e){this.map[n(t)]=r(e)},o.prototype.forEach=function(t,n){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(n,this.map[r],r,this)},o.prototype.keys=function(){var t=[];return this.forEach(function(n,r){t.push(r)}),e(t)},o.prototype.values=function(){var t=[];return this.forEach(function(n){t.push(n)}),e(t)},o.prototype.entries=function(){var t=[];return this.forEach(function(n,r){t.push([r,n])}),e(t)},g.iterable&&(o.prototype[Symbol.iterator]=o.prototype.entries);var _=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];p.prototype.clone=function(){return new p(this,{body:this._bodyInit})},l.call(p.prototype),l.call(y.prototype),y.prototype.clone=function(){return new y(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new o(this.headers),url:this.url})},y.error=function(){var t=new y(null,{status:0,statusText:""});return t.type="error",t};var x=[301,302,303,307,308];y.redirect=function(t,n){if(-1===x.indexOf(n))throw new RangeError("Invalid status code");return new y(null,{status:n,headers:{location:t}})},t.Headers=o,t.Request=p,t.Response=y,t.fetch=function(t,n){return new Promise(function(r,e){var o=new p(t,n),i=new XMLHttpRequest;i.onload=function(){var t={status:i.status,statusText:i.statusText,headers:d(i.getAllResponseHeaders()||"")};t.url="responseURL"in i?i.responseURL:t.headers.get("X-Request-URL");var n="response"in i?i.response:i.responseText;r(new y(n,t))},i.onerror=function(){e(new TypeError("Network request failed"))},i.ontimeout=function(){e(new TypeError("Network request failed"))},i.open(o.method,o.url,!0),"include"===o.credentials&&(i.withCredentials=!0),"responseType"in i&&g.blob&&(i.responseType="blob"),o.headers.forEach(function(t,n){i.setRequestHeader(n,t)}),i.send(void 0===o._bodyInit?null:o._bodyInit)})},t.fetch.polyfill=!0}}(void 0!==r?r:this);var e=r.fetch;e.fetch=e,e.Response=r.Response,e.Headers=r.Headers,e.Request=r.Request,t.exports=e},function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.buildQueryString=function(t){var n=[],r=!0,e=!1,o=void 0;try{for(var i,u=Object.keys(t)[Symbol.iterator]();!(r=(i=u.next()).done);r=!0){var c=i.value,a=encodeURIComponent(c),f=encodeURIComponent(t[c]);n.push(a+"="+f)}}catch(t){e=!0,o=t}finally{try{!r&&u.return&&u.return()}finally{if(e)throw o}}return(n.length>0?"?":"")+n.join("&")}}])});

/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/helpers/bounds.js":
/*!*******************************!*\
  !*** ./src/helpers/bounds.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _leaflet = __webpack_require__(/*! leaflet */ "leaflet");

var _leaflet2 = _interopRequireDefault(_leaflet);

var _jsClipper = __webpack_require__(/*! js-clipper */ "./node_modules/js-clipper/clipper.js");

var _jsClipper2 = _interopRequireDefault(_jsClipper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bounds = function () {
  function Bounds() {
    _classCallCheck(this, Bounds);

    this.loadedBounds = [];
  }

  _createClass(Bounds, [{
    key: 'add',


    /**
     * Add bounds to the list of loaded bounds
     * @param {L.Bounds} bounds
     */
    value: function add(bounds) {
      this.loadedBounds.push(bounds);
    }

    /**
     * Return the list of the loaded bounds
     * @return {L.Bounds[]}
     */

  }, {
    key: 'get',
    value: function get() {
      return [].concat(_toConsumableArray(this.loadedBounds));
    }

    /**
     * Clear the loaded bounds list
     */

  }, {
    key: 'clear',
    value: function clear() {
      this.loadedBounds = [];
    }

    /**
     * Tells if a bounds area is already loaded
     * @param {L.Bounds} bounds
     * @return {boolean}
     */

  }, {
    key: 'areFullyLoaded',
    value: function areFullyLoaded(bounds) {
      if (this.loadedBounds.length === 0) {
        return false;
      }

      var subjectClips = Bounds.buildClipsFromBoundsList([bounds]);
      var knownClips = Bounds.buildClipsFromBoundsList(this.loadedBounds);
      var clipper = new _jsClipper2.default.Clipper();
      var solutionPolyTree = new _jsClipper2.default.PolyTree();

      clipper.AddPaths(subjectClips, _jsClipper2.default.PolyType.ptSubject, true);
      clipper.AddPaths(knownClips, _jsClipper2.default.PolyType.ptClip, true);

      clipper.Execute(_jsClipper2.default.ClipType.ctDifference, solutionPolyTree, _jsClipper2.default.PolyFillType.pftNonZero, _jsClipper2.default.PolyFillType.pftNonZero);

      var solutionExPolygons = _jsClipper2.default.JS.PolyTreeToExPolygons(solutionPolyTree);

      if (solutionExPolygons.length === 0) {
        return true;
      }

      return false;
    }

    /**
     * Convert a bounds area into a clip
     * @static
     * @param {L.Bounds} bounds
     * @return {{X: number, Y: number}[]}
     */

  }], [{
    key: 'buildClipsFromBoundsList',
    value: function buildClipsFromBoundsList(bounds) {
      return bounds.map(function (bound) {
        return [{
          X: bound._southWest.lng * 1000000,
          Y: bound._southWest.lat * 1000000
        }, {
          X: bound._southWest.lng * 1000000,
          Y: bound._northEast.lat * 1000000
        }, {
          X: bound._northEast.lng * 1000000,
          Y: bound._northEast.lat * 1000000
        }, {
          X: bound._northEast.lng * 1000000,
          Y: bound._southWest.lat * 1000000
        }];
      });
    }

    /**
     * Convert a clip into a bounds area
     * @static
     * @param {{X: number, Y: number}[]} clips
     * @return {L.Bounds}
     */

  }, {
    key: 'buildBoundsListFromClips',
    value: function buildBoundsListFromClips(clips) {
      return clips.map(function (clip) {
        return new _leaflet2.default.LatLngBounds(new _leaflet2.default.LatLng(clip[0].Y / 1000000, clip[0].X / 1000000), new _leaflet2.default.LatLng(clip[2].Y / 1000000, clip[2].X / 1000000));
      });
    }
  }]);

  return Bounds;
}();

exports.default = Bounds;

/***/ }),

/***/ "./src/helpers/boxes.js":
/*!******************************!*\
  !*** ./src/helpers/boxes.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _leaflet = __webpack_require__(/*! leaflet */ "leaflet");

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Boxes = function () {
  function Boxes() {
    _classCallCheck(this, Boxes);

    this.boxStyle = {
      stroke: false,
      fillOpacity: 0.15,
      clickable: false
    };
    this.map = null;
    this.requestBoxes = _leaflet2.default.featureGroup();
    this.responseBoxes = _leaflet2.default.featureGroup();
  }

  _createClass(Boxes, [{
    key: 'setMap',


    /**
     * Store the map and add the request and response featureGroup to it
     * @param {L.Map} map
     */
    value: function setMap(map) {
      this.map = map;
      this.requestBoxes = _leaflet2.default.featureGroup().addTo(map);
      this.responseBoxes = _leaflet2.default.featureGroup().addTo(map);
    }

    /**
     * Create a rectangle to materialize the request area
     * @param {L.Bounds} bounds
     * @return {L.Rectangle}
     */

  }, {
    key: 'buildRequestBox',
    value: function buildRequestBox(bounds) {
      return _leaflet2.default.rectangle(bounds, _extends({}, this.boxStyle, {
        bounds: bounds,
        color: 'tomato'
      }));
    }

    /**
     * Create a rectangle to materialize the response area
     * @param {L.Bounds} bounds
     * @return {L.Rectangle}
     */

  }, {
    key: 'buildResponseBox',
    value: function buildResponseBox(bounds) {
      return _leaflet2.default.rectangle(bounds, _extends({}, this.boxStyle, {
        bounds: bounds,
        color: 'black'
      }));
    }

    /**
     * Add a request box to the map
     * @param {L.Bounds} bounds
     * @return {L.Rectangle}
     */

  }, {
    key: 'addRequestBox',
    value: function addRequestBox(bounds) {
      return this.requestBoxes.addLayer(this.buildRequestBox(bounds)).bringToBack();
    }

    /**
     * Create a rectangle to materialize the response area
     * @param {L.Bounds} bounds
     * @return {L.Rectangle}
     */

  }, {
    key: 'addResponseBox',
    value: function addResponseBox(bounds) {
      return this.responseBoxes.addLayer(this.buildResponseBox(bounds)).bringToBack();
    }

    /**
     * Create a bunch of rectangle to materialize some request areas
     * @param {L.Rectangle[]} requestBoxes
     */

  }, {
    key: 'addResponseBoxes',
    value: function addResponseBoxes(requestBoxes) {
      var _this = this;

      requestBoxes.forEach(function (box) {
        return _this.addResponseBox(box.getBounds());
      });
      this.removeRequestBoxes();
    }

    /**
     * Returns all the request boxes in an array
     * @return {array}
     */

  }, {
    key: 'getRequestBoxes',
    value: function getRequestBoxes() {
      return this.requestBoxes.getLayers();
    }

    /**
     * Returns all the response boxes in an array
     * @return {array}
     */

  }, {
    key: 'getResponseBoxes',
    value: function getResponseBoxes() {
      return this.responseBoxes.getLayers();
    }

    /**
     * Clear all the request and response boxes
     */

  }, {
    key: 'clear',
    value: function clear() {
      this.requestBoxes.clearLayers();
      this.responseBoxes.clearLayers();
    }

    /**
     * Remove a request box from its bounds
     * @param {L.Bounds} bounds
     * @return {boolean}
     */

  }, {
    key: 'removeRequestBox',
    value: function removeRequestBox(bounds) {
      var requestBox = this.requestBoxes.getLayers().find(function (box) {
        var boxBounds = box.getBounds();

        return boxBounds._northEast.lng === bounds._northEast.lng && boxBounds._northEast.lat === bounds._northEast.lat && boxBounds._southWest.lng === bounds._southWest.lng && boxBounds._southWest.lat === bounds._southWest.lat;
      });

      return this.requestBoxes.removeLayer(requestBox);
    }

    /**
     * Remove all the request boxes from the map
     * @return {boolean}
     */

  }, {
    key: 'removeRequestBoxes',
    value: function removeRequestBoxes() {
      return this.requestBoxes.clearLayers();
    }
  }]);

  return Boxes;
}();

exports.default = Boxes;

/***/ }),

/***/ "./src/helpers/marker.js":
/*!*******************************!*\
  !*** ./src/helpers/marker.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildIconMarker = buildIconMarker;
exports.buildCircleMarker = buildCircleMarker;

var _leaflet = __webpack_require__(/*! leaflet */ "leaflet");

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Build a Leaflet marker from an icon
 * @param {L.LatLng} latLng
 * @return {L.Marker}
 */
function buildIconMarker(latLng, markerIcon) {
  return _leaflet2.default.marker(latLng, { icon: markerIcon });
}

/**
 * Build a circular Leaflet marker
 * @param {L.LatLng} latLng
 * @return {L.Circle}
 */
function buildCircleMarker(latLng) {
  return _leaflet2.default.circle(latLng, 20, {
    stroke: false,
    fillColor: 'tomato',
    fillOpacity: 0.9
  });
}

/***/ }),

/***/ "./src/helpers/utils.js":
/*!******************************!*\
  !*** ./src/helpers/utils.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.removeTrailingSlash = removeTrailingSlash;
exports.buildLargerBounds = buildLargerBounds;

var _leaflet = __webpack_require__(/*! leaflet */ "leaflet");

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Remove the trailing slash from an URL and return it
 * @param  {string} url
 * @return {string} - The cleaned URL
 */
function removeTrailingSlash(url) {
  return url.replace(/\/*$/, '');
}

/**
 * Increase the dimension of the bounds
 * @param  {L.Bounds} rawBounds - Leaflet bounds
 * @return {L.LatLngBounds} - Increased bounds
 */
function buildLargerBounds(rawBounds) {
  var bounds = _extends({}, rawBounds);
  var width = Math.abs(bounds._northEast.lng - bounds._southWest.lng);
  var height = Math.abs(bounds._northEast.lat - bounds._southWest.lat);
  var biggestDimension = width > height ? width : height;

  bounds._southWest.lat -= biggestDimension / 2;
  bounds._southWest.lng -= biggestDimension / 2;
  bounds._northEast.lat += biggestDimension / 2;
  bounds._northEast.lng += biggestDimension / 2;

  return _leaflet2.default.latLngBounds(_leaflet2.default.latLng(bounds._southWest.lat, bounds._southWest.lng), _leaflet2.default.latLng(bounds._northEast.lat, bounds._northEast.lng));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _services = __webpack_require__(/*! services */ "./src/services/index.js");

var services = _interopRequireWildcard(_services);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

if (window && window.L) {
  window.L.Nectarivore = _extends({}, services);
}

exports.default = _extends({}, services);

/***/ }),

/***/ "./src/services/baseService.js":
/*!*************************************!*\
  !*** ./src/services/baseService.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _leaflet = __webpack_require__(/*! leaflet */ "leaflet");

var _leaflet2 = _interopRequireDefault(_leaflet);

var _v = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");

var _v2 = _interopRequireDefault(_v);

var _bounds = __webpack_require__(/*! helpers/bounds */ "./src/helpers/bounds.js");

var _bounds2 = _interopRequireDefault(_bounds);

var _boxes = __webpack_require__(/*! helpers/boxes */ "./src/helpers/boxes.js");

var _boxes2 = _interopRequireDefault(_boxes);

var _utils = __webpack_require__(/*! helpers/utils */ "./src/helpers/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
  debug: false,
  minZoom: 15,
  endpoint: '',
  loadedBounds: [],
  markerIcon: null,
  timeout: 30 * 1000, // Milliseconds
  retryOnTimeout: false,
  noInitialRequest: false,
  onSuccess: function onSuccess() {},
  onError: function onError() {},
  onTimeout: function onTimeout() {},
  beforeRequest: function beforeRequest() {},
  afterRequest: function afterRequest() {}
};

exports.default = _leaflet2.default.FeatureGroup.extend({
  options: _extends({}, defaultOptions),

  initialize: function initialize() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.options = _extends({}, defaultOptions, options, {
      endpoint: (0, _utils.removeTrailingSlash)(options.endpoint || '')
    });

    this.id = (0, _v2.default)();

    this.constructor(options);
  },


  // To overwrite by the children
  constructor: function constructor() {},


  // To overwrite by the children
  clear: function clear() {},


  // To overwrite by the children
  buildRequestBounds: function buildRequestBounds(bounds) {
    return bounds;
  },


  // To overwrite by the children
  buildRequestPromise: function buildRequestPromise() {
    return Promise.resolve({});
  },
  onAdd: function onAdd(map) {
    this.map = map;
    this.bounds = new _bounds2.default();
    this.requestInProgress = false;
    this.markers = _leaflet2.default.featureGroup().addTo(this.map);

    if (this.options.debug) {
      this.boxes = new _boxes2.default();
      this.boxes.setMap(map);
    }

    if (!this.options.noInitialRequest) {
      this.prepareRequest();
    }

    this.map.on('moveend', this.prepareRequest, this);
  },
  onRemove: function onRemove(map) {
    _leaflet2.default.LayerGroup.prototype.onRemove.call(this, map);

    this._clear();
    this.clear();

    map.off('moveend', this.prepareRequest, this);

    this.map = null;
  },
  _clear: function _clear() {
    this.bounds.clear();
    this.markers.clearLayers();
    this.requestInProgress = false;

    if (this.options.debug) {
      this.boxes.clear();
    }
  },


  /**
   * Replace the current query by a new one, clear the data and launch a request
   * @public
   * @param {string} query
   */
  setQuery: function setQuery(query) {
    this.options.query = query;
    this._clear();
    this.clear();
    this.prepareRequest();
  },
  prepareRequest: function prepareRequest() {
    if (this.map.getZoom() < this.options.minZoom) {
      return false;
    }

    var bounds = this.buildRequestBounds(this.map.getBounds());
    var nextRequest = this.sendRequest.bind(this, bounds);

    if (this.requestInProgress) {
      this.setNextRequest(nextRequest);
    } else {
      this.removeNextRequest();
      nextRequest();
    }
  },
  hasNextRequest: function hasNextRequest() {
    return !!this.nextRequest;
  },
  getNextRequest: function getNextRequest() {
    return this.nextRequest;
  },
  setNextRequest: function setNextRequest(nextRequest) {
    this.nextRequest = nextRequest;
  },
  removeNextRequest: function removeNextRequest() {
    this.nextRequest = null;
  },
  sendRequest: function sendRequest(bounds) {
    var _this = this;

    if (this.bounds.areFullyLoaded(bounds)) {
      this.requestInProgress = false;
      return;
    }

    var beforeRequestResult = this.options.beforeRequest.call(this);

    if (beforeRequestResult === false) {
      this.options.afterRequest.call(this);
      return;
    }

    if (this.options.debug) {
      this.boxes.addRequestBox(bounds);
    }

    this.requestInProgress = true;

    var controller = new window.AbortController();
    var signal = controller.signal;
    var request = this.buildRequestPromise(bounds, signal);
    var timeout = setTimeout(function () {
      controller.abort();
      _this.onRequestTimeout(request, bounds);
    }, this.options.timeout);

    request.then(function (response) {
      clearTimeout(timeout);
      _this.options.onSuccess.call(_this, response);
      _this.onRequestLoadCallback(bounds);
    }).catch(function () {
      clearTimeout(timeout);
      _this.onRequestErrorCallback(bounds);
      _this.options.onError.call(_this, request);
    }).then(function () {
      return _this.onRequestCompleteCallback(bounds);
    });
  },
  onRequestTimeout: function onRequestTimeout(request, bounds) {
    this.options.onTimeout.call(this, request);

    if (this.options.retryOnTimeout) {
      this.sendRequest(bounds);
    } else {
      this.onRequestErrorCallback(bounds);
      this.onRequestCompleteCallback(bounds);
    }
  },
  onRequestLoadCallback: function onRequestLoadCallback(bounds) {
    this.bounds.add(bounds);

    if (this.options.debug) {
      this.boxes.addResponseBoxes(this.boxes.getRequestBoxes());
    }
  },
  onRequestErrorCallback: function onRequestErrorCallback(bounds) {
    if (this.options.debug) {
      this.boxes.removeRequestBox(bounds);
    }
  },
  onRequestCompleteCallback: function onRequestCompleteCallback() {
    this.options.afterRequest.call(this);

    if (this.hasNextRequest()) {
      var nextRequest = this.getNextRequest();
      this.removeNextRequest();
      nextRequest();
    } else {
      this.requestInProgress = false;
    }
  }
});

/***/ }),

/***/ "./src/services/index.js":
/*!*******************************!*\
  !*** ./src/services/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _overpass = __webpack_require__(/*! ./overpass */ "./src/services/overpass.js");

Object.defineProperty(exports, 'overpass', {
  enumerable: true,
  get: function get() {
    return _overpass.overpass;
  }
});

var _osmose = __webpack_require__(/*! ./osmose */ "./src/services/osmose.js");

Object.defineProperty(exports, 'osmose', {
  enumerable: true,
  get: function get() {
    return _osmose.osmose;
  }
});

/***/ }),

/***/ "./src/services/osmose.js":
/*!********************************!*\
  !*** ./src/services/osmose.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.osmose = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _leaflet = __webpack_require__(/*! leaflet */ "leaflet");

var _leaflet2 = _interopRequireDefault(_leaflet);

var _osmoseRequest = __webpack_require__(/*! osmose-request */ "./node_modules/osmose-request/dist/OsmoseRequest.js");

var _osmoseRequest2 = _interopRequireDefault(_osmoseRequest);

var _baseService = __webpack_require__(/*! services/baseService */ "./src/services/baseService.js");

var _baseService2 = _interopRequireDefault(_baseService);

var _marker = __webpack_require__(/*! helpers/marker */ "./src/helpers/marker.js");

var _utils = __webpack_require__(/*! helpers/utils */ "./src/helpers/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
  endpoint: 'https://osmose.openstreetmap.fr/api/0.2',
  language: 'en'
};

var Osmose = _baseService2.default.extend({
  osmoseIds: {},

  /**
   * @constructs
   * @param {object} options
   */
  constructor: function constructor(options) {
    this.options = _extends({}, this.options, defaultOptions, { // defaultOptions from that service file
      onSuccess: this.onSuccess }, options, { // User options
      endpoint: (0, _utils.removeTrailingSlash)(options.endpoint || defaultOptions.endpoint)
    });

    this.osmoseRequest = new _osmoseRequest2.default({
      endpoint: this.options.endpoint,
      language: this.options.language
    });
  },


  /**
   * Clear the known POI ids
   */
  clear: function clear() {
    this.osmoseIds = {};
  },


  /**
   * Enlarge the area covered by the bounds
   * @param {L.Bounds} bounds
   * @return {L.Bounds}
   */
  buildRequestBounds: function buildRequestBounds(bounds) {
    return (0, _utils.buildLargerBounds)(bounds);
  },


  /**
   * Method called by Nectarivore to build the request to the API
   * @param {L.Bounds} bounds
   * @return {Promise}
   */
  buildRequestPromise: function buildRequestPromise(bounds) {
    var options = this.buildOsmoseOptions(this.options, bounds);

    return this.osmoseRequest.fetchErrors(options);
  },


  /**
   * Build the options to send to the Osmose API
   * @param {object} options
   * @param {L.Bounds} bounds
   * @return {object}
   */
  buildOsmoseOptions: function buildOsmoseOptions(options, bounds) {
    var sw = bounds._southWest;
    var ne = bounds._northEast;
    var bbox = [sw.lng, sw.lat, ne.lng, ne.lat].join(',');
    var osmoseOptions = { bbox: bbox };

    ['item', 'source', 'class', 'username', 'level', 'full', 'zoom', 'limit', 'country', 'useDevItem', 'status', 'start_date', 'end_date', 'tags', 'fixables'].forEach(function (optionName) {
      if (options[optionName]) {
        osmoseOptions[optionName] = options[optionName];
      }
    });

    return osmoseOptions;
  },


  /**
   * Default onSuccess callback for the Osmose service
   * @param {object} data Data returned by the request
   */
  onSuccess: function onSuccess(data) {
    var _this = this;

    data.forEach(function (element) {
      if (element.error_id in _this.osmoseIds) {
        return;
      }

      _this.osmoseIds[element.error_id] = true;

      var latLng = new _leaflet2.default.LatLng(element.lat, element.lon);
      var marker = _this.options.markerIcon ? (0, _marker.buildIconMarker)(latLng, _this.options.markerIcon) : (0, _marker.buildCircleMarker)(latLng);

      _this.markers.addLayer(marker);
    });
  }
});

var osmose = exports.osmose = function osmose(options) {
  return new Osmose(options);
};

exports.default = osmose;

/***/ }),

/***/ "./src/services/overpass.js":
/*!**********************************!*\
  !*** ./src/services/overpass.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.overpass = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _leaflet = __webpack_require__(/*! leaflet */ "leaflet");

var _leaflet2 = _interopRequireDefault(_leaflet);

var _baseService = __webpack_require__(/*! services/baseService */ "./src/services/baseService.js");

var _baseService2 = _interopRequireDefault(_baseService);

var _marker = __webpack_require__(/*! helpers/marker */ "./src/helpers/marker.js");

var _utils = __webpack_require__(/*! helpers/utils */ "./src/helpers/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
  endpoint: 'https://overpass-api.de/api',
  query: '(\n    node({{bbox}})[organic];\n    node({{bbox}})[second_hand];\n  );\n  out qt;'
};

var Overpass = _baseService2.default.extend({
  overpassIds: {},

  /**
   * @constructs
   * @param {object} options
   */
  constructor: function constructor() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.options = _extends({}, this.options, defaultOptions, { // defaultOptions from that service file
      onSuccess: this.onSuccess }, options, { // User options
      endpoint: (0, _utils.removeTrailingSlash)(options.endpoint || defaultOptions.endpoint)
    });
  },


  /**
   * Clear the known POI ids
   */
  clear: function clear() {
    this.overpassIds = {};
  },


  /**
   * Enlarge the area covered by the bounds
   * @param {L.Bounds} bounds
   * @return {L.Bounds}
   */
  buildRequestBounds: function buildRequestBounds(bounds) {
    return (0, _utils.buildLargerBounds)(bounds);
  },


  /**
   * Method called by Nectarivore to build the request to the API
   * @param {L.Bounds} bounds
   * @return {Promise}
   */
  buildRequestPromise: function buildRequestPromise(bounds, signal) {
    var query = this.buildOverpassQueryFromQueryAndBounds(this.options.query, bounds);
    var endpoint = this.options.endpoint;
    var url = endpoint + '/interpreter?data=' + query;

    return fetch(url, { method: 'GET', signal: signal }).then(function (response) {
      return response.json();
    });
  },


  /**
   * Build the query to send to Overpass
   * @param {string} query
   * @param {L.Bounds} bounds
   * @return {string}
   */
  buildOverpassQueryFromQueryAndBounds: function buildOverpassQueryFromQueryAndBounds(query, bounds) {
    var sw = bounds._southWest;
    var ne = bounds._northEast;
    var coordinates = [sw.lat, sw.lng, ne.lat, ne.lng].join(',');
    return query.replace(/\s*\/\/.*/g, '').replace(/\s*\/\*[\s\S]*\*\/\s*/g, '').replace(/^\s*(\[.*\];)?\s*/g, '[out:json];').replace(/(\{\{bbox\}\})/g, coordinates);
  },


  /**
   * Default onSuccess callback for the Overpass service
   * @param {object} data Data returned by the request
   */
  onSuccess: function onSuccess(data) {
    var _this = this;

    data.elements.forEach(function (element) {
      if (typeof element.lat === 'undefined' && !element.center) {
        return;
      }

      if (element.id in _this.overpassIds) {
        return;
      }

      _this.overpassIds[element.id] = true;

      var latLng = element.type === 'node' ? new _leaflet2.default.LatLng(element.lat, element.lon) : new _leaflet2.default.LatLng(element.center.lat, element.center.lon);

      var marker = _this.options.markerIcon ? (0, _marker.buildIconMarker)(latLng, _this.options.markerIcon) : (0, _marker.buildCircleMarker)(latLng);

      var popup = _this.buildPopup(element.tags, element.id);
      marker.bindPopup(popup);

      _this.markers.addLayer(marker);
    });
  },


  /**
   * Build a Leaflet popup from POI informations
   * @param {object} tags
   * @param {string} id
   * @return {L.Popup}
   */
  buildPopup: function buildPopup(tags, id) {
    var anchor = document.createElement('a');
    anchor.href = 'https://www.openstreetmap.org/edit?editor=id&node=' + id;
    anchor.style.display = 'block';
    anchor.style.marginBottom = '15px';
    anchor.style.textAlign = 'center';
    anchor.appendChild(document.createTextNode('Edit this entry in iD'));

    var table = document.createElement('table');
    table.style.border = '1px solid #ccc';
    table.style.borderSpacing = '0';
    table.style.borderCollapse = 'separate';

    var odd = true;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(tags)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        odd = !odd;
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        row.style.background = odd ? '#efefef' : '#fff';
        cell1.style.padding = '5px 10px';
        cell2.style.padding = '5px 10px';

        cell1.appendChild(document.createTextNode(key));
        cell2.appendChild(document.createTextNode(tags[key]));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var div = document.createElement('div');
    div.appendChild(anchor);
    div.appendChild(table);

    return _leaflet2.default.popup().setContent(div);
  }
});

var overpass = exports.overpass = function overpass(options) {
  return new Overpass(options);
};

exports.default = overpass;

/***/ }),

/***/ "leaflet":
/*!************************************************************************!*\
  !*** external {"commonjs":"leaflet","commonjs2":"leaflet","root":"L"} ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_leaflet__;

/***/ })

/******/ });
});
//# sourceMappingURL=leaflet-nectarivore.js.map