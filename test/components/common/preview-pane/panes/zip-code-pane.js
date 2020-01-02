import React from 'react';
import { shallow } from 'enzyme';

import ZipCodePane from 'components/common/preview-pane/panes/zip-code-pane';
import {
  HeaderWidget,
  AllegationCountWidget,
  ListWidget,
} from 'components/common/preview-pane/widgets';


describe('ZipCodePane component', () => {
  it('should contain the sub components', () => {
    const wrapper = shallow(<ZipCodePane/>);
    wrapper.find(HeaderWidget).exists().should.be.true();
    wrapper.find(AllegationCountWidget).exists().should.be.true();
    wrapper.find(ListWidget).should.have.length(3);
  });
});
