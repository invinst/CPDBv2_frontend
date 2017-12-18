import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag,
  Simulate
} from 'react-addons-test-utils';
import { spy, stub } from 'sinon';

import * as editPathUtils from 'utils/edit-path';
import TextInput from 'components/common/input';
import SearchBox from 'components/search-page/search-box';
import { unmountComponentSuppressError } from 'utils/test';


describe('SearchBox component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    SearchBox.should.be.renderable();
  });

  it('should pass correct props to Input', function () {
    const onEscape = spy();
    const onChange = spy();
    const onEnter = spy();

    instance = renderIntoDocument(
      <SearchBox
        onEscape={ onEscape }
        onChange={ onChange }
        onEnter={ onEnter }
        value='wa'
      />
    );

    const input = findRenderedComponentWithType(instance, TextInput);
    input.props.value.should.eql('wa');
    input.props.keyPressHandlers.should.eql({
      esc: onEscape,
      enter: onEnter
    });
    input.props.onChange.should.equal(onChange);
    input.props.blurOnKeyPress.should.eql(['up', 'down']);
  });

  it('should toggle search terms', function () {
    const pushPathPreserveEditMode = stub(editPathUtils, 'pushPathPreserveEditMode');

    instance = renderIntoDocument(
      <SearchBox searchTermsHidden={ true }/>
    );

    let toggleButton = findRenderedDOMComponentWithClass(instance, 'test--toggle-button');
    Simulate.click(toggleButton);
    pushPathPreserveEditMode.calledWith('search/terms/');

    unmountComponentSuppressError(instance);

    instance = renderIntoDocument(
      <SearchBox searchTermsHidden={ false }/>
    );

    toggleButton = findRenderedDOMComponentWithClass(instance, 'test--toggle-button');
    Simulate.click(toggleButton);
    pushPathPreserveEditMode.calledWith('search/');

    pushPathPreserveEditMode.restore();
  });

  it('should render Show Search terms on search term is hidden', function () {
    instance = renderIntoDocument(
      <SearchBox searchTermsHidden={ true }/>
    );

    const toggleButton = findRenderedDOMComponentWithClass(instance, 'test--toggle-button');
    toggleButton.textContent.should.equal('Show Search terms');
  });

  it('should render Hide Search terms on search term is showing', function () {
    instance = renderIntoDocument(
      <SearchBox searchTermsHidden={ false }/>
    );

    const toggleButton = findRenderedDOMComponentWithClass(instance, 'test--toggle-button');
    toggleButton.textContent.should.equal('Hide Search terms');
  });

  it('should render input with disabled spellcheck', function () {
    instance = renderIntoDocument(
      <SearchBox />
    );

    const input = findRenderedDOMComponentWithTag(instance, 'input');
    input.getAttribute('spellcheck').should.eql('false');
  });
});
