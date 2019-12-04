import React from 'react';
import { shallow } from 'enzyme';

import OfficerVisualToken from 'components/visual-token/officer-visual-token';

describe('OfficerVisualToken component', function () {
  it('should render correctly', function () {
    const wrapper = shallow(
      <OfficerVisualToken
        backgroundColor='red'
      />
    );
    const visualTokenElement = wrapper.find('.test--officer-visual-token-background');
    visualTokenElement.prop('style').backgroundColor.should.equal('red');
  });
});
