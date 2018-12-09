import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { spy } from 'sinon';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import TRRDocument from 'components/trr-page/trr-info-section/trr-document';
import RequestDocumentButton from 'components/common/request-document-button';
import { RawContentStateFactory } from 'utils/test/factories/draft';


describe('Row component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render no document title and RequestDocumentButton', function () {
    const noAttachmentTextEditWrapperStateProps = {
      fields: {
        'no_attachment_text': {
          type: 'rich_text',
          name: 'no_attachment_text',
          value: RawContentStateFactory.build(
            {}, { blockTexts: ['There are no documents that have been made public yet.'] }
          )
        }
      },
      sectionEditModeOn: false,
      onSaveForm: spy(),
      turnOnSectionEditMode: spy(),
      turnOffSectionEditMode: spy()
    };
    const openRequestTRRDocumentModal = spy();
    instance = renderIntoDocument(
      <TRRDocument
        alreadyRequested={ true }
        openRequestTRRDocumentModal={ openRequestTRRDocumentModal }
        noAttachmentTextEditWrapperStateProps={ noAttachmentTextEditWrapperStateProps }
      />
    );

    findRenderedDOMComponentWithClass(instance, 'trr-document-text').textContent.should.eql(
      'There are no documents that have been made public yet.'
    );

    const requestDocumentButton = findRenderedComponentWithType(instance, RequestDocumentButton);
    requestDocumentButton.props.alreadyRequested.should.be.true();
    requestDocumentButton.props.openRequestDocumentModal.should.eql(openRequestTRRDocumentModal);
  });

  it('should hide when printing', function () {
    instance = renderIntoDocument(<TRRDocument alreadyRequested={ true }/>);
    findDOMNode(instance).className.should.containEql('no-print');
  });
});
