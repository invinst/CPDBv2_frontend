import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { unmountComponentSuppressError } from 'utils/test';
import TRRPage from 'components/trr-page';
import OfficerSection from 'components/trr-page/officer-section';
import TRRInfoSection from 'components/trr-page/trr-info-section';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import FooterContainer from 'containers/footer-container';


describe('TRRPage component', function () {
  let instance;
  const store = MockStore()({
    breadcrumb: {
      breadcrumbs: []
    },
    trrPage: {
      data: {
        officer: {},
      },
    },
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render trr title, OfficerSection and TRRInfoSection', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <TRRPage trrId={ 123 } officer={ { officerId: 456 } }/>
      </Provider>
    );
    findRenderedDOMComponentWithClass(instance, 'trr-title').textContent.should.eql('TRR 123');
    findRenderedComponentWithType(instance, OfficerSection).props.officer.should.eql({ officerId: 456 });
    findRenderedComponentWithType(instance, TRRInfoSection);
    findRenderedComponentWithType(instance, ShareableHeaderContainer);
    findRenderedComponentWithType(instance, FooterContainer);
  });
});
