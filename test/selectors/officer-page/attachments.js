import {
  attachmentsComplaintTransform,
  getComplaintsWithAttachments,
} from 'selectors/officer-page/attachments.js';

describe('Officer attachments selectors', function () {
  const complaint = {
    category: 'CR',
    coaccused: 9,
    crid: '303350',
    date: '2005-01-27',
    finding: 'Unfounded',
    kind: 'CR',
    outcome: 'No Action Taken',
    rank: 'Police Officer',
    subcategory: 'Unnecessary Display Of Weapon / Off Duty',
    'unit_description': 'Mobile Strike Force',
    'unit_name': '153',
    attachments: [
      {
        title: 'CRID 1004717 CR',
        url: 'https://www.documentcloud.org/documents/3518956-CRID-1004717-CR.html',
        'preview_image_url': 'https://assets.documentcloud.org/documents/3518956/pages/CRID-1004717-CR-p1.gif',
        'file_type': 'document',
      },
      {
        title: 'CRID 303350 CR',
        url: 'https://www.documentcloud.org/documents/3518955-CRID-303350-CR.html',
        'preview_image_url': 'https://assets.documentcloud.org/documents/3518955/pages/CRID-303350-CR-p1.gif',
        'file_type': 'document',
      },
    ],
  };

  const result = {
    date: 'JAN 27, 2005',
    category: 'CR',
    crid: '303350',
    coaccused: 9,
    finding: 'Unfounded',
    outcome: 'No Action Taken',
    attachments: [
      {
        title: 'CRID 1004717 CR',
        url: 'https://www.documentcloud.org/documents/3518956-CRID-1004717-CR.html',
        previewImageUrl: 'https://assets.documentcloud.org/documents/3518956/pages/CRID-1004717-CR-p1.gif',
        fileType: 'document',
      },
      {
        title: 'CRID 303350 CR',
        url: 'https://www.documentcloud.org/documents/3518955-CRID-303350-CR.html',
        previewImageUrl: 'https://assets.documentcloud.org/documents/3518955/pages/CRID-303350-CR-p1.gif',
        fileType: 'document',
      },
    ],
  };

  describe('attachmentsComplaintTransform', function () {
    it('should return correct result', function () {
      attachmentsComplaintTransform(complaint).should.eql(result);
    });
  });

  describe('getComplaintsWithAttachments', function () {
    it('should return correct result', function () {
      const complaintWithoutAttachment = {
        category: 'CR',
        coaccused: 8,
        crid: '303345',
        date: '2005-01-27',
        finding: 'Unfounded',
        kind: 'CR',
        outcome: 'No Action Taken',
        rank: 'Police Officer',
        subcategory: 'Unnecessary Display Of Weapon / Off Duty',
        'unit_description': 'Mobile Strike Force',
        'unit_name': '153',
      };

      const state = {
        officerPage: {
          newTimeline: {
            items: [complaint, complaintWithoutAttachment],
          },
        },
      };

      getComplaintsWithAttachments(state).should.eql([result]);
    });
  });
});
