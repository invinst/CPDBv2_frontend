const unauthenticatedData = {
  'id': 1,
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
    'preview_image_url': 'https://assets.documentcloud.org/documents/5680385/pages/CRID-1083633.gif',
  }, {
    'id': 14188,
    'preview_image_url': 'https://assets.documentcloud.org/documents/5680389/pages/CRID-1083633.gif',
  }],
  'tags': ['hospital', 'tactical'],
  'pages': 5,
  'last_updated_by': 'John Doe',
};

export default (authenticated) => {
  if (authenticated)
    return {
      ...unauthenticatedData,
      'views_count': 1000,
      'downloads_count': 100,
      'notifications_count': 10,
      'next_document_id': 2,
    };
  return unauthenticatedData;
};

