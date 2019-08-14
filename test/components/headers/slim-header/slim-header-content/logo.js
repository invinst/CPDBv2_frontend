import React from 'react';
import { Link } from 'react-router';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType
} from 'react-addons-test-utils';
import MediaQuery from 'react-responsive';

import { unmountComponentSuppressError } from 'utils/test';
import Logo from 'components/headers/slim-header/slim-header-content/logo';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import LinkTextEditable from 'components/inline-editable/editable-section/link-text-editable';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import styles from 'components/headers/slim-header/slim-header-content/logo.sass';


describe('Logo component', function () {
  let instance;

  beforeEach(function () {
    instance = renderIntoDocument(
      <Logo position='top'/>
    );
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should have correct class name', function () {
    const hoverableEditWrapper = findRenderedComponentWithType(instance, HoverableEditWrapper);
    hoverableEditWrapper.props.className.should.equal(`${styles.logo} top`);
  });


  it('should render LinkTextEditable when screen width greater than 830', function () {
    const mediaQuery = scryRenderedComponentsWithType(instance, MediaQuery)[0];
    mediaQuery.setState({
      matches: true
    });

    const linkTextEditable = findRenderedComponentWithType(instance, LinkTextEditable);
    linkTextEditable.props.className.should.equal('header-logo-title');
    linkTextEditable.props.placeholder.should.equal('Title');
    linkTextEditable.props.to.should.equal('/');
    linkTextEditable.props.fieldname.should.equal('navbar_title');
  });

  it('should render Link when screen width smaller than 830', function () {
    const mediaQuery = scryRenderedComponentsWithType(instance, MediaQuery)[0];
    mediaQuery.setState({
      matches: false
    });

    const link = findRenderedComponentWithType(instance, Link);
    link.props.className.should.equal('header-logo-title');
    link.props.to.should.equal('/');
    link.props.children.should.equal('CPDP');
  });

  it('should render navbar subtitle when screen width greater than 950', function () {
    const mediaQuery = scryRenderedComponentsWithType(instance, MediaQuery)[1];
    mediaQuery.setState({
      matches: true
    });

    const richTextEditable = findRenderedComponentWithType(instance, RichTextEditable);
    richTextEditable.props.className.should.equal('header-logo-subtitle');
    richTextEditable.props.placeholder.should.equal('Subtitle');
    richTextEditable.props.fieldname.should.equal('navbar_subtitle');
  });

  it('should not render navbar subtitle when screen width smaller than 950', function () {
    const mediaQuery = scryRenderedComponentsWithType(instance, MediaQuery)[1];
    mediaQuery.setState({
      matches: false
    });

    scryRenderedComponentsWithType(instance, RichTextEditable).should.have.length(0);
  });
});
