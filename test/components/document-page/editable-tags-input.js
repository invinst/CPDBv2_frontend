import React from 'react';
import { shallow } from 'enzyme';

import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import SimpleTagsEditable from 'components/inline-editable/editable-section/simple-tag-editable';
import EditableTagsInput from 'components/document-page/editable-tags-input';


describe('EditableTagsInput component', function () {
  it('should render correctly', function () {
    const editWrapperStateProps = {
      fields: {
        tags: {
          type: 'array',
          key: 'tags',
          value: ['tag1', 'tag2'],
        },
      },
    };

    const wrapper = shallow(
      <EditableTagsInput
        className='editable-tags-input'
        title='Tags title'
        fieldName='tags'
        editWrapperStateProps={ editWrapperStateProps }
        nextDocumentId={ 12345 }
      />
    );

    const tagsTitle = wrapper.find('.editable-tags-title');
    tagsTitle.text().should.equal('Tags title');

    const editWrapperStateProvider = wrapper.find(EditWrapperStateProvider);
    editWrapperStateProvider.props().should.containEql(editWrapperStateProps);

    const hoverableEditWrapper = editWrapperStateProvider.find(HoverableEditWrapper);

    const simpleTagsEditable = hoverableEditWrapper.find(SimpleTagsEditable);
    simpleTagsEditable.prop('fieldName').should.equal('tags');

    const nextUntaggedDocumentButton = wrapper.find('.next-untagged-document-button');
    nextUntaggedDocumentButton.text().should.equal('Next untagged document');
    nextUntaggedDocumentButton.prop('href').should.containEql('/document/12345/');
  });

  it('should not render next untagged document button if there is no nextDocumentId', function () {
    const editWrapperStateProps = {
      fields: {
        tags: {
          type: 'array',
          key: 'tags',
          value: ['tag1', 'tag2'],
        },
      },
    };

    const wrapper = shallow(
      <EditableTagsInput
        className='editable-tags-input'
        title='Tags title'
        fieldName='tags'
        editWrapperStateProps={ editWrapperStateProps }
      />
    );

    wrapper.find('.next-untagged-document-button').exists().should.be.false();
  });

  it('should show error message(s) if there are errorMessages', function () {
    const editWrapperStateProps = {
      fields: {
        tags: {
          type: 'array',
          key: 'tags',
          value: ['tag1', 'tag2'],
        },
      },
    };

    const wrapper = shallow(
      <EditableTagsInput
        className='editable-tags-input'
        title='Tags title'
        fieldName='tags'
        editWrapperStateProps={ editWrapperStateProps }
        errorMessages={ ['This is error message 1.', 'This is error message 2.'] }
      />
    );
    const errorMessages = wrapper.find('.error-messages');
    errorMessages.text().should.equal('This is error message 1. This is error message 2.');
  });
});
