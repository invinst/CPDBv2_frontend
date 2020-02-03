import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';
import sinon from 'sinon';

import PinnedType from 'components/pinboard-page/pinned-type';
import PinnedOfficersContainer from 'containers/pinboard-page/pinned-officers';
import PinnedCRsContainer from 'containers/pinboard-page/pinned-crs';
import PinnedTRRsContainer from 'containers/pinboard-page/pinned-trrs';
import CRCard from 'components/pinboard-page/cards/cr-card';
import OfficerCard from 'components/pinboard-page/cards/officer-card';
import TRRCard from 'components/pinboard-page/cards/trr-card';
import LoadingSpinner from 'components/common/loading-spinner';
import PinnedGrid from 'components/pinboard-page/pinned-type/pinned-grid';
import should from 'should';


describe('PinnedType component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    pinboardPage: {
      officerItems: {
        requesting: false,
        items: [{
          id: 1,
          'full_name': 'Daryl Mack',
          'complaint_count': 0,
          'sustained_count': 0,
          'birth_year': 1975,
          'complaint_percentile': 99.3450,
          race: 'White',
          gender: 'Male',
          rank: 'Police Officer',
          percentile: {},
        }, {
          id: 2,
          'full_name': 'Daryl Mack',
          'complaint_count': 0,
          'sustained_count': 0,
          'birth_year': 1975,
          'complaint_percentile': 99.3450,
          race: 'White',
          gender: 'Male',
          rank: 'Police Officer',
          percentile: {},
        }],
      },
      crItems: {
        requesting: false,
        items: [{
          crid: '1000001',
          'incident_date': '2010-01-01',
          point: { 'lon': 1.0, 'lat': 1.0 },
          'most_common_category': 'Use Of Force',
        }, {
          crid: '1000002',
          'incident_date': '2010-01-01',
          point: { 'lon': 1.0, 'lat': 1.0 },
          'most_common_category': 'Use Of Force',
        }],
      },
      trrItems: {
        requesting: false,
        items: [{
          id: 1,
          'trr_datetime': '2012-01-01',
          category: 'Impact Weapon',
          point: { 'lon': 1.0, 'lat': 1.0 },
        }, {
          id: 2,
          'trr_datetime': '2012-01-01',
          category: 'Impact Weapon',
          point: { 'lon': 1.0, 'lat': 1.0 },
        }],
      },
    },
  });

  it('should render nothing if request completed but items is empty', function () {
    const wrapper = shallow(<PinnedType type='CR' items={ [] } requesting={ false }/>);

    should(wrapper.type()).be.null();
  });

  it('should render LoadingSpinner if requesting', function () {
    const wrapper = shallow(<PinnedType title='Some title' type='CR' items={ [] } requesting={ true }/>);

    const loadingSpinner = wrapper.find(LoadingSpinner);
    loadingSpinner.prop('className').should.equal('pinned-type-loading');

    wrapper.find('.type-title').text().should.equal('Some title');
  });

  it('should render CR cards', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <PinnedCRsContainer/>
      </Provider>
    );

    const crCards = wrapper.find(CRCard);
    crCards.should.have.length(2);
    crCards.at(0).prop('item').id.should.equal('1000001');
    crCards.at(1).prop('item').id.should.equal('1000002');
  });

  it('should render OFFICER cards', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <PinnedOfficersContainer/>
      </Provider>
    );

    wrapper.find(PinnedGrid).exists().should.be.true();

    const officerCards = wrapper.find(OfficerCard);
    officerCards.should.have.length(2);
    officerCards.at(0).prop('item').id.should.equal('1');
    officerCards.at(1).prop('item').id.should.equal('2');
  });

  it('should render TRR cards', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <PinnedTRRsContainer/>
      </Provider>
    );

    const trrCards = wrapper.find(TRRCard);
    trrCards.should.have.length(2);
    trrCards.at(0).prop('item').id.should.equal('1');
    trrCards.at(1).prop('item').id.should.equal('2');
  });

  it('should render PinnedGrid with correct props', function () {
    const items = [{
      crid: '1000001',
      type: 'CR',
      isPinned: true,
      incidentDate: '2010-01-01',
      category: 'Use Of Force',
      point: { 'lon': 1.0, 'lat': 1.0 },
      isPinStatusChanging: false,
    }, {
      crid: '1000002',
      type: 'CR',
      isPinned: true,
      incidentDate: '2010-01-01',
      category: 'Use Of Force',
      point: { 'lon': 1.0, 'lat': 1.0 },
      isPinStatusChanging: false,
    }];
    const removeItemInPinboardPage = sinon.spy();
    const addItemInPinboardPage = sinon.spy();
    const orderPinboard = sinon.spy();
    const focusItem = sinon.spy();

    const wrapper = shallow(
      <PinnedType
        type='CR'
        title='Some title'
        items={ items }
        requesting={ false }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        addItemInPinboardPage={ addItemInPinboardPage }
        orderPinboard={ orderPinboard }
        focusItem={ focusItem }
      />
    );

    const pinnedGrid = wrapper.find(PinnedGrid);

    pinnedGrid.prop('type').should.equal('CR');
    pinnedGrid.prop('items').should.eql(items);
    pinnedGrid.prop('removeItemInPinboardPage').should.eql(removeItemInPinboardPage);
    pinnedGrid.prop('addItemInPinboardPage').should.eql(addItemInPinboardPage);
    pinnedGrid.prop('orderPinboard').should.eql(orderPinboard);
    pinnedGrid.prop('focusItem').should.eql(focusItem);
  });
});
