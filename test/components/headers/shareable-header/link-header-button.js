import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';
import { Link } from 'react-router';

import { unmountComponentSuppressError } from 'utils/test';
import LinkHeaderButton from 'components/headers/shareable-header/link-header-button';


describe('LinkHeaderButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correct passed props', function () {
    instance = renderIntoDocument(
      <LinkHeaderButton
        buttonText='link-header-button'
        to='/path'
      />
    );

    const anchor = findRenderedDOMComponentWithTag(instance, 'a');
    anchor.innerText.should.eql('link-header-button');

    const link = findRenderedComponentWithType(instance, Link);
    link.props.should.containEql({
      to: '/path',
    });
  });
});
