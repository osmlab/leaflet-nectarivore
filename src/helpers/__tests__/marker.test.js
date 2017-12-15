import L from 'leaflet';
import { buildIconMarker, buildCircleMarker } from '../marker';

const latLng = L.latLng(2.1234, 3.876);

describe('When testing the marker helpers', () => {
  describe('When testing the buildIconMarker function', () => {
    it('Should return proper marker', () => {
      const marker = buildIconMarker(
        latLng,
        L.divIcon({ className: 'my-div-icon' })
      );

      expect(marker).toBeInstanceOf(L.Marker);
      expect(marker.getLatLng()).toBe(latLng);
    });
  });

  describe('When testing the buildCircleMarker function', () => {
    it('Should return proper marker', () => {
      const marker = buildCircleMarker(latLng);

      expect(marker).toBeInstanceOf(L.Circle);
      expect(marker.getLatLng()).toBe(latLng);
    });
  });
});
