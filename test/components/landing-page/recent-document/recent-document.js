import React from 'react';
import { Router, Route, createMemoryHistory } from 'react-router';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType,
  Simulate,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import RecentDocument from 'components/landing-page/recent-document';
import DocumentCard from 'components/landing-page/recent-document/document-card';
import * as GATracking from 'utils/google_analytics_tracking';


describe('Recent Document components', function () {
  let instance;
  let consoleStub;
  const data = [{
    'crid': '111',
    'title': 'CR document 1',
    'url': 'http://cr-document.com/1',
    'previewImageUrl': 'http://preview.com/url',
    'numDocuments': 2
  }, {
    'crid': '112',
    'title': 'CR document 3',
    'url': 'http://cr-document.com/3',
    'previewImageUrl': 'http://preview.com/url3',
    'numDocuments': 1
  }];

  beforeEach(function () {
    consoleStub = stub(console, 'error'); // suppress console.error `Carousel`
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
    consoleStub.restore();
  });

  it('should render appropriately', function () {
    instance = renderIntoDocument(
      <RecentDocument cards={ data } />
    );

    const recentDocumentCards = scryRenderedComponentsWithType(instance, DocumentCard);
    recentDocumentCards.should.have.length(2);
    const recentDocumentCard1 = findDOMNode(recentDocumentCards[0]);
    recentDocumentCard1.textContent.should.containEql('2 new attachments added to CR 111');
    const images = recentDocumentCard1.querySelectorAll('.document-card-thumbnail-img');

    images.length.should.eql(1);
    images[0].getAttribute('src').should.eql('http://preview.com/url');

    const recentDocumentCard2 = findDOMNode(recentDocumentCards[1]);
    recentDocumentCard2.textContent.should.containEql('1 new attachment added to CR 112');
    const images2 = recentDocumentCard2.querySelectorAll('.document-card-thumbnail-img');
    images2.should.have.length(1);
    images2[0].getAttribute('src').should.eql('http://preview.com/url3');
  });

  it('should track click event', function () {
    const stubTrackAttachmentClick = stub(GATracking, 'trackAttachmentClick');
    const data = [{
      'crid': '123456',
      'title': 'CR document 1',
      'numDocuments': 2,
    }];
    const recentDocument = () => (
      <RecentDocument cards={ data } pathname='/' />
    );
    instance = renderIntoDocument(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ recentDocument } />
      </Router>
    );
    Simulate.click(findDOMNode(findRenderedComponentWithType(instance, DocumentCard)));
    stubTrackAttachmentClick.should.be.calledWith(
      '/',
      '/complaint/123456/'
    );
    stubTrackAttachmentClick.restore();
  });
});
