import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/common/relevant-infinite-carousel';
import RelevantComplaints from 'components/pinboard-page/relevant/relevant-complaints';
import RelevantComplaintCard from 'components/pinboard-page/relevant/relevant-complaints/relevant-complaint-card';


describe('RelevantComplaints component', function () {
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
    const complaints = [{
      category: 'False Arrest',
      crid: '1089128',
      incidentDate: 'Feb 1, 2018',
      point: {
        lat: 41.7924183,
        lon: -87.668458,
      },
      officers: firstOfficers,
    }, {
      category: 'Unknown',
      crid: '1085255',
      incidentDate: 'May 18, 2017',
      point: {
        lat: 41.800831,
        lon: -87.6222052,
      },
      officers: [],
    }];
    const addItemInPinboardPageStub = stub();
    const fetchPinboardRelevantComplaintsStub = stub();

    instance = renderIntoDocument(
      <RelevantComplaints
        addItemInPinboardPage={ addItemInPinboardPageStub }
        fetchPinboardRelevantComplaints={ fetchPinboardRelevantComplaintsStub }
        complaints={ complaints }
        hasMore={ true }
        pinboardId='66ef1560'
        nextParams={ { limit: 20, offset: 20 } }
      />
    );

    const relevantInfiniteCarousel = findRenderedComponentWithType(instance, RelevantInfiniteCarousel);
    relevantInfiniteCarousel.props.title.should.eql('COMPLAINTS');
    relevantInfiniteCarousel.props.childWidth.should.eql(306);
    relevantInfiniteCarousel.props.hasMore.should.be.true();

    const RelevantComplaintCards = scryRenderedComponentsWithType(relevantInfiniteCarousel, RelevantComplaintCard);
    RelevantComplaintCards.should.have.length(2);

    RelevantComplaintCards[0].props.crid.should.eql('1089128');
    RelevantComplaintCards[0].props.incidentDate.should.eql('Feb 1, 2018');
    RelevantComplaintCards[0].props.category.should.eql('False Arrest');
    RelevantComplaintCards[0].props.officers.should.eql(firstOfficers);
    RelevantComplaintCards[0].props.point.should.eql({ lat: 41.7924183, lon: -87.668458 });

    RelevantComplaintCards[1].props.crid.should.eql('1085255');
    RelevantComplaintCards[1].props.incidentDate.should.eql('May 18, 2017');
    RelevantComplaintCards[1].props.category.should.eql('Unknown');
    RelevantComplaintCards[1].props.officers.should.eql([]);
    RelevantComplaintCards[1].props.point.should.eql({ lat: 41.800831, lon: -87.6222052 });

    relevantInfiniteCarousel.props.loadMore();
    fetchPinboardRelevantComplaintsStub.should.be.calledOnce();
    fetchPinboardRelevantComplaintsStub.should.be.calledWith('66ef1560', { limit: 20, offset: 20 });
  });
});
