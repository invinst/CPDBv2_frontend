import React from 'react';
import { shallow } from 'enzyme';

import LinkWrapper from 'utils/link-wrapper';


describe('LinkWrapper component', function () {
  it('should render <a> tag without href when to prop is undefined', function () {
    const toPath = '/to';
    const wrapper = shallow(<LinkWrapper href={ toPath }/>);
    const aTag = wrapper.find('a');

    wrapper.find('Link').exists().should.be.false();
    aTag.exists().should.be.true();
    aTag.prop('href').should.be.equal(toPath);
  });

  it('should render Link when to prop is provided', function () {
    const toPath = '/to';
    const wrapper = shallow(<LinkWrapper to={ toPath }/>);
    const linkWrapper = wrapper.find('Link');

    linkWrapper.exists().should.be.true();
    linkWrapper.prop('to').should.be.equal(toPath);
    wrapper.find('a').exists().should.be.false();
  });
});
