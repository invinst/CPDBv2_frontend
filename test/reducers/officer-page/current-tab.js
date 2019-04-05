import currentTab from 'reducers/officer-page/current-tab';

import { CHANGE_OFFICER_TAB, CHANGE_OFFICER_ID } from 'utils/constants';


describe('currentTab reducer', function () {
  it('should have initial state', function () {
    currentTab(undefined, {}).should.eql('TIMELINE');
  });

  it('should handle CHANGE_OFFICER_TAB', function () {
    currentTab(undefined, {
      type: CHANGE_OFFICER_TAB,
      payload: 'DOCUMENTS'
    }).should.eql('DOCUMENTS');
  });

  it('should handle CHANGE_OFFICER_ID', function () {
    currentTab(undefined, {
      type: CHANGE_OFFICER_ID,
      payload: 'DOCUMENTS'
    }).should.eql('TIMELINE');
  });
});
