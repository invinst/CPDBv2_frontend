import React from 'react';
import { shallow } from 'enzyme';

import SchoolGroundPane from 'components/common/preview-pane/panes/school-ground-pane';
import WidgetWrapper, {
  HeaderWidget,
  ListWidget,
  SeparatorWidget,
} from 'components/common/preview-pane/widgets';


describe('SchoolGroundPane component', () => {
  it('should contain the sub components', () => {
    const wrapper = shallow(
      <SchoolGroundPane
        url='https://staging.cpdb.co/data/L2B5ML/citizens-police-data-project'
        officersMostComplaint={ [{
          id: 1,
          name: 'name',
          count: 1,
        }] }
        mostCommonComplaint={ [{
          id: 1,
          name: 'name',
          count: 1,
        }] }
        allegationCount={ 123 }
        name={ 'school-ground' }
      />
    );

    const widgetWrapper = wrapper.find(WidgetWrapper);
    widgetWrapper.prop('callToAction').url.should.equal(
      'https://staging.cpdb.co/data/L2B5ML/citizens-police-data-project'
    );
    widgetWrapper.prop('maxHeight').should.equal(530);

    wrapper.find(HeaderWidget).exists().should.be.true();
    wrapper.find(SeparatorWidget).exists().should.be.true();
    wrapper.find(ListWidget).exists().should.be.true();
  });
});
