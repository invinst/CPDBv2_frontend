import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test/index';
import OfficerVisualToken from 'components/visual-token/officer-visual-token';

describe('OfficerVisualToken component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(
      <OfficerVisualToken
        officerId={ 1 }
        backgroundColor='red'
        width={ 200 }
        height={ 200 }
      />
    );
    const imgElement = findRenderedDOMComponentWithTag(instance, 'img');
    imgElement.getAttribute('src').should.eql(
      'https://cpdbdev.blob.core.windows.net/visual-token/officer_1.svg'
    );
  });
});
