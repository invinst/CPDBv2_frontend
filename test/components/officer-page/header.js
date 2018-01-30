import React from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';

import Header from 'components/officer-page/header';


describe('Header component', function () {
  it('should render 3 links with different urls', function () {
    const instance = renderIntoDocument(<Header pathname='/officer/123/'/>);
    const links = scryRenderedComponentsWithType(instance, Link);
    links.should.have.length(3);
    map(links, link => link.props.to).should.eql([
      '/officer/123/', '/officer/123/timeline/', '/officer/123/social/'
    ]);
  });

  it('should render summary link as active', function () {
    const instance = renderIntoDocument(
      <Header pathname='/officer/123/' activeTab=''/>
    );
    const activeButton = findRenderedDOMComponentWithClass(instance, 'test--header-button-active');
    activeButton.textContent.should.eql('Summary');
  });

  it('should render timeline link as active', function () {
    const instance = renderIntoDocument(
      <Header pathname='/officer/123/timeline' activeTab='timeline'/>
    );
    const activeButton = findRenderedDOMComponentWithClass(instance, 'test--header-button-active');
    activeButton.textContent.should.eql('Timeline');
  });

  it('should render social map link as active', function () {
    const instance = renderIntoDocument(
      <Header pathname='/officer/123/social' activeTab='social'/>
    );
    const activeButton = findRenderedDOMComponentWithClass(instance, 'test--header-button-active');
    activeButton.textContent.should.eql('Social Map');
  });
});
