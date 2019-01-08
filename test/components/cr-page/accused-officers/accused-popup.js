import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import PopupWrapper from 'components/common/popup/popup-wrapper';
import CoaccusedPopup from 'components/cr-page/accused-officers/coaccused-popup';


describe('CoaccusedPopup component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render PopupWrapper and content', function () {
    instance = renderIntoDocument(
      <CoaccusedPopup
        finding='Sustained'
        outcome='Reprimand'
        recommendedOutcome='365 Day Suspension'
      />
    );

    const popup = findRenderedComponentWithType(instance, PopupWrapper);
    popup.props.popupButtonClassName.should.eql('bottom-popup-button');

    findRenderedDOMComponentWithClass(instance, 'coaccused-popup-title').textContent.should.eql(
      'ADDITIONAL INFORMATION'
    );

    scryRenderedDOMComponentsWithClass(instance, 'coaccused-popup-row').should.have.length(3);

    const labels = scryRenderedDOMComponentsWithClass(instance, 'coaccused-popup-row-label');
    labels.should.have.length(3);
    labels[0].textContent.should.eql('Final Finding');
    labels[1].textContent.should.eql('Recommended Outcome');
    labels[2].textContent.should.eql('Final Outcome');

    const values = scryRenderedDOMComponentsWithClass(instance, 'coaccused-popup-row-value');
    values.should.have.length(3);
    values[0].textContent.should.eql('Sustained');
    values[1].textContent.should.eql('365 Day Suspension');
    values[2].textContent.should.eql('Reprimand');
  });

});
