import { getOfficerId, hasOfficerIdChanged } from 'utils/location';


describe('location utils', function () {
  describe('getOfficerId', function () {
    it('should return the officer id', function () {
      getOfficerId('/officer/10/').should.eql(10);
    });

    it('should return NaN if wrong url was given', function () {
      isNaN(getOfficerId('foo')).should.be.true();
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
});
