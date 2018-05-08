import React from 'react';
import { spy } from 'sinon';
import { Link } from 'react-router';
import { unmountComponentSuppressError } from 'utils/test';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';

import { FAQ_PATH } from 'utils/constants';
import LegalDisclaimerModalContent from 'components/generic-modal/legal-disclaimer-modal-content';
import * as intercomUtils from 'utils/intercom';


describe('LegalDisclaimerModalContent component', function () {
  let element;

  afterEach(function () {
    if (element) {
      unmountComponentSuppressError(element);
    }
  });

  it('should render "I understand" link which closes modal on click', function () {
    const closeModal = spy();
    element = renderIntoDocument(
      <LegalDisclaimerModalContent closeModal={ closeModal }/>
    );

    const iUnderstand = findRenderedDOMComponentWithClass(element, 'test--i-understand-link');
    iUnderstand.innerText.should.eql('I understand');

    closeModal.called.should.be.false();
    Simulate.click(iUnderstand);
    closeModal.called.should.be.true();
  });

  it('should render link to FAQ that also closes modal on click', function () {
    const closeModal = spy();
    element = renderIntoDocument(
      <LegalDisclaimerModalContent closeModal={ closeModal }/>
    );

    const faqLink = findRenderedComponentWithType(element, Link);
    faqLink.props.children.should.eql('FAQ');
    faqLink.props.to.should.eql(`/${FAQ_PATH}`);
    faqLink.props.onClick.should.equal(closeModal);
  });

  it('should render external link to GitHub', function () {
    element = renderIntoDocument(
      <LegalDisclaimerModalContent />
    );

    const githubLink = findRenderedDOMComponentWithClass(element, 'test--github-link');
    githubLink.innerText.should.eql('GitHub');
    githubLink.getAttribute('href').should.eql('https://github.com/invinst/');
    githubLink.getAttribute('target').should.eql('_blank');
  });

  describe('Contact link', function () {
    beforeEach(function () {
      spy(intercomUtils, 'showIntercomMessages');
    });

    afterEach(function () {
      intercomUtils.showIntercomMessages.restore();
    });
    it('contact link should open Intercom chat dialog', function () {
      element = renderIntoDocument(
        <LegalDisclaimerModalContent />
      );
      const contactLink = findRenderedDOMComponentWithClass(element, 'test--contact-link');
      contactLink.innerText.should.eql('contact');
      Simulate.click(contactLink);

      intercomUtils.showIntercomMessages.calledWith(true).should.be.true();
    });
  });

});
