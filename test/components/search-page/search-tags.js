import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import SearchTags from 'components/search-page/search-tags';
import { unmountComponentSuppressError } from 'utils/test';


describe('SearchTags component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    SearchTags.should.be.renderable();
  });

  it('should capitalize tags', function () {
    instance = renderIntoDocument(<SearchTags tags={ ['aaa'] } onSelect={ () => {} }/>);
    findDOMNode(instance).textContent.should.containEql('Aaa');
  });

  it('should render Data Tool tag when there is no tags', function () {
    instance = renderIntoDocument(<SearchTags tags={ [] }/>);
    findDOMNode(instance).textContent.should.containEql('Data Tool');
  });
});
