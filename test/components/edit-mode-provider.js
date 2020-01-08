import React from 'react';
import { mount } from 'enzyme';

import EditModeProvider from 'components/edit-mode-provider';


describe('EditModeProvider component', function () {
  it('should pass down editModeOn via context from pathname', function () {
    const wrapper = mount(
      <EditModeProvider pathname='edit/abc' />
    );
    wrapper.instance().getEditModeOn().should.be.true();
  });

  it('should pass down editModeOn via context from location', function () {
    const wrapper = mount(
      <EditModeProvider location={ { pathname: 'edit/abc' } } />
    );
    wrapper.instance().getEditModeOn().should.be.true();
  });
});
