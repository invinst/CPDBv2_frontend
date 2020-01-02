import React from 'react';
import { shallow } from 'enzyme';

import Involvement from 'components/cr-page/involvement';
import InvolvementItem from 'components/cr-page/involvement/involvement-item';


describe('Involvement component', function () {
  const involvements = {
    'investigator': [{ id: 1 }],
    'police_witness': [{ id: 2 }],
  };

  it('should render list of involvement items', function () {
    const wrapper = shallow(<Involvement involvements={ involvements }/>);
    wrapper.find(InvolvementItem).should.have.length(2);
  });
});
