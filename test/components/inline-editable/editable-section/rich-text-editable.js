import React from 'react';
import { shallow, mount } from 'enzyme';

import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import Editable from 'components/inline-editable/editable';
import { RawContentStateFactory } from 'utils/test/factories/draft';
import { convertContentStateToEditorState } from 'utils/draft';


describe('RichTextEditable component', function () {
  let editorState;

  beforeEach(function () {
    editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['abc'] })
    );
  });

  it('should render with given props', function () {
    const style = {};
    const onChange = () => {};
    const lastBlockChild = <div className='test--last-block-child'/>;

    const wrapper = mount(
      <RichTextEditable
        editModeOn={ true }
        style={ style }
        onChange={ onChange }
        value={ editorState }
        placeholder='123'
        lastBlockChild={ lastBlockChild }
      />
    );
    const editable = wrapper.find(Editable);
    editable.prop('editModeOn').should.be.true();

    const paragraph = editable.prop('presenterElement');
    paragraph.props.style.should.eql(style);
    paragraph.props.editorState.should.eql(editorState);
    paragraph.props.readOnly.should.be.true();
    paragraph.props.lastBlockChild.should.eql(lastBlockChild);

    const editor = editable.prop('editorElement');
    editor.props.style.should.eql(style);
    editor.props.onChange.should.eql(onChange);
    editor.props.editorState.should.eql(editorState);
    editor.props.placeholder.should.equal('123');
  });

  it('should render with given context', function () {
    const onChangeSpy = () => {};
    const context = {
      fieldContexts: {
        'navbar_title': {
          editModeOn: true,
          value: editorState,
          onChange: onChangeSpy,
        },
      },
    };
    const wrapper = shallow(
      <RichTextEditable fieldname='navbar_title' />, { context }
    );

    const editable = wrapper.find(Editable);
    editable.prop('editModeOn').should.be.true();
    editable.prop('editorElement').props.should.containEql({
      editorState: editorState,
      onChange: onChangeSpy,
    });
  });
});
