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
    instance = renderIntoDocument(<SearchTags tags={ ['aaa', 'bbb'] } onSelect={ () => {} }/>);
    findDOMNode(instance).textContent.should.containEql('AAA');
    findDOMNode(instance).textContent.should.containEql('BBB');
  });

  it('should render Data Tool tag when there is no tags', function () {
    instance = renderIntoDocument(<SearchTags tags={ [] } isRequesting={ false }/>);
    findDOMNode(instance).textContent.should.containEql('Data Tool');
  });

  it('should not render Data Tool tag when requesting', function () {
    instance = renderIntoDocument(<SearchTags tags={ [] } isRequesting={ true }/>);
    findDOMNode(instance).textContent.should.not.containEql('Data Tool');
  });

  it('should render PinboardButton', function () {
    instance = renderIntoDocument(<SearchTags pinboard={ {
      itemsCount: 0,
      isPinboardRestored: true,
    } }/>);
    findDOMNode(instance).textContent.should.containEql('Your pinboard is empty');
  });
});
