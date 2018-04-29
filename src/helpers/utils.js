import L from 'leaflet';

/**
 * Remove the trailing slash from an URL and return it
 * @param  {string} url
 * @return {string} - The cleaned URL
 */
export function removeTrailingSlash(url) {
  return url.replace(/\/*$/, '');
}

/**
 * Increase the dimension of the bounds
 * @param  {L.Bounds} rawBounds - Leaflet bounds
 * @return {L.LatLngBounds} - Increased bounds
 */
export function buildLargerBounds(rawBounds) {
  const bounds = { ...rawBounds };
  const width = Math.abs(bounds._northEast.lng - bounds._southWest.lng);
  const height = Math.abs(bounds._northEast.lat - bounds._southWest.lat);
  const biggestDimension = width > height ? width : height;

  bounds._southWest.lat -= biggestDimension / 2;
  bounds._southWest.lng -= biggestDimension / 2;
  bounds._northEast.lat += biggestDimension / 2;
  bounds._northEast.lng += biggestDimension / 2;

  return L.latLngBounds(
    L.latLng(bounds._southWest.lat, bounds._southWest.lng).wrap(),
    L.latLng(bounds._northEast.lat, bounds._northEast.lng).wrap()
  );
}
