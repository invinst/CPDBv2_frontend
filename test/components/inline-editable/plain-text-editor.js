import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { EditorState, Editor } from 'draft-js';

import { unmountComponentSuppressError } from 'utils/test';
import PlainTextEditor from 'components/inline-editable/plain-text-editor';

describe('PlainTextEditor component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render Editor', function () {
    const onChange = () => {};
    const editorState = EditorState.createEmpty();
    instance = renderIntoDocument(
      <PlainTextEditor
        onChange={ onChange }
        editorState={ editorState }
        placeholder='123'/>
    );
    findRenderedComponentWithType(instance, Editor);
  });

  it('should not split block', function () {
    const onChange = () => {};
    const editorState = EditorState.createEmpty();
    instance = renderIntoDocument(
      <PlainTextEditor
        onChange={ onChange }
        editorState={ editorState }/>
    );
    const editor = findRenderedComponentWithType(instance, Editor);
    editor.props.handleKeyCommand('split-block').should.eql('handled');
    editor.props.handleKeyCommand('something-else').should.eql('not-handled');
  });
});
