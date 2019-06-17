import { shouldRedirect } from 'selectors/pinboard-page/redirect';


describe('Redirect selectors', function () {
  describe('shouldRedirect', function () {
    it('should return correct status', function () {
      shouldRedirect({ pinboardPage: { redirect: false } }).should.be.false();
      shouldRedirect({ pinboardPage: { redirect: true } }).should.be.true();
    });
  });
});
