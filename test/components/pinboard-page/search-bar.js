import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import SearchBar from 'components/pinboard-page/search-bar';
import * as editPath from 'utils/edit-path';


describe('SearchBar component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(<SearchBar />);

    findRenderedDOMComponentWithClass(instance, 'search-term').textContent.should.eql('Search');
    findRenderedDOMComponentWithClass(instance, 'share-button').textContent.should.eql('Share');
  });

  it('should hide share menu by default', function () {
    instance = renderIntoDocument(<SearchBar />);

    scryRenderedDOMComponentsWithClass(instance, 'share-menu').should.have.length(0);
  });

  it('should render share menu if share button is clicked', function () {
    instance = renderIntoDocument(<SearchBar />);

    Simulate.click(findRenderedDOMComponentWithClass(instance, 'share-button'));
    findRenderedDOMComponentWithClass(instance, 'share-menu');
  });

  it('should hide share menu if share button is cliked twice', function () {
    instance = renderIntoDocument(<SearchBar />);

    const shareButton = findRenderedDOMComponentWithClass(instance, 'share-button');
    Simulate.click(shareButton);
    Simulate.click(shareButton);
    scryRenderedDOMComponentsWithClass(instance, 'share-menu').should.have.length(0);
  });

  it('should hide share menu if copy link button is clicked', function () {
    instance = renderIntoDocument(<SearchBar />);

    Simulate.click(findRenderedDOMComponentWithClass(instance, 'share-button'));
    Simulate.click(findRenderedDOMComponentWithClass(instance, 'copy-link-icon'));
    scryRenderedDOMComponentsWithClass(instance, 'share-menu').should.have.length(0);
  });

  it('should go to search page on clicked', function () {
    instance = renderIntoDocument(<SearchBar />);
    const searchBar = findDOMNode(instance);
    let pushPathStub = stub(editPath, 'pushPathPreserveEditMode');
    Simulate.click(searchBar);
    pushPathStub.calledWith('/search/').should.be.true();
    pushPathStub.restore();
  });
});
