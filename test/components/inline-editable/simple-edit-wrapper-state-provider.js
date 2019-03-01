import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import { spy, stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import SimpleEditWrapperStateProvider from 'components/inline-editable/simple-edit-wrapper-state-provider';


describe('SimpleEditWrapperStateProvider component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render its children', function () {
    instance = renderIntoDocument(
      <SimpleEditWrapperStateProvider>
        <div>abc123</div>
      </SimpleEditWrapperStateProvider>
    );

    ReactDOM.findDOMNode(instance).textContent.should.equal('abc123');
  });

  it('should pass down data context in context', function () {
    const turnOnSectionEditModeSpy = spy();
    const turnOffSectionEditModeSpy = spy();
    instance = renderIntoDocument(
      <SimpleEditWrapperStateProvider
        fields={ {
          'title': 'CRID 1083633 CR CRID 1083633 CR Tactical Response Report 2 (Glim)',
          'empty_field': null,
          'text_content': 'TACTICAL RESPONSE Police Department\n1. DATE OF INCIDENT TIME 2. ADDRESS OF OCCURRENCE',
        } }
        sectionEditModeOn={ true }
        turnOnSectionEditMode={ turnOnSectionEditModeSpy }
        turnOffSectionEditMode={ turnOffSectionEditModeSpy }
      >
        <div>abc123</div>
      </SimpleEditWrapperStateProvider>
    );

    const childContext = instance.getChildContext();
    childContext.should.containEql({
      sectionEditModeOn: true,
      turnOnSectionEditMode: turnOnSectionEditModeSpy,
      turnOffSectionEditMode: turnOffSectionEditModeSpy
    });

    const fieldContexts = childContext.fieldContexts;
    fieldContexts['title'].should.not.be.undefined();
    fieldContexts['title'].should.containEql({
      value: 'CRID 1083633 CR CRID 1083633 CR Tactical Response Report 2 (Glim)',
      editModeOn: true,
    });
    fieldContexts['empty_field'].should.containEql({
      value: null,
      editModeOn: true
    });
    fieldContexts['text_content'].should.containEql({
      value: 'TACTICAL RESPONSE Police Department\n1. DATE OF INCIDENT TIME 2. ADDRESS OF OCCURRENCE',
      editModeOn: true
    });
  });

  it('should save data from state when call onSaveForm', function () {
    const turnOffSectionEditModeSpy = spy();
    const onSaveFormStub = stub().returns(new Promise(resolve => resolve()));
    instance = renderIntoDocument(
      <SimpleEditWrapperStateProvider
        onSaveForm={ onSaveFormStub }
        turnOffSectionEditMode={ turnOffSectionEditModeSpy }
      >
        <div>abc123</div>
      </SimpleEditWrapperStateProvider>
    );
    instance.setState({
      fields: {
        'navbar_title': {
          name: 'navbar_title',
          type: 'rich_text',
          value: 'editor state'
        },
      }
    });

    const savePromise = instance.getChildContext().onSaveForm().should.be.fulfilled();
    return savePromise.then(() => {
      onSaveFormStub.calledWith({
        'navbar_title': {
          name: 'navbar_title',
          type: 'rich_text',
          value: 'editor state'
        },
      }).should.be.true();
      turnOffSectionEditModeSpy.called.should.be.true();
    });
  });

  it('should update field value when call onChange', function () {
    instance = renderIntoDocument(
      <SimpleEditWrapperStateProvider>
        <div>abc123</div>
      </SimpleEditWrapperStateProvider>
    );
    instance.setState({
      fields: {
        'navbar_title': 'old value'
      }
    });

    instance.getChildContext().fieldContexts['navbar_title'].onChange('changed value');
    instance.state.fields['navbar_title'].should.equal('changed value');
  });

});
