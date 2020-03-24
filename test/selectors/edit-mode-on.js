import editModeOnSelector, { openLoginByDefaultSelector } from 'selectors/edit-mode-on';


describe('Edit mode selectors', function () {
  describe('editModeOnSelector', function () {
    it('should return true/false base on location', function () {
      editModeOnSelector({ pathname: '/edit/a' }).should.be.true();
      editModeOnSelector({ pathname: '/a' }).should.be.false();
    });
  });

  describe('openLoginByDefaultSelector', function () {
    it('should return true/false base on location', function () {
      openLoginByDefaultSelector({ pathname: '/edit/a' }).should.be.false();
      openLoginByDefaultSelector({ pathname: '/a' }).should.be.false();
      openLoginByDefaultSelector({ pathname: '/view-all-pinboards/' }).should.be.true();
      openLoginByDefaultSelector({ pathname: '/edit/view-all-pinboards/' }).should.be.true();
    });
  });
});
