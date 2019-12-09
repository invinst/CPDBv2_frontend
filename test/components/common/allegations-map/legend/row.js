import React from 'react';
import { shallow } from 'enzyme';

import Row from 'components/common/allegations-map/legend/row';
import LoadingSpinner from 'components/common/loading-spinner';

describe('Row component', function () {
  it('should render row correctly', function () {
    const wrapper = shallow(
      <Row
        ovalColor={ 'red' }
        ovalBorderColor={ 'black' }
        text={ 'Test Row' }
        number={ 20 }
        haveMarginBottom={ false }
        hovering={ false }
        loading={ false }
      />
    );
    const rowText = wrapper.find('.legend-row-text');
    rowText.text().should.equal('Test Row');
    const rowNumber = wrapper.find('.legend-row-number');
    rowNumber.text().should.equal('20');
    wrapper.find(LoadingSpinner).exists().should.be.false();
  });

  it('should render row with loading spinner', function () {
    const wrapper = shallow(
      <Row
        ovalColor={ 'red' }
        ovalBorderColor={ 'black' }
        text={ 'Test Row' }
        number={ 20 }
        haveMarginBottom={ false }
        hovering={ false }
        loading={ true }
      />
    );
    wrapper.find(LoadingSpinner).exists().should.be.true();
  });
});
