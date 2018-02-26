import editModeOnSelector from 'selectors/edit-mode-on';


describe('editModeOnSelector', function () {
  it('should return true/false base on location', function () {
    editModeOnSelector({}, { location: { pathname: '/edit/a' } }).should.be.true();
    editModeOnSelector({}, { location: { pathname: '/a' } }).should.be.false();
  });
});
