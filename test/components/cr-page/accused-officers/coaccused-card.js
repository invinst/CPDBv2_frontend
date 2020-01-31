import React from 'react';
import { shallow, mount } from 'enzyme';
import should from 'should';
import { Link } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import { mountWithRouter } from 'utils/test';

import CoaccusedCard from 'components/cr-page/accused-officers/coaccused-card';
import RadarChart from 'components/common/radar-chart/radar-chart';
import { spy } from 'sinon';
import { random } from 'faker';

import ItemPinButton from 'components/common/item-pin-button';
import pinButtonStyles from 'components/common/item-pin-button.sass';
import { PINNED_ITEM_TYPES } from 'utils/constants';
import { PrintModeContext } from 'contexts';


describe('CoaccusedCard component', function () {
  it('should render correctly', function () {
    const wrapper = mountWithRouter(
      <CoaccusedCard
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
    const link = wrapper.find(Link);
    link.prop('to').should.equal('/officer/1/jerome-finnigan/');

    const radarChartElement = wrapper.find('.test--radar');
    radarChartElement.prop('width').should.equal('100%');
    radarChartElement.prop('height').should.equal('100%');
    radarChartElement.find('.test--radar-radar-area').should.not.be.null();

    const text = wrapper.text();
    text.should.containEql('Police Officer');
    text.should.containEql('Jerome Finnigan');
    text.should.containEql('10 allegations');
    text.should.containEql('5 sustained');
    text.should.containEql('More than 20% of other officers');

    text.should.containEql('37-year-old white male');
  });

  it('should show NoDataRadarChart when no percentile', function () {
    const wrapper = shallow(<CoaccusedCard officerId={ 3 }/>);
    const noDataRadarChart = wrapper.find(RadarChart);
    should(noDataRadarChart.props.data).be.undefined();
  });

  it('should render link with target _blank when openCardInNewPage is true', function () {
    const wrapper = shallow(<CoaccusedCard officerId={ 3 } openCardInNewPage={ true }/>);

    const link = wrapper.find(Link);
    link.prop('target').should.equal('_blank');
  });

  it('should render category and outcome correctly', function () {
    const wrapper = shallow(
      <CoaccusedCard
        finding='Sustained'
        disciplined={ true }
        category='Operations/Personnel Violation'
        findingOutcomeMix='Reprimand'
      />
    );
    const category = wrapper.find('.accused-card-category');
    const outcome = wrapper.find('.accused-card-outcome');
    category.text().should.equal('Operations/Personnel Violation');
    outcome.text().should.equal('Reprimand');
  });

  it('should render disciplined if both printMode and disciplined are true', function () {
    const context = { printMode: true };
    const wrapper = mount(
      <PrintModeContext.Provider value={ context }>
        <MemoryRouter>
          <CoaccusedCard
            finding='Sustained'
            disciplined={ true }
            category='Operations/Personnel Violation'
            findingOutcomeMix='Reprimand'
          />
        </MemoryRouter>
      </PrintModeContext.Provider>
    );
    const findingOutcome = wrapper.find('.finding-outcome-mix');
    findingOutcome.text().should.equal('Reprimand, Disciplined');
  });

  it('should only render disciplined if printMode & disciplined are true and findingOutcomeMix is null', function () {
    const context = { printMode: true };
    const wrapper = mount(
      <PrintModeContext.Provider value={ context }>
        <MemoryRouter>
          <CoaccusedCard
            finding='Sustained'
            disciplined={ true }
            category='Operations/Personnel Violation'
            findingOutcomeMix={ null }
          />
        </MemoryRouter>
      </PrintModeContext.Provider>
    );
    const findingOutcome = wrapper.find('.finding-outcome-mix');
    findingOutcome.text().should.equal('Disciplined');
  });

  it('should render ItemPinButton with correct props', function () {
    const addOrRemoveItemInPinboard = spy();
    const id = random.number({ min: 10, max: 1000 });
    const isPinned = random.boolean();

    const wrapper = shallow(
      <CoaccusedCard
        officerId={ id }
        isPinned={ isPinned }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
      />
    );

    const itemPinButton = wrapper.find(ItemPinButton);
    itemPinButton.prop('className').should.equal(pinButtonStyles.cardPinnedButton);
    itemPinButton.prop('addOrRemoveItemInPinboard').should.equal(addOrRemoveItemInPinboard);
    itemPinButton.prop('showHint').should.be.false();
    itemPinButton.prop('item').should.eql({ type: PINNED_ITEM_TYPES.OFFICER, id, isPinned });
  });
});
