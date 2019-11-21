import editModeOnSelector, { openLoginByDefaultSelector } from 'selectors/edit-mode-on';


describe('Edit mode selectors', function () {
  describe('editModeOnSelector', function () {
    it('should return true/false base on location', function () {
      editModeOnSelector({}, { location: { pathname: '/edit/a' } }).should.be.true();
      editModeOnSelector({}, { location: { pathname: '/a' } }).should.be.false();
    });
  });

  describe('openLoginByDefaultSelector', function () {
    it('should return true/false base on location', function () {
      openLoginByDefaultSelector({}, { location: { pathname: '/edit/a' } }).should.be.false();
      openLoginByDefaultSelector({}, { location: { pathname: '/a' } }).should.be.false();
      openLoginByDefaultSelector({}, { location: { pathname: '/view-all-pinboards/' } }).should.be.true();
      openLoginByDefaultSelector({}, { location: { pathname: '/edit/view-all-pinboards/' } }).should.be.true();
    });
  });
});

