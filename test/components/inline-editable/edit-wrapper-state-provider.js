import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import { spy, stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import * as draftUtils from 'utils/draft';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import { RichTextFieldFactory, StringFieldFactory } from 'utils/test/factories/field';


describe('EditWrapperStateProvider component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render its children', function () {
    instance = renderIntoDocument(
      <EditWrapperStateProvider>
        <div>abc123</div>
      </EditWrapperStateProvider>
    );

    ReactDOM.findDOMNode(instance).textContent.should.equal('abc123');
  });

  it('should pass down data context in context', function () {
    stub(draftUtils, 'convertContentStateToEditorState').returns('my value');
    const navbarTitleField = RichTextFieldFactory.build({ name: 'navbar_title' });
    const stringField = StringFieldFactory.build({ name: 'string_field' });
    const turnOnSectionEditModeSpy = spy();
    const turnOffSectionEditModeSpy = spy();
    instance = renderIntoDocument(
      <EditWrapperStateProvider
        fields={ {
          'navbar_title': navbarTitleField,
          'empty_field': null,
          'string_field': stringField
        } }
        sectionEditModeOn={ true }
        turnOnSectionEditMode={ turnOnSectionEditModeSpy }
        turnOffSectionEditMode={ turnOffSectionEditModeSpy }
      >
        <div>abc123</div>
      </EditWrapperStateProvider>
    );

    const childContext = instance.getChildContext();
    childContext.should.containEql({
      sectionEditModeOn: true,
      turnOnSectionEditMode: turnOnSectionEditModeSpy,
      turnOffSectionEditMode: turnOffSectionEditModeSpy
    });

    const fieldContexts = childContext.fieldContexts;
    fieldContexts['navbar_title'].should.not.be.undefined();
    fieldContexts['navbar_title'].should.containEql({
      value: 'my value',
      editModeOn: true
    });
    fieldContexts['empty_field'].should.containEql({
      value: null,
      editModeOn: true
    });
    fieldContexts['string_field'].should.containEql({
      value: stringField.value,
      editModeOn: true
    });
    draftUtils.convertContentStateToEditorState.calledWith(navbarTitleField.value).should.be.true();
    draftUtils.convertContentStateToEditorState.restore();
  });

  it('should save data from state when call onSaveForm', function () {
    stub(draftUtils, 'convertEditorStateToRaw').returns('raw content');
    const turnOffSectionEditModeSpy = spy();
    const onSaveFormStub = stub().returns(new Promise(resolve => resolve()));
    const stringField = StringFieldFactory.build({ name: 'string_field' });
    instance = renderIntoDocument(
      <EditWrapperStateProvider
        onSaveForm={ onSaveFormStub }
        turnOffSectionEditMode={ turnOffSectionEditModeSpy }
      >
        <div>abc123</div>
      </EditWrapperStateProvider>
    );
    instance.setState({
      fields: {
        'navbar_title': {
          name: 'navbar_title',
          type: 'rich_text',
          value: 'editor state'
        },
        'string_field': stringField
      }
    });

    const savePromise = instance.getChildContext().onSaveForm().should.be.fulfilled();
    return savePromise.then(() => {
      onSaveFormStub.calledWith({
        fields: [
          {
            name: 'navbar_title',
            type: 'rich_text',
            value: 'raw content'
          },
          stringField
        ]
      }).should.be.true();
      turnOffSectionEditModeSpy.called.should.be.true();

      draftUtils.convertEditorStateToRaw.calledWith('editor state').should.be.true();
      draftUtils.convertEditorStateToRaw.restore();
    });
  });

  it('should update field value when call onChange', function () {
    instance = renderIntoDocument(
      <EditWrapperStateProvider>
        <div>abc123</div>
      </EditWrapperStateProvider>
    );
    instance.setState({
      fields: {
        'navbar_title': RichTextFieldFactory.build({ name: 'navbar_title' })
      }
    });

    instance.getChildContext().fieldContexts['navbar_title'].onChange('changed value');
    instance.state.fields['navbar_title'].value.should.equal('changed value');
  });

});
