import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import MultiRow from 'components/cr-page/multi-row';


describe('MultiRow component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render nothing if contents is empty', function () {
    instance = renderIntoDocument(<MultiRow />);
    instance.should.displayNothing();
  });

  it('should display multiple contents', function () {
    const contents = ['text 1', 'text 2', 'text 3'];
    instance = renderIntoDocument(<MultiRow contents={ contents }/>);
    const innerHTML = findDOMNode(instance).innerHTML;
    innerHTML.should.containEql('text 1');
    innerHTML.should.containEql('text 2');
    innerHTML.should.containEql('text 3');
  });
});
