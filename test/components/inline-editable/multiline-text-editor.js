import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { EditorState, Editor } from 'draft-js';

import { unmountComponentSuppressError } from 'utils/test';
import MultilineTextEditor from 'components/inline-editable/multiline-text-editor';

describe('MultilineTextEditor component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render with given editorState', function () {
    const onChange = () => {};
    const editorState = EditorState.createEmpty();
    instance = renderIntoDocument(
      <MultilineTextEditor
        style={ { wrapper: {}, paragraph: {} } }
        editorState={ editorState }
        onChange={ onChange }
        placeholder='123'/>
    );
    const editor = findRenderedComponentWithType(instance, Editor);
    editor.props.onChange.should.eql(onChange);
    editor.props.placeholder.should.eql('123');
    editor.props.editorState.should.eql(editorState);
  });
});
