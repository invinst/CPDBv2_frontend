import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';

import { unmountComponentSuppressError } from 'utils/test';
import BreadcrumbsItemRenderer from 'containers/headers/shareable-header/breadcrumbs-item-renderer-container';


describe('BreadcrumbsItem component', function () {
  let instance;

  function createStore(position) {
    const mockStore = MockStore();
    return mockStore({
      headers: {
        shareableHeader: {
          scrollPosition: position,
        },
      },
    });
  }

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render a string with correct style in top state', function () {
    instance = renderIntoDocument(
      <Provider store={ createStore('top') }>
        <BreadcrumbsItemRenderer>some string</BreadcrumbsItemRenderer>
      </Provider>
    );
    const item = findRenderedDOMComponentWithTag(instance, 'li');
    item.className.should.not.containEql('bottom');
  });

  it('should render a string with correct style in middle state', function () {
    instance = renderIntoDocument(
      <Provider store={ createStore('middle') }>
        <BreadcrumbsItemRenderer>some string</BreadcrumbsItemRenderer>
      </Provider>
    );
    const item = findRenderedDOMComponentWithTag(instance, 'li');
    item.className.should.not.containEql('bottom');
  });

  it('should render a string with correct style in bottom state', function () {
    instance = renderIntoDocument(
      <Provider store={ createStore('bottom') }>
        <BreadcrumbsItemRenderer>some string</BreadcrumbsItemRenderer>
      </Provider>
    );
    const item = findRenderedDOMComponentWithTag(instance, 'li');
    item.className.should.containEql('bottom');
  });

  it('should render a link with correct style in top state', function () {
    instance = renderIntoDocument(
      <Provider store={ createStore('top') }>
        <BreadcrumbsItemRenderer>
          <a className='test--breadcrumbs-link'>some link</a>
        </BreadcrumbsItemRenderer>
      </Provider>
    );
    const item = findRenderedDOMComponentWithClass(instance, 'test--breadcrumbs-link');
    item.className.should.not.containEql('bottom');
  });

  it('should render a link with correct style in middle state', function () {
    instance = renderIntoDocument(
      <Provider store={ createStore('middle') }>
        <BreadcrumbsItemRenderer>
          <a className='test--breadcrumbs-link'>some link</a>
        </BreadcrumbsItemRenderer>
      </Provider>
    );
    const item = findRenderedDOMComponentWithClass(instance, 'test--breadcrumbs-link');
    item.className.should.not.containEql('bottom');
  });

  it('should render a link with correct style in bottom state', function () {
    instance = renderIntoDocument(
      <Provider store={ createStore('bottom') }>
        <BreadcrumbsItemRenderer>
          <a className='test--breadcrumbs-link'>some link</a>
        </BreadcrumbsItemRenderer>
      </Provider>
    );
    const item = findRenderedDOMComponentWithClass(instance, 'test--breadcrumbs-link');
    item.className.should.containEql('bottom');
  });
});
