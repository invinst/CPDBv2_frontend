import React from 'react';
import { shallow } from 'enzyme';

import WardPane from 'components/common/preview-pane/panes/ward-pane';
import WidgetWrapper, {
  HeaderWidget,
  SeparatorWidget,
  TextWidget,
  AllegationCountWidget,
  ListWidget,
} from 'components/common/preview-pane/widgets';


describe('WardPane component', () => {
  it('should contain the sub components', () => {
    const wrapper = shallow(
      <WardPane
        url='https://staging.cpdb.co/data/L2B5ML/citizens-police-data-project'
        name={ '22' }
        allegationCount={ 123 }
        mostCommonComplaint={ [] }
        officersMostComplaint={ [] }
        to={ 'to' }
      />
    );

    const widgetWrapper = wrapper.find(WidgetWrapper);
    widgetWrapper.prop('callToAction').should.eql({
      url: 'https://staging.cpdb.co/data/L2B5ML/citizens-police-data-project',
    });
    widgetWrapper.prop('maxHeight').should.equal(830);

    const header = wrapper.find(HeaderWidget);
    header.render().text().should.containEql('WARD #22');
    wrapper.find(SeparatorWidget).exists().should.be.true();
    wrapper.find(TextWidget).exists().should.be.true();
    wrapper.find(AllegationCountWidget).exists().should.be.true();
    wrapper.find(ListWidget).should.have.length(2);
  });
});
