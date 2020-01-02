import React from 'react';
import { shallow } from 'enzyme';
import ReactTooltip from 'react-tooltip';

import SimplePopup from 'components/common/simple-popup';


describe('SimplePopup component', function () {
  it('should render correctly', function () {
    const wrapper = shallow(
      <SimplePopup id='tooltip-123'>
        <span className='test-span'>Some content</span>
      </SimplePopup>
    );
    const tooltip = wrapper.find(ReactTooltip);
    tooltip.prop('id').should.equal('tooltip-123');
    tooltip.prop('className').should.containEql('popup');
    tooltip.prop('effect').should.equal('solid');
    tooltip.prop('type').should.equal('light');

    const testSpan = tooltip.find('.test-span');
    testSpan.text().should.equal('Some content');
  });
});
