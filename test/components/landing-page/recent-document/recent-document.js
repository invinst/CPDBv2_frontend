import React from 'react';
import { stub } from 'sinon';

import { mountWithRouter } from 'utils/test';
import RecentDocument from 'components/landing-page/recent-document';
import DocumentCard from 'components/landing-page/recent-document/document-card';
import * as tracking from 'utils/tracking';


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
    const wrapper = mountWithRouter(
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
    const stubTrackAttachmentClick = stub(tracking, 'trackAttachmentClick');
    const data = [{
      'crid': '123456',
      'title': 'CR document 1',
      'incidentDate': 'Jan 1, 2010',
      'category': 'Conduct Unbecoming (Off- Duty)',
    }];
    const wrapper = mountWithRouter(
      <RecentDocument cards={ data } pathname='/' />
    );
    wrapper.find(DocumentCard).simulate('click');
    stubTrackAttachmentClick.should.be.calledWith(
      '/',
      '/complaint/123456/'
    );
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
    const wrapper = mountWithRouter(
      <RecentDocument cards={ data } pathname='/' onTrackingAttachment={ stubOnTrackingAttachment } />
    );
    wrapper.find(DocumentCard).simulate('click');
    stubOnTrackingAttachment.should.be.calledWith({
      attachmentId: '789',
      sourcePage: 'Landing Page',
      app: 'Frontend',
    });
  });
});
