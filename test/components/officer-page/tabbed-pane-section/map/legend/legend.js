import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import Legend from 'components/officer-page/tabbed-pane-section/map/legend';
import Row from 'components/officer-page/tabbed-pane-section/map/legend/row';
import { unmountComponentSuppressError } from 'utils/test';


describe('Legend component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render rows correctly', function () {
    const legend = {
      allegationCount: 20,
      sustainedCount: 3,
      useOfForceCount: 1,
    };
    instance = renderIntoDocument(<Legend
      legend={ legend }
    />);
    const legendRow = scryRenderedComponentsWithType(instance, Row);
    legendRow.should.have.length(3);
    legendRow[0].props.number.should.eql(17);
    legendRow[1].props.number.should.eql(3);
    legendRow[2].props.number.should.eql(1);
  });
});
