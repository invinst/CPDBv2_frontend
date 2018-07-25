import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import Header from 'components/unit-profile-page/header';


describe('Header component', function () {
  it('should render unit name and unit description', function () {
    const instance = renderIntoDocument(<Header unitName='004' unitDescription='District 004'/>);
    const unitName = findRenderedDOMComponentWithClass(instance, 'test--unit-name');
    unitName.textContent.should.eql('Unit 004');
    const unitDescription = findRenderedDOMComponentWithClass(instance, 'test--unit-description');
    unitDescription.textContent.should.eql('District 004');
  });
});
