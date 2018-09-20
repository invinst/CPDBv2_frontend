import React from 'react';
import { Router, Route, createMemoryHistory } from 'react-router';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  findRenderedDOMComponentWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import ComplaintCard from 'components/cr-page/related-complaints/complaint-card';
import * as GATracking from 'utils/google_analytics_tracking';


describe('ComplaintCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  describe('complainant section', function () {
    it('should not render complainant carousel when there is no data', function () {
      instance = renderIntoDocument(<ComplaintCard />);
      scryRenderedDOMComponentsWithClass(instance, 'test--carousel-complainant').should.have.length(0);
    });

    it('should render complainant carousel if complainant prop is provided', function () {
      instance = renderIntoDocument(<ComplaintCard complainants='R. Rose' />);
      scryRenderedDOMComponentsWithClass(instance, 'test--carousel-complainant').should.have.length(1);
    });

    it('should track click event', function () {
      const stubTrackRelatedByCategoryClick = stub(GATracking, 'trackRelatedByCategoryClick');
      const complaintCard = () => (
        <ComplaintCard
          complainants='R. Rose'
          sourceCRID='01234'
          crid='56789'
          match='categories'
        />
      );
      instance = renderIntoDocument(
        <Router history={ createMemoryHistory() }>
          <Route path='/' component={ complaintCard } />
        </Router>
      );
      Simulate.click(findRenderedDOMComponentWithClass(instance, 'test--carousel-card'));
      stubTrackRelatedByCategoryClick.should.be.calledWith('01234', '56789');

      stubTrackRelatedByCategoryClick.restore();
    });
  });

  describe('accused section', function () {
    it('should not render complainant carousel when there is no data', function () {
      instance = renderIntoDocument(<ComplaintCard />);
      scryRenderedDOMComponentsWithClass(instance, 'test--carousel-accused').should.have.length(0);
    });

    it('should render accused carousel if accused prop is provided', function () {
      instance = renderIntoDocument(<ComplaintCard accused='B. Bolton' />);
      scryRenderedDOMComponentsWithClass(instance, 'test--carousel-accused').should.have.length(1);
    });

    it('should track click event', function () {
      const stubTrackRelatedByAccusedClick = stub(GATracking, 'trackRelatedByAccusedClick');
      const complaintCard = () => (
        <ComplaintCard
          complainants='R. Rose'
          sourceCRID='01234'
          crid='56789'
          match='officers'
        />
      );
      instance = renderIntoDocument(
        <Router history={ createMemoryHistory() }>
          <Route path='/' component={ complaintCard } />
        </Router>
      );
      Simulate.click(findRenderedDOMComponentWithClass(instance, 'test--carousel-card'));
      stubTrackRelatedByAccusedClick.should.be.calledWith('01234', '56789');

      stubTrackRelatedByAccusedClick.restore();
    });
  });
});
