import should from 'should';

import {
  getOfficerId,
  getCRID,
  getComplaintOfficerId,
  getOfficerActiveTab,
  serializeFilterParams,
  officerPath,
  getUnitName
} from 'utils/location';


describe('location utils', function () {
  describe('officerPath', function () {
    it('should return right url', function () {
      officerPath('timeline', '/officer/1/').should.eql('/officer/1/timeline/');
      officerPath('summary', '/officer/1/summary').should.eql('/officer/1/summary/');
      officerPath('timeline', '/officer/1234').should.eql('/officer/1234/timeline/');
      officerPath('', '/officer/12345/timeline/').should.eql('/officer/12345/');
    });
  });

  describe('getOfficerId', function () {
    it('should return the officer id', function () {
      getOfficerId('/officer/10/').should.eql(10);
    });

    it('should return NaN if wrong url was given', function () {
      isNaN(getOfficerId('foo')).should.be.true();
    });

    it('should return NaN if url is undefined', function () {
      isNaN(getOfficerId(undefined)).should.be.true();
    });
  });

  describe('getCRID', function () {
    it('should return null when url is undefined', function () {
      should(getCRID(undefined)).be.null();
    });

    it('should return crid', function () {
      getCRID('/complaint/C123/').should.eql('C123');
    });
  });

  describe('getComplaintOfficerId', function () {
    it('should return NaN when url is undefined', function () {
      getComplaintOfficerId(undefined).should.be.NaN();
    });

    it('should return complaint officer id', function () {
      getComplaintOfficerId('/complaint/123/456').should.eql(456);
    });
  });

  describe('getOfficerActiveTab', function () {
    it('should return null when url is not an officer path', function () {
      should.not.exist(getOfficerActiveTab('/some/incorrect/path/'));
    });

    it('should return officer active tab', function () {
      getOfficerActiveTab('/officer/123/timeline/').should.eql('timeline');
      getOfficerActiveTab('/officer/123/social/').should.eql('social');
      getOfficerActiveTab('/officer/123/').should.eql('');
    });
  });

  describe('serializeFilterParams', function () {

    it('should return object params to url string', function () {
      serializeFilterParams({
        'age': '51+',
        'category': 'Illegal Search'
      }).should.eql('age=51%2B&category=Illegal%20Search');

      serializeFilterParams({
        'age': '41-50',
        'category': 'Illegal Search'
      }, '?').should.eql('?age=41-50&category=Illegal%20Search');
    });
  });

  describe('getUnitName', function () {
    it('should return null when url is undefined', function () {
      should(getUnitName(undefined)).eql(null);
    });

    it('should return unit name', function () {
      getUnitName('/unit/123/').should.eql('123');
    });
  });
});
