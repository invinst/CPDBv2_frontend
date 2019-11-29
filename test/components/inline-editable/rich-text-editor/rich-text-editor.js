import React from 'react';
import { shallow, mount } from 'enzyme';
import { Editor, SelectionState, EditorState } from 'draft-js';
import { spy } from 'sinon';

import { convertContentStateToEditorState } from 'utils/draft';
import { RawContentStateFactory } from 'utils/test/factories/draft';
import Toolbar from 'components/inline-editable/rich-text-editor/toolbar';
import RichTextEditor from 'components/inline-editable/rich-text-editor';
import EditorBlockWithStyle from 'components/inline-editable/custom-block/editor-block-with-style';

describe('RichTextEditor component', function () {
  it('should render', function () {
    const editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['a'] })
    );
    const wrapper = shallow(
      <RichTextEditor
        placeholder='abc'
        readOnly={ false }
        editorState={
          editorState
        }/>
    );
    const editor = wrapper.find(Editor);
    editor.prop('readOnly').should.be.false();
    editor.prop('editorState').should.eql(editorState);
    editor.prop('placeholder').should.equal('abc');
  });

  it('should add child to last block', function () {
    const editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['a', 'b'] })
    );

    const lastBlockChild = <div className='test--last-block-child'/>;

    const wrapper = mount(
      <RichTextEditor
        placeholder='abc'
        readOnly={ false }
        editorState={
          editorState
        }
        lastBlockChild={ lastBlockChild }
      />
    );

    const contentBlocks = wrapper.find(EditorBlockWithStyle);
    contentBlocks.should.have.length(2);

    contentBlocks.at(0).find('.test--last-block-child').exists().should.be.false();
    contentBlocks.at(1).find('.test--last-block-child').exists().should.be.true();
  });

  it('should not show toolbar when become readOnly', function () {
    const editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['a'] })
    );
    const wrapper = shallow(
      <RichTextEditor editorState={ editorState }/>
    );

    wrapper.setProps({ editorState, showToolbar: true });
    wrapper.setProps({ editorState, readOnly: true });
    wrapper.state('showToolbar').should.be.false();
  });

  it('should emit back editorState change from Editor', function () {
    let editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['a'] })
    );
    const onChange = spy();
    const wrapper = shallow(
      <RichTextEditor onChange={ onChange } editorState={ editorState }/>
    );
    const editor = wrapper.find(Editor);
    editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['a'] })
    );
    editor.prop('onChange')(editorState);
    onChange.args[0][0].getCurrentContent().getFirstBlock().getText().should.equal('a');
  });

  it('should remove selection when editor lose focus and toolbar is not hovered', function () {
    const onChange = spy();
    let editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['abc'] })
    );
    const wrapper = shallow(
      <RichTextEditor onChange={ onChange } editorState={ editorState }/>
    );
    const editor = wrapper.find(Editor);

    // make an editor state with selection
    let contentState = editorState.getCurrentContent();
    let selectionState = SelectionState.createEmpty(contentState.getFirstBlock().getKey());
    selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
    selectionState = selectionState.set('hasFocus', false);
    editorState = EditorState.acceptSelection(editorState, selectionState);

    editor.prop('onChange')(editorState);
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
    const wrapper = mount(
      <RichTextEditor editorState={ editorState }/>
    );
    const editor = wrapper.find(Editor);

    // make an editor state with selection
    let contentState = editorState.getCurrentContent();
    let selectionState = SelectionState.createEmpty(contentState.getFirstBlock().getKey());
    selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
    selectionState = selectionState.set('hasFocus', true);
    editorState = EditorState.acceptSelection(editorState, selectionState);

    editor.prop('onChange')(editorState);
    wrapper.state('showToolbar').should.be.true();
    const toolbar = wrapper.find(Toolbar);
    const rect = wrapper.getDOMNode().getBoundingClientRect();
    toolbar.prop('parentTop').should.eql(rect.top);
    toolbar.prop('parentLeft').should.eql(rect.left);
  });

  it('should not show toolbar when there\'s no selection', function () {
    let editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['abc'] })
    );
    const wrapper = shallow(
      <RichTextEditor editorState={ editorState }/>
    );
    wrapper.setState({ showToolbar: true });
    const editor = wrapper.find(Editor);

    editor.prop('onChange')(editorState);
    wrapper.state('showToolbar').should.be.false();
  });

  it('should handle toolbar on focus event', function () {
    const onChange = spy();

    let editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['abc'] })
    );
    const wrapper = shallow(
      <RichTextEditor onChange={ onChange } editorState={ editorState }/>
    );
    const toolbar = wrapper.find(Toolbar);

    toolbar.prop('onFocus')();
    onChange.should.be.called();
  });

  it('should handle toolbar on blur event', function () {
    const onChange = spy();

    let editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['abc'] })
    );
    const wrapper = shallow(
      <RichTextEditor onChange={ onChange } editorState={ editorState }/>
    );
    const toolbar = wrapper.find(Toolbar);

    toolbar.prop('onBlur')();
    onChange.should.be.called();
  });
});
