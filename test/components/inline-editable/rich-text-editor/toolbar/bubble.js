import React from 'react';
import {
  renderIntoDocument, scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import Children from 'utils/test/components/children';
import { unmountComponentSuppressError } from 'utils/test';
import Bubble from 'components/inline-editable/rich-text-editor/toolbar/bubble';

describe('Bubble component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render children', function () {
    instance = renderIntoDocument(
      <Bubble>
        <Children />
      </Bubble>
    );
    scryRenderedComponentsWithType(instance, Children).should.be.ok();
  });
});
