import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  Simulate,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { CoaccusedFactory } from 'utils/test/factories/officer';
import AccusedOfficers from 'components/cr-page/accused-officers';
import OfficerCard from 'components/common/officer-card';
import Popup from 'components/common/popup';
import CoaccusedPopup from 'components/cr-page/accused-officers/coaccused-popup';


describe('AccusedOfficers component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render OfficerCard', function () {
    instance = renderIntoDocument(<AccusedOfficers officers={ CoaccusedFactory.buildList(3) } />);
    scryRenderedComponentsWithType(instance, OfficerCard).should.have.length(3);
    scryRenderedDOMComponentsWithClass(instance, 'accused-officer-card').should.have.length(3);
  });

  it('should display show more button when accused list is not expanded', function () {
    instance = renderIntoDocument(<AccusedOfficers />);
    instance.setState({ expanded: false });

    const innerHTML = findDOMNode(instance).innerHTML;
    innerHTML.should.containEql('Show all accused officers');
  });

  it('should expand accused officers when click on show more button', function () {
    instance = renderIntoDocument(<AccusedOfficers />);

    const showMoreButton = findRenderedDOMComponentWithClass(instance, 'show-more-button');
    Simulate.click(showMoreButton);

    instance.state.expanded.should.be.true();
  });

  it('should render popup', function () {
    const popup = {
      title: 'Accused Officer',
      text: 'Some accused officer explanation',
    };
    instance = renderIntoDocument(<AccusedOfficers popup={ popup } pathName='/complaint/1086235/'/>);
    const accusedOfficersPopup = findRenderedComponentWithType(instance, Popup);
    accusedOfficersPopup.props.title.should.eql('Accused Officer');
    accusedOfficersPopup.props.text.should.eql('Some accused officer explanation');
    accusedOfficersPopup.props.url.should.eql('/complaint/1086235/');
  });

  it('should render coaccused popups', function () {
    const coaccusedOfficers = CoaccusedFactory.buildList(3);
    instance = renderIntoDocument(<AccusedOfficers officers={ coaccusedOfficers } />);

    const popups = scryRenderedComponentsWithType(instance, CoaccusedPopup);
    popups.should.have.length(3);

    popups[0].props.finding.should.eql(coaccusedOfficers[0].finding);
    popups[0].props.outcome.should.eql(coaccusedOfficers[0].outcome);
    popups[0].props.recommendedOutcome.should.eql(coaccusedOfficers[0].recommendedOutcome);

    popups[1].props.finding.should.eql(coaccusedOfficers[1].finding);
    popups[1].props.outcome.should.eql(coaccusedOfficers[1].outcome);
    popups[1].props.recommendedOutcome.should.eql(coaccusedOfficers[1].recommendedOutcome);

    popups[2].props.finding.should.eql(coaccusedOfficers[2].finding);
    popups[2].props.outcome.should.eql(coaccusedOfficers[2].outcome);
    popups[2].props.recommendedOutcome.should.eql(coaccusedOfficers[2].recommendedOutcome);
  });
});
