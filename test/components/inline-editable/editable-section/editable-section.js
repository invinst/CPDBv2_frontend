import React, { Component } from 'react';
import { render } from 'react-dom';
import should from 'should';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { spy, stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import { convertContentStateToEditorState } from 'utils/draft';
import { RawContentStateFactory } from 'utils/test/factories/draft';
import { FieldFactory, RichTextFieldFactory, StringFieldFactory } from 'utils/test/factories/field';
import EditableSection from 'components/inline-editable/editable-section';


class SubComponent extends Component {
  render() {
    return (
      <div/>
    );
  }
}
const WrappedComponent = EditableSection(SubComponent);

describe('EditableSection component', function () {
  let instance;
  const fields = {
    a: RichTextFieldFactory.build({ name: 'a' }, { blockTexts: ['A'] }),
    b: StringFieldFactory.build({ name: 'b', value: 'B' }),
    c: FieldFactory.build({ name: 'officers', type: 'officers_list', value: [{ id: 1, fullName: 'Foo' }] })
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render subcomponent', function () {
    const turnOnSectionEditMode = () => {};
    const turnOffSectionEditMode = () => {};
    instance = renderIntoDocument(
      <WrappedComponent
        fields={ fields }
        sectionEditModeOn={ true }
        turnOnSectionEditMode={ turnOnSectionEditMode }
        turnOffSectionEditMode={ turnOffSectionEditMode }
      />
    );
    const subComponent = findRenderedComponentWithType(instance, SubComponent);
    subComponent.props.sectionEditModeOn.should.be.true();
    subComponent.props.editToggleProps.should.eql({
      sectionEditModeOn: true,
      turnOffSectionEditMode,
      turnOnSectionEditMode,
      onSaveForm: instance.handleSaveForm
    });
    subComponent.props.fieldProps.a.value.getCurrentContent().getFirstBlock().getText()
      .should.eql('A');
    subComponent.props.fieldProps.a.editModeOn.should.be.true();
    subComponent.props.fieldProps.b.value.should.eql('B');
    subComponent.props.fieldProps.b.editModeOn.should.be.true();
  });

  it('should update field to state', function () {
    instance = renderIntoDocument(
      <WrappedComponent
        fields={ fields }
      />
    );
    const subComponent = findRenderedComponentWithType(instance, SubComponent);
    subComponent.props.fieldProps.b.onChange('Bb');
    instance.state.fields.b.value.should.eql('Bb');
  });

  it('should trigger onSaveForm with serialized data', function () {
    const onSaveForm = stub().returns({ then: (fn) => then = fn });
    const turnOffSectionEditMode = spy();
    let then;
    instance = renderIntoDocument(
      <WrappedComponent
        turnOffSectionEditMode={ turnOffSectionEditMode }
        onSaveForm={ onSaveForm }
        fields={ fields }
      />
    );
    const subComponent = findRenderedComponentWithType(instance, SubComponent);
    subComponent.props.fieldProps.a.onChange(
      convertContentStateToEditorState(RawContentStateFactory.build({}, { blockTexts: ['Aa'] }))
    );
    subComponent.props.editToggleProps.onSaveForm();
    onSaveForm.args[0][0].fields[0].value.blocks[0].text.should.eql('Aa');
    then();
    turnOffSectionEditMode.calledOnce.should.be.true();
  });

  it('should deserialize fields it just receive', function () {
    const rootEl = document.createElement('DIV');
    instance = render(<WrappedComponent/>, rootEl);
    instance = render(<WrappedComponent fields={ {
      a: RichTextFieldFactory.build({}, { blockTexts: ['b'] })
    } }/>, rootEl);
    instance.state.fields.a.value.getCurrentContent().getFirstBlock().getText().should.eql('b');
  });

  it('should not deserialze falsy field', function () {
    const rootEl = document.createElement('DIV');
    instance = render(<WrappedComponent/>, rootEl);
    instance = render(<WrappedComponent fields={ {
      a: null
    } }/>, rootEl);
    should.not.exist(instance.state.fields.a);
  });
});
