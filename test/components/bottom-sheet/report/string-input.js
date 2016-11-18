import React from 'react';
import { spy } from 'sinon';
import { renderIntoDocument, findRenderedDOMComponentWithTag, Simulate } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import StringInput from 'components/bottom-sheet/report/string-input';

describe('StringInput component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should emit back changes to input', function () {
    const onChange = spy();
    instance = renderIntoDocument(<StringInput onChange={ onChange }/>);
    const input = findRenderedDOMComponentWithTag(instance, 'input');
    input.value = 'abc';
    Simulate.change(input);
    onChange.calledWith('abc').should.be.true();
  });
});
