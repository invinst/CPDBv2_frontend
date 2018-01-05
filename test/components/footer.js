import React from 'react';

import Footer from 'components/footer';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';
import { spy } from 'sinon';
import { unmountComponentSuppressError } from 'utils/test';
import FooterNavLink from 'components/common/footer-nav-link';


describe('Footer component', function () {
  let element;

  beforeEach(function () {
    spy(window, 'Intercom');
  });

  afterEach(function () {
    unmountComponentSuppressError(element);
    window.Intercom.restore();
  });

  it('should render', function () {
    Footer.should.be.renderable();
  });

  it('should render GitHub external link', function () {
    element = renderIntoDocument(<Footer />);
    const links = scryRenderedComponentsWithType(element, FooterNavLink);
    const githubLink = links.filter(link => link.props.name === 'Github')[0];
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
    window.Intercom.calledWith('show').should.be.true();
  });
});
