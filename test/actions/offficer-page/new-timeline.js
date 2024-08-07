import { fetchNewTimelineItems, changeFilter } from 'actions/officer-page/new-timeline';

import {
  OFFICER_URL,
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_START,
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS,
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE,
  OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER,
} from 'utils/constants';


describe('officer new timeline actions', function () {
  describe('fetchNewTimelineItems', function () {
    it('should return the right action', function () {
      fetchNewTimelineItems(123).should.eql({
        types: [
          OFFICER_NEW_TIMELINE_ITEMS_REQUEST_START,
          OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS,
          OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${OFFICER_URL}123/new-timeline-items/`,
            params: undefined,
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('changeFilter', function () {
    it('should return the right action', function () {
      changeFilter('COMPLAINTS').should.eql({
        type: OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER,
        payload: 'COMPLAINTS',
      });
    });
  });
});
