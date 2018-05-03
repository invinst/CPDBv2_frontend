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
    it('should not render complainant carousel when there is no data', function () {
      instance = renderIntoDocument(<ComplaintCard />);
      scryRenderedDOMComponentsWithClass(instance, 'test--carousel-complainant').should.have.length(0);
    });

    it('should render complainant carousel if complainant prop is provided', function () {
      instance = renderIntoDocument(<ComplaintCard complainants='R. Rose' />);
      scryRenderedDOMComponentsWithClass(instance, 'test--carousel-complainant').should.have.length(1);
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
  });
});
