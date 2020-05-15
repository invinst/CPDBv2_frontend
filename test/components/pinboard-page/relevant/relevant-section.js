import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import should from 'should';

import RelevantSection from 'components/pinboard-page/relevant';
import RelevantDocuments from 'components/pinboard-page/relevant/relevant-documents';
import RelevantCoaccusals from 'components/pinboard-page/relevant/relevant-coaccusals';
import RelevantComplaints from 'components/pinboard-page/relevant/relevant-complaints';


describe('RelevantSection component', function () {
  it('should render nothing when no data', function () {
    const wrapper = shallow(
      <RelevantSection
        pinboardId='66ef1560'
        documents={ [] }
        coaccusals={ [] }
        complaints={ [] }
      />
    );

    should(wrapper.type()).be.null();
  });

  it('should render relevant rows correctly', function () {
    const fetchPinboardRelevantDocuments = spy();
    const fetchPinboardRelevantCoaccusals = spy();
    const fetchPinboardRelevantComplaints = spy();
    const addItemInPinboardPage = spy();
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
        items: [
          { axis: 'Use of Force Reports', value: 0 },
          { axis: 'Officer Allegations', value: 85.8654 },
          { axis: 'Civilian Allegations', value: 49.4652 },
        ],
        visualTokenBackground: '#f9946b',
        textColor: '#231F20',
      },
    }];
    const complaints = [{
      crid: '1082207',
      category: 'Operation/Personnel Violations',
      incidentDate: 'Sep 11, 2016',
      point: { 'lon': -87.6097074, 'lat': 41.6600254 },
      officers: [],
    }];

    const wrapper = shallow(
      <RelevantSection
        pinboardId='66ef1560'
        fetchPinboardRelevantDocuments={ fetchPinboardRelevantDocuments }
        fetchPinboardRelevantCoaccusals={ fetchPinboardRelevantCoaccusals }
        fetchPinboardRelevantComplaints={ fetchPinboardRelevantComplaints }
        addItemInPinboardPage={ addItemInPinboardPage }
        documents={ documents }
        coaccusals={ coaccusals }
        complaints={ complaints }
        documentHasMore={ true }
        coaccusalHasMore={ true }
        complaintHasMore={ true }
        documentNextParams={ { limit: 19, offset: 20 } }
        coaccusalNextParams={ { limit: 21, offset: 22 } }
        complaintNextParams={ { limit: 23, offset: 24 } }
        isRequestingDocuments={ false }
        isRequestingCoaccusals={ false }
        isRequestingComplaints={ false }
      />
    );

    wrapper.find('.relevant-title').text().should.equal('Relevant');

    const relevantDocuments = wrapper.find(RelevantDocuments);
    relevantDocuments.prop('pinboardId').should.equal('66ef1560');
    relevantDocuments.prop('documents').should.eql(documents);
    relevantDocuments.prop('nextParams').should.eql({ limit: 19, offset: 20 });
    relevantDocuments.prop('hasMore').should.be.true();
    relevantDocuments.prop('requesting').should.be.false();
    relevantDocuments.prop('fetchPinboardRelevantDocuments').should.equal(fetchPinboardRelevantDocuments);
    relevantDocuments.prop('addItemInPinboardPage').should.equal(addItemInPinboardPage);

    const relevantCoaccusals = wrapper.find(RelevantCoaccusals);
    relevantCoaccusals.prop('pinboardId').should.equal('66ef1560');
    relevantCoaccusals.prop('coaccusals').should.eql(coaccusals);
    relevantCoaccusals.prop('nextParams').should.eql({ limit: 21, offset: 22 });
    relevantCoaccusals.prop('hasMore').should.be.true();
    relevantCoaccusals.prop('requesting').should.be.false();
    relevantCoaccusals.prop('fetchPinboardRelevantCoaccusals').should.equal(fetchPinboardRelevantCoaccusals);
    relevantCoaccusals.prop('addItemInPinboardPage').should.equal(addItemInPinboardPage);

    const relevantComplaints = wrapper.find(RelevantComplaints);
    relevantComplaints.prop('pinboardId').should.equal('66ef1560');
    relevantComplaints.prop('complaints').should.eql(complaints);
    relevantComplaints.prop('nextParams').should.eql({ limit: 23, offset: 24 });
    relevantComplaints.prop('hasMore').should.be.true();
    relevantComplaints.prop('requesting').should.be.false();
    relevantComplaints.prop('fetchPinboardRelevantComplaints').should.equal(fetchPinboardRelevantComplaints);
    relevantComplaints.prop('addItemInPinboardPage').should.equal(addItemInPinboardPage);
  });
});
