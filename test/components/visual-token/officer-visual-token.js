import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerVisualToken from 'components/visual-token/officer-visual-token';

describe('OfficerVisualToken component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(
      <OfficerVisualToken
        backgroundColor='red'
      />
    );
    const visualTokenElement = findRenderedDOMComponentWithClass(instance, 'test--officer-visual-token-background');
    visualTokenElement.style.backgroundColor.should.eql('red');
  });
});
