import React from 'react';
import { unmountComponentSuppressError } from 'utils/test';
import { renderIntoDocument } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import NavigationHeaderLink from 'components/headers/shareable-header/navigation-header-button';


describe('NavigationHeaderLink component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be render contents', function () {
    instance = renderIntoDocument(
      <NavigationHeaderLink
        scrollPosition='top'
        buttonText='Documents'
        navigationLink='https://lvh.me/documents/'
      />
    );

    const headerButton = findDOMNode(instance);
    headerButton.textContent.should.eql('Documents');
    headerButton.getAttribute('href').should.eql('https://lvh.me/documents/');
  });
});
