import React from 'react';
import { mountWithRouter } from 'utils/test';

import OfficerRow from 'components/cr-page/involvement/officer-row';


describe('OfficerRow component', function () {
  it('should render fullName and extraInfo', function () {
    const wrapper = mountWithRouter(
      <OfficerRow fullName='Foo' extraInfo='male, white' />
    );
    wrapper.text().should.containEql('Foo');
    wrapper.text().should.containEql('male, white');
  });
});
