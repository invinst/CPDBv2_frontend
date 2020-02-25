import React, { Component } from 'react';
import { mount } from 'enzyme';

import EditModeProvider from 'components/edit-mode-provider';
import { EditModeContext } from 'contexts';


describe('EditModeProvider component', function () {
  class ChildrenComponent extends Component { // eslint-disable-line
    render() {
      return (
        <div/>
      );
    }
  }
  ChildrenComponent.contextType = EditModeContext;

  it('should pass down editModeOn via context from pathname with editModeOn is true', function () {
    const wrapper = mount(
      <EditModeProvider location={ { pathname: 'edit/path' } }>
        <ChildrenComponent />
      </EditModeProvider>
    );

    wrapper.find(ChildrenComponent).instance().context.should.eql({ editModeOn: true });
  });

  it('should pass down editModeOn via context from pathname with editModeOn is false', function () {
    const wrapper = mount(
      <EditModeProvider location={ { pathname: 'path' } }>
        <ChildrenComponent />
      </EditModeProvider>
    );

    wrapper.find(ChildrenComponent).instance().context.should.eql({ editModeOn: false });
  });
});
