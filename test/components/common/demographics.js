import Demographics from 'components/common/demographics';


describe('Demographics component', function () {
  it('should renderable', function () {
    Demographics.should.be.renderable({ persons: ['Black, Male, age 41'] });
  });
});
