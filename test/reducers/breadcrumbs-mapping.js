import breadcrumbsMapping from 'reducers/breadcrumbs-mapping';

import * as constants from 'utils/constants';


describe('breadcrumbsMapping', function () {
  it('should return initial state', function () {
    breadcrumbsMapping(undefined, {}).should.eql({});
  });

  it('should store officer breadcrumb text', function () {
    breadcrumbsMapping({}, {
      type: constants.OFFICER_SUMMARY_REQUEST_SUCCESS,
      payload: {
        id: '123',
        'full_name': 'Ronald Hernandez'
      }
    }).should.eql({ '/officer/123/': 'Ronald Hernandez' });
  });

  it('should store complaint breadcrumb text', function () {
    breadcrumbsMapping({}, {
      type: constants.CR_REQUEST_SUCCESS,
      payload: {
        crid: '456'
      }
    }).should.eql({ '/complaint/456/': 'CR 456' });
  });

  it('should store unit breadcrumb text', function () {
    breadcrumbsMapping({}, {
      type: constants.UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS,
      payload: {
        description: 'Mobile strike force',
        'unit_name': '001'
      }
    }).should.eql({ '/unit/001/': '001 Mobile strike force' });
  });

  it('should store trr breadcrumb text', function () {
    breadcrumbsMapping({}, {
      type: constants.TRR_REQUEST_SUCCESS,
      payload: {
        id: '123',
      }
    }).should.eql({ '/trr/123/': 'TRR 123' });
  });

  it('should store document crid text', function () {
    breadcrumbsMapping({}, {
      type: constants.DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS,
      request: {
        params: {
          crid: 1000000
        }
      }
    }).should.eql({ '/documents/crid/1000000/': '#1000000 document deduplicator' });
  });
});
