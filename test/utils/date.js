import should from 'should';
import { formatDate, getCareerDuration } from 'utils/date';


describe('date module', function () {
  describe('formatDate function', () => {
    it('should return correct format string', () => {
      formatDate('2017-01-03').should.eql('Jan 3, 2017');
    });

    it('should uppercase when uppercase is true', () => {
      formatDate('2017-01-03', true).should.eql('JAN 3, 2017');
    });

    it('should return empty string when the string is null, undefined, empty or moment-unparsable', () => {
      should(formatDate(null)).equal('');
      should(formatDate(undefined)).equal('');
      should(formatDate('')).equal('');
      should(formatDate('2017-13-13')).equal('');
    });
  });

  describe('getCareerDuration function', () => {
    it('should return correct career duration string', () => {
      should(getCareerDuration(null, '1999-12-13')).be.eql('INVALID DATE — DEC 13, 1999');
      should(getCareerDuration('1999-12-13', null)).be.eql('DEC 13, 1999 — Present');
      should(getCareerDuration('1999-12-13', '2015-12-23')).be.eql('DEC 13, 1999 — DEC 23, 2015');
    });
  });
});
