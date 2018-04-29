import fetch from 'unfetch';
import L from 'leaflet';
import BaseService from 'services/baseService';
import { buildIconMarker, buildCircleMarker } from 'helpers/marker';
import { removeTrailingSlash, buildLargerBounds } from 'helpers/utils';

const defaultOptions = {
  endpoint: 'https://overpass-api.de/api',
  query: `(
    node({{bbox}})[organic];
    node({{bbox}})[second_hand];
  );
  out qt;`
};

const Overpass = BaseService.extend({
  overpassIds: {},

  /**
   * @constructs
   * @param {object} options
   */
  constructor(options = {}) {
    this.options = {
      ...this.options, // defaultOptions from BaseService
      ...defaultOptions, // defaultOptions from that service file
      onSuccess: this.onSuccess, // Default onSuccess callback for that service
      ...options, // User options
      endpoint: removeTrailingSlash(options.endpoint || defaultOptions.endpoint)
    };
  },

  /**
   * Clear the known POI ids
   */
  clear() {
    this.overpassIds = {};
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
  buildRequestPromise(bounds, signal) {
    const query = this.buildOverpassQueryFromQueryAndBounds(
      this.options.query,
      bounds
    );
    const endpoint = this.options.endpoint;
    const url = `${endpoint}/interpreter?data=${query}`;

    return fetch(url, { method: 'GET', signal }).then(response =>
      response.json()
    );
  },

  /**
   * Build the query to send to Overpass
   * @param {string} query
   * @param {L.Bounds} bounds
   * @return {string}
   */
  buildOverpassQueryFromQueryAndBounds(query, bounds) {
    const sw = bounds._southWest;
    const ne = bounds._northEast;
    const coordinates = [sw.lat, sw.lng, ne.lat, ne.lng].join(',');
    return query
      .replace(/\s*\/\/.*/g, '')
      .replace(/\s*\/\*[\s\S]*\*\/\s*/g, '')
      .replace(/^\s*(\[.*\];)?\s*/g, '[out:json];')
      .replace(/(\{\{bbox\}\})/g, coordinates);
  },

  /**
   * Default onSuccess callback for the Overpass service
   * @param {object} data Data returned by the request
   */
  onSuccess(data) {
    data.elements.forEach(element => {
      if (typeof element.lat === 'undefined' && !element.center) {
        return;
      }

      if (element.id in this.overpassIds) {
        return;
      }

      this.overpassIds[element.id] = true;

      const latLng =
        element.type === 'node'
          ? L.latLng(element.lat, element.lon)
          : L.latLng(element.center.lat, element.center.lon);

      const marker = this.options.markerIcon
        ? buildIconMarker(latLng, this.options.markerIcon)
        : buildCircleMarker(latLng);

      const popup = this.buildPopup(element.tags, element.id);
      marker.bindPopup(popup);

      this.markers.addLayer(marker);
    });
  },

  /**
   * Build a Leaflet popup from POI informations
   * @param {object} tags
   * @param {string} id
   * @return {L.Popup}
   */
  buildPopup(tags, id) {
    const anchor = document.createElement('a');
    anchor.href = `https://www.openstreetmap.org/edit?editor=id&node=${id}`;
    anchor.style.display = 'block';
    anchor.style.marginBottom = '15px';
    anchor.style.textAlign = 'center';
    anchor.appendChild(document.createTextNode('Edit this entry in iD'));

    const table = document.createElement('table');
    table.style.border = '1px solid #ccc';
    table.style.borderSpacing = '0';
    table.style.borderCollapse = 'separate';

    let odd = true;
    for (const key of Object.keys(tags)) {
      odd = !odd;
      const row = table.insertRow(0);
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);

      row.style.background = odd ? '#efefef' : '#fff';
      cell1.style.padding = '5px 10px';
      cell2.style.padding = '5px 10px';

      cell1.appendChild(document.createTextNode(key));
      cell2.appendChild(document.createTextNode(tags[key]));
    }

    const div = document.createElement('div');
    div.appendChild(anchor);
    div.appendChild(table);

    return L.popup().setContent(div);
  }
});

export const overpass = options => new Overpass(options);

export default overpass;
