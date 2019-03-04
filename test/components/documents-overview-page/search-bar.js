import React from 'react';
import { spy } from 'sinon';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  Simulate,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import SearchBar from 'components/documents-overview-page/search-bar';


describe('DocumentsOverviewPage SearchBar component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should trigger onChange on input change', function () {
    const onChange = spy();
    instance = renderIntoDocument(
      <SearchBar value='' onChange={ onChange }/>
    );

    const inputElement = findRenderedDOMComponentWithTag(instance, 'input');
    inputElement.value = 'value';
    Simulate.change(inputElement);
    onChange.called.should.be.true();
  });
});
