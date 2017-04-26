import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import FindingRow from 'components/cr-page/finding-row';


describe('FindingRow component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render properly', function () {
    instance = renderIntoDocument(<FindingRow label='Label' content='Content' />);
    const innerHTML = findDOMNode(instance).innerHTML;
    innerHTML.should.containEql('Label');
    innerHTML.should.containEql('Content');
  });
});
