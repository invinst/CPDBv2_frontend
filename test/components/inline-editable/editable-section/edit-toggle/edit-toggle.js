import React from 'react';
import should from 'should';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import EditToggle from 'components/inline-editable/editable-section/edit-toggle';
import MoreLink from 'components/common/more-link';
import CancelUpdateButtons from 'components/inline-editable/editable-section/edit-toggle/cancel-update-buttons';


describe('EditToggle component', function () {
  it('should render edit link when section edit mode not on', function () {
    const turnOnSectionEditMode = spy();
    const wrapper = mount(
      <EditToggle sectionEditModeOn={ false } turnOnSectionEditMode={ turnOnSectionEditMode }/>,
      { context: { editModeOn: true } }
    );
    const link = wrapper.find(MoreLink);
    link.prop('onClick')();
    turnOnSectionEditMode.calledOnce.should.be.true();
  });

  it('should render nothing when edit mode off', function () {
    const wrapper = shallow(
      <EditToggle/>,
      { context: { editModeOn: false } }
    );
    should(wrapper.type()).be.null();
  });

  it('should render buttons when section edit mode on', function () {
    const onSaveForm = spy();
    const turnOffSectionEditMode = spy();
    const wrapper = shallow(
      <EditToggle
        sectionEditModeOn={ true }
        onSaveForm={ onSaveForm }
        turnOffSectionEditMode={ turnOffSectionEditMode }
      />,
      { context: { editModeOn: true } }
    );
    const buttons = wrapper.find(CancelUpdateButtons);
    buttons.prop('onUpdateClick').should.eql(onSaveForm);
    buttons.prop('onCancelClick').should.eql(turnOffSectionEditMode);
  });
});
