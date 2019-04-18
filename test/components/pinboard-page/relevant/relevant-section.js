import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import RelevantSection from 'components/pinboard-page/relevant';
import RelevantDocuments from 'components/pinboard-page/relevant/relevant-documents';
import RelevantCoaccusals from 'components/pinboard-page/relevant/relevant-coaccusals';
import RelevantComplaints from 'components/pinboard-page/relevant/relevant-complaints';


describe('RelevantSection component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render nothing when no data', function () {
    instance = renderIntoDocument(
      <RelevantSection
        pinboardId='66ef1560'
        documents={ {} }
        coaccusals={ {} }
        complaints={ {} }
      />
    );

    scryRenderedDOMComponentsWithTag(instance, 'div').should.have.length(0);
  });

  it('should render relevant rows correctly', function () {
    const fetchPinboardRelevantDocuments = spy();
    const fetchPinboardRelevantCoaccusals = spy();
    const fetchPinboardRelevantComplaints = spy();
    const addItemToPinboard = spy();
    const documents = [{
      previewImageUrl: 'https://www.documentcloud.org/documents/CRID-1074534-TRR-Stegmiller-p1-normal.gif',
      url: 'https://www.documentcloud.org/documents/3037807/CRID-1074534-TRR-Stegmiller.pdf',
      allegation: {
        crid: '1074534',
        category: 'Unknown',
        incidentDate: 'Apr 4, 2015',
        officers: [],
      },
      pinned: false,
    }];
    const coaccusals = [{
      id: 21992,
      rank: 'Police Officer',
      fullName: 'Johnny Patterson',
      coaccusalCount: 24,
      percentile: {
        year: 2006,
        items: [
          { axis: 'Use of Force Reports', value: 0 },
          { axis: 'Officer Allegations', value: 85.8654 },
          { axis: 'Civilian Allegations', value: 49.4652 }
        ],
        visualTokenBackground: '#f9946b',
        textColor: '#231F20',
      }
    }];
    const complaints = [{
      crid: '1082207',
      category: 'Operation/Personnel Violations',
      incidentDate: 'Sep 11, 2016',
      point: { 'lon': -87.6097074, 'lat': 41.6600254 },
      officers: [],
    }];

    instance = renderIntoDocument(
      <RelevantSection
        pinboardId='66ef1560'
        fetchPinboardRelevantDocuments={ fetchPinboardRelevantDocuments }
        fetchPinboardRelevantCoaccusals={ fetchPinboardRelevantCoaccusals }
        fetchPinboardRelevantComplaints={ fetchPinboardRelevantComplaints }
        addItemToPinboard={ addItemToPinboard }
        documents={ documents }
        coaccusals={ coaccusals }
        complaints={ complaints }
        documentHasMore={ true }
        coaccusalHasMore={ true }
        complaintHasMore={ true }
        documentNextParams={ { limit: 19, offset: 20 } }
        coaccusalNextParams={ { limit: 21, offset: 22 } }
        complaintNextParams={ { limit: 23, offset: 24 } }
      />
    );

    findRenderedDOMComponentWithClass(instance, 'relevant-title').textContent.should.equal('Relevant');

    const relevantDocuments = findRenderedComponentWithType(instance, RelevantDocuments);
    relevantDocuments.props.pinboardId.should.equal('66ef1560');
    relevantDocuments.props.documents.should.eql(documents);
    relevantDocuments.props.nextParams.should.eql({ limit: 19, offset: 20 });
    relevantDocuments.props.hasMore.should.be.true();
    relevantDocuments.props.fetchPinboardRelevantDocuments.should.equal(fetchPinboardRelevantDocuments);
    relevantDocuments.props.addItemToPinboard.should.equal(addItemToPinboard);

    const relevantCoaccusals = findRenderedComponentWithType(instance, RelevantCoaccusals);
    relevantCoaccusals.props.pinboardId.should.equal('66ef1560');
    relevantCoaccusals.props.coaccusals.should.eql(coaccusals);
    relevantCoaccusals.props.nextParams.should.eql({ limit: 21, offset: 22 });
    relevantCoaccusals.props.hasMore.should.be.true();
    relevantCoaccusals.props.fetchPinboardRelevantCoaccusals.should.equal(fetchPinboardRelevantCoaccusals);
    relevantCoaccusals.props.addItemToPinboard.should.equal(addItemToPinboard);

    const relevantComplaints = findRenderedComponentWithType(instance, RelevantComplaints);
    relevantComplaints.props.pinboardId.should.equal('66ef1560');
    relevantComplaints.props.complaints.should.eql(complaints);
    relevantComplaints.props.nextParams.should.eql({ limit: 23, offset: 24 });
    relevantComplaints.props.hasMore.should.be.true();
    relevantComplaints.props.fetchPinboardRelevantComplaints.should.equal(fetchPinboardRelevantComplaints);
    relevantComplaints.props.addItemToPinboard.should.equal(addItemToPinboard);
  });
});
