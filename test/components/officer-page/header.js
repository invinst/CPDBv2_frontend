import React from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';

import Header from 'components/officer-page/header';
import { unmountComponentSuppressError } from 'utils/test';


describe('Header component', function () {
  let instance;
  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render 4 links with different urls', function () {
    instance = renderIntoDocument(<Header pathname='/officer/123/'/>);
    const links = scryRenderedComponentsWithType(instance, Link);
    links.should.have.length(4);
    map(links, link => link.props.to).should.eql([
      '/officer/123/', '/officer/123/timeline/', '/officer/123/social/', '/officer/123/radar/'
    ]);
  });

  it('should render summary link as active', function () {
    instance = renderIntoDocument(
      <Header pathname='/officer/123/' activeTab=''/>
    );
    const activeButton = findRenderedDOMComponentWithClass(instance, 'test--header-button-active');
    activeButton.textContent.should.eql('Summary');
  });

  it('should render timeline link as active', function () {
    instance = renderIntoDocument(
      <Header pathname='/officer/123/timeline' activeTab='timeline'/>
    );
    const activeButton = findRenderedDOMComponentWithClass(instance, 'test--header-button-active');
    activeButton.textContent.should.eql('Timeline');
  });

  it('should render social map link as active', function () {
    instance = renderIntoDocument(
      <Header pathname='/officer/123/social' activeTab='social'/>
    );
    const activeButton = findRenderedDOMComponentWithClass(instance, 'test--header-button-active');
    activeButton.textContent.should.eql('Social Map');
  });

  it('should render radar link as active', function () {
    instance = renderIntoDocument(
      <Header pathname='/officer/123/radar' activeTab='radar'/>
    );
    const activeButton = findRenderedDOMComponentWithClass(instance, 'test--header-button-active');
    activeButton.textContent.should.eql('Radar (Demo)');
  });
});
