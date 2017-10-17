import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import { stub } from 'sinon';
import { scryRenderedComponentsWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import SocialGraph from 'components/officer-page/social-graph-page/social-graph';
import D3Elements from 'components/officer-page/social-graph-page/d3-elements';


describe('SocialGraph component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render the social graph', function () {
    const callbacks = [];
    const simulation = {
      on: (name, cb) => callbacks.push(cb),
      nodes: stub().returns([3, 4])
    };
    instance = renderIntoDocument(
      <SocialGraph
        simulation={ simulation }
        links={ [1, 2] }
      />
    );

    const d3Elments = scryRenderedComponentsWithType(instance, D3Elements);
    d3Elments.should.have.length(3);
    d3Elments[0].props.data.should.eql([1, 2]);
    d3Elments[0].props.simulation.should.eql(simulation);
    d3Elments[1].props.data.should.eql([3, 4]);
    d3Elments[1].props.simulation.should.eql(simulation);
    d3Elments[2].props.data.should.eql([3, 4]);
    d3Elments[2].props.simulation.should.eql(simulation);

    callbacks.should.have.length(3);
    for (let cb of callbacks) {
      cb();
    }
  });
});
