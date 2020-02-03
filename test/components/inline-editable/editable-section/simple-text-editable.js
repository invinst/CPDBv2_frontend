import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import SimpleTextEditable from 'components/inline-editable/editable-section/simple-text-editable';
import Editable from 'components/inline-editable/editable';
import { EditWrapperStateContext } from 'contexts';


describe('SimpleTextEditable component', function () {
  it('should render with given context', function () {
    const onChangeSpy = sinon.spy();
    const context = {
      fieldContexts: {
        'title': {
          editModeOn: true,
          value: 'CRID 1083633 CR CRID 1083633 CR Tactical Response Report 2 (Glim)',
          onChange: onChangeSpy,
        },
      },
    };
    const wrapper = mount(
      <EditWrapperStateContext.Provider value={ context }>
        <SimpleTextEditable className='simple-text-editable' fieldName='title' placeholder='Title'/>
      </EditWrapperStateContext.Provider>
    );

    const editable = wrapper.find(Editable);
    editable.prop('editModeOn').should.be.true();

    const presenterElement = editable.prop('presenterElement');

    presenterElement.props.className.should.containEql('simple-text-editable');
    presenterElement.props.placeholder.should.equal('Title');
    presenterElement.props.children.should.equal(
      'CRID 1083633 CR CRID 1083633 CR Tactical Response Report 2 (Glim)'
    );

    presenterElement.props.className.should.containEql('simple-text-editable');
    presenterElement.props.placeholder.should.equal('Title');
    presenterElement.props.children.should.equal(
      'CRID 1083633 CR CRID 1083633 CR Tactical Response Report 2 (Glim)'
    );

    const textArea = wrapper.find('textarea');
    textArea.simulate('change', { target: { value: 'New Title' } });
    onChangeSpy.should.be.calledWith('New Title');
  });
});
