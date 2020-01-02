import React from 'react';
import { mount } from 'enzyme';
import { stub, useFakeTimers } from 'sinon';

import RelevantDocumentCard, { RelevantDocumentCardWithUndo }
  from 'components/pinboard-page/relevant/relevant-documents/relevant-document-card';
import BaseComplaintCard from 'components/pinboard-page/relevant/common/base-complaint-card';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';
import { UNDO_CARD_VISIBLE_TIME } from 'utils/constants';


describe('RelevantDocumentCard component', function () {
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
        { axis: 'Civilian Allegations', value: 98.7841 },
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
        { axis: 'Civilian Allegations', value: 98.5549 },
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

  it('should render enough content correctly', function () {
    const wrapper = mount(
      <RelevantDocumentCard
        url='https://www.documentcloud.org/documents/3108640/CRID-1078616-TRR-Rialmo.pdf'
        previewImageUrl='https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif'
        allegation={ allegation }
        addItemInPinboardPage={ addItemInPinboardPageStub }
        pinned={ false }
      />
    );

    const baseComplaintCard = wrapper.find(BaseComplaintCard);
    baseComplaintCard.prop('crid').should.equal('1089128');
    baseComplaintCard.prop('incidentDate').should.equal('Feb 1, 2018');
    baseComplaintCard.prop('category').should.equal('False Arrest');
    baseComplaintCard.prop('officers').should.eql(officers);
    baseComplaintCard.prop('addItemInPinboardPage').should.eql(addItemInPinboardPageStub);
    baseComplaintCard.prop('pinned').should.be.false();
    baseComplaintCard.prop('leftChild').props.href.should.eql(
      'https://www.documentcloud.org/documents/3108640/CRID-1078616-TRR-Rialmo.pdf'
    );
    baseComplaintCard.prop('leftChild').props.target.should.equal('_blank');
    baseComplaintCard.prop('leftChild').type.should.equal('a');

    const previewImg = wrapper.find('img');
    previewImg.prop('className').should.equal('document-card-thumbnail-img');
    previewImg.prop('src').should.eql(
      'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif'
    );
  });

  describe('RelevantDocumentCardWithUndo component', function () {
    let clock;

    beforeEach(function () {
      clock = useFakeTimers();
    });

    afterEach(function () {
      clock.restore();
    });

    it('should render remove text correctly', function () {
      const wrapper = mount(
        <RelevantDocumentCardWithUndo
          url='https://www.documentcloud.org/documents/3108640/CRID-1078616-TRR-Rialmo.pdf'
          previewImageUrl='https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif'
          allegation={ allegation }
          addItemInPinboardPage={ addItemInPinboardPageStub }
          pinned={ false }
        />
      );
      const plusButton = wrapper.find(PlusButton);

      plusButton.simulate('click');

      wrapper.find('.text').text().should.equal('Document added.');
    });

    it('should be reversed after the undo card disappears', function () {
      const wrapper = mount(
        <RelevantDocumentCardWithUndo
          url='https://www.documentcloud.org/documents/3108640/CRID-1078616-TRR-Rialmo.pdf'
          previewImageUrl='https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif'
          allegation={ allegation }
          addItemInPinboardPage={ addItemInPinboardPageStub }
          pinned={ false }
        />
      );

      const plusButton = wrapper.find(PlusButton);

      plusButton.simulate('click');

      clock.tick(UNDO_CARD_VISIBLE_TIME + 50);

      wrapper.find(RelevantDocumentCard).exists().should.be.true();
    });
  });
});
