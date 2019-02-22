import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { Link } from 'react-router';

import { slice, isUndefined } from 'lodash';

import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import styles from './document-page.sass';
import SimpleListWidget from './simple-list-widget';
import EditableTextBox from './editable-text-box';
import FooterContainer from 'containers/footer-container';



export default class DocumentPage extends Component {
  render() {
    const {
      title,
      fullText,
      url,
      previewImageUrl,
      crid,
      source,
      crawlerName,
      createdAt,
      downloadCount,
      viewCount,
      notificationCount,
      pageCount,
      linkedDocuments,
      lastEditedUser,
      lastEditedDateTime,
    } = this.props;

    const infoItems = [
      { name: 'CRID / UID', value: `CR ${ crid }`, to: `/complaint/${crid}/` },
      { name: 'Source', value: source, url: source },
      { name: 'Crawler', value: crawlerName },
      { name: 'Date', value: createdAt },
    ];

    if (!isUndefined(viewCount)) {
      infoItems.push({ name: 'Views', value: viewCount.toLocaleString() });
    }
    if (!isUndefined(downloadCount)) {
      infoItems.push({ name: 'Downloads', value: downloadCount.toLocaleString() });
    }
    if (!isUndefined(notificationCount)) {
      infoItems.push({ name: 'Notifications', value: notificationCount.toLocaleString() });
    }

    const displayedDocuments = slice(linkedDocuments, 0, 11);
    const restDocumentsCount = linkedDocuments.length - displayedDocuments.length;

    return (
      <DocumentMeta title={ title } description={ title }>
        <div className={ styles.documentPage }>
          <ShareableHeaderContainer shouldDisplayButton={ false }/>
          <div className='document-wrapper'>
            <div className='document-side-bar'>
              <a className='document-thumbnail' href={ url }>
                <img src={ previewImageUrl }/>
                <span className='document-thumbnail-page-count'>{ pageCount.toLocaleString() } pages</span>
              </a>
              <div className='document-vote'/>
              <SimpleListWidget className='document-info' items={ infoItems }/>
              <div className='linked-documents'>
                <div className='linked-documents-title'>Linked Documents ({ linkedDocuments.length })</div>
                {
                  displayedDocuments.map(document => (
                    <Link key={ document.id } className='linked-documents-thumbnail' to={ `/document/${document.id}/` }>
                      <img src={ document.previewImageUrl } width='40'/>
                    </Link>
                  ))
                }
                {
                  restDocumentsCount > 0 ? (
                    <span className='linked-documents-thumbnail linked-documents-more'>+{ restDocumentsCount }</span>
                  ) : null
                }
              </div>
            </div>
            <div className='main-section'>
              <EditableTextBox className='main-section-title' title='Document Title' text={ title }/>
              <EditableTextBox
                className='main-section-full-text' title='Full-text OCR' text={ fullText } multiline={ true }
              />
              <div className='main-section-last-edited'>
                This document was last edited { lastEditedUser ? 'by' : ''}
                <span className='last-edited-highlight'> { lastEditedUser } { lastEditedDateTime }</span>
              </div>
            </div>
          </div>
          <FooterContainer className={ styles.crPageFooter }/>
        </div>
      </DocumentMeta>
    );
  }
}

DocumentPage.propTypes = {
  attachmentId: PropTypes.number,
  title: PropTypes.string,
  fullText: PropTypes.string,
  comment: PropTypes.string,
  url: PropTypes.string,
  previewImageUrl: PropTypes.string,
  crid: PropTypes.string,
  source: PropTypes.string,
  crawlerName: PropTypes.string,
  createdAt: PropTypes.string,
  downloadCount: PropTypes.number,
  viewCount: PropTypes.number,
  notificationCount: PropTypes.number,
  pageCount: PropTypes.number,
  linkedDocuments: PropTypes.array,
  lastEditedUser: PropTypes.string,
  lastEditedDateTime: PropTypes.string,
};

DocumentPage.contextTypes = {
  printMode: PropTypes.bool,
};
