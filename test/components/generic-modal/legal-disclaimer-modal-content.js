import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import LegalDisclaimerModalContent from 'components/generic-modal/legal-disclaimer-modal-content';
import * as intercomUtils from 'utils/intercom';


describe('LegalDisclaimerModalContent component', function () {
  it('should render "I understand" link which closes modal on click', function () {
    const closeModal = spy();
    const wrapper = shallow(
      <LegalDisclaimerModalContent closeModal={ closeModal }/>
    );

    const iUnderstand = wrapper.find('.i-understand-link');
    iUnderstand.text().should.equal('I understand');

    closeModal.should.not.be.called();
    iUnderstand.simulate('click');
    closeModal.should.be.calledOnce();
  });

  it('should render external link to GitHub', function () {
    const wrapper = shallow(
      <LegalDisclaimerModalContent />
    );
    const links = wrapper.find('.legal-disclaimer-body-link');
    const githubLink = links.at(1).dive();
    githubLink.text().should.equal('GitHub');
    githubLink.prop('href').should.equal('https://github.com/invinst/');
    githubLink.prop('target').should.equal('_blank');
  });

  describe('Contact link', function () {
    beforeEach(function () {
      spy(intercomUtils, 'showIntercomMessages');
    });

    afterEach(function () {
      intercomUtils.showIntercomMessages.restore();
    });

    it('contact link should open Intercom chat dialog', function () {
      const wrapper = shallow(
        <LegalDisclaimerModalContent />
      );
      const links = wrapper.find('.legal-disclaimer-body-link');
      const contactLink = links.at(2);
      contactLink.text().should.equal('contact');
      contactLink.simulate('click');

      intercomUtils.showIntercomMessages.should.be.calledWith(true);
    });
  });

});
