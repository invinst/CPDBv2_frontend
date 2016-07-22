import React from 'react';
import {
  renderIntoDocument, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';

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
    findRenderedDOMComponentWithClass(instance, 'section-wrapper').style.backgroundColor.should.equal('white');
    findRenderedDOMComponentWithClass(instance, 'section-header').style.backgroundColor.should.equal('white');
    findRenderedDOMComponentWithClass(instance, 'section-content').style.backgroundColor.should.equal('white');

    instance = renderIntoDocument(<Section template={ SOLID_TEMPLATE }/>);
    findRenderedDOMComponentWithClass(instance, 'section-wrapper').style.backgroundColor.should.equal(
      'rgb(244, 244, 244)');
    findRenderedDOMComponentWithClass(instance, 'section-header').style.backgroundColor.should.equal(
      'rgb(244, 244, 244)');
    findRenderedDOMComponentWithClass(instance, 'section-content').style.backgroundColor.should.equal(
      'rgb(244, 244, 244)');
  });

  it('should not render header if noHeader state is true', function () {
    instance = renderIntoDocument(<Section/>);
    findRenderedDOMComponentWithClass(instance, 'section-header').should.be.ok();
    instance.setState({ noHeader: true });
    scryRenderedDOMComponentsWithClass(instance, 'section-header').length.should.equal(0);
  });
});
