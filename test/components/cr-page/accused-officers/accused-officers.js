import React from 'react';
import { shallow } from 'enzyme';

import { CoaccusedFactory } from 'utils/test/factories/officer';
import AccusedOfficers from 'components/cr-page/accused-officers';
import CoaccusedCard from 'components/cr-page/accused-officers/coaccused-card';
import Popup from 'components/common/popup';
import CoaccusedPopup from 'components/cr-page/accused-officers/coaccused-popup';


describe('AccusedOfficers component', function () {
  it('should render CoaccusedCard', function () {
    const wrapper = shallow(<AccusedOfficers officers={ CoaccusedFactory.buildList(3) } />);
    wrapper.find(CoaccusedCard).should.have.length(3);
    wrapper.find('.accused-officer-card').should.have.length(3);
  });

  it('should display show more button when accused list is not expanded', function () {
    const wrapper = shallow(<AccusedOfficers />);
    wrapper.setState({ expanded: false });

    wrapper.text().should.containEql('Show all accused officers');
  });

  it('should expand accused officers when click on show more button', function () {
    const wrapper = shallow(<AccusedOfficers />);

    const showMoreButton = wrapper.find('.show-more-button');
    showMoreButton.simulate('click');

    wrapper.state('expanded').should.be.true();
  });

  it('should render popup', function () {
    const popup = {
      title: 'Accused Officer',
      text: 'Some accused officer explanation',
    };
    const wrapper = shallow(<AccusedOfficers popup={ popup } pathName='/complaint/1086235/'/>);
    const accusedOfficersPopup = wrapper.find(Popup);
    accusedOfficersPopup.prop('title').should.equal('Accused Officer');
    accusedOfficersPopup.prop('text').should.equal('Some accused officer explanation');
    accusedOfficersPopup.prop('url').should.equal('/complaint/1086235/');
  });

  it('should render coaccused popups', function () {
    const coaccusedOfficers = CoaccusedFactory.buildList(3);
    const wrapper = shallow(<AccusedOfficers officers={ coaccusedOfficers } />);

    const popups = wrapper.find(CoaccusedPopup);
    popups.should.have.length(3);

    popups.at(0).prop('finding').should.eql(coaccusedOfficers[0].finding);
    popups.at(0).prop('outcome').should.eql(coaccusedOfficers[0].outcome);
    popups.at(0).prop('recommendedOutcome').should.eql(coaccusedOfficers[0].recommendedOutcome);

    popups.at(1).prop('finding').should.eql(coaccusedOfficers[1].finding);
    popups.at(1).prop('outcome').should.eql(coaccusedOfficers[1].outcome);
    popups.at(1).prop('recommendedOutcome').should.eql(coaccusedOfficers[1].recommendedOutcome);

    popups.at(2).prop('finding').should.eql(coaccusedOfficers[2].finding);
    popups.at(2).prop('outcome').should.eql(coaccusedOfficers[2].outcome);
    popups.at(2).prop('recommendedOutcome').should.eql(coaccusedOfficers[2].recommendedOutcome);
  });
});
