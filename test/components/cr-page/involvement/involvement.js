import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Involvement from 'components/cr-page/involvement';
import InvolvementItem from 'components/cr-page/involvement/involvement-item';


describe('Involvement component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render list of involvement items', function () {
    const involvements = [{
      involvementType: 'Foo', officers: [{ id: 1 }] }, { involvementType: 'Bar', officers: [{ id: 2 }]
      }];
    instance = renderIntoDocument(<Involvement involvements={ involvements }/>);
    scryRenderedComponentsWithType(instance, InvolvementItem).should.have.length(2);
  });
});
