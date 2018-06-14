import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import * as editPathUtils from 'utils/edit-path';
import { unmountComponentSuppressError } from 'utils/test';
import ToggleButton from 'components/search-page/search-box/toggle-button';
import CloseButton from 'components/search-page/search-box/close-btn';


describe('ToggleButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    ToggleButton.should.be.renderable();
  });

  it('should toggle search terms', function () {
    const pushPathPreserveEditMode = stub(editPathUtils, 'pushPathPreserveEditMode');

    instance = renderIntoDocument(
      <ToggleButton searchTermsHidden={ true }/>
    );

    let toggleButton = findRenderedDOMComponentWithClass(instance, 'test--toggle-button');
    Simulate.click(toggleButton);
    pushPathPreserveEditMode.calledWith('search/terms/');

    unmountComponentSuppressError(instance);

    instance = renderIntoDocument(
      <ToggleButton searchTermsHidden={ false }/>
    );

    toggleButton = findRenderedDOMComponentWithClass(instance, 'test--toggle-button');
    Simulate.click(toggleButton);
    pushPathPreserveEditMode.calledWith('search/');

    pushPathPreserveEditMode.restore();
  });

  it('should render "What can I search?" on search term is hidden', function () {
    instance = renderIntoDocument(
      <ToggleButton searchTermsHidden={ true }/>
    );

    const toggleButton = findRenderedDOMComponentWithClass(instance, 'test--toggle-button');
    toggleButton.textContent.should.equal('What can I search?');
  });

  it('should render Hide Search terms on search term is showing', function () {
    instance = renderIntoDocument(
      <ToggleButton searchTermsHidden={ false }/>
    );

    const toggleButton = findRenderedDOMComponentWithClass(instance, 'test--toggle-button');
    toggleButton.textContent.should.equal('Hide Search terms');
  });

  it('should render close button when there is a search query', function () {
    instance = renderIntoDocument(
      <ToggleButton value='sa'/>
    );
    findRenderedDOMComponentWithClass(instance, 'test--search-close-button');
    scryRenderedDOMComponentsWithClass(instance, 'test--toggle-button').should.have.length(0);
  });

  it('should render toggle search term button when there is no search query', function () {
    instance = renderIntoDocument(
      <ToggleButton value=''/>
    );
    findRenderedDOMComponentWithClass(instance, 'test--toggle-button');
    scryRenderedDOMComponentsWithClass(instance, 'test--search-close-button').should.have.length(0);
  });

  it('should call changeSearchQuery with empty string when the clear search button is clicked', function () {
    const changeSearchQueryStub = stub();
    instance = renderIntoDocument(
      <ToggleButton value='Ke' changeSearchQuery={ changeSearchQueryStub }/>
    );
    const clearSearchButton = findRenderedComponentWithType(instance, CloseButton);
    clearSearchButton.props.onClick();
    changeSearchQueryStub.calledWith('').should.be.true();
  });
});
