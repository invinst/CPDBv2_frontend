import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import Legend from 'components/officer-page/social-graph-page/legend';


describe('Legend component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render stats along with shades', function () {
    instance = renderIntoDocument(
      <Legend
        mostCrs={ 7 }
        leastCrs={ 1 }
        nodeShades={ ['#000', '#fff'] }
      />
    );
    const el = findDOMNode(instance);
    el.textContent.should.containEql('Officer with most Complaints7');
    el.textContent.should.containEql('Officer with least Complaints1');
    el.innerHTML.should.containEql('rgb(255, 255, 255)');
    el.innerHTML.should.containEql('rgb(0, 0, 0)');
  });
});
