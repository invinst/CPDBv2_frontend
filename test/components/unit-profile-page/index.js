import React from 'react';
import { shallow } from 'enzyme';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import UnitProfilePage from 'components/unit-profile-page';
import Header from 'components/unit-profile-page/header';
import SummaryPage from 'components/unit-profile-page/summary-page';


describe('UnitProfilePage component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    unitProfilePage: {
      summary: {},
    },
    breadcrumb: {
      breadcrumbs: [],
    },
  });

  it('should render Header and SummaryPage', function () {
    const wrapper = shallow(
      <Provider store={ store }>
        <UnitProfilePage />
      </Provider>
    );

    wrapper.find(Header).exists().should.be.true();
    wrapper.find(SummaryPage).exists().should.be.true();
  });
});
