import React from 'react';
import {
  Simulate, renderIntoDocument, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import AutoComplete from 'components/landing-page/autocomplete';
import { unmountComponentSuppressError } from 'utils/test';


describe('AutoComplete component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    AutoComplete.should.be.renderable();
  });

  it('should handle input change', function () {
    const getSuggestion = spy();

    instance = renderIntoDocument(
      <AutoComplete getSuggestion={ getSuggestion }/>
    );
    const searchInput = findRenderedDOMComponentWithTag(instance, 'input');
    searchInput.value = 'a';
    Simulate.change(searchInput);
    getSuggestion.calledWith({
      text: 'a'
    });
    instance.state.value.should.equal('a');
  });

  it('should render Loading when isRequesting', function () {
    instance = renderIntoDocument(
      <AutoComplete isRequesting={ true }/>
    );
    const searchInput = findRenderedDOMComponentWithTag(instance, 'input');
    searchInput.value = 'a';
    Simulate.change(searchInput);
    const contentWrapper = findRenderedDOMComponentWithClass(instance, 'content-wrapper');
    contentWrapper.textContent.should.containEql('Loading...');
  });
});
