import React from 'react';
import { shallow } from 'enzyme';

import PrintAttachments from 'components/cr-page/attachments/print-attachments';


describe('PrintAttachments component', function () {
  it('should render if items is not empty', function () {
    const items = [
      {
        title: 'Audio Clip',
        url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/263786121',
        previewImageUrl: 'lvh.me',
        fileType: 'audio',
      },
      {
        title: 'Audio Clip',
        url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/263786121',
        previewImageUrl: 'lvh.me',
        fileType: 'audio',
      },
      {
        title: 'Video Clip',
        url: 'https://player.vimeo.com/video/166377991',
        previewImageUrl: 'lvh.me',
        fileType: 'video',
      },
      {
        title: 'Document',
        url: 'https://www.documentcloud.org/documents/3108640/CRID-1078616-TRR-Rialmo.pdf',
        previewImageUrl: 'lvh.me',
        fileType: 'document',
      },
      {
        title: 'Document',
        url: 'https://www.documentcloud.org/documents/3108640/CRID-1078616-TRR-Rialmo.pdf',
        previewImageUrl: 'lvh.me',
        fileType: 'document',
      },
      {
        title: 'Document',
        url: 'https://www.documentcloud.org/documents/3108640/CRID-1078616-TRR-Rialmo.pdf',
        previewImageUrl: 'lvh.me',
        fileType: 'document',
      },
    ];
    const wrapper = shallow(<PrintAttachments items={ items }/>);
    wrapper.find('.attachments-content').should.have.length(1);
    const attachmentTypes = wrapper.find('.attachment-type');
    attachmentTypes.should.have.length(3);
    attachmentTypes.at(0).text().should.equal('Audio (2)');
    attachmentTypes.at(1).text().should.equal('Video (1)');
    attachmentTypes.at(2).text().should.equal('Document (3)');
  });

  it('should render nothing if items is empty', function () {
    const wrapper = shallow(<PrintAttachments items={ [] }/>);
    wrapper.find('.attachments-content').should.have.length(0);
  });
});
