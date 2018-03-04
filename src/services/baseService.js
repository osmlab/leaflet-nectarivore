import L from 'leaflet';
import uuid from 'uuid/v4';
import Bounds from 'helpers/bounds';
import Boxes from 'helpers/boxes';
import { removeTrailingSlash } from 'helpers/utils';

const defaultOptions = {
  debug: false,
  minZoom: 15,
  endpoint: '',
  loadedBounds: [],
  markerIcon: L.Icon(),
  timeout: 30 * 1000, // Milliseconds
  retryOnTimeout: false,
  noInitialRequest: false,
  onSuccess: () => {},
  onError: () => {},
  onTimeout: () => {},
  beforeRequest: () => {},
  afterRequest: () => {}
};

export default L.FeatureGroup.extend({
  options: {
    ...defaultOptions
  },

  initialize(options = {}) {
    this.options = {
      ...defaultOptions,
      ...options,
      endpoint: removeTrailingSlash(options.endpoint || '')
    };

    this.id = uuid();

    this.constructor(options);
  },

  // To overwrite by the children
  constructor() {},

  // To overwrite by the children
  clear() {},

  // To overwrite by the children
  buildRequestBounds(bounds) {
    return bounds;
  },

  // To overwrite by the children
  buildRequestPromise() {
    return Promise.resolve({});
  },

  onAdd(map) {
    this.map = map;
    this.bounds = new Bounds();
    this.requestInProgress = false;
    this.markers = L.featureGroup().addTo(this.map);

    if (this.options.debug) {
      this.boxes = new Boxes();
      this.boxes.setMap(map);
    }

    if (!this.options.noInitialRequest) {
      this.prepareRequest();
    }

    this.map.on('moveend', this.prepareRequest, this);
  },

  onRemove(map) {
    L.LayerGroup.prototype.onRemove.call(this, map);

    this._clear();
    this.clear();

    map.off('moveend', this.prepareRequest, this);

    this.map = null;
  },

  _clear() {
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
  setQuery(query) {
    this.options.query = query;
    this._clear();
    this.clear();
    this.prepareRequest();
  },

  prepareRequest() {
    if (this.map.getZoom() < this.options.minZoom) {
      return false;
    }

    const bounds = this.buildRequestBounds(this.map.getBounds());
    const nextRequest = this.sendRequest.bind(this, bounds);

    if (this.requestInProgress) {
      this.setNextRequest(nextRequest);
    } else {
      this.removeNextRequest();
      nextRequest();
    }
  },

  hasNextRequest() {
    return !!this.nextRequest;
  },

  getNextRequest() {
    return this.nextRequest;
  },

  setNextRequest(nextRequest) {
    this.nextRequest = nextRequest;
  },

  removeNextRequest() {
    this.nextRequest = null;
  },

  sendRequest(bounds) {
    if (this.bounds.areFullyLoaded(bounds)) {
      this.requestInProgress = false;
      return;
    }

    const beforeRequestResult = this.options.beforeRequest.call(this);

    if (beforeRequestResult === false) {
      this.options.afterRequest.call(this);
      return;
    }

    if (this.options.debug) {
      this.boxes.addRequestBox(bounds);
    }

    this.requestInProgress = true;

    const controller = new window.AbortController();
    const signal = controller.signal;
    const request = this.buildRequestPromise(bounds, signal);
    const timeout = setTimeout(() => {
      controller.abort();
      this.onRequestTimeout(request, bounds);
    }, this.options.timeout);

    request
      .then(response => {
        clearTimeout(timeout);
        this.options.onSuccess.call(this, response);
        this.onRequestLoadCallback(bounds);
      })
      .catch(() => {
        clearTimeout(timeout);
        this.onRequestErrorCallback(bounds);
        this.options.onError.call(this, request);
      })
      .then(() => this.onRequestCompleteCallback(bounds));
  },

  onRequestTimeout(request, bounds) {
    this.options.onTimeout.call(this, request);

    if (this.options.retryOnTimeout) {
      this.sendRequest(bounds);
    } else {
      this.onRequestErrorCallback(bounds);
      this.onRequestCompleteCallback(bounds);
    }
  },

  onRequestLoadCallback(bounds) {
    this.bounds.add(bounds);

    if (this.options.debug) {
      this.boxes.addResponseBoxes(this.boxes.getRequestBoxes());
    }
  },

  onRequestErrorCallback(bounds) {
    if (this.options.debug) {
      this.boxes.removeRequestBox(bounds);
    }
  },

  onRequestCompleteCallback() {
    this.options.afterRequest.call(this);

    if (this.hasNextRequest()) {
      const nextRequest = this.getNextRequest();
      this.removeNextRequest();
      nextRequest();
    } else {
      this.requestInProgress = false;
    }
  }
});
