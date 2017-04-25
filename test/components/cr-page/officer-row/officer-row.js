import React from 'react';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';
import OfficerRow from 'components/cr-page/officer-row';
import ViewProfileButton from 'components/cr-page/officer-row/view-profile-button';


describe('OfficerRow component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render properly', function () {
    instance = renderIntoDocument(<OfficerRow fullName='Foo Bar' gender='Male' race='White' />);
    const innerHTML = findDOMNode(instance).innerHTML;
    innerHTML.should.containEql('Officer');
    innerHTML.should.containEql('Foo Bar');
    innerHTML.should.containEql('male, white');
    scryRenderedComponentsWithType(instance, ViewProfileButton).should.have.length(1);
  });
});
