import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import Row from 'components/common/allegations-map/legend/row';
import { unmountComponentSuppressError } from 'utils/test';
import LoadingSpinner from 'components/common/loading-spinner';

describe('Row component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render row correctly', function () {
    instance = renderIntoDocument(
      <Row
        ovalColor={ 'red' }
        ovalBorderColor={ 'black' }
        text={ 'Test Row' }
        number={ 20 }
        haveMarginBottom={ false }
        hovering={ false }
        loading={ false }
      />
    );
    const rowText = findRenderedDOMComponentWithClass(instance, 'legend-row-text');
    rowText.textContent.should.eql('Test Row');
    const rowNumber = findRenderedDOMComponentWithClass(instance, 'legend-row-number');
    rowNumber.textContent.should.eql('20');
    scryRenderedComponentsWithType(instance, LoadingSpinner).should.have.length(0);
  });

  it('should render row with loading spinner', function () {
    instance = renderIntoDocument(
      <Row
        ovalColor={ 'red' }
        ovalBorderColor={ 'black' }
        text={ 'Test Row' }
        number={ 20 }
        haveMarginBottom={ false }
        hovering={ false }
        loading={ true }
      />
    );
    scryRenderedComponentsWithType(instance, LoadingSpinner).should.have.length(1);
  });
});
