import heatMap from 'reducers/landing-page/heat-map';


describe('heatMap reducer', function () {
  it('should have initial state', function () {
    heatMap(undefined, {}).should.eql({
      citySummary: {},
      communities: null,
      clusterGeoJson: null,
    });
  });
});
