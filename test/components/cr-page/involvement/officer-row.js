import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerRow from 'components/cr-page/involvement/officer-row';


describe('OfficerRow component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render fullName and extraInfo', function () {
    instance = renderIntoDocument(<OfficerRow fullName='Foo' extraInfo='male, white' />);
    findDOMNode(instance).innerHTML.should.containEql('Foo');
    findDOMNode(instance).innerHTML.should.containEql('male, white');
  });
});
