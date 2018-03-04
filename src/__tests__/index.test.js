import LeafletNectarivore from '../index';

describe('When I test Leaflet Nectarivore', () => {
  it('Should export one empty object per service', () => {
    expect(LeafletNectarivore.osmose).toBeDefined();
    expect(LeafletNectarivore.overpass).toBeDefined();
  });
});
