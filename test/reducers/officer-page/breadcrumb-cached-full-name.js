import breadcrumbCachedFullName from 'reducers/officer-page/breadcrumb-cached-full-name';

import { OFFICER_SUMMARY_REQUEST_SUCCESS } from 'utils/constants';


describe('breadcrumbCachedFullName reducer', function () {
  it('should have initial state', function () {
    breadcrumbCachedFullName(undefined, {}).should.eql('');
  });

  it('should handle OFFICER_SUMMARY_REQUEST_SUCCESS', function () {
    breadcrumbCachedFullName(undefined, {
      type: OFFICER_SUMMARY_REQUEST_SUCCESS,
      payload: { 'full_name': 'Mr. Foo' },
    }).should.eql('Mr. Foo');
  });
});
