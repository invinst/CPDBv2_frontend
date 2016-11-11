import React from 'react';
import {
  renderIntoDocument, scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import Children from 'utils/test/components/children';
import { unmountComponentSuppressError } from 'utils/test';
import Toolbar from 'components/inline-editable/rich-text-editor/toolbar';

describe('Toolbar component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render children', function () {
    instance = renderIntoDocument(
      <Toolbar>
        <Children />
      </Toolbar>
    );
    scryRenderedComponentsWithType(instance, Children).should.be.ok();
  });
});
