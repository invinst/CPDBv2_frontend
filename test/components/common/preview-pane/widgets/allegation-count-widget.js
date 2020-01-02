import React from 'react';
import { mount } from 'enzyme';

import AllegationCountWidget from 'components/common/preview-pane/widgets/allegation-count-widget';


describe('AllegationCountWidget component', function () {
  it('should contains number of allegations', function () {
    const wrapper = mount(
      <AllegationCountWidget numOfAllegations={ 465 }/>
    );
    const instanceDOM = wrapper.find('.test--allegation-widget');
    instanceDOM.text().should.containEql('465 allegations');
  });

  it('should have thousands separator comma', function () {
    const wrapper = mount(
      <AllegationCountWidget numOfAllegations={ 6789 }/>
    );
    const instanceDOM = wrapper.find('.test--allegation-widget');
    instanceDOM.text().should.containEql('6,789 allegations');
  });
});
