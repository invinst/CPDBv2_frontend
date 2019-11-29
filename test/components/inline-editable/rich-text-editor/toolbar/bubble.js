import React from 'react';
import { shallow } from 'enzyme';

import Children from 'utils/test/components/children';
import Bubble from 'components/inline-editable/rich-text-editor/toolbar/bubble';

describe('Bubble component', function () {
  it('should render children', function () {
    const wrapper = shallow(
      <Bubble>
        <Children />
      </Bubble>
    );
    wrapper.find(Children).exists().should.be.true();
  });
});
