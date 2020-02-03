import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import * as draftUtils from 'utils/draft';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import { RichTextFieldFactory, StringFieldFactory } from 'utils/test/factories/field';
import { EditWrapperStateContext } from 'contexts';


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
    sinon.stub(draftUtils, 'convertContentStateToEditorState').returns('my value');
    const navbarTitleField = RichTextFieldFactory.build({ name: 'navbar_title' });
    const stringField = StringFieldFactory.build({ name: 'string_field' });
    const turnOnSectionEditModeSpy = sinon.spy();
    const turnOffSectionEditModeSpy = sinon.spy();
    class ChildrenComponent extends Component { // eslint-disable-line
      render() {
        return (
          <div>abc123</div>
        );
      }
    }
    ChildrenComponent.contextType = EditWrapperStateContext;
    const wrapper = mount(
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
        <ChildrenComponent/>
      </EditWrapperStateProvider>
    );

    const childContext = wrapper.find(ChildrenComponent).instance().context;
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
    sinon.stub(draftUtils, 'convertEditorStateToRaw').returns('raw content');
    const turnOffSectionEditModeSpy = sinon.spy();
    const onSaveFormStub = sinon.stub().returns(new Promise(resolve => resolve()));
    const stringField = StringFieldFactory.build({ name: 'string_field' });
    class ChildrenComponent extends Component { // eslint-disable-line
      render() {
        return (
          <div>abc123</div>
        );
      }
    }
    ChildrenComponent.contextType = EditWrapperStateContext;
    const wrapper = mount(
      <EditWrapperStateProvider
        onSaveForm={ onSaveFormStub }
        turnOffSectionEditMode={ turnOffSectionEditModeSpy }
      >
        <ChildrenComponent/>
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

    const childContext = wrapper.find(ChildrenComponent).instance().context;
    const savePromise = childContext.onSaveForm().should.be.fulfilled();
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
    class ChildrenComponent extends Component { // eslint-disable-line
      render() {
        return (
          <div>abc123</div>
        );
      }
    }
    ChildrenComponent.contextType = EditWrapperStateContext;
    const wrapper = mount(
      <EditWrapperStateProvider>
        <ChildrenComponent/>
      </EditWrapperStateProvider>
    );
    wrapper.setState({
      fields: {
        'navbar_title': RichTextFieldFactory.build({ name: 'navbar_title' }),
      },
    });

    const childContext = wrapper.find(ChildrenComponent).instance().context;
    childContext.fieldContexts['navbar_title'].onChange('changed value');
    wrapper.state('fields')['navbar_title'].value.should.equal('changed value');
  });

  it('should deserialize fields it just receive', function () {
    const spyDeserializeField = sinon.spy(EditWrapperStateProvider, 'deserializeField');
    const wrapper = shallow(
      <EditWrapperStateProvider
        fields={ {
          'navbar_title': RichTextFieldFactory.build({}, { blockTexts: ['navbar title'] }),
        } }
      />
    );

    let navbarText = wrapper.state('fields')['navbar_title'].value.getCurrentContent().getFirstBlock().getText();
    navbarText.should.equal('navbar title');
    const newField = RichTextFieldFactory.build({}, { blockTexts: ['new navbar title'] });

    wrapper.setProps({
      fields: {
        'navbar_title': newField,
      },
    });
    spyDeserializeField.should.be.called();
    navbarText = wrapper.state('fields')['navbar_title'].value.getCurrentContent().getFirstBlock().getText();
    navbarText.should.equal('new navbar title');
    spyDeserializeField.resetHistory();

    wrapper.setProps({
      fields: {
        'navbar_title': newField,
      },
    });
    spyDeserializeField.should.not.be.called();
    navbarText = wrapper.state('fields')['navbar_title'].value.getCurrentContent().getFirstBlock().getText();
    navbarText.should.equal('new navbar title');

    wrapper.setProps({
      fields: {
        'navbar_title': RichTextFieldFactory.build({}, { blockTexts: ['navbar title!!!'] }),
      },
    });
    spyDeserializeField.should.be.called();
    navbarText = wrapper.state('fields')['navbar_title'].value.getCurrentContent().getFirstBlock().getText();
    navbarText.should.equal('navbar title!!!');
    spyDeserializeField.restore();
  });

  it('should update fields on sectionEditModeOn change', function () {
    const spyDeserializeField = sinon.spy(EditWrapperStateProvider, 'deserializeField');
    const wrapper = shallow(
      <EditWrapperStateProvider
        fields={ {
          'navbar_title': RichTextFieldFactory.build({}, { blockTexts: ['navbar title'] }),
        } }
        sectionEditModeOn={ true }
      />
    );

    let navbarText = wrapper.state('fields')['navbar_title'].value.getCurrentContent().getFirstBlock().getText();

    navbarText.should.equal('navbar title');

    wrapper.setState({
      fields: {
        'navbar_title': EditWrapperStateProvider.deserializeField(
          RichTextFieldFactory.build({}, { blockTexts: ['new navbar title'] })),
      },
    });

    navbarText = wrapper.state('fields')['navbar_title'].value.getCurrentContent().getFirstBlock().getText();
    navbarText.should.equal('new navbar title');
    spyDeserializeField.resetHistory();

    wrapper.setProps({
      sectionEditModeOn: false,
    });
    spyDeserializeField.should.be.called();
    navbarText = wrapper.state('fields')['navbar_title'].value.getCurrentContent().getFirstBlock().getText();
    navbarText.should.equal('navbar title');

    wrapper.setState({
      fields: {
        'navbar_title': EditWrapperStateProvider.deserializeField(
          RichTextFieldFactory.build({}, { blockTexts: ['new navbar title'] })),
      },
    });

    navbarText = wrapper.state('fields')['navbar_title'].value.getCurrentContent().getFirstBlock().getText();
    navbarText.should.equal('new navbar title');
    spyDeserializeField.resetHistory();

    wrapper.setProps({
      sectionEditModeOn: false,
    });

    spyDeserializeField.should.not.be.called();
    navbarText = wrapper.state('fields')['navbar_title'].value.getCurrentContent().getFirstBlock().getText();
    navbarText.should.equal('new navbar title');
  });
});
