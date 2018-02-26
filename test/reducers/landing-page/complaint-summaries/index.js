import complaintSummaries from 'reducers/landing-page/complaint-summaries';


describe('complaintSummaries reducer', function () {
  it('should return initial state', function () {
    complaintSummaries(undefined, {}).should.eql({
      cards: [],
      isRequesting: false
    });
  });
});
