import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Involvement from 'components/cr-page/involvement';
import InvolvementItem from 'components/cr-page/involvement/involvement-item';


describe('Involvement component', function () {
  let instance;
  const involvements = {
    'investigator': [{ id: 1 }],
    'police_witness': [{ id: 2 }]
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render list of involvement items', function () {
    instance = renderIntoDocument(<Involvement involvements={ involvements }/>);
    scryRenderedComponentsWithType(instance, InvolvementItem).should.have.length(2);
  });
});
