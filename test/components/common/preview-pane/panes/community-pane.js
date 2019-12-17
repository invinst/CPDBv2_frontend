import React from 'react';
import { shallow } from 'enzyme';

import CommunityPane from 'components/common/preview-pane/panes/community-pane';
import WidgetWrapper, {
  HeaderWidget,
  GeoInfoWidget,
  AllegationCountWidget,
  ListWidget,
} from 'components/common/preview-pane/widgets';


describe('CommunityPane component', () => {
  it('should contain the sub components', () => {
    const wrapper = shallow(
      <CommunityPane
        officersMostComplaint={ [{
          id: 1,
          name: 'name',
          count: 1,
        }] }
        medianIncome={ '1000' }
        population={ '100' }
        raceCount={ [] }
        allegationCount={ 100 }
        mostCommonComplaint={ [{
          id: 1,
          name: 'name',
          count: 1,
        }] }
        name={ 'community' }
        url={ 'url' }
      />
    );

    const widgetWrapper = wrapper.find(WidgetWrapper);
    widgetWrapper.prop('callToAction').should.eql({ url: 'url' });
    widgetWrapper.prop('maxHeight').should.equal(890);

    wrapper.find(HeaderWidget).exists().should.be.true();
    wrapper.find(GeoInfoWidget).exists().should.be.true();
    wrapper.find(AllegationCountWidget).exists().should.be.true();
    wrapper.find(ListWidget).should.have.length(2);
  });
});
