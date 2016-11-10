import editModeOnSelector, { editModeOn } from 'selectors/edit-mode-on';


describe('editModeOnSelector', function () {
  describe('editModeOn', function () {
    it('should return true if path is /edit/...', function () {
      const path = '/edit/a';
      editModeOn(path).should.be.true();
    });

    it('should return false if path is not /edit/...', function () {
      const path = '/a';
      editModeOn(path).should.be.false();
    });
  });

  describe('editModeOnSelector', function () {
    it('should return true/false base on location', function () {
      editModeOnSelector({}, { location: { pathname: '/edit/a' } }).should.be.true();
      editModeOnSelector({}, { location: { pathname: '/a' } }).should.be.false();
    });
  });
});
