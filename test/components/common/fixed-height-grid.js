import React from 'react';
import { shallow } from 'enzyme';

import FixedHeightGrid from 'components/common/fixed-height-grid';

describe('FixedHeightGrid component', function () {

  it('should be renderable', function () {
    FixedHeightGrid.should.be.renderable();
  });

  it('should render children in chunks depending on available height', function () {
    const wrapper = shallow(
      <FixedHeightGrid
        childHeight={ 10 }
        availableHeight={ 23 }
      >
        { ['one', 'two', 'three', 'four', 'five'] }
      </FixedHeightGrid>
    );

    const columns = wrapper.find('.test--fixed-height-grid-column');
    columns.should.have.length(3);
    columns.at(0).text().should.containEql('onetwo');
    columns.at(1).text().should.containEql('threefour');
    columns.at(2).text().should.containEql('five');
  });
});
