import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/common/relevant-infinite-carousel';
import RelevantDocuments from 'components/pinboard-page/relevant/relevant-documents';
import RelevantDocumentCard from 'components/pinboard-page/relevant/relevant-documents/relevant-document-card';


describe('RelevantDocuments component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render enough content correctly', function () {
    const firstOfficers = [{
      fullName: 'Scott Mc Kenna',
      id: 32172,
      shortName: 'S. Kenna',
      percentile: {
        textColor: '#DFDFDF',
        visualTokenBackground: '#f0201e',
        year: 2016,
        items: [
          { axis: 'Use of Force Reports', value: 63.0035 },
          { axis: 'Officer Allegations', value: 88.3297 },
          { axis: 'Civilian Allegations', value: 98.7841 }
        ],
      },
    }, {
      fullName: 'Edwin Utreras',
      id: 32384,
      shortName: 'E. Utreras',
      percentile: {
        textColor: '#DFDFDF',
        visualTokenBackground: '#f0201e',
        year: 2016,
        items: [
          { axis: 'Use of Force Reports', value: 78.2707 },
          { axis: 'Officer Allegations', value: 0 },
          { axis: 'Civilian Allegations', value: 98.5549 }
        ],
      },
    }, {
      fullName: 'Joy Mcclain',
      id: 32176,
      shortName: 'J. Mcclain',
      percentile: {
        textColor: '#DFDFDF',
        visualTokenBackground: '#f52524',
        year: 2016,
        items: [
          { axis: 'Use of Force Reports', value: 84.1654 },
          { axis: 'Officer Allegations', value: 0 },
          { axis: 'Civilian Allegations', value: 97.0899 },
        ],
      },
    }];
    const firstAllegation = {
      category: 'False Arrest',
      crid: '1089128',
      incidentDate: 'Feb 1, 2018',
      point: {
        lat: 41.7924183,
        lon: -87.668458,
      },
      officers: firstOfficers,
    };
    const secondAllegation = {
      category: 'Unknown',
      crid: '1085255',
      incidentDate: 'May 18, 2017',
      point: {
        lat: 41.800831,
        lon: -87.6222052,
      },
      officers: [],
    };
    const documents = [{
      allegation: firstAllegation,
      url: 'https://www.documentcloud.org/documents/3108640/CRID-1078616-TRR-Rialmo.pdf',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif',
      pinned: true
    }, {
      allegation: secondAllegation,
      url: 'https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518950/pages/CRID-294088-CR-p1-normal.gif',
      pinned: false
    }];
    const addItemToPinboardStub = stub();
    const fetchPinboardRelevantDocumentsStub = stub();

    instance = renderIntoDocument(
      <RelevantDocuments
        addItemToPinboard={ addItemToPinboardStub }
        fetchPinboardRelevantDocuments={ fetchPinboardRelevantDocumentsStub }
        documents={ documents }
        hasMore={ true }
        pinboardId='66ef1560'
        nextParams={ { limit: 20, offset: 20 } }
      />
    );

    const relevantInfiniteCarousel = findRenderedComponentWithType(instance, RelevantInfiniteCarousel);
    relevantInfiniteCarousel.props.title.should.eql('DOCUMENTS');
    relevantInfiniteCarousel.props.childWidth.should.eql(306);
    relevantInfiniteCarousel.props.hasMore.should.be.true();

    const relevantDocumentCards = scryRenderedComponentsWithType(relevantInfiniteCarousel, RelevantDocumentCard);
    relevantDocumentCards.should.have.length(2);

    relevantDocumentCards[0].props.url.should.eql(
      'https://www.documentcloud.org/documents/3108640/CRID-1078616-TRR-Rialmo.pdf'
    );
    relevantDocumentCards[0].props.previewImageUrl.should.eql(
      'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif'
    );
    relevantDocumentCards[0].props.allegation.should.eql(firstAllegation);
    relevantDocumentCards[0].props.pinned.should.be.true();
    relevantDocumentCards[0].props.addItemToPinboard.should.eql(addItemToPinboardStub);

    relevantDocumentCards[1].props.url.should.eql(
      'https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html'
    );
    relevantDocumentCards[1].props.previewImageUrl.should.eql(
      'https://assets.documentcloud.org/documents/3518950/pages/CRID-294088-CR-p1-normal.gif'
    );
    relevantDocumentCards[1].props.allegation.should.eql(secondAllegation);
    relevantDocumentCards[1].props.pinned.should.be.false();
    relevantDocumentCards[1].props.addItemToPinboard.should.eql(addItemToPinboardStub);

    relevantInfiniteCarousel.props.loadMore();
    fetchPinboardRelevantDocumentsStub.should.be.calledOnce();
    fetchPinboardRelevantDocumentsStub.should.be.calledWith('66ef1560', { limit: 20, offset: 20 });
  });
});
