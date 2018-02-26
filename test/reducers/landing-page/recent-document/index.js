import recentDocument from 'reducers/landing-page/recent-document';


describe('officersByAllegation reducer', function () {
  it('should return initial state', function () {
    recentDocument(undefined, {}).should.eql({
      cards: [],
      isRequesting: false
    });
  });
});
