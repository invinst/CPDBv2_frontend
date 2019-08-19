import React from 'react';

import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import SimpleTagsEditable from 'components/inline-editable/editable-section/simple-tag-editable';
import EditableTagsInput from 'components/document-page/editable-tags-input';


describe('EditableTagsInput component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    const editWrapperStateProps = {
      fields: {
        tags: {
          type: 'array',
          key: 'tags',
          value: ['tag1', 'tag2']
        },
      }
    };

    instance = renderIntoDocument(
      <EditableTagsInput
        className='editable-tags-input'
        title='Tags title'
        fieldName='tags'
        editWrapperStateProps={ editWrapperStateProps }
      />
    );

    const tagsTitle = findRenderedDOMComponentWithClass(instance, 'editable-tags-title');
    tagsTitle.textContent.should.eql('Tags title');

    const editWrapperStateProvider = findRenderedComponentWithType(instance, EditWrapperStateProvider);
    editWrapperStateProvider.props.should.containEql(editWrapperStateProps);

    const hoverableEditWrapper = findRenderedComponentWithType(editWrapperStateProvider, HoverableEditWrapper);

    const simpleTagsEditable = findRenderedComponentWithType(hoverableEditWrapper, SimpleTagsEditable);
    simpleTagsEditable.props.fieldName.should.eql('tags');
  });

  it('should show error message(s) if there are errorMessages', function () {
    const editWrapperStateProps = {
      fields: {
        tags: {
          type: 'array',
          key: 'tags',
          value: ['tag1', 'tag2']
        },
      }
    };

    instance = renderIntoDocument(
      <EditableTagsInput
        className='editable-tags-input'
        title='Tags title'
        fieldName='tags'
        editWrapperStateProps={ editWrapperStateProps }
        errorMessages={ ['This is error message 1.', 'This is error message 2.'] }
      />
    );
    const errorMessages = findRenderedDOMComponentWithClass(instance, 'error-messages');
    errorMessages.textContent.should.eql('This is error message 1. This is error message 2.');
  });
});
