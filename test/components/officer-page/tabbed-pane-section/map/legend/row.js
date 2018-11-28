import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import Row from 'components/officer-page/tabbed-pane-section/map/legend/row';
import { unmountComponentSuppressError } from 'utils/test';


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
      />
    );
    const rowText = findRenderedDOMComponentWithClass(instance, 'legend-row-text');
    rowText.textContent.should.eql('Test Row');
    const rowNumber = findRenderedDOMComponentWithClass(instance, 'legend-row-number');
    rowNumber.textContent.should.eql('20');
  });
});
