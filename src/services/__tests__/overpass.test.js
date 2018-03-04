import L from 'leaflet';
import Overpass from '../overpass';

const bounds = L.latLngBounds([2.1234, 3.876], [-4.1234, -0.876]);

describe('When testing the Boxes class', () => {
  let overpass;

  beforeEach(() => {
    overpass = new Overpass();
  });

  describe('When testing the buildPopup function', () => {
    it('Should return a proper popup', () => {
      const id = 'node/12345';
      const tags = {
        amenity: 'recycling',
        name: 'Poubelle'
      };
      const popup = overpass.buildPopup(tags, id);

      expect(popup).toBeInstanceOf(L.Popup);
      expect(popup.getContent()).not.toBe('');
    });
  });

  describe('When testing the buildOverpassQueryFromQueryAndBounds function', () => {
    it('Should return a proper query', () => {
      const query = `
        /* Some comment */
        /*
           Some
           multiline
           comment
        */
      [out:json][timeout:25][bbox:43.489,-1.53338,43.589,-1.23338];
      (
        node({{bbox}})[organic];
        node({{bbox}})[second_hand];
      ); // Another comment
      out qt;`;
      const expected = `[out:json];(
        node(-4.1234,-0.876,2.1234,3.876)[organic];
        node(-4.1234,-0.876,2.1234,3.876)[second_hand];
      );
      out qt;`;
      const result = overpass.buildOverpassQueryFromQueryAndBounds(
        query,
        bounds
      );

      expect(result).toBe(expected);
    });
  });
});
