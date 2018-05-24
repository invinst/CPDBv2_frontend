import should from 'should';

import { getCMSFields, hasLandingPageCMSContent } from 'selectors/cms';
import { LANDING_PAGE_ID } from 'utils/constants';


describe('cms selectors', function () {
  describe('getCMSFields', function () {
    it('should return cms page fields', function () {
      const state = {
        cms: {
          pages: {
            abc: {
              fields: '123'
            }
          }
        }
      };

      getCMSFields('abc')(state).should.eql('123');
    });

    it('should return null if page content does not exist', function () {
      const state = {
        cms: {
          pages: {}
        }
      };

      should(getCMSFields('abc')(state)).eql(null);
    });
  });

  describe('hasLandingPageCMSContent', function () {
    it('should return true if page content exist', function () {
      const state = {
        cms: {
          pages: {
            [LANDING_PAGE_ID]: {
              fields: '123'
            }
          }
        }
      };

      hasLandingPageCMSContent(state).should.be.true();
    });

    it('should return false if page content does not exist', function () {
      const state = {
        cms: {
          pages: {}
        }
      };
      hasLandingPageCMSContent(state).should.be.false();
    });
  });
});
