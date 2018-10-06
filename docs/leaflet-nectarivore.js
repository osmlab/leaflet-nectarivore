!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var o in n)("object"==typeof exports?exports:e)[o]=n[o]}}(window,function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t){e.exports=require("leaflet")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e};t.removeTrailingSlash=function(e){return e.replace(/\/*$/,"")},t.buildLargerBounds=function(e){var t=o({},e),n=Math.abs(t._northEast.lng-t._southWest.lng),s=Math.abs(t._northEast.lat-t._southWest.lat),u=n>s?n:s;return t._southWest.lat-=u/2,t._southWest.lng-=u/2,t._northEast.lat+=u/2,t._northEast.lng+=u/2,r.default.latLngBounds(r.default.latLng(t._southWest.lat,t._southWest.lng).wrap(),r.default.latLng(t._northEast.lat,t._northEast.lng).wrap())};var r=function(e){return e&&e.__esModule?e:{default:e}}(n(0))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=l(n(0)),s=l(n(8)),u=l(n(9)),i=l(n(11)),a=n(1);function l(e){return e&&e.__esModule?e:{default:e}}var c={debug:!1,minZoom:15,endpoint:"",loadedBounds:[],markerIcon:null,timeout:3e4,retryOnTimeout:!1,noInitialRequest:!1,onSuccess:function(){},onError:function(){},onTimeout:function(){},beforeRequest:function(){},afterRequest:function(){}};t.default=r.default.FeatureGroup.extend({options:o({},c),initialize:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.options=o({},c,e,{endpoint:(0,a.removeTrailingSlash)(e.endpoint||"")}),this.id=(0,s.default)(),this.constructor(e)},constructor:function(){},clear:function(){},buildRequestBounds:function(e){return e},buildRequestPromise:function(){return Promise.resolve({})},onAdd:function(e){this.map=e,this.bounds=new u.default,this.requestInProgress=!1,this.markers=r.default.featureGroup().addTo(this.map),this.options.debug&&(this.boxes=new i.default,this.boxes.setMap(e)),this.options.noInitialRequest||this.prepareRequest(),this.map.on("moveend",this.prepareRequest,this)},onRemove:function(e){r.default.LayerGroup.prototype.onRemove.call(this,e),this._clear(),this.clear(),e.off("moveend",this.prepareRequest,this),this.map=null},_clear:function(){this.bounds.clear(),this.markers.clearLayers(),this.requestInProgress=!1,this.options.debug&&this.boxes.clear()},setQuery:function(e){this.options.query=e,this._clear(),this.clear(),this.prepareRequest()},prepareRequest:function(){if(this.map.getZoom()<this.options.minZoom)return!1;var e=this.buildRequestBounds(this.map.getBounds()),t=this.sendRequest.bind(this,e);this.requestInProgress?this.setNextRequest(t):(this.removeNextRequest(),t())},hasNextRequest:function(){return!!this.nextRequest},getNextRequest:function(){return this.nextRequest},setNextRequest:function(e){this.nextRequest=e},removeNextRequest:function(){this.nextRequest=null},sendRequest:function(e){var t=this;if(this.bounds.areFullyLoaded(e))this.requestInProgress=!1;else if(!1!==this.options.beforeRequest.call(this)){this.options.debug&&this.boxes.addRequestBox(e),this.requestInProgress=!0;var n=new window.AbortController,o=n.signal,r=this.buildRequestPromise(e,o),s=setTimeout(function(){n.abort(),t.onRequestTimeout(r,e)},this.options.timeout);r.then(function(n){clearTimeout(s),t.options.onSuccess.call(t,n),t.onRequestLoadCallback(e)}).catch(function(){clearTimeout(s),t.onRequestErrorCallback(e),t.options.onError.call(t,r)}).then(function(){return t.onRequestCompleteCallback(e)})}else this.options.afterRequest.call(this)},onRequestTimeout:function(e,t){this.options.onTimeout.call(this,e),this.options.retryOnTimeout?this.sendRequest(t):(this.onRequestErrorCallback(t),this.onRequestCompleteCallback(t))},onRequestLoadCallback:function(e){this.bounds.add(e),this.options.debug&&this.boxes.addResponseBoxes(this.boxes.getRequestBoxes())},onRequestErrorCallback:function(e){this.options.debug&&this.boxes.removeRequestBox(e)},onRequestCompleteCallback:function(){if(this.options.afterRequest.call(this),this.hasNextRequest()){var e=this.getNextRequest();this.removeNextRequest(),e()}else this.requestInProgress=!1}})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.buildIconMarker=function(e,t){return o.default.marker(e,{icon:t})},t.buildCircleMarker=function(e){return o.default.circle(e,20,{stroke:!1,fillColor:"tomato",fillOpacity:.9})};var o=function(e){return e&&e.__esModule?e:{default:e}}(n(0))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(5));"undefined"!=typeof fetch&&n(14),window&&window.L&&(window.L.Nectarivore=o({},r)),t.default=o({},r)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(6);Object.defineProperty(t,"overpass",{enumerable:!0,get:function(){return o.overpass}});var r=n(12);Object.defineProperty(t,"osmose",{enumerable:!0,get:function(){return r.osmose}})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.overpass=void 0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=l(n(7)),s=l(n(0)),u=l(n(2)),i=n(3),a=n(1);function l(e){return e&&e.__esModule?e:{default:e}}var c={endpoint:"https://overpass-api.de/api",query:"(\n    node({{bbox}})[organic];\n    node({{bbox}})[second_hand];\n  );\n  out qt;"},d=u.default.extend({overpassIds:{},constructor:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.options=o({},this.options,c,{onSuccess:this.onSuccess},e,{endpoint:(0,a.removeTrailingSlash)(e.endpoint||c.endpoint)})},clear:function(){this.overpassIds={}},buildRequestBounds:function(e){return(0,a.buildLargerBounds)(e)},buildRequestPromise:function(e,t){var n=this.buildOverpassQueryFromQueryAndBounds(this.options.query,e),o=this.options.endpoint+"/interpreter?data="+n;return(0,r.default)(o,{method:"GET",signal:t}).then(function(e){return e.json()})},buildOverpassQueryFromQueryAndBounds:function(e,t){var n=t._southWest,o=t._northEast,r=[n.lat,n.lng,o.lat,o.lng].join(",");return e.replace(/\s*\/\/.*/g,"").replace(/\s*\/\*[\s\S]*\*\/\s*/g,"").replace(/^\s*(\[.*\];)?\s*/g,"[out:json];").replace(/(\{\{bbox\}\})/g,r)},onSuccess:function(e){var t=this;e.elements.forEach(function(e){if((void 0!==e.lat||e.center)&&!(e.id in t.overpassIds)){t.overpassIds[e.id]=!0;var n="node"===e.type?s.default.latLng(e.lat,e.lon):s.default.latLng(e.center.lat,e.center.lon),o=t.options.markerIcon?(0,i.buildIconMarker)(n,t.options.markerIcon):(0,i.buildCircleMarker)(n),r=t.buildPopup(e.tags,e.id);o.bindPopup(r),t.markers.addLayer(o)}})},buildPopup:function(e,t){var n=document.createElement("a");n.href="https://www.openstreetmap.org/edit?editor=id&node="+t,n.style.display="block",n.style.marginBottom="15px",n.style.textAlign="center",n.appendChild(document.createTextNode("Edit this entry in iD"));var o=document.createElement("table");o.style.border="1px solid #ccc",o.style.borderSpacing="0",o.style.borderCollapse="separate";var r=!0,u=!0,i=!1,a=void 0;try{for(var l,c=Object.keys(e)[Symbol.iterator]();!(u=(l=c.next()).done);u=!0){var d=l.value;r=!r;var f=o.insertRow(0),p=f.insertCell(0),h=f.insertCell(1);f.style.background=r?"#efefef":"#fff",p.style.padding="5px 10px",h.style.padding="5px 10px",p.appendChild(document.createTextNode(d)),h.appendChild(document.createTextNode(e[d]))}}catch(e){i=!0,a=e}finally{try{!u&&c.return&&c.return()}finally{if(i)throw a}}var v=document.createElement("div");return v.appendChild(n),v.appendChild(o),s.default.popup().setContent(v)}}),f=t.overpass=function(e){return new d(e)};t.default=f},function(e,t){e.exports=require("unfetch")},function(e,t){e.exports=require("uuid/v4")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=u(n(0)),s=u(n(10));function u(e){return e&&e.__esModule?e:{default:e}}var i=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.loadedBounds=[]}return o(e,[{key:"add",value:function(e){this.loadedBounds.push(e)}},{key:"get",value:function(){return[].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(this.loadedBounds))}},{key:"clear",value:function(){this.loadedBounds=[]}},{key:"areFullyLoaded",value:function(t){if(0===this.loadedBounds.length)return!1;var n=e.buildClipsFromBoundsList([t]),o=e.buildClipsFromBoundsList(this.loadedBounds),r=new s.default.Clipper,u=new s.default.PolyTree;return r.AddPaths(n,s.default.PolyType.ptSubject,!0),r.AddPaths(o,s.default.PolyType.ptClip,!0),r.Execute(s.default.ClipType.ctDifference,u,s.default.PolyFillType.pftNonZero,s.default.PolyFillType.pftNonZero),0===s.default.JS.PolyTreeToExPolygons(u).length}}],[{key:"buildClipsFromBoundsList",value:function(e){return e.map(function(e){return[{X:1e6*e._southWest.lng,Y:1e6*e._southWest.lat},{X:1e6*e._southWest.lng,Y:1e6*e._northEast.lat},{X:1e6*e._northEast.lng,Y:1e6*e._northEast.lat},{X:1e6*e._northEast.lng,Y:1e6*e._southWest.lat}]})}},{key:"buildBoundsListFromClips",value:function(e){return e.map(function(e){return r.default.latLngBounds(r.default.latLng(e[0].Y/1e6,e[0].X/1e6).wrap(),r.default.latLng(e[2].Y/1e6,e[2].X/1e6).wrap())})}}]),e}();t.default=i},function(e,t){e.exports=require("js-clipper")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=function(e){return e&&e.__esModule?e:{default:e}}(n(0));var u=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.boxStyle={stroke:!1,fillOpacity:.15,clickable:!1},this.map=null,this.requestBoxes=s.default.featureGroup(),this.responseBoxes=s.default.featureGroup()}return r(e,[{key:"setMap",value:function(e){this.map=e,this.requestBoxes=s.default.featureGroup().addTo(e),this.responseBoxes=s.default.featureGroup().addTo(e)}},{key:"buildRequestBox",value:function(e){return s.default.rectangle(e,o({},this.boxStyle,{bounds:e,color:"tomato"}))}},{key:"buildResponseBox",value:function(e){return s.default.rectangle(e,o({},this.boxStyle,{bounds:e,color:"black"}))}},{key:"addRequestBox",value:function(e){return this.requestBoxes.addLayer(this.buildRequestBox(e)).bringToBack()}},{key:"addResponseBox",value:function(e){return this.responseBoxes.addLayer(this.buildResponseBox(e)).bringToBack()}},{key:"addResponseBoxes",value:function(e){var t=this;e.forEach(function(e){return t.addResponseBox(e.getBounds())}),this.removeRequestBoxes()}},{key:"getRequestBoxes",value:function(){return this.requestBoxes.getLayers()}},{key:"getResponseBoxes",value:function(){return this.responseBoxes.getLayers()}},{key:"clear",value:function(){this.requestBoxes.clearLayers(),this.responseBoxes.clearLayers()}},{key:"removeRequestBox",value:function(e){var t=this.requestBoxes.getLayers().find(function(t){var n=t.getBounds();return n._northEast.lng===e._northEast.lng&&n._northEast.lat===e._northEast.lat&&n._southWest.lng===e._southWest.lng&&n._southWest.lat===e._southWest.lat});return this.requestBoxes.removeLayer(t)}},{key:"removeRequestBoxes",value:function(){return this.requestBoxes.clearLayers()}}]),e}();t.default=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.osmose=void 0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=l(n(0)),s=l(n(13)),u=l(n(2)),i=n(3),a=n(1);function l(e){return e&&e.__esModule?e:{default:e}}var c={endpoint:"https://osmose.openstreetmap.fr/api/0.2",language:"en"},d=u.default.extend({osmoseIds:{},constructor:function(e){this.options=o({},this.options,c,{onSuccess:this.onSuccess},e,{endpoint:(0,a.removeTrailingSlash)(e.endpoint||c.endpoint)}),this.osmoseRequest=new s.default({endpoint:this.options.endpoint,language:this.options.language})},clear:function(){this.osmoseIds={}},buildRequestBounds:function(e){return(0,a.buildLargerBounds)(e)},buildRequestPromise:function(e){var t=this.buildOsmoseOptions(this.options,e);return this.osmoseRequest.fetchErrors(t)},buildOsmoseOptions:function(e,t){var n=t._southWest,o=t._northEast,r={bbox:[n.lng,n.lat,o.lng,o.lat].join(",")};return["item","source","class","username","level","full","zoom","limit","country","useDevItem","status","start_date","end_date","tags","fixables"].forEach(function(t){e[t]&&(r[t]=e[t])}),r},onSuccess:function(e){var t=this;e.forEach(function(e){if(!(e.error_id in t.osmoseIds)){t.osmoseIds[e.error_id]=!0;var n=r.default.latLng(e.lat,e.lon),o=t.options.markerIcon?(0,i.buildIconMarker)(n,t.options.markerIcon):(0,i.buildCircleMarker)(n);t.markers.addLayer(o)}})}}),f=t.osmose=function(e){return new d(e)};t.default=f},function(e,t){e.exports=require("osmose-request")},function(e,t){e.exports=require("abortcontroller-polyfill/dist/polyfill-patch-fetch")}]).default});
//# sourceMappingURL=leaflet-nectarivore.js.map