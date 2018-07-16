import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { unmountComponentSuppressError } from 'utils/test';
import TRRPage from 'components/trr-page';
import OfficerSection from 'components/trr-page/officer-section';
import TRRInfoSection from 'components/trr-page/trr-info-section';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import FooterContainer from 'containers/footer-container';
import Popup from 'components/common/popup';


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
    popups: [{
      name: 'force_category',
      page: 'trr',
      title: 'Force Category',
      text: 'Some force category explanation',
    }, {
      name: 'type_of_force',
      page: 'trr',
      title: 'Type Of Force',
      text: 'Some type of force explanation',
    }],
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
    findRenderedDOMComponentWithClass(instance, 'test--trr-title').textContent.should.eql('TRR 123');
    findRenderedComponentWithType(instance, OfficerSection).props.officer.should.eql({ officerId: 456 });
    findRenderedComponentWithType(instance, TRRInfoSection);
    findRenderedComponentWithType(instance, ShareableHeaderContainer);
    findRenderedComponentWithType(instance, FooterContainer);
  });

  it('should render popups', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <TRRPage trrId={ 123 } officer={ { officerId: 456 } }/>
      </Provider>
    );
    const popup = scryRenderedComponentsWithType(instance, Popup);
    popup[0].props.title.should.eql('Force Category');
    popup[0].props.text.should.eql('Some force category explanation');
    popup[1].props.title.should.eql('Type Of Force');
    popup[1].props.text.should.eql('Some type of force explanation');
  });
});
