import L from 'leaflet';
import Boxes from '../boxes';

const bounds = L.latLngBounds([2.1234, 3.876], [-4.1234, -0.876]);

describe('When testing the Boxes class', () => {
  let boxes;

  beforeEach(() => {
    boxes = new Boxes();
  });

  describe('When testing the buildRequestBox method', () => {
    it('Should return a proper L.Rectangle', () => {
      const requestBox = boxes.buildRequestBox(bounds);

      expect(requestBox).toBeInstanceOf(L.Rectangle);
      expect(requestBox.getBounds()).toEqual(bounds);
    });
  });

  describe('When testing the buildResponseBox method', () => {
    it('Should return a proper L.Rectangle', () => {
      const responseBox = boxes.buildResponseBox(bounds);

      expect(responseBox).toBeInstanceOf(L.Rectangle);
      expect(responseBox.getBounds()).toEqual(bounds);
    });
  });

  describe('When adding some boxes', () => {
    it('Should return some boxes', () => {
      boxes.addRequestBox(bounds);
      boxes.addResponseBox(bounds);

      expect(boxes.getRequestBoxes().length).toBe(1);
      expect(boxes.getResponseBoxes().length).toBe(1);

      boxes.addResponseBoxes([
        boxes.buildRequestBox(bounds),
        boxes.buildRequestBox(bounds)
      ]);

      expect(boxes.getResponseBoxes().length).toBe(3);
    });
  });

  describe('When clearing the existing boxes', () => {
    it('Should return no boxes', () => {
      boxes.addRequestBox(bounds);
      boxes.addResponseBox(bounds);

      expect(boxes.getRequestBoxes().length).toBe(1);
      expect(boxes.getResponseBoxes().length).toBe(1);

      boxes.clear();

      expect(boxes.getRequestBoxes().length).toBe(0);
      expect(boxes.getResponseBoxes().length).toBe(0);
    });
  });

  describe('When removing the request boxes', () => {
    it('Should return no boxes', () => {
      boxes.addRequestBox(bounds);

      expect(boxes.getRequestBoxes().length).toBe(1);

      boxes.removeRequestBoxes();

      expect(boxes.getRequestBoxes().length).toBe(0);
    });
  });

  describe('When removing one request box', () => {
    it('Should not return that box', () => {
      boxes.addRequestBox(bounds);

      expect(boxes.getRequestBoxes().length).toBe(1);

      boxes.removeRequestBox(bounds);

      expect(boxes.getRequestBoxes().length).toBe(0);
    });
  });
});
