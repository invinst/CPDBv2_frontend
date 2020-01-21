import React from 'react';
import { shallow } from 'enzyme';
import { spy, stub } from 'sinon';

import * as draftUtils from 'utils/draft';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import { RichTextFieldFactory, StringFieldFactory } from 'utils/test/factories/field';


describe('EditWrapperStateProvider component', function () {
  it('should render its children', function () {
    const wrapper = shallow(
      <EditWrapperStateProvider>
        <div>abc123</div>
      </EditWrapperStateProvider>
    );

    wrapper.text().should.equal('abc123');
  });

  it('should pass down data context in context', function () {
    stub(draftUtils, 'convertContentStateToEditorState').returns('my value');
    const navbarTitleField = RichTextFieldFactory.build({ name: 'navbar_title' });
    const stringField = StringFieldFactory.build({ name: 'string_field' });
    const turnOnSectionEditModeSpy = spy();
    const turnOffSectionEditModeSpy = spy();
    const wrapper = shallow(
      <EditWrapperStateProvider
        fields={ {
          'navbar_title': navbarTitleField,
          'empty_field': null,
          'string_field': stringField,
        } }
        sectionEditModeOn={ true }
        turnOnSectionEditMode={ turnOnSectionEditModeSpy }
        turnOffSectionEditMode={ turnOffSectionEditModeSpy }
      >
        <div>abc123</div>
      </EditWrapperStateProvider>
    );

    const childContext = wrapper.instance().getChildContext();
    childContext.should.containEql({
      sectionEditModeOn: true,
      turnOnSectionEditMode: turnOnSectionEditModeSpy,
      turnOffSectionEditMode: turnOffSectionEditModeSpy,
    });

    const fieldContexts = childContext.fieldContexts;
    fieldContexts['navbar_title'].should.not.be.undefined();
    fieldContexts['navbar_title'].should.containEql({
      value: 'my value',
      editModeOn: true,
    });
    fieldContexts['empty_field'].should.containEql({
      value: null,
      editModeOn: true,
    });
    fieldContexts['string_field'].should.containEql({
      value: stringField.value,
      editModeOn: true,
    });
    draftUtils.convertContentStateToEditorState.should.be.calledWith(navbarTitleField.value);
    draftUtils.convertContentStateToEditorState.restore();
  });

  it('should pass down data context in context when autoSave', function () {
    stub(draftUtils, 'convertContentStateToEditorState').returns('my value');
    const navbarTitleField = RichTextFieldFactory.build({ name: 'navbar_title' });
    const stringField = StringFieldFactory.build({ name: 'string_field' });
    const turnOnSectionEditModeSpy = spy();
    const turnOffSectionEditModeSpy = spy();
    const context = { editModeOn: true };
    const wrapper = shallow(
      <EditWrapperStateProvider
        fields={ {
          'navbar_title': navbarTitleField,
          'empty_field': null,
          'string_field': stringField,
        } }
        sectionEditModeOn={ false }
        autoSave={ true }
        turnOnSectionEditMode={ turnOnSectionEditModeSpy }
        turnOffSectionEditMode={ turnOffSectionEditModeSpy }
      >
        <div>abc123</div>
      </EditWrapperStateProvider>,
      { context },
    );

    const childContext = wrapper.instance().getChildContext();
    childContext.should.containEql({
      sectionEditModeOn: true,
      turnOnSectionEditMode: turnOnSectionEditModeSpy,
      turnOffSectionEditMode: turnOffSectionEditModeSpy,
    });

    const fieldContexts = childContext.fieldContexts;
    fieldContexts['navbar_title'].should.not.be.undefined();
    fieldContexts['navbar_title'].should.containEql({
      value: 'my value',
      editModeOn: true,
    });
    fieldContexts['empty_field'].should.containEql({
      value: null,
      editModeOn: true,
    });
    fieldContexts['string_field'].should.containEql({
      value: stringField.value,
      editModeOn: true,
    });
    draftUtils.convertContentStateToEditorState.should.be.calledWith(navbarTitleField.value);
    draftUtils.convertContentStateToEditorState.restore();
  });

  it('should save data from state when call onSaveForm', function () {
    stub(draftUtils, 'convertEditorStateToRaw').returns('raw content');
    const turnOffSectionEditModeSpy = spy();
    const onSaveFormStub = stub().returns(new Promise(resolve => resolve()));
    const stringField = StringFieldFactory.build({ name: 'string_field' });
    const wrapper = shallow(
      <EditWrapperStateProvider
        onSaveForm={ onSaveFormStub }
        turnOffSectionEditMode={ turnOffSectionEditModeSpy }
      >
        <div>abc123</div>
      </EditWrapperStateProvider>
    );
    wrapper.setState({
      fields: {
        'navbar_title': {
          name: 'navbar_title',
          type: 'rich_text',
          value: 'editor state',
        },
        'string_field': stringField,
      },
    });

    const savePromise = wrapper.instance().getChildContext().onSaveForm().should.be.fulfilled();
    return savePromise.then(() => {
      onSaveFormStub.calledWith({
        fields: [
          {
            name: 'navbar_title',
            type: 'rich_text',
            value: 'raw content',
          },
          stringField,
        ],
      }).should.be.true();
      turnOffSectionEditModeSpy.should.be.called();

      draftUtils.convertEditorStateToRaw.should.be.calledWith('editor state');
      draftUtils.convertEditorStateToRaw.restore();
    });
  });

  it('should update field value when call onChange', function () {
    const wrapper = shallow(
      <EditWrapperStateProvider>
        <div>abc123</div>
      </EditWrapperStateProvider>
    );
    wrapper.setState({
      fields: {
        'navbar_title': RichTextFieldFactory.build({ name: 'navbar_title' }),
      },
    });

    wrapper.instance().getChildContext().fieldContexts['navbar_title'].onChange('changed value');
    wrapper.state('fields')['navbar_title'].value.should.equal('changed value');
  });

  it('should call handleSaveForm when input changed and autoSave is true', function () {
    const onSaveFormStub = stub().returns(new Promise(resolve => resolve()));
    const handleSaveFormStub = stub(EditWrapperStateProvider.prototype, 'handleSaveForm');
    const wrapper = shallow(
      <EditWrapperStateProvider autoSave={ true } onSaveForm={ onSaveFormStub }>
        <div>abc123</div>
      </EditWrapperStateProvider>
    );
    wrapper.setState({
      fields: {
        'navbar_title': RichTextFieldFactory.build({ name: 'navbar_title' }),
      },
    });
    wrapper.instance().getChildContext().fieldContexts['navbar_title'].onChange('changed value');
    handleSaveFormStub.should.be.called();
    handleSaveFormStub.restore();
  });
});
