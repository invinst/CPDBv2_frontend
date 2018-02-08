import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';

import { unmountComponentSuppressError } from 'utils/test';
import BreadcrumbsItemContainer from 'containers/headers/shareable-header/breadcrumbs-item-container';


describe('BreadcrumbsItem component', function () {
  let instance;

  function createStore(position) {
    const mockStore = MockStore();
    return mockStore({
      headers: {
        shareableHeader: {
          scrollPosition: position
        }
      }
    });
  }

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render a string with correct style in top state', function () {
    instance = renderIntoDocument(
      <Provider store={ createStore('top') }>
        <BreadcrumbsItemContainer>some string</BreadcrumbsItemContainer>
      </Provider>
    );
    const item = findRenderedDOMComponentWithClass(instance, 'test--breadcrumbs-item');
    item.style.getPropertyValue('color').should.eql('rgb(35, 31, 32)');
  });

  it('should render a string with correct style in middle state', function () {
    instance = renderIntoDocument(
      <Provider store={ createStore('middle') }>
        <BreadcrumbsItemContainer>some string</BreadcrumbsItemContainer>
      </Provider>
    );
    const item = findRenderedDOMComponentWithClass(instance, 'test--breadcrumbs-item');
    item.style.getPropertyValue('color').should.eql('rgb(35, 31, 32)');
  });

  it('should render a string with correct style in bottom state', function () {
    instance = renderIntoDocument(
      <Provider store={ createStore('bottom') }>
        <BreadcrumbsItemContainer>some string</BreadcrumbsItemContainer>
      </Provider>
    );
    const item = findRenderedDOMComponentWithClass(instance, 'test--breadcrumbs-item');
    item.style.getPropertyValue('color').should.eql('rgb(143, 143, 143)');
  });

  it('should render a link with correct style in top state', function () {
    instance = renderIntoDocument(
      <Provider store={ createStore('top') }>
        <BreadcrumbsItemContainer>
          <a className='test--breadcrumbs-link'>some link</a>
        </BreadcrumbsItemContainer>
      </Provider>
    );
    const item = findRenderedDOMComponentWithClass(instance, 'test--breadcrumbs-link');
    item.style.getPropertyValue('color').should.eql('rgb(143, 143, 143)');
  });

  it('should render a link with correct style in middle state', function () {
    instance = renderIntoDocument(
      <Provider store={ createStore('middle') }>
        <BreadcrumbsItemContainer>
          <a className='test--breadcrumbs-link'>some link</a>
        </BreadcrumbsItemContainer>
      </Provider>
    );
    const item = findRenderedDOMComponentWithClass(instance, 'test--breadcrumbs-link');
    item.style.getPropertyValue('color').should.eql('rgb(143, 143, 143)');
  });

  it('should render a link with correct style in bottom state', function () {
    instance = renderIntoDocument(
      <Provider store={ createStore('bottom') }>
        <BreadcrumbsItemContainer>
          <a className='test--breadcrumbs-link'>some link</a>
        </BreadcrumbsItemContainer>
      </Provider>
    );
    const item = findRenderedDOMComponentWithClass(instance, 'test--breadcrumbs-link');
    item.style.getPropertyValue('color').should.eql('rgb(0, 94, 244)');
  });
});
