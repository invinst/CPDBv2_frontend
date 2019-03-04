import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  Simulate
} from 'react-addons-test-utils';
import { spy } from 'sinon';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import CRLink from 'components/documents-overview-page/document-row/cr-link';


describe('DocumentsOverviewPage CRLink component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correct crid and documentsCount as given props', function () {
    instance = renderIntoDocument(
      <CRLink crid={ '1000000' } documentsCount={ 2 }/>
    );

    findRenderedDOMComponentWithClass(instance, 'document-crid').textContent.should.eql('CR 1000000');
    findRenderedDOMComponentWithClass(instance, 'documents-count').textContent.should.eql('2 documents');
  });

  it('should call onCRLinkClick when clicked on', function () {
    const onCRLinkClick = spy();
    instance = renderIntoDocument(
      <CRLink crid={ '1000000' } onCRLinkClick={ onCRLinkClick }/>
    );

    const span = findDOMNode(instance);
    Simulate.click(span);
    onCRLinkClick.calledWith('1000000').should.be.true();
  });
});
