import React from 'react';
import { shallow } from 'enzyme';
import should from 'should';
import { spy, stub } from 'sinon';

import { convertContentStateToEditorState } from 'utils/draft';
import { RawContentStateFactory } from 'utils/test/factories/draft';
import { FieldFactory, RichTextFieldFactory, StringFieldFactory } from 'utils/test/factories/field';
import EditableSection from 'components/inline-editable/editable-section';


function SubComponent(props) {
  return (
    <div/>
  );
}

const WrappedComponent = EditableSection(SubComponent);

describe('EditableSection component', function () {
  const fields = {
    a: RichTextFieldFactory.build({ name: 'a' }, { blockTexts: ['A'] }),
    b: StringFieldFactory.build({ name: 'b', value: 'B' }),
    c: FieldFactory.build({ name: 'officers', type: 'officers_list', value: [{ id: 1, fullName: 'Foo' }] }),
  };

  it('should render subcomponent', function () {
    const turnOnSectionEditMode = () => {};
    const turnOffSectionEditMode = () => {};
    const wrapper = shallow(
      <WrappedComponent
        fields={ fields }
        sectionEditModeOn={ true }
        turnOnSectionEditMode={ turnOnSectionEditMode }
        turnOffSectionEditMode={ turnOffSectionEditMode }
      />
    );
    const subComponent = wrapper.find(SubComponent);
    subComponent.prop('sectionEditModeOn').should.be.true();
    subComponent.prop('editToggleProps').should.eql({
      sectionEditModeOn: true,
      turnOffSectionEditMode,
      turnOnSectionEditMode,
      onSaveForm: wrapper.instance().handleSaveForm,
    });
    subComponent.prop('fieldProps').a.value.getCurrentContent().getFirstBlock().getText().should.equal('A');
    subComponent.prop('fieldProps').a.editModeOn.should.be.true();
    subComponent.prop('fieldProps').b.value.should.equal('B');
    subComponent.prop('fieldProps').b.editModeOn.should.be.true();
  });

  it('should update field to state', function () {
    const wrapper = shallow(
      <WrappedComponent
        fields={ fields }
      />
    );
    const subComponent = wrapper.find(SubComponent);
    subComponent.prop('fieldProps').b.onChange('Bb');
    wrapper.state('fields').b.value.should.equal('Bb');
  });

  it('should trigger onSaveForm with serialized data', function () {
    const onSaveForm = stub().returns({ then: (fn) => then = fn });
    const turnOffSectionEditMode = spy();
    let then;
    const wrapper = shallow(
      <WrappedComponent
        turnOffSectionEditMode={ turnOffSectionEditMode }
        onSaveForm={ onSaveForm }
        fields={ fields }
      />
    );
    const subComponent = wrapper.find(SubComponent);
    subComponent.prop('fieldProps').a.onChange(
      convertContentStateToEditorState(RawContentStateFactory.build({}, { blockTexts: ['Aa'] }))
    );
    subComponent.prop('editToggleProps').onSaveForm();
    onSaveForm.args[0][0].fields[0].value.blocks[0].text.should.equal('Aa');
    then();
    turnOffSectionEditMode.calledOnce.should.be.true();
  });

  it('should deserialize fields it just receive', function () {
    const wrapper = shallow(
      <WrappedComponent/>
    );
    wrapper.setProps({
      fields: {
        a: RichTextFieldFactory.build({}, { blockTexts: ['b'] }),
      },
    });
    wrapper.state('fields').a.value.getCurrentContent().getFirstBlock().getText().should.equal('b');
  });

  it('should not deserialze falsy field', function () {
    const wrapper = shallow(
      <WrappedComponent/>
    );
    wrapper.setProps({
      fields: {
        a: null,
      },
    });
    should.not.exist(wrapper.state('fields').a);
  });
});
