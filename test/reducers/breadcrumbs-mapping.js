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

  it('should store document breadcrumb text when successfully requesting document', function () {
    breadcrumbsMapping({}, {
      type: constants.DOCUMENT_REQUEST_SUCCESS,
      payload: {
        id: '1234',
        title: 'CRID 1083633 Report',
      }
    }).should.eql({ '/document/1234/': 'CRID 1083633 Report' });
  });

  it('should store document breadcrumb text when successfully updating document page', function () {
    breadcrumbsMapping({}, {
      type: constants.UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS,
      payload: {
        id: '1234',
        title: 'CRID 1083633 Report',
      }
    }).should.eql({ '/document/1234/': 'CRID 1083633 Report' });
  });

  it('should store pinboard breadcrumb text when successfully creating pinboard ', function () {
    breadcrumbsMapping({}, {
      type: constants.PINBOARD_CREATE_REQUEST_SUCCESS,
      payload: {
        id: 'b3380b9b',
        title: 'Simple Title',
      }
    }).should.eql({ '/pinboard/b3380b9b/': 'Pinboard - Simple Title' });
  });

  it('should store pinboard breadcrumb text when successfully fetch pinboard page', function () {
    breadcrumbsMapping({}, {
      type: constants.PINBOARD_FETCH_REQUEST_SUCCESS,
      payload: {
        id: 'b3380b9b',
        title: 'My pinboard',
      }
    }).should.eql({ '/pinboard/b3380b9b/': 'Pinboard - My pinboard' });
  });

  it('should store pinboard breadcrumb text when successfully fetch pinboard page but without title', function () {
    breadcrumbsMapping({}, {
      type: constants.PINBOARD_FETCH_REQUEST_SUCCESS,
      payload: {
        id: 'b3380b9b',
        title: '',
      }
    }).should.eql({ '/pinboard/b3380b9b/': 'Pinboard' });
  });

  it('should store pinboard breadcrumb text when successfully update pinboard page', function () {
    breadcrumbsMapping({}, {
      type: constants.PINBOARD_UPDATE_REQUEST_SUCCESS,
      payload: {
        id: 'b3380b9b',
        title: 'My pinboard',
      }
    }).should.eql({ '/pinboard/b3380b9b/': 'Pinboard - My pinboard' });
  });

  it('should store pinboard breadcrumb text when successfully update pinboard page but without title', function () {
    breadcrumbsMapping({}, {
      type: constants.PINBOARD_UPDATE_REQUEST_SUCCESS,
      payload: {
        id: 'b3380b9b',
        title: '',
      }
    }).should.eql({ '/pinboard/b3380b9b/': 'Pinboard' });
  });

  it('should store pinboard breadcrumb text when successfully retrieve latest pinboard but without title', function () {
    breadcrumbsMapping({}, {
      type: constants.PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
      payload: {
        id: 'b3380b9b',
        title: '',
      }
    }).should.eql({ '/pinboard/b3380b9b/': 'Pinboard' });
  });
});
