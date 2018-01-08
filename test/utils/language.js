import { pluralize } from 'utils/language';


describe('Language utils', function () {
  describe('pluralize()', function () {
    it('should pluralize when `count` param is not provided', function () {
      pluralize('Complaint').should.eql('Complaints');
    });

    it('should pluralize when count > 1', function () {
      pluralize('dog', 2).should.eql('dogs');
      pluralize('cat', 100).should.eql('cats');
    });

    it('should not pluralize when count <= 1', function () {
      pluralize('dog', 1).should.eql('dog');
      pluralize('cat', 0).should.eql('cat');
    });
  });
});
