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

  describe('Content', function () {
    it('should only render crid and categories when there is no extra data', function () {
      instance = renderIntoDocument(<ComplaintCard crid='10799008' categories='Use Of Force'/>);
      const sections = scryRenderedDOMComponentsWithClass(instance, 'section');

      sections.should.have.length(1);
      sections[0].textContent.should.containEql('10799008');
      sections[0].textContent.should.containEql('Use Of Force');
    });

    it('should render enough content', function () {
      instance = renderIntoDocument(
        <ComplaintCard
          crid='10799008'
          categories='Use Of Force'
          incidentDate='Oct 7, 2008'
          complainants='R. Rose'
          accused='B. Bolton'
        />
      );
      const sections = scryRenderedDOMComponentsWithClass(instance, 'section');

      sections.should.have.length(3);
      sections[0].textContent.should.containEql('10799008').and.containEql('Oct 7, 2008');
      sections[0].textContent.should.containEql('Use Of Force');
      sections[1].textContent.should.containEql('Complainant');
      sections[1].textContent.should.containEql('R. Rose');
      sections[2].textContent.should.containEql('Accused');
      sections[2].textContent.should.containEql('B. Bolton');
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

      Simulate.click(findRenderedDOMComponentWithClass(instance, 'content'));
      stubTrackRelatedByCategoryClick.should.be.calledWith('01234', '56789');

      stubTrackRelatedByCategoryClick.restore();
    });
  });
});
