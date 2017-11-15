import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Row from 'components/common/row';


describe('Row component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render properly', function () {
    instance = renderIntoDocument(<Row label='Label' content='Content' />);
    const innerHTML = findDOMNode(instance).innerHTML;
    innerHTML.should.containEql('Label');
    innerHTML.should.containEql('Content');
  });
});
