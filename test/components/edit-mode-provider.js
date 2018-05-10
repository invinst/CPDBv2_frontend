import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import EditModeProvider from 'components/edit-mode-provider';


describe('EditModeProvider component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should pass down editModeOn via context from pathname', function () {
    instance = renderIntoDocument(<EditModeProvider pathname='edit/abc' />);
    instance.getChildContext().editModeOn.should.be.true();
  });

  it('should pass down editModeOn via context from location', function () {
    instance = renderIntoDocument(<EditModeProvider location={ { pathname: 'edit/abc' } } />);
    instance.getChildContext().editModeOn.should.be.true();
  });
});
