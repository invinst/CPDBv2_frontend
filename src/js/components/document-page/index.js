import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { Link } from 'react-router';
import pluralize from 'pluralize';

import { slice } from 'lodash';

import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import styles from './document-page.sass';
import SimpleListWidget from './simple-list-widget';
import EditableTextBox from './editable-text-box';
import FooterContainer from 'containers/footer-container';
import { SHAREABLE_HEADER_BUTTON_TYPE } from 'utils/constants';


export default class DocumentPage extends Component {
  render() {
    const {
      title,
      url,
      previewImageUrl,
      pageCount,
      crid,
      linkedDocuments,
      lastUpdatedBy,
      lastEditedDateTime,
      titleEditWrapperStateProps,
      textContentEditWrapperStateProps,
      isSignedIn,
      infoItems,
    } = this.props;

    const displayedDocuments = slice(linkedDocuments, 0, 11);
    const restDocumentsCount = linkedDocuments.length - displayedDocuments.length;

    return (
      <DocumentMeta title={ title } description={ title }>
        <div className={ styles.documentPage }>
          <ShareableHeaderContainer buttonType={ SHAREABLE_HEADER_BUTTON_TYPE.NONE } />
          <div className='document-wrapper'>
            <div className='document-side-bar'>
              <a className='document-thumbnail' href={ url }>
                <img className='document-thumbnail-img' src={ previewImageUrl } alt='thumbnail' />
                {
                  pageCount !== 0 ? (
                    <span className='document-thumbnail-page-count'>{ `${ pluralize('page', pageCount, true) }` }</span>
                  ) : null
                }
              </a>
              <SimpleListWidget className='document-info' items={ infoItems } />
              <div className='linked-documents'>
                <div className='linked-documents-title'>Linked Documents ({ linkedDocuments.length })</div>
                <Link
                  className='linked-documents-content'
                  to={ isSignedIn ? `/documents/crid/${ crid }/` : `/documents/?match=${ crid }/` }
                >
                  {
                    displayedDocuments.map(document => (
                      <div key={ document.id } className='linked-documents-thumbnail'>
                        <img
                          className='linked-documents-thumbnail-img'
                          src={ document.previewImageUrl }
                          width='40'
                        />
                      </div>
                    ))
                  }
                  {
                    restDocumentsCount > 0 ? (
                      <span className='linked-documents-thumbnail linked-documents-more'>+{ restDocumentsCount }</span>
                    ) : null
                  }
                </Link>
              </div>
            </div>
            <div className='main-section'>
              <EditableTextBox
                className='main-section-title'
                title='Document Title'
                fieldName='title'
                editWrapperStateProps={ titleEditWrapperStateProps }
              />
              <EditableTextBox
                className='main-section-full-text'
                title='Full-text OCR'
                fieldName='textContent'
                multiline={ true }
                editWrapperStateProps={ textContentEditWrapperStateProps }
              />
              <div className='main-section-last-edited'>
                This document was last edited{ lastUpdatedBy ? ' by ' : '' }
                <span className='last-edited-highlight'>{ lastUpdatedBy } { lastEditedDateTime }</span>
              </div>
            </div>
          </div>
          <FooterContainer className={ styles.crPageFooter } />
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
  pageCount: PropTypes.number,
  linkedDocuments: PropTypes.array,
  lastUpdatedBy: PropTypes.string,
  lastEditedDateTime: PropTypes.string,
  titleEditWrapperStateProps: PropTypes.object,
  textContentEditWrapperStateProps: PropTypes.object,
  isSignedIn: PropTypes.bool,
  infoItems: PropTypes.array,
};
