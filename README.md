[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub release](https://img.shields.io/github/release/osmlab/leaflet-nectarivore.svg)](https://github.com/osmlab/leaflet-nectarivore/releases)
[![Build Status](https://api.travis-ci.org/osmlab/leaflet-nectarivore.svg?branch=develop)](http://travis-ci.org/osmlab/leaflet-nectarivore)
[![Coverage Status](https://coveralls.io/repos/github/osmlab/leaflet-nectarivore/badge.svg?branch=develop)](https://coveralls.io/github/osmlab/leaflet-nectarivore?branch=develop)

# Leaflet Nectarivore

Leaflet Nectarivore is a plugin to create layers based on remote services (Overpass, Osmose, etc.). Its name is a nod to [Leaflet Omnivore](https://github.com/mapbox/leaflet-omnivore), which _eats_ several kind of files to display informations on a Leaflet map. Leaflet Nectarivore _gathers nectar_ from remote services to create its layers on the map.

The first two supported services are Overpass and Osmose. See the demo pages here:

* [Overpass demo page](https://osmlab.github.io/leaflet-nectarivore/overpass.html)
* [Osmose demo page](https://osmlab.github.io/leaflet-nectarivore/osmose.html)


## Installation

```
$ npm install leaflet-nectarivore
```


## Usage

### Overpass

``` javascript
import Nectarivore from 'leaflet-nectarivore';

const attributions = [
  'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  'POI via <a href="https://www.overpass-api.de">Overpass API</a>',
];

const tileLayer = new L.TileLayer(
  'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
  { attribution: attributions.join(', ') }
);

const overpassLayer = Nectarivore.overpass({
  minZoom: 15,
  endPoint: 'https://overpass-api.de/api',
  query: 'node({{bbox}})["amenity"="post_box"];out;',
});

const map = new L.Map('my-map')
  .addLayer(tileLayer)
  .addLayer(overpassLayer)
  .setView(new L.LatLng(44.84061, -0.5724), 15);
```

In order to get a valid query the [Overpass-turbo IDE](http://overpass-turbo.eu/) might help.


### Osmose

``` javascript
import Nectarivore from 'leaflet-nectarivore';

const attributions = [
  'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  'POI via <a href="http://wiki.openstreetmap.org/wiki/Osmose">Osmose API</a>',
];

const tileLayer = new L.TileLayer(
  'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
  { attribution: attributions.join(', ') }
);

const osmoseLayer = L.Nectarivore.osmose({
  minZoom: 15,
  endpoint: 'https://osmose.openstreetmap.fr/api/0.2',
  language: 'en',
  item: 8120,
  status: 'open',
});

const map = new L.Map('my-map')
  .addLayer(tileLayer)
  .addLayer(osmoseLayer)
  .setView(new L.LatLng(44.84061, -0.5724), 15);
```


## Options

```javascript
{
  debug: false,
  minZoom: 15,
  endpoint: '',
  loadedBounds: [],
  markerIcon: null,
  timeout: 30 * 1000, // Milliseconds
  retryOnTimeout: false,
  noInitialRequest: false,
  beforeRequest: function() {},
  afterRequest: function() {},
  onSuccess: function(data) {},
  onError: function(xhr) {},
  onTimeout: function(xhr) {},
}
```

### Overpass supplemental options

```javascript
{
  endpoint: 'https://overpass-api.de/api',
  query: `(
    node({{bbox}})[organic];
    node({{bbox}})[second_hand];
  );
  out qt;`
}
```


### Osmose supplemental options

```javascript
{
  endpoint: 'https://osmose.openstreetmap.fr/api/0.2',
  language: 'en'
}
```


## Contribute

```
$ git clone git@github.com:osmlab/leaflet-nectarivore.git leaflet-nectarivore
$ cd leaflet-nectarivore
$ npm install
$ npm run watch
```


### How to add a service

> Please do!

All the plugin logic is in the `services/baseService.js` file. It is then extended by the service logic by creating specific fies in the `services` folder.

So in order to add another service you have to:

1. Create your service file in the `services` folder by duplicating `overpass.js` or `osmose.js`.
2. Replace the service defaultOptions by yours.
3. Replace the logic, you just have to let 4 methods:
  * constructor: Called at the plugin instanciation.
  * clear: Called when the query/endpoint is replaced by the user.
  * buildRequestBounds: Called when the map is moved. It lets you modify the requested bounds.
  * buildRequestPromise: Called to build the actual request to the service. It has to return a Promise.
4. Reference your new service file in the `service/index.js` file.
5. Add some tests for your service logic ;) In the `services/__tests__` folder.
6. Add a demo page in the `docs` folder.
7. Document your service in the `README.md` file
