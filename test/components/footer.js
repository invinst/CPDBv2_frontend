import React from 'react';

import Footer from 'components/footer';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import { spy } from 'sinon';
import { unmountComponentSuppressError } from 'utils/test';
import FooterNavLink from 'components/footer/footer-nav-link';
import * as intercomUtils from 'utils/intercom';


describe('Footer component', function () {
  let element;

  beforeEach(function () {
    spy(intercomUtils, 'showIntercomMessages');
  });

  afterEach(function () {
    unmountComponentSuppressError(element);
    intercomUtils.showIntercomMessages.restore();
  });

  it('should render', function () {
    Footer.should.be.renderable();
  });

  it('should render GitHub external link', function () {
    element = renderIntoDocument(<Footer />);
    const links = scryRenderedComponentsWithType(element, FooterNavLink);
    const githubLink = links.filter(link => link.props.name === 'GitHub')[0];
    githubLink.props.externalHref.should.eql('https://github.com/invinst/');
  });

  it('should render Legal Disclaimer link', function () {
    const openRequestDocumentModal = spy();
    element = renderIntoDocument(<Footer openLegalDisclaimerModal={ openRequestDocumentModal }/>);
    const links = scryRenderedComponentsWithType(element, FooterNavLink);
    const legalLink = links.filter(link => link.props.name === 'Legal')[0];
    legalLink.props.onClick();
    openRequestDocumentModal.calledOnce.should.be.true();
  });

  it('should render Contact link', function () {
    element = renderIntoDocument(<Footer />);

    const links = scryRenderedComponentsWithType(element, FooterNavLink);
    const contactLink = links.filter(link => link.props.name === 'Contact')[0];
    contactLink.props.onClick();
    intercomUtils.showIntercomMessages.calledWith(true).should.be.true();
  });

  it('should render Invisible Institute link', function () {
    element = renderIntoDocument(<Footer />);
    const links = findRenderedDOMComponentWithClass(element, 'test--footer-invinst-logo');
    links.getAttribute('href').should.eql('https://invisible.institute/cpdp');
  });
});
