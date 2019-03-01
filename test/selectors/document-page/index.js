import { getTitleEditModeOn, getTextContentEditModeOn, documentSelector } from 'selectors/document-page';


describe('Document selectors', function () {
  describe('getTitleEditModeOn', function () {
    it('should return correct result', function () {
      getTitleEditModeOn({
        documentPage: {
          titleEditModeOn: true,
        }
      }).should.eql(true);
    });
  });

  describe('getTextContentEditModeOn', function () {
    it('should return correct result', function () {
      getTextContentEditModeOn({
        documentPage: {
          textContentEditModeOn: true,
        }
      }).should.eql(true);
    });
  });

  describe('documentSelector', function () {
    const state = {
      documentPage: {
        isRequesting: false,
        data: {
          'id': 14193,
          'crid': '1083633',
          'title': 'CRID 1083633 CR CRID 1083633 CR Tactical Response Report 2 (Glim)',
          'text_content': 'TACTICAL RESPONSE Police Department\n1. DATE OF INCIDENT TIME 2. ADDRESS OF OCCURRENCE',
          'url': 'https://assets.documentcloud.org/documents/5680384/CRID-1083633-CR-CRID-1083633-CR-Tactical.pdf',
          'preview_image_url': 'https://assets.documentcloud.org/documents/5680384/pages/CRID-1083633.gif',
          'original_url': 'https://www.chicagocopa.org/wp-content/uploads/2017/03/TRR-HOSPITAL-REDACTED.pdf',
          'created_at': '2019-01-09T03:11:27.441718-06:00',
          'updated_at': '2019-02-28T20:50:10.161395-06:00',
          'crawler_name': 'Chicago COPA',
          'linked_documents': [{
            'id': 14192,
            'preview_image_url': 'https://assets.documentcloud.org/documents/5680385/pages/CRID-1083633.gif'
          }, {
            'id': 14188,
            'preview_image_url': 'https://assets.documentcloud.org/documents/5680389/pages/CRID-1083633.gif'
          }],
          'pages': 5,
          'last_updated_by': 'John Doe',
          'views_count': 1000,
          'downloads_count': 100,
          'notifications_count': 10,
        },
        titleEditModeOn: false,
        textContentEditModeOn: false
      },
    };
    it('should return correct result', function () {
      documentSelector(state).should.eql({
        attachmentId: 14193,
        title: 'CRID 1083633 CR CRID 1083633 CR Tactical Response Report 2 (Glim)',
        fullText: 'TACTICAL RESPONSE Police Department\n1. DATE OF INCIDENT TIME 2. ADDRESS OF OCCURRENCE',
        url: 'https://assets.documentcloud.org/documents/5680384/CRID-1083633-CR-CRID-1083633-CR-Tactical.pdf',
        previewImageUrl: 'https://assets.documentcloud.org/documents/5680384/pages/CRID-1083633.gif',
        crid: '1083633',
        source: 'https://www.chicagocopa.org/wp-content/uploads/2017/03/TRR-HOSPITAL-REDACTED.pdf',
        crawlerName: 'Chicago COPA',
        downloadCount: 100,
        viewCount: 1000,
        notificationCount: 10,
        pageCount: 5,
        lastUpdatedBy: 'John Doe',
        createdAt: 'Jan 9, 2019',
        linkedDocuments: [{
          id: 14192,
          previewImageUrl: 'https://assets.documentcloud.org/documents/5680385/pages/CRID-1083633.gif'
        }, {
          id: 14188,
          previewImageUrl: 'https://assets.documentcloud.org/documents/5680389/pages/CRID-1083633.gif'
        }],
        lastEditedDateTime: 'at 09:50AM on Mar 1, 2019',
      });
    });
  });
});
