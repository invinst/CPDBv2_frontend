import React from 'react';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';
import { spy } from 'sinon';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { CitySummaryFactory } from 'utils/test/factories/heat-map';
import SummaryPanel from 'components/landing-page/heat-map/summary-panel';
import CommunityDropdown from 'components/landing-page/heat-map/summary-panel/community-dropdown';
import CitySummary from 'components/landing-page/heat-map/summary-panel/city-summary';


describe('SummaryPanel component', function () {
  let instance;
  const store = MockStore()({
    landingPage: {
      heatMap: {
        citySummary: CitySummaryFactory.build(),
      },
    },
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render CitySummary and CommunityDropDown', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SummaryPanel/>
      </Provider>
    );
    findRenderedComponentWithType(instance, CommunityDropdown).should.be.ok();
    findRenderedComponentWithType(instance, CitySummary).should.be.ok();
  });

  it('should deselect community and hide dropdown when click CitySummary', function () {
    const selectCommunity = spy();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SummaryPanel selectCommunity={ selectCommunity }/>
      </Provider>
    );
    const summaryPanel = findRenderedComponentWithType(instance, SummaryPanel);
    summaryPanel.setState({ showDropdown: true });
    summaryPanel.state.showDropdown.should.be.true();

    const citySummary = findRenderedComponentWithType(instance, CitySummary);
    citySummary.props.onClick();

    selectCommunity.calledWith(0).should.be.true();
    summaryPanel.state.showDropdown.should.be.false();
  });

  it('should select community and hide dropdown when select from dropdown', function () {
    const selectCommunity = spy();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SummaryPanel selectCommunity={ selectCommunity }/>
      </Provider>
    );
    const summaryPanel = findRenderedComponentWithType(instance, SummaryPanel);
    summaryPanel.setState({ showDropdown: true });
    summaryPanel.state.showDropdown.should.be.true();

    const dropdown = findRenderedComponentWithType(instance, CommunityDropdown);
    dropdown.props.selectCommunity(3);

    selectCommunity.calledWith(3).should.be.true();
    summaryPanel.state.showDropdown.should.be.false();
  });

  it('should show dropdown when CommunityDropdown trigger it', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SummaryPanel/>
      </Provider>
    );
    const summaryPanel = findRenderedComponentWithType(instance, SummaryPanel);
    summaryPanel.setState({ showDropdown: true });
    summaryPanel.state.showDropdown.should.be.true();

    const dropdown = findRenderedComponentWithType(instance, CommunityDropdown);
    dropdown.props.closeDropdown();
    summaryPanel.state.showDropdown.should.be.false();
  });

  it('should hide dropdown when CommunityDropdown trigger it', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SummaryPanel/>
      </Provider>
    );
    const summaryPanel = findRenderedComponentWithType(instance, SummaryPanel);
    summaryPanel.setState({ showDropdown: false });
    summaryPanel.state.showDropdown.should.be.false();

    const dropdown = findRenderedComponentWithType(instance, CommunityDropdown);
    dropdown.props.openDropdown();
    summaryPanel.state.showDropdown.should.be.true();
  });
});
