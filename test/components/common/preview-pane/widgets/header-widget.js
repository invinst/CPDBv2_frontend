import React from 'react';
import { shallow } from 'enzyme';

import HeaderWidget from 'components/common/preview-pane/widgets/header-widget';


describe('HeaderWidget component', () => {
  it('should contains title', () => {
    const wrapper = shallow(
      <HeaderWidget title={ 'Community Name' }/>
    );
    const instanceDOM = wrapper.find('.test--header-widget');
    instanceDOM.text().should.containEql('Community Name');
  });
});
