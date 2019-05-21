import React from 'react';
import should from 'should';
import { stub } from 'sinon';
import { Link } from 'react-router';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import RelevantComplaintCard from 'components/pinboard-page/relevant/relevant-complaints/relevant-complaint-card';
import BaseComplaintCard from 'components/pinboard-page/relevant/common/base-complaint-card';


describe('RelevantComplaintCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render enough content correctly', function () {
    const addItemInPinboardPageStub = stub();
    const officers = [{
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

    instance = renderIntoDocument(
      <RelevantComplaintCard
        crid='123'
        incidentDate='Feb 1, 2018'
        category='False Arrest'
        officers={ officers }
        point={ { lat: 41.7924183, lon: -87.668458 } }
        addItemInPinboardPage={ addItemInPinboardPageStub }
      />
    );

    const baseComplaintCard = findRenderedComponentWithType(instance, BaseComplaintCard);
    baseComplaintCard.props.crid.should.eql('123');
    baseComplaintCard.props.incidentDate.should.eql('Feb 1, 2018');
    baseComplaintCard.props.category.should.eql('False Arrest');
    baseComplaintCard.props.officers.should.eql(officers);
    baseComplaintCard.props.point.should.eql({ lat: 41.7924183, lon: -87.668458 });
    baseComplaintCard.props.addItemInPinboardPage.should.eql(addItemInPinboardPageStub);
    baseComplaintCard.props.leftChild.props.to.should.eql('/complaint/123/');
    baseComplaintCard.props.leftChild.props.style.should.eql({
      background: 'url(\"https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/' +
        'url-https%3A%2F%2Fcpdbv21777.blob.core.windows.net%2Fassets%2Fmap-marker.png' +
        '(-87.668458,41.7924183)/-87.668458,41.7924183,12,0,0/130x176@2x?access_token' +
        '=pk.eyJ1IjoiaW52aXNpYmxlaW5zdGl0dXRlIiwiYSI6ImNpZ256bXRqMDAwMDBzeGtud3VoZGpl' +
        'NHMifQ.ky2VSGEYU5KritRMArHY-w\") no-repeat center/cover'
    });
    baseComplaintCard.props.leftChild.type.should.be.eql(Link);
  });

  it('should render when no point', function () {
    const addItemInPinboardPageStub = stub();

    instance = renderIntoDocument(
      <RelevantComplaintCard
        crid='123'
        incidentDate='Feb 1, 2018'
        category='False Arrest'
        officers={ [] }
        point={ null }
        addItemInPinboardPage={ addItemInPinboardPageStub }
      />
    );

    const baseComplaintCard = findRenderedComponentWithType(instance, BaseComplaintCard);
    baseComplaintCard.props.crid.should.eql('123');
    baseComplaintCard.props.incidentDate.should.eql('Feb 1, 2018');
    baseComplaintCard.props.category.should.eql('False Arrest');
    baseComplaintCard.props.officers.should.eql([]);
    should(baseComplaintCard.props.point).be.null();
    baseComplaintCard.props.addItemInPinboardPage.should.eql(addItemInPinboardPageStub);
    baseComplaintCard.props.leftChild.props.to.should.eql('/complaint/123/');
    should(baseComplaintCard.props.leftChild.props.style).be.null();
    baseComplaintCard.props.leftChild.type.should.be.eql(Link);
  });
});
