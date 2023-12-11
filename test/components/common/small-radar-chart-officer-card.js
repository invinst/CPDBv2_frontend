import React from 'react';
import { shallow } from 'enzyme';
import should from 'should';
import { Link } from 'react-router-dom';
import { spy } from 'sinon';
import { random } from 'faker';

import { mountWithRouter } from 'utils/test';
import SmallRadarChartOfficerCard from 'components/common/small-radar-chart-officer-card';
import RadarChart from 'components/common/radar-chart/radar-chart';
import ItemPinButton from 'components/common/item-pin-button';
import pinButtonStyles from 'components/common/item-pin-button.sass';
import { PINNED_ITEM_TYPES } from 'utils/constants';

describe('SmalllRadarChartOfficerCard component', function () {
  it('should render ItemPinButton with correct props', function () {
    const addOrRemoveItemInPinboardSpy = spy();
    const id = random.number({ min: 10, max: 1000 });
    const isPinned = random.boolean();
    const complaintCount = 10;
    const sustainedCount = 10;
    const age = '37-year-old';
    const race = 'White';
    const gender = 'Male';
    const rank = 'Officer';
    const fullName = 'Ferome Finnigan';

    const wrapper = mountWithRouter(
      <SmallRadarChartOfficerCard
        officerId={ id }
        isPinned={ isPinned }
        complaintCount={ complaintCount }
        sustainedCount={ sustainedCount }
        age={ age }
        race={ race }
        gender={ gender }
        rank={ rank }
        fullName={ fullName }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardSpy }
      />
    );

    const itemPinButton = wrapper.find(ItemPinButton);
    itemPinButton.prop('className').should.equal(pinButtonStyles.cardPinnedButton);
    itemPinButton.prop('addOrRemoveItemInPinboard').should.equal(addOrRemoveItemInPinboardSpy);
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

  it('should render link with target _blank when openCardInNewPage is true', function () {
    const wrapper = mountWithRouter(
      <SmallRadarChartOfficerCard officerId={ 3 } openCardInNewPage={ true }/>
    );

    const link = wrapper.find(Link);
    link.prop('target').should.equal('_blank');
  });

  it('should show NoDataRadarChart when no percentile', function () {
    const wrapper = shallow(<SmallRadarChartOfficerCard officerId={ 3 }/>);
    const noDataRadarChart = wrapper.find(RadarChart);
    should(noDataRadarChart.props.data).be.undefined();
  });
});
