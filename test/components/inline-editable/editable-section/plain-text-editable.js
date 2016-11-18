import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import PlainTextEditable from 'components/inline-editable/editable-section/plain-text-editable';
import Editable from 'components/inline-editable/editable';
import { RawContentStateFactory } from 'utils/test/factories/draft';
import { convertContentStateToEditorState } from 'utils/draft';

describe('PlainTextEditable component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render with given props', function () {
    const onChange = () => {};
    const editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['abc'] })
    );
    instance = renderIntoDocument(
      <PlainTextEditable
        editModeOn={ true }
        presenterElement='div'
        onChange={ onChange }
        value={ editorState }
        placeholder='123'/>
    );
    const editable = findRenderedComponentWithType(instance, Editable);
    editable.props.editModeOn.should.be.true();
    const paragraph = editable.props.presenterElement;
    paragraph.props.children.should.eql('abc');
    const editor = editable.props.editorElement;
    editor.props.onChange.should.eql(onChange);
    editor.props.editorState.should.eql(editorState);
    editor.props.placeholder.should.eql('123');
  });
});
