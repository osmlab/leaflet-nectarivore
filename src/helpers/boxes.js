import L from 'leaflet';

export default class Boxes {
  boxStyle = {
    stroke: false,
    fillOpacity: 0.15,
    clickable: false
  };

  map = null;
  requestBoxes = L.featureGroup();
  responseBoxes = L.featureGroup();

  /**
   * Store the map and add the request and response featureGroup to it
   * @param {L.Map} map
   */
  setMap(map) {
    this.map = map;
    this.requestBoxes = L.featureGroup().addTo(map);
    this.responseBoxes = L.featureGroup().addTo(map);
  }

  /**
   * Create a rectangle to materialize the request area
   * @param {L.Bounds} bounds
   * @return {L.Rectangle}
   */
  buildRequestBox(bounds) {
    return L.rectangle(bounds, {
      ...this.boxStyle,
      bounds: bounds,
      color: 'tomato'
    });
  }

  /**
   * Create a rectangle to materialize the response area
   * @param {L.Bounds} bounds
   * @return {L.Rectangle}
   */
  buildResponseBox(bounds) {
    return L.rectangle(bounds, {
      ...this.boxStyle,
      bounds: bounds,
      color: 'black'
    });
  }

  /**
   * Add a request box to the map
   * @param {L.Bounds} bounds
   * @return {L.Rectangle}
   */
  addRequestBox(bounds) {
    return this.requestBoxes
      .addLayer(this.buildRequestBox(bounds))
      .bringToBack();
  }

  /**
   * Create a rectangle to materialize the response area
   * @param {L.Bounds} bounds
   * @return {L.Rectangle}
   */
  addResponseBox(bounds) {
    return this.responseBoxes
      .addLayer(this.buildResponseBox(bounds))
      .bringToBack();
  }

  /**
   * Create a bunch of rectangle to materialize some request areas
   * @param {L.Rectangle[]} requestBoxes
   */
  addResponseBoxes(requestBoxes) {
    requestBoxes.forEach(box => this.addResponseBox(box.getBounds()));
    this.removeRequestBoxes();
  }

  /**
   * Returns all the request boxes in an array
   * @return {array}
   */
  getRequestBoxes() {
    return this.requestBoxes.getLayers();
  }

  /**
   * Returns all the response boxes in an array
   * @return {array}
   */
  getResponseBoxes() {
    return this.responseBoxes.getLayers();
  }

  /**
   * Clear all the request and response boxes
   */
  clear() {
    this.requestBoxes.clearLayers();
    this.responseBoxes.clearLayers();
  }

  /**
   * Remove a request box from its bounds
   * @param {L.Bounds} bounds
   * @return {boolean}
   */
  removeRequestBox(bounds) {
    const requestBox = this.requestBoxes.getLayers().find(box => {
      const boxBounds = box.getBounds();

      return (
        boxBounds._northEast.lng === bounds._northEast.lng &&
        boxBounds._northEast.lat === bounds._northEast.lat &&
        boxBounds._southWest.lng === bounds._southWest.lng &&
        boxBounds._southWest.lat === bounds._southWest.lat
      );
    });

    return this.requestBoxes.removeLayer(requestBox);
  }

  /**
   * Remove all the request boxes from the map
   * @return {boolean}
   */
  removeRequestBoxes() {
    return this.requestBoxes.clearLayers();
  }
}
