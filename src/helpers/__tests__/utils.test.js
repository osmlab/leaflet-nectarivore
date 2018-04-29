import L from 'leaflet';
import { buildLargerBounds, removeTrailingSlash } from '../utils';

describe('When testing the removeTrailingSlash utility', () => {
  it('Should return a cleaned URL all the time', () => {
    expect(removeTrailingSlash('http://localhost')).toBe('http://localhost');
    expect(removeTrailingSlash('http://localhost/')).toBe('http://localhost');
  });
});

describe('When testing the buildLargerBounds utility', () => {
  it('Should return an increased bounding box when the width is the larger dimension', () => {
    const bounds = L.latLngBounds(
      L.latLng(44.77135548852007, -0.6505966186523439),
      L.latLng(44.87436239539944, -0.5290603637695314)
    );
    const largerBounds = L.latLngBounds(
      L.latLng(44.93513052284084, -0.468292236328125),
      L.latLng(44.710587361078666, -0.71136474609375)
    );

    expect(buildLargerBounds(bounds)).toEqual(largerBounds);
  });

  it('Should return an increased bounding box when the height is the larger dimension', () => {
    const bounds = L.latLngBounds(
      L.latLng(44.78134766441461, -0.6124877929687501),
      L.latLng(44.879957968083765, -0.5664825439453126)
    );
    const largerBounds = L.latLngBounds(
      L.latLng(44.929263119918346, -0.5171773921107388),
      L.latLng(44.73204251258004, -0.6617929448033237)
    );

    expect(buildLargerBounds(bounds)).toEqual(largerBounds);
  });
});
