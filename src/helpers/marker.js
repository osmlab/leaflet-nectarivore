import L from 'leaflet';

/**
 * Build a Leaflet marker from an icon
 * @param {L.LatLng} latLng
 * @return {L.Marker}
 */
export function buildIconMarker(latLng, markerIcon) {
  return L.marker(latLng, { icon: markerIcon });
}

/**
 * Build a circular Leaflet marker
 * @param {L.LatLng} latLng
 * @return {L.Circle}
 */
export function buildCircleMarker(latLng) {
  return L.circle(latLng, 20, {
    stroke: false,
    fillColor: 'tomato',
    fillOpacity: 0.9
  });
}
