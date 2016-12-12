import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import SuggestionTags from 'components/landing-page/autocomplete/suggestion-tags';
import { unmountComponentSuppressError } from 'utils/test';


describe('SuggestionTags component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    SuggestionTags.should.be.renderable();
  });

  it('should capitalize tags', function () {
    instance = renderIntoDocument(<SuggestionTags tags={ ['aaa'] } onSelect={ () => {} }/>);
    findDOMNode(instance).textContent.should.containEql('Aaa');
  });

  it('should render Data Tool tag when there is no tags', function () {
    instance = renderIntoDocument(<SuggestionTags tags={ [] }/>);
    findDOMNode(instance).textContent.should.containEql('Data Tool');
  });
});
