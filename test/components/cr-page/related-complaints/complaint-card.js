import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import ComplaintCard from 'components/cr-page/related-complaints/complaint-card';


describe('ComplaintCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  describe('complainant section', function () {
    it('should not render when there is no data', function () {
      instance = renderIntoDocument(<ComplaintCard />);
      scryRenderedDOMComponentsWithClass(instance, 'test--carousel-card-complainant').should.have.length(0);
    });

    it('should render if there are some', function () {
      instance = renderIntoDocument(<ComplaintCard complainants='R. Rose' />);
      scryRenderedDOMComponentsWithClass(instance, 'test--carousel-card-complainant').should.have.length(1);
    });
  });

  describe('accused section', function () {
    it('should not render when there is no data', function () {
      instance = renderIntoDocument(<ComplaintCard />);
      scryRenderedDOMComponentsWithClass(instance, 'test--carousel-card-accused').should.have.length(0);
    });

    it('should render if there are some', function () {
      instance = renderIntoDocument(<ComplaintCard accused='B. Bolton' />);
      scryRenderedDOMComponentsWithClass(instance, 'test--carousel-card-accused').should.have.length(1);
    });
  });
});
