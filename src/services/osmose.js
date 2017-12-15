import L from 'leaflet';
import OsmoseRequest from 'osmose-request';
import BaseService from 'services/baseService';
import { buildIconMarker, buildCircleMarker } from 'helpers/marker';
import { removeTrailingSlash, buildLargerBounds } from 'helpers/utils';

const defaultOptions = {
  endpoint: 'https://osmose.openstreetmap.fr/api/0.2',
  language: 'en'
};

const Osmose = BaseService.extend({
  osmoseIds: {},

  /**
   * @constructs
   * @param {object} options
   */
  constructor(options) {
    this.options = {
      ...this.options, // defaultOptions from BaseService
      ...defaultOptions, // defaultOptions from that service file
      onSuccess: this.onSuccess, // Default onSuccess callback for that service
      ...options, // User options
      endpoint: removeTrailingSlash(options.endpoint || defaultOptions.endpoint)
    };

    this.osmoseRequest = new OsmoseRequest({
      endpoint: this.options.endpoint,
      language: this.options.language
    });
  },

  /**
   * Clear the known POI ids
   */
  clear() {
    this.osmoseIds = {};
  },

  /**
   * Enlarge the area covered by the bounds
   * @param {L.Bounds} bounds
   * @return {L.Bounds}
   */
  buildRequestBounds(bounds) {
    return buildLargerBounds(bounds);
  },

  /**
   * Method called by Nectarivore to build the request to the API
   * @param {L.Bounds} bounds
   * @return {Promise}
   */
  buildRequestPromise(bounds) {
    const options = this.buildOsmoseOptions(bounds, this.options);

    return this.osmoseRequest.fetchErrors(options);
  },

  /**
   * Build the options to send to the Osmose API
   * @param {object} options
   * @param {L.Bounds} bounds
   * @return {object}
   */
  buildOsmoseOptions(options, bounds) {
    const sw = bounds._southWest;
    const ne = bounds._northEast;
    const bbox = [sw.lng, sw.lat, ne.lng, ne.lat].join(',');
    const osmoseOptions = { bbox };

    [
      'item',
      'source',
      'class',
      'username',
      'level',
      'full',
      'zoom',
      'limit',
      'country',
      'useDevItem',
      'status',
      'start_date',
      'end_date',
      'tags',
      'fixables'
    ].forEach(optionName => {
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
  onSuccess(data) {
    data.forEach(element => {
      if (element.error_id in this.osmoseIds) {
        return;
      }

      this.osmoseIds[element.error_id] = true;

      const latLng = new L.LatLng(element.lat, element.lon);
      const marker = this.options.markerIcon
        ? buildIconMarker(latLng, this.options.markerIcon)
        : buildCircleMarker(latLng);

      this.markers.addLayer(marker);
    });
  }
});

export const osmose = options => new Osmose(options);

export default osmose;
