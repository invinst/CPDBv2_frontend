import React from 'react';
import { shallow } from 'enzyme';

import CensusTrackPane from 'components/common/preview-pane/panes/census-track-pane';
import {
  HeaderWidget,
  GeoInfoWidget,
  AllegationCountWidget,
  ListWidget,
} from 'components/common/preview-pane/widgets';


describe('CensusTrackPane component', () => {
  it('should contain the sub components', () => {
    const wrapper = shallow(<CensusTrackPane/>);
    wrapper.find(HeaderWidget).exists().should.be.true();
    wrapper.find(GeoInfoWidget).exists().should.be.true();
    wrapper.find(AllegationCountWidget).exists().should.be.true();
    wrapper.find(ListWidget).exists().should.be.true();
  });
});
