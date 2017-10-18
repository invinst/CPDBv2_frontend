import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import SimulatedSocialGraph from 'components/officer-page/social-graph-page/simulated-social-graph';
import SocialGraph from 'components/officer-page/social-graph-page/social-graph';


describe('SimulatedSocialGraph component', function () {
  let instance;
  const nodes = [
    { id: 1 },
    { id: 2 }
  ];
  const links = [
    { source: 1, target: 2 }
  ];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should create link force and simulation when constructed', function () {
    instance = renderIntoDocument(
      <SimulatedSocialGraph nodes={ nodes } links={ links }/>
    );
    instance.simulation.should.be.ok();
    instance.linkForce.should.be.ok();
  });

  it('should render social graph', function () {
    instance = renderIntoDocument(
      <SimulatedSocialGraph nodes={ nodes } links={ links }/>
    );
    const graph = findRenderedComponentWithType(instance, SocialGraph);
    graph.props.simulation.should.eql(instance.simulation);
    graph.props.links.should.have.length(1);
  });

  it('should restart simulation when receive new nodes and links', function () {
    instance = renderIntoDocument(
      <SimulatedSocialGraph nodes={ nodes } links={ links }/>
    );
    spy(SimulatedSocialGraph.prototype, 'restartSimulation');

    reRender(<SimulatedSocialGraph nodes={ [] } links={ [] }/>, instance);

    SimulatedSocialGraph.prototype.restartSimulation.called.should.be.true();
    SimulatedSocialGraph.prototype.restartSimulation.restore();
  });

  it('should not restart simulation when receive same nodes and links', function () {
    instance = renderIntoDocument(
      <SimulatedSocialGraph nodes={ nodes } links={ links }/>
    );
    spy(SimulatedSocialGraph.prototype, 'restartSimulation');

    reRender(<SimulatedSocialGraph nodes={ nodes } links={ links }/>, instance);

    SimulatedSocialGraph.prototype.restartSimulation.called.should.be.false();
    SimulatedSocialGraph.prototype.restartSimulation.restore();
  });

  describe('thereIsChangeInGraph method', function () {
    it('should return false when there isnt a change', function () {
      SimulatedSocialGraph.prototype.thereIsChangeInGraph.call(
        {
          props: {
            nodes: [{ id: 1 }],
            links: []
          }
        },
        {
          nodes: [{ id: 1 }],
          links: []
        }
      ).should.be.false();

      SimulatedSocialGraph.prototype.thereIsChangeInGraph.call(
        {
          props: {
            nodes: [{ id: 1 }, { id: 2 }, { id: 3 }],
            links: [{ source: 1, target: 2 }, { source: 2, target: 3 }]
          }
        },
        {
          nodes: [{ id: 2 }, { id: 1 }, { id: 3 }],
          links: [{ source: 2, target: 3 }, { source: 1, target: 2 }]
        }
      ).should.be.false();
    });

    it('should return true when there is node change', function () {
      SimulatedSocialGraph.prototype.thereIsChangeInGraph.call(
        {
          props: {
            nodes: [{ id: 1 }],
            links: []
          }
        },
        {
          nodes: [],
          links: []
        }
      ).should.be.true();
      SimulatedSocialGraph.prototype.thereIsChangeInGraph.call(
        {
          props: {
            nodes: [],
            links: []
          }
        },
        {
          nodes: [{ id: 1 }],
          links: []
        }
      ).should.be.true();
    });

    it('should return true when there is link change', function () {
      SimulatedSocialGraph.prototype.thereIsChangeInGraph.call(
        {
          props: {
            nodes: [{ id: 1 }, { id: 2 }],
            links: [{ source: 1, target: 2 }]
          }
        },
        {
          nodes: [{ id: 1 }, { id: 2 }],
          links: []
        }
      ).should.be.true();
      SimulatedSocialGraph.prototype.thereIsChangeInGraph.call(
        {
          props: {
            nodes: [{ id: 1 }, { id: 2 }],
            links: []
          }
        },
        {
          nodes: [{ id: 1 }, { id: 2 }],
          links: [{ source: 1, target: 2 }]
        }
      ).should.be.true();
    });
  });
});
