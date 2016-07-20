import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';

import Section from 'components/common/section';
import { unmountComponentSuppressError } from 'utils/test';
import { BASE_TEMPLATE, SOLID_TEMPLATE } from 'utils/constants';


describe('Section component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render', function () {
    Section.should.be.renderable();
  });

  it('should render with correct template', function () {
    instance = renderIntoDocument(<Section template={ BASE_TEMPLATE }/>);
    instance.refs.wrapper.style.backgroundColor.should.equal('white');
    instance.refs.header.style.backgroundColor.should.equal('white');
    instance.refs.content.style.backgroundColor.should.equal('white');

    instance = renderIntoDocument(<Section template={ SOLID_TEMPLATE }/>);
    instance.refs.wrapper.style.backgroundColor.should.equal('rgb(244, 244, 244)');
    instance.refs.header.style.backgroundColor.should.equal('rgb(244, 244, 244)');
    instance.refs.content.style.backgroundColor.should.equal('rgb(244, 244, 244)');
  });

  it('should not render header if noHeader state is true', function () {
    instance = renderIntoDocument(<Section/>);
    instance.refs.should.have.property('header');
    instance.setState({ noHeader: true });
    instance.refs.should.not.have.property('header');
  });
});
