import React from 'react';
import { spy } from 'sinon';
import { unmountComponentSuppressError } from 'utils/test';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';

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

    const iUnderstand = findRenderedDOMComponentWithClass(element, 'i-understand-link');
    iUnderstand.innerText.should.eql('I understand');

    closeModal.called.should.be.false();
    Simulate.click(iUnderstand);
    closeModal.called.should.be.true();
  });

  it('should render external link to GitHub', function () {
    element = renderIntoDocument(
      <LegalDisclaimerModalContent />
    );
    const links = scryRenderedDOMComponentsWithClass(element, 'legal-disclaimer-body-link');
    const githubLink = links[1];
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
      const links = scryRenderedDOMComponentsWithClass(element, 'legal-disclaimer-body-link');
      const contactLink = links[2];
      contactLink.innerText.should.eql('contact');
      Simulate.click(contactLink);

      intercomUtils.showIntercomMessages.calledWith(true).should.be.true();
    });
  });

});
