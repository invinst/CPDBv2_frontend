import React from 'react';
import should from 'should';
import { Link } from 'react-router';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import { spy } from 'sinon';
import { random } from 'faker';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerCard from 'components/common/officer-card';
import RadarChart from 'components/common/radar-chart/radar-chart';
import ItemPinButton from 'components/common/item-pin-button';
import pinButtonStyles from 'components/common/item-pin-button.sass';
import { PINNED_ITEM_TYPES } from 'utils/constants';


describe('OfficerCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(
      <OfficerCard
        officerId={ 1 }
        fullName='Jerome Finnigan'
        visualTokenBackgroundColor='red'
        complaintCount={ 10 }
        sustainedCount={ 5 }
        complaintPercentile={ 20 }
        birthYear={ 1980 }
        race='white'
        gender='male'
        rank='Police Officer'
        percentile={ {
          items: [{ 'axis': 'a', value: 1 }],
        } }
      />
    );
    const link = findRenderedComponentWithType(instance, Link);
    link.props.to.should.eql('/officer/1/jerome-finnigan/');

    const radarChartElement = findRenderedDOMComponentWithClass(instance, 'test--radar');
    radarChartElement.getAttribute('width').should.eql('100%');
    radarChartElement.getAttribute('height').should.eql('100%');
    should(radarChartElement.querySelector('.test--radar-radar-area')).not.be.null();

    const text = findDOMNode(instance).innerText;
    text.should.containEql('Police Officer');
    text.should.containEql('Jerome Finnigan');
    text.should.containEql('10 Allegations');
    text.should.containEql('5 Sustained');
    text.should.containEql('More than 20% of other officers');

    text.should.containEql('37-year-old white male');
  });

  it('should show NoDataRadarChart when no percentile', () => {
    instance = renderIntoDocument(<OfficerCard officerId={ 3 }/>);
    const noDataRadarChart = findRenderedComponentWithType(instance, RadarChart);
    should(noDataRadarChart.props.data).be.undefined();
  });

  it('should render link with target _blank when openCardInNewPage is true', () => {
    instance = renderIntoDocument(<OfficerCard officerId={ 3 } openCardInNewPage={ true }/>);

    const link = findRenderedComponentWithType(instance, Link);
    link.props.target.should.eql('_blank');
  });

  it('should render ItemPinButton with correct props', function () {
    const addOrRemoveItemInPinboard = spy();
    const id = random.number({ min: 10, max: 1000 });
    const isPinned = random.boolean();

    instance = renderIntoDocument(
      <OfficerCard
        officerId={ id }
        isPinned={ isPinned }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
      />
    );

    const itemPinButton = findRenderedComponentWithType(instance, ItemPinButton);
    itemPinButton.props.className.should.equal(pinButtonStyles.cardPinnedButton);
    itemPinButton.props.addOrRemoveItemInPinboard.should.equal(addOrRemoveItemInPinboard);
    itemPinButton.props.showHint.should.be.false();
    itemPinButton.props.item.should.eql({ type: PINNED_ITEM_TYPES.OFFICER, id, isPinned });
  });

  it('should not render pin button if not pinnable', function () {
    instance = renderIntoDocument(
      <OfficerCard
        pinnable={ false }
      />,
    );
    scryRenderedComponentsWithType(instance, ItemPinButton).should.have.length(0);
  });
});
