import React from 'react';
import { shallow } from 'enzyme';
import should from 'should';
import sinon from 'sinon';

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
    const onSaveForm = sinon.stub().returns({ then: (fn) => then = fn });
    const turnOffSectionEditMode = sinon.spy();
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
    const spyDeserializeField = sinon.spy(WrappedComponent, 'deserializeField');
    const wrapper = shallow(
      <WrappedComponent/>
    );
    const newField = RichTextFieldFactory.build({}, { blockTexts: ['b'] });

    wrapper.setProps({
      fields: {
        a: newField,
      },
    });
    spyDeserializeField.should.be.called();
    wrapper.state('fields').a.value.getCurrentContent().getFirstBlock().getText().should.equal('b');
    spyDeserializeField.resetHistory();

    wrapper.setProps({
      fields: {
        a: newField,
      },
    });
    spyDeserializeField.should.not.be.called();
    wrapper.state('fields').a.value.getCurrentContent().getFirstBlock().getText().should.equal('b');

    wrapper.setProps({
      fields: {
        a: RichTextFieldFactory.build({}, { blockTexts: ['c'] }),
      },
    });
    spyDeserializeField.should.be.called();
    wrapper.state('fields').a.value.getCurrentContent().getFirstBlock().getText().should.equal('c');
    spyDeserializeField.restore();
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

  it('should update fields on sectionEditModeOn change', function () {
    const spyDeserializeField = sinon.spy(WrappedComponent, 'deserializeField');
    const wrapper = shallow(
      <WrappedComponent
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
        'navbar_title': WrappedComponent.deserializeField(
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
        'navbar_title': WrappedComponent.deserializeField(
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
