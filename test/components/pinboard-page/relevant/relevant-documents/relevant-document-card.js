import React from 'react';
import { stub } from 'sinon';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithTag,
  findRenderedDOMComponentWithClass,
  Simulate
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import RelevantDocumentCard, { RelevantDocumentCardWithUndo }
  from 'components/pinboard-page/relevant/relevant-documents/relevant-document-card';
import BaseComplaintCard from 'components/pinboard-page/relevant/common/base-complaint-card';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';


describe('RelevantDocumentCard component', function () {
  let instance;
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
  const allegation = {
    category: 'False Arrest',
    crid: '1089128',
    incidentDate: 'Feb 1, 2018',
    point: { lat: 41.7924183, lon: -87.668458 },
    officers,
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render enough content correctly', function () {
    instance = renderIntoDocument(
      <RelevantDocumentCard
        url='https://www.documentcloud.org/documents/3108640/CRID-1078616-TRR-Rialmo.pdf'
        previewImageUrl='https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif'
        allegation={ allegation }
        addItemInPinboardPage={ addItemInPinboardPageStub }
        pinned={ false }
      />
    );

    const baseComplaintCard = findRenderedComponentWithType(instance, BaseComplaintCard);
    baseComplaintCard.props.crid.should.eql('1089128');
    baseComplaintCard.props.incidentDate.should.eql('Feb 1, 2018');
    baseComplaintCard.props.category.should.eql('False Arrest');
    baseComplaintCard.props.officers.should.eql(officers);
    baseComplaintCard.props.addItemInPinboardPage.should.eql(addItemInPinboardPageStub);
    baseComplaintCard.props.pinned.should.be.false();
    baseComplaintCard.props.leftChild.props.href.should.eql(
      'https://www.documentcloud.org/documents/3108640/CRID-1078616-TRR-Rialmo.pdf'
    );
    baseComplaintCard.props.leftChild.props.target.should.eql('_blank');
    baseComplaintCard.props.leftChild.type.should.be.eql('a');

    const previewImg = findRenderedDOMComponentWithTag(instance, 'img');
    previewImg.getAttribute('class').should.eql('document-card-thumbnail-img');
    previewImg.getAttribute('src').should.eql(
      'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif'
    );
  });

  describe('RelevantDocumentCardWithUndo component', function () {
    it('should render remove text correctly', function () {
      instance = renderIntoDocument(
        <RelevantDocumentCardWithUndo
          url='https://www.documentcloud.org/documents/3108640/CRID-1078616-TRR-Rialmo.pdf'
          previewImageUrl='https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif'
          allegation={ allegation }
          addItemInPinboardPage={ addItemInPinboardPageStub }
          pinned={ false }
        />
      );
      const plusButton = findRenderedComponentWithType(instance, PlusButton);

      Simulate.click(findDOMNode(plusButton));

      findRenderedDOMComponentWithClass(instance, 'text').textContent.should.eql('Document added.');
    });
  });
});
