import React from 'react';
import { findRenderedComponentWithType } from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import { renderWithContext } from 'utils/test';
import SimpleTagsEditable from 'components/inline-editable/editable-section/simple-tag-editable';
import styles from 'components/inline-editable/editable-section/simple-tag-editable.sass';
import Editable from 'components/inline-editable/editable';


describe('SimpleTagsEditable component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render with given context', function () {
    const onChangeSpy = spy();
    instance = renderWithContext(
      {
        fieldContexts: {
          'tags': {
            editModeOn: true,
            value: ['tag1', 'tag2'],
            onChange: onChangeSpy,
          },
        },
      },
      <SimpleTagsEditable fieldName='tags'/>
    );

    const editable = findRenderedComponentWithType(instance, Editable);
    editable.props.editModeOn.should.be.true();

    editable.props.editorElement.props.value.should.eql(['tag1', 'tag2']);
    editable.props.editorElement.props.className.should.eql(styles.editableTagsinputInput);
    editable.props.editorElement.props.onChange.should.eql(onChangeSpy);
    editable.props.editorElement.props.inputProps.should.eql(
      { className: 'react-tagsinput-input', placeholder: 'Enter tags' }
    );
    editable.props.editorElement.props.onlyUnique.should.be.true();
    editable.props.editorElement.props.addKeys.should.eql([13, 188]);
    editable.props.editorElement.props.addOnBlur.should.be.true();

    editable.props.presenterElement.props.value.should.eql(['tag1', 'tag2']);
    editable.props.presenterElement.props.className.should.eql(styles.editableTagsinputInput);
    editable.props.presenterElement.props.inputProps.should.eql(
      { className: 'react-tagsinput-input', placeholder: '' }
    );
    editable.props.presenterElement.props.disabled.should.be.true();
  });
});
