const updateTagParams = (tags = []) => ({
  'id': 1,
  'title': 'CRID 1083633 CR CRID 1083633 CR Tactical Response Report 2 (Glim)',
  'tags': tags,
});

const updateParamsFailure = {
  'id': 1,
  'title': 'CRID 1083633 CR CRID 1083633 CR Tactical Response Report 2 (Glim)',
  'tags': ['hospital', 'tactical', 'This is a tag with more than 20 characters'],
};

const updatedDocumentTagData = (tags = []) => ({
  'id': 1,
  'crid': '1083633',
  'url': 'https://assets.documentcloud.org/documents/5680384/CRID-1083633-CR-CRID-1083633-CR-Tactical.pdf',
  'preview_image_url': 'https://assets.documentcloud.org/documents/5680384/pages/CRID-1083633.gif',
  'original_url': 'https://www.chicagocopa.org/wp-content/uploads/2017/03/TRR-HOSPITAL-REDACTED.pdf',
  'created_at': '2019-01-09T03:11:27.441718-06:00',
  'updated_at': '2019-02-28T20:50:10.161395-06:00',
  'crawler_name': 'Chicago COPA',
  'linked_documents': [{
    'id': 14192,
    'preview_image_url': 'https://assets.documentcloud.org/documents/5680385/pages/CRID-1083633.gif',
  }, {
    'id': 14188,
    'preview_image_url': 'https://assets.documentcloud.org/documents/5680389/pages/CRID-1083633.gif',
  }],
  'pages': 5,
  'last_updated_by': 'John Doe',
  'views_count': 1000,
  'downloads_count': 100,
  'notifications_count': 10,
  ...updateTagParams(tags),
});

const updatedDocumentDataFailure = {
  message: {
    tags: ['Ensure this field has no more than 20 characters.'],
  },
};

export default {
  success: {
    updateTagParams: updateTagParams,
    updatedDocumentTagData: updatedDocumentTagData,
  },
  failure: {
    updateParamsFailure: updateParamsFailure,
    updatedDocumentDataFailure: updatedDocumentDataFailure,
  },
};
