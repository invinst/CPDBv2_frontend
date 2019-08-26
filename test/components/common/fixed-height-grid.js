import React from 'react';

import FixedHeightGrid from 'components/common/fixed-height-grid';

import { unmountComponentSuppressError } from 'utils/test';
import {
  scryRenderedDOMComponentsWithClass,
  renderIntoDocument,
} from 'react-addons-test-utils';


describe('FixedHeightGrid component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    FixedHeightGrid.should.be.renderable();
  });

  it('should render children in chunks depending on available height', function () {
    instance = renderIntoDocument(
      <FixedHeightGrid
        childHeight={ 10 }
        availableHeight={ 23 }
      >
        { ['one', 'two', 'three', 'four', 'five'] }
      </FixedHeightGrid>
    );

    const columns = scryRenderedDOMComponentsWithClass(instance, 'test--fixed-height-grid-column');
    columns.length.should.eql(3);
    columns[0].textContent.should.containEql('onetwo');
    columns[1].textContent.should.containEql('threefour');
    columns[2].textContent.should.containEql('five');
  });
});
