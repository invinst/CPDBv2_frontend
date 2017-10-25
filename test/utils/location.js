import {
  getOfficerId,
  hasOfficerIdChanged,
  getCrId,
  isRedirectingToOfficerTimelinePage,
  serializeFilterParams
} from 'utils/location';


describe('location utils', function () {
  describe('getOfficerId', function () {
    it('should return the officer id', function () {
      getOfficerId('/officer/10/').should.eql(10);
    });

    it('should return NaN if wrong url was given', function () {
      isNaN(getOfficerId('foo')).should.be.true();
    });
  });

  describe('getCrId', function () {
    it('should return the Complaint record Id', function () {
      getCrId('/complaint/123/').should.eql(123);
    });
  });

  describe('hasOfficerIdChanged', function () {
    const locationChangeAction = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/officer/1/'
      }
    };
    it('should return true if location and officer id changed', function () {
      hasOfficerIdChanged(locationChangeAction, 2).should.be.true();
    });

    it('should return false if officer id not changed', function () {
      hasOfficerIdChanged(locationChangeAction, 1).should.be.false();
    });

    it('should return false if not @@router/LOCATION_CHANGE action', function () {
      hasOfficerIdChanged({
        type: 'ANY'
      }, 2).should.be.false();
    });

    it('should return false if @@router/LOCATION_CHANGE action and wrong url', function () {
      hasOfficerIdChanged({
        type: '@@router/LOCATION_CHANGE',
        payload: {
          pathname: '/foo/2/'
        }
      }, 2).should.be.false();
    });
  });

  describe('isRedirectingToOfficerTimelinePage', function () {

    it('should return true if @@router/LOCATION_CHANGE action and current page is Officer Timeline', function () {
      isRedirectingToOfficerTimelinePage({
        type: '@@router/LOCATION_CHANGE',
        payload: {
          pathname: '/officer/1/timeline/'
        }
      }).should.be.true();
    });

    it('should return false if @@router/LOCATION_CHANGE action and wrong url', function () {
      isRedirectingToOfficerTimelinePage({
        type: '@@router/LOCATION_CHANGE',
        payload: {
          pathname: '/foo/2/'
        }
      }).should.be.false();
    });

    it('should return false if get another action', function () {
      isRedirectingToOfficerTimelinePage({
        type: 'SOME ACTION',
        payload: {
          pathname: '/officer/1/timeline/'
        }
      }).should.be.false();
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
});
