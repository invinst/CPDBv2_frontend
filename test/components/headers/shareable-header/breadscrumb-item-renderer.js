import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';

import BreadcrumbsItemRenderer from 'containers/headers/shareable-header/breadcrumbs-item-renderer-container';


describe('BreadcrumbsItem component', function () {
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

  it('should render a string with correct style in top state', function () {
    const wrapper = mount(
      <Provider store={ createStore('top') }>
        <BreadcrumbsItemRenderer>some string</BreadcrumbsItemRenderer>
      </Provider>
    );
    const item = wrapper.find('li');
    item.hasClass('bottom').should.be.false();
  });

  it('should render a string with correct style in middle state', function () {
    const wrapper = mount(
      <Provider store={ createStore('middle') }>
        <BreadcrumbsItemRenderer>some string</BreadcrumbsItemRenderer>
      </Provider>
    );
    const item = wrapper.find('li');
    item.hasClass('bottom').should.be.false();
  });

  it('should render a string with correct style in bottom state', function () {
    const wrapper = mount(
      <Provider store={ createStore('bottom') }>
        <BreadcrumbsItemRenderer>some string</BreadcrumbsItemRenderer>
      </Provider>
    );
    const item = wrapper.find('li');
    item.hasClass('bottom').should.be.true();
  });

  it('should render a link with correct style in top state', function () {
    const wrapper = mount(
      <Provider store={ createStore('top') }>
        <BreadcrumbsItemRenderer>
          <a className='test--breadcrumbs-link'>some link</a>
        </BreadcrumbsItemRenderer>
      </Provider>
    );
    const item = wrapper.find('.test--breadcrumbs-link');
    item.hasClass('bottom').should.be.false();
  });

  it('should render a link with correct style in middle state', function () {
    const wrapper = mount(
      <Provider store={ createStore('middle') }>
        <BreadcrumbsItemRenderer>
          <a className='test--breadcrumbs-link'>some link</a>
        </BreadcrumbsItemRenderer>
      </Provider>
    );
    const item = wrapper.find('.test--breadcrumbs-link');
    item.hasClass('bottom').should.be.false();
  });

  it('should render a link with correct style in bottom state', function () {
    const wrapper = mount(
      <Provider store={ createStore('bottom') }>
        <BreadcrumbsItemRenderer>
          <a className='test--breadcrumbs-link'>some link</a>
        </BreadcrumbsItemRenderer>
      </Provider>
    );
    const item = wrapper.find('.test--breadcrumbs-link');
    item.hasClass('bottom').should.be.true();
  });
});
