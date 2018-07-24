import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  Simulate,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { CoaccusedFactory } from 'utils/test/factories/officer';
import AccusedOfficers from 'components/cr-page/accused-officers';
import CoaccusedCard from 'components/cr-page/accused-officers/coaccused-card';
import Popup from 'components/common/popup';


describe('AccusedOfficers component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render CoaccusedCard', function () {
    instance = renderIntoDocument(<AccusedOfficers officers={ CoaccusedFactory.buildList(3) } />);
    scryRenderedComponentsWithType(instance, CoaccusedCard).should.have.length(3);
  });

  it('should display show more button when accused list is not expanded', function () {
    instance = renderIntoDocument(<AccusedOfficers />);
    instance.setState({ expanded: false });

    const innerHTML = findDOMNode(instance).innerHTML;
    innerHTML.should.containEql('Show all accused officers');
  });

  it('should expand accused officers when click on show more button', function () {
    instance = renderIntoDocument(<AccusedOfficers />);

    const showMoreButton = findRenderedDOMComponentWithClass(instance, 'test--accused-officer-show-more');
    Simulate.click(showMoreButton);

    instance.state.expanded.should.be.true();
  });

  it('should render popup', function () {
    const popup = {
      title: 'Accused Officer',
      text: 'Some accused officer explanation',
    };
    instance = renderIntoDocument(<AccusedOfficers popup={ popup } />);
    const accusedOfficersPopup = findRenderedComponentWithType(instance, Popup);
    accusedOfficersPopup.props.title.should.eql('Accused Officer');
    accusedOfficersPopup.props.text.should.eql('Some accused officer explanation');
  });
});
