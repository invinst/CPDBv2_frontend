import should from 'should';

import { getCMSFields, hasCMSContent } from 'selectors/cms';
import { LANDING_PAGE_ID } from 'utils/constants';


describe('cms selectors', function () {
  describe('getCMSFields', function () {
    it('should return cms page fields', function () {
      const state = {
        cms: {
          pages: {
            abc: {
              fields: '123',
            },
          },
        },
      };

      getCMSFields('abc')(state).should.eql('123');
    });

    it('should return null if page content does not exist', function () {
      const state = {
        cms: {
          pages: {},
        },
      };

      should(getCMSFields('abc')(state)).eql(null);
    });
  });

  describe('hasCMSContent', function () {
    const state = {
      cms: {
        pages: {
          [LANDING_PAGE_ID]: {
            fields: '123',
          },
        },
      },
    };

    it('should return true if page content exist', function () {
      hasCMSContent(LANDING_PAGE_ID)(state).should.be.true();
    });

    it('should return false if page content does not exist', function () {
      hasCMSContent('NOT_EXISTING_PAGE_ID')(state).should.be.false();
    });
  });
});
