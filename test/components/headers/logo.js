import React from 'react';
import { Link } from 'react-router';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType
} from 'react-addons-test-utils';
import MediaQuery from 'react-responsive';

import { unmountComponentSuppressError } from 'utils/test';
import Logo from 'components/headers/slim-header/logo';
import LinkTextEditable from 'components/inline-editable/editable-section/link-text-editable';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';


describe('Logo component', function () {
  let instance;

  beforeEach(function () {
    instance = renderIntoDocument(
      <Logo />
    );
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });


  it('should render LinkTextEditable when screen width greater than 830', function () {
    const mediaQuery = scryRenderedComponentsWithType(instance, MediaQuery)[0];
    mediaQuery.setState({
      matches: true
    });

    findRenderedComponentWithType(instance, LinkTextEditable).should.be.ok();
  });

  it('should render Link when screen width smaller than 830', function () {
    const mediaQuery = scryRenderedComponentsWithType(instance, MediaQuery)[0];
    mediaQuery.setState({
      matches: false
    });

    findRenderedComponentWithType(instance, Link).should.be.ok();
  });

  it('should render navbar subtitle when screen width greater than 950', function () {
    const mediaQuery = scryRenderedComponentsWithType(instance, MediaQuery)[1];
    mediaQuery.setState({
      matches: true
    });

    findRenderedComponentWithType(instance, RichTextEditable).should.be.ok();
  });

  it('should not render navbar subtitle when screen width smaller than 950', function () {
    const mediaQuery = scryRenderedComponentsWithType(instance, MediaQuery)[1];
    mediaQuery.setState({
      matches: false
    });

    scryRenderedComponentsWithType(instance, RichTextEditable).should.have.length(0);
  });
});
