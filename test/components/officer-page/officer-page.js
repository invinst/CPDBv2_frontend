import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import { Provider } from 'react-redux';
import OfficerPage from 'components/officer-page';
import Header from 'components/officer-page/header';
import SummaryPage from 'components/officer-page/summary-page';
import MockStore from 'redux-mock-store';


describe('OfficerPage component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    officerPage: {
      summary: {}
    }
  });

  it('should render header and summary page', function () {
    const location = { pathname: '' };
    const instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage location={ location }/>
      </Provider>
    );

    scryRenderedComponentsWithType(instance, Header).should.have.length(1);
    scryRenderedComponentsWithType(instance, SummaryPage).should.have.length(1);
  });
});
