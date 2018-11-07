import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerCardFooter from 'components/officer-page/tabbed-pane-section/coaccusals/officer-card-footer';


describe('OfficerCardFooter component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render with singular coaccusal count', function () {
    instance = renderIntoDocument(<OfficerCardFooter coaccusalCount={ 1 }/>);
    findDOMNode(instance).textContent.should.eql('Coaccused in 1 case.');
  });

  it('should render with plural coaccusal count', function () {
    instance = renderIntoDocument(<OfficerCardFooter coaccusalCount={ 23 }/>);
    findDOMNode(instance).textContent.should.eql('Coaccused in 23 cases.');
  });
});
