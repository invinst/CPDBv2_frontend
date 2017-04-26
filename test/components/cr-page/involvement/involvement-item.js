import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import InvolvementItem from 'components/cr-page/involvement/involvement-item';
import OfficerRow from 'components/cr-page/involvement/officer-row';


describe('InvolvementItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render list of officers', function () {
    const officers = [{ id: 1, abbrName: 'Foo' }, { id: 2, abbrName: 'Bar' }];
    instance = renderIntoDocument(<InvolvementItem officers={ officers } />);
    scryRenderedComponentsWithType(instance, OfficerRow).should.have.length(2);
  });
});
