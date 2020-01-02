import React from 'react';
import { shallow } from 'enzyme';

import PopupWrapper from 'components/common/popup/popup-wrapper';
import CoaccusedPopup from 'components/cr-page/accused-officers/coaccused-popup';


describe('CoaccusedPopup component', function () {
  it('should render PopupWrapper and content', function () {
    const wrapper = shallow(
      <CoaccusedPopup
        finding='Sustained'
        outcome='Reprimand'
        recommendedOutcome='365 Day Suspension'
      />
    );

    const popup = wrapper.find(PopupWrapper);
    popup.prop('popupButtonClassName').should.equal('bottom-popup-button');

    wrapper.find('.coaccused-popup-title').text().should.equal(
      'ADDITIONAL INFORMATION'
    );

    wrapper.find('.coaccused-popup-row').should.have.length(3);

    const labels = wrapper.find('.coaccused-popup-row-label');
    labels.should.have.length(3);
    labels.at(0).text().should.equal('Final Finding');
    labels.at(1).text().should.equal('Recommended Outcome');
    labels.at(2).text().should.equal('Final Outcome');

    const values = wrapper.find('.coaccused-popup-row-value');
    values.should.have.length(3);
    values.at(0).text().should.equal('Sustained');
    values.at(1).text().should.equal('365 Day Suspension');
    values.at(2).text().should.equal('Reprimand');
  });
});
