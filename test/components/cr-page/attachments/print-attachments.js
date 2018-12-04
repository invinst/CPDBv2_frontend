import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import PrintAttachments from 'components/cr-page/attachments/print-attachments';


describe('PrintAttachments component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render if items is not empty', function () {
    const items = [
      {
        title: 'Audio Clip',
        url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/263786121',
        previewImageUrl: 'lvh.me',
        fileType: 'audio'
      },
      {
        title: 'Audio Clip',
        url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/263786121',
        previewImageUrl: 'lvh.me',
        fileType: 'audio'
      },
      {
        title: 'Video Clip',
        url: 'https://player.vimeo.com/video/166377991',
        previewImageUrl: 'lvh.me',
        fileType: 'video'
      },
      {
        title: 'Document',
        url: 'https://www.documentcloud.org/documents/3108640/CRID-1078616-TRR-Rialmo.pdf',
        previewImageUrl: 'lvh.me',
        fileType: 'document'
      },
      {
        title: 'Document',
        url: 'https://www.documentcloud.org/documents/3108640/CRID-1078616-TRR-Rialmo.pdf',
        previewImageUrl: 'lvh.me',
        fileType: 'document'
      },
      {
        title: 'Document',
        url: 'https://www.documentcloud.org/documents/3108640/CRID-1078616-TRR-Rialmo.pdf',
        previewImageUrl: 'lvh.me',
        fileType: 'document'
      }
    ];
    instance = renderIntoDocument(<PrintAttachments items={ items }/>);
    scryRenderedDOMComponentsWithClass(instance, 'attachments-content').should.have.length(1);
    const attachmentTypes = scryRenderedDOMComponentsWithClass(instance, 'attachment-type');
    attachmentTypes.should.have.length(3);
    attachmentTypes[0].textContent.should.eql('Audio (2)');
    attachmentTypes[1].textContent.should.eql('Video (1)');
    attachmentTypes[2].textContent.should.eql('Document (3)');
  });

  it('should render nothing if items is empty', function () {
    instance = renderIntoDocument(<PrintAttachments items={ [] }/>);
    scryRenderedDOMComponentsWithClass(instance, 'attachments-content').should.have.length(0);
  });
});
