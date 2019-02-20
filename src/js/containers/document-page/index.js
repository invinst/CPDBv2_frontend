import { connect } from 'react-redux';

import DocumentPage from 'components/document-page';


function mapStateToProps(state, ownProps) {
  return {
    attachmentId: '123',
    title: 'CRID 1083050 CR Tactical Response Report',
    fullText: 'In the tumultuous business of cutting-in and attending to a whale, there is much running backwards ' +
      'and forwards among the crew. Now hands are wanted here, and then again hands are wanted there.',
    url: 'https://assets.documentcloud.org/documents/3467597/CRID-1018786-CR.pdf',
    previewImageUrl: 'https://via.placeholder.com/200x200',
    crid: '299780',
    source: 'https://www.chicago.com',
    crawlerName: 'pikachu',
    createdAt: 'Nov 13, 2018',
    downloadCount: 2091,
    viewCount: 13102,
    notificationCount: 108,
    pageCount: 13,
    linkedDocuments: [
      { id: 1, previewImageUrl: 'https://via.placeholder.com/40x58.png' },
      { id: 2, previewImageUrl: 'https://via.placeholder.com/40x58.png' },
      { id: 3, previewImageUrl: 'https://via.placeholder.com/40x58.png' },
      { id: 4, previewImageUrl: 'https://via.placeholder.com/40x58.png' },
      { id: 5, previewImageUrl: 'https://via.placeholder.com/40x58.png' },
      { id: 6, previewImageUrl: 'https://via.placeholder.com/40x58.png' },
      { id: 7, previewImageUrl: 'https://via.placeholder.com/40x58.png' },
      { id: 8, previewImageUrl: 'https://via.placeholder.com/40x58.png' },
      { id: 9, previewImageUrl: 'https://via.placeholder.com/40x58.png' },
      { id: 10, previewImageUrl: 'https://via.placeholder.com/40x58.png' },
      { id: 11, previewImageUrl: 'https://via.placeholder.com/40x58.png' },
      { id: 12, previewImageUrl: 'https://via.placeholder.com/40x58.png' },
      { id: 13, previewImageUrl: 'https://via.placeholder.com/40x58.png' },
    ],
    lastEditedUser: 'jone.doe',
    lastEditedDateTime: '12:00AM Dec 21, 2018',
  };
}

const mapDispatchToProps = {
};

// const editWrapperStateProps = (stateProps, dispatchProps, ownProps) => {
//   return {};
// };

export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);
