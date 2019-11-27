import React from 'react';
import { mount } from 'enzyme';

import Popup from 'components/common/popup';


describe('Popup', function () {
  it('should render the button', function () {
    const wrapper = mount(<Popup title='Some title' text='Some text' />);

    const popupTitle = wrapper.find('.tooltip-title');
    popupTitle.text().should.equal('Some title');
    const popupText = wrapper.find('.tooltip-text');

    popupText.text().should.equal('Some text');
  });
});
