import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Header from 'components/pinboard-page/header';


describe('Pinboard Header component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(<Header />);

    const anchors = scryRenderedDOMComponentsWithTag(instance, 'a');
    anchors.should.have.length(5);
    anchors[0].textContent.should.eql('cpdp');
    anchors[1].textContent.should.eql('Data');
    anchors[2].textContent.should.eql('Q&A');
    anchors[3].textContent.should.eql('Documents');
    anchors[4].textContent.should.eql('Pinboard');
  });

  it('should highlight correct item', function () {
    instance = renderIntoDocument(<Header choice='Data' />);

    const highlightAnchor = findRenderedDOMComponentWithClass(instance, 'highlight');
    highlightAnchor.textContent.should.eql('Data');
  });
});
