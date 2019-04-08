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
    'incidentDate': 'Dec 31, 1999',
    'category': 'Operations/Personnel Violation',
  }, {
    'crid': '112',
    'title': 'CR document 3',
    'url': 'http://cr-document.com/3',
    'previewImageUrl': 'http://preview.com/url3',
    'incidentDate': 'Jan 1, 2010',
    'category': 'Conduct Unbecoming (Off- Duty)',
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
    recentDocumentCard1.textContent.should.containEql('Dec 31, 1999');
    recentDocumentCard1.textContent.should.containEql('Operations/Personnel Violation');
    const images = recentDocumentCard1.querySelectorAll('.document-card-thumbnail-img');

    images.length.should.eql(1);
    images[0].getAttribute('src').should.eql('http://preview.com/url');

    const recentDocumentCard2 = findDOMNode(recentDocumentCards[1]);
    recentDocumentCard2.textContent.should.containEql('Jan 1, 2010');
    recentDocumentCard2.textContent.should.containEql('Conduct Unbecoming (Off- Duty)');
    const images2 = recentDocumentCard2.querySelectorAll('.document-card-thumbnail-img');
    images2.should.have.length(1);
    images2[0].getAttribute('src').should.eql('http://preview.com/url3');
  });

  it('should track click event', function () {
    const stubTrackAttachmentClick = stub(GATracking, 'trackAttachmentClick');
    const data = [{
      'crid': '123456',
      'title': 'CR document 1',
      'incidentDate': 'Jan 1, 2010',
      'category': 'Conduct Unbecoming (Off- Duty)',
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

  it('should track attachment click event', function () {
    const stubOnTrackingAttachment = stub();
    const data = [{
      'crid': '123456',
      'title': 'CR document 1',
      'id': '789',
      'incidentDate': 'Jan 1, 2010',
      'category': 'Conduct Unbecoming (Off- Duty)',
    }];
    const recentDocument = () => (
      <RecentDocument cards={ data } pathname='/' onTrackingAttachment={ stubOnTrackingAttachment } />
    );
    instance = renderIntoDocument(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ recentDocument } />
      </Router>
    );
    Simulate.click(findDOMNode(findRenderedComponentWithType(instance, DocumentCard)));
    stubOnTrackingAttachment.should.be.calledWith({
      attachmentId: '789',
      sourcePage: 'Landing Page',
      app: 'Frontend'
    });
  });
});
