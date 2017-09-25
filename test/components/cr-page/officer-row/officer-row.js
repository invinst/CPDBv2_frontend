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
    instance = renderIntoDocument(<OfficerRow fullName='Foo Bar' badge='12345' />);
    const innerHTML = findDOMNode(instance).innerHTML;
    innerHTML.should.containEql('ACCUSED OFFICER');
    innerHTML.should.containEql('Foo Bar');
    innerHTML.should.containEql('Badge 12345');
    scryRenderedComponentsWithType(instance, ViewProfileButton).should.have.length(1);
  });
});
