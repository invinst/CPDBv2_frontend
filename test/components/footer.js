import React from 'react';
import { mount } from 'enzyme';

import Footer from 'components/footer';
import sinon from 'sinon';
import FooterNavLink from 'components/footer/footer-nav-link';
import * as intercomUtils from 'utils/intercom';


describe('Footer component', function () {
  beforeEach(function () {
    sinon.spy(intercomUtils, 'showIntercomMessages');
  });

  it('should render', function () {
    Footer.should.be.renderable();
  });

  it('should render GitHub external link', function () {
    const wrapper = mount(<Footer />);
    const links = wrapper.find(FooterNavLink);
    const githubLink = links.findWhere(link => link.prop('name') === 'GitHub');
    githubLink.prop('externalHref').should.equal('https://github.com/invinst/');
  });

  it('should render Legal Disclaimer link', function () {
    const openRequestDocumentModal = sinon.spy();
    const wrapper = mount(
      <Footer openLegalDisclaimerModal={ openRequestDocumentModal }/>
    );
    const links = wrapper.find(FooterNavLink);
    const legalLink = links.findWhere(link => link.prop('name') === 'Legal');
    legalLink.prop('onClick')();
    openRequestDocumentModal.calledOnce.should.be.true();
  });

  it('should render Contact link', function () {
    const wrapper = mount(<Footer />);

    const links = wrapper.find(FooterNavLink);
    const contactLink = links.findWhere(link => link.prop('name') === 'Contact');
    contactLink.prop('onClick')();
    intercomUtils.showIntercomMessages.should.be.calledWith(true);
  });

  it('should render Invisible Institute link', function () {
    const wrapper = mount(<Footer />);
    const link = wrapper.find('.test--footer-invinst-logo').first();
    link.prop('href').should.equal('https://invisible.institute/cpdp');
  });
});
