import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import SocialGraphPage from 'components/officer-page/social-graph-page';
import Slider from 'components/officer-page/social-graph-page/slider';
import LeftPane from 'components/officer-page/social-graph-page/left-pane';
import SimulatedSocialGraph from 'components/officer-page/social-graph-page/simulated-social-graph';


describe('SocialGraphPage component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render Slider, LeftPane and SimulatedSocialGraph', function () {
    const func = () => {};
    const node1 = { id: 1 };
    const node2 = { id: 2 };
    const link = { source: 1, target: 2 };

    instance = renderIntoDocument(
      <SocialGraphPage
        nodes={ [node1, node2] }
        links={ [link] }
        legend={ { mostCrs: 7, leastCrs: 1, nodeShades: ['#fff'] } }
        yearRange={ [2000, 2010] }
        setYearRange={ func }
      />
    );

    const slider = findRenderedComponentWithType(instance, Slider);
    slider.props.value.should.eql([2000, 2010]);
    slider.props.onChange.should.eql(func);

    const leftPane = findRenderedComponentWithType(instance, LeftPane);
    leftPane.props.legend.should.eql({ mostCrs: 7, leastCrs: 1, nodeShades: ['#fff'] });
    leftPane.props.numOfficers.should.eql(2);

    const graph = findRenderedComponentWithType(instance, SimulatedSocialGraph);
    graph.props.nodes.should.eql([node1, node2]);
    graph.props.links.should.eql([link]);
  });
});
