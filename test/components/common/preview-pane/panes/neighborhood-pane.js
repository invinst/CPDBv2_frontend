import React from 'react';
import { shallow } from 'enzyme';

import NeighborhoodPane from 'components/common/preview-pane/panes/neighborhood-pane';
import WidgetWrapper, {
  HeaderWidget,
  ListWidget,
  SeparatorWidget,
} from 'components/common/preview-pane/widgets';


describe('NeighborhoodPane component', function () {
  it('should contain the sub components', function () {
    const wrapper = shallow(
      <NeighborhoodPane
        url='https://staging.cpdb.co/data/L2B5ML/citizens-police-data-project'
        mostCommonComplaint={ [{
          id: 1,
          name: 'name',
          count: 1,
        }] }
        officersMostComplaint={ [{
          id: 1,
          name: 'name',
          count: 1,
        }] }
        name={ 'neighborhood' }
        allegationCount={ 123 }
      />
    );

    const widgetWrapper = wrapper.find(WidgetWrapper);
    widgetWrapper.prop('callToAction').should.eql({
      url: 'https://staging.cpdb.co/data/L2B5ML/citizens-police-data-project',
    });
    widgetWrapper.prop('maxHeight').should.equal(750);

    wrapper.find(HeaderWidget).exists().should.be.true();
    wrapper.find(SeparatorWidget).exists().should.be.true();
    wrapper.find(ListWidget).should.have.length(2);
  });
});
