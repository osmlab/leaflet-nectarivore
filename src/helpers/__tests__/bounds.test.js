import L from 'leaflet';
import Bounds from '../bounds';

const latLngBounds = L.latLngBounds(
  [2.1234, 3.8759999999999764],
  [-4.1234, -0.8759999999999764]
);
const otherLatLngBounds = L.latLngBounds([3.1234, 2.876], [-5.1234, 10.876]);

describe('When testing the Bounds class', () => {
  let bounds;

  beforeEach(() => {
    bounds = new Bounds();
  });

  describe('When adding some bounds', () => {
    it('Should return a list of bounds', () => {
      bounds.add(latLngBounds);
      const loadedBounds = bounds.get();

      expect(loadedBounds.length).toBe(1);
      expect(loadedBounds[0]).toEqual(latLngBounds);
    });
  });

  describe('When clearing the bounds', () => {
    it('Should return an empty list of bounds', () => {
      bounds.add(latLngBounds);

      expect(bounds.get().length).toBe(1);

      bounds.clear();

      expect(bounds.get().length).toBe(0);
    });
  });

  describe('When testing if bounds are fully loaded', () => {
    it('Should return true', () => {
      bounds.add(latLngBounds);

      expect(bounds.areFullyLoaded(latLngBounds)).toBe(true);
    });

    it('Should return false', () => {
      // If there is no loaded bounds, the method should return false
      expect(bounds.areFullyLoaded(otherLatLngBounds)).toBe(false);

      bounds.add(latLngBounds);

      expect(bounds.areFullyLoaded(otherLatLngBounds)).toBe(false);
    });
  });

  describe('When building some clips and bounds', () => {
    it('Should return proper clips', () => {
      expect(Bounds.buildClipsFromBoundsList([latLngBounds])).toEqual([
        [
          { X: -875999.9999999764, Y: -4123400 },
          { X: -875999.9999999764, Y: 2123400 },
          { X: 3875999.9999999764, Y: 2123400 },
          { X: 3875999.9999999764, Y: -4123400 }
        ]
      ]);
    });

    it('Should return proper bounds', () => {
      expect(
        Bounds.buildBoundsListFromClips([
          [
            { X: -875999.9999999764, Y: -4123400 },
            { X: -875999.9999999764, Y: 2123400 },
            { X: 3875999.9999999764, Y: 2123400 },
            { X: 3875999.9999999764, Y: -4123400 }
          ]
        ])
      ).toEqual([latLngBounds]);
    });
  });
});
