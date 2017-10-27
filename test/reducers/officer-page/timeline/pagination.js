import pagination from 'reducers/officer-page/timeline/pagination';

import {
  OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS,
  OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE,
  OFFICER_TIMELINE_FLIP_SORT_ORDER,
  OFFICER_TIMELINE_FIRST_ITEMS_REQUEST_SUCCESS
} from 'utils/constants';


describe('pagination reducer', function () {
  it('should have initial state', function () {
    pagination(undefined, {}).should.eql({ 'next': null, 'previous': null });
  });

  it('should handle OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS', function () {
    pagination({ 'next': null, 'previous': null }, {
      type: OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS,
      payload: { 'next': 'next', 'previous': 'prev' }
    }).should.eql({ 'next': 'next', 'previous': 'prev' });
  });

  it('should handle OFFICER_TIMELINE_FIRST_ITEMS_REQUEST_SUCCESS', function () {
    pagination({ 'next': null, 'previous': null }, {
      type: OFFICER_TIMELINE_FIRST_ITEMS_REQUEST_SUCCESS,
      payload: { 'next': 'next', 'previous': 'previous' }
    }).should.eql({ 'next': 'next', 'previous': null });
  });

  it('should handle OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE', function () {
    pagination({ 'next': 'next', 'previous': 'prev' }, {
      type: OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE
    }).should.eql({ 'next': null, 'previous': null });
  });

  it('should handle OFFICER_TIMELINE_FLIP_SORT_ORDER', function () {
    pagination({ 'next': 'next', 'previous': 'prev' }, {
      type: OFFICER_TIMELINE_FLIP_SORT_ORDER
    }).should.eql({ 'next': null, 'previous': null });
  });
});
