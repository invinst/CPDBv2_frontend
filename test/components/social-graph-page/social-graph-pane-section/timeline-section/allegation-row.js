import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import AllegationRow from 'components/social-graph-page/social-graph-pane-section/timeline-section/allegation-row';


describe('AllegationRow component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render allegation correctly', function () {
    const allegation = {
      crid: 123,
      incidentDate: '1988-10-03',
      category: 'Use of Force',
      subcategory: 'Miscellaneous'
    };
    instance = renderIntoDocument(<AllegationRow allegation={ allegation }/>);
    findRenderedDOMComponentWithClass(instance, 'allegation-crid').textContent.should.eql('123');
    findRenderedDOMComponentWithClass(instance, 'allegation-incident-date').textContent.should.eql('1988-10-03');
    findRenderedDOMComponentWithClass(instance, 'allegation-category').textContent.should.eql('Use of Force');
    findRenderedDOMComponentWithClass(instance, 'allegation-subcategory').textContent.should.eql('Miscellaneous');
  });
});
