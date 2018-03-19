import React from 'react';
import { spy } from 'sinon';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test/index';
import SuggestedCards from 'components/search-page/search-no-input/suggested-cards';
import OfficerCard from 'components/landing-page/activity-grid/officer-card';


describe('SuggestedCards component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should request activity grid when there is no cards', function () {
    let spyRequestActivityGrid = spy();
    renderIntoDocument(
      <SuggestedCards cards={ [] } requestActivityGrid={ spyRequestActivityGrid }/>
    );

    spyRequestActivityGrid.calledOnce.should.be.true();
  });

  it('should render OfficerCards when there are cards', function () {
    instance = renderIntoDocument(
      <SuggestedCards cards={ ['one', 'two', 'three', 'four'] }/>
    );

    let cards = scryRenderedComponentsWithType(instance, OfficerCard);
    cards.should.have.length(4);
  });

  it('should should only background when cards has no percentiles ', () => {
    instance = renderIntoDocument(
      <SuggestedCards cards={ ['one', 'two', 'three', 'four'] }/>
    );
    const svg = scryRenderedDOMComponentsWithClass(instance, 'test--radar')[0];
    svg.getAttribute('style').should.eql('background-color: rgb(253, 250, 242);');
    svg.childNodes.should.have.length(0);
  });

  it('should render radar chart when cards has percentile', () => {
    const cards = [{
      percentile: {
        items: [
          { axis: 'a', value: 10 },
          { axis: 'b', value: 20 },
          { axis: 'c', value: 50 }
        ]
      }
    }];
    instance = renderIntoDocument(<SuggestedCards cards={ cards }/>);
    const svg = findRenderedDOMComponentWithClass(instance, 'test--radar');
    svg.getAttribute('style').should.eql('background-color: rgb(253, 250, 242);');
    findRenderedDOMComponentWithClass(instance, 'test--radar-radar-area');
  });
});
