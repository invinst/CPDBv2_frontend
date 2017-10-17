import React from 'react';
import {
  renderIntoDocument, findRenderedComponentWithType
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import LeftPane from 'components/officer-page/social-graph-page/left-pane';
import Legend from 'components/officer-page/social-graph-page/legend';


describe('LeftPane component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render legend and number of officers', function () {
    instance = renderIntoDocument(
      <LeftPane
        legend={ {
          mostCrs: 7,
          leastCrs: 1,
          nodeShades: ['#fff']
        } }
        numOfficers={ 2 }
      />
    );

    const legend = findRenderedComponentWithType(instance, Legend);
    legend.props.mostCrs.should.eql(7);
    legend.props.leastCrs.should.eql(1);
    legend.props.nodeShades.should.eql(['#fff']);

    const el = findDOMNode(instance);
    el.innerHTML.should.containEql('2');
  });
});
