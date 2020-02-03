import React from 'react';
import { shallow, mount } from 'enzyme';
import should from 'should';
import sinon from 'sinon';

import Editable from 'components/inline-editable/editable';
import LinkTextEditable from 'components/inline-editable/editable-section/link-text-editable';
import * as draftUtils from 'utils/draft';
import { RawContentStateFactory } from 'utils/test/factories/draft';
import { convertContentStateToEditorState } from 'utils/draft';
import { EditWrapperStateContext } from 'contexts';

describe('LinkTextEditable component', function () {
  let editorState;

  beforeEach(function () {
    sinon.stub(draftUtils, 'editorStateToText').returns('link text');
    editorState = convertContentStateToEditorState(
      RawContentStateFactory.build({}, { blockTexts: ['abc'] })
    );
  });

  it('should render empty link if value is not passed', function () {
    const wrapper = mount(
      <LinkTextEditable />
    );

    const editableElement = wrapper.find(Editable);
    const linkElement = editableElement.prop('presenterElement');
    should(linkElement.props.children).be.null();
  });

  it('should render text extracted from editor state when value is passed', function () {
    const wrapper = mount(
      <LinkTextEditable
        value={ editorState }
      />
    );

    const editableElement = wrapper.find(Editable);
    const linkElement = editableElement.prop('presenterElement');
    linkElement.props.children.should.equal('link text');
    draftUtils.editorStateToText.should.be.calledWith(editorState);
  });

  it('should get editor props when they are available in props', function () {
    const onChangeSpy = sinon.spy();
    const wrapper = shallow(
      <LinkTextEditable
        value={ editorState }
        editModeOn={ true }
        onChange={ onChangeSpy }
      />
    );

    const editableElement = wrapper.find(Editable);
    editableElement.prop('editModeOn').should.be.true();
    editableElement.prop('editorElement').props.should.containEql({
      editorState: editorState,
      onChange: onChangeSpy,
    });
  });

  it('should get editor props from context when they are not available in props', function () {
    const onChangeSpy = sinon.spy();
    const context = {
      fieldContexts: {
        'navbar_title': {
          editModeOn: true,
          value: editorState,
          onChange: onChangeSpy,
        },
      },
    };
    const wrapper = mount(
      <EditWrapperStateContext.Provider value={ context }>
        <LinkTextEditable fieldname='navbar_title' />
      </EditWrapperStateContext.Provider>
    );

    const editableElement = wrapper.find(Editable);
    editableElement.prop('editModeOn').should.be.true();
    editableElement.prop('editorElement').props.should.containEql({
      editorState: editorState,
      onChange: onChangeSpy,
    });
  });
});
