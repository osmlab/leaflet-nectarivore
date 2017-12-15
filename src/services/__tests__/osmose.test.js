import L from 'leaflet';
import Osmose from '../osmose';

const bounds = L.latLngBounds([2.1234, 3.876], [-4.1234, -0.876]);

describe('When testing the Boxes class', () => {
  let osmose;

  beforeEach(() => {
    osmose = new Osmose();
  });

  describe('When testing the buildOsmoseOptions function', () => {
    it('Should return the filtered Osmose API options', () => {
      const options = {
        endpoint: 'https://osmose.openstreetmap.fr/api/0.2',
        language: 'fr',
        item: '1234,5678',
        debug: false,
        minZoom: 15,
        loadedBounds: [],
        markerIcon: null,
        timeout: 30 * 1000, // Milliseconds
        retryOnTimeout: false,
        noInitialRequest: false,
        onSuccess: () => {},
        onError: () => {},
        onTimeout: () => {},
        beforeRequest: () => {},
        afterRequest: () => {}
      };
      const expected = {
        bbox: '-0.876,-4.1234,3.876,2.1234',
        item: '1234,5678'
      };
      const result = osmose.buildOsmoseOptions(options, bounds);

      expect(result).toEqual(expected);
    });
  });
});
