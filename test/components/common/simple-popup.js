import React from 'react';
import ReactTooltip from 'react-tooltip';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import SimplePopup from 'components/common/simple-popup';


describe('SimplePopup component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(
      <SimplePopup id='tooltip-123'>
        <span className='test-span'>Some content</span>
      </SimplePopup>
    );
    const tooltip = findRenderedComponentWithType(instance, ReactTooltip);
    tooltip.props.id.should.eql('tooltip-123');
    tooltip.props.className.should.containEql('popup');
    tooltip.props.effect.should.eql('solid');
    tooltip.props.type.should.eql('light');

    const testSpan = findRenderedDOMComponentWithClass(tooltip, 'test-span');
    testSpan.textContent.should.eql('Some content');
  });
});
