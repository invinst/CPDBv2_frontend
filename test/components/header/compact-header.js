import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { stub } from 'sinon';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { unmountComponentSuppressError } from 'utils/test';
import * as utilsDom from 'utils/dom';
import CompactHeader from 'components/header/compact-header';
import HeaderContent from 'components/header/header-content';

describe('CompactHeader component', function () {
  let instance;
  let triggerScroll = () => {};
  const mockStore = MockStore();
  const store = mockStore({ authentication: {}, adapter: 'adapter' });

  beforeEach(function () {
    stub(utilsDom, 'windowAddEventListener', (evt, cb) => {
      if (evt === 'scroll') {
        triggerScroll = cb;
      }
    });
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
    utilsDom.windowAddEventListener.restore();
  });

  it('should set state show to true when scrollY > 145', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CompactHeader pathname='/path'/>
      </Provider>
    );
    window.scrollY = 146;
    triggerScroll();
    const component = findRenderedComponentWithType(instance, CompactHeader);
    component.state.show.should.be.true();
  });

  it('should set state show to false when scrollY < 145', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CompactHeader pathname='/path'/>
      </Provider>
    );
    window.scrollY = 140;
    triggerScroll();
    const component = findRenderedComponentWithType(instance, CompactHeader);
    component.state.show.should.be.false();
  });

  it('should render HeaderContent in compact form', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CompactHeader pathname='/path'/>
      </Provider>
    );
    const content = findRenderedComponentWithType(instance, HeaderContent);
    content.props.compact.should.be.true();
  });
});
