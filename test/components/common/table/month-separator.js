import React from 'react';
import { shallow } from 'enzyme';

import MonthSeparator from 'components/common/table/month-separator';


describe('DocumentsOverviewPage MonthSeparator component', function () {
  it('should render text', function () {
    const wrapper = shallow(
      <MonthSeparator text='Jan 2019'/>
    );

    wrapper.text().should.equal('Jan 2019');
  });
});
