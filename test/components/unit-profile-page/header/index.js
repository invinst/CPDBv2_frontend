import React from 'react';
import {
  renderIntoDocument, findRenderedDOMComponentWithClass, findRenderedComponentWithType
} from 'react-addons-test-utils';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import Header from 'components/unit-profile-page/header';


describe('Header component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render unit name and unit description', function () {
    instance = renderIntoDocument(<Header unitName='004' unitDescription='District 004'/>);
    const unitName = findRenderedDOMComponentWithClass(instance, 'test--unit-name');
    unitName.textContent.should.eql('Unit 004');
    const unitDescription = findRenderedDOMComponentWithClass(instance, 'test--unit-description');
    unitDescription.textContent.should.eql('District 004');
  });

  it('should change styles at bottom', function () {
    instance = renderIntoDocument(<Header scrollPosition='middle'/>);
    findRenderedComponentWithType(instance, ResponsiveFluidWidthComponent).props.style.position.should.eql('relative');

    instance = reRender(
      <Header scrollPosition='bottom'/>,
      instance
    );

    findRenderedComponentWithType(instance, ResponsiveFluidWidthComponent).props.style.position.should.eql('fixed');
  });
});
