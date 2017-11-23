import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  Simulate
} from 'react-addons-test-utils';
import { spy } from 'sinon';

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
    const toggleSearchTerms = spy();

    instance = renderIntoDocument(
      <SearchBox toggleSearchTerms={ toggleSearchTerms }/>
    );

    const toggleButton = findRenderedDOMComponentWithClass(instance, 'test--toggle-button');
    Simulate.click(toggleButton);
    toggleSearchTerms.called.should.be.true();
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
});
