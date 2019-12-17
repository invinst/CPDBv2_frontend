import React from 'react';
import { mount } from 'enzyme';
import { Router, Route, createMemoryHistory } from 'react-router';
import { stub } from 'sinon';

import RecentDocument from 'components/landing-page/recent-document';
import DocumentCard from 'components/landing-page/recent-document/document-card';
import * as GATracking from 'utils/google_analytics_tracking';


describe('Recent Document components', function () {
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

  it('should render appropriately', function () {
    const wrapper = mount(
      <RecentDocument cards={ data } />
    );

    const recentDocumentCards = wrapper.find(DocumentCard);
    recentDocumentCards.should.have.length(2);
    const recentDocumentCard1 = recentDocumentCards.at(0);
    recentDocumentCard1.text().should.containEql('Dec 31, 1999');
    recentDocumentCard1.text().should.containEql('Operations/Personnel Violation');
    const images = recentDocumentCard1.find('.document-card-thumbnail-img');
    images.prop('src').should.eql('http://preview.com/url');

    const recentDocumentCard2 = recentDocumentCards.at(1);
    recentDocumentCard2.text().should.containEql('Jan 1, 2010');
    recentDocumentCard2.text().should.containEql('Conduct Unbecoming (Off- Duty)');
    const images2 = recentDocumentCard2.find('.document-card-thumbnail-img');
    images2.prop('src').should.eql('http://preview.com/url3');
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
    const wrapper = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ recentDocument } />
      </Router>
    );
    wrapper.find(DocumentCard).simulate('click');
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
    const wrapper = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ recentDocument } />
      </Router>
    );
    wrapper.find(DocumentCard).simulate('click');
    stubOnTrackingAttachment.should.be.calledWith({
      attachmentId: '789',
      sourcePage: 'Landing Page',
      app: 'Frontend',
    });
  });
});
