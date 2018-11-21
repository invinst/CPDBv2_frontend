import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import { unmountComponentSuppressError, renderWithContext } from 'utils/test';
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
    const category = findRenderedDOMComponentWithClass(instance, 'accused-card-category');
    const outcome = findRenderedDOMComponentWithClass(instance, 'accused-card-outcome');
    category.textContent.should.eql('Operations/Personnel Violation');
    outcome.textContent.should.eql('Reprimand');
  });

  it('should render disciplined if both isPrinting and disciplined are true', function () {
    const context = { isPrinting: true };
    instance = renderWithContext(context,
      <CoaccusedCardFooter
        finding='Sustained'
        disciplined={ true }
        category='Operations/Personnel Violation'
        findingOutcomeMix='Reprimand'
      />);
    const findingOutcome = findRenderedDOMComponentWithClass(instance, 'finding-outcome-mix');
    findingOutcome.textContent.should.eql('Reprimand, Disciplined');
  });

  it('should only render disciplined if isPrinting & disciplined are true and findingOutcomeMix is null', function () {
    const context = { isPrinting: true };
    instance = renderWithContext(context,
      <CoaccusedCardFooter
        finding='Sustained'
        disciplined={ true }
        category='Operations/Personnel Violation'
        findingOutcomeMix={ null }
      />);
    const findingOutcome = findRenderedDOMComponentWithClass(instance, 'finding-outcome-mix');
    findingOutcome.textContent.should.eql('Disciplined');
  });
});
