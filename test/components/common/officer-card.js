import React from 'react';
import { shallow } from 'enzyme';
import should from 'should';
import { Link } from 'react-router-dom';
import sinon from 'sinon';
import { random } from 'faker';

import { mountWithRouter } from 'utils/test';
import OfficerCard from 'components/common/officer-card';
import RadarChart from 'components/common/radar-chart/radar-chart';
import ItemPinButton from 'components/common/item-pin-button';
import pinButtonStyles from 'components/common/item-pin-button.sass';
import { PINNED_ITEM_TYPES } from 'utils/constants';


describe('OfficerCard component', function () {
  it('should render correctly', function () {
    const wrapper = mountWithRouter(
      <OfficerCard
        officerId={ 1 }
        fullName='Jerome Finnigan'
        visualTokenBackgroundColor='red'
        complaintCount={ 10 }
        sustainedCount={ 5 }
        complaintPercentile={ 20 }
        age='37-year-old'
        race='white'
        gender='male'
        rank='Police Officer'
        percentile={ {
          items: [{ 'axis': 'a', value: 1 }],
        } }
      />
    );
    const link = wrapper.find(Link);
    link.prop('to').should.equal('/officer/1/jerome-finnigan/');

    const radarChartElement = wrapper.find('.test--radar');
    radarChartElement.prop('width').should.equal('100%');
    radarChartElement.prop('height').should.equal('100%');
    radarChartElement.find('.test--radar-radar-area').exists().should.be.true();

    const text = wrapper.text();
    text.should.containEql('Police Officer');
    text.should.containEql('Jerome Finnigan');
    text.should.containEql('10 Allegations');
    text.should.containEql('5 Sustained');
    text.should.containEql('More than 20% of other officers');

    text.should.containEql('37-year-old white male');
  });

  it('should show NoDataRadarChart when no percentile', () => {
    const wrapper = shallow(<OfficerCard officerId={ 3 }/>);
    const noDataRadarChart = wrapper.find(RadarChart);
    should(noDataRadarChart.props.data).be.undefined();
  });

  it('should render link with target _blank when openCardInNewPage is true', () => {
    const wrapper = shallow(<OfficerCard officerId={ 3 } openCardInNewPage={ true }/>);

    const link = wrapper.find(Link);
    link.prop('target').should.equal('_blank');
  });

  it('should render ItemPinButton with correct props', function () {
    const addOrRemoveItemInPinboard = sinon.spy();
    const id = random.number({ min: 10, max: 1000 });
    const isPinned = random.boolean();
    const complaintCount = 10;
    const sustainedCount = 10;
    const age = '37-year-old';
    const race = 'White';
    const gender = 'Male';
    const rank = 'Officer';
    const fullName = 'Ferome Finnigan';

    const wrapper = shallow(
      <OfficerCard
        officerId={ id }
        isPinned={ isPinned }
        complaintCount={ complaintCount }
        sustainedCount={ sustainedCount }
        age={ age }
        race={ race }
        gender={ gender }
        rank={ rank }
        fullName={ fullName }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
      />
    );

    const itemPinButton = wrapper.find(ItemPinButton);
    itemPinButton.prop('className').should.equal(pinButtonStyles.cardPinnedButton);
    itemPinButton.prop('addOrRemoveItemInPinboard').should.equal(addOrRemoveItemInPinboard);
    itemPinButton.prop('showHint').should.be.false();
    itemPinButton.prop('item').should.eql(
      {
        type: PINNED_ITEM_TYPES.OFFICER,
        id,
        isPinned,
        complaintCount,
        sustainedCount,
        age,
        race,
        gender,
        rank,
        fullName,
      }
    );
  });

  it('should not render pin button if not pinnable', function () {
    const wrapper = shallow(
      <OfficerCard
        pinnable={ false }
      />,
    );
    wrapper.find(ItemPinButton).exists().should.be.false();
  });
});
