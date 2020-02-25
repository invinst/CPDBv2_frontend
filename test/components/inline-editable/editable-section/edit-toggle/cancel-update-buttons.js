import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import CancelUpdateButtons from 'components/inline-editable/editable-section/edit-toggle/cancel-update-buttons';
import HoverableButton from 'components/common/hoverable-button';

describe('CancelUpdateButtons component', function () {
  it('should render HoverableButtons', function () {
    const onCancelClickSpy = spy();
    const onUpdateClickSpy = spy();
    const wrapper = mount(
      <CancelUpdateButtons onCancelClick={ onCancelClickSpy } onUpdateClick={ onUpdateClickSpy }/>
    );

    const hoverableButtons = wrapper.find(HoverableButton);
    hoverableButtons.should.have.length(2);

    const cancelButton = hoverableButtons.at(0);
    cancelButton.text().should.equal('Cancel');
    cancelButton.prop('className').should.equal('cancel-button');
    cancelButton.prop('onClick').should.eql(onCancelClickSpy);

    const updateButton = hoverableButtons.at(1);
    updateButton.text().should.equal('Update');
    updateButton.prop('className').should.equal('update-button');
    updateButton.prop('onClick').should.eql(onUpdateClickSpy);
  });

  it('should trigger onCancelClick', function () {
    CancelUpdateButtons.should.triggerCallbackWhenClick('onCancelClick', 'a.cancel-button');
  });

  it('should trigger onUpdateClick', function () {
    CancelUpdateButtons.should.triggerCallbackWhenClick('onUpdateClick', 'a.update-button');
  });
});
