import React from 'react';
import { Link } from 'react-router-dom';
import { mountWithRouter } from 'utils/test';

import LinkHeaderButton from 'components/headers/shareable-header/link-header-button';


describe('LinkHeaderButton component', function () {
  it('should render correct passed props', function () {
    const wrapper = mountWithRouter(
      <LinkHeaderButton
        buttonText='link-header-button'
        to='/path'
      />
    );

    const anchor = wrapper.find('a');
    anchor.text().should.equal('link-header-button');

    const link = wrapper.find(Link);
    link.prop('to').should.equal('/path');
  });
});
