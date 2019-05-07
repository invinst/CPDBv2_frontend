import relevantDocuments from 'reducers/pinboard-page/relevant-documents';
import * as constants from 'utils/constants';


const defaultState = { items: [], count: 0, pagination: { next: null, previous: null } };

describe('relevantDocuments reducer', function () {
  it('should have initial state', function () {
    relevantDocuments(undefined, {}).should.eql(defaultState);
  });

  it('should handle PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS', function () {
    const documents = [{
      'id': 16316,
      'preview_image_url': 'https://www.documentcloud.org/documents/CRID-1074534-TRR-Stegmiller-p1-normal.gif',
      'url': 'https://www.documentcloud.org/documents/3037807/CRID-1074534-TRR-Stegmiller.pdf',
      'allegation': {
        'crid': '1074534',
        'category': 'Unknown',
        'incident_date': '2015-04-04',
        'officers': []
      }
    },
    {
      'id': 2289,
      'preview_image_url': null,
      'url': 'https://w.soundcloud.com/player/?url=https%3A/s=false&amp;visual=true',
      'allegation': {
        'crid': '1074534',
        'category': 'Unknown',
        'incident_date': '2015-04-04',
        'officers': []
      }
    }];

    relevantDocuments(defaultState, {
      type: constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS,
      payload: {
        next: '/pinboards/66ef1560/relevant-documents/?limit=20&offset=20',
        previous: null,
        count: 444,
        results: documents,
      }
    }).should.eql({
      items: documents,
      count: 444,
      pagination: {
        next: '/pinboards/66ef1560/relevant-documents/?limit=20&offset=20',
        previous: null
      },
    });
  });

  it('should handle PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS', function () {
    const existingDocuments = [{
      'id': 16316,
      'preview_image_url': 'https://www.documentcloud.org/documents/CRID-1074534-TRR-Stegmiller-p1-normal.gif',
      'url': 'https://www.documentcloud.org/documents/3037807/CRID-1074534-TRR-Stegmiller.pdf',
      'allegation': {
        'crid': '1074534',
        'category': 'Unknown',
        'incident_date': '2015-04-04',
        'officers': []
      }
    }, {
      'id': 2289,
      'preview_image_url': null,
      'url': 'https://w.soundcloud.com/player/?url=https%3A/s=false&amp;visual=true',
      'allegation': {
        'crid': '1074534',
        'category': 'Unknown',
        'incident_date': '2015-04-04',
        'officers': []
      }
    }];
    const newDocuments = [{
      'id': 14665,
      'preview_image_url': 'https://assets.documentcloud.org//CRID-1074534-CR-Tactical-p1-normal.gif',
      'url': 'https://assets.documentcloud.org/documents/5679695/CRID-1074534-CR-Tactical.pdf',
      'allegation': {
        'crid': '1074534',
        'category': 'Unknown',
        'incident_date': '2015-04-04',
        'officers': []
      }
    }, {
      'id': 14660,
      'preview_image_url': 'https://assets.documentcloud.org/documents/CRID-1074534-CR-Arrest.gif',
      'url': 'https://assets.documentcloud.org/documents/5679691/CRID-1074534-CR-Arrest.pdf',
      'allegation': {
        'crid': '1074534',
        'category': 'Unknown',
        'incident_date': '2015-04-04',
        'officers': []
      }
    }];

    const currentState = {
      items: existingDocuments,
      count: 444,
      pagination: {
        next: '/pinboards/66ef1560/relevant-documents/?limit=20&offset=20',
        previous: null
      }
    };

    relevantDocuments(currentState, {
      type: constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS,
      payload: {
        next: '/pinboards/66ef1560/relevant-documents/?limit=20&offset=40',
        previous: '/pinboards/66ef1560/relevant-documents/?',
        count: 444,
        results: newDocuments,
      }
    }).should.eql({
      items: existingDocuments.concat(newDocuments),
      count: 444,
      pagination: {
        next: '/pinboards/66ef1560/relevant-documents/?limit=20&offset=40',
        previous: '/pinboards/66ef1560/relevant-documents/?',
      },
    });
  });

  it('should handle PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_FAILURE', function () {
    const existingDocuments = [{
      'id': 16316,
      'preview_image_url': 'https://www.documentcloud.org/documents/CRID-1074534-TRR-Stegmiller-p1-normal.gif',
      'url': 'https://www.documentcloud.org/documents/3037807/CRID-1074534-TRR-Stegmiller.pdf',
      'allegation': {
        'crid': '1074534',
        'category': 'Unknown',
        'incident_date': '2015-04-04',
        'officers': []
      }
    }, {
      'id': 2289,
      'preview_image_url': null,
      'url': 'https://w.soundcloud.com/player/?url=https%3A/s=false&amp;visual=true',
      'allegation': {
        'crid': '1074534',
        'category': 'Unknown',
        'incident_date': '2015-04-04',
        'officers': []
      }
    }];

    const currentState = {
      items: existingDocuments,
      count: 444,
      pagination: {
        next: '/pinboards/66ef1560/relevant-documents/?limit=20&offset=40',
        previous: '/pinboards/66ef1560/relevant-documents/?',
      }
    };

    relevantDocuments(currentState, {
      type: constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_FAILURE,
      payload: {}
    }).should.eql({
      items: existingDocuments,
      count: 444,
      pagination: { next: null, previous: null },
    });
  });
});
