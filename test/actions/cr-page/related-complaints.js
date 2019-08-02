import * as constants from 'utils/constants';
import { fetchRelatedComplaints } from 'actions/cr-page/related-complaints';


describe('related complaints actions', function () {
  describe('fetchRelatedComplaints', function () {
    it('should return correct action for matching categories', function () {
      fetchRelatedComplaints(
        123,
        { match: 'categories', 'a': 1 }
      ).should.eql({
        types: [
          constants.RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_START,
          constants.RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_SUCCESS,
          constants.RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            params: undefined,
            adapter: null,
            url: `${constants.CR_URL}123/related-complaints/?match=categories&a=1`,
            cancelToken: undefined,
          },
        },
      });
    });

    it('should return correct action for matching officers', function () {
      fetchRelatedComplaints(
        123,
        { match: 'officers', 'a': 1 }
      ).should.eql({
        types: [
          constants.RELATED_COMPLAINTS_BY_OFFICER_REQUEST_START,
          constants.RELATED_COMPLAINTS_BY_OFFICER_REQUEST_SUCCESS,
          constants.RELATED_COMPLAINTS_BY_OFFICER_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            params: undefined,
            adapter: null,
            url: `${constants.CR_URL}123/related-complaints/?match=officers&a=1`,
            cancelToken: undefined,
          },
        },
      });
    });
  });
});
