import should from 'should';
import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType,
  Simulate
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';

import { unmountComponentSuppressError } from 'utils/test';
import PairingCard from 'components/landing-page/common/pairing-card';
import PairingChart from 'components/landing-page/common/pairing-card/pairing-chart';
import OfficerInfo from 'components/landing-page/common/pairing-card/officer-info';
import HalfPane from 'components/landing-page/common/pairing-card/half-pane';



describe('PairingCard component', function () {
  let instance;
  const officer1 = {
    id: '123',
    fullName: 'Jerome Finnigan',
    birthYear: 1963,
    race: 'White',
    gender: 'Male',
  };
  const officer2 = {
    id: '456',
    fullName: 'Carl Suchocki',
    birthYear: 1973,
    race: 'White',
    gender: 'Male',
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render pairing card of two officers', function () {
    instance = renderIntoDocument(
      <PairingCard
        officer1={ officer1 }
        officer2={ officer2 }
        coaccusalCount={ 47 }
      />
    );
    findRenderedComponentWithType(instance, PairingChart);
    scryRenderedComponentsWithType(instance, OfficerInfo).should.have.length(2);
    const links = scryRenderedComponentsWithType(instance, Link);
    links[0].props.to.should.eql('/officer/123/');
    links[1].props.to.should.eql('/officer/456/');
  });

  it('should change state when hovered', function () {
    instance = renderIntoDocument(
      <PairingCard
        officer1={ officer1 }
        officer2={ officer2 }
        coaccusalCount={ 32 }
      />
    );
    const halfPanes = scryRenderedComponentsWithType(instance, HalfPane);
    const halfPane1 = findDOMNode(halfPanes[0]);
    const halfPane2 = findDOMNode(halfPanes[1]);

    Simulate.mouseOver(halfPane1);
    instance.state.hoveredPart.should.eql('left');
    Simulate.mouseOut(halfPane1);
    should(instance.state.hoveredPart).be.null();

    Simulate.mouseOver(halfPane2);
    instance.state.hoveredPart.should.eql('right');
    Simulate.mouseOut(halfPane2);
    should(instance.state.hoveredPart).be.null();
  });
});
