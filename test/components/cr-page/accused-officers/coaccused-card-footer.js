import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import CoaccusedCardFooter from 'components/cr-page/accused-officers/coaccused-card-footer';


describe('CoaccusedCardFooter component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render category and outcome correctly', function () {
    instance = renderIntoDocument(
      <CoaccusedCardFooter
        finding='Sustained'
        disciplined={ true }
        category='Operations/Personnel Violation'
        findingOutcomeMix='Reprimand'
      />
    );
    const category = findRenderedDOMComponentWithClass(instance, 'test--accused-card-category');
    const outcome = findRenderedDOMComponentWithClass(instance, 'test--accused-card-outcome');
    category.textContent.should.eql('Operations/Personnel Violation');
    outcome.textContent.should.eql('Reprimand');
  });
});
