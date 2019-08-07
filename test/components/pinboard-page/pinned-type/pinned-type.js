import React from 'react';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import PinnedType from 'components/pinboard-page/pinned-type';
import PinnedOfficersContainer from 'containers/pinboard-page/pinned-officers';
import PinnedCRsContainer from 'containers/pinboard-page/pinned-crs';
import PinnedTRRsContainer from 'containers/pinboard-page/pinned-trrs';
import CRCard from 'components/pinboard-page/cards/cr-card';
import OfficerCard from 'components/pinboard-page/cards/officer-card';
import TRRCard from 'components/pinboard-page/cards/trr-card';
import LoadingSpinner from 'components/common/loading-spinner';
import PinnedGrid from 'components/pinboard-page/pinned-type/pinned-grid';


describe('PinnedType component', function () {
  let instance;
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
          percentile: {}
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
          percentile: {}
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
    }
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render nothing if request completed but items is empty', function () {
    instance = renderIntoDocument(<PinnedType type='CR' items={ [] } requesting={ false }/>);

    scryRenderedDOMComponentsWithTag(instance, 'div').should.have.length(0);
  });

  it('should render LoadingSpinner if requesting', function () {
    instance = renderIntoDocument(<PinnedType title='Some title' type='CR' items={ [] } requesting={ true }/>);

    const loadingSpinner = findRenderedComponentWithType(instance, LoadingSpinner);
    loadingSpinner.props.className.should.equal('pinned-type-loading');

    findRenderedDOMComponentWithClass(instance, 'type-title').textContent.should.equal('Some title');
  });

  it('should render CR cards', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinnedCRsContainer/>
      </Provider>
    );

    const crCards = scryRenderedComponentsWithType(instance, CRCard);
    crCards.should.have.length(2);
    crCards[0].props.item.id.should.eql('1000001');
    crCards[1].props.item.id.should.eql('1000002');
  });

  it('should render OFFICER cards', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinnedOfficersContainer/>
      </Provider>
    );

    findRenderedComponentWithType(instance, PinnedGrid);

    const officerCards = scryRenderedComponentsWithType(instance, OfficerCard);
    officerCards.should.have.length(2);
    officerCards[0].props.item.id.should.eql('1');
    officerCards[1].props.item.id.should.eql('2');
  });

  it('should render TRR cards', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinnedTRRsContainer/>
      </Provider>
    );

    const trrCards = scryRenderedComponentsWithType(instance, TRRCard);
    trrCards.should.have.length(2);
    trrCards[0].props.item.id.should.eql('1');
    trrCards[1].props.item.id.should.eql('2');
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
    const removeItemInPinboardPage = spy();
    const addItemInPinboardPage = spy();
    const orderPinboard = spy();
    const focusItem = spy();

    instance = renderIntoDocument(
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

    const pinnedGrid = findRenderedComponentWithType(instance, PinnedGrid);

    pinnedGrid.props.type.should.eql('CR');
    pinnedGrid.props.items.should.eql(items);
    pinnedGrid.props.removeItemInPinboardPage.should.eql(removeItemInPinboardPage);
    pinnedGrid.props.addItemInPinboardPage.should.eql(addItemInPinboardPage);
    pinnedGrid.props.orderPinboard.should.eql(orderPinboard);
    pinnedGrid.props.focusItem.should.eql(focusItem);
  });
});
