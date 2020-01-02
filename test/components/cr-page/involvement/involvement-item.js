import React from 'react';
import { shallow } from 'enzyme';

import InvolvementItem from 'components/cr-page/involvement/involvement-item';
import OfficerRow from 'components/cr-page/involvement/officer-row';


describe('InvolvementItem component', function () {
  const officers = [{ id: 1, abbrName: 'Foo' }, { id: 2, abbrName: 'Bar' }];

  it('should render list of officers', function () {
    const wrapper = shallow(<InvolvementItem officers={ officers } involvedType='investigator' />);
    wrapper.find(OfficerRow).should.have.length(2);
  });
});
