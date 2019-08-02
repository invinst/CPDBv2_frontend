import React from 'react';
import { findDOMNode, render } from 'react-dom';
import { Editor, SelectionState, EditorState } from 'draft-js';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import { convertContentStateToEditorState } from 'utils/draft';
import { RawContentStateFactory } from 'utils/test/factories/draft';
import Toolbar from 'components/inline-editable/rich-text-editor/toolbar';
import RichTextEditor from 'components/inline-editable/rich-text-editor';
import EditorBlockWithStyle from 'components/inline-editable/custom-block/editor-block-with-style';

describe('RichTextEditor component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render', function () {
    const editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['a'] })
    );
    instance = renderIntoDocument(
      <RichTextEditor
        placeholder='abc'
        readOnly={ false }
        editorState={
          editorState
        }/>
    );
    const editor = findRenderedComponentWithType(instance, Editor);
    editor.props.readOnly.should.be.false();
    editor.props.editorState.should.eql(editorState);
    editor.props.placeholder.should.eql('abc');
  });

  it('should add child to last block', function () {
    const editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['a', 'b'] })
    );

    const lastBlockChild = <div className='test--last-block-child'/>;

    instance = renderIntoDocument(
      <RichTextEditor
        placeholder='abc'
        readOnly={ false }
        editorState={
          editorState
        }
        lastBlockChild={ lastBlockChild }
      />
    );

    const contentBlocks = scryRenderedComponentsWithType(instance, EditorBlockWithStyle);
    contentBlocks.should.have.length(2);

    scryRenderedDOMComponentsWithClass(contentBlocks[0], 'test--last-block-child').should.have.length(0);
    findRenderedDOMComponentWithClass(contentBlocks[1], 'test--last-block-child');
  });

  it('should not show toolbar when become readOnly', function () {
    const editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['a'] })
    );
    const rootEl = document.createElement('DIV');
    instance = render(<RichTextEditor editorState={ editorState }/>, rootEl);
    instance.setState({ showToolbar: true });
    render(<RichTextEditor editorState={ editorState } readOnly={ true }/>, rootEl);
    instance.state.showToolbar.should.be.false();
  });

  it('should emit back editorState change from Editor', function () {
    let editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['a'] })
    );
    const onChange = spy();
    instance = renderIntoDocument(
      <RichTextEditor onChange={ onChange } editorState={ editorState }/>
    );
    const editor = findRenderedComponentWithType(instance, Editor);
    editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['a'] })
    );
    editor.props.onChange(editorState);
    onChange.args[0][0].getCurrentContent().getFirstBlock().getText().should.eql('a');
  });

  it('should remove selection when editor lose focus and toolbar is not hovered', function () {
    const onChange = spy();
    let editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['abc'] })
    );
    instance = renderIntoDocument(<RichTextEditor onChange={ onChange } editorState={ editorState }/>);
    const editor = findRenderedComponentWithType(instance, Editor);

    // make an editor state with selection
    let contentState = editorState.getCurrentContent();
    let selectionState = SelectionState.createEmpty(contentState.getFirstBlock().getKey());
    selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
    selectionState = selectionState.set('hasFocus', false);
    editorState = EditorState.acceptSelection(editorState, selectionState);

    editor.props.onChange(editorState);
    editorState = onChange.args[0][0];
    // editorState should now contain no selection
    selectionState = editorState.getSelection();
    selectionState.getAnchorKey().should.eql(selectionState.getFocusKey());
    selectionState.getAnchorOffset().should.eql(selectionState.getFocusOffset());
  });

  it('should show toolbar when editor has focus and there is selection', function () {
    let editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['abc'] })
    );
    instance = renderIntoDocument(<RichTextEditor editorState={ editorState }/>);
    const editor = findRenderedComponentWithType(instance, Editor);

    // make an editor state with selection
    let contentState = editorState.getCurrentContent();
    let selectionState = SelectionState.createEmpty(contentState.getFirstBlock().getKey());
    selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
    selectionState = selectionState.set('hasFocus', true);
    editorState = EditorState.acceptSelection(editorState, selectionState);

    editor.props.onChange(editorState);
    instance.state.showToolbar.should.be.true();
    const toolbar = findRenderedComponentWithType(instance, Toolbar);
    const rect = findDOMNode(instance).getBoundingClientRect();
    toolbar.props.parentTop.should.eql(rect.top);
    toolbar.props.parentLeft.should.eql(rect.left);
  });

  it('should not show toolbar when there\'s no selection', function () {
    let editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['abc'] })
    );
    instance = renderIntoDocument(<RichTextEditor editorState={ editorState }/>);
    instance.setState({ showToolbar: true });
    const editor = findRenderedComponentWithType(instance, Editor);

    editor.props.onChange(editorState);
    instance.state.showToolbar.should.be.false();
  });

  it('should handle toolbar on focus event', function () {
    const onChange = spy();

    let editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['abc'] })
    );
    instance = renderIntoDocument(<RichTextEditor onChange={ onChange } editorState={ editorState }/>);
    const toolbar = findRenderedComponentWithType(instance, Toolbar);

    toolbar.props.onFocus();
    onChange.called.should.be.true();
  });

  it('should handle toolbar on blur event', function () {
    const onChange = spy();

    let editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['abc'] })
    );
    instance = renderIntoDocument(<RichTextEditor onChange={ onChange } editorState={ editorState }/>);
    const toolbar = findRenderedComponentWithType(instance, Toolbar);

    toolbar.props.onBlur();
    onChange.called.should.be.true();
  });
});
