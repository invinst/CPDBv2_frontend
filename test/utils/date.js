import should from 'should';
import { formatDate } from 'utils/date';


describe('formatDate function', () => {
  it('should return correct format string', () => {
    formatDate('2017-01-03').should.eql('JAN 3, 2017');
  });

  it('should return null when cannot parse string to moment object', () => {
    should(formatDate(null)).be.null();
    should(formatDate('fdsafdsa')).be.null();
  });
});
