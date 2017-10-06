import activityGrid from 'reducers/landing-page/activity-grid';


describe('activityGrid reducer', function () {
  it('should return initial state', function () {
    activityGrid(undefined, {}).should.eql({
      cards: [],
      isRequesting: false
    });
  });
});
